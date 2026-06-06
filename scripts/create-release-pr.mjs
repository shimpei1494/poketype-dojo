import { spawnSync } from "node:child_process";

const passthroughArgs = process.argv.slice(2);

if (passthroughArgs[0] === "--") {
  passthroughArgs.shift();
}

const args = [
  "pr",
  "create",
  "--base",
  "main",
  "--head",
  "develop",
  "--title",
  "Release: develop to main",
  "--body",
  "Release develop changes to production.",
  ...passthroughArgs,
];

const result = spawnSync("gh", args, { stdio: "inherit" });

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
