import {
  Alert,
  Badge,
  Button,
  Card,
  Code,
  Container,
  Group,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { Renderer, type OpenUIError, type ParseResult } from "@openuidev/react-lang";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { chatUiLibrary } from "../../chat/chat-ui-library";
import {
  chatResponseFixtures,
  defaultChatResponseFixtureId,
  findChatResponseFixture,
} from "../../chat/fixtures/chat-responses";
import { HomeLink } from "../../components/HomeLink";
import { preloadPokemonData } from "../../data/load-pokemon-data";

export const Route = createFileRoute("/dev/ui-preview")({
  // 開発者用のプレビューページのため本番ビルドでは404にする
  beforeLoad: () => {
    if (import.meta.env.PROD) {
      throw notFound();
    }
  },
  component: UiPreviewPage,
  loader: () => {
    preloadPokemonData();
  },
});

const playbackChunkSize = 8;
const playbackIntervalMs = 30;

type ParseReport = {
  errors: OpenUIError[];
  meta: ParseResult["meta"] | null;
};

const defaultSource = findChatResponseFixture(defaultChatResponseFixtureId)?.response ?? "";

function UiPreviewPage() {
  const [fixtureId, setFixtureId] = useState(defaultChatResponseFixtureId);
  const [source, setSource] = useState(defaultSource);
  const [playbackPosition, setPlaybackPosition] = useState<number | null>(null);
  const [parseReport, setParseReport] = useState<ParseReport>({ errors: [], meta: null });

  const isPlaying = playbackPosition !== null && playbackPosition < source.length;
  const displayedResponse = playbackPosition === null ? source : source.slice(0, playbackPosition);
  const selectedFixture = findChatResponseFixture(fixtureId);

  useEffect(() => {
    if (playbackPosition === null || playbackPosition >= source.length) {
      return;
    }

    const timer = window.setTimeout(() => {
      setPlaybackPosition((position) => (position === null ? null : position + playbackChunkSize));
    }, playbackIntervalMs);

    return () => window.clearTimeout(timer);
  }, [playbackPosition, source.length]);

  function selectFixture(nextFixtureId: string | null) {
    const fixture = nextFixtureId === null ? undefined : findChatResponseFixture(nextFixtureId);

    if (!fixture) {
      return;
    }

    setFixtureId(fixture.id);
    setSource(fixture.response);
    setPlaybackPosition(null);
  }

  return (
    <Container className="page-shell" size="lg">
      <Stack gap="md">
        <Stack gap={4}>
          <HomeLink />
          <Group gap="xs">
            <Text c="candyPink.7" fw={700} size="sm">
              Dev Tools
            </Text>
            <Badge color="coralError" variant="light">
              開発環境専用
            </Badge>
          </Group>
          <Title order={1}>チャットUIプレビュー</Title>
          <Text c="dimmed">
            OpenUI
            Langのテキストを直接編集して、AIチャットの描画結果を確認できます。本番ビルドでは404になります。
          </Text>
        </Stack>

        <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="md">
          <Card className="glass-panel" p="md">
            <Stack gap="sm">
              <Select
                allowDeselect={false}
                data={chatResponseFixtures.map((fixture) => ({
                  label: fixture.label,
                  value: fixture.id,
                }))}
                label="応答パターン"
                onChange={selectFixture}
                value={fixtureId}
              />
              {selectedFixture ? (
                <Text c="dimmed" size="xs">
                  {selectedFixture.description}
                </Text>
              ) : null}
              <Textarea
                aria-label="OpenUI Langソース"
                autosize
                label="OpenUI Lang"
                maxRows={18}
                minRows={10}
                onChange={(event) => {
                  setSource(event.currentTarget.value);
                  setPlaybackPosition(null);
                }}
                styles={{ input: { fontFamily: "monospace" } }}
                value={source}
              />
              <Group gap="xs">
                <Button
                  color="crystalBlue"
                  disabled={isPlaying || source.length === 0}
                  onClick={() => setPlaybackPosition(0)}
                  size="xs"
                >
                  ストリーミング再生
                </Button>
                <Button
                  disabled={playbackPosition === null}
                  onClick={() => setPlaybackPosition(null)}
                  size="xs"
                  variant="light"
                >
                  全文表示に戻す
                </Button>
              </Group>
            </Stack>
          </Card>

          <Card className="glass-panel" p="md">
            <Stack gap="sm">
              <Group justify="space-between">
                <Title order={2} size="h4">
                  描画結果
                </Title>
                {isPlaying ? (
                  <Badge color="crystalBlue" variant="light">
                    ストリーミング中
                  </Badge>
                ) : null}
              </Group>
              <Renderer
                isStreaming={isPlaying}
                library={chatUiLibrary}
                onError={(errors) => setParseReport((previous) => ({ ...previous, errors }))}
                onParseResult={(result) =>
                  setParseReport((previous) => ({ ...previous, meta: result?.meta ?? null }))
                }
                response={displayedResponse || null}
              />
              {parseReport.errors.length > 0 ? (
                <Alert color="coralError" title="パースエラー" variant="light">
                  <Stack gap={4}>
                    {parseReport.errors.map((error) => (
                      <Text
                        key={`${error.code}-${error.statementId ?? ""}-${error.path ?? ""}`}
                        size="xs"
                      >
                        [{error.code}] {error.statementId ? `${error.statementId}: ` : ""}
                        {error.message}
                      </Text>
                    ))}
                  </Stack>
                </Alert>
              ) : null}
              {parseReport.meta ? (
                <Code block c="dimmed" fz="xs">
                  {`statements: ${parseReport.meta.statementCount} / incomplete: ${parseReport.meta.incomplete}\nunresolved: [${parseReport.meta.unresolved.join(", ")}] / orphaned: [${parseReport.meta.orphaned.join(", ")}]`}
                </Code>
              ) : null}
            </Stack>
          </Card>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
