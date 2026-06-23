// ============================================================================
//  All site content lives here. Edit this file to update the portfolio.
// ============================================================================

const _profile = {
  name: "Suyash Kulkarni",
  // Identity / headline shown in the hero
  title: "AI Engineer & Product Manager",
  // Rotating words under the name
  roles: [
    "AI Engineer",
    "Product Manager",
    "GenAI Builder",
    "LLM & RAG Systems",
    "Agentic AI",
  ],
  location: "Pune, India",
  email: "kulkarnisuyash999@gmail.com",
  summary:
    "Technically fluent AI Engineer and Product Manager who builds and ships Generative AI and ML-powered products end to end. I bridge business strategy and engineering — defining GenAI roadmaps, turning complex problems into LLM/RAG and agentic solutions, and driving measurable outcomes alongside ML, data, and engineering teams.",
  // NOTE: phone number intentionally not shown on the site.
  socials: {
    linkedin: "https://www.linkedin.com/in/suyash-kulkarni-yes777/",
    github: "https://github.com/Gitforsuyash",
    huggingface: "https://huggingface.co/HugFace4Suyash",
  },
};

const _stats = [
  { value: "3+", label: "AI products shipped" },
  { value: "10+", label: "LLM / RAG systems" },
  { value: "4", label: "Professional roles" },
  { value: "5+", label: "Certifications" },
];

export type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  summary: string;
  points: string[];
  tags: string[];
};

const _experience: Experience[] = [
  {
    role: "AI Engineer",
    company: "SAS-AI",
    location: "Pune, India",
    period: "Oct 2025 – Present",
    current: true,
    summary:
      "Product owner and engineer for the Hit-to-Lead pipeline on an AI-driven drug discovery and clinical trials platform.",
    points: [
      "Product owner of the Hit-to-Lead pipeline — drove the product end to end: from data collection and feature engineering, to model building, experiment tracking with MLflow, and from API design through implementation.",
      "Built drug-target efficacy and molecular-property models with deep-learning graph architectures — AttentiveFP, ChemBERTa, GIN, GCN, and GNNs in PyTorch — alongside Random Forest and Decision Tree baselines.",
      "Own the GenAI product roadmap for an agentic AI preclinical platform — identified high-impact use cases including toxicology screening, hit identification, and literature mining to reduce failure rates in early-stage drug discovery.",
      "Led RAG architecture for a Literature AI Agent — defined requirements, scoped the vector database (FAISS/Pinecone), and drove API integration with open research sources for real-time retrieval.",
      "Defined and tracked key metrics: model quality (accuracy, F1), latency, data-pipeline cost, and adoption KPIs; presented data-visualization dashboards to leadership.",
      "Drove A/B experimentation and prompt optimization for a Gemini API-backed Clinical Trial Retention Agent — balancing model performance, UX, and API cost.",
    ],
    tags: [
      "Product Owner",
      "Hit-to-Lead",
      "AttentiveFP",
      "ChemBERTa",
      "GIN / GCN / GNN",
      "Deep Learning",
      "PyTorch",
      "MLflow",
      "Agentic AI",
      "RAG",
    ],
  },
  {
    role: "Student Intern",
    company: "Java by Kiran",
    location: "Pune, India",
    period: "Feb 2025 – Aug 2025",
    summary:
      "Shipped AI-powered tools including a RAG chatbot and an intelligent job-search agent.",
    points: [
      "Designed and delivered a RAG PDF chatbot — defined product scope and selected the embedding stack (Hugging Face + Sentence Transformers + LangChain + FAISS) across iterative testing cycles.",
      "Owned end-to-end execution for an AI job-matching agent automating search and ranking with ML algorithms; identified adoption blockers and drove prompt optimization for accuracy.",
      "Collaborated with engineering on an Automated Data Cleaner, defining feature-engineering requirements and preprocessing pipelines aligned to quality goals.",
    ],
    tags: ["RAG", "LangChain", "Hugging Face", "Embeddings", "Prompt Engineering"],
  },
  {
    role: "Python Intern",
    company: "EI Systems",
    location: "Remote, India",
    period: "2024",
    summary:
      "Contributed to software delivery with version control and agile development practices.",
    points: [
      "Built features using Git/GitHub and industry-standard agile development methodologies.",
    ],
    tags: ["Python", "Git / GitHub", "Agile"],
  },
];

export type Project = {
  title: string;
  blurb: string;
  tags: string[];
  link?: string;
  linkLabel?: string;
};

