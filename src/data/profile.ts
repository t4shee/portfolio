// ============================================================
// PROFILE DATA — edit this file to update the entire site.
// No component code needs to change.
// ============================================================

export const resumeAvailable = false; // flip to true after adding a sanitized public/resume.pdf

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
    'M.Tech CSE (Cyber Security) student at National Forensic Sciences University, working at the intersection of machine learning and security engineering. I build ML-driven threat detection systems, study how AI systems fail under attack, and have trained inside real SOC environments monitoring live threats. National-level hackathon winner, IndiaSkills medallist, GATE CSE qualified.',
};

export const stats = [
  { value: '9.1', label: 'CGPA / 10', detail: 'M.Tech CSE (Cyber Security)' },
  { value: '4', label: 'Internships', detail: 'IIT Delhi · NIC · Govt. of India · Industry' },
  { value: '2×', label: 'National hackathon wins', detail: 'CipherCop 2025 · Avishkar S3' },
  { value: '1st', label: 'IndiaSkills NE Regional', detail: 'Cyber Security domain' },
];

export const education = {
  school: 'National Forensic Sciences University',
  degree: 'Integrated B.Tech–M.Tech, CSE — currently M.Tech (Cyber Security specialization)',
  period: 'Aug 2022 – Present',
  gpa: '9.1 / 10',
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
  points: string[];
  tags: string[];
}

