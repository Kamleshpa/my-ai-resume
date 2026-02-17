import { openai } from "@ai-sdk/openai";
import { streamText, convertToModelMessages } from "ai";
import { buildSystemPrompt } from "@/lib/build-system-prompt";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: buildSystemPrompt(),
    messages: modelMessages,
    maxOutputTokens: 1024,
  });

  return result.toUIMessageStreamResponse();
}
