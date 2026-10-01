/**
 * All copy on the site, sourced from the industry résumé (public/resume.pdf) and the academic CV.
 * Edit here; components only render it.
 */

export const profile = {
  name: "Syed Taha",
  role: "AI engineer & researcher",
  email: "syedmuhammadtaha.dev@gmail.com",
  timeZone: "Asia/Karachi",
  resume: "/resume.pdf",
  heroBlurb:
    "AI engineer & researcher. Shipping agentic systems at Brainbox; studying efficient, certified models at NUST.",
  heroTag: ["Agents that know", "when to stop ↘"],
  status: "Open to graduate research positions and AI engineering roles.",
};

export const links = {
  github: "https://github.com/Syed-MuhammadTaha",
  linkedin: "https://www.linkedin.com/in/syed-muhammad-taha-imam/",
  medium: "https://medium.com/@tahaML",
};

export const tapeWords = ["AI Engineer", "Shipping agents", "Researcher", "Efficient models", "When to stop", "Karachi"];

export const statement = {
  aside:
    "I work with teams who need AI that holds up in production — and with labs asking how little compute a model really needs.",
  // Words wrapped in *asterisks* render dimmed.
  text: "Building agents that are as *efficient* as they are *capable.*",
};

export type Role = {
  org: string;
  /** Second word(s) set in italic serif on the detail card. */
  orgItalic?: string;
  role: string;
  when: string;
  points: string[];
  tags: string[];
};

export const industry: Role[] = [
  {
    org: "Brainbox",
    orgItalic: "Automations",
    role: "AI Engineer",
    when: "Dec 2025 — Now",
    points: [
      "Safety-guardrailed AI coaching backend on GCP Cloud Run serving 300+ minor and adult athletes; content moderation for multi-audience use.",
      "SQL-aware agents over 50+ Supabase tables, halving response time.",
      "Chat + VAPI voice AI for Earlibird (AU): 200+ daily interactions, 5,000+ calls, 80% resolved without a human.",
    ],
    tags: ["GCP", "FastAPI", "Vertex AI", "Agents", "VAPI"],
  },
  {
    org: "Epistemy",
    orgItalic: "UK",
    role: "Software Engineer (AI) & Team Lead",
    when: "Sep — Dec 2025",
    points: [
      "Built an AI tutoring platform end to end: Nest.js backend (20+ endpoints), Next.js frontend.",
      "Event-driven Redis/BullMQ queue orchestrating multi-agent workflows with fault tolerance.",
      "90%+ unit-test coverage with CI and pre-commit hooks; led a team of two.",
    ],
    tags: ["Nest.js", "Next.js", "BullMQ", "Multi-agent"],
  },
  {
    org: "CogniMind",
    orgItalic: "AI",
    role: "Machine Learning Intern",
    when: "Feb — Apr 2025",
    points: [
      "VLM extraction accuracy +20% via prompt engineering; retrieval/inference +10% via quantization and HNSW.",
      "Dockerized Airflow with 5+ DAGs (−60% manual work); CI/CD cut deploy time by 30%.",
    ],
    tags: ["VLMs", "Airflow", "Quantization", "HNSW"],
  },
  {
    org: "RapidsAI",
    role: "Machine Learning Intern",
    when: "Sep — Dec 2024",
    points: [
      "RAG chatbot (Streamlit, FastAPI) with contextual sessions.",
      "Complexity-based multi-model query router halved OpenAI API costs.",
    ],
    tags: ["RAG", "FastAPI", "Routing"],
  },
];

