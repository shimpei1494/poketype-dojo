import type { PokemonQuizRecord } from "../data/pokemon/types";
import { normalizeJapaneseSearchText } from "../utils/pokemon-reference";

export type PokemonCandidateReference = {
  id: number;
  jaName: string;
};

/**
 * AIが出力した候補(全国図鑑番号 + 日本語名)を図鑑データセットのレコードに解決する。
 * 名前は表記揺れがあっても一意に特定できるため、IDと食い違う場合は名前一致を優先する。
 */
export function resolvePokemonCandidate(
  records: readonly PokemonQuizRecord[],
  candidate: PokemonCandidateReference,
): PokemonQuizRecord | null {
  const normalizedName = normalizeJapaneseSearchText(candidate.jaName.trim());

  if (normalizedName) {
    const byName = records.find(
      (record) => normalizeJapaneseSearchText(record.jaName) === normalizedName,
    );

    if (byName) {
      return byName;
    }
  }

  return records.find((record) => record.id === candidate.id) ?? null;
}
