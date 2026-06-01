import {
  Button,
  Card,
  Container,
  Collapse,
  Group,
  MultiSelect,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { HomeLink } from "../components/HomeLink";
import {
  allPokemonGenerationsFilter,
  parsePokemonGenerationFilter,
  pokemonGenerationFilterInfo,
  pokemonQuizRecords,
  type PokemonGenerationFilter,
} from "../data/pokemon";
import { pokemonTypeInfo, pokemonTypes, type PokemonType } from "../data/pokemon-types";
import { filterPokemonReferenceRecords } from "../utils/pokemon-reference";

type PokemonListSearch = {
  generation?: PokemonGenerationFilter;
  q?: string;
  types?: PokemonType[];
};

type PokemonListSearchState = {
  generation: PokemonGenerationFilter;
  q: string;
  types: PokemonType[];
};

const pokemonTypeSet = new Set<string>(pokemonTypes);
const emptyPokemonListSearch = {} satisfies PokemonListSearch;

export const Route = createFileRoute("/pokemon/")({
  component: PokemonListPage,
  validateSearch: (search: Record<string, unknown>): PokemonListSearch =>
    sanitizeSearch({
      generation: parsePokemonGenerationFilter(search.generation),
      q: parseQuery(search.q),
      types: parsePokemonTypes(search.types),
    }),
});

function PokemonListPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const resultListRef = useRef<HTMLDivElement>(null);
  const isComposingQueryRef = useRef(false);
  const hasMountedRef = useRef(false);
  const currentSearch = getSearchState(search);
  const typesKey = currentSearch.types.join(",");
  const [draftQuery, setDraftQuery] = useState(currentSearch.q);
  const [filtersOpened, setFiltersOpened] = useState(
    currentSearch.generation !== allPokemonGenerationsFilter || currentSearch.types.length > 0,
  );

  const filteredPokemon = useMemo(
    () =>
      filterPokemonReferenceRecords(pokemonQuizRecords, {
        generation: currentSearch.generation,
        query: currentSearch.q,
        types: currentSearch.types,
      }),
    [currentSearch.generation, currentSearch.q, currentSearch.types],
  );

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;

      return;
    }

    resultListRef.current?.scrollTo({ behavior: "smooth", top: 0 });
  }, [currentSearch.generation, currentSearch.q, typesKey]);

  useEffect(() => {
    if (!isComposingQueryRef.current) {
      setDraftQuery(currentSearch.q);
    }
  }, [currentSearch.q]);

  const updateSearch = useCallback(
    (nextSearch: PokemonListSearchState) => {
      void navigate({
        resetScroll: false,
        search: sanitizeSearch(nextSearch),
      });
    },
    [navigate],
  );

  function clearSearch() {
    updateSearch({
      generation: allPokemonGenerationsFilter,
      q: "",
      types: [],
    });
  }

  return (
    <Container className="page-shell pokemon-reference-page" size="lg">
      <Stack className="pokemon-reference-layout" gap="md">
        <Stack className="pokemon-reference-header" gap={4}>
          <HomeLink />
          <Text c="candyPink.7" fw={700} size="sm">
            Pokemon Reference
          </Text>
          <Title order={1}>ポケモン図鑑</Title>
          <Text c="dimmed">名前・タイプ・世代で探して、タイプと相性を確認できます。</Text>
        </Stack>

        <Card className="glass-panel pokemon-search-panel" p="md">
          <Stack gap="md">
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="sm" verticalSpacing="sm">
              <TextInput
                aria-label="ポケモン名"
                label="名前"
                onChange={(event) => {
                  const query = event.currentTarget.value;

                  setDraftQuery(query);

                  if (!isComposingQueryRef.current) {
                    updateSearch({ ...currentSearch, q: query });
                  }
                }}
                onCompositionEnd={(event) => {
                  const query = event.currentTarget.value;

                  isComposingQueryRef.current = false;
                  setDraftQuery(query);
                  updateSearch({ ...currentSearch, q: query });
                }}
                onCompositionStart={() => {
                  isComposingQueryRef.current = true;
                }}
                placeholder="例: ぴかちゅう"
                value={draftQuery}
              />
              <Group align="end" justify="space-between" wrap="nowrap">
                <Stack gap={2}>
                  <Text c="dimmed" fw={700} size="sm">
                    {pokemonQuizRecords.length}件中 {filteredPokemon.length}件
                  </Text>
                  <Text c="dimmed" size="xs">
                    {getFilterSummary(currentSearch)}
                  </Text>
                </Stack>
                <Group gap="xs" wrap="nowrap">
                  <Button
                    color="crystalBlue"
                    onClick={() => setFiltersOpened((opened) => !opened)}
                    size="xs"
                    variant={filtersOpened ? "filled" : "light"}
                  >
                    絞り込み
                  </Button>
                  <Button color="crystalBlue" onClick={clearSearch} size="xs" variant="light">
                    条件をクリア
                  </Button>
                </Group>
              </Group>
            </SimpleGrid>

            <Collapse expanded={filtersOpened}>
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="sm">
                <Select
                  allowDeselect={false}
                  data={pokemonGenerationFilterInfo.map((info) => ({
                    label: info.label,
                    value: String(info.value),
                  }))}
                  label="世代"
                  onChange={(value) =>
                    updateSearch({
                      ...currentSearch,
                      generation: parsePokemonGenerationFilter(
                        value ?? allPokemonGenerationsFilter,
                      ),
                    })
                  }
                  value={String(currentSearch.generation)}
                />
                <MultiSelect
                  clearable
                  data={pokemonTypeInfo.map((typeInfo) => ({
                    label: typeInfo.jaName,
                    value: typeInfo.name,
                  }))}
                  label="タイプ"
                  onChange={(values) =>
                    updateSearch({
                      ...currentSearch,
                      types: values.filter(isPokemonType),
                    })
                  }
                  placeholder="タイプを選択"
                  value={currentSearch.types}
                />
              </SimpleGrid>
            </Collapse>
          </Stack>
        </Card>

        <Stack className="pokemon-list-scroll" gap="sm" ref={resultListRef}>
          {filteredPokemon.length === 0 ? (
            <Card className="glass-panel" p="lg">
              <Text fw={700}>条件に一致するポケモンが見つかりませんでした</Text>
            </Card>
          ) : (
            filteredPokemon.map((pokemon) => (
              <Link
                className="pokemon-list-row"
                key={pokemon.id}
                params={{ pokemonId: String(pokemon.id) }}
                search={emptyPokemonListSearch}
                to="/pokemon/$pokemonId"
              >
                <Group justify="space-between" wrap="nowrap">
                  <Text c="dimmed" fw={800} size="sm">
                    No.{pokemon.id.toString().padStart(3, "0")}
                  </Text>
                  <Text fw={800}>{pokemon.jaName}</Text>
                </Group>
              </Link>
            ))
          )}
        </Stack>
      </Stack>
    </Container>
  );
}