export const experience: Experience[] = [
  {
    org: 'Government of India',
    role: 'AI/ML Web Development Intern',
    period: 'May 2025 – Aug 2025',
    points: [
      'Contributed to AI/ML and web engineering work for a national government organization.',
    ],
    tags: ['AI/ML', 'Web Engineering'],
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
      'Authored a review paper applying quantitative research methods for structured comparison and analysis.',
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
  accent: 'mint' | 'violet';
}

export const projects: Project[] = [
  {
    slug: 'cybervajra',
    name: 'CyberVajra',
    codename: 'THREAT-DETECT',
    status: 'NATIONAL WINNER · CIPHERCOP 2025',
    oneLiner: 'AI-powered detection of fraudulent URLs and malicious APKs.',
    problem:
      'Phishing URLs and trojanized Android APKs are the two dominant delivery vectors for cyber fraud in India. Signature-based blocklists lag hours-to-days behind new campaigns \u2014 by the time a URL or APK is blocklisted, victims already exist. Law enforcement needed a system that classifies never-seen-before threats, not just known ones.',
    approach: [
      'Built a dual-engine detection platform: one pipeline analyzes URLs through lexical, structural, and domain-level features; the other performs static analysis on APKs \u2014 permissions, manifest configuration, and package characteristics.',
      'Engineered the full ML lifecycle end-to-end: data collection, preprocessing, feature engineering, model training, evaluation, and final threat classification with risk verdicts.',
      'Tuned for the asymmetric cost of errors in fraud detection \u2014 a missed malicious sample is far more expensive than a false positive on a benign one.',
    ],
    architecture: {
      label: 'Dual detection pipeline',
      nodes: ['URL / APK intake', 'Static & lexical analysis', 'Feature engineering', 'ML classification', 'Risk verdict'],
    },
    stack: ['Python', 'ML models', 'Feature engineering', 'Static APK analysis', 'URL analysis'],
    impact: [
      'Won first place at CipherCop 2025, a national cybersecurity hackathon organized by BPR&D, ISB, and TGCSB \u2014 judged by national law-enforcement and security bodies.',
      'Demonstrated real-time classification of previously unseen threats, where blocklists structurally fail.',
    ],
    learnings: [
      'Feature engineering on adversarial data is different: attackers actively optimize against your features, so robustness matters more than raw accuracy.',
      'Evaluation design \u2014 class imbalance, cost-sensitive metrics \u2014 decides whether a security model is usable, not just its headline score.',
    ],
    github: 'https://github.com/t4shee',
    githubNote: 'Source private \u2014 available on request',
    demo: null,
    accent: 'mint',
  },
  {
    slug: 'nullify',
    name: 'Nullify',
    codename: 'POCKET-ANALYST',
    status: 'BUILT AT IQOO HACKATHON 2026',
    oneLiner: 'A multi-agent mobile security analyst that shields students from phishing, scams, and social engineering \u2014 in real time.',
    problem:
      'Students are among the most targeted groups online \u2014 fake internship offers demanding fees, phishing links disguised as bank or university portals, UPI scams over WhatsApp and SMS. Most students can feel when a message is off; nothing on their phone explains why. Nullify puts a security analyst in their pocket.',
    approach: [
      'Designed a multi-agent architecture: a FastAPI router agent classifies incoming input (message, link, screenshot via on-device OCR) and dispatches it to one of four specialist agents \u2014 URL scanner, scam-message analyzer, internship verifier, and social-engineering detector.',
      'The URL scanner is a genuinely trained ML pipeline, not an LLM wrapper: a Random Forest of 100+ trees trained on PhishTank, OpenPhish, and Kaggle data, fed by a 7-stage pipeline \u2014 URL normalization, WHOIS/DNS/SSL and entropy analysis, page-content extraction, headless-browser redirect tracing, and 20\u201330 engineered features.',
      'Every verdict returns a 0\u2013100 risk score with a plain-English breakdown of what makes the input dangerous and what to do next \u2014 including direct routes to the National Cyber Crime Reporting Portal.',
    ],
    architecture: {
      label: 'Multi-agent orchestration',
      nodes: ['Flutter app + OCR', 'FastAPI router agent', 'Specialist agents \u00d74', 'ML / LLM engines', 'Risk score + guidance'],
    },
    stack: ['Python', 'FastAPI', 'scikit-learn', 'Selenium', 'BeautifulSoup', 'Flutter', 'Firebase', 'LLM APIs'],
    impact: [
      'End-to-end working system built under hackathon constraints: mobile app, agent orchestration backend, and a trained detection model \u2014 each component matched to the work it is suited for.',
      'Turns vague suspicion into explained, actionable verdicts \u2014 naming the manipulation technique instead of just flagging it.',
    ],
    learnings: [
      'Routing between trained models and LLM agents is an architecture decision: use ML where labeled data exists, LLMs where explanation and language understanding matter.',
      'Explainability is the product \u2014 a risk score without a why does not change user behavior.',
    ],
    github: 'https://github.com/t4shee',
    githubNote: 'Source private \u2014 available on request',
    demo: null,
    accent: 'mint',
  },
  {
    slug: 't4skforce-enterprise',
    name: 'T4SKFORCE Enterprise',
    codename: 'QUANTUM-RISK',
    status: 'WORKING PROTOTYPE · POST-QUANTUM',
    oneLiner: 'A quantum-security scanner that discovers cryptographic assets in banking systems and scores their vulnerability to quantum attacks.',
    problem:
      'Banking infrastructure runs on classical cryptography \u2014 RSA, ECC, TLS \u2014 all of which quantum algorithms like Shor\u2019s can eventually break. Harvest-Now-Decrypt-Later attacks mean encrypted financial data captured today can be decrypted in the future. Yet banks have no automated way to even discover their cryptographic assets, let alone assess quantum readiness.',
    approach: [
      'Built a cryptographic discovery scanner that performs TLS handshake analysis across web servers, APIs, and endpoints \u2014 extracting cipher suites, key-exchange algorithms, and certificate metadata into a Cryptographic Bill of Materials (CBOM).',
      'Designed a quantum risk engine that evaluates discovered algorithms against quantum attack models (Shor\u2019s, Grover\u2019s) and computes a quantum-readiness score per asset.',
      'Added an ML prediction layer \u2014 a Random Forest trained on cryptographic parameters (TLS version, key sizes, cipher strength) \u2014 that estimates HNDL exposure and migration priority, then recommends NIST post-quantum standards (ML-KEM, ML-DSA) and hybrid TLS strategies through a real-time dashboard.',
    ],
    architecture: {
      label: 'Post-quantum risk pipeline',
      nodes: ['Target endpoint', 'Crypto scanner \u2192 CBOM', 'Quantum risk engine', 'ML prediction (HNDL)', 'PQC recommendations', 'Dashboard'],
    },
    stack: ['Python', 'FastAPI', 'scikit-learn', 'TLS analysis', 'Next.js / React', 'NIST PQC standards'],
    impact: [
      'A unified platform combining cryptographic scanning, quantum threat modeling, ML risk prediction, and visual security monitoring \u2014 a tool category most banks do not yet have.',
      'Anchors my quantum-computing interest in shipped engineering: post-quantum cryptography applied to real financial infrastructure.',
    ],
    learnings: [
      'Quantum threat modeling is tractable today \u2014 the hard problem is asset discovery, because you cannot migrate cryptography you cannot see.',
      'Risk scoring must be explainable to compliance teams: a number without the contributing TLS parameters behind it is unusable in a regulated industry.',
    ],
    github: 'https://github.com/t4shee',
    githubNote: 'Source private \u2014 available on request',
    demo: null,
    accent: 'violet',
  },
  {
    slug: 'medpath',
    name: 'MedPath',
    codename: 'SUPPLY-CHAIN',
    status: 'NATIONAL WINNER · AVISHKAR S3',
    oneLiner: 'Barcode-driven hospital drug inventory and supply-chain platform with real-time, unit-level traceability.',
    problem:
      'Hospital drug supply chains run on paper and memory: stockouts of critical medication, zero real-time visibility into where drugs are, and manual errors that send the wrong drug to the wrong ward. The consequences are delayed treatment and compromised patient safety.',
    approach: [
      'Designed a three-module system mirroring how drugs actually move: Store (inbound \u2014 stock entry and unique barcode generation per unit), Pharmacy (verification and dispatch against ward requests), and Ward/Nurse (request, scan-to-confirm delivery, and consumption marking).',
      'Every physical handoff is a barcode scan that updates a synchronized inventory database \u2014 producing end-to-end unit-level traceability from intake to patient, with automatic low-stock alerts for the pharmacy.',
      'Shipped both surfaces: web dashboards for store and pharmacy staff (Flask, Jinja, Bootstrap) and a Flutter mobile app with barcode scanning for nurses \u2014 built for stressed, non-technical users.',
    ],
    architecture: {
      label: 'Drug lifecycle flow',
      nodes: ['Store: barcode intake', 'Pharmacy: scan & dispatch', 'Ward: scan & confirm', 'Real-time inventory sync', 'Alerts & traceability'],
    },
    stack: ['Python', 'Flask', 'SQLAlchemy', 'SQLite', 'Flutter', 'Barcode scanning', 'REST APIs'],
    impact: [
      'Winning build at the Avishkar Season 3 national hackathon (Medical & Health track) \u2014 recognized as a practical, deployable solution.',
      'Replaces manual registers with scan-based state transitions: zero-mismatch dispatch, assured delivery confirmation, and complete audit trail per drug unit.',
    ],
    learnings: [
      'Modeling the physical world is the real design work \u2014 the database schema had to mirror how drugs physically move between store, pharmacy, and ward.',
      'In healthcare tooling, reliability and simplicity beat features: a nurse mid-shift gets one big button and a scanner, not a settings page.',
    ],
    github: 'https://github.com/t4shee',
    githubNote: 'Source private \u2014 available on request',
    demo: null,
    accent: 'violet',
  },
  {
    slug: 'web-intelligence',
    name: 'Web Intelligence Pipeline',
    codename: 'DATA-EXTRACT',
    status: 'OPERATIONAL',
    oneLiner: 'Automated web data extraction and AI-powered summarization at scale.',
    problem:
      'Raw web data is high-volume, unstructured, and noisy. Manually extracting insight from large-scale textual sources does not scale \u2014 the bottleneck is not access to data, it is the human time needed to read it.',
    approach: [
      'Developed an automated extraction and processing pipeline in Python for large-scale textual web data.',
      'Applied NLP techniques for content analysis, summarization, and insight extraction directly from raw scraped data.',
      'Automated the full loop \u2014 scheduled collection, cleaning, and structured output \u2014 so insight generation runs without manual intervention.',
    ],
    architecture: {
      label: 'Processing pipeline',
      nodes: ['Scheduled scraping', 'Extraction & cleaning', 'NLP analysis', 'Summarization', 'Structured insights'],
    },
    stack: ['Python', 'BeautifulSoup', 'Selenium', 'NLP', 'CRON automation'],
    impact: [
      'Cut content-analysis time from manual reading to automated structured summaries.',
      'Reusable pipeline pattern \u2014 pointed at new sources with configuration changes, not rewrites.',
    ],
    learnings: [
      'Real-world scraping is an exercise in defensive engineering: malformed HTML, rate limits, and layout drift break naive pipelines.',
      'The value of NLP output depends heavily on how aggressively you clean the input \u2014 garbage tolerance is the real design parameter.',
    ],
    github: 'https://github.com/t4shee',
    githubNote: 'Source private \u2014 available on request',
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
      'A security engineer\u2019s portfolio should itself be evidence. Most portfolios ship with no security headers, no CSP, and no deployment discipline \u2014 this one is built as a small production system.',
    approach: [
      'Static-first architecture (Astro islands): all content pre-rendered, JavaScript hydrated only for interactive components.',
      'Git-push CI/CD: every commit to main triggers an automated build and global edge deployment on Cloudflare Pages.',
      'Hardened HTTP response headers \u2014 Content-Security-Policy, HSTS, X-Frame-Options, referrer and permissions policies \u2014 shipped via edge configuration.',
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
      'Performance and security point the same direction \u2014 shipping less code is both faster and a smaller attack surface.',
    ],
    github: 'https://github.com/t4shee',
    githubNote: 'Repository on GitHub',
    demo: '/',
    accent: 'mint',
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
  ai: { label: 'AI / ML', color: '#8B5CFF' },
  sec: { label: 'Cybersecurity', color: '#2DE0A5' },
  sys: { label: 'Systems & Software', color: '#8B94A8' },
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
  { id: 'ddos', label: 'DDoS Mitigation', cluster: 'sec', weight: 2 },
  { id: 'ti', label: 'Threat Intelligence', cluster: 'sec', weight: 2 },
  { id: 'nmap', label: 'Nmap', cluster: 'sec', weight: 2 },
  { id: 'winhard', label: 'Windows Hardening', cluster: 'sec', weight: 2 },
  { id: 'linhard', label: 'Linux Hardening', cluster: 'sec', weight: 2 },
  { id: 'pqc', label: 'Post-Quantum Crypto', cluster: 'sec', weight: 2 },
  // Systems & Software
  { id: 'py', label: 'Python', cluster: 'sys', weight: 3 },
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
  heading: 'Research interests',
  body: 'My research interests sit where AI and security collide: LLM attack surfaces, adversarial machine learning, ML-driven threat detection, and the shift toward post-quantum cryptography.',
  exploring: ['Quantum computing & post-quantum cryptography', 'Adversarial machine learning', 'LLM security & red-teaming'],
};
