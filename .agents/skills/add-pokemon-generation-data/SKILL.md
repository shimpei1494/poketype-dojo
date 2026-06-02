---
name: add-pokemon-generation-data
description: Add or update PokéType Dojo static Pokémon quiz data by generation. Use when Codex needs to collect Pokémon names, current standard-form types, type memory hints, generation metadata, artwork paths, or create/validate src/data/pokemon/generation-N.ts files for the Pokémon type quiz.
---

# Add Pokémon Generation Data

Use this skill to add generation-specific static Pokémon data for PokéType Dojo.

## Ground Rules

- Keep quiz data static TypeScript. Do not fetch Pokémon data at app runtime.
- Browse current sources while preparing data. Pokémon type assignments, official pages, names, and descriptions can change.
- Prefer official Pokémon sources for names and type confirmation. Use at least one reliable secondary source for cross-checking large tables.
- Do not bulk-hit PokeAPI for every Pokémon. PokeAPI sprite URL patterns are acceptable for `imagePath` derivation, but data collection should use prepared lists and spot checks.
- Treat quiz records as standard-form Pokémon only. Exclude regional forms, Mega Evolutions, Gigantamax, special forms, and form-specific type changes unless the user explicitly asks for detail-page form data.
- Use current standard-form types, not historical generation-era types.
- Preserve existing project conventions. Inspect `src/data/pokemon/types.ts`, `src/data/pokemon/index.ts`, and existing `generation-N.ts` before editing.

## Data Shape

Conform to the current `PokemonQuizRecord` type. At the time this skill was written:

```ts
type PokemonQuizRecord = {
  generation: PokemonGeneration;
  id: number;
  imagePath: string;
  jaName: string;
  name: string;
  type1: PokemonType;
  type2: PokemonType | null;
  typeMemoryHint: string;
};
```

Use `id` as the National Pokédex number unless the project type has since introduced `nationalDexNo`.

Use relative artwork paths:

```ts
imagePath: "official-artwork/152.png";
```

`getPokemonImageUrl()` owns the external/local base URL. Do not store full artwork URLs in generation data.

## Generation Ranges

Use these National Pokédex ranges for standard species:

- Gen 1: 1-151
- Gen 2: 152-251
- Gen 3: 252-386
- Gen 4: 387-493
- Gen 5: 494-649
- Gen 6: 650-721
- Gen 7: 722-809
- Gen 8: 810-905
- Gen 9: 906-1025

If newer species exist, verify the current National Pokédex range before adding them.

## Workflow

1. Inspect existing data and tests:
   - `src/data/pokemon/types.ts`
   - `src/data/pokemon/index.ts`
   - `src/data/pokemon/generation-*.ts`
   - `src/data/pokemon-quiz-records.test.ts`
2. Identify the target generation, National Pokédex range, and expected count.
3. Collect a table with:
   - National Pokédex number
   - English identifier used by the project (`name`)
   - Japanese display name (`jaName`)
   - current standard-form `type1`
   - current standard-form `type2` or `null`
   - `typeMemoryHint`
4. Cross-check the table:
   - verify all IDs in the generation range are present exactly once
   - verify type IDs are valid `PokemonType` values
   - spot-check type changes and special cases carefully
5. Create `src/data/pokemon/generation-N.ts`.
6. Export and include the new generation in `src/data/pokemon/index.ts`.
7. Extend `PokemonGeneration` in `src/data/pokemon/types.ts` only if needed by the current type union.
8. Add or update tests for:
   - generation count
   - continuous National Pokédex IDs
   - valid type values
   - required `typeMemoryHint` string values
   - non-empty hints for the generation whose hints were requested
   - representative special cases, with Japanese-name comments above each case
9. Run:
   - `vp check`
   - `vp test`

## Source Strategy

For each generation, build data from a stable table first, then verify edge cases.

Recommended source pattern:

- Use the official Pokémon Pokédex pages when practical for Japanese names and current types.
- Use a reputable structured reference such as Pokémon Database, Bulbapedia, or Serebii to cross-check large ranges.
- Use the existing project type IDs from `src/data/pokemon-types.ts`; do not invent alternate names.
- For artwork, derive `imagePath` from the National Dex number as `official-artwork/{id}.png`.

When sources disagree, pause and inspect the specific Pokémon manually. Prefer the current official standard-form type for quiz records.

## Type Memory Hints