const _projects: Project[] = [
  {
    title: "Brief AI",
    blurb:
      "A personal GenAI app deployed on Hugging Face Spaces — turns long content into clear, concise briefs using LLMs and a prompt-engineered summarization pipeline.",
    tags: ["GenAI", "LLM", "Hugging Face", "Summarization"],
    link: "https://huggingface.co/HugFace4Suyash",
    linkLabel: "Hugging Face",
  },
  {
    title: "Drug–Target Efficacy Predictor",
    blurb:
      "Deep-learning graph models — AttentiveFP, ChemBERTa, GIN, GCN, and GNNs in PyTorch Geometric (with Random Forest / Decision Tree baselines) — predicting drug-target efficacy to cut early-stage discovery failure rates.",
    tags: ["AttentiveFP", "ChemBERTa", "GIN / GCN / GNN", "PyTorch Geometric", "Deep Learning"],
  },
  {
    title: "Self-Driving Car Simulation",
    blurb:
      "An autonomous-driving simulation with lane following and real-time red-light detection — built on ROS 2 (Humble) with a Webots physics simulator, computer vision (OpenCV), and deep learning (PyTorch + YOLOv8) trained from manual-driving data.",
    tags: ["ROS 2", "Webots", "OpenCV", "Computer Vision", "PyTorch", "YOLOv8"],
    link: "https://huggingface.co/HugFace4Suyash",
    linkLabel: "Hugging Face",
  },
  {
    title: "Literature AI Agent (RAG)",
    blurb:
      "An agentic research assistant that retrieves and synthesizes scientific literature in real time using a FAISS/Pinecone vector store and open research APIs.",
    tags: ["RAG", "Agentic AI", "Vector DB", "LangChain"],
  },
  {
    title: "RAG PDF Chatbot",
    blurb:
      "Chat over any PDF: an embedding pipeline built with Hugging Face, Sentence Transformers, LangChain, and FAISS for accurate, grounded answers.",
    tags: ["RAG", "Embeddings", "Hugging Face", "FAISS"],
  },
  {
    title: "AI Job-Matching Agent",
    blurb:
      "An intelligent job-search agent that automates discovery and ranking with ML algorithms and prompt-optimized relevance scoring.",
    tags: ["Agentic AI", "ML", "Prompt Engineering"],
  },
  {
    title: "Clinical Trial Retention Agent",
    blurb:
      "A Gemini API-backed conversational agent improving trial retention, tuned through A/B experimentation across performance, UX, and cost.",
    tags: ["Conversational AI", "Gemini API", "A/B Testing"],
  },
  {
    title: "Automated Data Cleaner",
    blurb:
      "A preprocessing toolkit defining feature-engineering requirements and pipelines to lift downstream model quality.",
    tags: ["Data Engineering", "Feature Engineering", "Python"],
  },
];

// ---- Product Management coursework (done end-to-end, solo) -------------------
const _productManagement = {
  title: "Product Management in Generative AI & Agentic AI",
  provider: "BITSoM / Masai Platform",
  status: "In Progress",
  intro:
    "A hands-on Product Management program where I drove the complete product lifecycle myself — from market research all the way to launch strategy — for a Generative AI product.",
  phases: [
    {
      label: "Market Research",
      detail:
        "Sized the market, mapped user segments, and ran competitive & gap analysis to validate the GenAI opportunity.",
    },
    {
      label: "Discovery & User Insights",
      detail:
        "Conducted user interviews and synthesized pain points into jobs-to-be-done and clear problem statements.",
    },
    {
      label: "PRD & Requirements",
      detail:
        "Authored the Product Requirements Document — scope, user stories, success metrics, and edge cases for an LLM/agentic feature set.",
    },
    {
      label: "Roadmap & Prioritization",
      detail:
        "Built the roadmap and prioritized with RICE, balancing impact, effort, and model/API cost trade-offs.",
    },
    {
      label: "Prototype & Iteration",
      detail:
        "Designed flows and a working prototype, then iterated through testing cycles and prompt/model evaluation.",
    },
    {
      label: "Metrics & GTM",
      detail:
        "Defined KPIs (quality, latency, adoption, cost) and crafted the go-to-market and launch strategy.",
    },
  ],
  takeaways: [
    "Owned every stage solo — no hand-offs",
    "Research-driven, metric-backed decisions",
    "Built for real GenAI / agentic constraints",
  ],
  // Core Product Manager competencies (resume)
  competencies: [
    {
      title: "GenAI Product Strategy",
      points: [
        "Roadmap ownership & prioritization",
        "Use-case identification for LLM/RAG systems",
        "AI product lifecycle management",
        "Prompt engineering & model evaluation",
      ],
    },
    {
      title: "Technical Fluency",
      points: [
        "LLMs, embeddings, RAG & agentic frameworks",
        "Anthropic, Hugging Face & open-source LLM APIs",
        "Vector databases (FAISS, Pinecone)",
        "API design & MLflow experiment tracking",
      ],
    },
    {
      title: "Metrics & Analytics",
      points: [
        "Quality, latency, cost & adoption KPIs",
        "Model performance tracking (F1, accuracy)",
        "Data visualization for stakeholders",
        "Cost–performance trade-off analysis",
      ],
    },
    {
      title: "Cross-Functional Leadership",
      points: [
        "ML/engineering collaboration & sprint planning",
        "Stakeholder management & alignment",
        "Translating research → product requirements",
        "Agile, iterative product delivery",
      ],
    },
  ],
};

