import { Container, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

import { ModeCard } from "../components/ModeCard";
import { preloadPokemonData } from "../data/load-pokemon-data";

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

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
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
            description="第1〜第9世代1025匹の現在タイプを当てるクイズ。"
            label="挑戦する"
            onPreload={preloadPokemonData}
            title="ポケモンタイプ当て"
            to="/quiz/pokemon-type"
          />
          <ModeCard
            description="名前・タイプ・世代で探して、このポケモンへの攻撃相性を確認。"
            label="調べる"
            onPreload={preloadPokemonData}
            title="ポケモン図鑑"
            to="/pokemon"
          />
          <ModeCard
            description="「黄色くて電気を出すネズミ」みたいな曖昧な説明から、AIが候補を推測して図鑑につなげる。"
            label="AIに聞く"
            onPreload={preloadPokemonData}
            title="AIポケモン相談"
            to="/chat"
          />
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
