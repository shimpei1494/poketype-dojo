import { describe, expect, it } from "vite-plus/test";

import {
  chatRequestSchema,
  maxChatHistoryMessages,
  maxUserMessageLength,
  takeRecentChatMessages,
  type ChatMessage,
} from "./chat-request";

function buildHistory(length: number): ChatMessage[] {
  return Array.from({ length }, (_, index) => ({
    content: `メッセージ${index}`,
    role: index % 2 === 0 ? ("user" as const) : ("assistant" as const),
  }));
}

describe("chatRequestSchema", () => {
  it("ユーザーとアシスタントの交互の履歴を受け付ける", () => {
    const result = chatRequestSchema.safeParse({
      messages: [
        { content: "黄色くて電気を出すネズミは?", role: "user" },
        { content: 'root = Answer([p1])\np1 = Paragraph("ピカチュウかも")', role: "assistant" },
        { content: "しっぽが雷型だった", role: "user" },
      ],
    });

    expect(result.success).toBe(true);
  });

  it("最後のメッセージがユーザー以外なら拒否する", () => {
    const result = chatRequestSchema.safeParse({
      messages: [
        { content: "質問", role: "user" },
        { content: "回答", role: "assistant" },
      ],
    });

    expect(result.success).toBe(false);
  });

  it("空のメッセージ配列を拒否する", () => {
    const result = chatRequestSchema.safeParse({ messages: [] });

    expect(result.success).toBe(false);
  });

  it("長すぎるユーザーメッセージを拒否する", () => {
    const result = chatRequestSchema.safeParse({
      messages: [{ content: "あ".repeat(maxUserMessageLength + 1), role: "user" }],
    });

    expect(result.success).toBe(false);
  });

  it("不明なroleを拒否する", () => {
    const result = chatRequestSchema.safeParse({
      messages: [{ content: "こんにちは", role: "system" }],
    });

    expect(result.success).toBe(false);
  });
});

describe("takeRecentChatMessages", () => {
  it("上限以下の履歴はそのまま返す", () => {
    const messages = buildHistory(3);

    expect(takeRecentChatMessages(messages)).toEqual(messages);
  });

  it("上限を超えた履歴は新しい方から上限件数だけ返す", () => {
    const messages = buildHistory(maxChatHistoryMessages + 4);
    const recent = takeRecentChatMessages(messages);

    expect(recent).toHaveLength(maxChatHistoryMessages);
    expect(recent.at(-1)).toEqual(messages.at(-1));
  });

  it("元の配列を変更しない", () => {
    const messages = buildHistory(maxChatHistoryMessages + 2);
    const original = [...messages];

    takeRecentChatMessages(messages);

    expect(messages).toEqual(original);
  });
});
