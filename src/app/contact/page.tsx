import { Suspense } from "react";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/Sections";
import { TrackedLink } from "@/components/TrackedLink";
import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Request a Corporate Training Proposal",
  description:
    "Tell us about your organisation and the teams you want to train. Request a tailored AI training proposal or book a consultation.",
  path: "/contact",
});

const next = [
  "We review your requirements and the teams involved.",
  "We arrange a short consultation to clarify goals, tools and constraints.",
  "We send a written proposal with scope, schedule, deliverables and price.",
];

export default function ContactPage() {
  const { contact } = site;
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us about your team"
        lead="Share a few details about your organisation, the teams you want to train and what you want them to achieve. We'll use this to recommend a practical programme."
        actions={false}
      />
      <section className="section section--tight">
        <div className="container detail-layout">
          <div className="form-card">
            <Suspense fallback={<p className="muted">Loading form…</p>}>
              <EnquiryForm />
            </Suspense>
          </div>
          <aside className="detail-aside" aria-label="What happens next">
            <div className="card">
              <h2 style={{ fontSize: "1.25rem" }}>What happens next</h2>
              <ol className="checklist" style={{ marginBottom: "1.5rem" }}>
                {next.map((n, i) => (
                  <li key={n}>
                    <span className="step-num" aria-hidden="true" style={{ width: 22, height: 22, fontSize: "0.75rem", margin: 0 }}>{i + 1}</span>
                    <span className="small">{n}</span>
                  </li>
                ))}
              </ol>
              <h2 style={{ fontSize: "1.0625rem" }}>Prefer to reach us directly?</h2>
              <ul className="checklist small">
                <li>
                  <Icon name="mail" size={18} />
                  {contact.email ? <TrackedLink href={`mailto:${contact.email}`}>{contact.email}</TrackedLink> : <span className="placeholder">{contact.emailPlaceholder}</span>}
                </li>
                <li>
                  <Icon name="phone" size={18} />
                  {contact.phone ? <TrackedLink href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</TrackedLink> : <span className="placeholder">{contact.phonePlaceholder}</span>}
                </li>
                <li>
                  <Icon name="pin" size={18} />
                  {contact.location ?? <span className="placeholder">{contact.locationPlaceholder}</span>}
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
