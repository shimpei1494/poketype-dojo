const pokemonImageBaseUrl =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other";

export function getPokemonImageUrl(pokemon: { imagePath: string }) {
  return `${pokemonImageBaseUrl}/${pokemon.imagePath}`;
}
