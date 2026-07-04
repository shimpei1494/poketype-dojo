import { describe, expect, it } from "vite-plus/test";

import { buildChatSystemPrompt } from "./system-prompt";

describe("buildChatSystemPrompt", () => {
  it("全コンポーネントのシグネチャを含むプロンプトを生成する", () => {
    const prompt = buildChatSystemPrompt();

    expect(prompt).toContain("Answer");
    expect(prompt).toContain("Paragraph");
    expect(prompt).toContain("CandidateList");
    expect(prompt).toContain("PokemonCandidate");
  });

  it("アプリ固有のルールと例を含む", () => {
    const prompt = buildChatSystemPrompt();

    expect(prompt).toContain("PokéType Dojo");
    expect(prompt).toContain("常に日本語で回答する。");
    expect(prompt).toContain('PokemonCandidate(25, "ピカチュウ", "high"');
  });
});
