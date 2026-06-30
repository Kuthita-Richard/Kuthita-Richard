// Central source of truth for Richard's profile. Update this file and both
// the website and the auto-generated ATS resume PDF stay in sync.

export const profile = {
  name: "Richard Kuthita M.",
  tagline: "Computer Technology Engineer | Java Engineer | Frontend Developer",
  location: "Maseno, Kenya",
  phone: "+254 742 450 802",
  email: "richardcodescode@gmail.com",
  linkedin: "linkedin.com/in/richard-kuthita-583b45270",
  github: "github.com/Kuthita-Richard",
  githubUsername: "Kuthita-Richard",

  summary:
    "Currently Teaching Machines To Argue On The Blockchain, - Computer Technology Engineer. Experienced in Java development and modern frontend web technologies including Next.js, React, and TypeScript, with foundational knowledge in circuit design and digital electronics:- Embedded systems, microprocessor architecture and digital systems design. Currently leveling up across AI, Machine Learning, and Web3 (blockchain) — exploring decentralized reasoning and the next generation of learning models.",

  skills: {
    languages: ["Java", "TypeScript", "JavaScript", "Python (learning)", "Solidity (learning)"],
    frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn-ui", "Zustand", "Recharts"],
    tools: ["Vite", "Docker", "nginx", "Git", "Version Control"],
    hardware: ["Circuit Design", "Embedded systems", "Digital Systems Design", "Microprocessor Architecture", "Digital Electronics", "Microcontrollers", "PCB Basics", "Logic Gates"],
    domains: [
      "Systems Engineering",
      "Enterprise Resource Planning (ERP)",
      "B2B SaaS",
      "B2C SaaS",
      "Responsive Web Design",
      "Gamification Systems",
      "Payment Integration (M-Pesa)",
    ],
    emerging: [
      "Artificial Intelligence",
      "Machine Learning",
      "Web3.0 / Blockchain",
      "Learning Decentralized Reasoning Systems",
    ],
  },

  competencies: [
    {
      title: "Team Leadership & Mentoring",
      detail:
        "Led a team of 3 frontend developers, delegating tasks, reviewing code, and unblocking team members.",
    },
    {
      title: "Agile Collaboration",
      detail: "Comfortable working in iterative, sprint-based development cycles with cross-functional teams.",
    },
    {
      title: "Cross-functional Communication",
      detail: "Translates technical decisions clearly for non-technical stakeholders and project owners.",
    },
    {
      title: "Code Review & Quality Assurance",
      detail: "Enforces coding standards, identifies bugs early, and maintains a healthy, maintainable codebase.",
    },
    {
      title: "Technical Documentation",
      detail: "Writes clear, structured documentation for codebases, APIs, and project workflows.",
    },
    {
      title: "Ownership & Accountability",
      detail: "Takes end-to-end responsibility for features from design through deployment.",
    },
    {
      title: "Analytical Thinking",
      detail: "Breaks down complex problems into structured, solvable components.",
    },
    {
      title: "Continuous Learning",
      detail: "Proactively adopts new tools, frameworks, and best practices in a fast-moving field.",
    },
    {
      title: "Attention to Detail",
      detail: "Delivers polished, pixel-accurate UI implementations with consistent design standards.",
    },
    {
      title: "Initiative & Self-Direction",
      detail: "Independently identifies project needs and acts without waiting to be assigned.",
    },
  ],

  projects: [
    {
      name: "Lolwe-AI Volunteer Portal",
      role: "Frontend Lead | Volunteer Project, 2026",
      stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Zustand", "Recharts"],
      description:
        "A comprehensive volunteer management and gamification platform. Mission tracking, points and rewards, a learning hub, role-based workflows, and an M-Pesa payment integration for the Equal InfraC Fund landing page.",
      highlights: [
        "Led and coordinated a team of 3 frontend developers — task assignment, PR review, and code quality.",
        "Architected the frontend across 8 pages using the Next.js 14 App Router.",
        "Built a gamification system: points, achievement badges, leaderboard rankings, and mission difficulty tiers.",
        "Integrated M-Pesa payments into the Equal InfraC Fund landing page.",
      ],
      githubRepo: "Lolwe-AI",
    },
    {
      name: "Trusty Escrow",
      role: "Frontend Developer | Fintech Web Platform, 2026",
      stack: ["React", "TypeScript", "Vite", "shadcn-ui", "Tailwind CSS"],
      description:
        "A secure escrow web platform facilitating trusted transactions between parties with a clean, modern interface.",
      highlights: [
        "Built a fully responsive SPA with a consistent, accessible design system.",
        "Configured a multi-stage Docker build (Node build + nginx serve) with custom SPA routing and static asset caching.",
      ],
      githubRepo: "Escrow",
    },
    {
      name: "KaziniERP",
      role: "Company Website | Next.js & TypeScript, 2026",
      stack: ["Next.js", "TypeScript"],
      description:
        "Marketing and onboarding website connecting Kenyan business owners with KaziniEnterprise, a generic ERP solution for SMEs across Kenya.",
      highlights: ["Responsive B2B interface showcasing product features, pricing, and sign-up flows."],
      githubRepo: null,
    },
    {
      name: "KaziniEnterprise",
      role: "Java ERP System | SMEs in Kenya, 2026",
      stack: ["Java"],
      description:
        "A generic, industry-agnostic ERP system covering inventory, finance, HR, and operations for SMEs.",
      highlights: ["Designed for cross-industry adaptability — retail, services, and logistics."],
      githubRepo: null,
    },
  ],

  education: [
    {
      school: "Maseno University",
      period: "2023 – Present",
      detail: "Bachelor of Science (BSc.) in Computer Science and Technology — Expected Graduation: 2027",
    },
  ],

  softSkills: ["Communication", "Problem Solving", "Teamwork & Collaboration", "Adaptability", "Time Management"],
};

