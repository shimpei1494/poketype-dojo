import type { PokemonGeneration } from "./types";

export const allPokemonGenerationsFilter = "all";

export type PokemonGenerationFilter = typeof allPokemonGenerationsFilter | PokemonGeneration;

export type PokemonGenerationInfo = {
  generation: PokemonGeneration;
  label: string;
  region: string;
  representativeTitles: string;
};

export type PokemonGenerationFilterInfo = {
  description: string;
  label: string;
  region: string;
  representativeTitles: string;
  value: PokemonGenerationFilter;
};

export const pokemonGenerationInfo = [
  {
    generation: 1,
    label: "第1世代",
    region: "カントー",
    representativeTitles: "赤・緑",
  },
  {
    generation: 2,
    label: "第2世代",
    region: "ジョウト",
    representativeTitles: "金・銀",
  },
  {
    generation: 3,
    label: "第3世代",
    region: "ホウエン",
    representativeTitles: "ルビー・サファイア",
  },
  {
    generation: 4,
    label: "第4世代",
    region: "シンオウ",
    representativeTitles: "ダイヤモンド・パール",
  },
  {
    generation: 5,
    label: "第5世代",
    region: "イッシュ",
    representativeTitles: "ブラック・ホワイト",
  },
  {
    generation: 6,
    label: "第6世代",
    region: "カロス",
    representativeTitles: "X・Y",
  },
  {
    generation: 7,
    label: "第7世代",
    region: "アローラ",
    representativeTitles: "サン・ムーン",
  },
  {
    generation: 8,
    label: "第8世代",
    region: "ガラル",
    representativeTitles: "ソード・シールド",
  },
  {
    generation: 9,
    label: "第9世代",
    region: "パルデア",
    representativeTitles: "スカーレット・バイオレット",
  },
] satisfies PokemonGenerationInfo[];

const firstGeneration = pokemonGenerationInfo[0]?.generation ?? 1;
const lastGeneration = pokemonGenerationInfo.at(-1)?.generation ?? firstGeneration;

export const pokemonGenerationFilterInfo = [
  {
    description: `第${firstGeneration}〜第${lastGeneration}世代のポケモンから出題`,
    label: "全世代",
    region: "すべての地方",
    representativeTitles: `第${firstGeneration}〜第${lastGeneration}世代`,
    value: allPokemonGenerationsFilter,
  },
  ...pokemonGenerationInfo.map((info) => ({
    description: `${info.representativeTitles} / ${info.region}地方`,
    label: info.label,
    region: `${info.region}地方`,
    representativeTitles: info.representativeTitles,
    value: info.generation,
  })),
] satisfies PokemonGenerationFilterInfo[];

export function getPokemonGenerationInfo(generation: PokemonGeneration) {
  return pokemonGenerationInfo.find((info) => info.generation === generation);
}

export function getPokemonGenerationFilterInfo(filter: PokemonGenerationFilter) {
  return pokemonGenerationFilterInfo.find((info) => info.value === filter);
}

export function isPokemonGenerationFilter(value: unknown): value is PokemonGenerationFilter {
  if (value === allPokemonGenerationsFilter) {
    return true;
  }

  return (
    typeof value === "number" && pokemonGenerationInfo.some((info) => info.generation === value)
  );
}

export function parsePokemonGenerationFilter(value: unknown): PokemonGenerationFilter {
  if (value === undefined) {
    return allPokemonGenerationsFilter;
  }

  if (value === allPokemonGenerationsFilter) {
    return allPokemonGenerationsFilter;
  }

  const parsedValue =
    typeof value === "number" ? value : typeof value === "string" ? Number(value) : Number.NaN;

  return isPokemonGenerationFilter(parsedValue) ? parsedValue : allPokemonGenerationsFilter;
}
