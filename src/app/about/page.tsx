import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import { FinalCta, PageHero, SectionHead } from "@/components/Sections";
import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About Our Approach",
  description:
    "How we approach corporate AI training and adoption: practical, role-specific, cost-conscious and responsible — for organisations in Nigeria and across Africa.",
  path: "/about",
});

const principles: { icon: IconName; title: string; text: string }[] = [
  { icon: "briefcase", title: "Start from real work", text: "Training is built around participants' actual tasks, not abstract demonstrations." },
  { icon: "users", title: "Every team, not just technical ones", text: "Finance, HR, legal, sales and creative teams all get role-specific programmes." },
  { icon: "eye", title: "Humans stay accountable", text: "AI output is reviewed by people — especially for financial, legal, HR and other high-impact work." },
  { icon: "coins", title: "Cost-conscious by default", text: "We start with the tools you already pay for and only recommend more where it is justified." },
  { icon: "shield", title: "Responsible adoption", text: "Privacy, permissions and data handling are part of every programme, not an afterthought." },
  { icon: "refresh", title: "Capability over time", text: "Short workshops can lead into longer programmes with review and continued practice." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="We help organisations turn AI into a practical workplace capability"
        lead={`${site.name} is a training, enablement and implementation partner for organisations in Nigeria, with the ambition to support teams across Africa.`}
        actions={false}
      />

      <section className="section" aria-labelledby="principles">
        <div className="container">
          <SectionHead id="principles" eyebrow="Our approach" title="Principles behind every programme" />
          <div className="grid grid-3">
            {principles.map((p) => (
              <div key={p.title} className="card">
                <span className="card-icon"><Icon name={p.icon} size={22} /></span>
                <h3>{p.title}</h3>
                <p style={{ margin: 0 }}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--surface" aria-labelledby="team">
        <div className="container split split--top">
          <SectionHead id="team" eyebrow="Our team" title="The people behind the programmes">
            <p className="lead">Founder and instructor profiles will be published here once confirmed.</p>
          </SectionHead>
          <div className="card" style={{ borderStyle: "dashed" }}>
            <h3>Founder biography</h3>
            <p><span className="placeholder">[Founder name, role, background and credentials — to be supplied and verified by the owner]</span></p>
            <h3 style={{ marginTop: "1rem" }}>Instructors</h3>
            <p style={{ margin: 0 }}><span className="placeholder">[Instructor profiles and delivery capacity — to be confirmed]</span></p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="next">
        <div className="container container--narrow" style={{ textAlign: "center" }}>
          <SectionHead id="next" center title="See what we could do for your team">
            <p className="lead">Browse programmes by department, or tell us what you need.</p>
          </SectionHead>
          <div className="btn-row" style={{ justifyContent: "center" }}>
            <Link href="/programmes" className="btn btn-primary">Explore programmes</Link>
            <Link href="/corporate-training" className="btn btn-secondary">For organisations</Link>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
