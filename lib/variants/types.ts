// =============================================================================
// VARIANT TYPES
// =============================================================================
// A ResumeVariant is a small override file tailored to a specific job
// description. The scope of what a variant can change is intentionally narrow:
// only the things that meaningfully re-target the resume without rewriting
// history. Right now that's:
//   - personal:   tagline / summary / title rewording (everything else fixed)
//   - experience: per-role reorder/filter of achievements + tech (no inventing)
//   - skills:     reorder/filter to surface the JD's stack first
//   - targetRole: rewrite the role title and pitch to mirror the JD
//
// Anything not overridden falls back to the base resumeData.
// =============================================================================

import type {
  Experience,
  PersonalInfo,
  SkillCategory,
  TargetRole,
} from "../resume-data";

/** Subset of PersonalInfo that variants are allowed to retune. */
export type PersonalOverrides = Partial<
  Pick<PersonalInfo, "title" | "tagline" | "summary">
>;

/**
 * Per-experience override. Targets one base entry by `company` + `role`
 * (the natural key in resumeData.experience). Anything not specified falls
 * through unchanged. Variants that reference a company+role not in the base
 * resume are silently skipped.
 */
export interface ExperienceOverride {
  /** Must match the base entry's `company` exactly. */
  company: string;
  /** Must match the base entry's `role` exactly. */
  role: string;
  /**
   * Reorder/filter the achievement bullets. Use this to put the JD-relevant
   * bullets first and optionally drop ones that don't apply. Strings should
   * be copied verbatim from the base resume — don't invent new claims.
   */
  achievements?: string[];
  /**
   * Reorder/filter the technology chips for this role.
   */
  technologies?: string[];
  /**
   * Reword the one-liner description. Keep it truthful — same scope and
   * facts as the base description, just retuned for the JD's language.
   */
  description?: string;
}

/** Compile-time check that ExperienceOverride only touches fields on Experience. */
type _ExperienceOverrideShape = Pick<
  Experience,
  "company" | "role" | "achievements" | "technologies" | "description"
>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type _Assert = ExperienceOverride extends _ExperienceOverrideShape ? true : never;

export interface ResumeVariant {
  /** URL slug — also the filename. Lowercase, kebab-case. */
  slug: string;
  /** Human-readable label, e.g. "Stripe — Staff Data Engineer". */
  label: string;
  /** ISO date the variant was created, for your own bookkeeping. */
  createdAt: string;
  /**
   * The job description this variant targets. Stored for future reference
   * (e.g. so you can regenerate the variant if you tweak the schema). Not
   * rendered to recruiters.
   */
  jobDescription?: string;
  /** Short internal note about *why* this variant exists. Not rendered. */
  note?: string;

  overrides: {
    /**
     * Reword `title`, `tagline`, and/or `summary` to mirror the JD's framing.
     * Keep claims truthful — do not invent new history or metrics. Other
     * `PersonalInfo` fields (name, email, links) are locked to the base data.
     */
    personal?: PersonalOverrides;
    /**
     * Per-role overrides for the experience section. Each entry targets one
     * base experience by `company` + `role` and can reorder/filter
     * achievements, retune technologies, or reword the description. The
     * order of experience entries themselves stays chronological — only the
     * inner bullets and chips are tailored.
     */
    experience?: ExperienceOverride[];
    /**
     * Full replacement for resumeData.skills. Use this to reorder categories,
     * reorder items within categories, or drop categories that don't apply.
     * Do NOT invent new skills here — only re-arrange what's in the base data.
     */
    skills?: SkillCategory[];
    /**
     * Partial override of resumeData.targetRole. Typically you override
     * `title` and `pitch` to mirror the JD; `type`, `location`, and
     * `industries` usually stay as-is.
     */
    targetRole?: Partial<TargetRole>;
  };
}
