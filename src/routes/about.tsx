import { Anchor, Card, Container, List, Stack, Text, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

import { HomeLink } from "../components/HomeLink";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [{ title: "このサイトについて | PokéType Dojo" }],
  }),
});

function AboutPage() {
  return (
    <Container className="page-shell" size="sm">
      <Stack gap="lg">
        <HomeLink />

        <Stack gap={4}>
          <Title c="candyPink.7" order={1}>
            このサイトについて
          </Title>
          <Text c="dimmed">PokéType Dojoの運営方針と、利用しているデータについて。</Text>
        </Stack>

        <Card className="glass-panel" p="lg" radius="md" withBorder>
          <Stack gap="lg">
            <SiteSection title="非公式の個人制作アプリです">
              <Text>
                PokéType
                Dojoは、ポケモンのタイプ相性を覚え直すために個人が制作・運営している非公式の学習アプリです。株式会社ポケモン、任天堂株式会社、株式会社クリーチャーズ、株式会社ゲームフリーク、およびその関連会社とは関係ありません。
              </Text>
              <Text>
                本サイトは商用利用を目的としておらず、広告掲載、有料機能その他の収益化を行っていません。
              </Text>
            </SiteSection>

            <SiteSection title="権利とデータの出典">
              <Text>
                ポケットモンスター、ポケモン、および各キャラクターの名称・画像等に関する権利は、それぞれの権利者に帰属します。
              </Text>
              <Text>
                ポケモンの画像は
                <Anchor href="https://github.com/PokeAPI/sprites" rel="noreferrer" target="_blank">
                  PokeAPI Sprites
                </Anchor>
                から取得しています。PokeAPIは本サイトの運営者ではなく、本サイトを承認・推奨するものではありません。
              </Text>
            </SiteSection>

            <SiteSection title="ご連絡">
              <Text>
                内容の誤り、不具合、権利に関するご連絡は、
                <Anchor
                  href="https://github.com/shimpei1494/poketype-dojo/issues"
                  rel="noreferrer"
                  target="_blank"
                >
                  GitHub Issues
                </Anchor>
                からお知らせください。内容を確認のうえ、必要に応じて修正または公開停止などの対応を行います。
              </Text>
            </SiteSection>

            <SiteSection title="ご利用にあたって">
              <List spacing="xs">
                <List.Item>掲載内容の正確性・完全性を保証するものではありません。</List.Item>
                <List.Item>予告なく内容の変更または公開を終了する場合があります。</List.Item>
              </List>
            </SiteSection>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}

function SiteSection({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <Stack gap="xs">
      <Title c="candyPink.7" order={2} size="h3">
        {title}
      </Title>
      {children}
    </Stack>
  );
}
