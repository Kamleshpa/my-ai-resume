// =============================================================================
// RESUME DATA — Kamlesh Pandey
// =============================================================================
// This single file powers both the visual resume sections AND the AI chatbot.
// =============================================================================

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone?: string;
  website?: string;
  linkedin: string;
  github?: string;
  tagline: string;
  summary: string;
  yearsOfExperience: number;
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear: number;
  gpa?: string;
  achievements?: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: number;
  url?: string;
}

export interface Project {
  name: string;
  description: string;
  url?: string;
  technologies: string[];
  highlights: string[];
}

export interface TargetRole {
  title: string;
  type: string;
  location: string;
  industries?: string[];
  pitch: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  experience: Experience[];
  skills: SkillCategory[];
  education: Education[];
  certifications: Certification[];
  projects: Project[];
  targetRole: TargetRole;
  suggestedQuestions: string[];
}

// =============================================================================
// RESUME DATA
// =============================================================================

export const resumeData: ResumeData = {
  personal: {
    name: "Kamlesh Pandey",
    title: "Lead/Principal Software Engineer",
    location: "Seattle, Washington, US",
    email: "kamlesh.world@gmail.com",
    linkedin: "https://www.linkedin.com/in/kamleshpa",
    github: "https://github.com/kamleshpa",
    tagline:
      "I architect scalable data and AI platforms, lead engineering teams at Fortune 500 companies, and turn complex data into intelligent, self-service experiences for the business.",
    summary:
      "Lead Software Engineer with 19+ years of experience specializing in data platforms, backend services, and automation at scale. Currently leading the data platform for U.S. Bank's spend management application. Previously built Nordstrom's automated data quality, data discovery, and data lineage solutions. I have deep expertise in designing systems that handle massive scale — from 100 TB+ logging platforms ingesting 500K logs/sec to streaming data quality architectures adopted across entire organizations. I thrive at the intersection of engineering leadership, system design, and hands-on building.",
    yearsOfExperience: 19,
  },

  experience: [
    {
      company: "U.S. Bank",
      role: "Lead Software Engineer (VP)",
      location: "Seattle, Washington",
      startDate: "Jul 2023",
      endDate: "Present",
      description:
        "Spearheading the development and management of the data platform for the bank's spend management application. Responsible for design, implementation, and optimization of scalable data solutions driving business intelligence and operational efficiency.",
      achievements: [
        "Architected and built the data platform from scratch, ensuring scalability, reliability, and high performance",
        "Designed and implemented ETL pipelines using Amazon Redshift and dbt to streamline data ingestion, transformation, and loading",
        "Managed and analyzed large datasets efficiently to drive business intelligence for the spend management application",
        "Collaborated closely with cross-functional teams to gather requirements and deliver impactful data solutions",
      ],
      technologies: [
        "Amazon Redshift",
        "dbt",
        "AWS",
        "ETL Pipelines",
        "Python",
        "SQL",
        "Data Modeling",
      ],
    },
    {
      company: "Nordstrom",
      role: "Lead Software Engineer",
      location: "Seattle, Washington",
      startDate: "Aug 2020",
      endDate: "Jul 2023",
      description:
        "Led engineering efforts on Nordstrom's Data Platform, designing and delivering critical data quality, data discovery, and data lineage solutions that were adopted across the organization.",
      achievements: [
        "Designed and implemented an automated Data Quality solution for Nordstrom's Analytical Platform — recognized as one of the fastest adoptions of a new technology at Nordstrom",
        "Built a streaming-based data quality platform where users could self-configure DQ checks, with monitoring and alerting as the single source of truth",
        "Designed and implemented a Data Discovery and Data Lineage solution using AWS Neptune DB (graph store), with APIs in Golang and jobs in Python",
        "Served on Nordstrom's Design Review Panel, reviewing 10+ application designs and providing architectural feedback",
        "Collaborated with a wide, cross-functional set of users to drive adoption of the data quality platform",
      ],
      technologies: [
        "Apache Flink",
        "Apache Spark",
        "Kafka",
        "AWS S3",
        "AWS Neptune DB",
        "Golang",
        "Python",
        "Streaming Architecture",
      ],
    },
    {
      company: "Nordstrom",
      role: "Senior Software Development Engineer",
      location: "Seattle, Washington",
      startDate: "Sep 2016",
      endDate: "Aug 2020",
      description:
        "Worked on Nordstrom's eCommerce data platform in an Agile environment, building infrastructure for big data processing, logging, and cluster management at scale.",
      achievements: [
        "Built a large-scale logging framework with Kafka and ELK stack handling 100+ TB of searchable data and ingesting 500K logs/sec",
        "Automated AWS EMR cluster provisioning for multiple teams, significantly reducing overall AWS costs for big data jobs",
        "Enabled multi-tenancy in AWS EMR, securing it with Apache Knox and Apache Ranger",
        "Optimized big data job performance and reduced infrastructure costs across teams",
      ],
      technologies: [
        "Kafka",
        "Elasticsearch",
        "Logstash",
        "Kibana",
        "AWS EMR",
        "Apache Knox",
        "Apache Ranger",
        "Apache Spark",
        "Java",
      ],
    },
    {
      company: "Divensi Inc (at Nordstrom)",
      role: "Software Consultant",
      location: "Seattle, Washington",
      startDate: "Jan 2015",
      endDate: "Sep 2016",
      description:
        "Worked as a consultant at Nordstrom, building automation frameworks for application testing with integrated dashboards and reporting.",
      achievements: [
        "Created an automation framework for application testing with code coverage and test result visualization in Kibana dashboards",
        "Built automated bug creation in Jira whenever tests failed, streamlining the QA-to-dev feedback loop",
        "Integrated test history tracking for trend analysis and quality improvement",
      ],
      technologies: [
        "Java",
        "Elasticsearch",
        "Kibana",
        "Jira",
        "Test Automation",
      ],
    },
    {
      company: "J.P. Morgan",
      role: "Senior Application Developer",
      location: "Mumbai, India",
      startDate: "Jun 2012",
      endDate: "Dec 2014",
      description:
        "Full-stack developer building components for a trading finance application, from frontend modules to database optimization and test infrastructure.",
      achievements: [
        "Built new modules for a trading finance application using JSP and Spring Framework",
        "Troubleshot and resolved performance problems in Oracle DB for critical trading systems",
        "Interacted directly with business owners to develop new functionality and translate requirements into technical solutions",
        "Created an integrated test framework with result dashboards and reporting for the team",
      ],
      technologies: [
        "Java",
        "JSP",
        "Spring Framework",
        "Oracle DB",
        "SQL",
        "Full-Stack Development",
      ],
    },
    {
      company: "Mastek Ltd",
      role: "Senior Java Developer",
      location: "Mumbai, India",
      startDate: "Oct 2006",
      endDate: "Mar 2012",
      description:
        "Started career at Mastek and grew from a fresher to a senior developer over 5+ years, working across multiple projects and an international onsite assignment.",
      achievements: [
        "Built new modules in Java Web Applications using JSP, EJB, and Oracle DB",
        "Created a code generation tool to automate repetitive module creation based on input configuration, dramatically improving team productivity",
        "Worked onsite in Seoul, South Korea for 14 months, supporting UAT and delivering quick bug fixes",
        "Progressed from fresher to senior developer through consistent delivery and technical growth",
      ],
      technologies: [
        "Java",
        "JSP",
        "EJB",
        "Oracle DB",
        "Web Applications",
      ],
    },
  ],

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
      category: "Languages",
      items: ["Java", "Python", "Golang", "SQL", "JavaScript"],
    },
    {
      category: "Backend & Frameworks",
      items: [
        "Spring Framework",
        "REST APIs",
        "Microservices",
        "Streaming Architecture",
        "Graph Databases",
      ],
    },
    {
      category: "Tools & Practices",
      items: [
        "Agile/Scrum",
        "System Design",
        "Design Reviews",
        "Test Automation",
        "CI/CD",
        "Technical Leadership",
      ],
    },
    {
      category: "Domains",
      items: [
        "Banking & FinTech",
        "eCommerce",
        "Business Intelligence",
        "Spend Management",
        "Trading Finance",
      ],
    },
  ],

  education: [
    {
      institution: "University of Mumbai",
      degree: "Bachelor of Engineering",
      field: "Engineering",
      startYear: 2002,
      endYear: 2006,
    },
  ],

  certifications: [
    {
      name: "OCEJWCD 5.0 (Oracle Certified Expert, Java Web Component Developer)",
      issuer: "Oracle",
      year: 2013,
    },
    {
      name: "OCPJP 1.5 (Oracle Certified Professional, Java Programmer)",
      issuer: "Oracle",
      year: 2009,
    },
  ],

  projects: [
    {
      name: "Agentic Spend Intelligence Assistant (U.S. Bank)",
      description:
        "An agentic AI system for business spend management that lets finance and operations users investigate spend through natural conversation — grounded in the bank's own spend data and policy context, not generic LLM knowledge. The system orchestrates multiple specialized agents (planner, SQL, RAG/context, visualization) that collaborate to answer complex spend questions like \"why did marketing's Q3 spend spike?\" or \"which vendors are trending over budget across business units?\" — returning answers with traceable evidence and charts. Direct evolution of the Conversational AI Analytics Dashboard prototype I built at U.S. Bank, moving from single-shot NL-to-SQL into a true multi-agent workflow.",
      technologies: [
        "LLMs (Anthropic Claude / OpenAI)",
        "Agentic Frameworks",
        "Multi-Agent Orchestration",
        "RAG Pipelines",
        "Vector Databases",
        "Amazon Redshift",
        "Python",
        "AWS",
      ],
      highlights: [
        "Multi-agent architecture: a planner agent decomposes the business question, a SQL agent generates and runs optimized queries against the spend warehouse on Amazon Redshift, a RAG/context agent retrieves vendor metadata and spend-category definitions, and a visualization agent picks the right chart for the result",
        "RAG pipeline over internal spend context — vendor metadata, spend-category taxonomy, and policy documents — so answers are grounded in the bank's own domain language instead of generic LLM knowledge",
        "Tool integration: SQL execution against Redshift, chart rendering, and policy lookup are exposed as agent-callable tools with strict input/output contracts and auditable traces",
        "Designed for non-technical business users — they ask plain-English questions and get accurate, citation-backed answers with the underlying SQL and source documents available on demand for trust and auditability",
        "Applies the AI/LLM stack — agentic orchestration, tool use, RAG — to a regulated FinTech domain where accuracy, traceability, and not-hallucinating are non-negotiable",
      ],
    },
    {
      name: "Award winning Conversational AI Analytics Dashboard (Hackathon)",
      description:
        "Built an AI-powered analytics dashboard at a hackathon that lets users explore their data through natural conversation — no SQL or BI tooling required. Users ask questions in plain language, the system generates the underlying queries and renders charts and graphs on the fly, and users can pin any visualization to a personal dashboard.",
      technologies: [
        "LLM / Natural Language to SQL",
        "Python",
        "Data Visualization",
        "React",
        "Conversational AI",
      ],
      highlights: [
        "Natural-language interface that turns plain-English questions into queries and live charts — eliminating the need for SQL expertise or dedicated BI tools",
        "Auto-generates graphs and visualizations from query results, which users can pin to build their own dashboards",
        "Democratizes self-service analytics for non-technical users, extending the self-service philosophy from my data quality platform work to the BI/visualization layer",
        "Won the hackathon for its innovative approach to making data analytics accessible to everyone",
        "This concept was applied to a real-world use case at U.S. Bank, where I built a prototype of this conversational analytics dashboard for the spend management application, enabling business users to explore their spend data through natural conversation and visualizations without needing SQL or BI tools",
      ],
    },
    {
      name: "Streaming Data Quality Platform",
      description:
        "Designed and built Nordstrom's enterprise-wide streaming-based data quality platform — a self-service system where users can configure DQ checks with monitoring and alerting.",
      technologies: [
        "Apache Flink",
        "Apache Spark",
        "Kafka",
        "AWS S3",
        "Streaming Architecture",
      ],
      highlights: [
        "Became the single source of truth for data quality at Nordstrom",
        "One of the fastest technology adoptions in Nordstrom's history",
        "Self-service model: users could configure DQ checks without engineering involvement",
      ],
    },
    {
      name: "Data Discovery & Lineage Solution",
      description:
        "Built a graph-based data discovery and lineage tracking system to help teams understand data flows and dependencies across Nordstrom's analytical platform.",
      technologies: ["AWS Neptune DB", "Golang", "Python", "Graph Store"],
      highlights: [
        "Enabled teams to trace data flow and lineage across the entire platform",
        "APIs built in Golang for high-performance graph queries",
        "Jobs in Python for lineage extraction and graph population",
      ],
    },
    {
      name: "Large-Scale Logging Platform",
      description:
        "Built Nordstrom's centralized logging platform handling massive data volumes for search, monitoring, and analysis.",
      technologies: [
        "Kafka",
        "Elasticsearch",
        "Logstash",
        "Kibana",
        "AWS",
      ],
      highlights: [
        "100+ TB of searchable log data",
        "Ingesting 500K+ logs per second",
        "Served as the centralized logging solution across Nordstrom",
      ],
    },
  ],

  targetRole: {
    title: "Staff/Principal Engineer or Engineering Manager",
    type: "Full-time",
    location: "Remote or Hybrid (Seattle / Bothell area)",
    industries: ["FinTech", "Data Platforms", "eCommerce", "Enterprise SaaS"],
    pitch:
      "I bring 19+ years of hands-on engineering experience with a proven track record of building data platforms from scratch at Fortune 500 companies. I combine deep technical expertise in data engineering and distributed systems with strong leadership skills — from mentoring engineers to reviewing system designs across organizations. I'm looking for a role where I can drive technical strategy, build high-impact data systems, and lead teams to deliver at scale.",
  },

  suggestedQuestions: [
    "Walk me through your career journey",
    "Tell me about the data quality platform you built at Nordstrom",
    "What's your experience with data platforms and big data?",
    "What technologies do you specialize in?",
    "What kind of role are you looking for next?",
    "How do you approach leading engineering teams?",
  ],
};
