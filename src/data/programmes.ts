/**
 * Programme catalogue — the single source of truth for programme cards,
 * filters and detail pages. Add, edit or remove entries here.
 *
 * Sample exercises are illustrative and are tailored during scoping.
 */

export type ProgrammeCategory = "business" | "creative" | "technical";
export type ProgrammeLevel = "beginner" | "intermediate" | "advanced" | "mixed";
export type ProgrammeFormat = "workshop" | "multi-session" | "tailored";

export type Programme = {
  slug: string;
  title: string;
  category: ProgrammeCategory;
  shortDescription: string;
  audience: string;
  learningOutcomes: string[];
  sampleExercises: string[];
  level: ProgrammeLevel;
  format: ProgrammeFormat;
  durationNote: string;
  ctaLabel: string;
  /** Responsible-use note shown prominently on the detail page. */
  safetyNote?: string;
};

export const categoryMeta: Record<
  ProgrammeCategory,
  { label: string; shortLabel: string; description: string }
> = {
  business: {
    label: "Business-function programmes",
    shortLabel: "By department",
    description:
      "Role-specific training built around the everyday tasks of each team.",
  },
  creative: {
    label: "Creative-production programmes",
    shortLabel: "Creative production",
    description:
      "AI-assisted video, presentations, imagery and content — with human quality control.",
  },
  technical: {
    label: "Technical & implementation programmes",
    shortLabel: "Automation & technical",
    description:
      "Workflows, automation, agents, integrations and governance, scoped to your environment.",
  },
};

export const levelLabels: Record<ProgrammeLevel, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  mixed: "Mixed levels",
};

export const formatLabels: Record<ProgrammeFormat, string> = {
  workshop: "Workshop",
  "multi-session": "Multi-session",
  tailored: "Tailored",
};

const DURATION_STANDARD =
  "Available as a focused workshop or a multi-session programme. Sessions, schedule and cohort size are agreed in your proposal.";
const DURATION_TECHNICAL =
  "Scoped to your systems, tools, permissions and participants' skill levels. Duration is agreed after an initial assessment.";

type Input = Omit<Programme, "durationNote" | "ctaLabel"> &
  Partial<Pick<Programme, "durationNote" | "ctaLabel">>;

const define = (p: Input): Programme => ({
  durationNote: p.category === "technical" ? DURATION_TECHNICAL : DURATION_STANDARD,
  ctaLabel:
    p.category === "technical" ? "Discuss this programme" : "Request this programme",
  ...p,
});

