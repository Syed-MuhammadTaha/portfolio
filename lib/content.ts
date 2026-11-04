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
    "AI engineer & researcher. Building agent harnesses with memory and context. Researching efficient agents for resource-constrained domains.",
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
      "Learn-then-test", "LLM cascades", "FlashAttention", "CUDA",
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
      "Certified small-to-large escalation for tool calls, keeping **67%** of requests on the small model at a **30%** error target, where tuned thresholds broke it about half the time",
      "Built agents that repair function-calling benchmark keys. Over **1 in 10** BFCL Live and ACEBench items reject a correct call, and the fixes lift a 32B model by up to **12** points",
      "Certified early exit in a wireless foundation model, saving **14–39%** of encoder compute at **95%** confidence",
      "Showed the guarantee breaks when SNR is estimated, and restored it by certifying on estimated groups",
      "Co-authored **2** studies on what encryption fails to hide, where agent service discovery reveals a drone’s mission at **0.947** balanced accuracy against **0.25** chance",
    ],
    tags: ["Tool calling", "LLM cascades", "Conformal", "Early exit"],
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
  "Agentic AI under resource constraints. Long-horizon agents that plan, call tools and manage context on small models, where every call has a cost, and making those choices reliable rather than hand-tuned.";

export type Field = "escort" | "distil" | "amend" | "leak";

export const tiles: { field: Field; title: string; note: string; label: string }[] = [
  {
    field: "escort",
    title: "Certified escalation · ESCORT",
    note: "A hundred requests ranked by confidence. The 67 small dots stay on the small model and the large blocks escalate, under a certified 30% error target that tuned thresholds miss about half the time.",
    label: "Dot-matrix waffle of 100 requests, 67 small dots for the small model and 33 large blocks escalated to the large model",
  },
  {
    field: "distil",
    title: "Distillation · LiteDoc",
    note: "A large teacher distilled through a narrow channel into a small task-specific student.",
    label: "Dot-matrix of a large teacher model distilled into a small student",
  },
  {
    field: "amend",
    title: "Benchmark errata · AMEND",
    note: "Over 1 in 10 BFCL Live and ACEBench items reject a correct call. Agents repair the broken keys, and a 32B model scores up to 12 points higher.",
    label: "Dot-matrix of two large curly braces, the shape of a tool call",
  },
  {
    field: "leak",
    title: "Flight plans in plain sight",
    note: "Encrypted, yet a drone’s service discovery still gives away its mission, at 0.947 balanced accuracy against 0.25 chance.",
    label: "Dot-matrix code rain, streams of dots falling down the tile like encrypted traffic",
  },
];

export const metrics = [
  { value: "67%", label: "Of tool calls kept on the small model at a certified 30% error target" },
  { value: "+12", label: "Accuracy points a 32B model regains once broken benchmark keys are repaired" },
  { value: "0.947", label: "Balanced accuracy at reading a drone’s mission from encrypted service discovery" },
  { value: "89.6%", label: "Of the DeepSeek-VL2 (MoE) teacher’s performance retained by LiteDoc, on average" },
];

export const papers = [
  {
    id: "C1",
    title: "LiteDoc: Distilling Large Document Models into Efficient Task-Specific Encoders",
    authors: ["Raza", "Taha", "Ulges", "Schwanecke", "Moetesum", "Shafait"],
    venue: "ICDAR 2026, Springer LNCS",
    href: "https://doi.org/10.1007/978-3-032-36033-5_25",
  },
  {
    id: "S1",
    title: "ESCORT: Escalation with Statistical Certification of Risk Targets for Language-Model Service Brokers",
    authors: ["Taha", "Zeeshan", "Hassan", "Cirillo", "Ahmed", "Hassan"],
    venue: "IEEE Transactions on Services Computing, 2026",
    status: "Under review",
  },
  {
    id: "S2",
    title: "AMEND: Agent-Mediated Errata for Noisy Datasets of Function-Calling Benchmarks",
    authors: ["Taha", "Zeeshan", "Ahmad", "Hassan"],
    venue: "IEEE ICC 2027",
    status: "Under review",
  },
  {
    id: "S3",
    title: "Flight Plans in Plain Sight: Intent Leakage in Agentic Service Discovery for Low-Altitude Wireless Networks",
    authors: ["Ahmad", "Zeeshan", "Taha", "Dev", "Jung", "Hassan"],
    venue: "IEEE Vehicular Technology Magazine, 2026",
    status: "Under review",
  },
  {
    id: "S4",
    title: "Observable Participation: A Passive Aerial Threat to Secure Aggregation in HAPS Federated Learning",
    authors: ["Ahmad", "Zeeshan", "Taha", "Hassan"],
    venue: "IEEE ICC 2027",
    status: "Under review",
  },
  {
    id: "P1",
    title: "Early Exit in a Wireless Foundation Model When the Signal-to-Noise Ratio Must Be Estimated",
    authors: ["Taha", "et al."],
    venue: "IEEE Transactions on Machine Learning in Communications and Networking, 2026",
    status: "In prep.",
  },
];

export type Project = {
  name: string;
  /** Second part of the name, set in italic. */
  nameItalic?: string;
  repo: string;
  summary: string;
  stack: string[];
};

const GITHUB = "https://github.com/Syed-MuhammadTaha/";

export const projects: Project[] = [
  {
    name: "create-rag-app",
    repo: GITHUB + "create-rag-app",
    summary:
      "A Python CLI that scaffolds production-ready, Dockerized RAG apps from 13 Jinja2 templates, with 3 retrieval strategies and 8+ integrations.",
    stack: ["Python", "Typer", "Docker", "FastAPI", "Streamlit", "Qdrant", "LangChain"],
  },
  {
    name: "Bare-metal",
    nameItalic: "Prospector",
    repo: GITHUB + "baremetal-prospector-agent",
    summary:
      "A framework-free SDR agent on a raw Python ReAct loop, with a syntax-directed parser that heals tool hallucinations and a three-tier memory.",
    stack: ["Python", "Jina Embeddings", "OpenAI / Groq", "Streamlit", "uv"],
  },
  {
    name: "GPT-2",
    nameItalic: "from scratch",
    repo: GITHUB + "gpt-2",
    summary:
      "Pretrained GPT-2 from scratch in PyTorch, sped up inference with KV caching and speculative decoding, and instruction-tuned it on Alpaca.",
    stack: ["PyTorch", "FlashAttention", "KV cache", "Speculative decoding", "SFT"],
  },
  {
    name: "Agentic",
    nameItalic: "RAG",
    repo: GITHUB + "agentic-rag",
    summary: "A LangGraph planner and re-planner agent for retrieval, evaluated with RAGAS at over 95% faithfulness.",
    stack: ["LangGraph", "RAGAS", "LangChain", "Python"],
  },
];
