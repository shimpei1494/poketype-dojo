/**
 * AIチャットが返しうるOpenUI Lang応答のサンプル集。
 * dev専用プレビューページ(/dev/ui-preview)と /api/chat のモックモードで使う。
 * モックモードではユーザー発言にidが含まれるfixtureが選ばれる(例:「unresolved」と送る)。
 */
export type ChatResponseFixture = {
  description: string;
  /** 意図的に壊れた応答(パースエラーの表示確認用)ならtrue */
  hasParseErrors?: boolean;
  id: string;
  label: string;
  response: string;
};

export const defaultChatResponseFixtureId = "typical";

export const chatResponseFixtures: readonly ChatResponseFixture[] = [
  {
    description: "段落+確信度の異なる候補3件+締めの追い質問。最も標準的な回答パターン。",
    id: "typical",
    label: "典型回答(候補3件)",
    response: `root = Answer([intro, list, outro])
intro = Paragraph("「黄色くて電気を出すネズミ」なら、この候補が考えられます。")
list = CandidateList([c1, c2, c3])
c1 = PokemonCandidate(25, "ピカチュウ", "high", "黄色い電気ネズミポケモンとして最も有名です。")
c2 = PokemonCandidate(172, "ピチュー", "medium", "ピカチュウの進化前で、同じく黄色い電気ネズミです。")
c3 = PokemonCandidate(26, "ライチュウ", "low", "ピカチュウの進化形ですが、体色はオレンジ寄りです。")
outro = Paragraph("しっぽの形など、ほかに覚えている特徴はありますか?")`,
  },
  {
    description: "1件に絞り込めた場合。候補カードが単独で表示される。",
    id: "single",
    label: "確信の高い1件",
    response: `root = Answer([intro, list])
intro = Paragraph("その特徴なら、ほぼ間違いなくこのポケモンです。")
list = CandidateList([c1])
c1 = PokemonCandidate(143, "カビゴン", "high", "道をふさいで眠る大きなポケモンといえばカビゴンです。")`,
  },
  {
    description: "図鑑データに解決できない名前を含む。フォールバックカードの表示確認用。",
    id: "unresolved",
    label: "図鑑に見つからない候補",
    response: `root = Answer([intro, list])
intro = Paragraph("うろ覚えの名前から、近い候補を挙げてみます。")
list = CandidateList([c1, c2])
c1 = PokemonCandidate(9999, "デンキネズミ", "medium", "その名前のポケモンは図鑑に存在しないようです。")
c2 = PokemonCandidate(25, "ぴかちゅう", "high", "ひらがな表記でも図鑑データに照合されることの確認用です。")`,
  },
  {
    description: "特徴が曖昧で候補を出さず、追い質問だけを返すパターン。",
    id: "question",
    label: "追い質問のみ",
    response: `root = Answer([p1, p2])
p1 = Paragraph("もう少しヒントが欲しいです。いくつか教えてください。")
p2 = Paragraph("からだの色はなんですか? タイプの記憶はありますか? 進化する前後の姿を覚えていますか?")`,
  },
  {
    description: "ポケモンと関係ない話題を丁寧に断るパターン。",
    id: "offtopic",
    label: "話題外お断り",
    response: `root = Answer([p1])
p1 = Paragraph("ごめんなさい、私はポケモン専門のアシスタントです。ポケモンの特徴やうろ覚えの記憶について聞いてもらえれば、どのポケモンか一緒に探します!")`,
  },
  {
    description:
      "未定義コンポーネントと必須prop不足を含む壊れた応答。パーサの耐性とエラー表示の確認用。",
    hasParseErrors: true,
    id: "broken",
    label: "壊れた応答",
    response: `root = Answer([intro, list])
intro = Paragraph("この応答には意図的な構文エラーが含まれています。")
list = CandidateList([c1, c2])
c1 = PokemonKandidate(25, "ピカチュウ", "high", "コンポーネント名のtypo。")
c2 = PokemonCandidate(133)`,
  },
];

export function findChatResponseFixture(fixtureId: string): ChatResponseFixture | undefined {
  return chatResponseFixtures.find((fixture) => fixture.id === fixtureId);
}
