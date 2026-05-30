export const effectivenessMultipliers = [0, 0.25, 0.5, 1, 2, 4] as const;

export type FinalMultiplier = (typeof effectivenessMultipliers)[number];

export type SingleMultiplier = 0 | 0.5 | 1 | 2;

export type EffectivenessLabel = {
  message: string;
  multiplier: FinalMultiplier;
  text: string;
};

export const effectivenessLabels = [
  { message: "効果がない", multiplier: 0, text: "0倍" },
  { message: "効果が今ひとつ × 2", multiplier: 0.25, text: "1/4倍" },
  { message: "効果が今ひとつ", multiplier: 0.5, text: "1/2倍" },
  { message: "等倍", multiplier: 1, text: "1倍" },
  { message: "効果は抜群", multiplier: 2, text: "2倍" },
  { message: "効果は抜群 × 2", multiplier: 4, text: "4倍" },
] as const satisfies readonly EffectivenessLabel[];

export const effectivenessLabelByMultiplier = new Map(
  effectivenessLabels.map((label) => [label.multiplier, label]),
);
