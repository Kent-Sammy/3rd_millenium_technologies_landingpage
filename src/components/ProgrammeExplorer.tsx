"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useMemo, useState, useEffect, useRef } from "react";
import {
  categoryMeta,
  levelLabels,
  programmes,
  type ProgrammeCategory,
  type ProgrammeLevel,
} from "@/data/programmes";
import { track } from "@/lib/analytics";
import { Icon } from "./Icon";
import { ProgrammeCard } from "./ProgrammeCard";

type CatFilter = ProgrammeCategory | "all";
type LevelFilter = ProgrammeLevel | "all";

const categories = Object.keys(categoryMeta) as ProgrammeCategory[];
const levels: ProgrammeLevel[] = ["beginner", "intermediate", "advanced", "mixed"];

const isCategory = (v: string | null): v is ProgrammeCategory =>
  !!v && (categories as string[]).includes(v);

export function ProgrammeExplorer() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const initialCat = params.get("category");
  const [category, setCategory] = useState<CatFilter>(isCategory(initialCat) ? initialCat : "all");
  const [level, setLevel] = useState<LevelFilter>("all");
  const [query, setQuery] = useState(params.get("q") ?? "");
  const firstRun = useRef(true);

  // Keep category/search in the URL so filtered views can be shared and linked.
  useEffect(() => {
    if (firstRun.current) { firstRun.current = false; return; }
    const sp = new URLSearchParams();
    if (category !== "all") sp.set("category", category);
    if (query.trim()) sp.set("q", query.trim());
    const qs = sp.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [category, query, pathname, router]);

  // Sync if the URL changes from outside (e.g. footer link while on this page)
  useEffect(() => {
    const c = params.get("category");
    setCategory(isCategory(c) ? c : "all");
  }, [params]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return programmes.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (level !== "all" && p.level !== level) return false;
      if (!q) return true;
      return [p.title, p.audience, p.shortDescription, ...p.learningOutcomes]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [category, level, query]);

  const countFor = (c: CatFilter) =>
    c === "all" ? programmes.length : programmes.filter((p) => p.category === c).length;

  const setCat = (c: CatFilter) => {
    setCategory(c);
    track("filter_programmes", { filter: "category", value: c });
  };
  const setLvl = (l: LevelFilter) => {
    setLevel(l);
    track("filter_programmes", { filter: "level", value: l });
  };
  const reset = () => { setCategory("all"); setLevel("all"); setQuery(""); };

  const grouped = category === "all" && level === "all" && !query.trim();

  return (
    <div>
      <div className="filters">
        <div className="filter-row">
          <fieldset className="chip-group">
            <legend>Programme type</legend>
            {(["all", ...categories] as CatFilter[]).map((c) => (
              <button key={c} type="button" className="chip" aria-pressed={category === c} onClick={() => setCat(c)}>
                {c === "all" ? "All" : categoryMeta[c].shortLabel}
                <span className="count">{countFor(c)}</span>
              </button>
            ))}
          </fieldset>
          <fieldset className="chip-group">
            <legend>Level</legend>
            {(["all", ...levels] as LevelFilter[]).map((l) => (
              <button key={l} type="button" className="chip" aria-pressed={level === l} onClick={() => setLvl(l)}>
                {l === "all" ? "Any" : levelLabels[l]}
              </button>
            ))}
          </fieldset>
        </div>
        <div className="field search-field">
          <label htmlFor="programme-search" className="visually-hidden">Search programmes</label>
          <Icon name="search" size={18} />
          <input
            id="programme-search"
            type="search"
            placeholder="Search by role, skill or tool…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="results-meta" aria-live="polite">
        <span>
          Showing <strong>{results.length}</strong> of {programmes.length} programmes
        </span>
        {!grouped && (
          <button type="button" className="text-link" style={{ background: "none", border: 0, cursor: "pointer", padding: 0 }} onClick={reset}>
            Clear filters
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="empty-state">
          <h2 style={{ fontSize: "1.25rem" }}>No programmes match those filters</h2>
          <p className="muted">Try a different search, or tell us what your team needs — most programmes are tailored.</p>
          <div className="btn-row" style={{ justifyContent: "center" }}>
            <button type="button" className="btn btn-secondary" onClick={reset}>Clear filters</button>
          </div>
        </div>
      ) : grouped ? (
        categories.map((c) => (
          <section key={c} className="category-block" aria-labelledby={`cat-${c}`}>
            <div className="category-head">
              <div>
                <h2 id={`cat-${c}`}>{categoryMeta[c].label}</h2>
                <p>{categoryMeta[c].description}</p>
              </div>
            </div>
            <div className="grid grid-3">
              {programmes.filter((p) => p.category === c).map((p) => <ProgrammeCard key={p.slug} p={p} />)}
            </div>
          </section>
        ))
      ) : (
        <div className="grid grid-3">
          {results.map((p) => <ProgrammeCard key={p.slug} p={p} />)}
        </div>
      )}
    </div>
  );
}