function getFilterSummary(search: PokemonListSearchState) {
  const enabledFilters = [];

  if (search.generation !== allPokemonGenerationsFilter) {
    enabledFilters.push(
      pokemonGenerationFilterInfo.find((info) => info.value === search.generation)?.label ??
        `第${search.generation}世代`,
    );
  }

  if (search.types.length > 0) {
    enabledFilters.push(`${search.types.length}タイプ`);
  }

  return enabledFilters.length > 0 ? enabledFilters.join(" / ") : "全世代 / 全タイプ";
}

function parseQuery(value: unknown) {
  return typeof value === "string" ? value : "";
}

function parsePokemonTypes(value: unknown): PokemonType[] {
  const rawTypes =
    typeof value === "string"
      ? value.split(",")
      : Array.isArray(value)
        ? value.filter((item): item is string => typeof item === "string")
        : [];

  return rawTypes.filter(isPokemonType);
}

function getSearchState(search: PokemonListSearch): PokemonListSearchState {
  return {
    generation: search.generation ?? allPokemonGenerationsFilter,
    q: search.q ?? "",
    types: search.types ?? [],
  };
}

function sanitizeSearch(search: PokemonListSearchState): PokemonListSearch {
  return {
    generation: search.generation === allPokemonGenerationsFilter ? undefined : search.generation,
    q: search.q.trim() ? search.q : undefined,
    types: search.types.length > 0 ? search.types : undefined,
  };
}

function isPokemonType(value: string): value is PokemonType {
  return pokemonTypeSet.has(value);
}
