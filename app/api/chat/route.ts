import { openai } from "@ai-sdk/openai";
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { buildSystemPrompt } from "@/lib/build-system-prompt";
import { validateChatRequest, getRateLimitIdentifier } from "@/lib/guardrails";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  let messages: unknown[];
  try {
    const body = await req.json();
    messages = body?.messages ?? [];
  } catch {
    return Response.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  // Guardrail: validate request before any API calls
  const validation = validateChatRequest(messages);
  if (!validation.ok) {
    return Response.json(
      { error: validation.error ?? "Request rejected." },
      { status: 400 }
    );
  }

  // Guardrail: rate limit by IP (optional; requires Upstash env vars)
  const identifier = getRateLimitIdentifier(req);
  const rateLimit = await checkRateLimit(identifier);
  if (!rateLimit.success) {
    return Response.json(
      {
        error: "Too many requests. Please slow down and try again in a minute.",
      },
      { status: 429 }
    );
  }

  const modelMessages = await convertToModelMessages(messages as Omit<UIMessage, "id">[]);

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: buildSystemPrompt(),
    messages: modelMessages,
    maxOutputTokens: 1024,
  });

  return result.toUIMessageStreamResponse();
}
