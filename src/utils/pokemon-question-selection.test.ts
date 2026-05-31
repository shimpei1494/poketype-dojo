import { describe, expect, it } from "vite-plus/test";

import type { PokemonQuizRecord } from "../data/pokemon";
import { selectRandomPokemonQuestion } from "./pokemon-question-selection";

const questionPool = [
  createPokemonRecord(1, "bulbasaur"),
  createPokemonRecord(2, "ivysaur"),
  createPokemonRecord(3, "venusaur"),
];

describe("selectRandomPokemonQuestion", () => {
  it("初期問題では全候補からランダムに選ぶ", () => {
    const selected = selectRandomPokemonQuestion({
      questionPool,
      random: () => 0,
    });

    expect(selected.id).toBe(1);
  });

  it("次の問題では直前のポケモンを候補から除外する", () => {
    const selected = selectRandomPokemonQuestion({
      previousPokemonId: 1,
      questionPool,
      random: () => 0,
    });

    expect(selected.id).toBe(2);
  });

  it("候補が1匹だけの場合は同じポケモンを選べる", () => {
    const selected = selectRandomPokemonQuestion({
      previousPokemonId: 1,
      questionPool: [questionPool[0] as PokemonQuizRecord],
      random: () => 0,
    });

    expect(selected.id).toBe(1);
  });
});

function createPokemonRecord(id: number, name: string): PokemonQuizRecord {
  return {
    generation: 1,
    id,
    imagePath: `official-artwork/${id}.png`,
    jaName: name,
    name,
    type1: "grass",
    type2: null,
  };
}
