/**
 * Shared marketing content. Edit copy here rather than inside components.
 */
import type { IconName } from "@/components/Icon";

export const services: {
  title: string;
  description: string;
  icon: IconName;
  cta: { label: string; href: string };
}[] = [
  {
    title: "AI Training for Teams",
    description:
      "Role-specific, practical training built around the work your employees already do — from finance and HR to sales and operations.",
    icon: "users",
    cta: { label: "Browse team programmes", href: "/programmes?category=business" },
  },
  {
    title: "AI for Creative Production",
    description:
      "AI-assisted video, presentations, pitch decks, imagery and content, with human review built into every workflow.",
    icon: "film",
    cta: { label: "See creative programmes", href: "/programmes?category=creative" },
  },
  {
    title: "AI Workflow Automation",
    description:
      "Identify repetitive processes that are suitable for automation, then design and test workflows with clear human checkpoints.",
    icon: "workflow",
    cta: { label: "Explore automation", href: "/ai-implementation#automation" },
  },
  {
    title: "AI Tools & Implementation",
    description:
      "Tool selection, integrations and practical deployment, scoped to your systems, permissions and security requirements.",
    icon: "plug",
    cta: { label: "View implementation support", href: "/ai-implementation" },
  },
  {
    title: "AI Strategy & Advisory",
    description:
      "Assess your organisation's readiness, prioritise realistic opportunities and plan adoption in sensible stages.",
    icon: "compass",
    cta: { label: "Talk to us about strategy", href: "/contact?type=consultation" },
  },
  {
    title: "Ongoing AI Enablement",
    description:
      "Continued training, periodic reviews and optimisation as your tools, teams and needs change.",
    icon: "refresh",
    cta: { label: "See engagement options", href: "/pricing" },
  },
];

export const challengeQuestions: { question: string; icon: IconName }[] = [
  { question: "How can finance prepare reports more efficiently?", icon: "chart" },
  { question: "How can marketing produce and test better campaigns?", icon: "megaphone" },
  { question: "How can sales prepare stronger proposals?", icon: "briefcase" },
  { question: "How can creative teams produce video and visual content?", icon: "film" },
  { question: "How can developers use AI while maintaining code quality?", icon: "code" },
  {
    question:
      "How can organisations adopt tools without unnecessary spending or avoidable risk?",
    icon: "shield",
  },
];

export const creativeFeatures: { title: string; slug: string }[] = [
  { title: "AI Video Production", slug: "ai-video-production" },
  { title: "AI Advertising & Commercials", slug: "ai-advertising-commercials" },
  { title: "AI Presentations & Pitch Decks", slug: "ai-presentations-pitch-decks" },
  { title: "AI Image Generation", slug: "ai-image-generation" },
  { title: "AI Copywriting & Content", slug: "ai-copywriting-content" },
  { title: "AI Social Media Production", slug: "ai-social-media-production" },
  { title: "AI Audio & Voice Production", slug: "ai-audio-voice-production" },
  { title: "AI Training Content", slug: "ai-training-content" },
];

export const technicalFeatures: { title: string; slug: string; blurb: string }[] = [
  {
    title: "AI Workflow Design",
    slug: "ai-workflow-automation",
    blurb: "Map processes and design workflows with human checkpoints.",
  },
  {
    title: "No-Code Automation",
    slug: "no-code-ai-automation",
    blurb: "Connect everyday apps and add AI steps without code.",
  },
  {
    title: "AI Agents",
    slug: "ai-agents",
    blurb: "Bounded tasks, clear permissions and approval points.",
  },
  {
    title: "MCP & AI Integrations",
    slug: "mcp-ai-integrations",
    blurb: "Connect AI tools to approved systems with least-privilege access.",
  },
  {
    title: "Multi-Model AI Workflows",
    slug: "multi-model-ai-workflows",
    blurb: "Match each step to a suitable model, with validation between steps.",
  },
  {
    title: "AI Knowledge Assistants",
    slug: "ai-knowledge-assistants",
    blurb: "Answer questions from approved documents, with sources.",
  },
  {
    title: "AI-Assisted Software Development",
    slug: "ai-assisted-software-development",
    blurb: "Coding assistants with human review and deployment controls.",
  },
  {
    title: "AI Governance & Security",
    slug: "ai-governance-security",
    blurb: "Acceptable use, data classification and review requirements.",
  },
];

