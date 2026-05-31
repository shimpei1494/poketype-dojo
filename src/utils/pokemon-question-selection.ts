import type { PokemonQuizRecord } from "../data/pokemon";

type SelectRandomPokemonQuestionParams = {
  previousPokemonId?: number;
  questionPool: readonly PokemonQuizRecord[];
  random?: () => number;
};

export function selectRandomPokemonQuestion({
  previousPokemonId,
  questionPool,
  random = Math.random,
}: SelectRandomPokemonQuestionParams): PokemonQuizRecord {
  const candidates =
    previousPokemonId === undefined || questionPool.length <= 1
      ? questionPool
      : questionPool.filter((record) => record.id !== previousPokemonId);

  return candidates[Math.floor(random() * candidates.length)] as PokemonQuizRecord;
}
