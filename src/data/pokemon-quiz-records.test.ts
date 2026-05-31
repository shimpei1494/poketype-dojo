import { describe, expect, it } from "vite-plus/test";

import { availablePokemonGenerations, pokemonQuizRecords } from "./pokemon";
import { pokemonTypes } from "./pokemon-types";

const pokemonTypeSet = new Set(pokemonTypes);

describe("pokemonQuizRecords", () => {
  it("第1世代から第5世代まで649匹の通常個体データを持つ", () => {
    expect(pokemonQuizRecords).toHaveLength(649);
    expect(pokemonQuizRecords[0]?.id).toBe(1);
    expect(pokemonQuizRecords.at(-1)?.id).toBe(649);
  });

  it("第2世代100匹の通常個体データを持つ", () => {
    const generation2Records = pokemonQuizRecords.filter((record) => record.generation === 2);

    expect(generation2Records).toHaveLength(100);
    expect(generation2Records[0]?.id).toBe(152);
    expect(generation2Records.at(-1)?.id).toBe(251);
  });

  it("第3世代135匹の通常個体データを持つ", () => {
    const generation3Records = pokemonQuizRecords.filter((record) => record.generation === 3);

    expect(generation3Records).toHaveLength(135);
    expect(generation3Records[0]?.id).toBe(252);
    expect(generation3Records.at(-1)?.id).toBe(386);
  });

  it("第4世代107匹の通常個体データを持つ", () => {
    const generation4Records = pokemonQuizRecords.filter((record) => record.generation === 4);

    expect(generation4Records).toHaveLength(107);
    expect(generation4Records[0]?.id).toBe(387);
    expect(generation4Records.at(-1)?.id).toBe(493);
  });

  it("第5世代156匹の通常個体データを持つ", () => {
    const generation5Records = pokemonQuizRecords.filter((record) => record.generation === 5);

    expect(generation5Records).toHaveLength(156);
    expect(generation5Records[0]?.id).toBe(494);
    expect(generation5Records.at(-1)?.id).toBe(649);
  });

  it("全国図鑑番号に重複がない", () => {
    const ids = pokemonQuizRecords.map((record) => record.id);
    const duplicatedIds = ids.filter((id, index) => ids.indexOf(id) !== index);

    expect(duplicatedIds).toEqual([]);
  });

  it("全国図鑑番号が1から649まで連続している", () => {
    const ids = pokemonQuizRecords.map((record) => record.id);

    expect(ids).toEqual(Array.from({ length: 649 }, (_, index) => index + 1));
  });

  it("選択可能な世代に第1世代から第5世代を含む", () => {
    expect(availablePokemonGenerations).toEqual([1, 2, 3, 4, 5]);
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

  it("現在タイプへ変わった代表的な第3世代ポケモンを含む", () => {
    // ラルトス
    expect(pokemonQuizRecords.find((record) => record.id === 280)).toMatchObject({
      name: "ralts",
      type1: "psychic",
      type2: "fairy",
    });
    // ルリリ
    expect(pokemonQuizRecords.find((record) => record.id === 298)).toMatchObject({
      name: "azurill",
      type1: "normal",
      type2: "fairy",
    });
    // クチート
    expect(pokemonQuizRecords.find((record) => record.id === 303)).toMatchObject({
      name: "mawile",
      type1: "steel",
      type2: "fairy",
    });
  });

  it("現在タイプへ変わった代表的な第4世代ポケモンを含む", () => {
    // マネネ
    expect(pokemonQuizRecords.find((record) => record.id === 439)).toMatchObject({
      name: "mime-jr",
      type1: "psychic",
      type2: "fairy",
    });
    // トゲキッス
    expect(pokemonQuizRecords.find((record) => record.id === 468)).toMatchObject({
      name: "togekiss",
      type1: "fairy",
      type2: "flying",
    });
    // エルレイド
    expect(pokemonQuizRecords.find((record) => record.id === 475)).toMatchObject({
      name: "gallade",
      type1: "psychic",
      type2: "fighting",
    });
  });

  it("第4世代のフォームを持つ代表ポケモンは標準フォームのタイプで扱う", () => {
    // ミノマダム
    expect(pokemonQuizRecords.find((record) => record.id === 413)).toMatchObject({
      name: "wormadam",
      type1: "bug",
      type2: "grass",
    });
    // ロトム
    expect(pokemonQuizRecords.find((record) => record.id === 479)).toMatchObject({
      name: "rotom",
      type1: "electric",
      type2: "ghost",
    });
    // シェイミ
    expect(pokemonQuizRecords.find((record) => record.id === 492)).toMatchObject({
      name: "shaymin",
      type1: "grass",
      type2: null,
    });
  });

  it("現在タイプへ変わった代表的な第5世代ポケモンを含む", () => {
    // モンメン
    expect(pokemonQuizRecords.find((record) => record.id === 546)).toMatchObject({
      name: "cottonee",
      type1: "grass",
      type2: "fairy",
    });
    // エルフーン
    expect(pokemonQuizRecords.find((record) => record.id === 547)).toMatchObject({
      name: "whimsicott",
      type1: "grass",
      type2: "fairy",
    });
  });

  it("第5世代のフォームを持つ代表ポケモンは標準フォームのタイプで扱う", () => {
    // ヒヒダルマ
    expect(pokemonQuizRecords.find((record) => record.id === 555)).toMatchObject({
      name: "darmanitan",
      type1: "fire",
      type2: null,
    });
    // トルネロス
    expect(pokemonQuizRecords.find((record) => record.id === 641)).toMatchObject({
      name: "tornadus",
      type1: "flying",
      type2: null,
    });
    // メロエッタ
    expect(pokemonQuizRecords.find((record) => record.id === 648)).toMatchObject({
      name: "meloetta",
      type1: "normal",
      type2: "psychic",
    });
  });
});
