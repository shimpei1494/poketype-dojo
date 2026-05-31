import {
  Button,
  Card,
  Container,
  Group,
  Image,
  SegmentedControl,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";

import { HomeLink } from "../../components/HomeLink";
import { TypeBadge } from "../../components/TypeBadge";
import { TypeGrid } from "../../components/TypeGrid";
import {
  availablePokemonGenerations,
  getPokemonGenerationLabel,
  getPokemonImageUrl,
  pokemonQuizRecords,
  type AvailablePokemonGeneration,
  type PokemonQuizRecord,
} from "../../data/pokemon";
import { pokemonTypes, type PokemonType } from "../../data/pokemon-types";

type GenerationFilter = "all" | AvailablePokemonGeneration;

type QuizSearch = {
  generation: GenerationFilter;
  invalidGeneration?: string;
};

type Question = {
  pokemon: PokemonQuizRecord;
};

type QuizState = {
  answeredCount: number;
  correctCount: number;
  hasAnswered: boolean;
  question: Question;
  selectedTypes: PokemonType[];
};

type QuizAction =
  | { type: "answer" }
  | { type: "clearSelectedTypes" }
  | { questionPool: readonly PokemonQuizRecord[]; type: "nextQuestion" }
  | { questionPool: readonly PokemonQuizRecord[]; type: "reset" }
  | { pokemonType: PokemonType; type: "toggleType" };

export const Route = createFileRoute("/quiz/pokemon-type")({
  component: PokemonTypeQuizPage,
  validateSearch: (search: Record<string, unknown>): QuizSearch => {
    if (typeof search.invalidGeneration === "string") {
      return { generation: "all", invalidGeneration: search.invalidGeneration };
    }

    const generation = search.generation;

    if (generation === "all" || generation === undefined) {
      return { generation: "all" };
    }

    const parsedGeneration =
      typeof generation === "number"
        ? generation
        : typeof generation === "string"
          ? Number(generation)
          : Number.NaN;

    if (isAvailableGenerationFilter(parsedGeneration)) {
      return { generation: parsedGeneration };
    }

    return { generation: "all", invalidGeneration: String(generation) };
  },
});

function PokemonTypeQuizPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const questionPool = useMemo(() => getQuestionPool(search.generation), [search.generation]);
  const [state, dispatch] = useReducer(quizReducer, questionPool, createInitialState);
  const feedbackRef = useRef<HTMLDivElement>(null);

  const correctTypes = getPokemonTypes(state.question.pokemon);
  const isCorrect = state.hasAnswered && areSameTypes(state.selectedTypes, correctTypes);
  const disabledTypes =
    state.selectedTypes.length >= 2 ? pokemonTypesExcept(state.selectedTypes) : undefined;

  useEffect(() => {
    if (!state.hasAnswered) {
      return;
    }

    feedbackRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [state.hasAnswered]);

  useEffect(() => {
    dispatch({ questionPool, type: "reset" });
  }, [questionPool]);

  useEffect(() => {
    if (search.invalidGeneration === undefined) {
      return;
    }

    notifications.show({
      color: "coralError",
      message: `generation=${search.invalidGeneration} は使えません。全世代に戻しました。`,
      title: "出題範囲を確認してください",
    });
    void navigate({ replace: true, search: { generation: "all" } });
  }, [navigate, search.invalidGeneration]);

  const changeGeneration = useCallback(
    (generation: string) => {
      void navigate({
        search: {
          generation:
            generation === "all" ? "all" : (Number(generation) as AvailablePokemonGeneration),
        },
      });
    },
    [navigate],
  );

  return (
    <Container className="page-shell" size="lg">
      <Stack gap="lg">
        <Stack gap={4}>
          <HomeLink />
          <Text c="candyPink.7" fw={700} size="sm">
            Pokemon Type Quiz
          </Text>
          <Title order={1}>ポケモンタイプ当て</Title>
          <Text c="dimmed">第1世代151匹のタイプを、1匹ずつ当てていきましょう。</Text>
        </Stack>

        <Card className="glass-panel" p="lg">
          <Stack gap="md">
            <Group justify="space-between">
              <Text fw={700}>出題範囲</Text>
              <Text c="dimmed" size="sm">
                {state.correctCount} / {state.answeredCount} 正解
              </Text>
            </Group>
            <SegmentedControl
              data={[
                { label: "全世代", value: "all" },
                ...availablePokemonGenerations.map((generation) => ({
                  label: getPokemonGenerationLabel(generation),
                  value: `${generation}`,
                })),
              ]}
              onChange={changeGeneration}
              value={`${search.generation}`}
            />
          </Stack>
        </Card>

        <Card className="glass-panel pokemon-question-card" p="lg">
          <Stack align="center" gap="md">
            <Text c="dimmed" fw={700} size="sm">
              No.{state.question.pokemon.id.toString().padStart(3, "0")}
            </Text>
            <Image
              alt={state.question.pokemon.jaName}
              className="pokemon-quiz-image"
              fit="contain"
              src={getPokemonImageUrl(state.question.pokemon)}
            />
            <Stack align="center" gap={2}>
              <Title order={2}>{state.question.pokemon.jaName}</Title>
              <Text c="dimmed" size="sm">
                このポケモンのタイプは？
              </Text>
            </Stack>
          </Stack>
        </Card>

        <Card className="glass-panel" p="lg">
          <Stack gap="md">
            <Group justify="space-between">
              <Stack gap={2}>
                <Text fw={800} size="lg">
                  タイプを選ぶ
                </Text>
                <Text c="dimmed" size="sm">
                  タイプを1つか2つ選んで回答してください。
                </Text>
              </Stack>
              {state.selectedTypes.length > 0 ? (
                <Button
                  color="crystalBlue"
                  disabled={state.hasAnswered}
                  onClick={() => dispatch({ type: "clearSelectedTypes" })}
                  size="xs"
                  variant="light"
                >
                  すべて外す
                </Button>
              ) : null}
            </Group>

            {state.selectedTypes.length > 0 ? (
              <Group gap="xs">
                {state.selectedTypes.map((type) => (
                  <TypeBadge key={type} selected type={type} />
                ))}
              </Group>
            ) : (
              <Text c="dimmed" fw={700} size="sm">
                未選択
              </Text>
            )}

            <TypeGrid
              disabledTypes={
                state.hasAnswered ? pokemonTypesExcept(state.selectedTypes) : disabledTypes
              }
              onSelect={(pokemonType) => dispatch({ pokemonType, type: "toggleType" })}
              selectedTypes={state.selectedTypes}
            />

            <Button
              disabled={state.selectedTypes.length === 0 || state.hasAnswered}
              onClick={() => dispatch({ type: "answer" })}
              size="md"
            >
              回答する
            </Button>
          </Stack>
        </Card>

        {state.hasAnswered ? (
          <Stack gap="md" ref={feedbackRef}>
            <PokemonTypeFeedback
              correctTypes={correctTypes}
              isCorrect={isCorrect}
              selectedTypes={state.selectedTypes}
            />
            <Button onClick={() => dispatch({ questionPool, type: "nextQuestion" })} size="md">
              次の問題
            </Button>
          </Stack>
        ) : null}
      </Stack>
    </Container>
  );
}

function createInitialState(questionPool: readonly PokemonQuizRecord[]): QuizState {
  return {
    answeredCount: 0,
    correctCount: 0,
    hasAnswered: false,
    question: createQuestion(questionPool),
    selectedTypes: [],
  };
}

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "answer": {
      if (state.selectedTypes.length === 0 || state.hasAnswered) {
        return state;
      }

      const isCorrect = areSameTypes(state.selectedTypes, getPokemonTypes(state.question.pokemon));

      return {
        ...state,
        answeredCount: state.answeredCount + 1,
        correctCount: isCorrect ? state.correctCount + 1 : state.correctCount,
        hasAnswered: true,
      };
    }
    case "clearSelectedTypes": {
      if (state.hasAnswered) {
        return state;
      }

      return { ...state, selectedTypes: [] };
    }
    case "nextQuestion":
      return {
        ...state,
        hasAnswered: false,
        question: createQuestion(action.questionPool, state.question.pokemon.id),
        selectedTypes: [],
      };
    case "reset":
      return createInitialState(action.questionPool);
    case "toggleType": {
      if (state.hasAnswered) {
        return state;
      }

      if (state.selectedTypes.includes(action.pokemonType)) {
        return {
          ...state,
          selectedTypes: state.selectedTypes.filter((type) => type !== action.pokemonType),
        };
      }

      if (state.selectedTypes.length >= 2) {
        return state;
      }

      return { ...state, selectedTypes: [...state.selectedTypes, action.pokemonType] };
    }
  }
}

