import Link from "next/link";
import type { ReactNode } from "react";
import { ctas } from "@/config/site";
import { engagements, faqs, processSteps } from "@/data/content";
import { Icon } from "./Icon";
import { TrackedLink } from "./TrackedLink";

export function SectionHead({
  eyebrow,
  title,
  children,
  center,
  as: H = "h2",
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  center?: boolean;
  as?: "h1" | "h2";
  id?: string;
}) {
  return (
    <div className={`section-head${center ? " section-head--center" : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <H id={id}>{title}</H>
      {children}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  actions = true,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  actions?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        {children}
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
        {actions && (
          <div className="btn-row btn-row--stack-mobile">
            <TrackedLink href={ctas.consultation.href} className="btn btn-primary">
              {ctas.consultation.label}
            </TrackedLink>
            <TrackedLink href={ctas.proposal.href} className="btn btn-secondary">
              {ctas.proposal.label}
            </TrackedLink>
          </div>
        )}
      </div>
    </section>
  );
}

export function Checklist({ items, columns }: { items: string[]; columns?: 2 }) {
  return (
    <ul className={`checklist${columns === 2 ? " checklist--2" : ""}`}>
      {items.map((t) => (
        <li key={t}>
          <Icon name="check" size={18} />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export function ProcessSteps() {
  return (
    <ol className="steps">
      {processSteps.map((s, i) => (
        <li key={s.title} className="step">
          <span className="step-num" aria-hidden="true">{i + 1}</span>
          <h3><span className="visually-hidden">Step {i + 1}: </span>{s.title}</h3>
          <p>{s.description}</p>
        </li>
      ))}
    </ol>
  );
}

export function EngagementCards({ showCta = true }: { showCta?: boolean }) {
  return (
    <div className="grid grid-3">
      {engagements.map((e) => (
        <article key={e.name} className={`card plan${e.highlight ? " plan--highlight" : ""}`}>
          {e.highlight && <span className="tag plan-badge">Common starting point for teams</span>}
          <h3>{e.name}</h3>
          <p>{e.summary}</p>
          <p className="price-note">Priced by proposal</p>
          <Checklist items={e.points} />
          {showCta && (
            <TrackedLink
              href={`/contact?type=proposal&engagement=${encodeURIComponent(e.name.split(" ")[0].toLowerCase())}`}
              className={`btn ${e.highlight ? "btn-primary" : "btn-secondary"}`}
            >
              Request a Tailored Proposal
            </TrackedLink>
          )}
        </article>
      ))}
    </div>
  );
}

export function Faq({ items = faqs }: { items?: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q}>
          <summary>
            {f.q}
            <Icon name="chevronDown" size={20} />
          </summary>
          <div className="faq-body"><p>{f.a}</p></div>
        </details>
      ))}
    </div>
  );
}

export function FinalCta() {
  return (
    <section className="section" aria-labelledby="final-cta">
      <div className="container">
        <div className="cta-band">
          <h2 id="final-cta">Let&apos;s make AI useful to your team.</h2>
          <p>
            Tell us about your organisation, the teams you want to train and what you want them to achieve.
            We&apos;ll work with you to define a practical programme.
          </p>
          <div className="btn-row btn-row--stack-mobile" style={{ marginTop: "1.75rem" }}>
            <TrackedLink href={ctas.consultation.href} className="btn btn-light">
              Book a Consultation
            </TrackedLink>
            <TrackedLink href={ctas.proposal.href} className="btn btn-outline-light">
              Request a Corporate Training Proposal
            </TrackedLink>
          </div>
          <p className="closing">Your people bring the expertise. We&apos;ll help them put AI to work.</p>
        </div>
      </div>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol>
        {items.map((it, i) => (
          <li key={it.label}>
            {it.href && i < items.length - 1 ? (
              <Link href={it.href}>{it.label}</Link>
            ) : (
              <span aria-current="page">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