`typeMemoryHint` is a short Japanese explanation used both as a hint in the Pokémon Type Quiz and as "タイプの覚え方" on the Pokémon detail page. It is required on every `PokemonQuizRecord`. For generations whose hints are not ready yet, use an empty string (`""`) rather than omitting the field.

When the user asks for hint creation for a specific generation, fill `typeMemoryHint` for every record in that generation and leave unrelated generations unchanged.

Quality rules:

- Prioritize the type that is harder to infer from appearance. Do not spend most of the sentence explaining that an obviously plant-like Pokémon is Grass, for example.
- Type names may be included directly. The hint is a learning aid, not a spoiler-free riddle.
- Do not write a bare answer list such as `くさ・どくタイプ。`.
- Explain the memory hook: visible features, name, classification, motif, evolution-line context, or official Pokédex flavor.
- Prefer this evidence order:
  1. Official artwork-visible traits
  2. Japanese/English name, classification, or motif
  3. Evolution-line relationship
  4. Official Pokédex description or setting
- Avoid obscure trivia that only makes sense if the user has read a specific Pokédex entry.
- Keep each hint to 1-2 Japanese sentences, roughly 40-90 Japanese characters when practical.
- Preserve existing `id`, `generation`, `imagePath`, `jaName`, `name`, `type1`, and `type2` unless the user explicitly asked to correct those fields.

Good examples:

```ts
typeMemoryHint: "植物らしさでくさは自然に連想できるので、もう一方は毒をもつ植物のイメージでどくタイプと覚える。",
typeMemoryHint: "ほのおは見た目通り。翼をもつがドラゴンではなく、空を飛ぶ姿からひこうタイプと覚える。",
```

Weak examples:

```ts
typeMemoryHint: "くさ・どくタイプ。", // no memory hook
typeMemoryHint: "葉っぱがあるのでくさタイプ。", // ignores the harder Poison type
```

### Prompt for Another AI

Use this prompt when delegating hint creation for one generation:

```txt
PokéType Dojo の `src/data/pokemon/generation-{N}.ts` にある第{N}世代ポケモン全件について、`typeMemoryHint` を日本語で作成してください。

目的:
- ポケモンタイプクイズのヒント、および詳細画面の「タイプの覚え方」として使う短文を作る。
- 見た目だけでは分かりづらいタイプ、意外なタイプ、紛らわしいタイプ、進化系で変化するタイプを優先して説明する。

必ず守ること:
- 既存の `id`, `generation`, `imagePath`, `jaName`, `name`, `type1`, `type2` は変更しない。
- `typeMemoryHint` だけを書き換える。
- 対象世代の全レコードで `typeMemoryHint` を空文字ではない文字列にする。
- 対象外の世代ファイルは変更しない。
- タイプ名を直接含めてよいが、単なる答えリストは禁止。
- 1〜2文、40〜90字程度を目安にする。
- 公式イラスト、名前、分類、モチーフ、進化系、公式図鑑説明を手がかりにしてよい。
- 図鑑説明だけに依存する細かすぎる説明は避ける。
- 現在の標準フォームのタイプと矛盾しないか確認する。

情報源:
- 公式ポケモン図鑑を優先して、名前・分類・タイプ・見た目を確認する。
- Pokémon Database、Bulbapedia、Serebii など信頼できる二次情報で大きな表やモチーフをクロスチェックする。
- 既存データの `type1` / `type2` を最終的なタイプ事実として扱い、ヒント文がそれと矛盾しないようにする。

完了条件:
- `src/data/pokemon/generation-{N}.ts` の対象世代全件に実ヒントが入っている。
- `vp check` が通る。
```

## Output Style

Keep each record small and consistent:

```ts
{
  generation: 2,
  id: 152,
  imagePath: "official-artwork/152.png",
  jaName: "チコリータ",
  name: "chikorita",
  type1: "grass",
  type2: null,
  typeMemoryHint: "葉っぱのような頭からくさタイプ。単タイプなので、首まわりの芽や植物モチーフに注目すると覚えやすい。",
},
```

Sort records by National Pokédex number ascending.

## Common Pitfalls

- Do not include alternate forms as separate quiz records.
- Do not use old pre-Fairy type assignments for current quiz data.
- Do not store full GitHub raw image URLs in records.
- Do not add a generation to `availablePokemonGenerations` until its file and tests are complete.
- Do not hand-wave missing Pokémon. The count and ID continuity test should catch omissions.
