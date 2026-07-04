import { Stack, Text } from "@mantine/core";
import { createLibrary, defineComponent } from "@openuidev/react-lang";
import { z } from "zod";

import { PokemonCandidateCard, type PokemonCandidateCardProps } from "./PokemonCandidateCard";

const Paragraph = defineComponent({
  component: ({ props }) => <Text size="sm">{props.text}</Text>,
  description: "短い日本語の説明文を1段落表示する。",
  name: "Paragraph",
  props: z.object({
    text: z.string().describe("表示する日本語の文章"),
  }),
});

const PokemonCandidate = defineComponent({
  component: ({ props }) => <PokemonCandidateCard {...(props as PokemonCandidateCardProps)} />,
  description:
    "ポケモン候補1件のカード。idとjaNameでアプリ内の図鑑データと照合され、画像・タイプ・詳細リンク付きで表示される。",
  name: "PokemonCandidate",
  props: z.object({
    id: z.number().describe("全国図鑑番号 (1〜1025)"),
    jaName: z.string().describe("ポケモンの正確な日本語名(カタカナ)"),
    confidence: z.enum(["high", "medium", "low"]).describe("確信度"),
    reason: z.string().describe("そのポケモンだと推測した理由(日本語1文)"),
  }),
});

const CandidateList = defineComponent({
  // renderNodeは配列を渡すと内部でキー付きの子ノード群に展開してくれる
  component: ({ props, renderNode: toNodes }) => <Stack gap="sm">{toNodes(props.items)}</Stack>,
  description: "ポケモン候補カードを確信度の高い順に並べるリスト。",
  name: "CandidateList",
  props: z.object({
    items: z.array(PokemonCandidate.ref).describe("候補カード(最大3件、確信度の高い順)"),
  }),
});

const Answer = defineComponent({
  component: ({ props, renderNode: toNodes }) => <Stack gap="sm">{toNodes(props.children)}</Stack>,
  description: "回答全体のコンテナ。段落と候補リストを上から順に並べる。",
  name: "Answer",
  props: z.object({
    children: z.array(z.union([Paragraph.ref, CandidateList.ref])).describe("回答を構成する要素"),
  }),
});

export const chatUiLibrary = createLibrary({
  components: [Answer, Paragraph, CandidateList, PokemonCandidate],
  root: "Answer",
});
