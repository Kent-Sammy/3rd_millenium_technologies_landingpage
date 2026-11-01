import { Suspense } from "react";
import { ProgrammeExplorer } from "@/components/ProgrammeExplorer";
import { FinalCta, PageHero } from "@/components/Sections";
import { programmes } from "@/data/programmes";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "AI Training Programmes for Every Team",
  description:
    "Browse role-specific AI training programmes for finance, HR, marketing, sales, operations, legal and developers, plus AI video, pitch decks, automation, AI agents and MCP.",
  path: "/programmes",
});

export default function ProgrammesPage() {
  return (
    <>
      <PageHero
        eyebrow="Programmes"
        title="Find the right AI programme for your team"
        lead={`${programmes.length} practical programmes across business functions, creative production and technical implementation. Every programme is tailored to your tools, participants and goals during scoping.`}
        actions={false}
      />
      <section className="section section--tight">
        <div className="container">
          <Suspense fallback={<p className="muted">Loading programmes…</p>}>
            <ProgrammeExplorer />
          </Suspense>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