export const processSteps = [
  {
    title: "Understand Your Team",
    description: "We discuss your objectives, roles, current tools and the challenges your teams face.",
  },
  {
    title: "Recommend the Right Programme",
    description: "We define the modules, delivery format, duration and scope that fit your goals.",
  },
  {
    title: "Train Through Practical Exercises",
    description: "Guided learning built around realistic examples of your participants' work.",
  },
  {
    title: "Apply the Learning",
    description: "Participants develop repeatable workflows they can use in their roles.",
  },
  {
    title: "Review Progress",
    description: "We gather feedback, review what has been applied and agree next steps.",
  },
];

export const engagements = [
  {
    name: "Monthly Programme",
    summary: "Focus on an immediate skills gap or test a specific programme with one team.",
    points: [
      "One team or focused cohort",
      "Workshop or short multi-session format",
      "Practical exercises on real tasks",
    ],
  },
  {
    name: "Three-Month Programme",
    summary: "A structured journey to learn, practise, apply and review progress.",
    points: [
      "Time between sessions to apply learning",
      "Workflow development with guidance",
      "Progress review and recommendations",
    ],
    highlight: true,
  },
  {
    name: "Six-Month Programme",
    summary:
      "Develop capabilities across several teams or support deeper workflow adoption.",
    points: [
      "Multiple departments or cohorts",
      "Advanced and technical modules where needed",
      "Periodic reviews and adjustments",
    ],
  },
];

export const costBenefits = [
  "Review tools the organisation already pays for.",
  "Identify overlapping capabilities.",
  "Recommend tools by role and use case.",
  "Consider integration and implementation costs.",
  "Set appropriate access and data-handling practices.",
  "Prioritise high-value use cases before expanding spending.",
];

export const organisationTypes = [
  "Startups and growing businesses",
  "Mid-sized companies",
  "Large enterprises",
];

export const sectors = [
  "Financial services",
  "Healthcare",
  "Professional services",
  "Retail",
  "Logistics",
  "Manufacturing",
  "Education",
  "Real estate",
  "Media and creative organisations",
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "Do employees need previous AI experience?",
    a: "No. Programmes are designed around participants' current skill levels. Beginner programmes start with the fundamentals, and advanced or technical programmes are scoped to the experience of the group.",
  },
  {
    q: "Can you train several departments?",
    a: "Yes. You can run separate role-specific programmes for different departments, or a broader programme that combines shared foundations with department-specific sessions.",
  },
  {
    q: "Can you use the tools we already have?",
    a: "Where possible, yes. We start by reviewing the tools your organisation already uses and pays for, and build training around them. If additional tools would help, we explain why and what they would cost.",
  },
  {
    q: "Is the training practical?",
    a: "Yes. Sessions are built around realistic exercises based on participants' actual work, so they leave with workflows and templates they can reuse.",
  },
  {
    q: "Do you teach AI video and pitch decks?",
    a: "Yes. Creative-production programmes cover AI-assisted video, presentations and pitch decks, imagery, copy, social content and audio — with an emphasis on quality control, usage rights and brand consistency.",
  },
  {
    q: "Can you help automate workflows?",
    a: "Yes. We can help identify processes suitable for automation, design workflows with human checkpoints, and train your team to build and maintain them. Implementation work is scoped and priced separately from training.",
  },
  {
    q: "Do you support MCP and AI agents?",
    a: "Yes. Technical programmes cover AI agents, Model Context Protocol (MCP) integrations and multi-model workflows. These are scoped to your systems, permissions and security requirements, and use least-privilege access.",
  },
  {
    q: "Are software licences included?",
    a: "No, unless explicitly agreed in your proposal. Third-party AI tool subscriptions are separate from training fees. Some tools offer free tiers, but many capabilities require paid plans.",
  },
  {
    q: "How is pricing determined?",
    a: "Pricing depends on the number of participants, programmes selected, engagement duration, delivery format and any specialist implementation support. We confirm scope and price in a written proposal.",
  },
  {
    q: "Can we start with one department?",
    a: "Yes. Many organisations start with a focused programme for one team, review the results, then decide whether to extend it to other departments.",
  },
];

export const pricingFactors = [
  { title: "Participants", description: "How many people will take part, and how they are grouped into cohorts." },
  { title: "Programmes", description: "Which programmes and modules are selected, and their complexity." },
  { title: "Duration", description: "Monthly, three-month, six-month or a custom engagement." },
  { title: "Delivery format", description: "In-person, virtual or hybrid delivery." },
  { title: "Specialist support", description: "Technical training or implementation work, scoped separately." },
];

export const pricingRules = [
  "Training and implementation are priced separately unless expressly bundled in your proposal.",
  "Third-party software subscriptions are not included unless explicitly stated.",
  "In-person delivery, travel and venue costs may be quoted separately.",
  "Each proposal confirms cohort size, number of sessions, support and deliverables.",
  "Support is defined in scope — we do not offer unlimited or unscoped support.",
];
