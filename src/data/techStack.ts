import { TechnologyItem } from '../types';

export const TECH_STACK_DATA: TechnologyItem[] = [
  {
    name: 'NEXT.JS',
    category: 'frontend',
    role: 'Full-Stack React Framework',
    highlight: 'Edge routing, ISR, and React Server Components for ultra-fast initial render.',
    status: 'core'
  },
  {
    name: 'REACT',
    category: 'frontend',
    role: 'UI Component Architecture',
    highlight: 'Concurrent rendering, custom state hooks, and resilient declarative interfaces.',
    status: 'core'
  },
  {
    name: 'TYPESCRIPT',
    category: 'frontend',
    role: 'Static Type System',
    highlight: 'Strict typing across API borders, preventing runtime errors before deployment.',
    status: 'core'
  },
  {
    name: 'TAILWIND CSS',
    category: 'frontend',
    role: 'Utility-First Styling Engine',
    highlight: 'Mathematical spacing scale, zero runtime CSS overhead, and fluid responsive design.',
    status: 'core'
  },
  {
    name: 'GSAP & MOTION',
    category: 'craft',
    role: 'Interaction & Motion Runtime',
    highlight: 'Silky 60fps scroll triggers, coordinate pinning, and spring-based tactile gestures.',
    status: 'specialized'
  },
  {
    name: 'NODE.JS',
    category: 'backend',
    role: 'Runtime Environment',
    highlight: 'High-concurrency asynchronous I/O powering microservices and real-time gateways.',
    status: 'core'
  },
  {
    name: 'POSTGRESQL',
    category: 'backend',
    role: 'Relational Database Engine',
    highlight: 'ACID transactional guarantees, complex JSON queries, and pgvector semantic indexing.',
    status: 'core'
  },
  {
    name: 'SUPABASE',
    category: 'backend',
    role: 'Cloud Backend Infrastructure',
    highlight: 'Instant row-level security, realtime subscriptions, and managed Postgres hosting.',
    status: 'production'
  },
  {
    name: 'REDIS',
    category: 'backend',
    role: 'In-Memory Cache & Message Broker',
    highlight: 'Sub-millisecond token storage, distributed locks, and pub/sub streaming queues.',
    status: 'production'
  },
  {
    name: 'AWS',
    category: 'infra',
    role: 'Cloud Services & Infrastructure',
    highlight: 'Elastic ECS containers, S3 media distribution, CloudFront CDN, and IAM roles.',
    status: 'production'
  },
  {
    name: 'VERCEL',
    category: 'infra',
    role: 'Edge & Serverless Deployment',
    highlight: 'Zero-config global edge networks, automated preview pipelines, and instant rollbacks.',
    status: 'production'
  },
  {
    name: 'DOCKER',
    category: 'infra',
    role: 'Containerization Standard',
    highlight: 'Reproducible development environments and immutable production container builds.',
    status: 'production'
  },
  {
    name: 'GEMINI API',
    category: 'backend',
    role: 'Multimodal Generative AI',
    highlight: 'High-speed reasoning, long-context analysis, and structured JSON tool calling.',
    status: 'specialized'
  },
  {
    name: 'FIGMA',
    category: 'craft',
    role: 'Design System Workspace',
    highlight: 'Component token design systems, interactive prototypes, and layout specifications.',
    status: 'specialized'
  }
];

export const TECH_CATEGORIES = [
  { id: 'all', label: 'All Technologies' },
  { id: 'frontend', label: 'Frontend & UI' },
  { id: 'backend', label: 'Backend & Data' },
  { id: 'infra', label: 'Infra & Cloud' },
  { id: 'craft', label: 'Craft & Motion' }
] as const;
