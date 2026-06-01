import { describe, expect, it } from "vite-plus/test";

import { pokemonQuizRecords } from "../data/pokemon";
import {
  filterPokemonReferenceRecords,
  getFirstPokemonId,
  getLastPokemonId,
  getPokemonDefensiveEffectivenessGroups,
  normalizeJapaneseSearchText,
} from "./pokemon-reference";

describe("pokemon reference utilities", () => {
  it("ひらがなとカタカナを同一視して日本語名を検索する", () => {
    const results = filterPokemonReferenceRecords(pokemonQuizRecords, {
      generation: "all",
      query: "ぴか",
      types: [],
    });

    expect(results.map((record) => record.jaName)).toContain("ピカチュウ");
    expect(normalizeJapaneseSearchText("ふしぎ")).toBe(normalizeJapaneseSearchText("フシギ"));
  });

  it("名前、世代、複数タイプをすべて同時に適用して絞り込む", () => {
    const results = filterPokemonReferenceRecords(pokemonQuizRecords, {
      generation: 1,
      query: "ふしぎ",
      types: ["grass", "poison"],
    });

    expect(results.map((record) => record.jaName)).toEqual([
      "フシギダネ",
      "フシギソウ",
      "フシギバナ",
    ]);
  });

  it("複数タイプ検索はAND条件で絞り込む", () => {
    const results = filterPokemonReferenceRecords(pokemonQuizRecords, {
      generation: "all",
      query: "",
      types: ["electric", "steel"],
    });

    expect(results.map((record) => record.jaName)).toContain("コイル");
    expect(
      results.every((record) => record.type1 === "electric" || record.type2 === "electric"),
    ).toBe(true);
    expect(results.every((record) => record.type1 === "steel" || record.type2 === "steel")).toBe(
      true,
    );
  });

  it("防御側の等倍以外の相性を倍率ごとにまとめる", () => {
    const pikachu = pokemonQuizRecords.find((record) => record.jaName === "ピカチュウ");

    expect(pikachu).toBeDefined();

    const groups = getPokemonDefensiveEffectivenessGroups(pikachu!);

    expect(groups).toEqual([
      { attackTypes: ["ground"], multiplier: 2 },
      { attackTypes: ["electric", "flying", "steel"], multiplier: 0.5 },
    ]);
  });

  it("図鑑番号の端をデータから取得する", () => {
    expect(getFirstPokemonId(pokemonQuizRecords)).toBe(1);
    expect(getLastPokemonId(pokemonQuizRecords)).toBe(1025);
  });
});
