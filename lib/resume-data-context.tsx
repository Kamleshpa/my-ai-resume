"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { ResumeData } from "./resume-data";

export interface ResumeDataContextValue {
  data: ResumeData;
  /** URL to download the PDF for this view (base or variant). */
  pdfUrl: string;
  /** Variant slug if rendering a tailored version; undefined on the base page. */
  variantSlug?: string;
  /** Human-readable variant label (e.g. "Stripe — Staff Data Engineer"). */
  variantLabel?: string;
}

const ResumeDataContext = createContext<ResumeDataContextValue | null>(null);

export function ResumeDataProvider({
  value,
  children,
}: {
  value: ResumeDataContextValue;
  children: ReactNode;
}) {
  return (
    <ResumeDataContext.Provider value={value}>
      {children}
    </ResumeDataContext.Provider>
  );
}

export function useResumeData(): ResumeDataContextValue {
  const ctx = useContext(ResumeDataContext);
  if (!ctx) {
    throw new Error(
      "useResumeData must be used inside <ResumeDataProvider>. Wrap your page in the provider with base or variant data."
    );
  }
  return ctx;
}
