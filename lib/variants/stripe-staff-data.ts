// Example variant — feel free to delete once you have real ones.
// Demonstrates the two override knobs: reordered skills + tailored targetRole.

import type { ResumeVariant } from "./types";

export const stripeStaffData: ResumeVariant = {
  slug: "stripe-staff-data",
  label: "Stripe — Staff Data Engineer (example)",
  createdAt: "2026-05-21",
  note: "Placeholder example showing the variant shape. Replace with a real JD-targeted variant.",

  overrides: {
    // Mirror the JD's framing without inventing new claims.
    personal: {
      tagline:
        "I architect scalable data and AI platforms in financial services, lead the engineering teams that build them, and turn complex payments-scale data into self-service experiences for the business.",
      summary:
        "Lead Software Engineer with 19+ years building data platforms at Fortune 500 scale, with deep experience in financial services (U.S. Bank, J.P. Morgan) and eCommerce (Nordstrom). Currently leading the data platform for U.S. Bank's spend management application; previously built Nordstrom's enterprise-wide streaming data quality and data lineage solutions. I've shipped systems handling 100 TB+ logging at 500K logs/sec and streaming data-quality architectures adopted org-wide — the kind of distributed-data work that maps directly to a Staff Data Engineer role at Stripe.",
    },

    // Reordered to surface FinTech + data-platform stack first; "Domains" promoted.
    skills: [
      {
        category: "Data Platforms",
        items: [
          "Apache Spark",
          "Apache Flink",
          "Kafka",
          "dbt",
          "ETL Pipelines",
          "Data Quality",
          "Data Lineage",
          "Data Discovery",
        ],
      },
      {
        category: "Cloud & Infrastructure",
        items: [
          "AWS (Redshift, S3, EMR, Neptune DB)",
          "ELK Stack",
          "Apache Knox",
          "Apache Ranger",
          "Cluster Management",
        ],
      },
      {
        category: "Domains",
        items: [
          "Banking & FinTech",
          "Business Intelligence",
          "Spend Management",
          "Trading Finance",
          "eCommerce",
        ],
      },
      {
        category: "Languages",
        items: ["Python", "SQL", "Java", "Golang", "JavaScript"],
      },
      {
        category: "Backend & Frameworks",
        items: [
          "Streaming Architecture",
          "REST APIs",
          "Microservices",
          "Spring Framework",
          "Graph Databases",
        ],
      },
      {
        category: "Tools & Practices",
        items: [
          "System Design",
          "Technical Leadership",
          "Design Reviews",
          "Agile/Scrum",
          "Test Automation",
          "CI/CD",
        ],
      },
    ],

    targetRole: {
      title: "Staff Data Engineer",
      pitch:
        "I bring 19+ years of hands-on data-platform experience in financial services and large-scale eCommerce — from a streaming data-quality platform adopted enterprise-wide at Nordstrom to the data platform powering U.S. Bank's spend management application today. I combine deep technical fluency in distributed data systems with the leadership chops to drive cross-team architectural decisions, which is the blend I'd bring to a Staff Data Engineer role at Stripe.",
    },
  },
};
