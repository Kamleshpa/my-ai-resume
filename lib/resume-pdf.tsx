import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import type { ReactNode } from "react";
import { resumeData as baseResumeData, type ResumeData } from "./resume-data";

const colors = {
  text: "#111827",
  muted: "#4b5563",
  subtle: "#6b7280",
  accent: "#2563eb",
  border: "#e5e7eb",
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 28,
    paddingBottom: 28,
    paddingHorizontal: 40,
    fontSize: 9.5,
    lineHeight: 1.35,
    color: colors.text,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 8,
  },
  name: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.3,
    marginBottom: 6,
  },
  title: {
    fontSize: 11,
    color: colors.accent,
    fontFamily: "Helvetica-Bold",
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
    fontSize: 8.5,
    color: colors.muted,
  },
  contactItem: {
    marginRight: 10,
  },
  link: {
    color: colors.accent,
    textDecoration: "none",
  },
  section: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    color: colors.accent,
    marginBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 2,
  },
  summary: {
    fontSize: 9.5,
    color: colors.muted,
    lineHeight: 1.4,
  },
  experienceItem: {
    marginBottom: 7,
  },
  expHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  role: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
  },
  company: {
    fontSize: 9.5,
    color: colors.text,
  },
  dates: {
    fontSize: 8.5,
    color: colors.subtle,
  },
  expMeta: {
    fontSize: 8.5,
    color: colors.subtle,
    marginBottom: 2,
  },
  description: {
    fontSize: 9,
    color: colors.muted,
    marginBottom: 2,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 1,
  },
  bullet: {
    width: 8,
    fontSize: 9,
    color: colors.accent,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: colors.text,
  },
  techLine: {
    fontSize: 8.5,
    color: colors.subtle,
    marginTop: 2,
    fontFamily: "Helvetica-Oblique",
  },
  skillRow: {
    flexDirection: "row",
    marginBottom: 2,
  },
  skillCategory: {
    width: 110,
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
  },
  skillItems: {
    flex: 1,
    fontSize: 9,
    color: colors.muted,
  },
  eduLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  certItem: {
    fontSize: 9,
    color: colors.muted,
    marginBottom: 1,
  },
  // Nested text style — inherits color/size/lineHeight from the parent <Text>
  // so a bolded fragment in a bullet keeps the bullet's color and size.
  bold: {
    fontFamily: "Helvetica-Bold",
  },
});

