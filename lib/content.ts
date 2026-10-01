/**
 * All copy on the site, sourced from the industry résumé (public/resume.pdf) and the academic CV
 * (public/cv-academic.pdf).
 * Edit here; components only render it.
 */

export const profile = {
  name: "Syed Taha",
  role: "AI engineer & researcher",
  email: "syedmuhammadtaha.dev@gmail.com",
  timeZone: "Asia/Karachi",
  resume: "/resume.pdf",
  academicCv: "/cv-academic.pdf",
  heroBlurb:
    "AI engineer & researcher. Building robust agent harnesses with memory and context, and researching efficient AI and agents for resource-constrained domains.",
  heroTag: ["Building agent verticals", "that don’t fail you ↘"],
  status: "Open to graduate research positions and AI engineering roles.",
};

export const links = {
  github: "https://github.com/Syed-MuhammadTaha",
  linkedin: "https://www.linkedin.com/in/syed-muhammad-taha-imam/",
  medium: "https://medium.com/@tahaML",
};

/** The skills, as three tapes: engineering, research, and the model stack both share. */
export const tapes = [
  {
    label: "Engineering",
    words: [
      "Autonomous agents", "ReAct", "Tool calling", "Agent memory", "Multi-agent workflows", "RAG", "LangChain",
      "Gemini API", "OpenAI / Groq", "LLM evaluation", "Moderation guardrails", "Vertex AI", "Cloud Run",
      "AWS Lambda", "Airflow", "FastAPI", "Nest.js", "Redis / BullMQ", "Supabase", "Qdrant", "HNSW search",
      "VAPI", "n8n",
    ],
  },
  {
    label: "Research",
    words: [
      "Pruning", "Early exit", "Distillation", "LoRA / PEFT", "CKA / Procrustes", "Conformal risk control",
      "FlashAttention", "CUDA",
    ],
  },
  {
    label: "Shared stack",
    words: [
      "Python", "PyTorch", "Hugging Face", "Fine-tuning", "Quantization", "vLLM / Triton", "TensorFlow", "Docker",
      "GitHub Actions",
    ],
  },
];

export const statement = {
  aside:
    "I’m obsessed with building the best agents, extracting every ounce of accuracy under realistic latency and token budgets, backed by extensive trace evals.",
  // Words wrapped in *asterisks* render dimmed.
  text: "Turning research on *efficient agents* into products people can *rely on.*",
};

export type Role = {
  org: string;
  /** Second word(s) set in italic serif on the detail card. */
  orgItalic?: string;
  role: string;
  when: string;
  /** One action and its result per line. Wrap figures in **double asterisks** to set them bold. */
  points: string[];
  tags: string[];
};

/** Engineering roles, from the industry résumé. */
export const engineering: Role[] = [
  {
    org: "Brainbox",
    orgItalic: "Automations",
    role: "AI Engineer",
    when: "Dec 2025 – Now",
    points: [
      "Deployed a safety-guardrailed AI coaching backend on GCP Cloud Run (FastAPI, Vertex AI) serving **300+** minor and adult athletes",
      "Cut CI/CD deploys from **~2 min to 10 s** with GitHub Actions, keeping an SSH fallback",
      "Built SQL-aware agents over **50+** Supabase tables, answering **50%** faster",
      "Shipped chat and VAPI voice AI for Earlibird (AU) handling **200+** chats a day and **5,000+** calls, with **80%** resolved by AI and **21%** booking conversion",
      "Summarised hour-long sales calls with a parallel map-reduce over Gemini on AWS Lambda",
    ],
    tags: ["GCP", "FastAPI", "Vertex AI", "Agents", "VAPI"],
  },
  {
    org: "Epistemy",
    orgItalic: "UK",
    role: "Software Engineer (AI) & Team Lead",
    when: "Sep – Dec 2025",
    points: [
      "Led the end-to-end build of an AI tutoring platform with a Nest.js backend (**20+** endpoints) and a Next.js frontend",
      "Orchestrated multi-agent workflows on an event-driven Redis/BullMQ queue with fault tolerance",
      "Held **90%+** unit-test coverage with CI and pre-commit hooks, leading a team of **2**",
    ],
    tags: ["Nest.js", "Next.js", "BullMQ", "Multi-agent"],
  },
  {
    org: "CogniMind",
    orgItalic: "AI",
    role: "Machine Learning Intern",
    when: "Feb – Apr 2025",
    points: [
      "Raised VLM extraction accuracy by **20%** through prompt engineering",
      "Sped up retrieval and inference by **10%** with quantization and HNSW",
      "Automated MLOps with Dockerized Airflow and **5+** DAGs, cutting manual work by **60%**",
      "Built Docker and GitHub Actions CI/CD that cut deploy time by **30%**",
    ],
    tags: ["VLMs", "Airflow", "Quantization", "HNSW"],
  },
  {
    org: "RapidsAI",
    role: "Machine Learning Intern",
    when: "Sep – Dec 2024",
    points: [
      "Built a RAG chatbot (Streamlit, FastAPI) with contextual session management",
      "Reduced errors by **50%** with chain-of-thought prompting",
      "Halved OpenAI API costs (**−50%**) with a complexity-based multi-model router",
    ],
    tags: ["RAG", "FastAPI", "Routing"],
  },
];

