// ============================================================
// PROFILE DATA — edit this file to update the entire site.
// No component code needs to change.
// ============================================================

export const identity = {
  name: 'Tashee Bisht',
  handle: 't4shee',
  title: 'AI Security Engineer & Researcher',
  tagline: 'Building intelligent systems that defend intelligent systems.',
  location: 'India',
  github: 'https://github.com/t4shee',
  linkedin: 'https://www.linkedin.com/in/tasheebisht/',
  // Deliberately no email / phone — contact routes through LinkedIn.
  summary:
    'Final-year B.Tech–M.Tech (CSE, Cyber Security) student at National Forensic Sciences University, working at the intersection of machine learning and security engineering. I build ML-driven threat detection systems, study how AI systems fail under attack, and have trained inside real SOC environments monitoring live threats. National-level hackathon winner, IndiaSkills medallist, GATE CSE qualified.',
};

export const stats = [
  { value: '9.05', label: 'CGPA / 10', detail: 'B.Tech–M.Tech, CSE (Cyber Security)' },
  { value: '4', label: 'Internships', detail: 'IIT Delhi · NIC · Govt. of India · Industry' },
  { value: '2×', label: 'National hackathon wins', detail: 'CipherCop 2025 · Avishkar S3' },
  { value: '1st', label: 'IndiaSkills NE Regional', detail: 'Cyber Security domain' },
];

export const education = {
  school: 'National Forensic Sciences University',
  degree: 'B.Tech – M.Tech, Computer Science & Engineering (Cyber Security)',
  period: 'Aug 2022 – Present',
  gpa: '9.05 / 10',
  location: 'Agartala, Tripura',
  coursework: [
    'Data Structures & Algorithm Analysis',
    'Artificial Intelligence',
    'Systems Programming',
    'Software Methodology',
    'Database Management',
    'Internet Technology',
    'Computer Architecture',
  ],
};

export interface Experience {
  org: string;
  role: string;
  period: string;
  classified?: boolean;
  points: string[];
  tags: string[];
}

export const experience: Experience[] = [
  {
    org: 'Government of India',
    role: 'AI/ML Web Development Intern',
    period: 'May 2025 – Aug 2025',
    classified: true,
    points: [
      'Engineering work under a government AI/ML mandate. Project details are restricted under a non-disclosure agreement.',
    ],
    tags: ['AI/ML', 'Web Engineering', 'Restricted'],
  },
  {
    org: 'National Informatics Centre (NIC)',
    role: 'Cyber Security Intern',
    period: 'Jan 2025 – Feb 2025',
    points: [
      'Hands-on exposure to live SOC operations, SIEM monitoring, and incident handling workflows.',
      'Assisted in analyzing DDoS attacks, security logs, and real-time threat monitoring mechanisms.',
    ],
    tags: ['SOC', 'SIEM', 'Incident Response', 'DDoS Analysis'],
  },
  {
    org: 'Competent Software Pvt. Ltd.',
    role: 'AI Security Research Intern',
    period: 'Jan 2025 – Feb 2025',
    points: [
      'Researched Large Language Model security: risks, vulnerabilities, and attack surfaces.',
      'Explored emerging security challenges and mitigation techniques for AI and LLM-based systems.',
    ],
    tags: ['LLM Security', 'AI Risk', 'Threat Modeling'],
  },
  {
    org: 'Indian Institute of Technology, Delhi',
    role: 'Research Intern',
    period: 'Jun 2024 – Jul 2024',
    points: [
      'Conducted an in-depth literature survey across contemporary cybersecurity research.',
      'Authored a review paper applying quantitative research methods for structured comparison and analysis — currently being developed toward publication.',
    ],
    tags: ['Research', 'Cybersecurity', 'Academic Writing'],
  },
];

