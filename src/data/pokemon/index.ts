import { generation1Pokemon } from "./generation-1";

export type { PokemonGeneration, PokemonQuizRecord } from "./types";

export const pokemonQuizRecords = [...generation1Pokemon];

export const availablePokemonGenerations = [1] as const;

export type AvailablePokemonGeneration = (typeof availablePokemonGenerations)[number];

const pokemonImageBaseUrl =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other";

export function getPokemonImageUrl(pokemon: { imagePath: string }) {
  return `${pokemonImageBaseUrl}/${pokemon.imagePath}`;
}

export function getPokemonGenerationLabel(generation: AvailablePokemonGeneration) {
  return `第${generation}世代`;
}
