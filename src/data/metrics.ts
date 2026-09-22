import { StudioMetric, TestimonialItem } from '../types';

export const STUDIO_METRICS: StudioMetric[] = [
  {
    id: 'products',
    value: 24,
    suffix: '+',
    label: 'DIGITAL PRODUCTS',
    subtext: 'Web platforms, high-throughput SaaS engines, and headless commerce stores deployed to live production.'
  },
  {
    id: 'years',
    value: 8,
    suffix: '+',
    label: 'YEARS IN PRODUCTION',
    subtext: 'Continuous experience building mission-critical software systems across fintech, commerce, and AI.'
  },
  {
    id: 'technologies',
    value: 15,
    suffix: '+',
    label: 'CORE TECHNOLOGIES',
    subtext: 'Mastered production toolsets ranging from Next.js and React to PostgreSQL, Docker, and distributed systems.'
  },
  {
    id: 'focus',
    value: 99.4,
    suffix: '%',
    label: 'ON-TIME MILESTONES',
    subtext: 'Engineering discipline and honest technical scoping ensure our deliverables arrive without scope runaway.'
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    quote: 'We needed someone who understood both product intuition and hardcore engineering. Developer Studio delivered an order execution terminal that eliminated all our UI latency overnight.',
    author: 'Elena Vance',
    role: 'VP of Product',
    company: 'Horizon Capital Markets',
    project: 'Horizon Fintech Platform'
  },
  {
    quote: 'Their architectural discipline transformed how our remote team works. The CRDT collaborative engine has run for over a year with zero merge conflicts or data loss incidents.',
    author: 'Marcus Sterling',
    role: 'Chief Technology Officer',
    company: 'Kanso Software Systems',
    project: 'Kanso Workspace OS'
  },
  {
    quote: 'Our mobile conversion spiked by 44% in the first two months. They transformed our sluggish luxury storefront into an editorial work of art that loads under 300 milliseconds globally.',
    author: 'Amélie Laurent',
    role: 'Head of Digital Commerce',
    company: 'Maison & Atelier Group',
    project: 'Atelier Headless Commerce'
  }
];
