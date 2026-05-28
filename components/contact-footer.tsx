"use client";

import { useResumeData } from "@/lib/resume-data-context";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Globe, Heart, Download } from "lucide-react";

export function ContactFooter() {
  const { data, pdfUrl } = useResumeData();
  const { personal } = data;

  const links = [
    {
      icon: Mail,
      label: "Email",
      href: `mailto:${personal.email}`,
      text: personal.email,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: personal.linkedin,
      text: "LinkedIn Profile",
    },
    ...(personal.github
      ? [
          {
            icon: Github,
            label: "GitHub",
            href: personal.github,
            text: "GitHub Profile",
          },
        ]
      : []),
    ...(personal.website
      ? [
          {
            icon: Globe,
            label: "Website",
            href: personal.website,
            text: "Personal Website",
          },
        ]
      : []),
  ];

  return (
    <footer id="contact" className="section-padding border-t border-card-border">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Let&apos;s Connect
          </h2>
          <p className="mt-3 text-muted">
            Interested in working together? I&apos;d love to hear from you.
          </p>

          {/* Links */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-card-border bg-card/50 px-5 py-3 text-sm text-foreground transition-all hover:border-accent/30 hover:text-accent"
              >
                <link.icon size={16} />
                {link.text}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3.5 text-sm font-medium text-accent-foreground transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/25"
            >
              <Mail size={18} />
              Get in Touch
            </a>
            <a
              href={pdfUrl}
              className="inline-flex items-center gap-2 rounded-xl border border-card-border bg-card/50 px-8 py-3.5 text-sm font-medium text-foreground transition-all hover:border-accent/30 hover:text-accent"
            >
              <Download size={18} />
              Download Resume (PDF)
            </a>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-card-border pt-8 sm:flex-row">
          <p className="flex items-center gap-1 text-xs text-muted">
            Built with <Heart size={12} className="text-red-500" /> by{" "}
            {personal.name}
          </p>
          <p className="text-xs text-muted">
            Powered by AI &middot; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
