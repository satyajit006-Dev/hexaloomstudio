export interface NavItem {
  id: string;
  label: string;
  sceneNumber: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  categoryTag: string;
  title: string;
  summary: string;
  deliverables: string[];
  specs: {
    latency: string;
    architecture: string;
    stack: string[];
  };
}

export interface TechnologyItem {
  name: string;
  category: 'frontend' | 'backend' | 'infra' | 'craft';
  role: string;
  highlight: string;
  status: 'production' | 'core' | 'specialized';
}

export interface CaseStudyStage {
  step: '01' | '02' | '03' | '04' | '05';
  title: 'Problem' | 'Approach' | 'Design' | 'Engineering' | 'Result';
  headline: string;
  description: string;
  bulletPoints: string[];
  codeOrMetricSnippet?: string;
  visualData: {
    metricValue?: string;
    metricLabel?: string;
    diagramType: 'latency' | 'architecture' | 'schema' | 'benchmark' | 'pipeline';
  };
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  client: string;
  year: string;
  tagline: string;
  category: string;
  stack: string[];
  summary: string;
  impactMetrics: { label: string; value: string }[];
  caseStudyStages: CaseStudyStage[];
}

export interface ProcessStage {
  number: string;
  name: string;
  label: string;
  duration: string;
  description: string;
  deliverables: string[];
  gateCriteria: string;
}

export interface StudioMetric {
  id: string;
  value: number;
  suffix: string;
  label: string;
  subtext: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  project: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

export interface ClientInquiry extends ContactFormData {
  id: string;
  createdAt: string;
  status: 'new' | 'reviewed' | 'contacted' | 'archived';
  source?: string;
}

export interface SeniorDeveloper {
  name: string;
  role: string;
  portfolioUrl: string;
  domain: string;
  bio: string;
  skills: string[];
  initials: string;
  featuredProjects?: string[];
}

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}
