import { createFileRoute } from "@tanstack/react-router";
import OpenAI from "openai";

import { chatRequestSchema, takeRecentChatMessages } from "../../chat/chat-request";
import { buildChatSystemPrompt } from "../../chat/system-prompt";

const chatModel = "gpt-5.4-mini";
const maxCompletionTokens = 2048;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: ({ request }) => handleChatRequest(request),
    },
  },
});

async function handleChatRequest(request: Request): Promise<Response> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error("OPENAI_API_KEY is not configured");

    return jsonError(500, "サーバーの設定に問題があります。時間をおいてお試しください。");
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonError(400, "リクエストの形式が正しくありません。");
  }

  const parsed = chatRequestSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError(400, "リクエストの内容が正しくありません。");
  }

  const client = new OpenAI({ apiKey });

  try {
    const completion = await client.chat.completions.create(
      {
        max_completion_tokens: maxCompletionTokens,
        messages: [
          { content: buildChatSystemPrompt(), role: "system" },
          ...takeRecentChatMessages(parsed.data.messages),
        ],
        model: chatModel,
        reasoning_effort: "medium",
        stream: true,
      },
      { signal: request.signal },
    );

    return new Response(createTextStream(completion), {
      headers: {
        "cache-control": "no-store",
        "content-type": "text/plain; charset=utf-8",
      },
    });
  } catch (error: unknown) {
    console.error("OpenAI chat completion failed", error);

    return jsonError(502, "AIの呼び出しに失敗しました。時間をおいてもう一度お試しください。");
  }
}

function createTextStream(
  completion: AsyncIterable<OpenAI.Chat.Completions.ChatCompletionChunk>,
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of completion) {
          const delta = chunk.choices[0]?.delta?.content;

          if (delta) {
            controller.enqueue(encoder.encode(delta));
          }
        }

        controller.close();
      } catch (error: unknown) {
        console.error("OpenAI stream aborted", error);
        controller.error(error);
      }
    },
  });
}

function jsonError(status: number, message: string): Response {
  return Response.json({ error: message }, { status });
}
