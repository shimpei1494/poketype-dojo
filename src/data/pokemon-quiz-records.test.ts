import { describe, expect, it } from "vite-plus/test";

import { availablePokemonGenerations, pokemonQuizRecords } from "./pokemon";
import { pokemonTypes } from "./pokemon-types";

const pokemonTypeSet = new Set(pokemonTypes);

describe("pokemonQuizRecords", () => {
  it("第1世代から第2世代まで251匹の通常個体データを持つ", () => {
    expect(pokemonQuizRecords).toHaveLength(251);
    expect(pokemonQuizRecords[0]?.id).toBe(1);
    expect(pokemonQuizRecords.at(-1)?.id).toBe(251);
  });

  it("第2世代100匹の通常個体データを持つ", () => {
    const generation2Records = pokemonQuizRecords.filter((record) => record.generation === 2);

    expect(generation2Records).toHaveLength(100);
    expect(generation2Records[0]?.id).toBe(152);
    expect(generation2Records.at(-1)?.id).toBe(251);
  });

  it("全国図鑑番号に重複がない", () => {
    const ids = pokemonQuizRecords.map((record) => record.id);
    const duplicatedIds = ids.filter((id, index) => ids.indexOf(id) !== index);

    expect(duplicatedIds).toEqual([]);
  });

  it("全国図鑑番号が1から251まで連続している", () => {
    const ids = pokemonQuizRecords.map((record) => record.id);

    expect(ids).toEqual(Array.from({ length: 251 }, (_, index) => index + 1));
  });

  it("選択可能な世代に第1世代と第2世代を含む", () => {
    expect(availablePokemonGenerations).toEqual([1, 2]);
  });

  it("すべてのタイプがPokemonTypeに含まれる", () => {
    for (const record of pokemonQuizRecords) {
      expect(pokemonTypeSet.has(record.type1)).toBe(true);

      if (record.type2 !== null) {
        expect(pokemonTypeSet.has(record.type2)).toBe(true);
        expect(record.type2).not.toBe(record.type1);
      }
    }
  });

  it("現在タイプへ変わった代表的な第1世代ポケモンを含む", () => {
    // ピッピ
    expect(pokemonQuizRecords.find((record) => record.id === 35)).toMatchObject({
      name: "clefairy",
      type1: "fairy",
      type2: null,
    });
    // プリン
    expect(pokemonQuizRecords.find((record) => record.id === 39)).toMatchObject({
      name: "jigglypuff",
      type1: "normal",
      type2: "fairy",
    });
    // コイル
    expect(pokemonQuizRecords.find((record) => record.id === 81)).toMatchObject({
      name: "magnemite",
      type1: "electric",
      type2: "steel",
    });
    // バリヤード
    expect(pokemonQuizRecords.find((record) => record.id === 122)).toMatchObject({
      name: "mr-mime",
      type1: "psychic",
      type2: "fairy",
    });
  });

  it("現在タイプへ変わった代表的な第2世代ポケモンを含む", () => {
    // ピィ
    expect(pokemonQuizRecords.find((record) => record.id === 173)).toMatchObject({
      name: "cleffa",
      type1: "fairy",
      type2: null,
    });
    // ププリン
    expect(pokemonQuizRecords.find((record) => record.id === 174)).toMatchObject({
      name: "igglybuff",
      type1: "normal",
      type2: "fairy",
    });
    // トゲピー
    expect(pokemonQuizRecords.find((record) => record.id === 175)).toMatchObject({
      name: "togepi",
      type1: "fairy",
      type2: null,
    });
    // ブルー
    expect(pokemonQuizRecords.find((record) => record.id === 209)).toMatchObject({
      name: "snubbull",
      type1: "fairy",
      type2: null,
    });
  });
});
