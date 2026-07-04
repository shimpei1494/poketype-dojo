import { describe, expect, it } from "vite-plus/test";

import type { PokemonQuizRecord } from "../data/pokemon/types";
import { resolvePokemonCandidate } from "./resolve-pokemon-candidate";

function buildRecord(overrides: Partial<PokemonQuizRecord>): PokemonQuizRecord {
  return {
    generation: 1,
    id: 1,
    imagePath: "official-artwork/1.png",
    jaName: "フシギダネ",
    name: "bulbasaur",
    type1: "grass",
    type2: "poison",
    typeMemoryHint: "",
    ...overrides,
  };
}

const records: readonly PokemonQuizRecord[] = [
  buildRecord({ id: 25, jaName: "ピカチュウ", name: "pikachu", type1: "electric", type2: null }),
  buildRecord({ id: 26, jaName: "ライチュウ", name: "raichu", type1: "electric", type2: null }),
  buildRecord({ id: 133, jaName: "イーブイ", name: "eevee", type1: "normal", type2: null }),
];

describe("resolvePokemonCandidate", () => {
  it("日本語名が一致するレコードを返す", () => {
    const resolved = resolvePokemonCandidate(records, { id: 25, jaName: "ピカチュウ" });

    expect(resolved?.id).toBe(25);
  });

  it("ひらがな表記の名前もカタカナのレコードに解決する", () => {
    const resolved = resolvePokemonCandidate(records, { id: 25, jaName: "ぴかちゅう" });

    expect(resolved?.jaName).toBe("ピカチュウ");
  });

  it("名前とIDが食い違う場合は名前の一致を優先する", () => {
    const resolved = resolvePokemonCandidate(records, { id: 25, jaName: "ライチュウ" });

    expect(resolved?.id).toBe(26);
  });

  it("名前が一致しない場合はIDで解決する", () => {
    const resolved = resolvePokemonCandidate(records, { id: 133, jaName: "イーヴイ" });

    expect(resolved?.jaName).toBe("イーブイ");
  });

  it("名前もIDも一致しない場合はnullを返す", () => {
    const resolved = resolvePokemonCandidate(records, { id: 9999, jaName: "存在しないポケモン" });

    expect(resolved).toBeNull();
  });
});
