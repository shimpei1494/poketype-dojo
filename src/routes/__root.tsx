/// <reference types="vite-plus/client" />
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { appTheme } from "../theme";

import appCss from "../styles.css?url";
import mantineCss from "@mantine/core/styles.css?url";
import notificationsCss from "@mantine/notifications/styles.css?url";

const appTitle = "PokéType Dojo";
const appDescription =
  "ポケモンのタイプ相性とポケモンごとのタイプを、クイズとチェッカーで覚え直す学習アプリ。";
const appUrl = "https://poketype-dojo.netlify.app/";
const ogImageUrl = `${appUrl}og-image.png`;

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: ErrorComponent,
  head: () => ({
    links: [
      { href: appUrl, rel: "canonical" },
      { href: "/favicon.svg", rel: "icon", type: "image/svg+xml" },
      { href: "/apple-touch-icon.png", rel: "apple-touch-icon", sizes: "180x180" },
      { href: mantineCss, rel: "stylesheet" },
      { href: notificationsCss, rel: "stylesheet" },
      { href: appCss, rel: "stylesheet" },
    ],
    meta: [
      { charSet: "utf8" },
      { content: "width=device-width, initial-scale=1", name: "viewport" },
      { title: appTitle },
      { content: appDescription, name: "description" },
      { content: "#fff0f6", name: "theme-color" },
      { content: appTitle, property: "og:title" },
      { content: appDescription, property: "og:description" },
      { content: appUrl, property: "og:url" },
      { content: "website", property: "og:type" },
      { content: ogImageUrl, property: "og:image" },
      { content: "1200", property: "og:image:width" },
      { content: "630", property: "og:image:height" },
      { content: "summary_large_image", name: "twitter:card" },
      { content: appTitle, name: "twitter:title" },
      { content: appDescription, name: "twitter:description" },
      { content: ogImageUrl, name: "twitter:image" },
    ],
  }),
  notFoundComponent: NotFoundComponent,
  pendingComponent: PendingComponent,
});

function RootComponent() {
  return (
    <html lang="ja" {...mantineHtmlProps}>
      <head>
        <HeadContent />
        <ColorSchemeScript forceColorScheme="light" />
      </head>
      <body>
        <MantineProvider defaultColorScheme="light" forceColorScheme="light" theme={appTheme}>
          <Notifications position="top-right" />
          <Outlet />
        </MantineProvider>
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}

function NotFoundComponent() {
  return (
    <div style={{ padding: "1rem" }}>
      <h1>404</h1>
      <p>ページが見つかりませんでした。</p>
    </div>
  );
}

function ErrorComponent({ error }: { error: Error }) {
  return (
    <div style={{ padding: "1rem" }}>
      <h1 style={{ color: "red" }}>エラー</h1>
      <p>{error.message}</p>
    </div>
  );
}

function PendingComponent() {
  return (
    <div style={{ padding: "1rem" }}>
      <p>読み込み中...</p>
    </div>
  );
}
