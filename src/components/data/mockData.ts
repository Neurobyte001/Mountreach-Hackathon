import {
  ResumeData,
  RoadmapTrack,
  QuestionBankItem,
  CommunityPost,
  CollabProject,
  UserProfile,
  ATSAnalysisResult,
  JDMatchResult,
} from '../types';

export const initialUserProfile: UserProfile = {
  name: 'Alex Rivera',
  title: 'Full-Stack & AI Systems Engineer',
  targetRole: 'Senior AI Full-Stack Engineer',
  email: 'alex.rivera.dev@gmail.com',
  github: 'https://github.com/alexrivera-ai',
  linkedin: 'https://linkedin.com/in/alexrivera-ai',
  portfolio: 'https://alexrivera.dev',
  targetSalary: '$165,000 - $190,000',
  experienceYears: '4+ Years',
  readinessScore: 86,
  completedMilestonesCount: 14,
  mockInterviewsCount: 6,
};

export const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: 'Alex Rivera',
    headline: 'Senior Full-Stack & AI Systems Engineer | Distributed Systems & GenAI',
    email: 'alex.rivera.dev@gmail.com',
    phone: '+1 (415) 892-4190',
    location: 'San Francisco, CA (Open to Remote)',
    website: 'https://alexrivera.dev',
    github: 'https://github.com/alexrivera-ai',
    linkedin: 'https://linkedin.com/in/alexrivera-ai',
    summary: 'Full-Stack Software Engineer with 4+ years of experience building high-throughput cloud architectures, responsive React interfaces, and production-grade LLM/RAG pipelines. Led migration to event-driven microservices serving 1.2M+ monthly users, reducing median latency by 42%. Passionate about developer tooling, real-time collaboration, and scalable AI workflows.',
  },
  skills: [
    {
      category: 'Languages & Runtimes',
      skills: ['TypeScript', 'JavaScript (ESNext)', 'Python 3.12', 'Go', 'SQL', 'HTML5/CSS3'],
    },
    {
      category: 'Frontend & Frameworks',
      skills: ['React 19', 'Next.js', 'Tailwind CSS', 'Vite', 'Redux Toolkit', 'Framer Motion', 'Zustand'],
    },
    {
      category: 'Backend & Data',
      skills: ['Node.js', 'Express', 'FastAPI', 'PostgreSQL', 'Redis', 'Vector DBs (Pinecone/Qdrant)', 'Prisma', 'Drizzle ORM'],
    },
    {
      category: 'AI & Machine Learning',
      skills: ['Google Gemini API', 'RAG Pipelines', 'LangChain', 'OpenAI SDK', 'Prompt Optimization', 'Semantic Search & Embeddings'],
    },
    {
      category: 'Cloud, DevOps & Tools',
      skills: ['Docker', 'Kubernetes', 'AWS (ECS, S3, Lambda)', 'GCP Cloud Run', 'GitHub Actions CI/CD', 'Jest', 'Playwright'],
    },
  ],
  experience: [
    {
      id: 'exp-1',
      company: 'Synthetix AI Labs',
      role: 'Senior Full-Stack Engineer',
      location: 'San Francisco, CA',
      startDate: '2023-03',
      endDate: 'Present',
      isCurrent: true,
      techStack: ['React', 'TypeScript', 'Node.js', 'Gemini API', 'PostgreSQL', 'Redis', 'Docker'],
      bullets: [
        'Architected and deployed a multi-tenant GenAI workspace with streaming responses and vector search, scaling from 50k to 650k+ active users within 9 months.',
        'Engineered an intelligent distributed caching tier using Redis and optimistic UI updates, cutting average API latency from 480ms to 95ms (80% reduction).',
        'Spearheaded automated CI/CD pipeline modernization with GitHub Actions and Docker, accelerating engineering deployment frequency by 3.5x with zero downtime rollouts.',
        'Mentored 4 junior engineers, established comprehensive TypeScript strictness standards, and increased automated test coverage from 64% to 92%.',
      ],
    },
    {
      id: 'exp-2',
      company: 'Nexus Cloud Systems',
      role: 'Full-Stack Software Engineer',
      location: 'Austin, TX',
      startDate: '2021-06',
      endDate: '2023-02',
      isCurrent: false,
      techStack: ['React', 'FastAPI', 'Python', 'PostgreSQL', 'AWS ECS', 'Tailwind CSS'],
      bullets: [
        'Developed interactive analytics dashboards visualizing real-time telemetry from 10,000+ IoT edge nodes with WebSockets and Canvas rendering.',
        'Refactored legacy monolith database queries and implemented composite indexing in PostgreSQL, decreasing heavy reporting query times by 68%.',
        'Collaborated with product designers to create a reusable internal design system component library adopted across 6 cross-functional engineering squads.',
      ],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'ContextFlow — Production RAG Engine & Document Intelligence',
      subtitle: 'Open-Source AI Search & Knowledge Base',
      role: 'Creator & Lead Architect',
      liveUrl: 'https://contextflow-demo.dev',
      githubUrl: 'https://github.com/alexrivera-ai/contextflow',
      techStack: ['TypeScript', 'Gemini API', 'Next.js', 'FastAPI', 'Qdrant Vector DB', 'Tailwind CSS'],
      bullets: [
        'Engineered an enterprise-grade document ingestion pipeline that chunks, embeds, and indexes 10,000+ page technical PDFs in under 45 seconds.',
        'Implemented hybrid search combining BM25 keyword matching and dense vector embeddings, boosting retrieval relevance precision by 31% over baseline vector-only search.',
        'Built an intuitive conversational UI with interactive citation highlights, token stream rendering, and one-click PDF source attribution.',
      ],
    },
    {
      id: 'proj-2',
      title: 'HyperQueue — Distributed Task Orchestrator',
      subtitle: 'Fault-tolerant background job scheduler',
      role: 'Core Author',
      liveUrl: 'https://hyperqueue-benchmarks.dev',
      githubUrl: 'https://github.com/alexrivera-ai/hyperqueue',
      techStack: ['Go', 'Redis Streams', 'Docker', 'Prometheus', 'Grafana'],
      bullets: [
        'Built a lightweight, distributed task queue capable of processing 25,000 tasks/second with automatic dead-letter queues, exponential backoff, and heartbeat monitoring.',
        'Designed lock-free concurrency primitives in Go, maintaining 99.99% scheduling accuracy during node failure simulations.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      startDate: '2017',
      endDate: '2021',
      gpa: '3.84 / 4.00',
      location: 'Berkeley, CA',
      achievements: ['Dean’s Honors List (6 consecutive semesters)', 'Teaching Assistant for CS61B: Data Structures & Algorithms'],
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      date: '2023',
      credentialUrl: 'https://aws.amazon.com/verification',
    },
    {
      id: 'cert-2',
      name: 'DeepLearning.AI: Large Language Models with Semantic Search',
      issuer: 'DeepLearning.AI',
      date: '2024',
      credentialUrl: 'https://deeplearning.ai',
    },
  ],
};