const _skills: { group: string; items: string[] }[] = [
  {
    group: "AI / LLMs",
    items: [
      "LLMs",
      "Prompt Engineering",
      "RAG",
      "Embeddings",
      "Agentic AI",
      "Transformers",
      "NLP",
      "Computer Vision",
      "GenAI",
    ],
  },
  {
    group: "Graph & Molecular ML",
    items: [
      "AttentiveFP",
      "ChemBERTa",
      "GIN",
      "GCN",
      "GNN",
      "PyTorch Geometric",
      "Deep Learning",
      "MLflow",
      "Feature Engineering",
    ],
  },
  {
    group: "Frameworks & MLOps",
    items: [
      "LangChain",
      "Hugging Face",
      "PyTorch",
      "TensorFlow",
      "OpenCV",
      "API Design",
      "MLflow",
      "ROS 2",
    ],
  },
  {
    group: "Vector DBs",
    items: ["FAISS", "Pinecone", "Semantic Search", "Retrieval Systems"],
  },
  {
    group: "Languages",
    items: ["Python", "SQL", "HTML", "CSS"],
  },
  {
    group: "Product Management",
    items: [
      "Product Strategy",
      "Roadmapping",
      "Prioritization (RICE)",
      "PRD & User Stories",
      "Market Research",
      "Competitive Analysis",
      "User Research",
      "Jobs-to-be-Done",
      "MVP Scoping",
      "Go-to-Market (GTM)",
      "A/B Testing",
      "KPI Tracking",
      "OKRs",
      "Product Lifecycle",
      "Stakeholder Mgmt",
      "Backlog Grooming",
      "Sprint Planning",
      "Data Visualization",
    ],
  },
  {
    group: "Tools",
    items: ["Google AI Studio", "Jupyter", "VS Code", "Lovable", "Git", "GitHub"],
  },
];

const _certifications = [
  {
    name: "Product Management in Generative AI and Agentic AI",
    issuer: "BITSoM / Masai Platform",
    note: "In Progress",
  },
  {
    name: "Oracle Cloud Infrastructure (OCI) Data Science Professional 2025",
    issuer: "Oracle · 1Z0-1110-25",
  },
  {
    name: "AI Engineering Essentials: Navigating the Tech Revolution",
    issuer: "LinkedIn Learning",
  },
  {
    name: "Machine Learning and Data Science",
    issuer: "LinkedIn Learning",
  },
];

const _education = {
  degree: "Bachelor of Engineering",
  school: "Marathwada Institute of Technology, Pune",
  period: "Dec 2021 – Sept 2025",
  coursework: [
    "Data Structures & Algorithms",
    "Artificial Intelligence",
    "Design & Analysis of Algorithms",
    "Electrical Engineering",
  ],
};

// ============================================================================
//  Editable content store
//  Defaults above can be overridden at runtime via the /admin editor, which
//  saves an override object to localStorage. Components import the named
//  exports below and automatically pick up any saved edits on load.
// ============================================================================

const _defaults = {
  profile: _profile,
  stats: _stats,
  experience: _experience,
  projects: _projects,
  productManagement: _productManagement,
  skills: _skills,
  certifications: _certifications,
  education: _education,
};

export type SiteContent = typeof _defaults;
export const STORAGE_KEY = "siteContent";
export const defaultContent: SiteContent = _defaults;

function loadContent(): SiteContent {
  if (typeof window !== "undefined") {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) return { ..._defaults, ...JSON.parse(raw) };
    } catch {
      /* fall back to defaults on any parse error */
    }
  }
  return _defaults;
}

const _content = loadContent();

export const profile = _content.profile;
export const stats = _content.stats;
export const experience = _content.experience;
export const projects = _content.projects;
export const productManagement = _content.productManagement;
export const skills = _content.skills;
export const certifications = _content.certifications;
export const education = _content.education;
