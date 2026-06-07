import {
  effectivenessLabelByMultiplier,
  type FinalMultiplier,
  type SingleMultiplier,
} from "../data/effectiveness-labels";
import type { PokemonType } from "../data/pokemon-types";
import type { Effectiveness } from "../data/type-effectiveness";

type EffectivenessDetail = {
  attackType: PokemonType;
  defenseType: PokemonType;
  multiplier: SingleMultiplier;
};

export type FinalEffectiveness = {
  details: EffectivenessDetail[];
  finalMultiplier: FinalMultiplier;
};

function getSingleMultiplier(
  effectiveness: readonly Effectiveness[],
  attackType: PokemonType,
  defenseType: PokemonType,
): SingleMultiplier {
  return (
    effectiveness.find((row) => row.attackType === attackType && row.defenseType === defenseType)
      ?.multiplier ?? 1
  );
}

export function getFinalMultiplier(params: {
  attackType: PokemonType;
  defenseTypes: readonly PokemonType[];
  effectiveness: readonly Effectiveness[];
}): FinalEffectiveness {
  const details = params.defenseTypes.map((defenseType) => ({
    attackType: params.attackType,
    defenseType,
    multiplier: getSingleMultiplier(params.effectiveness, params.attackType, defenseType),
  }));

  return {
    details,
    finalMultiplier: details.reduce<number>(
      (accumulator, detail) => accumulator * detail.multiplier,
      1,
    ) as FinalMultiplier,
  };
}

export function formatMultiplier(multiplier: FinalMultiplier): string {
  return getEffectivenessLabel(multiplier).text;
}

export function getEffectivenessMessage(multiplier: FinalMultiplier): string {
  return getEffectivenessLabel(multiplier).message;
}

function getEffectivenessLabel(multiplier: FinalMultiplier) {
  const label = effectivenessLabelByMultiplier.get(multiplier);

  if (!label) {
    throw new Error(`Unexpected effectiveness multiplier: ${multiplier}`);
  }

  return label;
}