export const defaultATSAnalysis: ATSAnalysisResult = {
  aggregateScore: 88,
  categoryScores: {
    skills: 92,
    experience: 86,
    formatting: 94,
    keywords: 80,
  },
  strengths: [
    'Outstanding XYZ formula adoption with strong quantifiable metrics (e.g. 42% latency cut, 650k DAU, 3.5x deploy speed).',
    'Comprehensive modern technical stack covering Frontend, Backend, AI/ML, and DevOps seamlessly.',
    'Clear architectural leadership demonstration, open-source projects, and engineering mentorship.',
  ],
  criticalFixes: [
    'Incorporate explicit Distributed Systems keywords like "Event-Driven Architecture", "Kafka/RabbitMQ", or "gRPC" in the skills taxonomy.',
    'Add specific mention of unit and end-to-end testing frameworks (e.g. Vitest, Jest, Playwright) within the Nexus Cloud experience section.',
    'Ensure all dates follow uniform ISO/standard abbreviation formatting for maximum ATS parser compliance.',
  ],
  missingMetrics: [
    'Project 2 (HyperQueue) could highlight memory footprint savings or server cost reductions alongside throughput benchmarks.',
  ],
  keywordsFound: [
    'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes',
    'RAG Pipelines', 'Vector DB', 'CI/CD', 'Microservices', 'REST APIs', 'FastAPI'
  ],
  keywordsMissing: [
    'Kafka', 'gRPC', 'OpenTelemetry', 'Terraform', 'System Observability'
  ],
  executiveSummary: 'Tier-1 Candidate Resume. Demonstrates high technical caliber, measurable business outcomes, and modern AI engineering capabilities. Highly competitive for Senior/Staff Full-Stack & AI Systems roles.',
  analyzedAt: 'Just now',
};

export const defaultJDMatch: JDMatchResult = {
  matchPercentage: 84,
  targetRole: 'Senior AI Full-Stack Platform Engineer',
  company: 'Anthropic / Scale AI Tier Company',
  matchedSkills: [
    'TypeScript', 'React', 'Node.js', 'Python', 'PostgreSQL', 'Redis',
    'Docker', 'Gemini / LLM APIs', 'RAG Architecture', 'Vector Search', 'CI/CD'
  ],
  missingRequiredSkills: [
    'Distributed Event Streaming (Kafka / Pulsar)',
    'Observability & Distributed Tracing (OpenTelemetry / Prometheus)',
    'GraphQL Schema Stitching & Federation'
  ],
  missingPreferredSkills: [
    'Kubernetes Operator Development & Helm',
    'Fine-tuning Small Language Models (LoRA / QLoRA)',
    'gRPC Protocol Buffers'
  ],
  recommendations: [
    'Highlight an event-streaming use case (e.g. using Kafka or Redis Streams) directly in your Synthetix AI experience bullets.',
    'Add OpenTelemetry or Prometheus telemetry observability metrics into your ContextFlow project description.',
    'Complete the "Distributed Event Streaming & Observability" milestone in your CareerForge roadmap.',
  ],
  remediationRoadmapTopics: [
    'Distributed Event Streaming with Kafka & Redis Streams',
    'Cloud Observability: OpenTelemetry, Prometheus & Distributed Tracing',
    'GraphQL Federation & Real-Time Subscriptions',
    'LLM Fine-Tuning & Quantization Essentials (LoRA, Ollama, PEFT)',
  ],
};

