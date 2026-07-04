import { describe, expect, it } from "vite-plus/test";

import { defaultChatResponseFixtureId } from "./fixtures/chat-responses";
import { createMockChatStream, selectMockChatFixture } from "./mock-chat-response";

describe("selectMockChatFixture", () => {
  it("発言にfixture idが含まれていればそのfixtureを選ぶ", () => {
    expect(selectMockChatFixture("unresolvedのパターンを見たい").id).toBe("unresolved");
    expect(selectMockChatFixture("brokenを確認").id).toBe("broken");
  });

  it("一致がなければ典型回答にフォールバックする", () => {
    expect(selectMockChatFixture("黄色くて電気を出すネズミ").id).toBe(defaultChatResponseFixtureId);
  });
});

describe("createMockChatStream", () => {
  it("fixture全文をチャンク分割して流しきる", async () => {
    const stream = createMockChatStream("singleでお願い");
    const chunks: string[] = [];
    const decoder = new TextDecoder();
    const reader = stream.getReader();
    const readAll = async (): Promise<void> => {
      const { done, value } = await reader.read();

      if (done) {
        return;
      }

      chunks.push(decoder.decode(value, { stream: true }));

      return readAll();
    };

    await readAll();

    expect(chunks.length).toBeGreaterThan(1);
    expect(chunks.join("")).toContain('PokemonCandidate(143, "カビゴン", "high"');
  });
});
