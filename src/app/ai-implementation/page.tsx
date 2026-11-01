import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Checklist, FinalCta, PageHero, SectionHead } from "@/components/Sections";
import { technicalFeatures } from "@/data/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "AI Workflow Automation, Integrations & Advisory",
  description:
    "AI workflow automation for businesses, AI agents and MCP integrations, tool selection and AI adoption consulting in Nigeria — scoped to your systems and security requirements.",
  path: "/ai-implementation",
});

const offerings = [
  {
    id: "automation",
    icon: "workflow" as const,
    title: "AI workflow automation",
    text: "We map your current processes, identify repetitive tasks that are suitable for automation and design workflows with clear human checkpoints.",
    points: ["Process mapping and opportunity review", "Workflow design with review steps", "Testing against real cases and failure modes", "Documentation of ownership and maintenance"],
  },
  {
    id: "integrations",
    icon: "plug" as const,
    title: "Tools, integrations & agents",
    text: "Practical deployment of AI tools, integrations, Model Context Protocol (MCP) connections and agents in a controlled way.",
    points: ["Tool selection by role and use case", "Approved integrations with least-privilege access", "Agent design with permissions and approval points", "Safe credential handling"],
  },
  {
    id: "advisory",
    icon: "compass" as const,
    title: "AI strategy & advisory",
    text: "Assess readiness, prioritise realistic opportunities and plan adoption in sensible stages — including the tools you already pay for.",
    points: ["Readiness and current-tools review", "Use-case prioritisation", "Cost-conscious adoption plan", "Training plan aligned to rollout"],
  },
  {
    id: "governance",
    icon: "shield" as const,
    title: "Governance & security",
    text: "Acceptable-use rules, data classification and human-review requirements so AI is adopted responsibly.",
    points: ["Acceptable-use policy drafting", "Sensitive-data classification", "Access and permission reviews", "Incident and escalation pathways"],
  },
];

const approach = [
  { title: "Discover", text: "Understand the process, systems, data, people involved and current pain points." },
  { title: "Scope", text: "Agree what will be built, what won't, who owns it, and how success will be judged." },
  { title: "Build & test", text: "Develop in a controlled environment and test outputs, permissions and failure cases." },
  { title: "Hand over", text: "Document the workflow and train the people who will run and maintain it." },
];

export default function AiImplementationPage() {
  return (
    <>
      <PageHero
        eyebrow="AI implementation"
        title="Turn AI skills into working processes"
        lead="Beyond training, we help organisations design, test and roll out AI workflows, integrations and agents — always scoped to your systems, permissions and security requirements."
      />

      <section className="section" aria-labelledby="services">
        <div className="container">
          <SectionHead id="services" eyebrow="What we help with" title="Implementation support, scoped to your environment" />
          <div className="grid grid-2">
            {offerings.map((o) => (
              <article key={o.id} id={o.id} className="card">
                <span className="card-icon"><Icon name={o.icon} size={22} /></span>
                <h3>{o.title}</h3>
                <p>{o.text}</p>
                <Checklist items={o.points} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--surface" aria-labelledby="approach">
        <div className="container">
          <SectionHead id="approach" eyebrow="Our approach" title="Careful, staged implementation" />
          <ol className="steps" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))" }}>
            {approach.map((s, i) => (
              <li key={s.title} className="step">
                <span className="step-num" aria-hidden="true">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="callout" style={{ marginTop: "2rem" }}>
            <Icon name="info" size={20} />
            <p>
              What can be connected depends on your existing tools, licences, access rights and security policies.
              We never connect untrusted services to sensitive systems or ask for credentials outside approved
              processes. Implementation is scoped and priced separately from training.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--dark" aria-labelledby="tech-programmes">
        <div className="container">
          <SectionHead id="tech-programmes" eyebrow="Technical training" title="Train your team to build and maintain it">
            <p className="lead">Pair implementation with technical programmes so your people can own what is built.</p>
          </SectionHead>
          <ul className="grid grid-4" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {technicalFeatures.map((f) => (
              <li key={f.slug}>
                <Link href={`/programmes/${f.slug}`} className="tile" style={{ height: "100%" }}>
                  <span>{f.title}<small>{f.blurb}</small></span>
                  <Icon name="arrowRight" size={18} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
