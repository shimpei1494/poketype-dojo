import { generation1Pokemon } from "./generation-1";
import { generation2Pokemon } from "./generation-2";

export type { PokemonGeneration, PokemonQuizRecord } from "./types";

export const pokemonQuizRecords = [...generation1Pokemon, ...generation2Pokemon];

export const availablePokemonGenerations = [1, 2] as const;

export type AvailablePokemonGeneration = (typeof availablePokemonGenerations)[number];

const pokemonImageBaseUrl =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other";

export function getPokemonImageUrl(pokemon: { imagePath: string }) {
  return `${pokemonImageBaseUrl}/${pokemon.imagePath}`;
}

export function getPokemonGenerationLabel(generation: AvailablePokemonGeneration) {
  return `第${generation}世代`;
}
