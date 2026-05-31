---
name: add-pokemon-generation-data
description: Add or update PokéType Dojo static Pokémon quiz data by generation. Use when Codex needs to collect Pokémon names, current standard-form types, generation metadata, artwork paths, or create/validate src/data/pokemon/generation-N.ts files for the Pokémon type quiz.
---

# Add Pokémon Generation Data

Use this skill to add generation-specific static Pokémon data for PokéType Dojo.

## Ground Rules

- Keep quiz data static TypeScript. Do not fetch Pokémon data at app runtime.
- Browse current sources while preparing data. Pokémon type assignments and official pages can change.
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
},
```

Sort records by National Pokédex number ascending.

## Common Pitfalls

- Do not include alternate forms as separate quiz records.
- Do not use old pre-Fairy type assignments for current quiz data.
- Do not store full GitHub raw image URLs in records.
- Do not add a generation to `availablePokemonGenerations` until its file and tests are complete.
- Do not hand-wave missing Pokémon. The count and ID continuity test should catch omissions.
