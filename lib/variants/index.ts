// =============================================================================
// VARIANT REGISTRY
// =============================================================================
// Add a new variant by:
//   1. Creating `lib/variants/<slug>.ts` that exports a `ResumeVariant`
//   2. Importing it here and adding it to the `variants` array
// =============================================================================

import { resumeData, type ResumeData } from "../resume-data";
import type { ResumeVariant } from "./types";

import { stripeStaffData } from "./stripe-staff-data";
import { amazon } from "./amazon";

const variants: ResumeVariant[] = [
  stripeStaffData,
  amazon,
  // ← add new variants here
];

const bySlug = new Map<string, ResumeVariant>(
  variants.map((v) => [v.slug, v])
);

export function getAllVariants(): ResumeVariant[] {
  return variants;
}

export function getVariantBySlug(slug: string): ResumeVariant | undefined {
  return bySlug.get(slug);
}

/**
 * Merge a variant's overrides onto the base resume data. Anything not
 * specified in `variant.overrides` falls through unchanged.
 */
export function applyVariant(variant: ResumeVariant): ResumeData {
  const { overrides } = variant;

  // Build a lookup of experience overrides by "company|role". Unknown
  // (company, role) pairs are silently ignored so a renamed base entry
  // never breaks an existing recruiter link — it just falls back to the
  // base bullets.
  const experienceOverrides = new Map(
    (overrides.experience ?? []).map((o) => [`${o.company}|${o.role}`, o])
  );
  const experience = resumeData.experience.map((exp) => {
    const o = experienceOverrides.get(`${exp.company}|${exp.role}`);
    if (!o) return exp;
    return {
      ...exp,
      description: o.description ?? exp.description,
      achievements: o.achievements ?? exp.achievements,
      technologies: o.technologies ?? exp.technologies,
    };
  });

  return {
    ...resumeData,
    personal: overrides.personal
      ? { ...resumeData.personal, ...overrides.personal }
      : resumeData.personal,
    experience,
    skills: overrides.skills ?? resumeData.skills,
    targetRole: overrides.targetRole
      ? { ...resumeData.targetRole, ...overrides.targetRole }
      : resumeData.targetRole,
  };
}

export type { ResumeVariant } from "./types";
