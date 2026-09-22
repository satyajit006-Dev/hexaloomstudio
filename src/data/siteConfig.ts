import { SeniorDeveloper } from '../types';

export const SITE_CONFIG = {
  name: 'Hexaloom Studio',
  tagline: 'Code. Design. Innovate.',
  motto: 'Digital products. Engineered properly.',
  description: 'Hexaloom Studio delivers architectural full-stack web applications, scalable SaaS platforms, and resilient cloud systems with obsessive craftsmanship.',
  address: {
    street: 'Tech District, Infocity',
    city: 'Bhubaneswar',
    state: 'Odisha',
    country: 'India',
    postalCode: '751024',
    coordinates: {
      lat: 20.3540,
      lng: 85.8190
    }
  },
  contact: {
    email: 'hexaloomstudio@gmail.com',
    phone: '+919692007455',
    displayPhone: '+91 96920 07455',
    secondaryPhone: '+917606854052',
    displaySecondaryPhone: '+91 76068 54052',
    whatsappNumber: '919692007455',
    whatsappMessage: "Hi Hexaloom Studio, I'd like to discuss a new software project.",
    whatsappUrl: 'https://wa.me/919692007455?text=Hi%20Hexaloom%20Studio%2C%20I%27d%20like%20to%20discuss%20a%20new%20software%20project.',
    instagramHandle: '@hexaloom_studio',
    instagramUrl: 'https://instagram.com/hexaloom_studio',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Infocity+Bhubaneswar+Odisha+India',
    appleMapsUrl: 'https://maps.apple.com/?q=Infocity+Bhubaneswar+Odisha+India'
  },
  seniorDevelopers: [
    {
      name: 'Ritesh Pati',
      role: 'Senior Developer & Full-Stack Architect',
      portfolioUrl: 'https://riteshpati.indevs.in/',
      domain: 'riteshpati.indevs.in',
      bio: 'Architecting resilient cloud infrastructure, distributed microservices, scalable databases, and full-stack enterprise applications.',
      skills: ['Distributed Systems', 'Cloud & DevOps', 'Node.js & TypeScript', 'Database Optimization', 'High-Load APIs'],
      initials: 'RP',
      featuredProjects: ['Distributed Core Engine', 'Cloud Microservices Pipeline']
    },
    {
      name: 'Satyajit Nayak',
      role: 'Senior Developer & Frontend Systems Architect',
      portfolioUrl: 'https://satyajitportfolio-amber.vercel.app/',
      domain: 'satyajitportfolio-amber.vercel.app',
      bio: 'Crafting responsive design systems, headless frontend architectures, interaction design, and sub-second web performance.',
      skills: ['React & Next.js', 'Sub-Second Performance', 'Design Systems & UI/UX', 'State Engines', 'Interactive Shaders'],
      initials: 'SN',
      featuredProjects: ['Interactive Component Matrix', 'Zero-Latency Frontend Core']
    }
  ] as SeniorDeveloper[],
  socials: [
    { label: 'Instagram', url: 'https://instagram.com/hexaloom_studio' },
    { label: 'WhatsApp', url: 'https://wa.me/919692007455?text=Hi%20Hexaloom%20Studio%2C%20I%27d%20like%20to%20discuss%20a%20new%20software%20project.' },
    { label: 'Email', url: 'mailto:hexaloomstudio@gmail.com' },
    { label: 'GitHub', url: 'https://github.com' },
    { label: 'LinkedIn', url: 'https://linkedin.com' }
  ],
  navItems: [
    { id: 'hero', label: 'HOME', sceneNumber: '01' },
    { id: 'philosophy', label: 'PHILOSOPHY', sceneNumber: '02' },
    { id: 'team', label: 'LEADERSHIP', sceneNumber: '03' },
    { id: 'services', label: 'SERVICES', sceneNumber: '04' },
    { id: 'tech-stack', label: 'TECHNOLOGY', sceneNumber: '05' },
    { id: 'selected-work', label: 'WORK', sceneNumber: '06' },
    { id: 'case-study', label: 'CASE STUDY', sceneNumber: '07' },
    { id: 'process', label: 'PROCESS', sceneNumber: '08' },
    { id: 'metrics', label: 'METRICS', sceneNumber: '09' },
    { id: 'testimonials', label: 'TRUST', sceneNumber: '10' },
    { id: 'contact', label: 'CONTACT', sceneNumber: '11' }
  ],
  projectTypes: [
    'Web Application (Next.js / React)',
    'SaaS Product Architecture',
    'Headless E-Commerce Flagship',
    'Distributed API / Cloud Backend',
    'AI Product & LLM Orchestration',
    'Technical Audit & Performance Tuning'
  ],
  budgetTiers: [
    '$15k – $30k (Rapid Prototype / MVP)',
    '$30k – $60k (Full-scale Production Build)',
    '$60k – $120k+ (Enterprise Platform Architecture)',
    'Ongoing Engineering Retainer'
  ],
  timelines: [
    'Immediate (Next 2-4 weeks)',
    'Next Quarter (1-2 months)',
    'Flexible Exploration'
  ]
};
