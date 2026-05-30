export const pokemonTypes = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
] as const;

export type PokemonType = (typeof pokemonTypes)[number];

export type PokemonTypeInfo = {
  color: string;
  jaName: string;
  name: PokemonType;
};

export const pokemonTypeInfo = [
  { color: "#b8b8a8", jaName: "ノーマル", name: "normal" },
  { color: "#f6a56f", jaName: "ほのお", name: "fire" },
  { color: "#82b7f6", jaName: "みず", name: "water" },
  { color: "#f7d95c", jaName: "でんき", name: "electric" },
  { color: "#94d77b", jaName: "くさ", name: "grass" },
  { color: "#a8e4e5", jaName: "こおり", name: "ice" },
  { color: "#d88372", jaName: "かくとう", name: "fighting" },
  { color: "#c586c9", jaName: "どく", name: "poison" },
  { color: "#e6c979", jaName: "じめん", name: "ground" },
  { color: "#b7a5f4", jaName: "ひこう", name: "flying" },
  { color: "#f596b5", jaName: "エスパー", name: "psychic" },
  { color: "#c4d66b", jaName: "むし", name: "bug" },
  { color: "#cdbb72", jaName: "いわ", name: "rock" },
  { color: "#9182bf", jaName: "ゴースト", name: "ghost" },
  { color: "#9b86f2", jaName: "ドラゴン", name: "dragon" },
  { color: "#8d7b72", jaName: "あく", name: "dark" },
  { color: "#b9c8d0", jaName: "はがね", name: "steel" },
  { color: "#f4a8d7", jaName: "フェアリー", name: "fairy" },
] as const satisfies readonly PokemonTypeInfo[];

export const pokemonTypeByName = new Map(
  pokemonTypeInfo.map((typeInfo) => [typeInfo.name, typeInfo]),
);
