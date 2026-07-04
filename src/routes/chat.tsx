import {
  Alert,
  Button,
  Card,
  Container,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { Renderer } from "@openuidev/react-lang";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { maxUserMessageLength } from "../chat/chat-request";
import { chatUiLibrary } from "../chat/chat-ui-library";
import { useChatThread, type ChatThreadMessage } from "../chat/use-chat-thread";
import { HomeLink } from "../components/HomeLink";
import { preloadPokemonData } from "../data/load-pokemon-data";

export const Route = createFileRoute("/chat")({
  component: ChatPage,
  loader: () => {
    preloadPokemonData();
  },
});

const exampleQuestions = [
  "黄色くて電気を出すネズミっぽいポケモン",
  "赤いカニみたいなポケモンの名前が思い出せない",
  "第1世代で一番かたそうな岩のヘビ",
];

function ChatPage() {
  const { error, isStreaming, messages, resetThread, sendMessage } = useChatThread();
  const [draft, setDraft] = useState("");
  const messageListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageListRef.current?.scrollTo({
      behavior: "smooth",
      top: messageListRef.current.scrollHeight,
    });
  }, [messages]);

  function submitDraft() {
    const content = draft.trim();

    if (!content || isStreaming) {
      return;
    }

    setDraft("");
    void sendMessage(content);
  }

  return (
    <Container className="page-shell" size="md">
      <Stack gap="md">
        <Stack gap={4}>
          <HomeLink />
          <Text c="candyPink.7" fw={700} size="sm">
            AI Chat
          </Text>
          <Title order={1}>AIポケモン相談</Title>
          <Text c="dimmed">
            曖昧な説明やうろ覚えの記憶から、AIがどのポケモンかを推測して図鑑につなげます。
          </Text>
        </Stack>

        <Card className="glass-panel" p="md">
          <Stack gap="md">
            {messages.length === 0 ? null : (
              <Group justify="flex-end">
                <Button color="gray" onClick={resetThread} size="xs" variant="subtle">
                  最初からやり直す
                </Button>
              </Group>
            )}
            <Stack gap="md" mah="55vh" ref={messageListRef} style={{ overflowY: "auto" }}>
              {messages.length === 0 ? (
                <Stack gap="sm" py="md">
                  <Text c="dimmed" size="sm">
                    例えばこんなふうに聞いてみてください。
                  </Text>
                  <Group gap="xs">
                    {exampleQuestions.map((question) => (
                      <Button
                        color="crystalBlue"
                        key={question}
                        onClick={() => void sendMessage(question)}
                        size="xs"
                        variant="light"
                      >
                        {question}
                      </Button>
                    ))}
                  </Group>
                </Stack>
              ) : (
                messages.map((message, index) => (
                  <ChatMessageItem
                    isStreaming={isStreaming && index === messages.length - 1}
                    key={message.id}
                    message={message}
                  />
                ))
              )}
            </Stack>

            {error === null ? null : (
              <Alert color="coralError" title="エラー" variant="light">
                {error}
              </Alert>
            )}

            <Stack gap="xs">
              <Textarea
                aria-label="AIへの質問"
                autosize
                maxLength={maxUserMessageLength}
                maxRows={4}
                minRows={1}
                onChange={(event) => setDraft(event.currentTarget.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
                    event.preventDefault();
                    submitDraft();
                  }
                }}
                placeholder="例: 黄色くて電気を出すネズミっぽいポケモン"
                value={draft}
              />
              <Group justify="space-between">
                <Text c="dimmed" size="xs">
                  AIの回答は間違えることがあります。候補は図鑑データと照合して表示されます。
                </Text>
                <Button disabled={!draft.trim() || isStreaming} onClick={submitDraft}>
                  送信
                </Button>
              </Group>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}

function ChatMessageItem({
  isStreaming,
  message,
}: {
  isStreaming: boolean;
  message: ChatThreadMessage;
}) {
  if (message.role === "user") {
    return (
      <Group justify="flex-end">
        <Paper bg="candyPink.1" maw="85%" px="md" py="xs" radius="lg">
          <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>
            {message.content}
          </Text>
        </Paper>
      </Group>
    );
  }

  if (message.content === "") {
    return isStreaming ? <Loader size="sm" type="dots" /> : null;
  }

  return <Renderer isStreaming={isStreaming} library={chatUiLibrary} response={message.content} />;
}