export interface Project {
  slug: string;
  name: string;
  codename: string;
  status: string;
  oneLiner: string;
  problem: string;
  approach: string[];
  architecture: { label: string; nodes: string[] };
  stack: string[];
  impact: string[];
  learnings: string[];
  github: string;
  githubNote: string;
  demo: string | null;
  accent: 'cyan' | 'violet';
}

export const projects: Project[] = [
  {
    slug: 'cybervajra',
    name: 'CyberVajra',
    codename: 'THREAT-DETECT',
    status: 'DEPLOYED IN COMPETITION · NATIONAL WINNER',
    oneLiner: 'AI-based detection of fraudulent URLs and malicious APKs.',
    problem:
      'Phishing URLs and trojanized Android APKs are the two most common delivery vectors for financial fraud in India. Signature-based blocklists lag hours-to-days behind new campaigns — by the time a URL is blocklisted, victims already exist. The system needed to classify never-seen-before URLs and APKs in real time.',
    approach: [
      'Built an ML-driven detection engine analyzing lexical, structural, and behavioral patterns in URLs alongside static APK characteristics (permissions, manifest features, package signals).',
      'Designed the full pipeline end-to-end: data collection, preprocessing, feature engineering, model training, evaluation, and final threat classification.',
      'Tuned for the asymmetric cost of errors — a missed malicious sample is far more expensive than a false positive on a benign one.',
    ],
    architecture: {
      label: 'Detection pipeline',
      nodes: ['Data collection', 'Preprocessing', 'Feature engineering', 'Model training', 'Evaluation', 'Threat classification'],
    },
    stack: ['Python', 'ML models', 'Feature engineering', 'Static APK analysis', 'URL lexical analysis'],
    impact: [
      'Core system behind the CipherCop 2025 national hackathon win (BPR&D, ISB, TGCSB) — judged by national law-enforcement and security bodies.',
      'Demonstrated real-time classification of previously unseen threats, where blocklists structurally fail.',
    ],
    learnings: [
      'Feature engineering on adversarial data is different: attackers actively optimize against your features, so robustness matters more than raw accuracy.',
      'Evaluation design (class imbalance, cost-sensitive metrics) decides whether a security model is usable, not just its headline score.',
    ],
    github: 'https://github.com/t4shee',
    githubNote: 'Source private — available on request',
    demo: null,
    accent: 'cyan',
  },
  {
    slug: 'web-intelligence',
    name: 'Web Intelligence Pipeline',
    codename: 'DATA-EXTRACT',
    status: 'OPERATIONAL',
    oneLiner: 'Automated web data extraction and AI-powered summarization at scale.',
    problem:
      'Raw web data is high-volume, unstructured, and noisy. Manually extracting insight from large-scale textual sources does not scale — the bottleneck is not access to data, it is the human time needed to read it.',
    approach: [
      'Developed an automated extraction and processing pipeline in Python for large-scale textual web data.',
      'Applied NLP techniques for content analysis, summarization, and insight extraction directly from raw scraped data.',
      'Automated the full loop — scheduled collection, cleaning, and structured output — so insight generation runs without manual intervention.',
    ],
    architecture: {
      label: 'Processing pipeline',
      nodes: ['Scheduled scraping', 'Extraction & cleaning', 'NLP analysis', 'Summarization', 'Structured insights'],
    },
    stack: ['Python', 'BeautifulSoup', 'Selenium', 'NLP', 'CRON automation'],
    impact: [
      'Cut content-analysis time from manual reading to automated structured summaries.',
      'Reusable pipeline pattern — pointed at new sources with configuration changes, not rewrites.',
    ],
    learnings: [
      'Real-world scraping is an exercise in defensive engineering: malformed HTML, rate limits, and layout drift break naive pipelines.',
      'The value of NLP output depends heavily on how aggressively you clean the input — garbage tolerance is the real design parameter.',
    ],
    github: 'https://github.com/t4shee',
    githubNote: 'Source private — available on request',
    demo: null,
    accent: 'violet',
  },
  {
    slug: 'medpath',
    name: 'MedPath',
    codename: 'HEALTH-ASSIST',
    status: 'HACKATHON WINNER BUILD',
    oneLiner: 'AI-enabled healthcare assistance and navigation platform.',
    problem:
      'Medical information online is fragmented, jargon-heavy, and hard to act on. People navigating a health concern need guidance toward the right information and resources — not another wall of search results.',
    approach: [
      'Built an AI-driven platform that helps users navigate medical information, resources, and guidance.',
      'Integrated data handling and workflow automation behind a deliberately simple, user-focused interface.',
      'Designed for real-world usability first: the target user is stressed and non-technical.',
    ],
    architecture: {
      label: 'Platform flow',
      nodes: ['User query', 'AI guidance layer', 'Data & resource handling', 'Workflow automation', 'Actionable output'],
    },
    stack: ['Python', 'AI/ML', 'Workflow automation', 'Web stack'],
    impact: [
      'Winning build at Avishkar Season 3 national hackathon — recognized as a practical, technology-driven solution.',
      'Validated that AI products in sensitive domains win on trust and clarity, not model complexity.',
    ],
    learnings: [
      'In healthcare-adjacent AI, guardrails and scope discipline are features — knowing what the system should refuse to answer matters.',
      'User-focused design is an engineering constraint, not a coat of paint applied at the end.',
    ],
    github: 'https://github.com/t4shee',
    githubNote: 'Source private — available on request',
    demo: null,
    accent: 'violet',
  },
  {
    slug: 'this-site',
    name: 'This Portfolio',
    codename: 'SELF-HOST',
    status: 'LIVE · YOU ARE INSIDE IT',
    oneLiner: 'A DevSecOps exhibit: hardened static site with automated edge deployment.',
    problem:
      'A security engineer\u2019s portfolio should itself be evidence. Most portfolios ship with no security headers, no CSP, and no deployment discipline — this one is built as a small production system.',
    approach: [
      'Static-first architecture (Astro islands): all content pre-rendered, JavaScript hydrated only for interactive components.',
      'Git-push CI/CD: every commit to main triggers an automated build and global edge deployment on Cloudflare Pages.',
      'Hardened HTTP response headers — Content-Security-Policy, HSTS, X-Frame-Options, referrer and permissions policies — shipped via edge configuration.',
    ],
    architecture: {
      label: 'Deployment pipeline',
      nodes: ['Git push', 'CI build (Astro)', 'Edge deploy (Cloudflare)', 'Security headers', 'Global CDN'],
    },
    stack: ['Astro', 'React islands', 'TypeScript', 'Tailwind CSS', 'Canvas API', 'Cloudflare Pages'],
    impact: [
      'Zero-server, zero-cost production deployment with automated CI/CD and TLS.',
      'Security-header configuration targeting an A grade on securityheaders.com.',
    ],
    learnings: [
      'DevSecOps at small scale is mostly about defaults: headers, least-JavaScript, and automated pipelines cost nothing if designed in from commit one.',
      'Performance and security point the same direction — shipping less code is both faster and a smaller attack surface.',
    ],
    github: 'https://github.com/t4shee',
    githubNote: 'Repository on GitHub',
    demo: '/',
    accent: 'cyan',
  },
];

