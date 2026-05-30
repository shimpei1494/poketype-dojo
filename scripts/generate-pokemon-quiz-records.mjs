import { mkdir, writeFile } from "node:fs/promises";

const outputPath = new URL("../src/data/pokemon-quiz-records.ts", import.meta.url);
const officialArtworkBaseUrl =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

const records = [
  [1, "bulbasaur", "フシギダネ", "grass", "poison"],
  [2, "ivysaur", "フシギソウ", "grass", "poison"],
  [3, "venusaur", "フシギバナ", "grass", "poison"],
  [4, "charmander", "ヒトカゲ", "fire", null],
  [5, "charmeleon", "リザード", "fire", null],
  [6, "charizard", "リザードン", "fire", "flying"],
  [7, "squirtle", "ゼニガメ", "water", null],
  [8, "wartortle", "カメール", "water", null],
  [9, "blastoise", "カメックス", "water", null],
  [10, "caterpie", "キャタピー", "bug", null],
  [11, "metapod", "トランセル", "bug", null],
  [12, "butterfree", "バタフリー", "bug", "flying"],
  [13, "weedle", "ビードル", "bug", "poison"],
  [14, "kakuna", "コクーン", "bug", "poison"],
  [15, "beedrill", "スピアー", "bug", "poison"],
  [16, "pidgey", "ポッポ", "normal", "flying"],
  [17, "pidgeotto", "ピジョン", "normal", "flying"],
  [18, "pidgeot", "ピジョット", "normal", "flying"],
  [19, "rattata", "コラッタ", "normal", null],
  [20, "raticate", "ラッタ", "normal", null],
  [21, "spearow", "オニスズメ", "normal", "flying"],
  [22, "fearow", "オニドリル", "normal", "flying"],
  [23, "ekans", "アーボ", "poison", null],
  [24, "arbok", "アーボック", "poison", null],
  [25, "pikachu", "ピカチュウ", "electric", null],
  [26, "raichu", "ライチュウ", "electric", null],
  [27, "sandshrew", "サンド", "ground", null],
  [28, "sandslash", "サンドパン", "ground", null],
  [29, "nidoran-f", "ニドラン♀", "poison", null],
  [30, "nidorina", "ニドリーナ", "poison", null],
  [31, "nidoqueen", "ニドクイン", "poison", "ground"],
  [32, "nidoran-m", "ニドラン♂", "poison", null],
  [33, "nidorino", "ニドリーノ", "poison", null],
  [34, "nidoking", "ニドキング", "poison", "ground"],
  [35, "clefairy", "ピッピ", "fairy", null],
  [36, "clefable", "ピクシー", "fairy", null],
  [37, "vulpix", "ロコン", "fire", null],
  [38, "ninetales", "キュウコン", "fire", null],
  [39, "jigglypuff", "プリン", "normal", "fairy"],
  [40, "wigglytuff", "プクリン", "normal", "fairy"],
  [41, "zubat", "ズバット", "poison", "flying"],
  [42, "golbat", "ゴルバット", "poison", "flying"],
  [43, "oddish", "ナゾノクサ", "grass", "poison"],
  [44, "gloom", "クサイハナ", "grass", "poison"],
  [45, "vileplume", "ラフレシア", "grass", "poison"],
  [46, "paras", "パラス", "bug", "grass"],
  [47, "parasect", "パラセクト", "bug", "grass"],
  [48, "venonat", "コンパン", "bug", "poison"],
  [49, "venomoth", "モルフォン", "bug", "poison"],
  [50, "diglett", "ディグダ", "ground", null],
  [51, "dugtrio", "ダグトリオ", "ground", null],
  [52, "meowth", "ニャース", "normal", null],
  [53, "persian", "ペルシアン", "normal", null],
  [54, "psyduck", "コダック", "water", null],
  [55, "golduck", "ゴルダック", "water", null],
  [56, "mankey", "マンキー", "fighting", null],
  [57, "primeape", "オコリザル", "fighting", null],
  [58, "growlithe", "ガーディ", "fire", null],
  [59, "arcanine", "ウインディ", "fire", null],
  [60, "poliwag", "ニョロモ", "water", null],
  [61, "poliwhirl", "ニョロゾ", "water", null],
  [62, "poliwrath", "ニョロボン", "water", "fighting"],
  [63, "abra", "ケーシィ", "psychic", null],
  [64, "kadabra", "ユンゲラー", "psychic", null],
  [65, "alakazam", "フーディン", "psychic", null],
  [66, "machop", "ワンリキー", "fighting", null],
  [67, "machoke", "ゴーリキー", "fighting", null],
  [68, "machamp", "カイリキー", "fighting", null],
  [69, "bellsprout", "マダツボミ", "grass", "poison"],
  [70, "weepinbell", "ウツドン", "grass", "poison"],
  [71, "victreebel", "ウツボット", "grass", "poison"],
  [72, "tentacool", "メノクラゲ", "water", "poison"],
  [73, "tentacruel", "ドククラゲ", "water", "poison"],
  [74, "geodude", "イシツブテ", "rock", "ground"],
  [75, "graveler", "ゴローン", "rock", "ground"],
  [76, "golem", "ゴローニャ", "rock", "ground"],
  [77, "ponyta", "ポニータ", "fire", null],
  [78, "rapidash", "ギャロップ", "fire", null],
  [79, "slowpoke", "ヤドン", "water", "psychic"],
  [80, "slowbro", "ヤドラン", "water", "psychic"],
  [81, "magnemite", "コイル", "electric", "steel"],
  [82, "magneton", "レアコイル", "electric", "steel"],
  [83, "farfetchd", "カモネギ", "normal", "flying"],
  [84, "doduo", "ドードー", "normal", "flying"],
  [85, "dodrio", "ドードリオ", "normal", "flying"],
  [86, "seel", "パウワウ", "water", null],
  [87, "dewgong", "ジュゴン", "water", "ice"],
  [88, "grimer", "ベトベター", "poison", null],
  [89, "muk", "ベトベトン", "poison", null],
  [90, "shellder", "シェルダー", "water", null],
  [91, "cloyster", "パルシェン", "water", "ice"],
  [92, "gastly", "ゴース", "ghost", "poison"],
  [93, "haunter", "ゴースト", "ghost", "poison"],
  [94, "gengar", "ゲンガー", "ghost", "poison"],
  [95, "onix", "イワーク", "rock", "ground"],
  [96, "drowzee", "スリープ", "psychic", null],
  [97, "hypno", "スリーパー", "psychic", null],
  [98, "krabby", "クラブ", "water", null],
  [99, "kingler", "キングラー", "water", null],
  [100, "voltorb", "ビリリダマ", "electric", null],
  [101, "electrode", "マルマイン", "electric", null],
  [102, "exeggcute", "タマタマ", "grass", "psychic"],
  [103, "exeggutor", "ナッシー", "grass", "psychic"],
  [104, "cubone", "カラカラ", "ground", null],
  [105, "marowak", "ガラガラ", "ground", null],
  [106, "hitmonlee", "サワムラー", "fighting", null],
  [107, "hitmonchan", "エビワラー", "fighting", null],
  [108, "lickitung", "ベロリンガ", "normal", null],
  [109, "koffing", "ドガース", "poison", null],
  [110, "weezing", "マタドガス", "poison", null],
  [111, "rhyhorn", "サイホーン", "ground", "rock"],
  [112, "rhydon", "サイドン", "ground", "rock"],
  [113, "chansey", "ラッキー", "normal", null],
  [114, "tangela", "モンジャラ", "grass", null],
  [115, "kangaskhan", "ガルーラ", "normal", null],
  [116, "horsea", "タッツー", "water", null],
  [117, "seadra", "シードラ", "water", null],
  [118, "goldeen", "トサキント", "water", null],
  [119, "seaking", "アズマオウ", "water", null],
  [120, "staryu", "ヒトデマン", "water", null],
  [121, "starmie", "スターミー", "water", "psychic"],
  [122, "mr-mime", "バリヤード", "psychic", "fairy"],
  [123, "scyther", "ストライク", "bug", "flying"],
  [124, "jynx", "ルージュラ", "ice", "psychic"],
  [125, "electabuzz", "エレブー", "electric", null],
  [126, "magmar", "ブーバー", "fire", null],
  [127, "pinsir", "カイロス", "bug", null],
  [128, "tauros", "ケンタロス", "normal", null],
  [129, "magikarp", "コイキング", "water", null],
  [130, "gyarados", "ギャラドス", "water", "flying"],
  [131, "lapras", "ラプラス", "water", "ice"],
  [132, "ditto", "メタモン", "normal", null],
  [133, "eevee", "イーブイ", "normal", null],
  [134, "vaporeon", "シャワーズ", "water", null],
  [135, "jolteon", "サンダース", "electric", null],
  [136, "flareon", "ブースター", "fire", null],
  [137, "porygon", "ポリゴン", "normal", null],
  [138, "omanyte", "オムナイト", "rock", "water"],
  [139, "omastar", "オムスター", "rock", "water"],
  [140, "kabuto", "カブト", "rock", "water"],
  [141, "kabutops", "カブトプス", "rock", "water"],
  [142, "aerodactyl", "プテラ", "rock", "flying"],
  [143, "snorlax", "カビゴン", "normal", null],
  [144, "articuno", "フリーザー", "ice", "flying"],
  [145, "zapdos", "サンダー", "electric", "flying"],
  [146, "moltres", "ファイヤー", "fire", "flying"],
  [147, "dratini", "ミニリュウ", "dragon", null],
  [148, "dragonair", "ハクリュー", "dragon", null],
  [149, "dragonite", "カイリュー", "dragon", "flying"],
  [150, "mewtwo", "ミュウツー", "psychic", null],
  [151, "mew", "ミュウ", "psychic", null],
];

