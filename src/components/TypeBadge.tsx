import { Button, type ButtonProps } from "@mantine/core";

import { pokemonTypeByName, type PokemonType } from "../data/pokemon-types";

export type TypeBadgeProps = {
  disabled?: boolean;
  onClick?: () => void;
  selected?: boolean;
  type: PokemonType;
} & Pick<ButtonProps, "size">;

export function TypeBadge({ disabled, onClick, selected, size = "sm", type }: TypeBadgeProps) {
  const typeInfo = pokemonTypeByName.get(type);

  if (!typeInfo) {
    throw new Error(`Unknown Pokemon type: ${type}`);
  }

  return (
    <Button
      aria-pressed={selected}
      color="dark"
      disabled={disabled}
      onClick={onClick}
      size={size}
      style={{
        "--button-bg": selected ? typeInfo.color : "#ffffffcc",
        "--button-bd": `1px solid ${selected ? typeInfo.color : "#ead9e7"}`,
        "--button-color": selected ? "#2f2530" : "#4a3b4a",
        "--button-hover": typeInfo.color,
        boxShadow: selected ? "0 8px 18px rgba(99, 65, 91, 0.16)" : undefined,
      }}
      variant={selected ? "filled" : "default"}
    >
      {typeInfo.jaName}
    </Button>
  );
}
