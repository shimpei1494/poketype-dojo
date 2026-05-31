import {
  Button,
  Card,
  Container,
  Group,
  SegmentedControl,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useReducer, useRef } from "react";

import { HomeLink } from "../../components/HomeLink";
import { MultiplierResult } from "../../components/MultiplierResult";
import { TypeBadge } from "../../components/TypeBadge";
import { effectivenessLabels, type FinalMultiplier } from "../../data/effectiveness-labels";
import { pokemonTypes, type PokemonType } from "../../data/pokemon-types";
import { typeEffectiveness } from "../../data/type-effectiveness";
import { getFinalMultiplier, type FinalEffectiveness } from "../../utils/effectiveness";

type QuizMode = "dual" | "mixed" | "single";

type QuizSearch = {
  mode: QuizMode;
};

type Question = {
  defenseTypes: PokemonType[];
  moveType: PokemonType;
  result: FinalEffectiveness;
};

type QuizState = {
  answeredCount: number;
  correctCount: number;
  question: Question;
  selectedAnswer: FinalMultiplier | null;
};

type QuizAction =
  | { multiplier: FinalMultiplier; type: "answer" }
  | { mode: QuizMode; type: "nextQuestion" };

const quizModes = new Set<QuizMode>(["mixed", "single", "dual"]);

const getInitialTypeMatchupQuestion = createServerFn({ method: "GET" })
  .inputValidator((mode: QuizMode) => mode)
  .handler(async ({ data: mode }) => createQuestion(mode));

export const Route = createFileRoute("/quiz/type-matchup")({
  component: TypeMatchupQuizPage,
  pendingComponent: TypeMatchupQuizPendingPage,
  validateSearch: (search: Record<string, unknown>): QuizSearch => ({
    mode:
      typeof search.mode === "string" && quizModes.has(search.mode as QuizMode)
        ? (search.mode as QuizMode)
        : "mixed",
  }),
  loaderDeps: ({ search }) => ({
    mode: search.mode,
  }),
  loader: {
    handler: async ({ deps }) => ({
      initialQuestion: await getInitialTypeMatchupQuestion({ data: deps.mode }),
    }),
    staleReloadMode: "blocking",
  },
  pendingMinMs: 160,
  pendingMs: 160,
});

function TypeMatchupQuizPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { initialQuestion } = Route.useLoaderData();

  return (
    <TypeMatchupQuizContent
      initialQuestion={initialQuestion}
      key={`${search.mode}-${initialQuestion.moveType}-${initialQuestion.defenseTypes.join("-")}`}
      navigate={navigate}
      search={search}
    />
  );
}

function TypeMatchupQuizPendingPage() {
  return (
    <Container className="page-shell" size="lg">
      <Stack gap="lg">
        <Stack gap={4}>
          <HomeLink />
          <Text c="candyPink.7" fw={700} size="sm">
            Type Matchup Quiz
          </Text>
          <Title order={1}>タイプ相性クイズ</Title>
          <Text c="dimmed">倍率と効果文を選んで、タイプ相性を練習しましょう。</Text>
        </Stack>

        <Card className="glass-panel" p="lg">
          <Stack gap="md">
            <Group justify="space-between">
              <Text fw={700}>出題範囲</Text>
              <Skeleton height={18} radius="xl" width={76} />
            </Group>
            <Skeleton height={36} radius="md" />
          </Stack>
        </Card>

        <Card className="glass-panel" p="lg">
          <Stack gap="md">
            <Skeleton height={28} radius="xl" width="42%" />
            <Group>
              <Skeleton height={40} radius="md" width={92} />
              <Text fw={700}>→</Text>
              <Skeleton height={40} radius="md" width={92} />
              <Skeleton height={40} radius="md" width={92} />
            </Group>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
              <Skeleton height={42} radius="md" />
              <Skeleton height={42} radius="md" />
              <Skeleton height={42} radius="md" />
              <Skeleton height={42} radius="md" />
              <Skeleton height={42} radius="md" />
              <Skeleton height={42} radius="md" />
            </SimpleGrid>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}

function TypeMatchupQuizContent({
  initialQuestion,
  navigate,
  search,
}: {
  initialQuestion: Question;
  navigate: ReturnType<typeof Route.useNavigate>;
  search: QuizSearch;
}) {
  const [state, dispatch] = useReducer(quizReducer, initialQuestion, createInitialState);
  const feedbackRef = useRef<HTMLDivElement>(null);

  const hasAnswered = state.selectedAnswer !== null;

  useEffect(() => {
    if (!hasAnswered) {
      return;
    }

    feedbackRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hasAnswered]);

  const changeMode = useCallback(
    (mode: string) => {
      void navigate({ search: { mode: mode as QuizMode } });
    },
    [navigate],
  );

  function answer(multiplier: FinalMultiplier) {
    dispatch({ multiplier, type: "answer" });
  }

  function nextQuestion() {
    dispatch({ mode: search.mode, type: "nextQuestion" });
  }

  return (
    <Container className="page-shell" size="lg">
      <Stack gap="lg">
        <Stack gap={4}>
          <HomeLink />
          <Text c="candyPink.7" fw={700} size="sm">
            Type Matchup Quiz
          </Text>
          <Title order={1}>タイプ相性クイズ</Title>
          <Text c="dimmed">倍率と効果文を選んで、タイプ相性を練習しましょう。</Text>
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
                { label: "全タイプ", value: "mixed" },
                { label: "単タイプのみ", value: "single" },
                { label: "2タイプのみ", value: "dual" },
              ]}
              onChange={changeMode}
              value={search.mode}
            />
          </Stack>
        </Card>

        <Card className="glass-panel" p="lg">
          <Stack gap="md">
            <Text fw={700} size="lg">
              {getQuestionText(state.question)}
            </Text>
            <Group>
              <TypeBadge selected type={state.question.moveType} />
              <Text fw={700}>→</Text>
              {state.question.defenseTypes.map((type) => (
                <TypeBadge key={type} selected type={type} />
              ))}
            </Group>

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
              {effectivenessLabels.map((label) => (
                <Button
                  color={getAnswerColor({
                    answer: label.multiplier,
                    correctAnswer: state.question.result.finalMultiplier,
                    selectedAnswer: state.selectedAnswer,
                  })}
                  disabled={hasAnswered}
                  key={label.multiplier}
                  onClick={() => answer(label.multiplier)}
                  variant={getAnswerVariant({
                    answer: label.multiplier,
                    correctAnswer: state.question.result.finalMultiplier,
                    selectedAnswer: state.selectedAnswer,
                  })}
                >
                  {label.text}（{label.message}）
                </Button>
              ))}
            </SimpleGrid>
          </Stack>
        </Card>

        {state.selectedAnswer !== null ? (
          <Stack gap="md" ref={feedbackRef}>
            <AnswerFeedback
              correctAnswer={state.question.result.finalMultiplier}
              selectedAnswer={state.selectedAnswer}
            />
            <MultiplierResult result={state.question.result} />
            <Button onClick={nextQuestion} size="md">
              次の問題
            </Button>
          </Stack>
        ) : null}
      </Stack>
    </Container>
  );
}

