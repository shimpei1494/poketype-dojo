# PokéType Dojo

[![Netlify Status](https://api.netlify.com/api/v1/badges/fbc674fc-e7c8-4301-9520-fd824674062b/deploy-status)](https://app.netlify.com/projects/poketype-dojo/deploys)

PokéType Dojo は、ポケモンのタイプ相性とポケモンごとのタイプを覚え直すための学習アプリです。

公開 URL: https://poketype-dojo.netlify.app/

## 主な機能

- タイプ相性チェッカー
- タイプ相性クイズ
- ポケモンタイプクイズ
- ポケモン一覧とタイプ確認

## 技術スタック

- **TanStack Start** — `src/routes/` 配下のファイルベースルーティング
- **React 19** + **TypeScript**
- **Mantine** — UI コンポーネントライブラリ
- **Vite+** — 開発、ビルド、フォーマット、Lint、テスト、パッケージ管理
- **Netlify** — 本番デプロイ

Vite+ の詳しい運用ルールは [AGENTS.md](AGENTS.md) を参照してください。アプリの用語やドメイン知識は [CONTEXT.md](CONTEXT.md) にまとめています。

## セットアップ

Vite+ をインストールして `vp` コマンドを PATH に追加してください。

```bash
git clone <このリポジトリのURL>
cd poketype-dojo
vp install
vp config
vp dev
```

`vp config` を実行すると git の `core.hookspath` が `.vite-hooks/_` に設定され、コミット前に `vp staged` が実行されます。

## よく使うコマンド

| コマンド            | 内容                                                    |
| ------------------- | ------------------------------------------------------- |
| `vp dev`            | HMR 付きの開発サーバー起動                              |
| `vp build`          | プロダクションビルド                                    |
| `vp preview`        | プロダクションビルドのローカルプレビュー                |
| `vp check`          | フォーマット・Lint・型チェック（`--fix` で自動修正）    |
| `vp test`           | テスト実行                                              |
| `vp run release-pr` | `develop` から `main` へのリリース PR を作成            |
| `vp run knip`       | 未使用ファイル・依存関係・エクスポートの検出            |
| `vp run doctor`     | React ヘルスチェック（通常の Lint は `vp lint` を使う） |

リリース PR の内容だけ確認したい場合:

```bash
vp run release-pr -- --dry-run
```

## ブランチ運用

このリポジトリでは `develop` を通常開発のデフォルトブランチ、`main` を本番リリース用ブランチとして扱います。

```txt
feature/* -> develop -> main -> Netlify production
```

- 通常の機能開発や修正は `feature/*` ブランチで行い、`develop` に PR を作成します。
- `develop` への PR では GitHub Actions が `vp install`、`vp check`、`vp test` を実行します。
- `develop` へのマージは GitHub の branch ruleset により、必須チェックが通るまでブロックされます。
- リリース時は `vp run release-pr` で `develop` から `main` への PR を作成します。
- `develop` から `main` への PR では Netlify Deploy Preview が作成されるため、PR 上の preview URL で本番反映前の挙動を確認します。
- `main` にマージすると Netlify の production deploy が実行され、本番環境に反映されます。

`main` はリリース先として扱うため、品質チェックの責務は `develop` 側に寄せています。

## デプロイ

本番環境は Netlify Free plan で運用しています。Netlify の Production branch は `main` です。

`netlify.toml` では以下を設定しています。

| 設定              | 値            |
| ----------------- | ------------- |
| Build command     | `vp build`    |
| Publish directory | `dist/client` |

TanStack Start 用の Netlify Vite plugin により、SSR と Server Functions は Netlify Functions として生成されます。

Netlify の deploy 設定は次の前提です。

- Production branch: `main`
- Branch deploys: production branch のみ
- Deploy previews: production branch への Pull Request

そのため `feature/*` や `develop` に push しただけでは Netlify deploy は作成されません。`develop` から `main` への PR を作成したときに Deploy Preview が作成され、`main` にマージしたときに production deploy が実行されます。
