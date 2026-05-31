import {
  Button,
  Card,
  Container,
  Group,
  HoverCard,
  Image,
  ScrollArea,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";

import { HomeLink } from "../../components/HomeLink";
import { TypeBadge } from "../../components/TypeBadge";
import { TypeGrid } from "../../components/TypeGrid";
import {
  getPokemonImageUrl,
  getPokemonQuizRecordsByGenerationFilter,
  parsePokemonGenerationFilter,
  pokemonGenerationFilterInfo,
  type PokemonGenerationFilter,
  type PokemonQuizRecord,
} from "../../data/pokemon";
import { pokemonTypes, type PokemonType } from "../../data/pokemon-types";
import { selectRandomPokemonQuestion } from "../../utils/pokemon-question-selection";

type QuizSearch = {
  generation: PokemonGenerationFilter;
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

type InitialQuizData = {
  initialQuestion: Question;
};

type QuizAction =
  | { type: "answer" }
  | { type: "clearSelectedTypes" }
  | { questionPool: readonly PokemonQuizRecord[]; type: "nextQuestion" }
  | { pokemonType: PokemonType; type: "toggleType" };

const getInitialPokemonTypeQuestion = createServerFn({ method: "GET" })
  .inputValidator((generation: PokemonGenerationFilter) => generation)
  .handler(async ({ data: generation }) => createQuestion(getQuestionPool(generation)));

export const Route = createFileRoute("/quiz/pokemon-type")({
  component: PokemonTypeQuizPage,
  pendingComponent: PokemonTypeQuizPendingPage,
  validateSearch: (search: Record<string, unknown>): QuizSearch => {
    return { generation: parsePokemonGenerationFilter(search.generation) };
  },
  loaderDeps: ({ search }) => ({
    generation: search.generation,
  }),
  loader: {
    handler: async ({ deps }) => ({
      initialQuestion: await getInitialPokemonTypeQuestion({ data: deps.generation }),
    }),
    staleReloadMode: "blocking",
  },
  pendingMinMs: 160,
  pendingMs: 160,
});

function PokemonTypeQuizPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const initialQuizData = Route.useLoaderData();

  return (
    <PokemonTypeQuizContent
      initialQuizData={initialQuizData}
      key={`${search.generation}-${initialQuizData.initialQuestion.pokemon.id}`}
      navigate={navigate}
      search={search}
    />
  );
}

function PokemonTypeQuizPendingPage() {
  return (
    <Container className="page-shell" size="lg">
      <Stack gap="lg">
        <Stack gap={4}>
          <HomeLink />
          <Text c="candyPink.7" fw={700} size="sm">
            Pokemon Type Quiz
          </Text>
          <Title order={1}>ポケモンタイプ当て</Title>
          <Text c="dimmed">ポケモンの姿からタイプを当てていきましょう。</Text>
        </Stack>

        <Card className="glass-panel" p="lg">
          <Stack gap="md">
            <Group justify="space-between">
              <Text fw={700}>出題範囲</Text>
              <Skeleton height={18} radius="xl" width={76} />
            </Group>
            <Skeleton height={36} radius="md" />
            <Skeleton height={58} radius="md" />
          </Stack>
        </Card>

        <Card className="glass-panel pokemon-question-card" p="lg">
          <Stack align="center" gap="md">
            <Skeleton height={18} radius="xl" width={72} />
            <Skeleton className="pokemon-quiz-image" radius="999px" />
            <Stack align="center" gap={8}>
              <Skeleton height={32} radius="xl" width={180} />
              <Skeleton height={18} radius="xl" width={156} />
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}

function PokemonTypeQuizContent({
  initialQuizData,
  navigate,
  search,
}: {
  initialQuizData: InitialQuizData;
  navigate: ReturnType<typeof Route.useNavigate>;
  search: QuizSearch;
}) {
  const questionPool = useMemo(() => getQuestionPool(search.generation), [search.generation]);
  const [state, dispatch] = useReducer(quizReducer, initialQuizData, createInitialState);
  const feedbackRef = useRef<HTMLDivElement>(null);

  const correctTypes = getPokemonTypes(state.question.pokemon);
  const isCorrect = state.hasAnswered && areSameTypes(state.selectedTypes, correctTypes);
  const disabledTypes =
    state.selectedTypes.length >= 2 ? pokemonTypesExcept(state.selectedTypes) : undefined;
  const generationOptions = pokemonGenerationFilterInfo;
  const selectedGenerationOption =
    generationOptions.find((option) => option.value === search.generation) ?? generationOptions[0]!;

  const scrollSelectedGenerationIntoView = useCallback((element: HTMLButtonElement | null) => {
    element?.scrollIntoView({
      block: "nearest",
      inline: "center",
    });
  }, []);

  useEffect(() => {
    if (!state.hasAnswered) {
      return;
    }

    feedbackRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [state.hasAnswered]);

  const changeGeneration = useCallback(
    (generation: PokemonGenerationFilter) => {
      void navigate({
        search: { generation },
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
          <Text c="dimmed">ポケモンの姿からタイプを当てていきましょう。</Text>
        </Stack>

        <Card className="glass-panel" p="lg">
          <Stack gap="md">
            <Group justify="space-between">
              <Text fw={700}>出題範囲</Text>
              <Text c="dimmed" size="sm">
                {state.correctCount} / {state.answeredCount} 正解
              </Text>
            </Group>
            <ScrollArea
              className="generation-filter-scroll"
              offsetScrollbars="x"
              scrollbarSize={6}
              scrollbars="x"
              type="hover"
            >
              <Group gap="xs" wrap="nowrap">
                {generationOptions.map((option) => {
                  const selected = option.value === search.generation;

                  return (
                    <HoverCard closeDelay={80} key={String(option.value)} openDelay={240} withArrow>
                      <HoverCard.Target>
                        <Button
                          aria-pressed={selected}
                          className="generation-filter-option"
                          color={selected ? "candyPink" : "crystalBlue"}
                          onClick={() => changeGeneration(option.value)}
                          ref={selected ? scrollSelectedGenerationIntoView : undefined}
                          size="sm"
                          variant={selected ? "filled" : "light"}
                        >
                          {option.label}
                        </Button>
                      </HoverCard.Target>
                      <HoverCard.Dropdown className="generation-filter-popover">
                        <Stack gap={2}>
                          <Text fw={800} size="xs">
                            {option.representativeTitles} / {option.region}
                          </Text>
                        </Stack>
                      </HoverCard.Dropdown>
                    </HoverCard>
                  );
                })}
              </Group>
            </ScrollArea>
            <Stack className="generation-filter-summary" gap={2}>
              <Text fw={800} size="sm">
                {selectedGenerationOption.label}
              </Text>
              <Text c="dimmed" size="sm">
                {selectedGenerationOption.description}
              </Text>
            </Stack>
          </Stack>
        </Card>

        <>
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
        </>

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

function createInitialState(initialQuizData: InitialQuizData): QuizState {
  return {
    answeredCount: 0,
    correctCount: 0,
    hasAnswered: false,
    question: initialQuizData.initialQuestion,
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
  return {
    pokemon: selectRandomPokemonQuestion({ previousPokemonId, questionPool }),
  };
}

function getQuestionPool(generation: PokemonGenerationFilter) {
  return getPokemonQuizRecordsByGenerationFilter(generation);
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