function PokemonTypeFeedback({
  correctTypes,
  isCorrect,
  selectedTypes,
}: {
  correctTypes: PokemonType[];
  isCorrect: boolean;
  selectedTypes: PokemonType[];
}) {
  return (
    <Card className="glass-panel" p="lg">
      <Stack gap="md">
        <Text c={isCorrect ? "mintSuccess.8" : "coralError.7"} fw={800} size="xl">
          {isCorrect ? "正解！" : "不正解！"}
        </Text>

        <Stack gap="xs">
          <Text fw={700}>あなたの回答</Text>
          <Group gap="xs">
            {selectedTypes.map((type) => (
              <TypeBadge key={type} selected type={type} />
            ))}
          </Group>
        </Stack>

        {!isCorrect ? (
          <Stack gap="xs">
            <Text fw={700}>正解</Text>
            <Group gap="xs">
              {correctTypes.map((type) => (
                <TypeBadge key={type} selected type={type} />
              ))}
            </Group>
          </Stack>
        ) : null}
      </Stack>
    </Card>
  );
}

function createQuestion(
  questionPool: readonly PokemonQuizRecord[],
  previousPokemonId?: number,
): Question {
  const candidates =
    previousPokemonId === undefined
      ? questionPool
      : questionPool.filter((record) => record.id !== previousPokemonId);

  return {
    pokemon: pickRandom(candidates),
  };
}

function getQuestionPool(generation: GenerationFilter) {
  if (generation === "all") {
    return pokemonQuizRecords;
  }

  return pokemonQuizRecords.filter((pokemon) => pokemon.generation === generation);
}

function isAvailableGenerationFilter(value: number): value is AvailablePokemonGeneration {
  return availablePokemonGenerations.some((generation) => generation === value);
}

function getPokemonTypes(pokemon: PokemonQuizRecord): PokemonType[] {
  return pokemon.type2 === null ? [pokemon.type1] : [pokemon.type1, pokemon.type2];
}

function areSameTypes(firstTypes: readonly PokemonType[], secondTypes: readonly PokemonType[]) {
  return (
    firstTypes.length === secondTypes.length &&
    firstTypes.every((type) => secondTypes.includes(type))
  );
}

function pokemonTypesExcept(types: readonly PokemonType[]) {
  return pokemonTypes.filter((type) => !types.includes(type));
}

function pickRandom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)] as T;
}