// Roles employers can choose from on the Hire Me page, grouped by track.
export const roleGroups = [
  {
    track: "Frontend & Product Engineering",
    roles: [
      {
        id: "frontend-dev",
        title: "Frontend Developer (React / Next.js)",
        blurb: "Building responsive, accessible interfaces with React, Next.js, TypeScript, and Tailwind CSS.",
      },
      {
        id: "ui-engineer",
        title: "UI / Product Engineer",
        blurb: "Turning designs into pixel-accurate, componentized, reusable UI systems.",
      },
      {
        id: "fullstack-dev",
        title: "Full-Stack Developer (Java + React/Next.js)",
        blurb: "End-to-end feature delivery across a Java backend and a modern React/Next.js frontend.",
      },
    ],
  },
  {
    track: "Java & Enterprise Systems (ERP)",
    roles: [
      {
        id: "java-backend",
        title: "Java Backend Developer",
        blurb: "Core business logic, services, and integrations built in Java.",
      },
      {
        id: "java-erp",
        title: "Java ERP Developer / Consultant",
        blurb: "Implementing and customizing ERP modules — inventory, finance, HR, operations.",
      },
      {
        id: "enterprise-engineer",
        title: "Enterprise Software Engineer",
        blurb: "Designing maintainable, cross-industry business software for SMEs.",
      },
    ],
  },
  {
    track: "Quality & Testing",
    roles: [
      {
        id: "qa-engineer",
        title: "Software QA / Test Engineer",
        blurb: "Manual and structured test plans, regression testing, and bug triage.",
      },
      {
        id: "sdet",
        title: "SDET (Software Development Engineer in Test)",
        blurb: "Building automated test suites and CI quality gates alongside feature teams.",
      },
    ],
  },
  {
    track: "Growth Track — AI, ML & Web3",
    roles: [
      {
        id: "ai-ml-engineer",
        title: "AI / ML Engineer (Junior / Trainee)",
        blurb: "Applying machine learning fundamentals to real product features, learning on the job.",
      },
      {
        id: "web3-developer",
        title: "Web3 / Blockchain Developer (Junior)",
        blurb: "Smart contract basics and decentralized application interfaces, paired with a mentor.",
      },
      {
        id: "decentralized-reasoning",
        title: "Research Assistant — Decentralized Reasoning Systems",
        blurb: "Exploratory work at the intersection of AI, ML, and Web3 — the future of decentralized learning models.",
      },
    ],
  },
];

export const contractTypes = [
  {
    id: "permanent",
    title: "Permanent",
    blurb: "A long-term role on your team, with room to grow into ownership of a domain.",
  },
  {
    id: "contract",
    title: "Contract",
    blurb: "A fixed-scope or fixed-term engagement focused on delivering specific outcomes.",
  },
  {
    id: "freelance",
    title: "Freelance / Project-based",
    blurb: "A scoped, milestone-driven project — ideal for MVPs, feature builds, or one-time deliverables.",
  },
];
