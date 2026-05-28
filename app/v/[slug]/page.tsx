import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ChatSection } from "@/components/chat-section";
import { Experience } from "@/components/experience";
import { Skills } from "@/components/skills";
import { Education } from "@/components/education";
import { ContactFooter } from "@/components/contact-footer";
import { ResumeDataProvider } from "@/lib/resume-data-context";
import {
  applyVariant,
  getAllVariants,
  getVariantBySlug,
} from "@/lib/variants";

// Static params at build time — Vercel pre-renders one HTML page per variant.
export function generateStaticParams() {
  return getAllVariants().map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const variant = getVariantBySlug(slug);
  if (!variant) return {};
  const data = applyVariant(variant);
  return {
    title: `${data.personal.name} — ${data.personal.title}`,
    description: data.personal.tagline,
    // Variants are tailored for specific recruiters — keep them out of search.
    robots: { index: false, follow: false },
  };
}

export default async function VariantPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const variant = getVariantBySlug(slug);
  if (!variant) notFound();

  const data = applyVariant(variant);

  return (
    <ResumeDataProvider
      value={{
        data,
        pdfUrl: `/v/${slug}/resume.pdf`,
        variantSlug: slug,
        variantLabel: variant.label,
      }}
    >
      <Navbar />
      <main>
        <Hero />
        <ChatSection />
        <Experience />
        <Skills />
        <Education />
        <ContactFooter />
      </main>
    </ResumeDataProvider>
  );
}
