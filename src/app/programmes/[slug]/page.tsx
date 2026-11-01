import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { ProgrammeCard } from "@/components/ProgrammeCard";
import { ProgrammeView } from "@/components/ProgrammeView";
import { Breadcrumbs, Checklist } from "@/components/Sections";
import { TrackedLink } from "@/components/TrackedLink";
import {
  categoryMeta,
  formatLabels,
  getProgramme,
  levelLabels,
  programmes,
} from "@/data/programmes";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return programmes.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = getProgramme(slug);
  if (!p) return {};
  return pageMeta({
    title: `${p.title} Training`,
    description: `${p.shortDescription} For ${p.audience.charAt(0).toLowerCase()}${p.audience.slice(1)}`,
    path: `/programmes/${p.slug}`,
  });
}

export default async function ProgrammeDetail({ params }: Props) {
  const { slug } = await params;
  const p = getProgramme(slug);
  if (!p) notFound();

  const related = programmes.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 3);
  const proposalHref = `/contact?type=proposal&programme=${p.slug}`;
  const consultHref = `/contact?type=consultation&programme=${p.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: p.title,
    description: p.shortDescription,
    audience: { "@type": "Audience", audienceType: p.audience },
    teaches: p.learningOutcomes,
  };

  return (
    <>
      <ProgrammeView slug={p.slug} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Programmes", href: "/programmes" },
              { label: categoryMeta[p.category].shortLabel, href: `/programmes?category=${p.category}` },
              { label: p.title },
            ]}
          />
          <div className="tag-row" style={{ marginBottom: "1rem" }}>
            <span className="tag tag--brand">{categoryMeta[p.category].label}</span>
          </div>
          <h1>{p.title}</h1>
          <p className="lead">{p.shortDescription}</p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container detail-layout">
          <div>
            <div className="detail-section">
              <h2>Who it&apos;s for</h2>
              <p className="lead" style={{ marginBottom: 0 }}>{p.audience}</p>
            </div>

            <div className="detail-section">
              <h2>What participants will learn</h2>
              <ul className="outcomes">
                {p.learningOutcomes.map((o) => (
                  <li key={o}><Icon name="check" size={18} /><span>{o}</span></li>
                ))}
              </ul>
            </div>

            <div className="detail-section">
              <h2>Sample exercises</h2>
              <p className="muted small">
                Illustrative examples. Exercises are adapted to your organisation&apos;s real tasks and approved tools during scoping.
              </p>
              <Checklist items={p.sampleExercises} />
            </div>

            {p.safetyNote && (
              <div className="detail-section">
                <div className="callout callout--warn">
                  <Icon name="shield" size={20} />
                  <div>
                    <p><strong>Responsible use</strong></p>
                    <p>{p.safetyNote}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="detail-section">
              <h2>How this programme is delivered</h2>
              <p>{p.durationNote}</p>
              <p>
                Training follows our five-step approach: we understand your team, recommend the right scope, train
                through practical exercises, help participants apply what they learn, and review progress together.{" "}
                <Link href="/corporate-training#how-it-works">See how it works</Link>.
              </p>
              <p className="small muted">
                Third-party AI tool subscriptions are not included unless explicitly agreed in your proposal.
              </p>
            </div>
          </div>

          <aside className="detail-aside" aria-label="Programme summary">
            <div className="card">
              <ul className="facts">
                <li><span className="k">Level</span><span className="v">{levelLabels[p.level]}</span></li>
                <li><span className="k">Format</span><span className="v">{formatLabels[p.format]}</span></li>
                <li><span className="k">Category</span><span className="v">{categoryMeta[p.category].shortLabel}</span></li>
                <li><span className="k">Duration</span><span className="v">Agreed in your proposal</span></li>
                <li><span className="k">Delivery</span><span className="v">In-person, virtual or hybrid</span></li>
              </ul>
              <div className="stack">
                <TrackedLink href={proposalHref} className="btn btn-primary" style={{ width: "100%" }}>
                  {p.ctaLabel}
                </TrackedLink>
                <TrackedLink href={consultHref} className="btn btn-secondary" style={{ width: "100%" }}>
                  Book a Consultation
                </TrackedLink>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--surface" aria-labelledby="related">
          <div className="container">
            <div className="category-head">
              <h2 id="related" style={{ fontSize: "1.5rem" }}>Related programmes</h2>
              <Link href={`/programmes?category=${p.category}`} className="text-link">
                All {categoryMeta[p.category].shortLabel.toLowerCase()} programmes <Icon name="arrowRight" size={16} />
              </Link>
            </div>
            <div className="grid grid-3">
              {related.map((r) => <ProgrammeCard key={r.slug} p={r} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
