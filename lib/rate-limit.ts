/**
 * Rate limiting via Upstash Redis.
 * Only active when UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set.
 *
 * Eviction: Keys use PEXPIRE and auto-expire within the window (1 min). No long-term
 * storage. For extra safety, set an eviction policy (e.g. volatile-lru) in Upstash
 * Console → Database → Data Browser / Eviction.
 */

const RATE_LIMIT_OPTIONS = {
  /** Requests per window */
  requests: 15,
  /** Window duration */
  window: "1 m",
} as const;

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  error?: string;
}

/**
 * Checks rate limit for the given identifier.
 * Returns success: false when rate limited.
 * If Upstash is not configured, returns success: true (no rate limiting).
 */
export async function checkRateLimit(
  identifier: string
): Promise<RateLimitResult> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return {
      success: true,
      limit: RATE_LIMIT_OPTIONS.requests,
      remaining: RATE_LIMIT_OPTIONS.requests,
      reset: Math.floor(Date.now() / 1000) + 60,
    };
  }

  try {
    const { Ratelimit } = await import("@upstash/ratelimit");
    const { Redis } = await import("@upstash/redis");

    const redis = new Redis({ url, token });
    const ratelimit = new Ratelimit({
      redis,
      prefix: "ratelimit:resume",
      limiter: Ratelimit.slidingWindow(
        RATE_LIMIT_OPTIONS.requests,
        RATE_LIMIT_OPTIONS.window
      ),
    });

    const result = await ratelimit.limit(identifier);
    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
    };
  } catch (e) {
    const err = e instanceof Error ? e.message : String(e);
    // On rate limiter failure, allow request to avoid blocking users
    console.warn("[rate-limit] Error:", err);
    return {
      success: true,
      limit: RATE_LIMIT_OPTIONS.requests,
      remaining: 0,
      reset: Math.floor(Date.now() / 1000) + 60,
      error: err,
    };
  }
}
