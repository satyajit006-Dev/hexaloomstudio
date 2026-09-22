import { ProjectItem } from '../types';

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'project-horizon',
    number: '01',
    title: 'Horizon Capital Platform',
    client: 'Horizon Global Securities',
    year: '2025',
    tagline: 'High-frequency institutional wealth terminal & algorithmic risk visualizer',
    category: 'Fintech Platform',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'WebSockets', 'PostgreSQL'],
    summary: 'A sub-second financial asset terminal processing real-time order books, portfolio stress testing, and multi-broker liquidity execution in a high-contrast editorial UI.',
    impactMetrics: [
      { label: 'Latency Reduction', value: '-68%' },
      { label: 'Daily Trading Volume', value: '$420M+' },
      { label: 'Sub-second Updates', value: '45ms' },
      { label: 'Client Retention', value: '99.2%' }
    ],
    caseStudyStages: [
      {
        step: '01',
        title: 'Problem',
        headline: 'Legacy monolithic architecture suffered from UI freezing during high market volatility.',
        description: 'Portfolio managers experienced 4.2-second chart freezes and stale price caches during market open hours. The existing React codebase had unmemoized state propagation across 140+ nested components.',
        bulletPoints: [
          'High frame-rate drops during market opening bell surges',
          'Database read locks on concurrent portfolio rebalancing runs',
          'Inconsistent trade execution confirmations across regional desks'
        ],
        codeOrMetricSnippet: 'OLD_LATENCY: 4200ms -> STALL_RATE: 18.4% of sessions',
        visualData: {
          metricValue: '4,200ms',
          metricLabel: 'Legacy Initial Data Stalls',
          diagramType: 'latency'
        }
      },
      {
        step: '02',
        title: 'Approach',
        headline: 'Decoupled presentation from calculation via Web Workers and ring buffers.',
        description: 'We segregated high-throughput market tick streams into dedicated Web Workers, feeding a circular memory buffer to protect the main thread from DOM thrashing.',
        bulletPoints: [
          'Ring-buffer queue pattern handling 50,000 events/sec',
          'Server-sent event failover to WebSocket heartbeat clusters',
          'Incremental static regeneration for financial report summaries'
        ],
        codeOrMetricSnippet: 'WorkerThread.postMessage({ buffer: ringBuffer.getSlice() })',
        visualData: {
          metricValue: '50k/sec',
          metricLabel: 'Event Throughput Capacity',
          diagramType: 'pipeline'
        }
      },
      {
        step: '03',
        title: 'Design',
        headline: 'Dense financial typography paired with café-warm dark neutrals for 12-hour desk sessions.',
        description: 'Traders spend up to 14 hours per day looking at screens. We replaced harsh neon palettes with balanced espresso `#24211D` frames, warm copper `#B56A3A` status accents, and tabular monospace numerals.',
        bulletPoints: [
          'Monospace tabular figures preventing numeric jitter during re-renders',
          'WCAG AAA contrast ratios across all risk rating badges',
          'Custom ergonomic keyboard shortcuts for rapid multi-leg trade execution'
        ],
        codeOrMetricSnippet: 'font-feature-settings: "tnum" on, "zero" on;',
        visualData: {
          metricValue: 'AAA',
          metricLabel: 'Contrast Ratio Compliance',
          diagramType: 'schema'
        }
      },
      {
        step: '04',
        title: 'Engineering',
        headline: 'Edge routing with distributed read replicas and strict TypeScript domain schemas.',
        description: 'Implemented zero-downtime blue/green deployments on global Edge clusters. Applied Zod runtime validation at every network boundary to eliminate silent payload regressions.',
        bulletPoints: [
          'Strict TypeScript schema enforcement from database models to frontend forms',
          'Redis cluster pub/sub routing orders to geolocated matching engines',
          'Comprehensive Vitest and Playwright regression matrix with 96% coverage'
        ],
        codeOrMetricSnippet: 'const TradeTicket = z.object({ symbol: z.string(), qty: z.number().positive() });',
        visualData: {
          metricValue: '96.2%',
          metricLabel: 'Automated Test Coverage',
          diagramType: 'architecture'
        }
      },
      {
        step: '05',
        title: 'Result',
        headline: '68% latency drop, zero missed order ticks, and seamless compliance sign-off.',
        description: 'Horizon deployed the platform across 14 institutional trading desks globally, handling over $420M in daily transaction volume with 99.99% uptime over four quarters.',
        bulletPoints: [
          'Sub-50ms glass-to-glass order tick rendering latency',
          'Zero reported UI lockups during record Federal Reserve volatility events',
          'Adopted as the flagship digital product for enterprise fund onboarding'
        ],
        codeOrMetricSnippet: 'STATUS: ACTIVE_PRODUCTION // 99.99% UPTIME OVER 365 DAYS',
        visualData: {
          metricValue: '45ms',
          metricLabel: 'End-to-End Tick Latency',
          diagramType: 'benchmark'
        }
      }
    ]
  },
  {
    id: 'project-kanso',
    number: '02',
    title: 'Kanso Workspace OS',
    client: 'Kanso Software Systems',
    year: '2025',
    tagline: 'Collaborative canvas & document operating system for engineering squads',
    category: 'SaaS Product',
    stack: ['React', 'TypeScript', 'CRDTs', 'Node.js', 'Supabase', 'Tailwind'],
    summary: 'A friction-free spatial markdown and technical diagramming tool featuring local-first CRDT synchronization, offline durability, and zero-latency keyboard flows.',
    impactMetrics: [
      { label: 'Active Teams', value: '1,800+' },
      { label: 'Conflict Resolution', value: '100% Auto' },
      { label: 'Offline Sync Latency', value: '< 20ms' },
      { label: 'User Satisfaction', value: '4.9 / 5' }
    ],
    caseStudyStages: [
      {
        step: '01',
        title: 'Problem',
        headline: 'Remote engineering teams lost document edits during flaky offline connections.',
        description: 'Traditional lock-based collaborative editors caused data overwrites and frustrated team workflows whenever engineers commuted or flew with unstable network connectivity.',
        bulletPoints: [
          'Destructive merge conflicts on concurrent markdown editing',
          'Sluggish canvas zooming with more than 300 diagram nodes',
          'Fragmented storage between code snippets and architectural diagrams'
        ],
        codeOrMetricSnippet: 'MERGE_FAILURES: 12.3% per week prior to rebuild',
        visualData: {
          metricValue: '12.3%',
          metricLabel: 'Weekly Document Collision Rate',
          diagramType: 'latency'
        }
      },
      {
        step: '02',
        title: 'Approach',
        headline: 'Built on conflict-free replicated data types (CRDTs) with IndexedDB local persistence.',
        description: 'Engineered an offline-first architecture where every keystroke immediately persists to the local device before broadcasting delta mutations to the server.',
        bulletPoints: [
          'Yjs CRDT integration supporting zero-conflict multi-cursor editing',
          'IndexedDB cache enabling instant cold boots in under 120ms',
          'Differential compressed binary synchronization over WebSockets'
        ],
        codeOrMetricSnippet: 'Y.applyUpdate(doc, update); localDB.persist(doc);',
        visualData: {
          metricValue: '120ms',
          metricLabel: 'Cold Boot Startup Time',
          diagramType: 'pipeline'
        }
      },
      {
        step: '03',
        title: 'Design',
        headline: 'Minimalist paper-and-ink aesthetics with intentional distraction-free focus modes.',
        description: 'Carefully designed around typographic whitespace, warm cream canvas backgrounds, and contextual command palettes to keep engineers in deep flow state.',
        bulletPoints: [
          'Full keyboard command palette (`Cmd + K`) for 100% of workspace actions',
          'Dynamic daylight and café warm themes with zero visual glare',
          'Tactile micro-animations on node connections and block nesting'
        ],
        codeOrMetricSnippet: 'palette.execute("format.codeblock", { lang: "typescript" });',
        visualData: {
          metricValue: '100%',
          metricLabel: 'Keyboard Navigability',
          diagramType: 'schema'
        }
      },
      {
        step: '04',
        title: 'Engineering',
        headline: 'Virtual canvas viewport rendering over 10,000 spatial elements at 60 frames/sec.',
        description: 'Implemented spatial quad-tree partitioning so only elements within the immediate camera viewport are rendered, unlocking silky smooth panning.',
        bulletPoints: [
          'Quad-tree spatial culling eliminating offscreen DOM elements',
          'Strict optimistic UI updates with deterministic server rollback guards',
          'Granular workspace RBAC and tenant encryption at rest'
        ],
        codeOrMetricSnippet: 'const visibleNodes = quadTree.query(viewportBounds);',
        visualData: {
          metricValue: '10,000+',
          metricLabel: 'Smooth Viewport Node Capacity',
          diagramType: 'architecture'
        }
      },
      {
        step: '05',
        title: 'Result',
        headline: 'Over 1,800 active squads, zero data loss incidents, and rapid enterprise expansion.',
        description: 'Kanso scaled effortlessly to enterprise accounts, earning praise across Hacker News and design engineering communities for its sheer responsiveness.',
        bulletPoints: [
          'Zero document merge conflicts reported across 450,000 edits',
          'Sub-20ms local sync turnaround across distributed teams',
          '4.9 out of 5 customer satisfaction rating in product surveys'
        ],
        codeOrMetricSnippet: 'TOTAL_SAVED_HOURS: 14,200+ team collaboration hours',
        visualData: {
          metricValue: '0',
          metricLabel: 'Merge Conflicts in Production',
          diagramType: 'benchmark'
        }
      }
    ]
  },
  {
    id: 'project-atelier',
    number: '03',
    title: 'Atelier Headless Commerce',
    client: 'Maison & Atelier Luxury Group',
    year: '2024',
    tagline: 'Global multi-currency headless flagship with sub-second edge routing',
    category: 'E-Commerce',
    stack: ['Next.js', 'TypeScript', 'Shopify Storefront API', 'Tailwind', 'Vercel Edge'],
    summary: 'A luxury editorial commerce experience built on an API-first stack, featuring multi-currency checkout, dynamic lookbooks, and high-fidelity scroll storytelling.',
    impactMetrics: [
      { label: 'Mobile Conversion', value: '+44%' },
      { label: 'Average Page Load', value: '280ms' },
      { label: 'Lighthouse Score', value: '100 / 100' },
      { label: 'Global Markets', value: '38 Countries' }
    ],
    caseStudyStages: [
      {
        step: '01',
        title: 'Problem',
        headline: 'Heavy monolithic store template resulted in 5.4-second mobile page loads.',
        description: 'The brand was losing high-intent luxury shoppers because page transitions were sluggish and image-heavy catalog pages suffered from cumulative layout shifts.',
        bulletPoints: [
          '5.4s Time to Interactive on mobile 4G networks',
          'Frequent checkout abandonment during multi-currency recalculations',
          'Inability to create editorial layout stories without breaking catalog inventory'
        ],
        codeOrMetricSnippet: 'TTI: 5400ms -> BOUNCE_RATE: 58% on mobile entry',
        visualData: {
          metricValue: '5.4s',
          metricLabel: 'Old Mobile Load Time',
          diagramType: 'latency'
        }
      },
      {
        step: '02',
        title: 'Approach',
        headline: 'Headless Next.js architecture deployed directly to regional Edge networks.',
        description: 'We separated the luxury presentation layer from the checkout engine, pre-generating product pages while fetching stock and pricing dynamically at the edge.',
        bulletPoints: [
          'Incremental Static Regeneration ensuring real-time catalog accuracy',
          'Edge geolocation cookies serving localized currency and tax rules',
          'Optimized WebP/AVIF imagery pipeline with blur-hash placeholders'
        ],
        codeOrMetricSnippet: 'export const revalidate = 60; // Instant Edge revalidation',
        visualData: {
          metricValue: '280ms',
          metricLabel: 'New Global Load Time',
          diagramType: 'pipeline'
        }
      },
      {
        step: '03',
        title: 'Design',
        headline: 'Editorial fashion magazine layout with precision typography and tactile micro-gestures.',
        description: 'Engineered an interactive lookbook experience where garments can be inspected with fluid zoom gestures and added to cart without leaving the editorial context.',
        bulletPoints: [
          'Seamless slide-out cart drawer with instant tax and shipping estimations',
          'Monochromatic warm cafe and espresso framing that celebrates product photography',
          'Keyboard and screen-reader accessible product gallery carousels'
        ],
        codeOrMetricSnippet: '<LookbookScroller items={collection} onQuickAdd={handleCart} />',
        visualData: {
          metricValue: '100/100',
          metricLabel: 'Lighthouse Accessibility Score',
          diagramType: 'schema'
        }
      },
      {
        step: '04',
        title: 'Engineering',
        headline: 'Resilient Shopify Storefront API proxy with fallback inventory caching.',
        description: 'Constructed an edge-caching layer that buffers catalog traffic during seasonal drops, protecting the checkout backend from flash sale surges.',
        bulletPoints: [
          'Stale-while-revalidate caching headers ensuring 100% catalog availability',
          'End-to-end type safety against Shopify GraphQL schemas',
          'Automated webhook ingestion pipeline syncing catalog changes in <3 seconds'
        ],
        codeOrMetricSnippet: 'const { product } = await fetchStorefront(ProductByHandle, { handle });',
        visualData: {
          metricValue: '<3s',
          metricLabel: 'Catalog Sync Propagation',
          diagramType: 'architecture'
        }
      },
      {
        step: '05',
        title: 'Result',
        headline: 'Mobile conversion skyrocketed by 44% with sub-second page loads worldwide.',
        description: 'The new flagship storefront elevated the brand international presence across 38 countries while earning international design awards.',
        bulletPoints: [
          '+44% increase in mobile checkout conversion rate within 60 days',
          'Lighthouse Performance, Accessibility, Best Practices, and SEO all at 100',
          'Zero cart downtime during high-traffic Black Friday collection launch'
        ],
        codeOrMetricSnippet: 'TOTAL_REVENUE_LIFT: +62% YoY across European and US markets',
        visualData: {
          metricValue: '+44%',
          metricLabel: 'Conversion Lift',
          diagramType: 'benchmark'
        }
      }
    ]
  },
  {
    id: 'project-neuralflow',
    number: '04',
    title: 'NeuralFlow Orchestrator',
    client: 'NeuralFlow Labs',
    year: '2024',
    tagline: 'Multi-agent LLM pipeline orchestrator & deterministic evaluation suite',
    category: 'AI Product',
    stack: ['TypeScript', 'Node.js', 'Google Gemini API', 'pgvector', 'Tailwind'],
    summary: 'A visual control center for designing, testing, and monitoring autonomous agent execution graphs with streaming tokens and deterministic security guardrails.',
    impactMetrics: [
      { label: 'Agent Steps/Sec', value: '12,500' },
      { label: 'Token Cost Reduction', value: '-35%' },
      { label: 'Evaluation Precision', value: '99.1%' },
      { label: 'Enterprise Adopters', value: '45+' }
    ],
    caseStudyStages: [
      {
        step: '01',
        title: 'Problem',
        headline: 'Enterprise teams struggled with non-deterministic LLM agent failures in production.',
        description: 'Developers could not debug multi-turn agent hallucination loops, trace token runaway costs, or enforce safety guardrails across complex tool-calling chains.',
        bulletPoints: [
          'Lack of step-by-step visibility into agent reasoning trees',
          'Uncontrolled API token spend during recursive agent error states',
          'Missing automated regression testing for system prompt modifications'
        ],
        codeOrMetricSnippet: 'RUNAWAY_COST_EVENTS: 23 incidents before observability setup',
        visualData: {
          metricValue: '23',
          metricLabel: 'Runaway Loop Incidents',
          diagramType: 'latency'
        }
      },
      {
        step: '02',
        title: 'Approach',
        headline: 'Visual directed acyclic graph (DAG) runtime with deterministic validation gates.',
        description: 'Architected an execution pipeline where each agent tool invocation must pass validation schemas and semantic boundary checks before execution.',
        bulletPoints: [
          'Interactive node-based graph editor with live token stream inspector',
          'Semantic vector search caching to avoid redundant LLM queries',
          'Integrated Gemini API streaming with server-sent event visualization'
        ],
        codeOrMetricSnippet: 'await pipeline.executeDAG(agentGraph, { maxDepth: 6, safety: true });',
        visualData: {
          metricValue: '12.5k',
          metricLabel: 'Tokens Analyzed per Second',
          diagramType: 'pipeline'
        }
      },
      {
        step: '03',
        title: 'Design',
        headline: 'Technical instrument panel inspired by precision radar and audio mastering boards.',
        description: 'Every token stream is rendered in real-time with latency millisecond badges, confidence metrics, and collapsible tool payload inspectors.',
        bulletPoints: [
          'High-density data views tailored for AI research engineers',
          'Color-coded token probability markers and latency breakdowns',
          'Exportable audit traces formatted for compliance reviews'
        ],
        codeOrMetricSnippet: '<TokenStreamMeter latency={item.ttft} tokensPerSec={item.tps} />',
        visualData: {
          metricValue: '99.1%',
          metricLabel: 'Evaluation Precision',
          diagramType: 'schema'
        }
      },
      {
        step: '04',
        title: 'Engineering',
        headline: 'Distributed worker pools executing concurrent model evaluations against pgvector.',
        description: 'Engineered a high-concurrency evaluation runner using PostgreSQL with pgvector embeddings, executing 5,000 prompt test cases in under 45 seconds.',
        bulletPoints: [
          'PostgreSQL + pgvector for sub-10ms semantic distance comparisons',
          'Asynchronous token budget limiter preventing unexpected cost spikes',
          'Modular connector architecture for Gemini, custom embeddings, and private endpoints'
        ],
        codeOrMetricSnippet: 'SELECT id, 1 - (embedding <=> $query) as similarity FROM eval_cases ORDER BY similarity DESC LIMIT 5;',
        visualData: {
          metricValue: '<10ms',
          metricLabel: 'Vector Similarity Query Time',
          diagramType: 'architecture'
        }
      },
      {
        step: '05',
        title: 'Result',
        headline: '35% drop in enterprise token costs and 99.1% reliability across production agents.',
        description: 'NeuralFlow became the mission-critical orchestration platform for 45+ enterprise engineering teams deploying customer-facing AI agents.',
        bulletPoints: [
          '35% reduction in aggregate API expenses through intelligent prompt caching',
          'Elimination of silent multi-turn hallucination loops in client apps',
          'Adopted by Fortune 500 financial and healthcare developer teams'
        ],
        codeOrMetricSnippet: 'ACTIVE_AGENTS: 4,200+ // SYSTEM_STATUS: ALL SYSTEMS NOMINAL',
        visualData: {
          metricValue: '-35%',
          metricLabel: 'Cloud Token Cost Reduction',
          diagramType: 'benchmark'
        }
      }
    ]
  }
];
