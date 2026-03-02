/**
 * Guardrails for the AI resume chat to prevent abuse and API exhaustion.
 */

// --- Limits ---
export const GUARDRAILS = {
  /** Max characters per user message (prevents token exhaustion, paste abuse) */
  MAX_MESSAGE_LENGTH: 2000,
  /** Max messages in conversation (prevents runaway context & cost) */
  MAX_MESSAGES: 30,
  /** Min message length (filters empty/whitespace) */
  MIN_MESSAGE_LENGTH: 2,
} as const;

// --- Content patterns to reject (prompt injection, jailbreaks, obviously off-topic) ---
const BLOCKED_PATTERNS = [
  /ignore\s+(all\s+)?(previous|above|prior)\s+instructions/i,
  /disregard\s+(all\s+)?(previous|above|prior)/i,
  /you\s+are\s+now\s+(a|an)\s+/i,
  /pretend\s+(you\s+are|to\s+be)/i,
  /act\s+as\s+(if\s+you\s+are|a)/i,
  /forget\s+(everything|all|your)\s+/i,
  /system\s+prompt|system\s+instruction/i,
  /reveal\s+(your|the)\s+(prompt|instructions)/i,
  /repeat\s+(the|your)\s+(above|previous)/i,
  /what\s+are\s+your\s+(rules|instructions|prompt)/i,
  /write\s+(me\s+)?(a\s+)?(poem|story|essay|code)/i,
  /tell\s+me\s+a\s+joke/i,
  /what('s|\s+is)\s+the\s+weather/i,
  /random\s+(number|word)/i,
] as const;

/** Patterns that suggest resume-related intent (used to allow borderline cases) */
const RESUME_RELATED_WORDS =
  /experience|skill|project|job|work|role|education|career|company|interview|hire|resume|cv|background|qualification|achievement|technology|built|developed/i;

export interface ValidationResult {
  ok: boolean;
  error?: string;
}

function extractMessageText(msg: unknown): string | null {
  if (!msg || typeof msg !== "object") return null;
  const m = msg as Record<string, unknown>;

  if (typeof m.content === "string") return m.content;
  if (Array.isArray(m.parts)) {
    const text = m.parts
      .filter((p): p is { type: string; text: string } => p?.type === "text" && typeof (p as { text?: unknown }).text === "string")
      .map((p) => (p as { text: string }).text)
      .join("");
    return text || null;
  }
  return null;
}

/**
 * Validates the incoming chat request before hitting the LLM.
 */
export function validateChatRequest(messages: unknown[]): ValidationResult {
  if (!Array.isArray(messages) || messages.length === 0) {
    return { ok: false, error: "Invalid or empty conversation." };
  }

  if (messages.length > GUARDRAILS.MAX_MESSAGES) {
    return {
      ok: false,
      error: "Conversation too long. Please start a new chat.",
    };
  }

  // Get the last user message (support both content string and parts array from AI SDK)
  const lastMsg = messages.at(-1);
  const content = extractMessageText(lastMsg);

  if (!content) {
    return { ok: false, error: "Invalid message format." };
  }

  const trimmed = content.trim();
  if (trimmed.length < GUARDRAILS.MIN_MESSAGE_LENGTH) {
    return { ok: false, error: "Message is too short." };
  }

  if (trimmed.length > GUARDRAILS.MAX_MESSAGE_LENGTH) {
    return {
      ok: false,
      error: `Message exceeds ${GUARDRAILS.MAX_MESSAGE_LENGTH} characters. Please shorten your question.`,
    };
  }

  // Block prompt injection / jailbreak / obviously off-topic patterns
  const isBlocked = BLOCKED_PATTERNS.some((re) => re.test(trimmed));
  if (isBlocked) {
    return {
      ok: false,
      error: "This question isn't relevant to my professional background. Feel free to ask about my experience, skills, or what I'm looking for.",
    };
  }

  // Optional: block if message has no resume-related cues and is very short/generic
  // (reduces simple bot probes like "hi", "test", "asdf" that waste API calls)
  if (trimmed.length < 15 && !RESUME_RELATED_WORDS.test(trimmed)) {
    const genericOnly = /^(hi|hello|hey|yo|test|asdf|qwerty|123|lol|ok|yes|no|wtf|huh)\s*!?$/i.test(
      trimmed
    );
    if (genericOnly) {
      return {
        ok: false,
        error: "Feel free to ask about my experience, skills, or background—I'm here to help with that!",
      };
    }
  }

  return { ok: true };
}

/**
 * Extracts identifier for rate limiting (IP or fallback).
 */
export function getRateLimitIdentifier(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  if (realIp) {
    return realIp;
  }
  return "unknown";
}
