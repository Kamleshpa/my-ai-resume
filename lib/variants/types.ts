// =============================================================================
// VARIANT TYPES
// =============================================================================
// A ResumeVariant is a small override file tailored to a specific job
// description. The scope of what a variant can change is intentionally narrow:
// only the things that meaningfully re-target the resume without rewriting
// history. Right now that's:
//   - personal:   tagline / summary / title rewording (everything else fixed)
//   - skills:     reorder/filter to surface the JD's stack first
//   - targetRole: rewrite the role title and pitch to mirror the JD
//
// Anything not overridden falls back to the base resumeData.
// =============================================================================

import type { PersonalInfo, SkillCategory, TargetRole } from "../resume-data";

/** Subset of PersonalInfo that variants are allowed to retune. */
export type PersonalOverrides = Partial<
  Pick<PersonalInfo, "title" | "tagline" | "summary">
>;

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
