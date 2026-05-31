import { generation1Pokemon } from "./generation-1";
import { generation2Pokemon } from "./generation-2";
import { generation3Pokemon } from "./generation-3";
import { generation4Pokemon } from "./generation-4";
import { generation5Pokemon } from "./generation-5";
import { generation6Pokemon } from "./generation-6";
import { generation7Pokemon } from "./generation-7";

export type { PokemonGeneration, PokemonQuizRecord } from "./types";

export const pokemonQuizRecords = [
  ...generation1Pokemon,
  ...generation2Pokemon,
  ...generation3Pokemon,
  ...generation4Pokemon,
  ...generation5Pokemon,
  ...generation6Pokemon,
  ...generation7Pokemon,
];

export const availablePokemonGenerations = [1, 2, 3, 4, 5, 6, 7] as const;

export type AvailablePokemonGeneration = (typeof availablePokemonGenerations)[number];

const pokemonImageBaseUrl =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other";

export function getPokemonImageUrl(pokemon: { imagePath: string }) {
  return `${pokemonImageBaseUrl}/${pokemon.imagePath}`;
}

export function getPokemonGenerationLabel(generation: AvailablePokemonGeneration) {
  return `第${generation}世代`;
}