function createInitialState(initialQuestion: Question): QuizState {
  return {
    answeredCount: 0,
    correctCount: 0,
    question: initialQuestion,
    selectedAnswer: null,
  };
}

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "answer": {
      if (state.selectedAnswer !== null) {
        return state;
      }

      const isCorrect = action.multiplier === state.question.result.finalMultiplier;

      return {
        ...state,
        answeredCount: state.answeredCount + 1,
        correctCount: isCorrect ? state.correctCount + 1 : state.correctCount,
        selectedAnswer: action.multiplier,
      };
    }
    case "nextQuestion":
      return {
        ...state,
        question: createQuestion(action.mode),
        selectedAnswer: null,
      };
  }
}

function AnswerFeedback({
  correctAnswer,
  selectedAnswer,
}: {
  correctAnswer: FinalMultiplier;
  selectedAnswer: FinalMultiplier;
}) {
  const isCorrect = selectedAnswer === correctAnswer;
  const selectedLabel = effectivenessLabels.find((label) => label.multiplier === selectedAnswer);
  const correctLabel = effectivenessLabels.find((label) => label.multiplier === correctAnswer);

  return (
    <Card className="glass-panel" p="lg">
      <Stack gap="sm">
        <Text c={isCorrect ? "mintSuccess.8" : "coralError.7"} fw={800} size="xl">
          {isCorrect ? "正解！" : "不正解！"}
        </Text>
        <Text fw={700}>
          あなたの回答: {selectedLabel?.text}（{selectedLabel?.message}）
        </Text>
        {!isCorrect ? (
          <Text fw={700}>
            正解: {correctLabel?.text}（{correctLabel?.message}）
          </Text>
        ) : null}
      </Stack>
    </Card>
  );
}

function createQuestion(mode: QuizMode): Question {
  const moveType = pickRandom(pokemonTypes);
  const defenseTypes = createDefenseTypes(mode);
  const result = getFinalMultiplier({
    attackType: moveType,
    defenseTypes,
    effectiveness: typeEffectiveness,
  });

  return {
    defenseTypes,
    moveType,
    result,
  };
}

function createDefenseTypes(mode: QuizMode): PokemonType[] {
  const useDualType = mode === "dual" || (mode === "mixed" && Math.random() < 0.8);
  const firstType = pickRandom(pokemonTypes);

  if (!useDualType) {
    return [firstType];
  }

  const secondType = pickRandom(pokemonTypes.filter((type) => type !== firstType));

  return [firstType, secondType];
}

function pickRandom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)] as T;
}

function getQuestionText(question: Question) {
  const defenseText = question.defenseTypes.length === 1 ? "単タイプ" : "2タイプ";

  return `${defenseText}の相性は何倍？`;
}

function getAnswerColor(params: {
  answer: FinalMultiplier;
  correctAnswer: FinalMultiplier;
  selectedAnswer: FinalMultiplier | null;
}) {
  if (params.selectedAnswer === null) {
    return "candyPink";
  }

  if (params.answer === params.correctAnswer) {
    return "mintSuccess";
  }

  if (params.answer === params.selectedAnswer) {
    return "coralError";
  }

  return "gray";
}

function getAnswerVariant(params: {
  answer: FinalMultiplier;
  correctAnswer: FinalMultiplier;
  selectedAnswer: FinalMultiplier | null;
}) {
  if (params.selectedAnswer === null) {
    return "light";
  }

  return params.answer === params.correctAnswer || params.answer === params.selectedAnswer
    ? "filled"
    : "light";
}
