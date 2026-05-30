import type { PokemonType } from "./pokemon-types";

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
  {
    generation: 1,
    id: 1,
    jaName: "フシギダネ",
    name: "bulbasaur",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    type1: "grass",
    type2: "poison",
  },
  {
    generation: 1,
    id: 2,
    jaName: "フシギソウ",
    name: "ivysaur",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",
    type1: "grass",
    type2: "poison",
  },
  {
    generation: 1,
    id: 3,
    jaName: "フシギバナ",
    name: "venusaur",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
    type1: "grass",
    type2: "poison",
  },
  {
    generation: 1,
    id: 4,
    jaName: "ヒトカゲ",
    name: "charmander",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    type1: "fire",
    type2: null,
  },
  {
    generation: 1,
    id: 5,
    jaName: "リザード",
    name: "charmeleon",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png",
    type1: "fire",
    type2: null,
  },
  {
    generation: 1,
    id: 6,
    jaName: "リザードン",
    name: "charizard",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
    type1: "fire",
    type2: "flying",
  },
  {
    generation: 1,
    id: 7,
    jaName: "ゼニガメ",
    name: "squirtle",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
    type1: "water",
    type2: null,
  },
  {
    generation: 1,
    id: 8,
    jaName: "カメール",
    name: "wartortle",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png",
    type1: "water",
    type2: null,
  },
  {
    generation: 1,
    id: 9,
    jaName: "カメックス",
    name: "blastoise",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png",
    type1: "water",
    type2: null,
  },
  {
    generation: 1,
    id: 10,
    jaName: "キャタピー",
    name: "caterpie",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png",
    type1: "bug",
    type2: null,
  },
  {
    generation: 1,
    id: 11,
    jaName: "トランセル",
    name: "metapod",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/11.png",
    type1: "bug",
    type2: null,
  },
  {
    generation: 1,
    id: 12,
    jaName: "バタフリー",
    name: "butterfree",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/12.png",
    type1: "bug",
    type2: "flying",
  },
  {
    generation: 1,
    id: 13,
    jaName: "ビードル",
    name: "weedle",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/13.png",
    type1: "bug",
    type2: "poison",
  },
  {
    generation: 1,
    id: 14,
    jaName: "コクーン",
    name: "kakuna",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/14.png",
    type1: "bug",
    type2: "poison",
  },
  {
    generation: 1,
    id: 15,
    jaName: "スピアー",
    name: "beedrill",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/15.png",
    type1: "bug",
    type2: "poison",
  },
  {
    generation: 1,
    id: 16,
    jaName: "ポッポ",
    name: "pidgey",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/16.png",
    type1: "normal",
    type2: "flying",
  },
  {
    generation: 1,
    id: 17,
    jaName: "ピジョン",
    name: "pidgeotto",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/17.png",
    type1: "normal",
    type2: "flying",
  },
  {
    generation: 1,
    id: 18,
    jaName: "ピジョット",
    name: "pidgeot",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/18.png",
    type1: "normal",
    type2: "flying",
  },
  {
    generation: 1,
    id: 19,
    jaName: "コラッタ",
    name: "rattata",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/19.png",
    type1: "normal",
    type2: null,
  },
  {
    generation: 1,
    id: 20,
    jaName: "ラッタ",
    name: "raticate",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/20.png",
    type1: "normal",
    type2: null,
  },
  {
    generation: 1,
    id: 21,
    jaName: "オニスズメ",
    name: "spearow",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/21.png",
    type1: "normal",
    type2: "flying",
  },
  {
    generation: 1,
    id: 22,
    jaName: "オニドリル",
    name: "fearow",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/22.png",
    type1: "normal",
    type2: "flying",
  },
  {
    generation: 1,
    id: 23,
    jaName: "アーボ",
    name: "ekans",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/23.png",
    type1: "poison",
    type2: null,
  },
  {
    generation: 1,
    id: 24,
    jaName: "アーボック",
    name: "arbok",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/24.png",
    type1: "poison",
    type2: null,
  },
  {
    generation: 1,
    id: 25,
    jaName: "ピカチュウ",
    name: "pikachu",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    type1: "electric",
    type2: null,
  },
  {
    generation: 1,
    id: 26,
    jaName: "ライチュウ",
    name: "raichu",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png",
    type1: "electric",
    type2: null,
  },
  {
    generation: 1,
    id: 27,
    jaName: "サンド",
    name: "sandshrew",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/27.png",
    type1: "ground",
    type2: null,
  },
  {
    generation: 1,
    id: 28,
    jaName: "サンドパン",
    name: "sandslash",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/28.png",
    type1: "ground",
    type2: null,
  },
  {
    generation: 1,
    id: 29,
    jaName: "ニドラン♀",
    name: "nidoran-f",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/29.png",
    type1: "poison",
    type2: null,
  },
  {
    generation: 1,
    id: 30,
    jaName: "ニドリーナ",
    name: "nidorina",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/30.png",
    type1: "poison",
    type2: null,
  },
  {
    generation: 1,
    id: 31,
    jaName: "ニドクイン",
    name: "nidoqueen",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/31.png",
    type1: "poison",
    type2: "ground",
  },
  {
    generation: 1,
    id: 32,
    jaName: "ニドラン♂",
    name: "nidoran-m",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/32.png",
    type1: "poison",
    type2: null,
  },
  {
    generation: 1,
    id: 33,
    jaName: "ニドリーノ",
    name: "nidorino",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/33.png",
    type1: "poison",
    type2: null,
  },
  {
    generation: 1,
    id: 34,
    jaName: "ニドキング",
    name: "nidoking",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/34.png",
    type1: "poison",
    type2: "ground",
  },
  {
    generation: 1,
    id: 35,
    jaName: "ピッピ",
    name: "clefairy",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/35.png",
    type1: "fairy",
    type2: null,
  },
  {
    generation: 1,
    id: 36,
    jaName: "ピクシー",
    name: "clefable",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/36.png",
    type1: "fairy",
    type2: null,
  },
  {
    generation: 1,
    id: 37,
    jaName: "ロコン",
    name: "vulpix",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/37.png",
    type1: "fire",
    type2: null,
  },
  {
    generation: 1,
    id: 38,
    jaName: "キュウコン",
    name: "ninetales",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/38.png",
    type1: "fire",
    type2: null,
  },
  {
    generation: 1,
    id: 39,
    jaName: "プリン",
    name: "jigglypuff",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png",
    type1: "normal",
    type2: "fairy",
  },
  {
    generation: 1,
    id: 40,
    jaName: "プクリン",
    name: "wigglytuff",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/40.png",
    type1: "normal",
    type2: "fairy",
  },
  {
    generation: 1,
    id: 41,
    jaName: "ズバット",
    name: "zubat",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/41.png",
    type1: "poison",
    type2: "flying",
  },
  {
    generation: 1,
    id: 42,
    jaName: "ゴルバット",
    name: "golbat",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/42.png",
    type1: "poison",
    type2: "flying",
  },
  {
    generation: 1,
    id: 43,
    jaName: "ナゾノクサ",
    name: "oddish",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/43.png",
    type1: "grass",
    type2: "poison",
  },
  {
    generation: 1,
    id: 44,
    jaName: "クサイハナ",
    name: "gloom",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/44.png",
    type1: "grass",
    type2: "poison",
  },
  {
    generation: 1,
    id: 45,
    jaName: "ラフレシア",
    name: "vileplume",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/45.png",
    type1: "grass",
    type2: "poison",
  },
  {
    generation: 1,
    id: 46,
    jaName: "パラス",
    name: "paras",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/46.png",
    type1: "bug",
    type2: "grass",
  },
  {
    generation: 1,
    id: 47,
    jaName: "パラセクト",
    name: "parasect",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/47.png",
    type1: "bug",
    type2: "grass",
  },
  {
    generation: 1,
    id: 48,
    jaName: "コンパン",
    name: "venonat",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/48.png",
    type1: "bug",
    type2: "poison",
  },
  {
    generation: 1,
    id: 49,
    jaName: "モルフォン",
    name: "venomoth",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/49.png",
    type1: "bug",
    type2: "poison",
  },
  {
    generation: 1,
    id: 50,
    jaName: "ディグダ",
    name: "diglett",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/50.png",
    type1: "ground",
    type2: null,
  },
  {
    generation: 1,
    id: 51,
    jaName: "ダグトリオ",
    name: "dugtrio",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/51.png",
    type1: "ground",
    type2: null,
  },
  {
    generation: 1,
    id: 52,
    jaName: "ニャース",
    name: "meowth",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/52.png",
    type1: "normal",
    type2: null,
  },
  {
    generation: 1,
    id: 53,
    jaName: "ペルシアン",
    name: "persian",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/53.png",
    type1: "normal",
    type2: null,
  },
  {
    generation: 1,
    id: 54,
    jaName: "コダック",
    name: "psyduck",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png",
    type1: "water",
    type2: null,
  },
  {
    generation: 1,
    id: 55,
    jaName: "ゴルダック",
    name: "golduck",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/55.png",
    type1: "water",
    type2: null,
  },
  {
    generation: 1,
    id: 56,
    jaName: "マンキー",
    name: "mankey",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/56.png",
    type1: "fighting",
    type2: null,
  },
  {
    generation: 1,
    id: 57,
    jaName: "オコリザル",
    name: "primeape",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/57.png",
    type1: "fighting",
    type2: null,
  },
  {
    generation: 1,
    id: 58,
    jaName: "ガーディ",
    name: "growlithe",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/58.png",
    type1: "fire",
    type2: null,
  },
  {
    generation: 1,
    id: 59,
    jaName: "ウインディ",
    name: "arcanine",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/59.png",
    type1: "fire",
    type2: null,
  },
  {
    generation: 1,
    id: 60,
    jaName: "ニョロモ",
    name: "poliwag",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/60.png",
    type1: "water",
    type2: null,
  },
  {
    generation: 1,
    id: 61,
    jaName: "ニョロゾ",
    name: "poliwhirl",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/61.png",
    type1: "water",
    type2: null,
  },
  {
    generation: 1,
    id: 62,
    jaName: "ニョロボン",
    name: "poliwrath",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/62.png",
    type1: "water",
    type2: "fighting",
  },
  {
    generation: 1,
    id: 63,
    jaName: "ケーシィ",
    name: "abra",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/63.png",
    type1: "psychic",
    type2: null,
  },
  {
    generation: 1,
    id: 64,
    jaName: "ユンゲラー",
    name: "kadabra",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/64.png",
    type1: "psychic",
    type2: null,
  },
  {
    generation: 1,
    id: 65,
    jaName: "フーディン",
    name: "alakazam",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/65.png",
    type1: "psychic",
    type2: null,
  },
  {
    generation: 1,
    id: 66,
    jaName: "ワンリキー",
    name: "machop",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/66.png",
    type1: "fighting",
    type2: null,
  },
  {
    generation: 1,
    id: 67,
    jaName: "ゴーリキー",
    name: "machoke",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/67.png",
    type1: "fighting",
    type2: null,
  },
  {
    generation: 1,
    id: 68,
    jaName: "カイリキー",
    name: "machamp",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/68.png",
    type1: "fighting",
    type2: null,
  },
  {
    generation: 1,
    id: 69,
    jaName: "マダツボミ",
    name: "bellsprout",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/69.png",
    type1: "grass",
    type2: "poison",
  },
  {
    generation: 1,
    id: 70,
    jaName: "ウツドン",
    name: "weepinbell",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/70.png",
    type1: "grass",
    type2: "poison",
  },
  {
    generation: 1,
    id: 71,
    jaName: "ウツボット",
    name: "victreebel",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/71.png",
    type1: "grass",
    type2: "poison",
  },
  {
    generation: 1,
    id: 72,
    jaName: "メノクラゲ",
    name: "tentacool",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/72.png",
    type1: "water",
    type2: "poison",
  },
  {
    generation: 1,
    id: 73,
    jaName: "ドククラゲ",
    name: "tentacruel",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/73.png",
    type1: "water",
    type2: "poison",
  },
  {
    generation: 1,
    id: 74,
    jaName: "イシツブテ",
    name: "geodude",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/74.png",
    type1: "rock",
    type2: "ground",
  },
  {
    generation: 1,
    id: 75,
    jaName: "ゴローン",
    name: "graveler",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/75.png",
    type1: "rock",
    type2: "ground",
  },
  {
    generation: 1,
    id: 76,
    jaName: "ゴローニャ",
    name: "golem",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/76.png",
    type1: "rock",
    type2: "ground",
  },
  {
    generation: 1,
    id: 77,
    jaName: "ポニータ",
    name: "ponyta",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/77.png",
    type1: "fire",
    type2: null,
  },
  {
    generation: 1,
    id: 78,
    jaName: "ギャロップ",
    name: "rapidash",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/78.png",
    type1: "fire",
    type2: null,
  },
  {
    generation: 1,
    id: 79,
    jaName: "ヤドン",
    name: "slowpoke",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/79.png",
    type1: "water",
    type2: "psychic",
  },
  {
    generation: 1,
    id: 80,
    jaName: "ヤドラン",
    name: "slowbro",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/80.png",
    type1: "water",
    type2: "psychic",
  },
  {
    generation: 1,
    id: 81,
    jaName: "コイル",
    name: "magnemite",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/81.png",
    type1: "electric",
    type2: "steel",
  },
  {
    generation: 1,
    id: 82,
    jaName: "レアコイル",
    name: "magneton",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/82.png",
    type1: "electric",
    type2: "steel",
  },
  {
    generation: 1,
    id: 83,
    jaName: "カモネギ",
    name: "farfetchd",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/83.png",
    type1: "normal",
    type2: "flying",
  },
  {
    generation: 1,
    id: 84,
    jaName: "ドードー",
    name: "doduo",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/84.png",
    type1: "normal",
    type2: "flying",
  },
  {
    generation: 1,
    id: 85,
    jaName: "ドードリオ",
    name: "dodrio",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/85.png",
    type1: "normal",
    type2: "flying",
  },
  {
    generation: 1,
    id: 86,
    jaName: "パウワウ",
    name: "seel",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/86.png",
    type1: "water",
    type2: null,
  },
  {
    generation: 1,
    id: 87,
    jaName: "ジュゴン",
    name: "dewgong",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/87.png",
    type1: "water",
    type2: "ice",
  },
  {
    generation: 1,
    id: 88,
    jaName: "ベトベター",
    name: "grimer",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/88.png",
    type1: "poison",
    type2: null,
  },
  {
    generation: 1,
    id: 89,
    jaName: "ベトベトン",
    name: "muk",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/89.png",
    type1: "poison",
    type2: null,
  },
  {
    generation: 1,
    id: 90,
    jaName: "シェルダー",
    name: "shellder",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/90.png",
    type1: "water",
    type2: null,
  },
  {
    generation: 1,
    id: 91,
    jaName: "パルシェン",
    name: "cloyster",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/91.png",
    type1: "water",
    type2: "ice",
  },
  {
    generation: 1,
    id: 92,
    jaName: "ゴース",
    name: "gastly",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/92.png",
    type1: "ghost",
    type2: "poison",
  },
  {
    generation: 1,
    id: 93,
    jaName: "ゴースト",
    name: "haunter",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/93.png",
    type1: "ghost",
    type2: "poison",
  },
  {
    generation: 1,
    id: 94,
    jaName: "ゲンガー",
    name: "gengar",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png",
    type1: "ghost",
    type2: "poison",
  },
  {
    generation: 1,
    id: 95,
    jaName: "イワーク",
    name: "onix",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/95.png",
    type1: "rock",
    type2: "ground",
  },
  {
    generation: 1,
    id: 96,
    jaName: "スリープ",
    name: "drowzee",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/96.png",
    type1: "psychic",
    type2: null,
  },
  {
    generation: 1,
    id: 97,
    jaName: "スリーパー",
    name: "hypno",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/97.png",
    type1: "psychic",
    type2: null,
  },
  {
    generation: 1,
    id: 98,
    jaName: "クラブ",
    name: "krabby",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/98.png",
    type1: "water",
    type2: null,
  },
  {
    generation: 1,
    id: 99,
    jaName: "キングラー",
    name: "kingler",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/99.png",
    type1: "water",
    type2: null,
  },
  {
    generation: 1,
    id: 100,
    jaName: "ビリリダマ",
    name: "voltorb",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/100.png",
    type1: "electric",
    type2: null,
  },
  {
    generation: 1,
    id: 101,
    jaName: "マルマイン",
    name: "electrode",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/101.png",
    type1: "electric",
    type2: null,
  },
  {
    generation: 1,
    id: 102,
    jaName: "タマタマ",
    name: "exeggcute",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/102.png",
    type1: "grass",
    type2: "psychic",
  },
  {
    generation: 1,
    id: 103,
    jaName: "ナッシー",
    name: "exeggutor",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/103.png",
    type1: "grass",
    type2: "psychic",
  },
  {
    generation: 1,
    id: 104,
    jaName: "カラカラ",
    name: "cubone",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/104.png",
    type1: "ground",
    type2: null,
  },
  {
    generation: 1,
    id: 105,
    jaName: "ガラガラ",
    name: "marowak",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/105.png",
    type1: "ground",
    type2: null,
  },
  {
    generation: 1,
    id: 106,
    jaName: "サワムラー",
    name: "hitmonlee",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/106.png",
    type1: "fighting",
    type2: null,
  },
  {
    generation: 1,
    id: 107,
    jaName: "エビワラー",
    name: "hitmonchan",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/107.png",
    type1: "fighting",
    type2: null,
  },
  {
    generation: 1,
    id: 108,
    jaName: "ベロリンガ",
    name: "lickitung",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/108.png",
    type1: "normal",
    type2: null,
  },
  {
    generation: 1,
    id: 109,
    jaName: "ドガース",
    name: "koffing",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/109.png",
    type1: "poison",
    type2: null,
  },
  {
    generation: 1,
    id: 110,
    jaName: "マタドガス",
    name: "weezing",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/110.png",
    type1: "poison",
    type2: null,
  },
  {
    generation: 1,
    id: 111,
    jaName: "サイホーン",
    name: "rhyhorn",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/111.png",
    type1: "ground",
    type2: "rock",
  },
  {
    generation: 1,
    id: 112,
    jaName: "サイドン",
    name: "rhydon",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/112.png",
    type1: "ground",
    type2: "rock",
  },
  {
    generation: 1,
    id: 113,
    jaName: "ラッキー",
    name: "chansey",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/113.png",
    type1: "normal",
    type2: null,
  },
  {
    generation: 1,
    id: 114,
    jaName: "モンジャラ",
    name: "tangela",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/114.png",
    type1: "grass",
    type2: null,
  },
  {
    generation: 1,
    id: 115,
    jaName: "ガルーラ",
    name: "kangaskhan",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/115.png",
    type1: "normal",
    type2: null,
  },
  {
    generation: 1,
    id: 116,
    jaName: "タッツー",
    name: "horsea",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/116.png",
    type1: "water",
    type2: null,
  },
  {
    generation: 1,
    id: 117,
    jaName: "シードラ",
    name: "seadra",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/117.png",
    type1: "water",
    type2: null,
  },
  {
    generation: 1,
    id: 118,
    jaName: "トサキント",
    name: "goldeen",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/118.png",
    type1: "water",
    type2: null,
  },
  {
    generation: 1,
    id: 119,
    jaName: "アズマオウ",
    name: "seaking",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/119.png",
    type1: "water",
    type2: null,
  },
  {
    generation: 1,
    id: 120,
    jaName: "ヒトデマン",
    name: "staryu",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/120.png",
    type1: "water",
    type2: null,
  },
  {
    generation: 1,
    id: 121,
    jaName: "スターミー",
    name: "starmie",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/121.png",
    type1: "water",
    type2: "psychic",
  },
  {
    generation: 1,
    id: 122,
    jaName: "バリヤード",
    name: "mr-mime",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/122.png",
    type1: "psychic",
    type2: "fairy",
  },
  {
    generation: 1,
    id: 123,
    jaName: "ストライク",
    name: "scyther",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/123.png",
    type1: "bug",
    type2: "flying",
  },
  {
    generation: 1,
    id: 124,
    jaName: "ルージュラ",
    name: "jynx",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/124.png",
    type1: "ice",
    type2: "psychic",
  },
  {
    generation: 1,
    id: 125,
    jaName: "エレブー",
    name: "electabuzz",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/125.png",
    type1: "electric",
    type2: null,
  },
  {
    generation: 1,
    id: 126,
    jaName: "ブーバー",
    name: "magmar",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/126.png",
    type1: "fire",
    type2: null,
  },
  {
    generation: 1,
    id: 127,
    jaName: "カイロス",
    name: "pinsir",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/127.png",
    type1: "bug",
    type2: null,
  },
  {
    generation: 1,
    id: 128,
    jaName: "ケンタロス",
    name: "tauros",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/128.png",
    type1: "normal",
    type2: null,
  },
  {
    generation: 1,
    id: 129,
    jaName: "コイキング",
    name: "magikarp",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/129.png",
    type1: "water",
    type2: null,
  },
  {
    generation: 1,
    id: 130,
    jaName: "ギャラドス",
    name: "gyarados",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/130.png",
    type1: "water",
    type2: "flying",
  },
  {
    generation: 1,
    id: 131,
    jaName: "ラプラス",
    name: "lapras",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/131.png",
    type1: "water",
    type2: "ice",
  },
  {
    generation: 1,
    id: 132,
    jaName: "メタモン",
    name: "ditto",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png",
    type1: "normal",
    type2: null,
  },
  {
    generation: 1,
    id: 133,
    jaName: "イーブイ",
    name: "eevee",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png",
    type1: "normal",
    type2: null,
  },
  {
    generation: 1,
    id: 134,
    jaName: "シャワーズ",
    name: "vaporeon",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/134.png",
    type1: "water",
    type2: null,
  },
  {
    generation: 1,
    id: 135,
    jaName: "サンダース",
    name: "jolteon",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/135.png",
    type1: "electric",
    type2: null,
  },
  {
    generation: 1,
    id: 136,
    jaName: "ブースター",
    name: "flareon",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/136.png",
    type1: "fire",
    type2: null,
  },
  {
    generation: 1,
    id: 137,
    jaName: "ポリゴン",
    name: "porygon",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/137.png",
    type1: "normal",
    type2: null,
  },
  {
    generation: 1,
    id: 138,
    jaName: "オムナイト",
    name: "omanyte",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/138.png",
    type1: "rock",
    type2: "water",
  },
  {
    generation: 1,
    id: 139,
    jaName: "オムスター",
    name: "omastar",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/139.png",
    type1: "rock",
    type2: "water",
  },
  {
    generation: 1,
    id: 140,
    jaName: "カブト",
    name: "kabuto",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/140.png",
    type1: "rock",
    type2: "water",
  },
  {
    generation: 1,
    id: 141,
    jaName: "カブトプス",
    name: "kabutops",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/141.png",
    type1: "rock",
    type2: "water",
  },
  {
    generation: 1,
    id: 142,
    jaName: "プテラ",
    name: "aerodactyl",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/142.png",
    type1: "rock",
    type2: "flying",
  },
  {
    generation: 1,
    id: 143,
    jaName: "カビゴン",
    name: "snorlax",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png",
    type1: "normal",
    type2: null,
  },
  {
    generation: 1,
    id: 144,
    jaName: "フリーザー",
    name: "articuno",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/144.png",
    type1: "ice",
    type2: "flying",
  },
  {
    generation: 1,
    id: 145,
    jaName: "サンダー",
    name: "zapdos",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/145.png",
    type1: "electric",
    type2: "flying",
  },
  {
    generation: 1,
    id: 146,
    jaName: "ファイヤー",
    name: "moltres",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/146.png",
    type1: "fire",
    type2: "flying",
  },
  {
    generation: 1,
    id: 147,
    jaName: "ミニリュウ",
    name: "dratini",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/147.png",
    type1: "dragon",
    type2: null,
  },
  {
    generation: 1,
    id: 148,
    jaName: "ハクリュー",
    name: "dragonair",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/148.png",
    type1: "dragon",
    type2: null,
  },
  {
    generation: 1,
    id: 149,
    jaName: "カイリュー",
    name: "dragonite",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png",
    type1: "dragon",
    type2: "flying",
  },
  {
    generation: 1,
    id: 150,
    jaName: "ミュウツー",
    name: "mewtwo",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png",
    type1: "psychic",
    type2: null,
  },
  {
    generation: 1,
    id: 151,
    jaName: "ミュウ",
    name: "mew",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png",
    type1: "psychic",
    type2: null,
  },
] as const satisfies readonly PokemonQuizRecord[];
