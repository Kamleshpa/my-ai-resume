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
  return {
    ...resumeData,
    personal: overrides.personal
      ? { ...resumeData.personal, ...overrides.personal }
      : resumeData.personal,
    skills: overrides.skills ?? resumeData.skills,
    targetRole: overrides.targetRole
      ? { ...resumeData.targetRole, ...overrides.targetRole }
      : resumeData.targetRole,
  };
}

export type { ResumeVariant } from "./types";