// Skill constellation data: 3 gravity wells + orbiting skills
export interface SkillNode {
  id: string;
  label: string;
  cluster: 'ai' | 'sec' | 'sys';
  weight: number; // 1..3, drives node size
}

export const skillClusters = {
  ai: { label: 'AI / ML', color: '#8B5CF6' },
  sec: { label: 'Cybersecurity', color: '#22D3EE' },
  sys: { label: 'Systems & Software', color: '#94A3B8' },
} as const;

export const skills: SkillNode[] = [
  // AI / ML
  { id: 'ml', label: 'ML Models', cluster: 'ai', weight: 3 },
  { id: 'cv', label: 'Computer Vision', cluster: 'ai', weight: 2 },
  { id: 'tf', label: 'Transformers', cluster: 'ai', weight: 2 },
  { id: 'nlp', label: 'NLP', cluster: 'ai', weight: 2 },
  { id: 'dp', label: 'Data Processing', cluster: 'ai', weight: 2 },
  { id: 'ev', label: 'Model Evaluation', cluster: 'ai', weight: 2 },
  { id: 'llmsec', label: 'LLM Security', cluster: 'ai', weight: 3 },
  // Cybersecurity
  { id: 'va', label: 'Vulnerability Assessment', cluster: 'sec', weight: 3 },
  { id: 'soc', label: 'SOC Operations', cluster: 'sec', weight: 3 },
  { id: 'siem', label: 'SIEM', cluster: 'sec', weight: 2 },
  { id: 'arcsight', label: 'ArcSight ESM', cluster: 'sec', weight: 1 },
  { id: 'arbor', label: 'Arbor', cluster: 'sec', weight: 1 },
  { id: 'mandiant', label: 'Mandiant TI', cluster: 'sec', weight: 1 },
  { id: 'nmap', label: 'Nmap', cluster: 'sec', weight: 2 },
  { id: 'winhard', label: 'Windows Hardening', cluster: 'sec', weight: 2 },
  { id: 'linhard', label: 'Linux Hardening', cluster: 'sec', weight: 2 },
  // Systems & Software
  { id: 'py', label: 'Python', cluster: 'sys', weight: 3 },
  { id: 'java', label: 'Java', cluster: 'sys', weight: 2 },
  { id: 'c', label: 'C / C++', cluster: 'sys', weight: 2 },
  { id: 'js', label: 'JavaScript', cluster: 'sys', weight: 2 },
  { id: 'shell', label: 'Shell Scripting', cluster: 'sys', weight: 2 },
  { id: 'sql', label: 'SQL / PostgreSQL', cluster: 'sys', weight: 2 },
  { id: 'linux', label: 'Linux Systems', cluster: 'sys', weight: 3 },
  { id: 'net', label: 'TCP/IP · DNS', cluster: 'sys', weight: 2 },
  { id: 'cron', label: 'CRON · Daemons', cluster: 'sys', weight: 1 },
  { id: 'sel', label: 'Selenium', cluster: 'sys', weight: 1 },
];

