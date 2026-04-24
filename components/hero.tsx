"use client";

import { resumeData } from "@/lib/resume-data";
import { MapPin, Briefcase, Code, Building2, ArrowDown, MessageSquare, Download } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  const { personal, experience, skills } = resumeData;

  const totalCompanies = experience.length;
  const totalTechnologies = new Set(skills.flatMap((s) => s.items)).size;

  const stats = [
    {
      icon: Briefcase,
      value: `${personal.yearsOfExperience}+`,
      label: "Years Experience",
    },
    {
      icon: Building2,
      value: `${totalCompanies}+`,
      label: "Companies",
    },
    {
      icon: Code,
      value: `${totalTechnologies}+`,
      label: "Technologies",
    },
  ];

  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16"
    >
      {/* Animated gradient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-gradient absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-purple-500/5" />
        <div className="absolute top-1/4 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Name & Title */}
        <motion.h1
          className="mt-8 text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {personal.name}
        </motion.h1>

        <motion.p
          className="mt-4 text-xl text-accent sm:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {personal.title}
        </motion.p>

        <motion.div
          className="mt-3 flex items-center justify-center gap-1.5 text-muted"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <MapPin size={16} />
          <span className="text-sm">{personal.location}</span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {personal.tagline}
        </motion.p>

        {/* Stats */}
        <motion.div
          className="mt-10 flex items-center justify-center gap-8 sm:gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="flex items-center justify-center gap-1.5">
                <stat.icon size={18} className="text-accent" />
                <span className="text-2xl font-bold text-foreground sm:text-3xl">
                  {stat.value}
                </span>
              </div>
              <span className="mt-1 block text-xs text-muted sm:text-sm">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <a
            href="#chat"
            className="group inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/25"
          >
            <MessageSquare size={18} />
            Chat with my AI
            <ArrowDown
              size={14}
              className="transition-transform group-hover:translate-y-0.5"
            />
          </a>
          <a
            href="/api/resume/pdf"
            className="inline-flex items-center gap-2 rounded-xl border border-card-border bg-card/50 px-6 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:border-accent/30 hover:bg-card hover:text-accent"
          >
            <Download size={18} />
            Download Resume (PDF)
          </a>
        </motion.div>
      </div>
    </section>
  );
}
