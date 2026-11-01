import Link from "next/link";
import { categoryMeta, levelLabels, formatLabels, type Programme } from "@/data/programmes";
import { Icon } from "./Icon";

export function ProgrammeCard({ p, headingLevel = 3 }: { p: Programme; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="card card--link programme-card">
      <div className="meta">
        <span className="tag tag--brand">{categoryMeta[p.category].shortLabel}</span>
        <span className="tag">{levelLabels[p.level]}</span>
        <span className="tag">{formatLabels[p.format]}</span>
      </div>
      <H>
        <Link href={`/programmes/${p.slug}`} className="stretched">{p.title}</Link>
      </H>
      <p className="audience"><strong>For:</strong> {p.audience}</p>
      <p>{p.shortDescription}</p>
      <ul aria-label="Selected learning outcomes">
        {p.learningOutcomes.slice(0, 3).map((o) => (
          <li key={o}><Icon name="check" size={14} />{o}</li>
        ))}
      </ul>
      <span className="text-link" aria-hidden="true">
        View outcomes <Icon name="arrowRight" size={16} />
      </span>
    </article>
  );
}