export const programmes: Programme[] = [
  // ───────────────────────── Business functions ─────────────────────────
  define({
    slug: "ai-for-leadership-executives",
    title: "AI for Leadership & Executives",
    category: "business",
    shortDescription:
      "Use AI for research, briefings and decision support — and set clear adoption priorities for the organisation.",
    audience: "CEOs, directors, business owners and senior managers.",
    learningOutcomes: [
      "Use AI for structured research and executive briefings",
      "Summarise reports and complex documents",
      "Prepare meeting briefs and decision-support materials",
      "Identify AI-assisted process-improvement opportunities",
      "Evaluate AI adoption priorities and potential value",
      "Establish responsible AI practices",
    ],
    sampleExercises: [
      "Turn a long board pack into a one-page briefing with open questions",
      "Draft an AI adoption priority list for one business unit",
      "Outline a simple responsible-use policy for leadership review",
    ],
    level: "beginner",
    format: "workshop",
  }),
  define({
    slug: "ai-for-finance-accounting",
    title: "AI for Finance & Accounting",
    category: "business",
    shortDescription:
      "Speed up analysis, reporting and commentary while keeping every number verified.",
    audience: "Finance managers, accountants, controllers and analysts.",
    learningOutcomes: [
      "Use AI to build spreadsheet formulas and analyse data",
      "Summarise financial reports and supporting documents",
      "Draft management commentary",
      "Identify trends and potential anomalies for review",
      "Support variance analysis and recurring reporting",
      "Explore automation opportunities",
    ],
    sampleExercises: [
      "Draft month-end variance commentary from a sample trial balance",
      "Build and test spreadsheet formulas with an AI assistant",
      "Flag unusual transactions in a dataset for human follow-up",
    ],
    level: "mixed",
    format: "multi-session",
    safetyNote:
      "Calculations and financial interpretations must be verified by a qualified person before use.",
  }),
  define({
    slug: "ai-for-hr-people-operations",
    title: "AI for HR & People Operations",
    category: "business",
    shortDescription:
      "Draft recruitment, onboarding and policy materials faster, with human judgement on every people decision.",
    audience: "HR managers, recruiters and People Operations teams.",
    learningOutcomes: [
      "Draft job descriptions and recruitment materials",
      "Prepare interview questions and evaluation templates",
      "Summarise candidate information against defined criteria",
      "Create onboarding materials and employee communications",
      "Draft HR policies and internal documentation",
      "Develop training materials and employee surveys",
    ],
    sampleExercises: [
      "Write a job description and structured interview guide for a real role",
      "Build an onboarding checklist and welcome pack for new joiners",
      "Draft an employee pulse survey and summarise sample responses",
    ],
    level: "beginner",
    format: "multi-session",
    safetyNote:
      "Consequential employment decisions require human review and appropriate controls. AI should never make hiring, promotion or disciplinary decisions on its own.",
  }),
  define({
    slug: "ai-for-marketing-growth",
    title: "AI for Marketing & Growth",
    category: "business",
    shortDescription:
      "Research markets, develop campaigns and produce content variations — then measure what works.",
    audience:
      "Marketing leaders, growth teams, brand managers and digital marketers.",
    learningOutcomes: [
      "Conduct market and competitor research",
      "Develop campaign concepts and creative briefs",
      "Generate and refine marketing copy",
      "Build content calendars and campaign variations",
      "Adapt messaging for different audiences",
      "Summarise campaign performance and analyse data",
      "Support structured experimentation",
    ],
    sampleExercises: [
      "Produce a competitor snapshot and positioning options",
      "Turn one campaign idea into channel-specific variations",
      "Summarise a campaign report and propose the next test",
    ],
    level: "mixed",
    format: "multi-session",
  }),
  define({
    slug: "ai-for-sales-business-development",
    title: "AI for Sales & Business Development",
    category: "business",
    shortDescription:
      "Prepare for meetings, write proposals and keep pipeline records in order with less manual effort.",
    audience:
      "Sales managers, account executives and business development teams.",
    learningOutcomes: [
      "Research prospects and prepare account briefs",
      "Draft sales emails and follow-ups",
      "Create proposals and presentation outlines",
      "Assist with RFP responses",
      "Summarise meetings and extract next steps",
      "Support CRM documentation and pipeline reporting",
      "Prepare for customer meetings and negotiations",
    ],
    sampleExercises: [
      "Build an account brief for a target prospect from public information",
      "Draft a proposal outline from a client's requirements",
      "Convert meeting notes into a follow-up email and CRM update",
    ],
    level: "beginner",
    format: "workshop",
  }),
  define({
    slug: "ai-for-operations",
    title: "AI for Operations",
    category: "business",
    shortDescription:
      "Document processes, draft SOPs and find the tasks that are genuinely suitable for AI assistance.",
    audience: "COOs, operations managers and process owners.",
    learningOutcomes: [
      "Document business processes",
      "Identify suitable tasks for AI assistance",
      "Draft standard operating procedures",
      "Prepare operational reports and summaries",
      "Extract information and actions from documents",
      "Map automation opportunities",
      "Define process-improvement indicators",
    ],
    sampleExercises: [
      "Map one recurring process and mark where AI could assist",
      "Draft an SOP from an expert's rough notes",
      "Define three indicators to track a process improvement",
    ],
    level: "mixed",
    format: "multi-session",
  }),
  define({
    slug: "ai-for-executive-assistants",
    title: "AI for Executive Assistants & Executive Offices",
    category: "business",
    shortDescription:
      "Prepare briefings, correspondence and follow-ups faster for busy executive offices.",
    audience:
      "Executive assistants, chiefs of staff and office administrators.",
    learningOutcomes: [
      "Prepare executive briefings and research summaries",
      "Turn meeting notes into action items",
      "Draft professional correspondence",
      "Summarise reports",
      "Prepare agendas and follow-ups",
      "Organise recurring reporting workflows",
    ],
    sampleExercises: [
      "Turn raw meeting notes into minutes and an action tracker",
      "Prepare a pre-meeting brief on an external organisation",
      "Set up a reusable weekly-update template",
    ],
    level: "beginner",
    format: "workshop",
  }),
  define({
    slug: "ai-for-legal-compliance",
    title: "AI for Legal & Compliance",
    category: "business",
    shortDescription:
      "Organise, compare and summarise documents in structured review workflows that professionals control.",
    audience: "Legal teams, compliance officers and risk professionals.",
    learningOutcomes: [
      "Summarise legal documents",
      "Extract clauses and organise information",
      "Compare policy versions",
      "Support regulatory research and documentation",
      "Draft initial compliance reports and policies",
      "Design structured document-review workflows",
    ],
    sampleExercises: [
      "Extract key clauses from a sample contract into a review table",
      "Compare two versions of an internal policy and list the changes",
      "Draft a first-pass compliance checklist for professional review",
    ],
    level: "intermediate",
    format: "tailored",
    safetyNote:
      "Qualified professionals must verify all outputs before legal or regulatory use. Confidential documents should only be used with approved tools.",
  }),
  define({
    slug: "ai-for-customer-experience",
    title: "AI for Customer Experience",
    category: "business",
    shortDescription:
      "Respond faster, keep knowledge bases current and spot recurring issues in customer feedback.",
    audience:
      "Customer service, customer success and contact-centre teams.",
    learningOutcomes: [
      "Draft customer responses",
      "Classify and summarise enquiries",
      "Build FAQ and knowledge-base content",
      "Summarise conversations",
      "Identify recurring feedback themes",
      "Prepare escalation summaries and service reports",
      "Explore AI-assisted quality assurance",
    ],
    sampleExercises: [
      "Draft response templates for your most common enquiries",
      "Group a set of feedback comments into themes",
      "Write a clear escalation summary from a long conversation",
    ],
    level: "beginner",
    format: "workshop",
  }),
  define({
    slug: "ai-for-product-managers",
    title: "AI for Product Managers",
    category: "business",
    shortDescription:
      "Structure discovery, write clearer requirements and turn feedback into roadmap decisions.",
    audience: "Product managers, product owners and product teams.",
    learningOutcomes: [
      "Structure discovery and research plans",
      "Summarise interviews and research findings",
      "Draft product requirements documents",
      "Generate user stories and acceptance criteria",
      "Explore product concepts and alternatives",
      "Analyse product feedback and usage data",
      "Prepare roadmaps and stakeholder updates",
    ],
    sampleExercises: [
      "Synthesise interview notes into key insights",
      "Draft a PRD with user stories and acceptance criteria",
      "Write a stakeholder update from a sprint summary",
    ],
    level: "intermediate",
    format: "multi-session",
  }),
  define({
    slug: "ai-for-designers-creative-teams",
    title: "AI for Designers & Creative Teams",
    category: "business",
    shortDescription:
      "Explore concepts, build visual directions and remove repetitive steps from creative workflows.",
    audience:
      "Product designers, graphic designers, creative leads and brand teams.",
    learningOutcomes: [
      "Explore concepts using AI-generated imagery",
      "Develop visual directions and references",
      "Create and refine image assets",
      "Generate storyboards",
      "Support design research and ideation",
      "Improve repetitive creative workflows",
      "Integrate AI into existing design tools",
    ],
    sampleExercises: [
      "Develop three visual directions for one brief",
      "Create a storyboard for a short product video",
      "Identify and streamline one repetitive production task",
    ],
    level: "mixed",
    format: "multi-session",
  }),
  define({
    slug: "ai-for-software-developers",
    title: "AI for Software Developers",
    category: "business",
    shortDescription:
      "Use AI coding assistants productively while keeping code quality, security and review standards high.",
    audience: "Software engineers, developers and technical leads.",
    learningOutcomes: [
      "Use AI coding assistants effectively",
      "Generate and review code",
      "Debug issues and investigate errors",
      "Develop tests and test scenarios",
      "Generate technical documentation",
      "Prototype with AI development tools",
      "Review code for security and reliability",
      "Establish sensible AI-assisted development practices",
    ],
    sampleExercises: [
      "Add tests to an existing module with an AI assistant, then review them",
      "Investigate a realistic bug using AI-assisted debugging",
      "Agree team guidelines for AI-generated code in pull requests",
    ],
    level: "intermediate",
    format: "tailored",
    safetyNote:
      "AI-generated code needs the same human review, testing and security checks as any other code. Secrets and sensitive code must not be shared with unapproved tools.",
  }),
  define({
    slug: "ai-for-project-managers",
    title: "AI for Project Managers",
    category: "business",
    shortDescription:
      "Plan, report and manage risks more efficiently across projects and programmes.",
    audience:
      "Project managers, programme managers and delivery leads.",
    learningOutcomes: [
      "Draft project plans and delivery documents",
      "Summarise meetings and decisions",
      "Prepare status reports",
      "Identify risks and mitigation actions",
      "Develop project documentation and checklists",
      "Support resource planning and progress reporting",
    ],
    sampleExercises: [
      "Draft a project plan and RAID log from a project brief",
      "Turn a week of updates into a concise status report",
      "Build a reusable project kick-off checklist",
    ],
    level: "beginner",
    format: "workshop",
  }),

  // ───────────────────────── Creative production ─────────────────────────
  define({
    slug: "ai-video-production",
    title: "AI Video Production",
    category: "creative",
    shortDescription:
      "Plan, draft and refine videos for marketing, training and internal communications.",
    audience:
      "Marketing, communications, training and creative teams producing video content.",
    learningOutcomes: [
      "Develop concepts, scripts and storyboards",
      "Explore suitable AI video tools",
      "Create video drafts and variations for marketing, training or internal communications",
      "Refine pacing, captions, narration and visual consistency",
      "Review outputs for quality, rights, accuracy and brand fit",
    ],
    sampleExercises: [
      "Script and storyboard a 60-second explainer",
      "Produce a draft video and two variations for different audiences",
      "Run a quality, rights and brand review on the final cut",
    ],
    level: "mixed",
    format: "multi-session",
    safetyNote:
      "AI video output needs human review for accuracy, likeness, usage rights and brand fit before publication.",
  }),
  define({
    slug: "ai-advertising-commercials",
    title: "AI Advertising & Commercials",
    category: "creative",
    shortDescription:
      "Develop campaign concepts, storyboards and AI-assisted visuals for advertising.",
    audience: "Brand, advertising, marketing and creative production teams.",
    learningOutcomes: [
      "Develop creative concepts and campaign directions",
      "Create storyboards and shot plans",
      "Generate AI-assisted product visuals and video elements",
      "Explore alternative campaign treatments",
      "Apply brand and quality-control checks",
    ],
    sampleExercises: [
      "Develop two campaign treatments from one brief",
      "Build a storyboard and shot plan for a short commercial",
      "Apply a brand checklist to AI-assisted product visuals",
    ],
    level: "intermediate",
    format: "multi-session",
  }),
  define({
    slug: "ai-presentations-pitch-decks",
    title: "AI Presentations & Pitch Decks",
    category: "creative",
    shortDescription:
      "Build clear, persuasive decks faster — from narrative structure to final fact-check.",
    audience:
      "Leaders, sales and business development teams, founders, strategy and communications staff.",
    learningOutcomes: [
      "Structure a persuasive narrative",
      "Organise research and source material",
      "Create slide outlines and draft content",
      "Generate or source suitable visual assets",
      "Maintain consistent brand styles",
      "Review facts, readability and presentation flow",
      "Prepare investor, sales, leadership and internal decks",
    ],
    sampleExercises: [
      "Turn a set of notes into a ten-slide narrative outline",
      "Build a draft deck in your brand template",
      "Fact-check and tighten a deck for a leadership audience",
    ],
    level: "beginner",
    format: "workshop",
  }),
  define({
    slug: "ai-image-generation",
    title: "AI Image Generation",
    category: "creative",
    shortDescription:
      "Write effective visual briefs and produce consistent, on-brand image concepts.",
    audience: "Designers, marketers, content creators and brand teams.",
    learningOutcomes: [
      "Write effective visual briefs",
      "Generate and refine image concepts",
      "Create product and campaign visuals",
      "Explore controlled variations",
      "Check visual consistency, usage rights and brand suitability",
    ],
    sampleExercises: [
      "Write and iterate a visual brief for a campaign image",
      "Create a consistent set of variations for different channels",
      "Review a set of images for rights and brand suitability",
    ],
    level: "beginner",
    format: "workshop",
  }),
  define({
    slug: "ai-copywriting-content",
    title: "AI Copywriting & Content",
    category: "creative",
    shortDescription:
      "Brief, draft and edit copy in your brand voice — with every claim checked.",
    audience: "Marketing, communications and content teams.",
    learningOutcomes: [
      "Create content briefs",
      "Draft and edit marketing copy",
      "Produce email and social-content variations",
      "Adapt tone and messaging to audiences",
      "Fact-check claims and edit for brand voice",
    ],
    sampleExercises: [
      "Write a content brief and first draft for a landing page",
      "Adapt one message for three different audiences",
      "Edit an AI draft for accuracy and brand voice",
    ],
    level: "beginner",
    format: "workshop",
  }),
  define({
    slug: "ai-social-media-production",
    title: "AI Social Media Production",
    category: "creative",
    shortDescription:
      "Plan calendars, repurpose content and run a clear review process for social channels.",
    audience: "Social media, content and digital marketing teams.",
    learningOutcomes: [
      "Build content calendars",
      "Develop channel-specific concepts",
      "Create captions, scripts and visual briefs",
      "Repurpose long-form content",
      "Plan review and approval workflows",
    ],
    sampleExercises: [
      "Build a four-week content calendar for one campaign",
      "Repurpose a report or webinar into a series of posts",
      "Design a simple review-and-approval workflow",
    ],
    level: "beginner",
    format: "workshop",
  }),
  define({
    slug: "ai-audio-voice-production",
    title: "AI Audio & Voice Production",
    category: "creative",
    shortDescription:
      "Explore voiceover, narration and audio workflows — responsibly and with permission.",
    audience:
      "Content, training, communications and media production teams.",
    learningOutcomes: [
      "Explore voiceovers, narration and audio workflows",
      "Prepare scripts and pronunciation guidance",
      "Edit and review audio assets",
      "Use voices and source material only with appropriate permissions",
    ],
    sampleExercises: [
      "Prepare a narration script with pronunciation notes for local names",
      "Produce and review a draft voiceover for a training module",
    ],
    level: "mixed",
    format: "workshop",
    safetyNote:
      "Never clone or imitate a person's voice without their documented permission.",
  }),
  define({
    slug: "ai-training-content",
    title: "AI Training Content",
    category: "creative",
    shortDescription:
      "Create onboarding guides, learning materials and knowledge checks for different employee groups.",
    audience:
      "Learning & development teams, HR and internal trainers.",
    learningOutcomes: [
      "Develop instructional outlines and learning materials",
      "Create onboarding guides and presentations",
      "Draft video scripts and knowledge checks",
      "Adapt content to different employee groups",
      "Review content for accuracy and accessibility",
    ],
    sampleExercises: [
      "Turn an internal policy into a short learning module",
      "Write a knowledge check for an onboarding course",
      "Adapt a training guide for frontline and office staff",
    ],
    level: "beginner",
    format: "multi-session",
  }),
  define({
    slug: "ai-brand-campaign-production",
    title: "AI Brand & Campaign Production",
    category: "creative",
    shortDescription:
      "Turn brand guidelines into usable AI briefs and keep campaigns consistent across formats.",
    audience: "Brand managers, creative leads and marketing teams.",
    learningOutcomes: [
      "Convert brand guidelines into usable AI briefs",
      "Create campaign directions and asset variations",
      "Maintain brand consistency across formats",
      "Establish review and approval checkpoints",
    ],
    sampleExercises: [
      "Convert your brand guidelines into a reusable AI brief",
      "Produce a campaign asset set across three formats",
    ],
    level: "intermediate",
    format: "tailored",
  }),

  // ───────────────────────── Technical & implementation ─────────────────────────
  define({
    slug: "ai-workflow-automation",
    title: "AI Workflow Automation",
    category: "technical",
    shortDescription:
      "Map current processes and design automated workflows with human checkpoints.",
    audience:
      "Operations teams, process owners, analysts and technical staff.",
    learningOutcomes: [
      "Map current processes",
      "Identify repetitive tasks and exceptions",
      "Design workflows with human checkpoints",
      "Test outputs and failure cases",
      "Document ownership and maintenance",
    ],
    sampleExercises: [
      "Map a document-intake process and design an automated version",
      "Define review checkpoints and test failure cases",
    ],
    level: "intermediate",
    format: "tailored",
  }),
  define({
    slug: "no-code-ai-automation",
    title: "No-Code AI Automation",
    category: "technical",
    shortDescription:
      "Connect everyday applications and add AI steps — without writing code.",
    audience:
      "Business users, operations and admin teams who manage repetitive digital tasks.",
    learningOutcomes: [
      "Understand triggers, actions and data flow",
      "Connect supported applications",
      "Add AI steps where appropriate",
      "Handle errors and exceptions",
      "Test permissions and workflow reliability",
    ],
    sampleExercises: [
      "Build a form-to-summary-to-notification workflow",
      "Add error handling and test with edge cases",
    ],
    level: "beginner",
    format: "multi-session",
  }),
  define({
    slug: "ai-agents",
    title: "AI Agents",
    category: "technical",
    shortDescription:
      "Understand where agents help, where they don't, and how to set safe boundaries.",
    audience: "Technical teams, product teams and automation leads.",
    learningOutcomes: [
      "Understand agent use cases and limitations",
      "Define tasks, tools and boundaries",
      "Set permissions and approval points",
      "Test behaviour and failure modes",
      "Monitor outputs and improve reliability",
    ],
    sampleExercises: [
      "Design an agent for a bounded research task with approval points",
      "Run failure-mode tests and document the results",
    ],
    level: "advanced",
    format: "tailored",
    safetyNote:
      "Agents should run with the minimum permissions they need and require human approval for consequential actions.",
  }),
  define({
    slug: "mcp-ai-integrations",
    title: "MCP & AI Integrations",
    category: "technical",
    shortDescription:
      "Connect AI tools to approved systems using the Model Context Protocol (MCP), safely and with least-privilege access.",
    audience:
      "IT, engineering and technical teams responsible for tools and integrations.",
    learningOutcomes: [
      "Understand MCP concepts and architecture",
      "Identify compatible clients, servers and tools",
      "Configure approved connections in a controlled environment",
      "Apply least-privilege access and safe credential handling",
      "Test access, data flow and failure modes",
      "Document configuration and maintenance",
    ],
    sampleExercises: [
      "Configure an approved MCP connection in a test environment",
      "Review the permissions and data flow of an integration",
    ],
    level: "advanced",
    format: "tailored",
    safetyNote:
      "Never expose credentials or connect untrusted servers to sensitive systems. All work is scoped to your environment and security requirements.",
  }),
  define({
    slug: "multi-model-ai-workflows",
    title: "Multi-Model AI Workflows",
    category: "technical",
    shortDescription:
      "Choose the right model for each step and pass work between them with validation.",
    audience: "Technical teams, analysts and automation builders.",
    learningOutcomes: [
      "Compare model suitability for defined tasks",
      "Assign models to research, writing, analysis or coding steps",
      "Pass outputs between steps with validation",
      "Control cost, latency and quality",
      "Evaluate workflow reliability",
    ],
    sampleExercises: [
      "Compare two models on the same task with a simple scorecard",
      "Build a research-then-draft workflow with a validation step",
    ],
    level: "advanced",
    format: "tailored",
  }),
  define({
    slug: "ai-knowledge-assistants",
    title: "AI Knowledge Assistants",
    category: "technical",
    shortDescription:
      "Build assistants that answer questions from your approved documents, with sources.",
    audience:
      "IT, knowledge management, HR, operations and customer-support leads.",
    learningOutcomes: [
      "Prepare and organise approved knowledge sources",
      "Design retrieval and question-answering workflows",
      "Include source references where supported",
      "Manage access and content updates",
      "Test accuracy and unanswered questions",
    ],
    sampleExercises: [
      "Prepare a policy library for use by an assistant",
      "Test an assistant against a set of real employee questions",
    ],
    level: "intermediate",
    format: "tailored",
  }),
  define({
    slug: "ai-assisted-software-development",
    title: "AI-Assisted Software Development",
    category: "technical",
    shortDescription:
      "Plan, prototype, test and document software with AI — keeping human review and deployment controls.",
    audience: "Engineering teams, technical leads and technical founders.",
    learningOutcomes: [
      "Use coding assistants effectively",
      "Plan and prototype applications",
      "Generate and review code",
      "Test, debug and document",
      "Protect secrets and sensitive code",
      "Maintain human code review and deployment controls",
    ],
    sampleExercises: [
      "Prototype an internal tool from a written specification",
      "Review AI-generated changes against your team's standards",
    ],
    level: "intermediate",
    format: "tailored",
  }),
  define({
    slug: "ai-research-data-analysis",
    title: "AI Research & Data Analysis",
    category: "technical",
    shortDescription:
      "Use AI to explore approved data and present findings — with calculations and claims verified.",
    audience: "Analysts, researchers, strategy and finance teams.",
    learningOutcomes: [
      "Formulate research questions",
      "Analyse approved datasets",
      "Use AI to assist with exploration and summaries",
      "Verify calculations and source claims",
      "Present findings with limitations",
    ],
    sampleExercises: [
      "Explore a dataset and summarise findings with stated limitations",
      "Check an AI summary against its sources",
    ],
    level: "intermediate",
    format: "multi-session",
  }),
  define({
    slug: "ai-governance-security",
    title: "AI Governance & Security",
    category: "technical",
    shortDescription:
      "Set acceptable-use rules, data classification and review requirements for AI across the organisation.",
    audience:
      "IT, security, risk, compliance and leadership teams.",
    learningOutcomes: [
      "Define acceptable-use rules",
      "Classify sensitive information",
      "Review access and tool permissions",
      "Establish human review requirements",
      "Document risks and incident pathways",
      "Support ongoing policy updates",
    ],
    sampleExercises: [
      "Draft an AI acceptable-use policy for review",
      "Classify common data types by what may be used with which tools",
    ],
    level: "mixed",
    format: "tailored",
  }),
];

export const getProgramme = (slug: string) =>
  programmes.find((p) => p.slug === slug);

export const programmesByCategory = (category: ProgrammeCategory) =>
  programmes.filter((p) => p.category === category);
