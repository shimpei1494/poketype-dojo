import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

import { maxUserMessageLength, takeRecentChatMessages, type ChatMessage } from "./chat-request";

export type ChatThreadMessage = ChatMessage & { id: string };

const fallbackErrorMessage = "通信に失敗しました。時間をおいてもう一度お試しください。";

export function useChatThread() {
  const [messages, setMessages] = useState<ChatThreadMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(
    () => () => {
      abortControllerRef.current?.abort();
    },
    [],
  );

  const sendMessage = useCallback(
    async (rawInput: string) => {
      const content = rawInput.trim();

      if (!content || content.length > maxUserMessageLength || isStreaming) {
        return;
      }

      const userMessage: ChatThreadMessage = {
        content,
        id: crypto.randomUUID(),
        role: "user",
      };
      const assistantMessageId = crypto.randomUUID();
      const history = takeRecentChatMessages([
        ...messages.map(({ content: messageContent, role }) => ({
          content: messageContent,
          role,
        })),
        { content, role: "user" },
      ]);

      setMessages((previous) => [
        ...previous,
        userMessage,
        { content: "", id: assistantMessageId, role: "assistant" },
      ]);
      setError(null);
      setIsStreaming(true);

      const abortController = new AbortController();

      abortControllerRef.current = abortController;

      try {
        const response = await fetch("/api/chat", {
          body: JSON.stringify({ messages: history }),
          headers: { "content-type": "application/json" },
          method: "POST",
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(await readErrorMessage(response));
        }

        if (!response.body) {
          throw new Error(fallbackErrorMessage);
        }

        const assistantContent = await readTextStream(response.body, (accumulated) => {
          updateMessageContent(setMessages, assistantMessageId, accumulated);
        });

        if (!assistantContent) {
          throw new Error("AIから応答がありませんでした。もう一度お試しください。");
        }
      } catch (caught: unknown) {
        if (isAbortError(caught)) {
          return;
        }

        setMessages((previous) =>
          previous.filter(
            (message) => !(message.id === assistantMessageId && message.content === ""),
          ),
        );
        setError(caught instanceof Error ? caught.message : fallbackErrorMessage);
      } finally {
        abortControllerRef.current = null;
        setIsStreaming(false);
      }
    },
    [isStreaming, messages],
  );

  return { error, isStreaming, messages, sendMessage };
}

function updateMessageContent(
  setMessages: Dispatch<SetStateAction<ChatThreadMessage[]>>,
  messageId: string,
  content: string,
) {
  setMessages((previous) =>
    previous.map((message) => (message.id === messageId ? { ...message, content } : message)),
  );
}

async function readTextStream(
  body: ReadableStream<Uint8Array>,
  onProgress: (accumulated: string) => void,
): Promise<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let accumulated = "";

  const pump = (): Promise<void> =>
    reader.read().then(({ done, value }) => {
      if (done) {
        return;
      }

      accumulated += decoder.decode(value, { stream: true });

      if (accumulated) {
        onProgress(accumulated);
      }

      return pump();
    });

  await pump();

  accumulated += decoder.decode();

  if (accumulated) {
    onProgress(accumulated);
  }

  return accumulated;
}

async function readErrorMessage(response: Response): Promise<string> {
  try {
    const payload: unknown = await response.json();

    if (
      typeof payload === "object" &&
      payload !== null &&
      "error" in payload &&
      typeof payload.error === "string"
    ) {
      return payload.error;
    }
  } catch {
    // JSON以外のエラーレスポンスはフォールバック文言を使う
  }

  return fallbackErrorMessage;
}

function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === "AbortError";
}
