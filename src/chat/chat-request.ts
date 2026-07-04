import { z } from "zod";

/** ユーザー入力の最大文字数(悪用・コスト対策) */
export const maxUserMessageLength = 500;

/** アシスタント応答(OpenUI Langテキスト)の最大文字数 */
const maxAssistantMessageLength = 8000;

/** OpenAI APIに送る会話履歴の最大件数 */
export const maxChatHistoryMessages = 8;

const userMessageSchema = z.object({
  content: z.string().trim().min(1).max(maxUserMessageLength),
  role: z.literal("user"),
});

const assistantMessageSchema = z.object({
  content: z.string().min(1).max(maxAssistantMessageLength),
  role: z.literal("assistant"),
});

const chatMessageSchema = z.discriminatedUnion("role", [userMessageSchema, assistantMessageSchema]);

export type ChatMessage = z.infer<typeof chatMessageSchema>;

export const chatRequestSchema = z
  .object({
    messages: z
      .array(chatMessageSchema)
      .min(1)
      .max(maxChatHistoryMessages * 4),
  })
  .refine((request) => request.messages.at(-1)?.role === "user", {
    message: "最後のメッセージはユーザーの発言である必要があります",
  });

export function takeRecentChatMessages(
  messages: readonly ChatMessage[],
  limit: number = maxChatHistoryMessages,
): ChatMessage[] {
  return messages.slice(-limit);
}
