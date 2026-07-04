import {
  chatResponseFixtures,
  defaultChatResponseFixtureId,
  findChatResponseFixture,
  type ChatResponseFixture,
} from "./fixtures/chat-responses";

const mockChunkSize = 12;
const mockChunkIntervalMs = 25;

/**
 * ユーザー発言にfixtureのidが含まれていればそれを、なければ典型回答を返す。
 * (例: モックモード中に「unresolved」と送ると未解決候補パターンを確認できる)
 */
export function selectMockChatFixture(userText: string): ChatResponseFixture {
  const matched = chatResponseFixtures.find((fixture) => userText.includes(fixture.id));

  if (matched) {
    return matched;
  }

  const fallback = findChatResponseFixture(defaultChatResponseFixtureId);

  if (!fallback) {
    throw new Error(`Default chat fixture "${defaultChatResponseFixtureId}" is missing`);
  }

  return fallback;
}

/** fixtureを本物のAI応答のように少しずつ流すテキストストリームを作る。 */
export function createMockChatStream(userText: string): ReadableStream<Uint8Array> {
  const { response } = selectMockChatFixture(userText);
  const encoder = new TextEncoder();
  let position = 0;

  return new ReadableStream({
    start(controller) {
      const push = () => {
        if (position >= response.length) {
          controller.close();

          return;
        }

        controller.enqueue(encoder.encode(response.slice(position, position + mockChunkSize)));
        position += mockChunkSize;
        setTimeout(push, mockChunkIntervalMs);
      };

      push();
    },
  });
}
