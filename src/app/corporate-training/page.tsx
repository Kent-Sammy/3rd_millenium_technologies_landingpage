import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Checklist, EngagementCards, Faq, FinalCta, PageHero, ProcessSteps, SectionHead } from "@/components/Sections";
import { faqs } from "@/data/content";
import { programmesByCategory } from "@/data/programmes";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Corporate AI Training for Employees",
  description:
    "Practical, role-specific AI training for companies in Nigeria. Train one team or run an organisation-wide programme — in-person, virtual or hybrid.",
  path: "/corporate-training",
});

const buyers = [
  { title: "CEOs, MDs & business owners", text: "Build organisation-wide capability and set sensible adoption priorities." },
  { title: "HR, People & L&D leaders", text: "Give employees structured, role-relevant skills and measure participation." },
  { title: "COOs & department heads", text: "Improve everyday processes in the teams you are responsible for." },
  { title: "CTOs, CIOs & IT leaders", text: "Roll out AI tools with the right access, governance and technical training." },
  { title: "CFOs & finance directors", text: "Adopt tools in a cost-conscious way with clear human review of outputs." },
  { title: "Marketing, sales & commercial leaders", text: "Equip teams to research, produce and sell more effectively." },
];

const participantsLeaveWith = [
  "Workflows applied to their own day-to-day tasks",
  "Reusable prompts, templates and checklists for their role",
  "A clear understanding of what AI should and shouldn't be used for",
  "Practical habits for verifying AI outputs",
  "Awareness of your organisation's data and access rules",
  "Next steps for continued practice",
];

const formats = [
  { icon: "building" as const, title: "In-person", text: "On-site sessions at your offices. Travel and venue costs may be quoted separately." },
  { icon: "users" as const, title: "Virtual", text: "Live online sessions for distributed or remote teams." },
  { icon: "layers" as const, title: "Hybrid", text: "A mix of in-person workshops and online follow-up sessions." },
];

export default function CorporateTrainingPage() {
  const faqSubset = faqs.filter((f) =>
    ["Do employees need previous AI experience?", "Can you train several departments?", "Can we start with one department?", "Is the training practical?", "Are software licences included?"].includes(f.q),
  );

  return (
    <>
      <PageHero
        eyebrow="For organisations"
        title="Corporate AI training built around your teams' real work"
        lead="Whether you want to train one team, run an organisation-wide programme or book a focused workshop, we design practical training around the tasks, tools and goals of each department."
      />

      <section className="section" aria-labelledby="who">
        <div className="container">
          <SectionHead id="who" eyebrow="Who we work with" title="Designed for the leaders responsible for capability">
            <p className="lead">We work with decision-makers to define the right scope, then train the people who will use AI every day.</p>
          </SectionHead>
          <div className="grid grid-3">
            {buyers.map((b) => (
              <div key={b.title} className="card"><h3>{b.title}</h3><p style={{ margin: 0 }}>{b.text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--surface" aria-labelledby="departments">
        <div className="container split split--top">
          <SectionHead id="departments" eyebrow="Every department" title="Role-specific programmes, not one-size-fits-all">
            <p className="lead">Each department gets training focused on its own tasks and responsibilities, with safety guidance where outputs carry higher risk — such as finance, HR and legal.</p>
            <Link href="/programmes?category=business" className="btn btn-primary">See all department programmes</Link>
          </SectionHead>
          <ul className="grid" style={{ listStyle: "none", padding: 0, margin: 0, gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 230px), 1fr))" }}>
            {programmesByCategory("business").map((p) => (
              <li key={p.slug}>
                <Link href={`/programmes/${p.slug}`} className="tile" style={{ height: "100%" }}>
                  {p.title.replace(/^AI for /, "")} <Icon name="arrowRight" size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="how-it-works">
        <div className="container">
          <SectionHead id="how-it-works" eyebrow="How it works" title="From first conversation to applied skills">
            <p className="lead">Every engagement follows the same practical structure, adapted to your organisation.</p>
          </SectionHead>
          <ProcessSteps />
        </div>
      </section>

      <section className="section section--surface" aria-labelledby="outcomes">
        <div className="container split split--top">
          <SectionHead id="outcomes" eyebrow="Outcomes" title="What participants leave with">
            <p className="lead">We focus on skills people can use the following week, not general awareness.</p>
            <p className="small muted">Specific outcomes, measures and follow-up are agreed in each proposal. We do not promise fixed productivity gains or returns.</p>
          </SectionHead>
          <div className="card"><Checklist items={participantsLeaveWith} /></div>
        </div>
      </section>

      <section className="section" aria-labelledby="formats">
        <div className="container">
          <SectionHead id="formats" eyebrow="Delivery" title="In-person, virtual or hybrid" />
          <div className="grid grid-3">
            {formats.map((f) => (
              <div key={f.title} className="card">
                <span className="card-icon"><Icon name={f.icon} size={22} /></span>
                <h3>{f.title}</h3>
                <p style={{ margin: 0 }}>{f.text}</p>
              </div>
            ))}
          </div>
          <p className="small muted" style={{ marginTop: "1.25rem" }}>
            In-person service locations: <span className="placeholder">[Service locations and travel policy — to be confirmed]</span>
          </p>
        </div>
      </section>

      <section className="section section--surface" aria-labelledby="engagements">
        <div className="container">
          <SectionHead id="engagements" eyebrow="Engagement options" title="Start with a focused workshop. Build capability over time.">
            <p className="lead">Schedule, capacity and outcomes are agreed in your proposal. <Link href="/pricing">How pricing works</Link>.</p>
          </SectionHead>
          <EngagementCards />
        </div>
      </section>

      <section className="section" aria-labelledby="ct-faq">
        <div className="container container--narrow">
          <SectionHead id="ct-faq" eyebrow="FAQ" title="Common questions from organisations" />
          <Faq items={faqSubset} />
        </div>
      </section>

      <FinalCta />
    </>
  );
}
