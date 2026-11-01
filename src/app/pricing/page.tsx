import { Icon } from "@/components/Icon";
import { Checklist, FinalCta, PageHero, SectionHead } from "@/components/Sections";
import { TrackedLink } from "@/components/TrackedLink";
import { engagements, pricingFactors, pricingRules } from "@/data/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Engagement Options & Pricing",
  description:
    "How corporate AI training is priced: participants, programme, duration, delivery format and specialist support. Monthly, three-month, six-month and custom enterprise programmes.",
  path: "/pricing",
});

const options = [
  ...engagements.map((e) => ({ name: e.name, summary: e.summary, points: e.points, highlight: e.highlight, key: e.name.split(" ")[0].toLowerCase() })),
  {
    name: "Custom Enterprise Programme",
    summary: "For large teams, multiple departments, specialist technical training or AI implementation.",
    points: ["Organisation-wide rollout planning", "Combined training and implementation scope", "Dedicated programme coordination"],
    highlight: false,
    key: "",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Pricing that fits your team and objectives"
        lead="Every organisation starts from a different place. Our proposal considers the number of participants, programme selected, engagement duration, delivery format and any specialist implementation support required."
        actions={false}
      />

      <section className="section" aria-labelledby="options">
        <div className="container">
          <SectionHead id="options" eyebrow="Engagement options" title="Choose a starting point" />
          <div className="grid grid-4">
            {options.map((o) => (
              <article key={o.name} className={`card plan${o.highlight ? " plan--highlight" : ""}`}>
                {o.highlight && <span className="tag plan-badge">Common starting point for teams</span>}
                <h3 style={{ fontSize: "1.25rem" }}>{o.name}</h3>
                <p>{o.summary}</p>
                <p className="price-note">Tailored quote</p>
                <Checklist items={o.points} />
                <TrackedLink
                  href={`/contact?type=proposal${o.key ? `&engagement=${o.key}` : ""}`}
                  className={`btn ${o.highlight ? "btn-primary" : "btn-secondary"}`}
                >
                  Request a Tailored Proposal
                </TrackedLink>
              </article>
            ))}
          </div>
          <p className="small muted" style={{ marginTop: "1.25rem" }}>
            Published prices: <span className="placeholder">[Indicative pricing — pending owner confirmation]</span>
          </p>
        </div>
      </section>

      <section className="section section--surface" aria-labelledby="factors">
        <div className="container">
          <SectionHead id="factors" eyebrow="What affects price" title="Five factors shape every proposal" />
          <ol className="grid grid-3" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {pricingFactors.map((f, i) => (
              <li key={f.title} className="card">
                <span className="step-num" aria-hidden="true">{i + 1}</span>
                <h3>{f.title}</h3>
                <p style={{ margin: 0 }}>{f.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="terms">
        <div className="container container--narrow">
          <SectionHead id="terms" eyebrow="Good to know" title="What is and isn't included" />
          <div className="card">
            <Checklist items={pricingRules} />
          </div>
          <div className="callout" style={{ marginTop: "1.5rem" }}>
            <Icon name="info" size={20} />
            <p>Many AI tools offer free tiers, but advanced features usually require paid plans. We help you understand these costs before you commit — and start with tools you already have where possible.</p>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