export const defaultRoadmapTracks: RoadmapTrack[] = [
  {
    id: 'ai-ml-engineer',
    title: 'AI & GenAI Systems Engineer',
    category: 'Artificial Intelligence',
    iconName: 'Sparkles',
    description: 'Master production Generative AI, RAG pipelines, Vector Embeddings, Fine-Tuning, and scalable AI inference architectures.',
    level: 'Advanced / Specialist',
    estimatedWeeks: 12,
    milestones: [
      {
        id: 'aiml-1',
        title: 'Foundations of Modern LLMs & Prompt Engineering',
        description: 'Understand transformer architectures, tokenization, context windows, few-shot prompting, and structured JSON outputs.',
        whyLearn: 'Crucial for reliably instructing state-of-the-art models like Gemini 3.7 Flash and building deterministic AI pipelines.',
        difficulty: 'Beginner',
        estimatedHours: 14,
        status: 'mastered',
        resources: [
          { title: 'Google DeepMind: Prompt Engineering Guide', url: 'https://ai.google.dev/docs', type: 'doc', isFree: true },
          { title: 'Andrej Karpathy: State of GPT & LLM Internals', url: 'https://youtube.com', type: 'video', isFree: true },
        ],
        projectIdea: {
          title: 'Structured Output Evaluator',
          description: 'Build an automated prompt evaluation harness that validates LLM JSON schemas with retry and repair logic.',
          skillsApplied: ['Gemini API', 'TypeScript', 'JSON Schema', 'Zod'],
        },
      },
      {
        id: 'aiml-2',
        title: 'Production RAG & Vector Search Architectures',
        description: 'Implement semantic search, hybrid BM25 + dense vector retrieval, recursive chunking, and re-ranking pipelines.',
        whyLearn: 'RAG is the standard industrial architecture for enterprise knowledge retrieval without expensive retraining.',
        difficulty: 'Intermediate',
        estimatedHours: 24,
        status: 'in-progress',
        resources: [
          { title: 'Pinecone Vector DB Masterclass & Chunking Strategies', url: 'https://pinecone.io/learn', type: 'course', isFree: true },
          { title: 'Qdrant Vector Database Official Handbook', url: 'https://qdrant.tech/documentation', type: 'doc', isFree: true },
        ],
        projectIdea: {
          title: 'Multi-Modal Knowledge Base',
          description: 'Create an intelligent search engine that searches across markdown notes, diagrams, and video transcripts.',
          skillsApplied: ['Vector DB', 'Embeddings', 'Hybrid Search', 'FastAPI'],
        },
      },
      {
        id: 'aiml-3',
        title: 'Agentic Workflows & Multi-Tool Function Calling',
        description: 'Build autonomous agents with tool-calling, memory persistence, human-in-the-loop validation, and fallback mechanisms.',
        whyLearn: 'Modern AI applications go beyond static chat to autonomously execute multi-step business logic.',
        difficulty: 'Advanced',
        estimatedHours: 30,
        status: 'not-started',
        resources: [
          { title: 'Google GenAI SDK Function Calling Documentation', url: 'https://ai.google.dev', type: 'doc', isFree: true },
          { title: 'Building Reliable AI Agents in Production (Engineering Blog)', url: 'https://github.com', type: 'repo', isFree: true },
        ],
        projectIdea: {
          title: 'Autonomous Code Review & Security Agent',
          description: 'An AI GitHub bot that analyzes pull request diffs, executes test suites, and drafts security remediation PRs.',
          skillsApplied: ['Function Calling', 'GitHub API', 'AST Parsing', 'Agent Memory'],
        },
      },
      {
        id: 'aiml-4',
        title: 'Fine-Tuning, Quantization & Model Evaluation (MLOps)',
        description: 'Master LoRA/QLoRA parameter-efficient fine-tuning, model quantization (GGUF), benchmark metrics, and guardrails.',
        whyLearn: 'Enables domain-specialized small models that run cost-effectively with high privacy and sub-100ms latency.',
        difficulty: 'Advanced',
        estimatedHours: 35,
        status: 'not-started',
        resources: [
          { title: 'HuggingFace PEFT & LoRA Tutorial', url: 'https://huggingface.co/docs/peft', type: 'doc', isFree: true },
          { title: 'Unsloth Fast Fine-Tuning Guide', url: 'https://unsloth.ai', type: 'course', isFree: true },
        ],
        projectIdea: {
          title: 'Domain-Specialized Support Model',
          description: 'Fine-tune a 7B parameter open-weights model on specialized customer docs with rigorous ROUGE & BLEU test suites.',
          skillsApplied: ['LoRA', 'Hugging Face', 'Quantization', 'Benchmarking'],
        },
      },
    ],
  },
  {
    id: 'fullstack-web-architect',
    title: 'Modern Full-Stack Web Architect',
    category: 'Web Engineering',
    iconName: 'Layout',
    description: 'From modern React 19 and state architecture to high-performance Node/Express backends, caching, and cloud deployments.',
    level: 'Mid-Level',
    estimatedWeeks: 10,
    milestones: [
      {
        id: 'fs-1',
        title: 'Advanced React 19 & Component Architecture',
        description: 'Server Components, concurrent rendering, custom hooks, atomic state management, and accessibility.',
        whyLearn: 'Drives frictionless, high-speed user experiences and maintainable frontend codebases at scale.',
        difficulty: 'Intermediate',
        estimatedHours: 18,
        status: 'mastered',
        resources: [
          { title: 'React 19 Official Documentation & Hooks Deep Dive', url: 'https://react.dev', type: 'doc', isFree: true },
          { title: 'Web.dev Accessibility & Performance Best Practices', url: 'https://web.dev', type: 'doc', isFree: true },
        ],
        projectIdea: {
          title: 'Real-time Collaborative Whiteboard',
          description: 'Build a high-performance vector canvas with undo/redo tree, multi-cursor presence, and optimistic UI updates.',
          skillsApplied: ['React 19', 'Canvas API', 'WebSockets', 'Tailwind CSS'],
        },
      },
      {
        id: 'fs-2',
        title: 'Backend API Design, Database Scaling & Caching',
        description: 'REST & GraphQL API design, connection pooling, PostgreSQL indexing strategies, Redis caching, and transactions.',
        whyLearn: 'Ensures your services remain sub-50ms under heavy read/write traffic spikes.',
        difficulty: 'Intermediate',
        estimatedHours: 22,
        status: 'mastered',
        resources: [
          { title: 'Use The Index, Luke! SQL Performance Guide', url: 'https://use-the-index-luke.com', type: 'doc', isFree: true },
          { title: 'Redis Distributed Caching Architecture Guide', url: 'https://redis.io/resources', type: 'doc', isFree: true },
        ],
        projectIdea: {
          title: 'High-Throughput URL Shortener & Analytics Engine',
          description: 'Design a system that handles 100k requests/sec with Redis sliding window counters and background click stream workers.',
          skillsApplied: ['Node.js', 'PostgreSQL', 'Redis', 'Docker'],
        },
      },
      {
        id: 'fs-3',
        title: 'Security, Authentication & Distributed State',
        description: 'OAuth2/OIDC, JWT best practices, CSRF/XSS protection, rate limiting, and session stores.',
        whyLearn: 'Security is paramount in enterprise SaaS and web application architectures.',
        difficulty: 'Advanced',
        estimatedHours: 20,
        status: 'in-progress',
        resources: [
          { title: 'OWASP Top 10 Web Application Security Guide', url: 'https://owasp.org', type: 'doc', isFree: true },
          { title: 'Auth0 / OAuth2 Simplified Spec Guide', url: 'https://oauth.net', type: 'doc', isFree: true },
        ],
        projectIdea: {
          title: 'Multi-Tenant Auth & Role-Based Access Service',
          description: 'Build a secure authentication service with WebAuthn passkeys, scoped API tokens, and audit logs.',
          skillsApplied: ['OAuth2', 'WebAuthn', 'Express', 'Drizzle ORM'],
        },
      },
      {
        id: 'fs-4',
        title: 'Cloud Infrastructure & Automated CI/CD Pipelines',
        description: 'Docker multi-stage builds, Kubernetes basics, GitHub Actions pipelines, zero-downtime rolling updates.',
        whyLearn: 'Full-stack engineers who master DevOps are 3x more productive and independent.',
        difficulty: 'Advanced',
        estimatedHours: 26,
        status: 'not-started',
        resources: [
          { title: 'Docker Official Best Practices Guide', url: 'https://docs.docker.com', type: 'doc', isFree: true },
          { title: 'GitHub Actions Automated Testing & Deployments', url: 'https://docs.github.com', type: 'doc', isFree: true },
        ],
        projectIdea: {
          title: 'Automated Preview Environment Deployer',
          description: 'A GitHub bot that spins up isolated ephemeral cloud container instances for every active Pull Request.',
          skillsApplied: ['Docker', 'Cloud Run', 'GitHub Actions', 'Bash'],
        },
      },
    ],
  },
  {
    id: 'backend-systems',
    title: 'Distributed Backend Systems & Microservices',
    category: 'Systems Engineering',
    iconName: 'Server',
    description: 'Event-driven architectures, Kafka streaming, consensus algorithms, high concurrency, and distributed observability.',
    level: 'Advanced / Specialist',
    estimatedWeeks: 14,
    milestones: [
      {
        id: 'sys-1',
        title: 'Concurrent Programming & Asynchronous I/O Models',
        description: 'Event loops, goroutines, thread pools, channels, race condition mitigation, and mutexes.',
        whyLearn: 'The bedrock of building microservices capable of millions of simultaneous connections.',
        difficulty: 'Intermediate',
        estimatedHours: 20,
        status: 'mastered',
        resources: [
          { title: 'Node.js Event Loop Architecture Guide', url: 'https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick', type: 'doc', isFree: true },
          { title: 'Go Concurrency in Practice (Rob Pike)', url: 'https://go.dev', type: 'video', isFree: true },
        ],
        projectIdea: {
          title: 'Concurrent Web Crawler & Link Graph Indexer',
          description: 'A distributed crawler with worker pools, rate limiting, and robots.txt compliance.',
          skillsApplied: ['Go / Node', 'Concurrency', 'HTTP/2', 'Graph Data Structures'],
        },
      },
      {
        id: 'sys-2',
        title: 'Event Streaming & Message Brokers (Kafka / RabbitMQ)',
        description: 'Partitioning strategies, consumer groups, exactly-once vs at-least-once semantics, and dead-letter queues.',
        whyLearn: 'Enables decoupled microservices and real-time data streaming without blocking bottlenecks.',
        difficulty: 'Advanced',
        estimatedHours: 28,
        status: 'in-progress',
        resources: [
          { title: 'Apache Kafka: The Definitive Guide', url: 'https://kafka.apache.org', type: 'doc', isFree: true },
          { title: 'Designing Data-Intensive Applications (Summary & Guide)', url: 'https://github.com', type: 'repo', isFree: true },
        ],
        projectIdea: {
          title: 'Financial Transaction Ledger & Fraud Detector',
          description: 'Stream transaction events through Kafka with real-time sliding window anomaly detection.',
          skillsApplied: ['Kafka', 'Event Sourcing', 'Redis', 'TypeScript'],
        },
      },
      {
        id: 'sys-3',
        title: 'Distributed Consensus & High-Availability Design',
        description: 'Raft consensus algorithm, CAP theorem tradeoffs, leader election, and distributed locking.',
        whyLearn: 'Essential for designing reliable systems that survive cloud network partitions and server crashes.',
        difficulty: 'Advanced',
        estimatedHours: 32,
        status: 'not-started',
        resources: [
          { title: 'The Raft Consensus Algorithm Animated Visualizer', url: 'https://raft.github.io', type: 'video', isFree: true },
          { title: 'MIT 6.824: Distributed Systems Course Lectures', url: 'https://youtube.com', type: 'course', isFree: true },
        ],
        projectIdea: {
          title: 'Key-Value Store with Raft Replication',
          description: 'Implement a distributed key-value store with leader election, log replication, and snapshotting.',
          skillsApplied: ['Distributed Consensus', 'Raft', 'Network Sockets', 'Go'],
        },
      },
    ],
  },
  {
    id: 'custom-jd-remediation',
    title: 'Target JD Skill Remediation Track',
    category: 'Targeted Remediation',
    iconName: 'Target',
    description: 'Custom path generated by CareerForge AI to bridge your specific missing skills for your dream role.',
    level: 'Mid-Level',
    estimatedWeeks: 6,
    isCustom: true,
    milestones: [
      {
        id: 'rem-1',
        title: 'Distributed Event Streaming with Kafka & Redis Streams',
        description: 'Understand producer/consumer partitions, consumer groups, offset management, and message ordering.',
        whyLearn: 'Identified as a critical missing requirement in your targeted Senior AI Full-Stack Job Description.',
        difficulty: 'Intermediate',
        estimatedHours: 16,
        status: 'in-progress',
        resources: [
          { title: 'Confluent Kafka Fundamentals for Developers', url: 'https://developer.confluent.io', type: 'course', isFree: true },
          { title: 'Redis Streams Documentation & Practical Examples', url: 'https://redis.io/docs/data-types/streams', type: 'doc', isFree: true },
        ],
        projectIdea: {
          title: 'Real-time Event Ingestion & Webhook Dispatcher',
          description: 'Build a durable webhook delivery system that streams events with automatic retries.',
          skillsApplied: ['Redis Streams', 'Node.js', 'Retry Logic', 'Docker'],
        },
      },
      {
        id: 'rem-2',
        title: 'Cloud Observability: OpenTelemetry & Distributed Tracing',
        description: 'Instrument services with OpenTelemetry traces, metrics, logs, and trace context propagation across microservices.',
        whyLearn: 'Requested by senior engineering panels to prove operational maturity in production cloud apps.',
        difficulty: 'Intermediate',
        estimatedHours: 14,
        status: 'not-started',
        resources: [
          { title: 'OpenTelemetry Official Getting Started Guide', url: 'https://opentelemetry.io/docs', type: 'doc', isFree: true },
          { title: 'Prometheus & Grafana Monitoring Handbook', url: 'https://prometheus.io', type: 'doc', isFree: true },
        ],
        projectIdea: {
          title: 'Traced Microservice Dashboard',
          description: 'Instrument an existing full-stack app with Jaeger distributed tracing and Grafana metrics.',
          skillsApplied: ['OpenTelemetry', 'Prometheus', 'Grafana', 'Jaeger'],
        },
      },
      {
        id: 'rem-3',
        title: 'GraphQL Schema Federation & Real-time Subscriptions',
        description: 'Design unified API gateways, schema stitching, DataLoader N+1 prevention, and WebSocket subscriptions.',
        whyLearn: 'Enhances multi-client frontend velocity across web, mobile, and third-party developer platforms.',
        difficulty: 'Intermediate',
        estimatedHours: 12,
        status: 'not-started',
        resources: [
          { title: 'Apollo GraphQL Federation Documentation', url: 'https://www.apollographql.com/docs/federation', type: 'doc', isFree: true },
        ],
        projectIdea: {
          title: 'Federated E-Commerce GraphQL Gateway',
          description: 'Create a federated gateway connecting separate User, Catalog, and Orders services.',
          skillsApplied: ['GraphQL', 'Apollo Server', 'DataLoader', 'TypeScript'],
        },
      },
    ],
  },
];

