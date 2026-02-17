"use client";

import { resumeData } from "@/lib/resume-data";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function Skills() {
  return (
    <section id="skills" className="section-padding">
      <div className="mx-auto max-w-4xl px-6">
        {/* Section Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-card-border bg-card/50 px-4 py-1.5 text-sm text-muted">
            <Sparkles size={14} className="text-accent" />
            Expertise
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Skills & Technologies
          </h2>
          <p className="mt-3 text-muted">
            Tools and technologies I work with daily
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resumeData.skills.map((category, index) => (
            <motion.div
              key={category.category}
              className="rounded-xl border border-card-border bg-card/50 p-5 transition-colors hover:border-accent/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-card-border bg-background px-2.5 py-1 text-sm text-foreground/80 transition-colors hover:border-accent/30 hover:text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
