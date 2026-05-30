import { describe, expect, it } from "vite-plus/test";

import { typeEffectiveness } from "../data/type-effectiveness";
import { formatMultiplier, getEffectivenessMessage, getFinalMultiplier } from "./effectiveness";

describe("getFinalMultiplier", () => {
  it("でんき → みず / ひこう = 4倍", () => {
    const result = getFinalMultiplier({
      attackType: "electric",
      defenseTypes: ["water", "flying"],
      effectiveness: typeEffectiveness,
    });

    expect(result.finalMultiplier).toBe(4);
    expect(formatMultiplier(result.finalMultiplier)).toBe("4倍");
    expect(getEffectivenessMessage(result.finalMultiplier)).toBe("効果は抜群 × 2");
  });

  it("でんき → みず / じめん = 0倍", () => {
    const result = getFinalMultiplier({
      attackType: "electric",
      defenseTypes: ["water", "ground"],
      effectiveness: typeEffectiveness,
    });

    expect(result.finalMultiplier).toBe(0);
    expect(formatMultiplier(result.finalMultiplier)).toBe("0倍");
  });

  it("こおり → ドラゴン / ひこう = 4倍", () => {
    const result = getFinalMultiplier({
      attackType: "ice",
      defenseTypes: ["dragon", "flying"],
      effectiveness: typeEffectiveness,
    });

    expect(result.finalMultiplier).toBe(4);
  });

  it("ほのお → みず = 1/2倍", () => {
    const result = getFinalMultiplier({
      attackType: "fire",
      defenseTypes: ["water"],
      effectiveness: typeEffectiveness,
    });

    expect(result.finalMultiplier).toBe(0.5);
    expect(formatMultiplier(result.finalMultiplier)).toBe("1/2倍");
  });

  it("防御タイプが1つだけでも正しく動く", () => {
    const result = getFinalMultiplier({
      attackType: "fairy",
      defenseTypes: ["dragon"],
      effectiveness: typeEffectiveness,
    });

    expect(result.finalMultiplier).toBe(2);
  });

  it("18タイプ x 18タイプの相性データを持つ", () => {
    expect(typeEffectiveness).toHaveLength(324);
  });
});