export const defaultQuestionBank: QuestionBankItem[] = [
  {
    id: 'qb-1',
    field: 'ai-ml',
    topic: 'RAG Architectures & Hallucination Mitigation',
    difficulty: 'Intermediate',
    question: 'How do you design a high-accuracy Retrieval-Augmented Generation (RAG) pipeline, and what strategies prevent LLM hallucinations?',
    keyConcepts: ['Semantic Chunking', 'Hybrid Search (BM25 + Dense)', 'Cross-Encoder Re-Ranking', 'Context Grounding', 'Self-Correction Loops'],
    answer: 'A production-grade RAG pipeline follows four core architectural stages:\n1. Ingestion & Chunking: Use semantic or recursive character chunking (300-500 tokens with 10% overlap) rather than fixed-size splits to preserve paragraph context.\n2. Hybrid Retrieval: Combine sparse keyword search (BM25) for exact technical terms/IDs with dense vector embeddings (e.g. text-embedding-004) for conceptual meaning.\n3. Cross-Encoder Re-ranking: Re-score top 20 candidate documents with a secondary re-ranking model (Cohere or Flash-Rank) to pass only top 3-5 relevant chunks into the LLM context window.\n4. Context Grounding & Verification: Inject strict system instructions requiring explicit source citations. Optionally employ self-reflection prompts to verify claims against retrieved text before streaming the final response.',
    commonPitfalls: [
      'Using arbitrary large chunk sizes that dilute cosine similarity precision.',
      'Relying solely on vector embeddings for queries containing precise model numbers, IDs, or syntax keywords where exact lexical match is critical.',
      'Stuffing excessive unranked chunks into prompt context, triggering the "Lost in the Middle" attention degradation phenomenon.',
    ],
    sampleCode: `// Example Hybrid Search + Re-ranking Pipeline
async function retrieveContext(query: string) {
  const [vectorResults, keywordResults] = await Promise.all([
    vectorDb.query({ vector: await getEmbedding(query), topK: 15 }),
    elasticsearch.search({ query, size: 15 })
  ]);
  
  // Reciprocal Rank Fusion (RRF)
  const mergedDocs = reciprocalRankFusion([vectorResults, keywordResults]);
  
  // Re-rank top candidates for optimal prompt density
  const reRanked = await crossEncoderRerank(query, mergedDocs.slice(0, 20));
  return reRanked.slice(0, 5);
}`,
    bookmarked: true,
  },
  {
    id: 'qb-2',
    field: 'fullstack',
    topic: 'React 19 Server Components & Fiber Reconciliation',
    difficulty: 'Intermediate',
    question: 'What is the architectural difference between React Server Components (RSC) and Client Components, and how do they benefit real-world web performance?',
    keyConcepts: ['Zero-Bundle-Size Dependencies', 'Direct Backend Data Access', 'Streaming SSR', 'Client Hydration', 'Server Action Boundaries'],
    answer: 'React Server Components (RSC) execute exclusively on the server and stream a lightweight JSON-like intermediate representation (the RSC payload) directly to the browser.\n\nKey architectural differences:\n1. Zero Client JS Bundle: Heavy libraries (markdown parsers, date formatters, encryption packages) used within Server Components never get downloaded by the user browser.\n2. Direct Backend Access: Server Components can directly query databases, caches, or filesystems without requiring an extra intermediate REST endpoint.\n3. Progressive Streaming: With Suspense boundaries, HTML and components stream to the client incrementally as data arrives, drastically cutting Time to First Byte (TTFB) and Largest Contentful Paint (LCP).\n\nClient Components (`"use client"`) are used whenever interactivity is required: event listeners (`onClick`, `onChange`), React state (`useState`, `useReducer`), and browser APIs.',
    commonPitfalls: [
      'Adding `"use client"` at the very top level of page components instead of pushing it down to leaf interactive elements.',
      'Attempting to pass non-serializable objects (e.g. class instances or functions) as props from Server to Client components.',
      'Unintentionally creating waterfall data fetches by nesting asynchronous Server Components sequentially without parallel `Promise.all` triggers.',
    ],
    bookmarked: false,
  },
  {
    id: 'qb-3',
    field: 'backend',
    topic: 'Distributed Rate Limiting & Sliding Windows',
    difficulty: 'Advanced',
    question: 'How would you architect a distributed rate-limiting service capable of handling 500k requests/second across multiple geographically distributed nodes?',
    keyConcepts: ['Sliding Window Counter Algorithm', 'Redis Sorted Sets / Lua Scripts', 'Local In-Memory Batching', 'Clock Synchronization', 'Fail-Open vs Fail-Closed Strategy'],
    answer: 'To handle 500k req/sec reliably:\n\n1. Algorithm Selection: Use the Sliding Window Counter algorithm with Redis. It avoids the 2x burst vulnerability of Fixed Window counters while being much more memory-efficient than a raw Sliding Window Log.\n2. Atomic Execution with Redis Lua Scripts: Package the time checking, key expiration, and counter increment into an atomic Lua script executed server-side in Redis to eliminate race conditions.\n3. Local Layer-1 In-Memory Caching (Token Bucket): Rather than hitting Redis for every individual request, local node instances maintain a local in-memory token cache, synchronizing counts in asynchronous batches (every 50ms) to Redis.\n4. High Availability: Deploy Redis in a multi-region cluster with replication. If Redis is temporarily unreachable, implement a configurable "fail-open" strategy to avoid taking down legitimate user traffic during network blips.',
    commonPitfalls: [
      'Using simple `INCR` with `EXPIRE` in fixed windows, which allows 2x burst rate at the window boundary (e.g. 59s and 01s).',
      'Calling multiple un-pipelined Redis commands over network roundtrips instead of single atomic Lua scripts.',
      'Failing to handle clock drift across application server nodes (always utilize Redis server timestamps `TIME`).',
    ],
    sampleCode: `-- Redis Lua Script for Atomic Sliding Window
local key = KEYS[1]
local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local limit = tonumber(ARGV[3])

-- Remove timestamps older than current window
redis.call('ZREMRANGEBYSCORE', key, 0, now - window)
local currentRequests = redis.call('ZCARD', key)

if currentRequests < limit then
  redis.call('ZADD', key, now, now)
  redis.call('EXPIRE', key, window / 1000)
  return 1 -- Allowed
else
  return 0 -- Rate limited
end`,
    bookmarked: true,
  },
  {
    id: 'qb-4',
    field: 'dsa',
    topic: 'LRU Cache Design & Concurrency',
    difficulty: 'Intermediate',
    question: 'Implement an LRU (Least Recently Used) Cache with O(1) time complexity for both `get` and `put` operations. How do you make it thread-safe?',
    keyConcepts: ['Doubly Linked List', 'Hash Map', 'O(1) Node Eviction', 'Read-Write Mutex (RWLock)', 'Concurrent Synchronization'],
    answer: 'An LRU Cache combines two primary data structures:\n1. Hash Map (Key -> Node Reference): Provides O(1) random access lookup for keys.\n2. Doubly Linked List (Head & Tail Sentinel Nodes): Maintains the order of recency. The most recently accessed node is moved to the Head, while the least recently used node sits at the Tail.\n\nOperations:\n- `get(key)`: If key exists in Hash Map, fetch node, detach from current position in linked list, prepend to Head, and return value. Time: O(1).\n- `put(key, value)`: If key exists, update value and move to Head. If new key: check capacity; if full, remove Tail node from both Linked List and Hash Map. Create new node, insert at Head, register in Hash Map. Time: O(1).\n\nFor thread-safety in Go or Java: Wrap access with a Read-Write Mutex (`sync.RWMutex`), acquiring write locks for `put` and `get` (since `get` mutates the linked list order).',
    commonPitfalls: [
      'Using a Singly Linked List instead of Doubly Linked List, making node deletion O(N) because you lack a pointer to the previous node.',
      'Forgetting to delete the evicted node from the Hash Map when pruning the tail.',
      'Assuming `get` is a read-only operation in LRU (it mutates the order, requiring write synchronization in concurrent environments).',
    ],
    sampleCode: `class LRUNode {
  key: string;
  val: any;
  prev: LRUNode | null = null;
  next: LRUNode | null = null;
  constructor(key: string, val: any) { this.key = key; this.val = val; }
}

class LRUCache {
  private capacity: number;
  private map = new Map<string, LRUNode>();
  private head = new LRUNode('', null);
  private tail = new LRUNode('', null);

  constructor(capacity: number) {
    this.capacity = capacity;
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key: string) {
    const node = this.map.get(key);
    if (!node) return -1;
    this.moveToHead(node);
    return node.val;
  }

  put(key: string, value: any) {
    let node = this.map.get(key);
    if (node) {
      node.val = value;
      this.moveToHead(node);
    } else {
      if (this.map.size >= this.capacity) {
        const lru = this.tail.prev!;
        this.removeNode(lru);
        this.map.delete(lru.key);
      }
      node = new LRUNode(key, value);
      this.map.set(key, node);
      this.addToHead(node);
    }
  }

  private moveToHead(node: LRUNode) {
    this.removeNode(node);
    this.addToHead(node);
  }
  private removeNode(node: LRUNode) {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }
  private addToHead(node: LRUNode) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next!.prev = node;
    this.head.next = node;
  }
}`,
    bookmarked: false,
  },
];

