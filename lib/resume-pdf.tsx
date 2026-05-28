import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Font,
} from "@react-pdf/renderer";
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

export function ResumePdf({ data = baseResumeData }: { data?: ResumeData } = {}) {
  const { personal, experience, skills, education, certifications } = data;

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
          <Text style={styles.summary}>{personal.summary}</Text>
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
              <Text style={styles.description}>{exp.description}</Text>
              {exp.achievements.map((a, i) => (
                <View key={i} style={styles.bulletRow}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>{a}</Text>
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
