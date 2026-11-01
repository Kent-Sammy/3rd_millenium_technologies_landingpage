import Link from "next/link";
import { HeroCarousel } from "@/components/HeroCarousel";
import { Icon, type IconName } from "@/components/Icon";
import {
  Checklist,
  EngagementCards,
  Faq,
  FinalCta,
  ProcessSteps,
  SectionHead,
} from "@/components/Sections";
import { TrackedLink } from "@/components/TrackedLink";
import { ctas, site } from "@/config/site";
import {
  challengeQuestions,
  costBenefits,
  creativeFeatures,
  engagements,
  organisationTypes,
  processSteps,
  sectors,
  services,
  technicalFeatures,
} from "@/data/content";
import { programmes, programmesByCategory } from "@/data/programmes";
import { pageMeta } from "@/lib/seo";

export const metadata = {
  ...pageMeta({
    title: "Corporate AI Training & Implementation in Nigeria",
    description:
      "Practical AI training for employees, AI creative production skills and AI workflow automation for companies in Nigeria. Role-specific programmes for every team.",
    path: "/",
  }),
  title: { absolute: `Corporate AI Training & Implementation in Nigeria | ${site.name}` },
};

const marqueeIcons: IconName[] = ["compass", "chart", "users", "megaphone", "briefcase", "layers", "mail", "shield", "phone", "spark", "eye", "code", "workflow"];

function TeamsMarquee() {
  const teams = programmesByCategory("business").map((p, i) => ({
    name: p.title.replace(/^AI for /, ""),
    icon: marqueeIcons[i % marqueeIcons.length],
  }));
  const list = (hidden?: boolean) => (
    <ul aria-hidden={hidden || undefined}>
      {teams.map((t) => (
        <li key={t.name}><Icon name={t.icon} size={18} />{t.name}</li>
      ))}
    </ul>
  );
  return (
    <section className="marquee" aria-label="Teams we train">
      <div className="marquee-track">
        {list()}
        {list(true)}
      </div>
    </section>
  );
}

