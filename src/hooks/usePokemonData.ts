import { useEffect, useState } from "react";

import { loadPokemonData } from "../data/load-pokemon-data";
import type { PokemonQuizRecord } from "../data/pokemon/types";

export function usePokemonData() {
  const [pokemonRecords, setPokemonRecords] = useState<readonly PokemonQuizRecord[] | null>(null);

  useEffect(() => {
    let isCurrent = true;

    void loadPokemonData().then(({ pokemonQuizRecords }) => {
      if (isCurrent) {
        setPokemonRecords(pokemonQuizRecords);
      }
    });

    return () => {
      isCurrent = false;
    };
  }, []);

  return pokemonRecords;
}
