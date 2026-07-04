import { createParser, type ElementNode } from "@openuidev/react-lang";
import { describe, expect, it } from "vite-plus/test";

import { chatUiLibrary } from "./chat-ui-library";

const sampleResponse = `root = Answer([intro, list])
intro = Paragraph("「黄色くて電気を出すネズミ」なら、この候補が考えられます。")
list = CandidateList([c1, c2])
c1 = PokemonCandidate(25, "ピカチュウ", "high", "黄色い電気ネズミポケモンとして最も有名です。")
c2 = PokemonCandidate(172, "ピチュー", "medium", "ピカチュウの進化前です。")`;

function parseSample(response: string) {
  const parser = createParser(chatUiLibrary.toJSONSchema(), chatUiLibrary.root);

  return parser.parse(response);
}

describe("chatUiLibrary", () => {
  it("OpenUI Langの応答を検証エラーなしで解析できる", () => {
    const result = parseSample(sampleResponse);

    expect(result.meta.errors).toEqual([]);
    expect(result.root?.typeName).toBe("Answer");
  });

  it("位置引数がスキーマのキー順どおりにpropsへマッピングされる", () => {
    const result = parseSample(sampleResponse);
    const children = result.root?.props.children as ElementNode[];

    expect(children[0]?.typeName).toBe("Paragraph");
    expect(children[0]?.props.text).toContain("黄色くて電気を出すネズミ");

    const candidates = children[1]?.props.items as ElementNode[];

    expect(candidates).toHaveLength(2);
    expect(candidates[0]?.props).toMatchObject({
      confidence: "high",
      id: 25,
      jaName: "ピカチュウ",
    });
    expect(candidates[1]?.props).toMatchObject({ id: 172, jaName: "ピチュー" });
  });

  it("ストリーミング途中の不完全な応答でも解析が壊れない", () => {
    const partialResponse = sampleResponse.slice(0, Math.floor(sampleResponse.length / 2));
    const result = parseSample(partialResponse);

    expect(result.root?.typeName).toBe("Answer");
  });
});
