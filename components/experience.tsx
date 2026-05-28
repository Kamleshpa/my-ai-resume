"use client";

import { useState } from "react";
import { useResumeData } from "@/lib/resume-data-context";
import { motion } from "framer-motion";
import { Briefcase, ChevronDown, MapPin, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export function Experience() {
  const { data: resumeData } = useResumeData();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="section-padding">
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
            <Briefcase size={14} className="text-accent" />
            Career
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Work Experience
          </h2>
          <p className="mt-3 text-muted">
            My professional journey and key achievements
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-0 bottom-0 left-[19px] w-px bg-card-border md:left-1/2 md:-translate-x-px" />

          {resumeData.experience.map((exp, index) => {
            const isExpanded = expandedIndex === index;
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={`${exp.company}-${exp.role}`}
                className={cn(
                  "relative mb-8 flex items-start gap-6 last:mb-0",
                  "md:gap-0",
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                )}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Timeline dot */}
                <div className="absolute left-[12px] z-10 flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 border-accent bg-background md:left-1/2 md:-translate-x-1/2">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                </div>

                {/* Card */}
                <div
                  className={cn(
                    "ml-12 w-full md:ml-0 md:w-[calc(50%-2rem)]",
                    isLeft ? "md:mr-auto md:pr-0" : "md:ml-auto md:pl-0"
                  )}
                >
                  <button
                    onClick={() =>
                      setExpandedIndex(isExpanded ? null : index)
                    }
                    className="w-full rounded-xl border border-card-border bg-card/50 p-5 text-left transition-all hover:border-accent/30 hover:bg-card/80"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {exp.role}
                        </h3>
                        <p className="mt-0.5 text-sm font-medium text-accent">
                          {exp.company}
                        </p>
                      </div>
                      <ChevronDown
                        size={18}
                        className={cn(
                          "mt-1 shrink-0 text-muted transition-transform",
                          isExpanded && "rotate-180"
                        )}
                      />
                    </div>

                    {/* Meta */}
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {exp.startDate} – {exp.endDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {exp.location}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {exp.description}
                    </p>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                        className="mt-4"
                      >
                        {/* Achievements */}
                        <div>
                          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
                            Key Achievements
                          </h4>
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement) => (
                              <li
                                key={achievement}
                                className="flex gap-2 text-sm text-foreground/80"
                              >
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies */}
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-md bg-accent/10 px-2 py-0.5 text-xs text-accent"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