/** Research roles, from the academic CV. */
export const research: Role[] = [
  {
    org: "IPT Lab,",
    orgItalic: "NUST",
    role: "Researcher",
    when: "Jun 2026 – Now",
    points: [
      "Leading **2** studies on redundancy and efficient inference in foundation models",
      "Showed similarity-based block removal (CKA, Procrustes) mostly reproduces an untrained network’s ranking (**ρ ≥ 0.88**)",
      "Certified early exit with learn-then-test and LoRA (**7.3%** of weights), saving **14–39%** of encoder compute at **95%** confidence",
      "Showed the guarantee breaks when SNR is estimated, and restored it by certifying on estimated groups",
    ],
    tags: ["Early exit", "Conformal", "LoRA", "CKA"],
  },
  {
    org: "Bradbury",
    orgItalic: "Lab",
    role: "Research Intern · remote",
    when: "Apr 2025 – Jan 2026",
    points: [
      "Proposed a training-free layer-merging method based on Tucker decomposition to cut parameter count",
      "Analysed self-attention to test aligning Query and Key projections in efficient-by-design architectures",
      "Reviewed Transformer topology and parameter-efficient fine-tuning, focusing on weight sharing",
    ],
    tags: ["Weight sharing", "Tucker", "Attention"],
  },
  {
    org: "MachVis",
    orgItalic: "Lab",
    role: "Undergraduate Research Intern",
    when: "Oct – Dec 2025",
    points: [
      "Built an LLM-based factual-verification framework for the clinical accuracy of generated pathology reports, beyond BLEU/ROUGE",
      "Curated a challenge set of **100+** gigapixel whole-slide images with real artifacts and stain variation",
    ],
    tags: ["LLM eval", "Pathology", "WSI"],
  },
  {
    org: "NUST",
    orgItalic: "· remote",
    role: "Undergraduate Research Intern",
    when: "Jun – Sep 2025",
    points: ["Combined MedSAM with meta-learning for few-shot dental radiograph segmentation, **+12%** on scarce disease classes"],
    tags: ["MedSAM", "Meta-learning", "Few-shot"],
  },
];

export const researchIntro =
  "Measuring structural redundancy against proper controls, compressing models, and attaching statistical guarantees to compression decisions. Open to exploring agentic research on resource-constrained devices.";

export type Field = "cka" | "exit" | "distil" | "rouge";

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
    note: "Each band is an input through the layers, stopping where it is confident enough, with error ≤ α at 95% confidence.",
    label: "Dot-matrix of inputs passing through a layer stack, each band fading out where it exits",
  },
  {
    field: "distil",
    title: "Distillation · LiteDoc",
    note: "A large teacher distilled through a narrow channel into a small task-specific student.",
    label: "Dot-matrix of a large teacher model distilled into a small student",
  },
  {
    field: "rouge",
    title: "Facts, not words · MedGemma 1.5 4B",
    note: "MedGemma 1.5 4B reads a slide into a fluent report, but gets treatment-critical facts wrong 41–67% of the time, and ROUGE-L can’t tell.",
    label: "Dot-matrix of a whole-slide image: an irregular tissue section with denser gland clusters and a faint grid of patches"
  },
];

export const metrics = [
  { value: "14–39%", label: "Encoder compute saved by certified early exit" },
  { value: "≥0.88", label: "Spearman’s rho between similarity-based removal order and an untrained network’s" },
  { value: "89.6%", label: "Of the DeepSeek-VL2 (MoE) teacher’s performance retained by LiteDoc, on average" },
];

export const papers = [
  {
    id: "C1",
    title: "LiteDoc: Distilling Large Document Models into Efficient Task-Specific Encoders",
    authors: ["Tayyab", "Taha", "Adrian", "Ulrich", "Momina", "Faisal"],
    venue: "ICDAR 2026, Springer LNCS",
    href: "https://doi.org/10.1007/978-3-032-36033-5_25",
  },
  {
    id: "M1",
    title: "Similarity Is Not Importance: On Measuring Representational Redundancy in Wireless Foundation Models",
    authors: ["Taha"],
    venue: "Draft on request",
    status: "In prep.",
  },
  {
    id: "M2",
    title: "Certified Early Exit in a Wireless Foundation Model When the Signal-to-Noise Ratio Must Be Estimated",
    authors: ["Taha"],
    venue: "Draft on request",
    status: "In prep.",
  },
  {
    id: "M3",
    title:
      "Accuracy of Craniometric Features in Gender Estimation Using Machine Learning Algorithms on University of Tennessee (UT) and Howells Datasets",
    authors: ["Nuzhat", "Taha", "et al."],
    venue: "2026",
    status: "Submitted",
  },
];