function formatContact(personal: ResumeData["personal"]) {
  const items: { key: string; label: string; href?: string }[] = [];
  items.push({ key: "location", label: personal.location });
  items.push({
    key: "email",
    label: personal.email,
    href: `mailto:${personal.email}`,
  });
  if (personal.phone) items.push({ key: "phone", label: personal.phone });
  items.push({
    key: "linkedin",
    label: personal.linkedin.replace(/^https?:\/\//, ""),
    href: personal.linkedin,
  });
  if (personal.github) {
    items.push({
      key: "github",
      label: personal.github.replace(/^https?:\/\//, ""),
      href: personal.github,
    });
  }
  if (personal.website) {
    items.push({
      key: "website",
      label: personal.website.replace(/^https?:\/\//, ""),
      href: personal.website,
    });
  }
  return items;
}

// =============================================================================
// EMPHASIS — bold tech-stack words and quantitative metrics inside running text
// =============================================================================
// Two things get bolded automatically in the PDF body:
//   1. Tech-stack words (from experience.technologies, projects.technologies,
//      skills.items, plus a small set of common abbreviations that often
//      appear in achievements but not always in the structured tech lists).
//   2. Quantitative metrics — number + unit patterns (e.g. "100+ TB",
//      "500K logs/sec", "~30%", "10+ teams", "14 months") and a handful of
//      qualitative scale phrases ("multi-TB", "TB-scale").
//
// Bare numbers without a unit ("2020", "10") are intentionally NOT matched —
// otherwise year ranges and incidental digits would get noisy emphasis.

// Abbreviations that show up in achievement text but aren't always listed
// verbatim in the technologies arrays.
const EXTRA_EMPHASIS_WORDS = [
  "LLM",
  "RAG",
  "AI",
  "ML",
  "AI/ML",
  "API",
  "APIs",
  "NL-to-SQL",
  "BI",
  "DQ",
];

function buildEmphasisRegex(data: ResumeData): RegExp {
  const techWords = new Set<string>();
  for (const exp of data.experience) {
    for (const t of exp.technologies) techWords.add(t);
  }
  for (const proj of data.projects) {
    for (const t of proj.technologies) techWords.add(t);
  }
  for (const skill of data.skills) {
    for (const item of skill.items) techWords.add(item);
  }
  for (const w of EXTRA_EMPHASIS_WORDS) techWords.add(w);

  const escapedTech = [...techWords]
    // Drop anything with parentheses/slashes-with-spaces-around — those don't
    // appear verbatim in achievement text and would over-match weirdly.
    .filter((w) => w && w.length > 1 && /^[\w\s+/&.\-#]+$/.test(w))
    .sort((a, b) => b.length - a.length)
    .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  const techAlt =
    escapedTech.length > 0 ? `\\b(?:${escapedTech.join("|")})\\b` : null;

  // Metric pattern — number followed by a REQUIRED unit/noun. Plus a few
  // qualitative scale phrases.
  const metricAlt =
    "multi-(?:TB|GB|PB)|TB-scale|hours to seconds|" +
    // Number + unit. Trailing `\+?` after the unit catches "100 TB+" in
    // addition to "100+ TB".
    "(?:~|>|<)?\\$?\\d[\\d,]*(?:\\.\\d+)?\\+?\\s*" +
    "(?:" +
    "%|TB|GB|PB|MB|KB|TPS|QPS|[KMB]\\b|" +
    "months?|years?|days?|hours?|seconds?|minutes?|" +
    "teams?|users?|engineers?|stakeholders?|" +
    "datasets?|pipelines?|services?|designs?|checks?|sources?|modules?|" +
    "developer\\s+hours|application\\s+designs|logs?\\/sec" +
    ")\\+?";

  const combined = techAlt ? `${techAlt}|${metricAlt}` : metricAlt;
  return new RegExp(combined, "gi");
}

function emphasize(text: string, regex: RegExp): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  // Reset because we share the regex across calls.
  regex.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    nodes.push(
      <Text key={match.index} style={styles.bold}>
        {match[0]}
      </Text>
    );
    last = match.index + match[0].length;
    // Avoid infinite loop on zero-width matches.
    if (match[0].length === 0) regex.lastIndex++;
  }
  if (last < text.length) {
    nodes.push(text.slice(last));
  }
  return nodes;
}

export function ResumePdf({ data = baseResumeData }: { data?: ResumeData } = {}) {
  const { personal, experience, skills, education, certifications } = data;
  const emphasisRegex = buildEmphasisRegex(data);

  return (
    <Document
      title={`${personal.name} — Resume`}
      author={personal.name}
      subject="Resume"
    >
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{personal.name}</Text>
          <Text style={styles.title}>{personal.title}</Text>
          <View style={styles.contactRow}>
            {formatContact(personal).map((item, i, arr) => (
              <Text key={item.key} style={styles.contactItem}>
                {item.href ? (
                  <Link src={item.href} style={styles.link}>
                    {item.label}
                  </Link>
                ) : (
                  item.label
                )}
                {i < arr.length - 1 ? "  •" : ""}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.summary}>
            {emphasize(personal.summary, emphasisRegex)}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {experience.map((exp, idx) => (
            <View key={`${exp.company}-${idx}`} style={styles.experienceItem} wrap={false}>
              <View style={styles.expHeader}>
                <View>
                  <Text style={styles.role}>{exp.role}</Text>
                  <Text style={styles.company}>
                    {exp.company} — {exp.location}
                  </Text>
                </View>
                <Text style={styles.dates}>
                  {exp.startDate} – {exp.endDate}
                </Text>
              </View>
              <Text style={styles.description}>
                {emphasize(exp.description, emphasisRegex)}
              </Text>
              {exp.achievements.map((a, i) => (
                <View key={i} style={styles.bulletRow}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    {emphasize(a, emphasisRegex)}
                  </Text>
                </View>
              ))}
              {exp.technologies.length > 0 && (
                <Text style={styles.techLine}>
                  Tech: {exp.technologies.join(", ")}
                </Text>
              )}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          {skills.map((group) => (
            <View key={group.category} style={styles.skillRow}>
              <Text style={styles.skillCategory}>{group.category}</Text>
              <Text style={styles.skillItems}>{group.items.join(", ")}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {education.map((edu) => (
            <View key={edu.institution}>
              <View style={styles.eduLine}>
                <Text style={styles.role}>
                  {edu.degree}
                  {edu.field ? `, ${edu.field}` : ""}
                </Text>
                <Text style={styles.dates}>
                  {edu.startYear} – {edu.endYear}
                </Text>
              </View>
              <Text style={styles.company}>{edu.institution}</Text>
            </View>
          ))}
        </View>

        {certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {certifications.map((c) => (
              <Text key={c.name} style={styles.certItem}>
                • {c.name} — {c.issuer} ({c.year})
              </Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
