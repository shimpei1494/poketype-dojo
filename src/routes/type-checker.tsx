import {
  Button,
  Card,
  Container,
  Group,
  SegmentedControl,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { CompactResultSummary } from "../components/CompactResultSummary";
import { HomeLink } from "../components/HomeLink";
import { TypeBadge } from "../components/TypeBadge";
import { TypeGrid } from "../components/TypeGrid";
import { pokemonTypes, type PokemonType } from "../data/pokemon-types";
import { typeEffectiveness } from "../data/type-effectiveness";
import { getFinalMultiplier } from "../utils/effectiveness";

type CheckerSearch = {
  def1?: PokemonType;
  def2?: PokemonType;
  move?: PokemonType;
};

type DefendingSlot = "def1" | "def2";

const pokemonTypeSet = new Set<string>(pokemonTypes);

export const Route = createFileRoute("/type-checker")({
  component: TypeCheckerPage,
  validateSearch: (search: Record<string, unknown>): CheckerSearch => ({
    def1: parsePokemonType(search.def1),
    def2: parsePokemonType(search.def2),
    move: parsePokemonType(search.move),
  }),
});

function TypeCheckerPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [activeSlot, setActiveSlot] = useState<DefendingSlot>("def1");
  const hasAutoScrolledRef = useRef(false);
  const pendingAutoScrollRef = useRef(false);
  const preservedScrollYRef = useRef<number | null>(null);
  const workAreaRef = useRef<HTMLDivElement>(null);

  const sanitizedSearch = useMemo(() => sanitizeSearch(search), [search]);
  const hasSearchMismatch = !isSameSearch(search, sanitizedSearch);

  useEffect(() => {
    if (!hasSearchMismatch) {
      return;
    }

    notifications.show({
      color: "candyPink",
      message: "URLのタイプ指定を確認し、使える値だけを反映しました。",
      title: "選択状態を補正しました",
    });

    void navigate({ replace: true, search: sanitizedSearch });
  }, [hasSearchMismatch, navigate, sanitizedSearch]);

  const defenseTypes = [sanitizedSearch.def1, sanitizedSearch.def2].filter(
    (type): type is PokemonType => Boolean(type),
  );
  const result =
    sanitizedSearch.move && defenseTypes.length > 0
      ? getFinalMultiplier({
          attackType: sanitizedSearch.move,
          defenseTypes,
          effectiveness: typeEffectiveness,
        })
      : null;

  const updateSearch = useCallback(
    (nextSearch: CheckerSearch) => {
      if (hasAutoScrolledRef.current && !pendingAutoScrollRef.current) {
        preservedScrollYRef.current = window.scrollY;
      }

      void navigate({ resetScroll: false, search: sanitizeSearch(nextSearch) });
    },
    [navigate],
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (pendingAutoScrollRef.current) {
        pendingAutoScrollRef.current = false;
        scrollToWorkArea();

        return;
      }

      if (preservedScrollYRef.current !== null) {
        window.scrollTo({ top: preservedScrollYRef.current });
        preservedScrollYRef.current = null;
      }
    }, 80);

    return () => window.clearTimeout(timeoutId);
  }, [sanitizedSearch]);

  function requestAutoScrollOnce() {
    if (hasAutoScrolledRef.current) {
      return;
    }

    hasAutoScrolledRef.current = true;
    pendingAutoScrollRef.current = true;
  }

  function scrollToWorkArea() {
    const workArea = workAreaRef.current;

    if (!workArea) {
      return;
    }

    window.scrollTo({
      behavior: "smooth",
      top: workArea.getBoundingClientRect().top + window.scrollY - 16,
    });
  }

  function selectMove(type: PokemonType) {
    requestAutoScrollOnce();
    updateSearch({
      ...sanitizedSearch,
      move: sanitizedSearch.move === type ? undefined : type,
    });
  }

  function selectDefense(type: PokemonType) {
    requestAutoScrollOnce();
    const currentType = sanitizedSearch[activeSlot];
    const otherSlot = activeSlot === "def1" ? "def2" : "def1";
    const nextType = currentType === type ? undefined : type;

    const nextSearch = sanitizeSearch({
      ...sanitizedSearch,
      [activeSlot]: nextType,
    });

    updateSearch(nextSearch);

    if (activeSlot === "def1" && !currentType && nextType && !nextSearch.def2) {
      setActiveSlot("def2");
    }

    if (activeSlot === "def1" && currentType === type) {
      setActiveSlot("def1");
    }

    if (otherSlot === "def1" && !nextSearch.def1) {
      setActiveSlot("def1");
    }
  }

  function clearDefenseTypes() {
    setActiveSlot("def1");
    updateSearch({
      def1: undefined,
      def2: undefined,
      move: sanitizedSearch.move,
    });
  }

  return (
    <Container className="page-shell" size="lg">
      <Stack gap="lg">
        <Stack gap={4}>
          <HomeLink />
          <Text c="candyPink.7" fw={700} size="sm">
            Type Matchup Checker
          </Text>
          <Title order={1}>タイプ相性チェッカー</Title>
          <Text c="dimmed">技のタイプと攻撃されるポケモンのタイプを選んでください。</Text>
        </Stack>

        <Card className="glass-panel work-area-start" p="lg" ref={workAreaRef}>
          <Stack gap="md">
            <Title order={2} size="h3">
              技のタイプ
            </Title>
            <TypeGrid
              onSelect={selectMove}
              selectedTypes={sanitizedSearch.move ? [sanitizedSearch.move] : []}
            />
          </Stack>
        </Card>

        <CompactResultSummary
          placeholder={getPlaceholderMessage(sanitizedSearch.move, defenseTypes)}
          result={result}
        />

        <Card className="glass-panel" p="lg">
          <Stack gap="md">
            <Group align="center" justify="space-between">
              <Title order={2} size="h3">
                攻撃されるポケモンのタイプ
              </Title>
              <Button color="crystalBlue" onClick={clearDefenseTypes} size="xs" variant="light">
                すべて外す
              </Button>
            </Group>

            <Group>
              <TypeSlot slot="タイプ1" type={sanitizedSearch.def1} />
              <TypeSlot slot="タイプ2" type={sanitizedSearch.def2} />
            </Group>

            <SegmentedControl
              data={[
                { label: "タイプ1を編集", value: "def1" },
                { label: "タイプ2を編集", value: "def2" },
              ]}
              onChange={(value) => setActiveSlot(value as DefendingSlot)}
              value={activeSlot}
            />

            <TypeGrid
              disabledTypes={
                activeSlot === "def1" && sanitizedSearch.def2
                  ? [sanitizedSearch.def2]
                  : activeSlot === "def2" && sanitizedSearch.def1
                    ? [sanitizedSearch.def1]
                    : []
              }
              onSelect={selectDefense}
              selectedTypes={defenseTypes}
            />
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}

function TypeSlot({ slot, type }: { slot: string; type?: PokemonType }) {
  return type ? (
    <TypeBadge selected type={type} />
  ) : (
    <Button color="gray" size="sm" variant="light">
      {slot}: 未選択
    </Button>
  );
}

function parsePokemonType(value: unknown): PokemonType | undefined {
  return typeof value === "string" && pokemonTypeSet.has(value)
    ? (value as PokemonType)
    : undefined;
}

function sanitizeSearch(search: CheckerSearch): CheckerSearch {
  return {
    def1: search.def1,
    def2: search.def1 === search.def2 ? undefined : search.def2,
    move: search.move,
  };
}

function isSameSearch(left: CheckerSearch, right: CheckerSearch) {
  return left.move === right.move && left.def1 === right.def1 && left.def2 === right.def2;
}

function getPlaceholderMessage(
  moveType: PokemonType | undefined,
  defenseTypes: readonly PokemonType[],
) {
  if (!moveType) {
    return "技のタイプを選んでください";
  }

  if (defenseTypes.length === 0) {
    return "攻撃されるポケモンのタイプを選んでください";
  }

  return "タイプを選んでください";
}
