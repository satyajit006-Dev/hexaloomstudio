import { ProcessStage } from '../types';

export const PROCESS_STAGES: ProcessStage[] = [
  {
    number: '01',
    name: 'DISCOVER',
    label: 'Architecture & Constraints Audit',
    duration: 'Week 1',
    description: 'We dissect your product vision, system bottlenecks, user mental models, and technical constraints before writing a single line of code.',
    deliverables: [
      'Technical Architecture RFC document',
      'Data model & entity relationship mapping',
      'API surface area & integration audit',
      'Key milestone & sprint timeline agreement'
    ],
    gateCriteria: 'Signed architectural specification & agreed service-level objectives.'
  },
  {
    number: '02',
    name: 'PLAN',
    label: 'Roadmap & System Schema',
    duration: 'Week 2',
    description: 'Constructing the technical blueprint. We lock schemas, define state machines, choose optimal database indices, and design deployment pipelines.',
    deliverables: [
      'Strict TypeScript domain interfaces',
      'OpenAPI 3.1 & tRPC contract definitions',
      'Database migration scripts & seed factories',
      'Performance budgets & latency thresholds'
    ],
    gateCriteria: 'Approved interface contracts and verified mock responses.'
  },
  {
    number: '03',
    name: 'DESIGN',
    label: 'Design Systems & Motion Specs',
    duration: 'Weeks 2–3',
    description: 'Crafting editorial user experiences. High-contrast typography, mathematical spacing scales, tactile micro-gestures, and accessible components.',
    deliverables: [
      'Interactive Figma design system token library',
      'Responsive component layout specifications (320px–1920px)',
      'Motion timing curves & keyboard accessibility specs',
      'WCAG AA contrast audits for dark and light modes'
    ],
    gateCriteria: 'Design token freeze and prototype approval by primary stakeholders.'
  },
  {
    number: '04',
    name: 'DEVELOP',
    label: 'Core Engineering Sprints',
    duration: 'Weeks 4–7',
    description: 'Disciplined implementation. Daily trunk commits, automated testing, continuous staging deployments, and strict zero-slop component execution.',
    deliverables: [
      'Modular client and server codebases',
      'Live staging environment with continuous CI/CD',
      'Edge routing, caching, and database indexing',
      'Unit & integration test suites with >90% coverage'
    ],
    gateCriteria: 'Green test suite, verified edge performance, and feature completeness.'
  },
  {
    number: '05',
    name: 'TEST',
    label: 'Hardening & Stress Testing',
    duration: 'Week 8',
    description: 'Rigorous validation under pressure. Synthetic load tests, mobile regression passes, accessibility screening, and security penetration checks.',
    deliverables: [
      'Simulated load testing report (10k concurrent users)',
      'Cross-browser & cross-device compatibility audit',
      'Automated Lighthouse performance reports (Score: 95+)',
      'Security headers & vulnerability scanner pass'
    ],
    gateCriteria: 'Zero critical/high vulnerabilities and all performance budgets satisfied.'
  },
  {
    number: '06',
    name: 'LAUNCH',
    label: 'Zero-Downtime Rollout & Telemetry',
    duration: 'Continuous',
    description: 'Smooth deployment to production. Blue/green traffic routing, real-time error telemetry, automated health monitoring, and documentation handover.',
    deliverables: [
      'Production deployment on edge infrastructure',
      'Real-time error logging & telemetry alerts',
      'Operational runbooks & developer documentation',
      'Post-launch 30-day monitoring & warranty support'
    ],
    gateCriteria: '100% production traffic cutover with zero rollback triggers.'
  }
];
