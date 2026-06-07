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
import { Link, createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";

import { HomeLink } from "../../components/HomeLink";
import { PokemonTypeMemoryHint } from "../../components/PokemonTypeMemoryHint";
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
  generation: PokemonGenerationFilter;
  hasAnswered: boolean;
  isHintOpen: boolean;
  question: Question | null;
  selectedTypes: PokemonType[];
};

type QuizAction =
  | { type: "answer" }
  | {
      generation: PokemonGenerationFilter;
      questionPool: readonly PokemonQuizRecord[];
      type: "changeGeneration";
    }
  | { type: "clearSelectedTypes" }
  | { questionPool: readonly PokemonQuizRecord[]; type: "nextQuestion" }
  | { type: "toggleHint" }
  | { pokemonType: PokemonType; type: "toggleType" };

export const Route = createFileRoute("/quiz/pokemon-type")({
  component: PokemonTypeQuizPage,
  validateSearch: (search: Record<string, unknown>): QuizSearch => {
    return { generation: parsePokemonGenerationFilter(search.generation) };
  },
});

function PokemonTypeQuizPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  return <PokemonTypeQuizContent navigate={navigate} search={search} />;
}

function PokemonTypeQuizContent({
  navigate,
  search,
}: {
  navigate: ReturnType<typeof Route.useNavigate>;
  search: QuizSearch;
}) {
  const questionPool = useMemo(() => getQuestionPool(search.generation), [search.generation]);
  const [state, dispatch] = useReducer(quizReducer, search.generation, createInitialState);
  const [loadedImagePokemonId, setLoadedImagePokemonId] = useState<number | null>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);

  const activeQuestion = state.question;
  const correctTypes = activeQuestion === null ? [] : getPokemonTypes(activeQuestion.pokemon);
  const isCorrect =
    activeQuestion !== null && state.hasAnswered && areSameTypes(state.selectedTypes, correctTypes);
  const disabledTypes =
    state.selectedTypes.length >= 2 ? pokemonTypesExcept(state.selectedTypes) : undefined;
  const generationOptions = pokemonGenerationFilterInfo;
  const selectedGenerationOption =
    generationOptions.find((option) => option.value === state.generation) ?? generationOptions[0]!;

  const scrollSelectedGenerationIntoView = useCallback((element: HTMLButtonElement | null) => {
    element?.scrollIntoView({
      block: "nearest",
      inline: "center",
    });
  }, []);

  useEffect(() => {
    if (state.generation === search.generation && state.question !== null) {
      return;
    }

    dispatch({ generation: search.generation, questionPool, type: "changeGeneration" });
  }, [questionPool, search.generation, state.generation, state.question]);

  useEffect(() => {
    if (!state.hasAnswered) {
      return;
    }

    feedbackRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [state.hasAnswered]);

  const changeGeneration = useCallback(
    (generation: PokemonGenerationFilter) => {
      if (generation === state.generation) {
        return;
      }

      void navigate({
        search: { generation },
      });
    },
    [navigate, state.generation],
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
                  const selected = option.value === state.generation;

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

        {activeQuestion === null ? (
          <PokemonQuestionSkeletonCard />
        ) : (
          <>
            <Card className="glass-panel pokemon-question-card" p="lg">
              <Stack align="center" gap="md">
                <Text c="dimmed" fw={700} size="sm">
                  No.{activeQuestion.pokemon.id.toString().padStart(3, "0")}
                </Text>
                <div className="pokemon-quiz-image-frame">
                  {loadedImagePokemonId === activeQuestion.pokemon.id ? null : (
                    <Skeleton className="pokemon-quiz-image-placeholder" radius="999px" />
                  )}
                  <Image
                    alt={activeQuestion.pokemon.jaName}
                    className={
                      loadedImagePokemonId === activeQuestion.pokemon.id
                        ? "pokemon-quiz-image"
                        : "pokemon-quiz-image pokemon-quiz-image--loading"
                    }
                    fit="contain"
                    key={activeQuestion.pokemon.id}
                    onError={() => setLoadedImagePokemonId(activeQuestion.pokemon.id)}
                    onLoad={() => setLoadedImagePokemonId(activeQuestion.pokemon.id)}
                    src={getPokemonImageUrl(activeQuestion.pokemon)}
                  />
                </div>
                <Stack align="center" gap={2}>
                  <Title order={2}>{activeQuestion.pokemon.jaName}</Title>
                  <Text c="dimmed" size="sm">
                    このポケモンのタイプは？
                  </Text>
                  <Link
                    className="pokemon-question-detail-link"
                    params={{ pokemonId: String(activeQuestion.pokemon.id) }}
                    to="/pokemon/$pokemonId"
                  >
                    図鑑ページで詳細を見る
                  </Link>
                </Stack>
              </Stack>
              <PokemonTypeMemoryHint
                hint={activeQuestion.pokemon.typeMemoryHint}
                isOpen={state.isHintOpen}
                mode="interactive"
                onToggle={() => dispatch({ type: "toggleHint" })}
              />
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
        )}

        {state.question !== null && state.hasAnswered ? (
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

function PokemonQuestionSkeletonCard() {
  return (
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
  );
}

function createInitialState(generation: PokemonGenerationFilter): QuizState {
  return {
    answeredCount: 0,
    correctCount: 0,
    generation,
    hasAnswered: false,
    isHintOpen: false,
    question: null,
    selectedTypes: [],
  };
}

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "answer": {
      if (state.question === null || state.selectedTypes.length === 0 || state.hasAnswered) {
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
    case "changeGeneration":
      return {
        answeredCount: 0,
        correctCount: 0,
        generation: action.generation,
        hasAnswered: false,
        isHintOpen: false,
        question: createQuestion(action.questionPool, state.question?.pokemon.id),
        selectedTypes: [],
      };
    case "nextQuestion":
      return {
        ...state,
        hasAnswered: false,
        isHintOpen: false,
        question: createQuestion(action.questionPool, state.question?.pokemon.id),
        selectedTypes: [],
      };
    case "toggleHint":
      return { ...state, isHintOpen: !state.isHintOpen };
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