export const defaultCommunityPosts: CommunityPost[] = [
  {
    id: 'post-1',
    author: {
      name: 'Maya Lin',
      handle: '@mayalin_eng',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'Staff AI Engineer at Datadog',
      badge: 'Mentor & Top Contributor',
    },
    title: 'How I passed the Senior Machine Learning Engineer bar at top-tier labs (Interview Breakdown)',
    content: 'Just wrapped up a 4-month interview sprint and accepted an offer for Staff AI Engineer. Here is the exact system architecture framework that interviewers loved:\n\n1. Clarify Scale First: Never jump into model selection without knowing SLA latency (<100ms vs batch), QPS, and memory constraints.\n2. Data Ingestion & Drift: Always mention offline feature stores (Feast), online vector indexes, and embedding drift monitoring.\n3. The XYZ Resume Formula: Re-writing my bullet points using CareerForge to emphasize quantified speedups (e.g. "reduced embedding cost by 44% with dynamic batching") made recruiters reach out directly rather than cold applying.\n\nAMA below on system design or negotiation!',
    category: 'interview-experiences',
    tags: ['Interview Prep', 'AI/ML', 'System Design', 'Career Advice'],
    upvotes: 142,
    userUpvoted: true,
    createdAt: '2 hours ago',
    comments: [
      {
        id: 'c-1',
        author: {
          name: 'Marcus Vance',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          role: 'Full-Stack Developer',
        },
        text: 'Congratulations Maya! How in-depth did they go on vector database indexing algorithms (e.g. HNSW vs IVF-PQ)?',
        createdAt: '1 hour ago',
      },
      {
        id: 'c-2',
        author: {
          name: 'Maya Lin',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          role: 'Staff AI Engineer at Datadog',
        },
        text: 'They specifically tested tradeoffs between recall precision and memory footprint. HNSW builds multi-layer graphs for fast query time with higher RAM usage, while IVF-PQ quantizes vectors for high compression with slight recall loss.',
        createdAt: '45 mins ago',
      },
    ],
  },
  {
    id: 'post-2',
    author: {
      name: 'Jordan Hayes',
      handle: '@jordanhayes_oss',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      role: 'Open-Source Maintainer',
      badge: 'Project Creator',
    },
    title: 'Showcase: VectorFlow — Real-time Semantic RAG Pipeline with Gemini Flash 3.7',
    content: 'Hey everyone! Built an open-source visual tool that benchmarks different chunking strategies and shows live cosine similarity heatmaps for RAG developers.\n\nFeatures:\n- Side-by-side comparison between Semantic chunking vs Fixed token splits\n- Real-time LLM grounding citation validation\n- Exportable TypeScript SDK bindings\n\nLooking for feedback and contributors interested in React 19 and vector math!',
    category: 'project-showcase',
    tags: ['Open Source', 'Gemini API', 'React 19', 'RAG', 'TypeScript'],
    upvotes: 89,
    userUpvoted: false,
    createdAt: '5 hours ago',
    comments: [
      {
        id: 'c-3',
        author: {
          name: 'Elena Rostova',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
          role: 'Backend Architect',
        },
        text: 'This looks super clean! Would love to contribute support for Redis Vector Search.',
        createdAt: '3 hours ago',
      },
    ],
  },
  {
    id: 'post-3',
    author: {
      name: 'Devon Wright',
      handle: '@devon_arch',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      role: 'Principal Architect',
    },
    title: 'Why most junior/mid resume projects get ignored by hiring managers (and how to fix them)',
    content: 'As someone who reviews 200+ resumes each month: the reason generic "Todo Apps" or boilerplate "Chatbots" get skipped is that they lack production failure handling.\n\nIf you want your portfolio projects to turn heads, add these 3 things:\n1. Metrics: Benchmark latency under 100 concurrent requests.\n2. Graceful Degraded States: What happens if the DB is down or the LLM rate limits? (Add exponential backoff or local fallback).\n3. CI/CD & Testing: A green GitHub Actions badge with 80%+ test coverage immediately separates you from 95% of candidates.',
    category: 'career-advice',
    tags: ['Resume Tips', 'Hiring Manager Insight', 'Portfolio Projects', 'Junior to Senior'],
    upvotes: 215,
    userUpvoted: true,
    createdAt: '1 day ago',
    comments: [],
  },
];

