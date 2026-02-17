import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ChatSection } from "@/components/chat-section";
import { Experience } from "@/components/experience";
import { Skills } from "@/components/skills";
import { Education } from "@/components/education";
import { ContactFooter } from "@/components/contact-footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ChatSection />
        <Experience />
        <Skills />
        <Education />
        <ContactFooter />
      </main>
    </>
  );
}
