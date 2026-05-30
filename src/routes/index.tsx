import { Container, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

import { ModeCard } from "../components/ModeCard";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <Container className="page-shell" size="lg">
      <Stack gap="xl">
        <Stack gap="xs">
          <Title c="candyPink.7" order={1} size="3rem">
            PokéType Dojo
          </Title>
          <Text c="dimmed" fw={700} size="xl">
            タイプ相性を、かわいく鍛え直そう。
          </Text>
        </Stack>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
          <ModeCard
            description="技のタイプと攻撃されるポケモンのタイプを選んで、倍率と内訳をすぐ確認。"
            label="今すぐ使う"
            title="タイプ相性チェッカー"
            to="/type-checker"
          />
          <ModeCard
            description="倍率と効果文を選んで、タイプ相性の計算を1問ずつ練習。"
            label="練習する"
            title="タイプ相性クイズ"
            to="/quiz/type-matchup"
          />
          <ModeCard
            description="第1世代151匹の現在タイプを当てるクイズ。データは準備済み。"
            disabled
            label="準備中"
            title="ポケモンタイプ当て"
            to="/quiz/pokemon-type"
          />
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
