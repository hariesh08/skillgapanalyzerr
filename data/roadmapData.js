export const ROLE_DATA = {
  // 1. AI / ML Engineer (Expanded)
  ml: {
    name: "AI Engineer",
    marketDemand: "Very High",
    categories: {
      "Core Skills": [
        { name: "Python", description: "Primary programming language for AI and backend.", priority: "High Priority" },
        { name: "Data Structures", description: "Fundamental for efficient algorithm design.", priority: "High Priority" },
        { name: "Algorithms", description: "Core problem-solving techniques.", priority: "High Priority" }
      ],
      "AI Fundamentals": [
        { name: "Machine Learning", description: "Core concepts of predictive modeling.", priority: "High Priority" },
        { name: "Deep Learning", description: "Multi-layered neural networks.", priority: "High Priority" },
        { name: "Neural Networks", description: "Foundational architecture for modern AI.", priority: "High Priority" }
      ],
      "Frameworks": [
        { name: "TensorFlow", description: "Google's open-source ML framework.", priority: "Medium Priority" },
        { name: "PyTorch", description: "Meta's popular dynamic ML framework.", priority: "High Priority" },
        { name: "Scikit-learn", description: "Standard library for classical machine learning.", priority: "High Priority" }
      ],
      "Data Skills": [
        { name: "Pandas", description: "Data manipulation and analysis.", priority: "High Priority" },
        { name: "NumPy", description: "Numerical computing in Python.", priority: "High Priority" },
        { name: "Data Cleaning", description: "Preparing raw data for ML models.", priority: "Medium Priority" }
      ],
      "Deployment": [
        { name: "Docker", description: "Containerizes applications for consistent environments.", priority: "Medium Priority" },
        { name: "FastAPI", description: "High-performance API framework for serving Python models.", priority: "Nice to Have" },
        { name: "Model Serving", description: "Techniques for pushing models to production.", priority: "Nice to Have" }
      ]
    },
    learningOrder: [
      "Learn Python",
      "Learn Data Structures",
      "Learn Data Skills (Pandas, NumPy)",
      "Learn Machine Learning & Scikit-learn",
      "Learn Deep Learning & Neural Networks",
      "Learn Frameworks (PyTorch/TensorFlow)",
      "Learn Deployment & Docker"
    ]
  },
  
  // 2. Full-Stack Developer
  fullstack: {
    name: "Full-Stack Developer",
    marketDemand: "High",
    categories: {
      "Frontend Base": [
        { name: "HTML", description: "Semantic web structure.", priority: "High Priority" },
        { name: "CSS/Tailwind", description: "Styling and responsive design.", priority: "High Priority" },
        { name: "JavaScript", description: "Core web programming language.", priority: "High Priority" }
      ],
      "Frontend Frameworks": [
        { name: "React", description: "Component-based UI library.", priority: "High Priority" },
        { name: "TypeScript", description: "Static typing for robust JavaScript.", priority: "High Priority" }
      ],
      "Backend Core": [
        { name: "Node.js", description: "JavaScript runtime for backends.", priority: "High Priority" },
        { name: "REST APIs", description: "Standard architecture for web APIs.", priority: "High Priority" },
        { name: "GraphQL", description: "Query language for highly tailored API responses.", priority: "Nice to Have" }
      ],
      "Databases": [
        { name: "PostgreSQL", description: "Robust open-source relational database.", priority: "High Priority" },
        { name: "Redis", description: "In-memory data store for caching.", priority: "Medium Priority" },
        { name: "MongoDB", description: "Popular NoSQL document store.", priority: "Medium Priority" }
      ],
      "DevOps / Tooling": [
        { name: "Git", description: "Version control system.", priority: "High Priority" },
        { name: "Docker", description: "App containerization.", priority: "Medium Priority" },
        { name: "CI/CD", description: "Continuous integration and deployment pipelines.", priority: "Medium Priority" }
      ]
    },
    learningOrder: [
      "Learn Frontend Base (HTML, CSS, JS)",
      "Learn React & TypeScript",
      "Learn Node.js & REST APIs",
      "Learn Databases (PostgreSQL)",
      "Learn Git, Docker & DevOps"
    ]
  },

  // 3. React Developer
  react: {
    name: "React Developer",
    marketDemand: "High",
    categories: {
      "Core Web": [
        { name: "HTML", description: "Semantic web structure.", priority: "High Priority" },
        { name: "CSS", description: "Cascading style sheets.", priority: "High Priority" },
        { name: "JavaScript", description: "ES6+ and modern JS features.", priority: "High Priority" }
      ],
      "React Core": [
        { name: "React", description: "Component lifecycle, Hooks, and composition.", priority: "High Priority" },
        { name: "State Management", description: "Redux, Zustand, or Context API.", priority: "High Priority" },
        { name: "React Router", description: "Client-side routing.", priority: "Medium Priority" }
      ],
      "Ecosystem": [
        { name: "Next.js", description: "React framework for SSR/SSG.", priority: "High Priority" },
        { name: "Tailwind CSS", description: "Utility-first CSS framework.", priority: "High Priority" },
        { name: "TypeScript", description: "Type safety for React apps.", priority: "High Priority" }
      ],
      "Testing": [
        { name: "Jest", description: "Unit testing framework.", priority: "Medium Priority" },
        { name: "React Testing Library", description: "Testing React components.", priority: "Medium Priority" },
        { name: "Cypress", description: "End-to-end testing.", priority: "Nice to Have" }
      ]
    },
    learningOrder: [
      "Learn Core Web HTML/CSS/JS",
      "Learn React Core & Hooks",
      "Learn State Management",
      "Learn Next.js & TypeScript",
      "Learn Testing tools"
    ]
  },

  // 4. Node.js Developer
  node: {
    name: "Node.js Developer",
    marketDemand: "High",
    categories: {
      "Backend Core": [
        { name: "JavaScript", description: "Advanced JS concepts and Node APIs.", priority: "High Priority" },
        { name: "Node.js", description: "V8 runtime for executing JS server-side.", priority: "High Priority" },
        { name: "Express", description: "Minimalist web framework.", priority: "High Priority" }
      ],
      "Architecture": [
        { name: "REST APIs", description: "Designing stateless APIs.", priority: "High Priority" },
        { name: "Microservices", description: "Decoupled service architecture.", priority: "Nice to Have" },
        { name: "WebSockets", description: "Real-time bi-directional communication.", priority: "Medium Priority" }
      ],
      "Databases": [
        { name: "PostgreSQL", description: "Relational DB design.", priority: "High Priority" },
        { name: "MongoDB", description: "Schema-less document DB.", priority: "Medium Priority" },
        { name: "Redis", description: "Caching layer.", priority: "High Priority" }
      ],
      "Tooling": [
        { name: "Docker", description: "Application containerization.", priority: "High Priority" },
        { name: "TypeScript", description: "Static typing for scalable backends.", priority: "High Priority" },
        { name: "Jest", description: "Backend unit and integration testing.", priority: "Medium Priority" }
      ]
    },
    learningOrder: [
      "Learn JS & Node.js Basics",
      "Learn Express & REST APIs",
      "Learn Databases (SQL & NoSQL)",
      "Learn TypeScript & Docker",
      "Learn WebSockets & Microservices"
    ]
  },

  // 5. iOS Developer
  ios: {
    name: "iOS Developer",
    marketDemand: "Medium",
    categories: {
      "Core Language": [
        { name: "Swift", description: "Modern, safe language for Apple platforms.", priority: "High Priority" },
        { name: "Objective-C", description: "Legacy Apple language, mostly for maintenance.", priority: "Nice to Have" }
      ],
      "UI Frameworks": [
        { name: "SwiftUI", description: "Declarative UI framework.", priority: "High Priority" },
        { name: "UIKit", description: "Traditional imperative UI framework.", priority: "High Priority" }
      ],
      "Architecture": [
        { name: "MVVM", description: "Standard architecture for SwiftUI.", priority: "High Priority" },
        { name: "Combine", description: "Reactive programming framework.", priority: "Medium Priority" }
      ],
      "Ecosystem": [
        { name: "Xcode", description: "Apple's IDE.", priority: "High Priority" },
        { name: "CoreData", description: "Local data persistence.", priority: "Medium Priority" },
        { name: "App Store Connect", description: "Publishing and metrics.", priority: "Medium Priority" }
      ]
    },
    learningOrder: [
      "Learn Swift syntax",
      "Learn SwiftUI & UIKit",
      "Learn MVVM pattern",
      "Learn Networking & APIs",
      "Learn CoreData & Deployment"
    ]
  },

  // 6. Android Developer
  android: {
    name: "Android Developer",
    marketDemand: "Medium",
    categories: {
      "Core Language": [
        { name: "Kotlin", description: "Modern, preferred Android language.", priority: "High Priority" },
        { name: "Java", description: "Legacy Android programming.", priority: "Medium Priority" }
      ],
      "UI Frameworks": [
        { name: "Jetpack Compose", description: "Modern declarative UI toolkit.", priority: "High Priority" },
        { name: "XML Layouts", description: "Traditional imperative UI.", priority: "High Priority" }
      ],
      "Architecture": [
        { name: "MVVM", description: "Model-View-ViewModel pattern.", priority: "High Priority" },
        { name: "Coroutines", description: "Asynchronous programming in Kotlin.", priority: "High Priority" }
      ],
      "Ecosystem": [
        { name: "Android Studio", description: "Official IDE.", priority: "High Priority" },
        { name: "Room", description: "SQLite object mapping library.", priority: "Medium Priority" },
        { name: "Retrofit", description: "Type-safe HTTP client.", priority: "High Priority" }
      ]
    },
    learningOrder: [
      "Learn Kotlin",
      "Learn Android Studio & XML",
      "Learn Jetpack Compose",
      "Learn Coroutines & MVVM",
      "Learn Retrofit & Room"
    ]
  },

  // 7. Blockchain Developer
  blockchain: {
    name: "Blockchain Developer",
    marketDemand: "Emerging",
    categories: {
      "Fundamentals": [
        { name: "Cryptography", description: "Hashing, public/private keys.", priority: "High Priority" },
        { name: "Consensus Algorithms", description: "PoW, PoS mechanisms.", priority: "High Priority" }
      ],
      "Smart Contracts": [
        { name: "Solidity", description: "Language for EVM smart contracts.", priority: "High Priority" },
        { name: "Rust", description: "Language used by Solana and Polkadot.", priority: "Medium Priority" },
        { name: "EVM", description: "Ethereum Virtual Machine mechanics.", priority: "High Priority" }
      ],
      "Frameworks & Tooling": [
        { name: "Hardhat / Truffle", description: "Ethereum development environments.", priority: "High Priority" },
        { name: "Ethers.js / Web3.js", description: "Interacting with nodes via JS.", priority: "High Priority" },
        { name: "IPFS", description: "Decentralized storage protocol.", priority: "Nice to Have" }
      ],
      "Security": [
        { name: "Smart Contract Security", description: "Auditing, reentrancy attacks, etc.", priority: "High Priority" }
      ]
    },
    learningOrder: [
      "Learn Cryptography basics",
      "Learn Solidity",
      "Learn Hardhat & Ethers.js",
      "Learn Smart Contract Security",
      "Build dApps and deploy"
    ]
  },

  // 8. Game Developer
  game: {
    name: "Game Developer",
    marketDemand: "Medium",
    categories: {
      "Core Engines": [
        { name: "Unity", description: "Most popular 2D/3D engine.", priority: "High Priority" },
        { name: "Unreal Engine", description: "High-fidelity AAA engine.", priority: "Medium Priority" }
      ],
      "Languages": [
        { name: "C#", description: "Primary language for Unity.", priority: "High Priority" },
        { name: "C++", description: "Primary language for Unreal.", priority: "Medium Priority" }
      ],
      "Concepts": [
        { name: "Math & Physics", description: "Vectors, kinematics, collision.", priority: "High Priority" },
        { name: "Game Design", description: "Core loops, pacing, mechanics.", priority: "Medium Priority" },
        { name: "3D Modeling", description: "Blender or Maya basics.", priority: "Nice to Have" }
      ],
      "Systems": [
        { name: "Multiplayer / Netcode", description: "Syncing states across clients.", priority: "Nice to Have" },
        { name: "AI/Pathfinding", description: "NavMeshes, behavior trees.", priority: "High Priority" }
      ]
    },
    learningOrder: [
      "Learn C# or C++",
      "Learn Engine basics (Unity/Unreal)",
      "Learn Math & Physics concepts",
      "Learn AI & Pathfinding",
      "Develop and publish a small game"
    ]
  },

  // 9. QA Engineer
  qa: {
    name: "QA Engineer",
    marketDemand: "High",
    categories: {
      "Testing Fundamentals": [
        { name: "Manual Testing", description: "Executing test cases without scripts.", priority: "High Priority" },
        { name: "Test Design", description: "Writing effective test cases/plans.", priority: "High Priority" },
        { name: "Agile/Scrum", description: "Software development lifecycle.", priority: "High Priority" }
      ],
      "Automation Basics": [
        { name: "Python / JS", description: "Scripting languages for automation.", priority: "High Priority" },
        { name: "Selenium", description: "Web browser automation standard.", priority: "High Priority" },
        { name: "Cypress", description: "Modern web E2E testing framework.", priority: "Medium Priority" }
      ],
      "API & Performance": [
        { name: "Postman", description: "Tool for API testing.", priority: "High Priority" },
        { name: "JMeter / k6", description: "Load and performance testing.", priority: "Medium Priority" }
      ],
      "CI/CD Tools": [
        { name: "Jenkins / GitHub Actions", description: "Running tests in pipelines.", priority: "Medium Priority" },
        { name: "Docker", description: "Spinning up isolated test runs.", priority: "Nice to Have" }
      ]
    },
    learningOrder: [
      "Learn Manual Testing & Test Design",
      "Learn Agile & issue tracking (Jira)",
      "Learn API Testing (Postman)",
      "Learn a scripting language (Python/JS)",
      "Learn Automation frameworks (Selenium/Cypress)"
    ]
  },

  // 10. DevRel Engineer
  devrel: {
    name: "Developer Relations (DevRel)",
    marketDemand: "Emerging",
    categories: {
      "Technical Core": [
        { name: "Software Engineering", description: "Strong coding background.", priority: "High Priority" },
        { name: "API Design", description: "Understanding good DX (Developer Experience).", priority: "High Priority" },
        { name: "Cloud/SaaS", description: "Familiarity with deployment ecosystems.", priority: "Medium Priority" }
      ],
      "Content Creation": [
        { name: "Technical Writing", description: "Documentation, tutorials, blogs.", priority: "High Priority" },
        { name: "Public Speaking", description: "Presenting at conferences/meetups.", priority: "High Priority" },
        { name: "Video Production", description: "Creating YouTube/Twitch tutorials.", priority: "Nice to Have" }
      ],
      "Community": [
        { name: "Community Management", description: "Discord, Slack, GitHub discussion mod.", priority: "High Priority" },
        { name: "Advocacy", description: "Relaying community feedback to product teams.", priority: "High Priority" }
      ]
    },
    learningOrder: [
      "Gain strong Software Engineering experience",
      "Start creating Technical Content (Blogs/Docs)",
      "Engage in Open Source projects",
      "Practice Public Speaking",
      "Learn Community Management strategies"
    ]
  },

  // 11. Technical Writer
  techwriter: {
    name: "Technical Writer",
    marketDemand: "Medium",
    categories: {
      "Writing & Comms": [
        { name: "Technical Writing", description: "Clear, concise communication.", priority: "High Priority" },
        { name: "Information Architecture", description: "Structuring large docs sites.", priority: "High Priority" },
        { name: "UX Writing", description: "In-app microcopy.", priority: "Nice to Have" }
      ],
      "Tools": [
        { name: "Markdown / MDX", description: "Standard documentation markup.", priority: "High Priority" },
        { name: "Git & GitHub", description: "Docs-as-code version control.", priority: "High Priority" },
        { name: "Docusaurus / MkDocs", description: "Static site generators for docs.", priority: "Medium Priority" }
      ],
      "Technical Understanding": [
        { name: "API Basics", description: "Understanding REST and GraphQL.", priority: "High Priority" },
        { name: "Reading Code", description: "Basic understanding of JS/Python/etc.", priority: "Medium Priority" }
      ]
    },
    learningOrder: [
      "Learn Markdown & Git",
      "Understand API Basics",
      "Practice writing guides & tutorials",
      "Learn Information Architecture",
      "Learn a docs generator (e.g., Docusaurus)"
    ]
  },

  // 12. Product Manager
  pm: {
    name: "Product Manager",
    marketDemand: "High",
    categories: {
      "Product Strategy": [
        { name: "Market Research", description: "Understanding users and competitors.", priority: "High Priority" },
        { name: "Roadmapping", description: "Planning product features over time.", priority: "High Priority" },
        { name: "Prioritization Frameworks", description: "RICE, MoSCoW, Kano.", priority: "High Priority" }
      ],
      "Execution": [
        { name: "Agile/Scrum", description: "Sprint planning and execution.", priority: "High Priority" },
        { name: "Jira / Linear", description: "Ticket drafting and issue tracking.", priority: "High Priority" },
        { name: "A/B Testing", description: "Validating features with data.", priority: "Medium Priority" }
      ],
      "Design & Tech": [
        { name: "Figma", description: "Wireframing and UX flows.", priority: "Medium Priority" },
        { name: "Data Analytics", description: "SQL, Amplitude, Mixpanel.", priority: "High Priority" },
        { name: "System Design", description: "High-level tech architecture awareness.", priority: "Nice to Have" }
      ]
    },
    learningOrder: [
      "Learn Market Research & UX",
      "Learn Roadmapping & Prioritization",
      "Learn Agile Development practices",
      "Learn Data Analytics (SQL)",
      "Learn Wireframing in Figma"
    ]
  },

  // 13. Data Engineer
  dataeng: {
    name: "Data Engineer",
    marketDemand: "High",
    categories: {
      "Languages": [
        { name: "Python", description: "Primary data scripting language.", priority: "High Priority" },
        { name: "SQL", description: "Advanced querying and transformations.", priority: "High Priority" },
        { name: "Scala / Java", description: "Used for massive big data systems.", priority: "Nice to Have" }
      ],
      "Pipelines & Orchestration": [
        { name: "Airflow / Prefect", description: "Workflow orchestration.", priority: "High Priority" },
        { name: "Kafka", description: "Real-time streaming platform.", priority: "Medium Priority" },
        { name: "dbt", description: "Data transformation in warehouse.", priority: "High Priority" }
      ],
      "Warehouses & Big Data": [
        { name: "Snowflake / BigQuery", description: "Modern cloud data warehouses.", priority: "High Priority" },
        { name: "Spark", description: "Distributed data processing.", priority: "Medium Priority" },
        { name: "Hadoop", description: "Legacy big data ecosystem.", priority: "Nice to Have" }
      ],
      "Cloud & DevOps": [
        { name: "AWS / GCP", description: "Cloud infrastructure.", priority: "High Priority" },
        { name: "Docker", description: "Containerized data apps.", priority: "Medium Priority" }
      ]
    },
    learningOrder: [
      "Master SQL & Python",
      "Learn Cloud Data Warehousing",
      "Learn Data Transformation (dbt)",
      "Learn Orchestration (Airflow)",
      "Learn Streaming & Big Data (Kafka/Spark)"
    ]
  },

  // 14. Prompt Engineer
  prompt: {
    name: "Prompt Engineer",
    marketDemand: "Emerging",
    categories: {
      "LLM Architectures": [
        { name: "Generative AI", description: "Understanding transformer models.", priority: "High Priority" },
        { name: "Capabilities & Limits", description: "Hallucinations, context windows.", priority: "High Priority" }
      ],
      "Prompting Techniques": [
        { name: "Few-Shot Prompting", description: "Providing examples in prompts.", priority: "High Priority" },
        { name: "Chain of Thought", description: "Guiding LLM step-by-step.", priority: "High Priority" },
        { name: "RAG", description: "Retrieval-Augmented Generation concepts.", priority: "Medium Priority" }
      ],
      "Tooling & Evaluation": [
        { name: "Python", description: "Scripting bulk tests via APIs.", priority: "High Priority" },
        { name: "OpenAI API / LangChain", description: "Interacting programmatically with models.", priority: "High Priority" },
        { name: "Eval Frameworks", description: "Measuring model output quality.", priority: "Medium Priority" }
      ]
    },
    learningOrder: [
      "Understand Generative AI basics",
      "Learn Prompting Techniques (Few-shot, CoT)",
      "Learn working with APIs (OpenAI/Anthropic)",
      "Learn Python for bulk testing",
      "Learn RAG & Evaluation metrics"
    ]
  },

  // 15. AI Product Engineer
  aiprod: {
    name: "AI Product Engineer",
    marketDemand: "Emerging",
    categories: {
      "Full Stack Base": [
        { name: "TypeScript / JS", description: "Core web app language.", priority: "High Priority" },
        { name: "Next.js / React", description: "Frontend frameworks.", priority: "High Priority" },
        { name: "Node.js / Python", description: "Backend development.", priority: "High Priority" }
      ],
      "AI Integrations": [
        { name: "LLM APIs", description: "OpenAI, Anthropic, open-source models.", priority: "High Priority" },
        { name: "LangChain / LlamaIndex", description: "Orchestrating AI workflows.", priority: "High Priority" },
        { name: "Vector Databases", description: "Pinecone, Weaviate, pgvector.", priority: "High Priority" }
      ],
      "Architecture": [
        { name: "RAG", description: "Connecting private data to LLMs.", priority: "High Priority" },
        { name: "Agentic Workflows", description: "Building multi-agent reasoning loops.", priority: "Medium Priority" }
      ],
      "UX Design": [
        { name: "Streaming UI", description: "Render partial responses in real-time.", priority: "High Priority" },
        { name: "AI UX Patterns", description: "Designing non-deterministic interfaces.", priority: "Medium Priority" }
      ]
    },
    learningOrder: [
      "Master Full-Stack (React/Node)",
      "Learn LLM APIs & basic prompting",
      "Learn Vector DBs & RAG",
      "Learn LangChain/LlamaIndex",
      "Master Streaming UI & Agentic Workflows"
    ]
  },

  // Extra: DevOps / SRE
  devops: {
    name: "DevOps / SRE",
    marketDemand: "Very High",
    categories: {
      "OS & Scripting": [
        { name: "Linux", description: "Essential server administration.", priority: "High Priority" },
        { name: "Bash / Shell", description: "Command-line scripting.", priority: "High Priority" },
        { name: "Python / Go", description: "Advanced automation languages.", priority: "Medium Priority" }
      ],
      "Containers & Orchestration": [
        { name: "Docker", description: "Containerizing apps.", priority: "High Priority" },
        { name: "Kubernetes", description: "Managing cluster deployments.", priority: "High Priority" }
      ],
      "Infrastructure & CI/CD": [
        { name: "Terraform", description: "Infrastructure as Code.", priority: "High Priority" },
        { name: "CI/CD Platforms", description: "GitHub Actions, Jenkins, Gitlab CI.", priority: "High Priority" },
        { name: "AWS / GCP", description: "Cloud provider knowledge.", priority: "High Priority" }
      ],
      "Observability": [
        { name: "Prometheus", description: "Metrics collection.", priority: "High Priority" },
        { name: "Grafana", description: "Metrics visualization.", priority: "High Priority" },
        { name: "Datadog", description: "Commercial monitoring stack.", priority: "Nice to Have" }
      ]
    },
    learningOrder: [
      "Learn Linux & Bash command line",
      "Learn Networking basics",
      "Learn Docker & CI/CD",
      "Learn Cloud Providers (AWS)",
      "Learn Terraform & Kubernetes",
      "Learn Monitoring & Observability"
    ]
  },

  // Extra: Cybersecurity
  security: {
    name: "Cybersecurity Analyst",
    marketDemand: "High",
    categories: {
      "Foundations": [
        { name: "Networking", description: "TCP/IP, OSI model, DNS.", priority: "High Priority" },
        { name: "Linux", description: "Command line & system architecture.", priority: "High Priority" },
        { name: "Compliance", description: "SOC2, ISO27001 awareness.", priority: "Medium Priority" }
      ],
      "Defensive (Blue Team)": [
        { name: "SIEM", description: "Splunk, ELK stack.", priority: "High Priority" },
        { name: "Incident Response", description: "Handling breaches.", priority: "High Priority" },
        { name: "Firewalls & VPNs", description: "Network perimeter defense.", priority: "High Priority" }
      ],
      "Offensive (Red Team)": [
        { name: "Penetration Testing", description: "Ethical hacking techniques.", priority: "Medium Priority" },
        { name: "Burp Suite", description: "Web app vulnerability scanning.", priority: "Medium Priority" },
        { name: "Python / Bash", description: "Scripting custom exploits.", priority: "Nice to Have" }
      ]
    },
    learningOrder: [
      "Learn core Networking & Linux",
      "Understand Security Compliance & Risks",
      "Learn Defensive tools (SIEM/Firewalls)",
      "Practice Incident Response",
      "Learn Offensive techniques (Pen Testing)"
    ]
  }
};
