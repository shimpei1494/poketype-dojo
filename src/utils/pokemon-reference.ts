import type { FinalMultiplier } from "../data/effectiveness-labels";
import type { PokemonQuizRecord } from "../data/pokemon";
import type { PokemonType } from "../data/pokemon-types";
import { pokemonTypes } from "../data/pokemon-types";
import type { PokemonGenerationFilter } from "../data/pokemon/generation-info";
import { typeEffectiveness } from "../data/type-effectiveness";
import { getFinalMultiplier } from "./effectiveness";

export type PokemonReferenceFilters = {
  generation: PokemonGenerationFilter;
  query: string;
  types: readonly PokemonType[];
};

export type EffectivenessGroup = {
  attackTypes: PokemonType[];
  multiplier: Exclude<FinalMultiplier, 1>;
};

export const pokemonReferenceEffectivenessOrder = [4, 2, 0.5, 0.25, 0] as const;

export const pokemonReferenceEffectivenessLabels = new Map<Exclude<FinalMultiplier, 1>, string>([
  [4, "4倍"],
  [2, "2倍"],
  [0.5, "0.5倍"],
  [0.25, "0.25倍"],
  [0, "無効"],
]);

export function filterPokemonReferenceRecords(
  records: readonly PokemonQuizRecord[],
  filters: PokemonReferenceFilters,
): PokemonQuizRecord[] {
  const normalizedQuery = normalizeJapaneseSearchText(filters.query.trim());

  return records.filter((record) => {
    if (filters.generation !== "all" && record.generation !== filters.generation) {
      return false;
    }

    if (normalizedQuery && !normalizeJapaneseSearchText(record.jaName).includes(normalizedQuery)) {
      return false;
    }

    const recordTypes = getPokemonTypes(record);

    return filters.types.every((type) => recordTypes.includes(type));
  });
}

export function getPokemonTypes(pokemon: PokemonQuizRecord): PokemonType[] {
  return pokemon.type2 === null ? [pokemon.type1] : [pokemon.type1, pokemon.type2];
}

export function getPokemonDefensiveEffectivenessGroups(
  pokemon: PokemonQuizRecord,
): EffectivenessGroup[] {
  const defenseTypes = getPokemonTypes(pokemon);
  const groups = new Map<Exclude<FinalMultiplier, 1>, PokemonType[]>(
    pokemonReferenceEffectivenessOrder.map((multiplier) => [multiplier, []]),
  );

  for (const attackType of pokemonTypes) {
    const { finalMultiplier } = getFinalMultiplier({
      attackType,
      defenseTypes,
      effectiveness: typeEffectiveness,
    });

    if (finalMultiplier !== 1) {
      groups.get(finalMultiplier)?.push(attackType);
    }
  }

  return pokemonReferenceEffectivenessOrder.reduce<EffectivenessGroup[]>((result, multiplier) => {
    const attackTypes = groups.get(multiplier) ?? [];

    if (attackTypes.length > 0) {
      result.push({ attackTypes, multiplier });
    }

    return result;
  }, []);
}

export function getFirstPokemonId(records: readonly PokemonQuizRecord[]) {
  return records[0]?.id;
}

export function getLastPokemonId(records: readonly PokemonQuizRecord[]) {
  return records.at(-1)?.id;
}

export function normalizeJapaneseSearchText(value: string) {
  return value
    .normalize("NFKC")
    .replace(/[\u3041-\u3096]/g, (character) => String.fromCharCode(character.charCodeAt(0) + 0x60))
    .toLocaleLowerCase("ja-JP");
}