export const defaultCollabProjects: CollabProject[] = [
  {
    id: 'collab-1',
    title: 'OpenAgent: Distributed Multi-Agent Orchestrator',
    tagline: 'Autonomous AI agents collaborating on complex workflows with sandboxed Python code execution',
    description: 'We are building an open-source agent runtime that coordinates specialized sub-agents with shared memory, dynamic tool synthesis, and human-in-the-loop approvals. Ideal for developers wanting production GenAI and systems experience.',
    tags: ['TypeScript', 'Gemini API', 'Docker', 'FastAPI', 'WebSockets'],
    lookingFor: ['React UI Specialist (Streaming components)', 'Backend Python / FastAPI Engineer', 'DevOps & Sandboxing Engineer'],
    teamSize: '4 engineers',
    openRoles: 2,
    githubUrl: 'https://github.com/careerforge-collab/openagent',
    owner: {
      name: 'Liam Zhang',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      role: 'Lead Maintainer',
    },
    createdAt: '3 days ago',
  },
  {
    id: 'collab-2',
    title: 'PulseDB: Ultra-Lightweight Embedded Vector Cache',
    tagline: 'Zero-dependency in-memory vector similarity engine compiled to WebAssembly for edge apps',
    description: 'Building an edge-first vector indexing engine with HNSW graphs that runs in both browser WebAssembly and Node.js microservices. Great project to showcase deep systems and algorithmic mastery on your resume.',
    tags: ['Rust / C++', 'WebAssembly', 'TypeScript', 'Vector Search', 'Algorithms'],
    lookingFor: ['Wasm & Rust Engineer', 'Benchmarking & Performance Engineer'],
    teamSize: '3 engineers',
    openRoles: 1,
    githubUrl: 'https://github.com/careerforge-collab/pulsedb',
    owner: {
      name: 'Sarah Connor',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      role: 'Systems Architect',
    },
    createdAt: '1 week ago',
  },
  {
    id: 'collab-3',
    title: 'DevMesh: Real-Time Collaborative Architecture Canvas',
    tagline: 'Interactive diagrams with live architecture simulation, latency modeling, and automatic Terraform export',
    description: 'A visual canvas where teams can drag & drop microservices, simulate traffic spikes, and generate verified cloud infrastructure code in real-time.',
    tags: ['React 19', 'Canvas API', 'TypeScript', 'Terraform', 'WebSockets'],
    lookingFor: ['Frontend Canvas Developer', 'Cloud Infrastructure Architect'],
    teamSize: '5 engineers',
    openRoles: 2,
    githubUrl: 'https://github.com/careerforge-collab/devmesh',
    owner: {
      name: 'Kavita Rao',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      role: 'Principal Engineer',
    },
    createdAt: '4 days ago',
  },
];