export const achievements = [
  {
    year: '2026',
    title: 'GATE CSE 2026 — Qualified',
    body: 'National graduate-level examination in Computer Science & Engineering.',
    kind: 'exam',
  },
  {
    year: '2026',
    title: 'IndiaSkills National Competition — Competitor',
    body: 'Representing at the national level in the Cyber Security domain.',
    kind: 'competition',
  },
  {
    year: '2025',
    title: 'IndiaSkills North-East Regional — 1st Place',
    body: 'Gold in the Cyber Security domain, qualifying for Nationals.',
    kind: 'gold',
  },
  {
    year: '2025',
    title: 'CipherCop 2025 — National Hackathon Winner',
    body: 'First place in a national-level cybersecurity hackathon organized by BPR&D, ISB, and TGCSB, with CyberVajra.',
    kind: 'gold',
  },
  {
    year: '2024',
    title: 'Avishkar Season 3 — National Hackathon Winner',
    body: 'Winning team for a practical, technology-driven solution (MedPath).',
    kind: 'gold',
  },
  {
    year: '2024',
    title: 'Best Paper Award — International Conference',
    body: 'IES College of Engineering, for research presentation.',
    kind: 'research',
  },
];

export const research = {
  heading: 'Research',
  body: 'At IIT Delhi, I conducted a structured literature survey across contemporary cybersecurity research and authored a review paper using quantitative methods for systematic comparison. That work is currently being developed toward publication. My research interests sit where AI and security collide: LLM attack surfaces, adversarial machine learning, and ML-driven threat detection.',
  exploring: ['Quantum computing & post-quantum cryptography', 'Adversarial machine learning', 'LLM security & red-teaming'],
};
