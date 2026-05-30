# Static type effectiveness data for the event build

For the event build, Pokémon type names and type effectiveness are committed as static TypeScript data instead of being stored in SQLite. These datasets are small, fixed, and needed by the highest-priority checker and matchup quiz, so static data keeps the 2-hour implementation stable while still allowing TanStack Start loaders to provide initial page data. Pokémon quiz records can move to SQLite + Drizzle later, because that dataset is larger and more likely to grow by generation or form.
