// Variant: Amazon — Senior Data Engineer, AWS Specialist and Partner Organization
// Job ID: 10397978
//
// Targeting angle: the JD wants someone deep in the AWS data stack (Redshift,
// S3, EMR, Glue, Kinesis, Firehose, Lambda), with big-data chops (Spark/Hive/
// Hadoop), technical leadership, AND emerging interest in LLMs/RAG/agentic
// systems. Kamlesh's base resume is a strong direct match on the AWS data
// stack and leadership; the LLM/RAG angle is touched honestly via the
// Conversational AI hackathon + U.S. Bank prototype (no agentic-framework
// claims invented — that's left for the chat to discuss naturally).

import type { ResumeVariant } from "./types";

export const amazon: ResumeVariant = {
  slug: "amazon",
  label: "Amazon — Senior Data Engineer, AWS Specialist & Partner Organization",
  createdAt: "2026-05-21",
  note: "AWS-heavy data engineering role with AI/ML + RAG bonus angle. Lean into Nordstrom EMR/streaming work, U.S. Bank Redshift/dbt platform, the Agentic Spend Intelligence Assistant (multi-agent + RAG), and the Conversational AI hackathon for the LLM angle.",
  jobDescription: `Senior Data Engineer, AWS Specialist and Partner Organization (Job ID: 10397978)

The ASP Data Engineering Team supports the data needs of the AWS Specialist and Partner Organization, a worldwide team of specialists and partners helping customers transform their businesses through AWS's Core, GenAI, and Partner services and solutions.

Key responsibilities: Expert in SQL, ETL (and general data wrangling), with experience leveraging cloud-based data services such as AWS EMR, Glue, Firehose, Lambda. Hands-on experience with AI/ML technologies, including large language models (LLMs), and a strong understanding of designing and building Agentic Frameworks — including autonomous agents, multi-agent orchestration, tool integration, and retrieval-augmented generation (RAG) pipelines.

Basic Qualifications:
- 5+ years of data engineering experience
- Data modeling, warehousing and building ETL pipelines
- Modern scripting/programming language (Python, Java, Scala, NodeJS)
- AWS: Redshift, S3, Glue, EMR, Kinesis, FireHose, Lambda, IAM
- Complex, highly-optimized SQL across large datasets

Preferred:
- Big data: Hadoop, Hive, Spark, EMR
- Operating large data warehouses
- Cross-functional delivery
- Technical leadership / mentoring
- AI/ML, Agentic Frameworks, autonomous agents, multi-agent orchestration, tool integration, RAG pipelines
- Driving technical vision and roadmap for data platforms and infrastructure`,

  overrides: {
    personal: {
      title: "Lead Data Engineer",
      tagline:
        "I architect AWS-native data platforms at Fortune 500 scale, lead the engineering teams that build them, and bring LLM-powered analytics into the products business users actually use.",
      summary:
        "Lead Software Engineer with 19+ years of hands-on data engineering experience, deep in the AWS data stack — Redshift, S3, EMR, Neptune, Glue/dbt pipelines, Kafka streaming. Currently leading U.S. Bank's spend-management data platform on Amazon Redshift + dbt, where I'm also building an Agentic Spend Intelligence Assistant — a multi-agent LLM system with RAG over spend context that lets business users investigate enterprise spend through natural conversation, with traceable evidence and charts. Previously built Nordstrom's enterprise-wide streaming data quality platform (Flink/Spark/Kafka on AWS), automated multi-tenant EMR provisioning secured with Apache Knox and Ranger, and a 100 TB+ logging platform on the ELK stack ingesting 500K logs/sec. I bring strong technical leadership — design review panel work, mentoring, cross-functional delivery — and direct hands-on experience applying agentic frameworks, multi-agent orchestration, tool integration, and RAG pipelines to regulated financial data. I'm passionate about huge datasets, AI-driven approaches to unlocking insights, and driving the technical vision for data platforms.",
    },

    // Reordered to surface AWS data stack + big-data + leadership first,
    // matching the JD's basic and preferred qualifications. Items within
    // each category are reordered too (Python/SQL first; Spark/EMR-relevant
    // tools first; etc.). No invented items.
    skills: [
      {
        category: "Cloud & Infrastructure",
        items: [
          "AWS (Redshift, S3, EMR, Neptune DB)",
          "Apache Knox",
          "Apache Ranger",
          "Cluster Management",
          "ELK Stack",
        ],
      },
      {
        category: "Data Platforms",
        items: [
          "Apache Spark",
          "Apache Flink",
          "Kafka",
          "ETL Pipelines",
          "dbt",
          "Data Quality",
          "Data Lineage",
          "Data Discovery",
        ],
      },
      {
        category: "Languages",
        items: ["Python", "SQL", "Java", "Golang", "JavaScript"],
      },
      {
        category: "Tools & Practices",
        items: [
          "System Design",
          "Technical Leadership",
          "Design Reviews",
          "CI/CD",
          "Agile/Scrum",
          "Test Automation",
        ],
      },
      {
        category: "Backend & Frameworks",
        items: [
          "Streaming Architecture",
          "Microservices",
          "REST APIs",
          "Graph Databases",
          "Spring Framework",
        ],
      },
      {
        category: "Domains",
        items: [
          "Business Intelligence",
          "Banking & FinTech",
          "eCommerce",
          "Spend Management",
          "Trading Finance",
        ],
      },
    ],

    targetRole: {
      title: "Senior Data Engineer, AWS Specialist & Partner Organization",
      pitch:
        "I bring 19+ years of hands-on data engineering — much of it deep in the AWS data stack: Amazon Redshift + dbt powering U.S. Bank's spend management platform today, multi-tenant EMR automation and Apache Spark/Flink streaming at Nordstrom yesterday, and graph-based data discovery on AWS Neptune for org-wide lineage. I pair that with strong technical leadership (Lead/Principal/VP roles, design review panels, mentoring) and direct, applied work on agentic AI: I'm building an Agentic Spend Intelligence Assistant at U.S. Bank — a multi-agent LLM system (planner, SQL, RAG/context, visualization agents) with a RAG pipeline over spend context, tool integration, and traceable evidence — that lets business users investigate enterprise spend through natural conversation. That blend of AWS-native data engineering, leadership, and applied agentic/RAG work on regulated financial data is exactly what I'd bring to the ASP Data Engineering team.",
    },
  },
};
