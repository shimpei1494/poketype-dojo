import type { PokemonType } from "../pokemon-types";

export type PokemonGeneration = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type PokemonQuizRecord = {
  generation: PokemonGeneration;
  id: number;
  imagePath: string;
  jaName: string;
  name: string;
  type1: PokemonType;
  type2: PokemonType | null;
  typeMemoryHint: string;
};