export const research: Role[] = [
  {
    org: "IPT Lab,",
    orgItalic: "NUST",
    role: "Researcher",
    when: "Jun 2026 — Now",
    points: [
      "Two sole-author studies on redundancy and efficient inference in foundation models.",
      "Similarity (CKA, Procrustes) vs removable blocks, against untrained-network controls: ρ ≥ 0.88 with the untrained ranking.",
      "Certified early exit with learn-then-test: 14–39% compute saved, error ≤ α at 95% confidence.",
    ],
    tags: ["Early exit", "Conformal", "LoRA", "CKA"],
  },
  {
    org: "Bradbury",
    orgItalic: "Lab",
    role: "Research Intern · remote",
    when: "Apr 2025 — Jan 2026",
    points: [
      "Proposed a training-free layer-merging method based on Tucker decomposition.",
      "Analysed self-attention to test aligning Query and Key projections in efficient-by-design architectures.",
    ],
    tags: ["Weight sharing", "Tucker", "Attention"],
  },
  {
    org: "MachVis",
    orgItalic: "Lab",
    role: "Undergraduate Research Intern",
    when: "Oct — Dec 2025",
    points: [
      "LLM-based factual verification of generated pathology reports, beyond BLEU/ROUGE.",
      "Curated a challenge set of 100+ gigapixel whole-slide images with real artifacts and stain variation.",
    ],
    tags: ["LLM eval", "Pathology", "WSI"],
  },
  {
    org: "NUST",
    orgItalic: "· remote",
    role: "Undergraduate Research Intern",
    when: "Jun — Sep 2025",
    points: ["MedSAM + meta-learning for few-shot dental radiograph segmentation; +12% on scarce disease classes."],
    tags: ["MedSAM", "Meta-learning", "Few-shot"],
  },
];

export const researchIntro =
  "Measuring structural redundancy against proper controls, compressing models, and attaching statistical guarantees to compression decisions. Next: agents built from small models that know when another step is worth it.";

export type Field = "cka" | "exit" | "distil" | "agent";

export const tiles: { field: Field; title: string; note: string; label: string }[] = [
  {
    field: "cka",
    title: "Similarity ≠ importance",
    note: "Blocks of similar layers look removable. Similarity predicts which ones no better than an untrained network.",
    label: "Dot-matrix layer-similarity matrix with blocks of similar layers along the diagonal",
  },
  {
    field: "exit",
    title: "Certified early exit",
    note: "Each band is an input through the layers; it stops where it is confident enough. Error ≤ α at 95% confidence.",
    label: "Dot-matrix of inputs passing through a layer stack, each band fading out where it exits",
  },
  {
    field: "distil",
    title: "Distillation · LiteDoc",
    note: "A large teacher distilled through a narrow channel into a small task-specific student.",
    label: "Dot-matrix of a large teacher model distilled into a small student",
  },
  {
    field: "agent",
    title: "Agents under budget",
    note: "Next: a reasoning tree that prunes itself, stopping when one more step isn’t worth it.",
    label: "Dot-matrix reasoning tree with branches pruned as it deepens",
  },
];

export const metrics = [
  { value: "14–39%", label: "Encoder compute saved by certified early exit" },
  { value: "≥0.88", label: "Spearman’s rho: similarity-based removal order vs an untrained network’s" },
  { value: "7.3%", label: "Of encoder weights trained, via LoRA" },
];

export const papers = [
  {
    id: "C1",
    title: "LiteDoc: Distilling Large Document Models into Efficient Task-Specific Encoders",
    authors: ["Raza", "Imam", "Ulges", "Schwanecke", "Moetesum", "Shafait"],
    venue: "ICDAR 2026, Springer LNCS",
    href: "https://doi.org/10.1007/978-3-032-36033-5_25",
  },
  {
    id: "M1",
    title: "Similarity Is Not Importance: On Measuring Representational Redundancy in Wireless Foundation Models",
    authors: ["Sole author"],
    venue: "Draft on request",
    status: "In prep.",
  },
  {
    id: "M2",
    title: "Certified Early Exit in a Wireless Foundation Model When the SNR Must Be Estimated",
    authors: ["Sole author"],
    venue: "Draft on request",
    status: "In prep.",
  },
];
