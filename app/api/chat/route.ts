import { openai } from "@ai-sdk/openai";
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { buildSystemPrompt } from "@/lib/build-system-prompt";
import { applyVariant, getVariantBySlug } from "@/lib/variants";
import { validateChatRequest, getRateLimitIdentifier } from "@/lib/guardrails";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  let messages: unknown[];
  let variantSlug: string | undefined;
  try {
    const body = await req.json();
    messages = body?.messages ?? [];
    // Optional: when the chat is rendered on /v/<slug>, the client sends the
    // slug so the AI can lean toward the relevant achievements.
    if (typeof body?.variantSlug === "string") {
      variantSlug = body.variantSlug;
    }
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

  // Resolve variant (if any) and apply its overrides to the resume data
  // before building the system prompt. Unknown slugs silently fall back to
  // the base data — recruiters don't get an error if a variant was deleted.
  const variant = variantSlug ? getVariantBySlug(variantSlug) : undefined;
  const data = variant ? applyVariant(variant) : undefined;

  const modelMessages = await convertToModelMessages(messages as Omit<UIMessage, "id">[]);

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: buildSystemPrompt({ data, variant }),
    messages: modelMessages,
    maxOutputTokens: 1024,
  });

  return result.toUIMessageStreamResponse();
}