export default function HomePage() {
  const teamProgrammes = programmesByCategory("business");

  return (
    <>
      {/* 1 — Hero */}
      <section className="home-hero sky" aria-labelledby="hero-title">
        <div className="container">
          <p className="eyebrow">Corporate AI Training &amp; Implementation</p>
          <h1 id="hero-title">
            Your team <span className="icon-pill" aria-hidden="true"><Icon name="users" /></span> is capable of
            more. <span className="tone">Give them the AI{" "}
            <span className="icon-pill icon-pill--lime" aria-hidden="true"><Icon name="spark" /></span> skills to
            prove it <span className="icon-pill icon-pill--glass" aria-hidden="true"><Icon name="chart" /></span>.</span>
          </h1>
          <p className="lead">
            We help organisations train their people, improve everyday workflows and put AI to work across the
            business. From finance and HR to marketing, creative production and software development, we turn AI
            from something your employees experiment with into something they can use confidently in their work.
          </p>
          <div className="btn-row btn-row--stack-mobile">
            <Link href="/programmes" className="btn btn-glass">Explore Our Programmes</Link>
            <TrackedLink href={ctas.consultation.href} className="btn btn-primary">Book a Consultation</TrackedLink>
          </div>
        </div>
        <HeroCarousel />
        <div className="container">
          <p className="hero-support">
            <span>Practical training</span>
            <span>Real business applications</span>
            <span>Smarter ways of working</span>
          </p>
          <p className="fan-note">Cards show illustrative examples of workflows participants practise, not client work.</p>
        </div>
      </section>

      <TeamsMarquee />

      {/* Positioning statement + key facts (all counts come from the programme data) */}
      <section className="section" style={{ paddingTop: "clamp(2rem, 1rem + 3vw, 3.5rem)" }} aria-labelledby="about-us">
        <div className="container">
          <p className="eyebrow" style={{ display: "block", textAlign: "center" }}>About us</p>
          <h2 id="about-us" className="statement">
            We help organisations turn AI into a practical{" "}
            <span className="icon-pill" aria-hidden="true"><Icon name="briefcase" /></span> workplace capability{" "}
            <span className="tone">for every <span className="icon-pill icon-pill--lime" aria-hidden="true"><Icon name="users" /></span> team.</span>
          </h2>

          <div className="bento">
            <Link href="/programmes" className="bento-card bento-card--sky bento-tall">
              <span className="lbl">Programme catalogue</span>
              <span className="icon-btn" aria-hidden="true"><Icon name="layers" size={18} /></span>
              <div className="bento-inner">
                <div className="bento-num">{programmes.length}</div>
                <p>Practical programmes across business functions, creative production and technical implementation.</p>
              </div>
            </Link>
            <Link href="/programmes?category=business" className="bento-card bento-tall" style={{ justifyContent: "space-between" }}>
              <span className="lbl">Departments covered</span>
              <div className="bento-num">{teamProgrammes.length}</div>
              <div>
                <div className="avatar-row" aria-hidden="true" style={{ marginBottom: "1rem" }}>
                  {(["chart", "users", "megaphone", "code"] as IconName[]).map((n) => (
                    <span key={n}><Icon name={n} size={16} /></span>
                  ))}
                </div>
                <p>From finance and HR to legal, product and engineering — each team gets a role-specific programme.</p>
              </div>
            </Link>
            <Link href="/corporate-training#how-it-works" className="bento-card bento-card--lime">
              <span className="lbl">How it works</span>
              <div className="bento-num">{processSteps.length} steps</div>
              <p>From understanding your team to reviewing progress together.</p>
            </Link>
            <Link href="/pricing" className="bento-card bento-card--dark" style={{ minHeight: 0 }}>
              <span>
                <span className="lbl" style={{ display: "block", marginBottom: "0.35rem" }}>Engagement options</span>
                <span className="small" style={{ color: "#fff" }}>Monthly, three- and six-month</span>
              </span>
              <span className="bento-num">{engagements.length}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2 — Business challenge */}
      <section className="section section--surface" aria-labelledby="challenge">
        <div className="container split split--top">
          <SectionHead id="challenge" eyebrow="The challenge" title={<>AI is changing how work gets done. <span className="tone">Is your team keeping up?</span></>}>
            <p className="lead">
              Your employees don&apos;t need another presentation about the future of AI. They need to understand
              how it applies to their jobs today.
            </p>
            <p className="muted">Our programmes start from the practical questions your teams are already asking.</p>
          </SectionHead>
          <ul className="grid" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {challengeQuestions.map((q) => (
              <li key={q.question} className="question-card">
                <span className="card-icon"><Icon name={q.icon} size={20} /></span>
                <span>{q.question}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3 — What we do */}
      <section className="section" aria-labelledby="what-we-do">
        <div className="container">
          <SectionHead center id="what-we-do" eyebrow="What we do" title={<>Training, enablement and implementation <span className="tone">in one place.</span></>}>
            <p className="lead">Start with the skills your teams need now, then build on them with workflows, tools and ongoing support.</p>
          </SectionHead>
          <div className="grid grid-3">
            {services.map((s) => (
              <article key={s.title} className="card">
                <span className="card-icon"><Icon name={s.icon} size={22} /></span>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <TrackedLink href={s.cta.href} className="text-link">
                  {s.cta.label} <Icon name="arrowRight" size={16} />
                </TrackedLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Programmes by team */}
      <section className="section section--surface" aria-labelledby="by-team">
        <div className="container">
          <SectionHead id="by-team" eyebrow="Programmes by team" title={<>AI skills for every team, <span className="tone">not just the technical ones.</span></>}>
            <p className="lead">
              Every department works differently. Our programmes focus on the tasks, challenges and outcomes relevant
              to each function.
            </p>
          </SectionHead>
          <ul className="grid grid-3" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {teamProgrammes.map((p) => (
              <li key={p.slug}>
                <Link href={`/programmes/${p.slug}`} className="tile" style={{ height: "100%" }}>
                  <span>
                    {p.title.replace(/^AI for /, "")}
                    <small>{p.shortDescription}</small>
                  </span>
                  <Icon name="arrowRight" size={18} />
                </Link>
              </li>
            ))}
          </ul>
          <div className="btn-row" style={{ marginTop: "2.5rem" }}>
            <Link href="/programmes" className="btn btn-primary">View all programmes</Link>
          </div>
        </div>
      </section>

      {/* 5 — Creative production */}
      <section className="section" aria-labelledby="creative">
        <div className="container split split--top">
          <div>
            <SectionHead id="creative" eyebrow="Creative production" title={<>Create more than content. <span className="tone">Build a complete AI-powered production workflow.</span></>}>
              <p className="lead">
                From video and commercials to pitch decks and social content, your teams learn to explore ideas faster,
                produce more variations and keep a clear review process in place.
              </p>
            </SectionHead>
            <div className="callout">
              <Icon name="eye" size={20} />
              <p>
                AI speeds up exploration and drafting — it does not replace creative judgement. Every programme
                includes quality, accuracy, usage-rights and brand checks before anything is published.
              </p>
            </div>
            <div className="btn-row" style={{ marginTop: "1.75rem" }}>
              <Link href="/programmes?category=creative" className="btn btn-primary">Explore creative programmes</Link>
            </div>
          </div>
          <ul className="grid" style={{ listStyle: "none", padding: 0, margin: 0, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))" }}>
            {creativeFeatures.map((f) => (
              <li key={f.slug}>
                <Link href={`/programmes/${f.slug}`} className="tile" style={{ height: "100%" }}>
                  {f.title} <Icon name="arrowRight" size={18} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6 — Automation & technical */}
      <section className="section section--dark" aria-labelledby="technical">
        <div className="container">
          <SectionHead id="technical" eyebrow="Automation & technical skills" title={<>Move beyond prompts. <span className="tone">Build workflows that do useful work.</span></>}>
            <p className="lead">
              Technical programmes cover automation, AI agents, Model Context Protocol (MCP) integrations and
              multi-model workflows. Advanced training is scoped to your organisation&apos;s systems, tools,
              participant skill levels, permissions and security requirements.
            </p>
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
          <div className="btn-row" style={{ marginTop: "2.5rem" }}>
            <Link href="/ai-implementation" className="btn btn-light">AI implementation support</Link>
            <Link href="/programmes?category=technical" className="btn btn-outline-light">Technical programmes</Link>
          </div>
        </div>
      </section>

      {/* 7 — How it works */}
      <section className="section" aria-labelledby="how-it-works">
        <div className="container">
          <SectionHead center id="how-it-works" eyebrow="How it works" title={<>A clear process from first conversation <span className="tone">to applied skills.</span></>} />
          <ProcessSteps />
        </div>
      </section>

      {/* 8 — Engagement options */}
      <section className="section section--surface" aria-labelledby="engagements">
        <div className="container">
          <SectionHead center id="engagements" eyebrow="Engagement options" title={<>Start with a focused workshop. <span className="tone">Build capability over time.</span></>}>
            <p className="lead">Choose the engagement length that suits your goals. Schedule, capacity and outcomes are agreed in your proposal.</p>
          </SectionHead>
          <EngagementCards />
          <p className="small muted" style={{ marginTop: "1.75rem", textAlign: "center" }}>
            Need something larger? We also scope custom enterprise programmes for multiple departments, specialist
            technical training or AI implementation. <Link href="/pricing">See how pricing works</Link>.
          </p>
        </div>
      </section>

      {/* 9 — Cost-conscious adoption */}
      <section className="section" aria-labelledby="cost">
        <div className="container split split--top">
          <SectionHead id="cost" eyebrow="Cost-conscious adoption" title={<>Better AI adoption starts with <span className="tone">choosing the right tools.</span></>}>
            <p className="lead">
              More subscriptions do not automatically mean better results. We help organisations understand their
              requirements, evaluate suitable AI tools and build an adoption plan that considers cost, security,
              existing systems and employee needs.
            </p>
          </SectionHead>
          <div className="card">
            <span className="card-icon"><Icon name="coins" size={22} /></span>
            <h3>What this includes</h3>
            <Checklist items={costBenefits} />
          </div>
        </div>
      </section>

      {/* 10 — Who we work with */}
      <section className="section section--brand" aria-labelledby="sectors">
        <div className="container">
          <SectionHead center id="sectors" eyebrow="Who we work with" title={<>Programmes for organisations <span className="tone">of every size and sector.</span></>}>
            <p className="lead">
              Our approach adapts to {organisationTypes.map((o) => o.toLowerCase()).join(", ").replace(/, ([^,]*)$/, " and $1")}, and to sectors
              with their own regulatory and operational needs, including:
            </p>
          </SectionHead>
          <ul className="chip-cloud" style={{ justifyContent: "center" }}>
            {sectors.map((s) => (
              <li key={s}><Icon name="building" size={16} />{s}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 11 — FAQ */}
      <section className="section" aria-labelledby="faq">
        <div className="container container--narrow">
          <SectionHead center id="faq" eyebrow="FAQ" title={<>Frequently asked <span className="tone">questions</span></>} />
          <Faq />
        </div>
      </section>

      {/* 12 — Final CTA */}
      <FinalCta />
    </>
  );
}
