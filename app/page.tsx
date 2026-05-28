import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ChatSection } from "@/components/chat-section";
import { Experience } from "@/components/experience";
import { Skills } from "@/components/skills";
import { Education } from "@/components/education";
import { ContactFooter } from "@/components/contact-footer";
import { ResumeDataProvider } from "@/lib/resume-data-context";
import { resumeData } from "@/lib/resume-data";

export default function Home() {
  return (
    <ResumeDataProvider
      value={{ data: resumeData, pdfUrl: "/api/resume/pdf" }}
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
