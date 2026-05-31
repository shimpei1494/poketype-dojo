import { describe, expect, it } from "vite-plus/test";

import { pokemonQuizRecords } from "./pokemon";
import { pokemonTypes } from "./pokemon-types";

const pokemonTypeSet = new Set(pokemonTypes);

describe("pokemonQuizRecords", () => {
  it("第1世代151匹の通常個体データを持つ", () => {
    expect(pokemonQuizRecords).toHaveLength(151);
    expect(pokemonQuizRecords[0]?.id).toBe(1);
    expect(pokemonQuizRecords.at(-1)?.id).toBe(151);
  });

  it("全国図鑑番号が重複せず1から151まで連続している", () => {
    const ids = pokemonQuizRecords.map((record) => record.id);

    expect(new Set(ids)).toHaveLength(151);
    expect(ids).toEqual(Array.from({ length: 151 }, (_, index) => index + 1));
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
});
