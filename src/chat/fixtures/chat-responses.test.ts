import { createParser } from "@openuidev/react-lang";
import { describe, expect, it } from "vite-plus/test";

import { chatUiLibrary } from "../chat-ui-library";
import {
  chatResponseFixtures,
  defaultChatResponseFixtureId,
  findChatResponseFixture,
} from "./chat-responses";

function parseFixtureResponse(response: string) {
  const parser = createParser(chatUiLibrary.toJSONSchema(), chatUiLibrary.root);

  return parser.parse(response);
}

describe("chatResponseFixtures", () => {
  it("デフォルトfixtureが存在する", () => {
    expect(findChatResponseFixture(defaultChatResponseFixtureId)).toBeDefined();
  });

  it("fixtureのidは重複しない", () => {
    const ids = chatResponseFixtures.map((fixture) => fixture.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  const validFixtures = chatResponseFixtures.filter((fixture) => fixture.hasParseErrors !== true);
  const brokenFixtures = chatResponseFixtures.filter((fixture) => fixture.hasParseErrors === true);

  it.each(validFixtures.map((fixture) => [fixture.id, fixture] as const))(
    "正常系fixture「%s」は検証エラーなしで解析できる",
    (_fixtureId, fixture) => {
      const result = parseFixtureResponse(fixture.response);

      expect(result.meta.errors).toEqual([]);
      expect(result.root?.typeName).toBe("Answer");
    },
  );

  it.each(brokenFixtures.map((fixture) => [fixture.id, fixture] as const))(
    "壊れたfixture「%s」は検証エラーを report しつつ解析自体は落ちない",
    (_fixtureId, fixture) => {
      const result = parseFixtureResponse(fixture.response);

      expect(result.meta.errors.length).toBeGreaterThan(0);
      expect(result.root?.typeName).toBe("Answer");
    },
  );
});
