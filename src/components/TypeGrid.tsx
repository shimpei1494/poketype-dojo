import { SimpleGrid } from "@mantine/core";

import { pokemonTypes, type PokemonType } from "../data/pokemon-types";
import { TypeBadge } from "./TypeBadge";

const emptyTypes: readonly PokemonType[] = [];

export type TypeGridProps = {
  disabledTypes?: readonly PokemonType[];
  onSelect: (type: PokemonType) => void;
  selectedTypes?: readonly PokemonType[];
};

export function TypeGrid({
  disabledTypes = emptyTypes,
  onSelect,
  selectedTypes = emptyTypes,
}: TypeGridProps) {
  return (
    <SimpleGrid cols={{ base: 3, sm: 6 }} spacing="xs">
      {pokemonTypes.map((type) => (
        <TypeBadge
          disabled={disabledTypes.includes(type)}
          key={type}
          onClick={() => onSelect(type)}
          selected={selectedTypes.includes(type)}
          type={type}
        />
      ))}
    </SimpleGrid>
  );
}