function spriteUrl(id) {
  return `${officialArtworkBaseUrl}/${id}.png`;
}

function toRecordSource([id, name, jaName, type1, type2]) {
  return [
    "  {",
    "    generation: 1,",
    `    id: ${id},`,
    `    jaName: "${jaName}",`,
    `    name: "${name}",`,
    `    spriteUrl: "${spriteUrl(id)}",`,
    `    type1: "${type1}",`,
    `    type2: ${type2 === null ? "null" : `"${type2}"`},`,
    "  },",
  ].join("\n");
}

function buildSource() {
  return `import type { PokemonType } from "./pokemon-types";

export type PokemonQuizRecord = {
  generation: number;
  id: number;
  jaName: string;
  name: string;
  spriteUrl: string;
  type1: PokemonType;
  type2: PokemonType | null;
};

// First-generation standard Pokemon quiz data.
// Types use the current standard-form type assignments. Regional forms,
// Mega Evolutions, Gigantamax, and other forms are intentionally excluded.
export const pokemonQuizRecords = [
${records.map(toRecordSource).join("\n")}
] as const satisfies readonly PokemonQuizRecord[];
`;
}

await mkdir(new URL("../src/data", import.meta.url), { recursive: true });
await writeFile(outputPath, buildSource());

console.log(`Wrote ${records.length} Pokemon quiz records to ${outputPath.pathname}`);
