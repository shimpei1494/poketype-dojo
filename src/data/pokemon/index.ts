import { generation1Pokemon } from "./generation-1";
import { generation2Pokemon } from "./generation-2";
import { generation3Pokemon } from "./generation-3";
import { generation4Pokemon } from "./generation-4";
import { generation5Pokemon } from "./generation-5";
import { generation6Pokemon } from "./generation-6";
import { generation7Pokemon } from "./generation-7";
import { generation8Pokemon } from "./generation-8";
import { generation9Pokemon } from "./generation-9";
import {
  allPokemonGenerationsFilter,
  getPokemonGenerationInfo,
  pokemonGenerationInfo,
} from "./generation-info";
import type { PokemonGenerationFilter } from "./generation-info";
import type { PokemonGeneration } from "./types";
export { getPokemonImageUrl } from "../pokemon-image";

export {
  allPokemonGenerationsFilter,
  getPokemonGenerationFilterInfo,
  getPokemonGenerationInfo,
  isPokemonGenerationFilter,
  parsePokemonGenerationFilter,
  pokemonGenerationFilterInfo,
  pokemonGenerationInfo,
} from "./generation-info";
export type { PokemonGenerationFilter, PokemonGenerationFilterInfo } from "./generation-info";
export type { PokemonGeneration, PokemonQuizRecord } from "./types";

export const pokemonQuizRecords = [
  ...generation1Pokemon,
  ...generation2Pokemon,
  ...generation3Pokemon,
  ...generation4Pokemon,
  ...generation5Pokemon,
  ...generation6Pokemon,
  ...generation7Pokemon,
  ...generation8Pokemon,
  ...generation9Pokemon,
];

export const availablePokemonGenerations = pokemonGenerationInfo.map((info) => info.generation);

export type AvailablePokemonGeneration = PokemonGeneration;

export function getPokemonGenerationLabel(generation: AvailablePokemonGeneration) {
  return getPokemonGenerationInfo(generation)?.label ?? `第${generation}世代`;
}

export function getPokemonQuizRecordsByGenerationFilter(filter: PokemonGenerationFilter) {
  if (filter === allPokemonGenerationsFilter) {
    return pokemonQuizRecords;
  }

  return pokemonQuizRecords.filter((pokemon) => pokemon.generation === filter);
}
