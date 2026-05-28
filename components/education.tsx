"use client";

import { useResumeData } from "@/lib/resume-data-context";
import { motion } from "framer-motion";
import { GraduationCap, Award, ExternalLink } from "lucide-react";

export function Education() {
  const { data } = useResumeData();
  const { education, certifications } = data;

  return (
    <section id="education" className="section-padding">
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
            <GraduationCap size={14} className="text-accent" />
            Background
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Education & Certifications
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Education Cards */}
          <div className="space-y-4">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
              Education
            </h3>
            {education.map((edu, index) => (
              <motion.div
                key={`${edu.institution}-${edu.degree}`}
                className="rounded-xl border border-card-border bg-card/50 p-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {edu.degree} in {edu.field}
                    </h4>
                    <p className="mt-0.5 text-sm text-accent">
                      {edu.institution}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      {edu.startYear} – {edu.endYear}
                      {edu.gpa && ` | GPA: ${edu.gpa}`}
                    </p>
                    {edu.achievements && edu.achievements.length > 0 && (
                      <ul className="mt-3 space-y-1">
                        {edu.achievements.map((a) => (
                          <li
                            key={a}
                            className="flex items-center gap-2 text-sm text-muted"
                          >
                            <span className="h-1 w-1 rounded-full bg-accent" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications Cards */}
          <div className="space-y-4">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
              Certifications
            </h3>
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                className="rounded-xl border border-card-border bg-card/50 p-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {cert.name}
                    </h4>
                    <p className="mt-0.5 text-sm text-accent">{cert.issuer}</p>
                    <p className="mt-1 text-xs text-muted">{cert.year}</p>
                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-xs text-accent hover:underline"
                      >
                        Verify
                        <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
