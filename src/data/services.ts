import { ServiceItem } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'web-apps',
    number: '01',
    categoryTag: 'ORDER 001 / WEB ARCHITECTURE',
    title: 'WEB APPLICATIONS',
    summary: 'High-performance interactive web applications engineered with Next.js, React, and strict TypeScript. Built for complex user journeys and sub-second interactions.',
    deliverables: [
      'Full-stack Next.js / React application',
      'Client-side state & cache invalidation engine',
      'End-to-end type safety & unit/integration test suites',
      'Accessibility AA compliance & Core Web Vitals optimization'
    ],
    specs: {
      latency: '< 150ms TTFB globally',
      architecture: 'SSR + Edge Streaming + Island Hydration',
      stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS']
    }
  },
  {
    id: 'saas-products',
    number: '02',
    categoryTag: 'ORDER 002 / CLOUD PLATFORMS',
    title: 'SAAS PRODUCTS',
    summary: 'Multi-tenant subscription software with reliable data isolation, billing integrations, role-based access control, and intuitive workspace administration.',
    deliverables: [
      'Multi-tenant database schema & tenancy routing',
      'Stripe customer billing & webhook reconciliation',
      'Granular RBAC authorization matrices',
      'Real-time workspace collaboration & event sync'
    ],
    specs: {
      latency: '99.98% uptime SLA',
      architecture: 'PostgreSQL + Prisma / Drizzle + Edge middleware',
      stack: ['Node.js', 'PostgreSQL', 'Supabase', 'Redis']
    }
  },
  {
    id: 'ecommerce',
    number: '03',
    categoryTag: 'ORDER 003 / DIGITAL COMMERCE',
    title: 'E-COMMERCE',
    summary: 'Custom headless storefronts engineered for fast checkout conversion, international multi-currency catalogs, and resilient inventory sync.',
    deliverables: [
      'Headless commerce architecture with zero-lag product filtering',
      'Localized checkout flow with regional tax & shipping calculators',
      'Automated stock reservations & order fulfillment webhooks',
      'Search engine optimized product schema & OpenGraph cards'
    ],
    specs: {
      latency: '< 80ms catalog lookups',
      architecture: 'Headless Shopify / Medusa + Next.js storefront',
      stack: ['Shopify Storefront API', 'Next.js', 'Stripe', 'Algolia']
    }
  },
  {
    id: 'mobile-experiences',
    number: '04',
    categoryTag: 'ORDER 004 / CROSS-PLATFORM',
    title: 'MOBILE EXPERIENCES',
    summary: 'Fluid cross-platform mobile apps and responsive progressive web applications delivering 60fps gesture interactions and offline synchronization.',
    deliverables: [
      'Native-feel touch interactions & haptic feedback loops',
      'Offline-first SQLite local persistence & optimistic updates',
      'Background task sync & push notification pipelines',
      'App Store / Play Store automated CI/CD release builds'
    ],
    specs: {
      latency: '60fps locked rendering',
      architecture: 'React Native / Expo + SQLite + Turborepo',
      stack: ['React Native', 'Expo', 'TypeScript', 'Tailwind']
    }
  },
  {
    id: 'api-backend',
    number: '05',
    categoryTag: 'ORDER 005 / DISTRIBUTED SYSTEMS',
    title: 'API / BACKEND',
    summary: 'Resilient microservices, REST & GraphQL endpoints, and distributed queue architectures designed for high concurrency and auditability.',
    deliverables: [
      'Contract-first OpenAPI & tRPC API schemas',
      'Asynchronous job queue & background worker pools',
      'Zero-downtime database migration tooling',
      'Distributed telemetry, structured logging & Prometheus metrics'
    ],
    specs: {
      latency: '< 25ms internal RPC overhead',
      architecture: 'Distributed Node / Go services + Postgres + Redis',
      stack: ['Node.js', 'Express / Fastify', 'PostgreSQL', 'Docker']
    }
  },
  {
    id: 'ai-products',
    number: '06',
    categoryTag: 'ORDER 006 / MACHINE INTELLIGENCE',
    title: 'AI PRODUCTS',
    summary: 'Production-grade LLM interfaces, retrieval-augmented generation (RAG) pipelines, and autonomous agent orchestration with strict evaluation rails.',
    deliverables: [
      'Streaming token interfaces with markdown & code syntax renderers',
      'Hybrid semantic vector search & embeddings database indexing',
      'Cost, rate-limiting & latency telemetry dashboards',
      'Hallucination guardrails & structured JSON output enforcement'
    ],
    specs: {
      latency: 'Instant streaming TTFT',
      architecture: 'Gemini / OpenAI API + pgvector + Server-sent events',
      stack: ['Google Gemini API', 'TypeScript', 'pgvector', 'LangChain']
    }
  }
];
