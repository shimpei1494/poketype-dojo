let pokemonDataPromise: Promise<typeof import("./pokemon")> | null = null;

export function loadPokemonData() {
  pokemonDataPromise ??= import("./pokemon");

  return pokemonDataPromise;
}

export function preloadPokemonData() {
  void loadPokemonData();
}
