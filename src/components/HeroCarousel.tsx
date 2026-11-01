"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { categoryMeta, getProgramme } from "@/data/programmes";
import { track } from "@/lib/analytics";
import { Icon } from "./Icon";

/**
 * Hero carousel: big illustrative cards that scroll on their own, can be
 * dragged/swiped, lift and tilt on hover, and flip over (click, tap, Enter)
 * to show the matching programme. Auto-scroll pauses on hover, focus, drag,
 * when the pause button is pressed, and is off for reduced-motion users.
 */

type Theme = "light" | "blue" | "dark" | "lime" | "glass";
type CardDef = { slug: string; theme: Theme; label: string; title: string; visual: ReactNode };

const Check = ({ on }: { on?: boolean }) => (
  <span className={`hc-check${on ? " on" : ""}`}><Icon name="check" size={12} /></span>
);

const cards: CardDef[] = [
  {
    slug: "ai-for-finance-accounting", theme: "light", label: "Finance · Monthly report", title: "Variance commentary",
    visual: (
      <>
        <svg viewBox="0 0 220 90" width="100%" height="90" aria-hidden="true">
          <path d="M0 74 L30 62 L58 68 L88 46 L118 52 L148 30 L178 38 L220 12 L220 90 L0 90Z" fill="rgba(26,111,224,.14)" />
          <path d="M0 74 L30 62 L58 68 L88 46 L118 52 L148 30 L178 38 L220 12" fill="none" stroke="#1a6fe0" strokeWidth="2.5" strokeLinejoin="round" />
          <circle cx="148" cy="30" r="5" fill="#d8f36a" stroke="#0c0e12" strokeWidth="1.5" />
        </svg>
        <span className="hc-row"><span className="lime-dot" />Draft ready for analyst review</span>
      </>
    ),
  },
  {
    slug: "ai-video-production", theme: "blue", label: "AI video", title: "Storyboard draft",
    visual: (
      <>
        <div className="hc-frames">
          <span /><span className="on"><Icon name="film" size={16} /></span><span /><span /><span /><span />
        </div>
        <span className="hc-row" style={{ opacity: .9 }}>6 scenes · captions · narration</span>
      </>
    ),
  },
  {
    slug: "ai-for-sales-business-development", theme: "light", label: "Sales team", title: "Proposal outline",
    visual: (
      <>
        <span className="hc-row"><Check on />Client needs summarised</span>
        <span className="hc-row"><Check on />Approach drafted</span>
        <span className="hc-row"><Check />Pricing to confirm</span>
        <span className="hc-row"><Check />Timeline</span>
      </>
    ),
  },
  {
    slug: "ai-governance-security", theme: "dark", label: "Our approach", title: "",
    visual: (
      <p className="hc-big">
        Practical AI <span className="lime-dot" /><em>skills,</em> with people <em>in control of every</em> output.
      </p>
    ),
  },
  {
    slug: "ai-presentations-pitch-decks", theme: "lime", label: "Pitch deck", title: "Slide outline",
    visual: (
      <div className="hc-variants">
        <div><b>01</b><span className="hc-bar" style={{ flex: 1, background: "rgba(12,14,18,.15)" }} /></div>
        <div><b>02</b><span className="hc-bar" style={{ flex: 1, maxWidth: "70%", background: "rgba(12,14,18,.15)" }} /></div>
        <div><b>03</b><span className="hc-bar" style={{ flex: 1, maxWidth: "85%", background: "rgba(12,14,18,.15)" }} /></div>
        <div><b>04</b><span className="hc-bar" style={{ flex: 1, maxWidth: "55%", background: "rgba(12,14,18,.15)" }} /></div>
      </div>
    ),
  },
  {
    slug: "ai-workflow-automation", theme: "glass", label: "Automation", title: "Workflow with review step",
    visual: (
      <svg viewBox="0 0 220 120" width="100%" height="120" aria-hidden="true" fill="none">
        <path d="M44 30 H110 M110 30 V90 M110 90 H176" stroke="rgba(255,255,255,.7)" strokeWidth="2" strokeDasharray="4 5" />
        <rect x="4" y="14" width="80" height="32" rx="16" fill="rgba(255,255,255,.9)" />
        <text x="44" y="34" textAnchor="middle" fontSize="11" fill="#0c0e12" fontFamily="monospace">TRIGGER</text>
        <rect x="70" y="74" width="80" height="32" rx="16" fill="#d8f36a" />
        <text x="110" y="94" textAnchor="middle" fontSize="11" fill="#0c0e12" fontFamily="monospace">REVIEW</text>
        <rect x="136" y="14" width="80" height="32" rx="16" fill="rgba(255,255,255,.9)" />
        <text x="176" y="34" textAnchor="middle" fontSize="11" fill="#0c0e12" fontFamily="monospace">AI STEP</text>
        <path d="M84 30 H136" stroke="rgba(255,255,255,.7)" strokeWidth="2" />
      </svg>
    ),
  },
  {
    slug: "ai-for-hr-people-operations", theme: "light", label: "HR & People", title: "Job description draft",
    visual: (
      <>
        <span className="hc-bar" style={{ width: "92%" }} />
        <span className="hc-bar" style={{ width: "78%" }} />
        <span className="hc-bar" style={{ width: "86%", background: "var(--brand-soft)" }} />
        <span className="hc-bar" style={{ width: "64%" }} />
        <span className="hc-chip hc-chip--lime"><Icon name="eye" size={12} />Human review required</span>
      </>
    ),
  },
  {
    slug: "mcp-ai-integrations", theme: "blue", label: "MCP & integrations", title: "Approved connections",
    visual: (
      <svg viewBox="0 0 220 120" width="100%" height="120" aria-hidden="true" fill="none">
        {[[30, 22], [190, 22], [30, 98], [190, 98]].map(([x, y]) => (
          <path key={`${x}${y}`} d={`M110 60 L${x} ${y}`} stroke="rgba(255,255,255,.55)" strokeWidth="1.5" strokeDasharray="3 4" />
        ))}
        <circle cx="110" cy="60" r="24" fill="#d8f36a" />
        <text x="110" y="64" textAnchor="middle" fontSize="12" fill="#0c0e12" fontFamily="monospace">AI</text>
        {([["CRM", 30, 22], ["DOCS", 190, 22], ["MAIL", 30, 98], ["DATA", 190, 98]] as const).map(([t, x, y]) => (
          <g key={t}>
            <circle cx={x} cy={y} r="18" fill="rgba(255,255,255,.92)" />
            <text x={x} y={y + 3.5} textAnchor="middle" fontSize="9" fill="#0c0e12" fontFamily="monospace">{t}</text>
          </g>
        ))}
      </svg>
    ),
  },
  {
    slug: "ai-knowledge-assistants", theme: "light", label: "Knowledge assistant", title: "Answers with sources",
    visual: (
      <>
        <span className="hc-bubble hc-bubble--q">How many leave days do new staff get?</span>
        <span className="hc-bubble hc-bubble--a">According to the HR policy, …</span>
        <span className="hc-chip"><Icon name="layers" size={12} />Source: HR policy</span>
      </>
    ),
  },
  {
    slug: "ai-for-marketing-growth", theme: "lime", label: "Marketing", title: "Campaign variations",
    visual: (
      <div className="hc-variants">
        {["A", "B", "C"].map((v, i) => (
          <div key={v}><b>{v}</b><span className="hc-bar" style={{ flex: 1, maxWidth: `${90 - i * 15}%`, background: "rgba(12,14,18,.15)" }} /></div>
        ))}
      </div>
    ),
  },
];

function HeroCard({ card, clone, flipped, onFlip }: { card: CardDef; clone?: boolean; flipped: boolean; onFlip: (v: boolean) => void }) {
  const p = getProgramme(card.slug);
  const ref = useRef<HTMLDivElement>(null);
  const unflipRef = useRef<HTMLButtonElement>(null);
  const frontRef = useRef<HTMLButtonElement>(null);
  const tab = clone ? -1 : undefined;

  // Gentle 3D tilt that follows the mouse
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.classList.add("is-tilting");
    ref.current.style.setProperty("--ry", `${x * 14}deg`);
    ref.current.style.setProperty("--rx", `${-y * 12}deg`);
  };
  const onLeave = () => {
    ref.current?.classList.remove("is-tilting");
    ref.current?.style.setProperty("--ry", "0deg");
    ref.current?.style.setProperty("--rx", "0deg");
  };

  const flip = (v: boolean) => {
    onFlip(v);
    if (v) track("view_programme", { slug: card.slug, source: "hero_card" });
    requestAnimationFrame(() => (v ? unflipRef : frontRef).current?.focus({ preventScroll: true }));
  };

  if (!p) return null;
  const name = card.title || p.title;

  return (
    <div
      ref={ref}
      className={`hc-card${flipped ? " is-flipped" : ""}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      role="group"
      aria-roledescription="card"
      aria-label={p.title}
    >
      <div className="hc-inner">
        <button
          ref={frontRef}
          type="button"
          className={`hc-face hc-face--${card.theme}`}
          onClick={() => flip(true)}
          tabIndex={tab}
          inert={flipped}
          aria-label={`${name}. Show details of the ${p.title} programme`}
        >
          <span className="hc-lbl">{card.label}</span>
          {card.title && <span className="hc-ttl">{card.title}</span>}
          <span className="hc-vis">{card.visual}</span>
          <span className="hc-flip-hint" aria-hidden="true"><Icon name="refresh" size={15} /></span>
        </button>

        <div className="hc-face hc-back" inert={!flipped}>
          <span className="hc-lbl">{categoryMeta[p.category].shortLabel}</span>
          <h3 className="hc-ttl" style={{ fontSize: 18 }}>{p.title}</h3>
          <p className="hc-desc">{p.shortDescription}</p>
          <ul>
            {p.learningOutcomes.slice(0, 2).map((o) => (
              <li key={o}><Icon name="check" size={14} />{o}</li>
            ))}
          </ul>
          <div className="hc-back-actions">
            <Link href={`/programmes/${p.slug}`} className="hc-link" tabIndex={tab}>
              View programme <span><Icon name="arrowRight" size={13} /></span>
            </Link>
            <button ref={unflipRef} type="button" className="hc-unflip" onClick={() => flip(false)} tabIndex={tab} aria-label="Flip card back">
              <Icon name="refresh" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const SPEED = 38; // px per second

export function HeroCarousel() {
  const viewport = useRef<HTMLDivElement>(null);
  const pos = useRef(0);
  const hover = useRef(false);
  const holdUntil = useRef(0);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const glide = useRef<{ from: number; delta: number; t0: number; dur: number } | null>(null);
  const [paused, setPaused] = useState(false);
  const [flipped, setFlipped] = useState<string | null>(null);

  // Reduced motion: start paused (people can still drag, swipe or use the arrows)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPaused(true);
  }, []);

  const half = () => (viewport.current ? viewport.current.scrollWidth / 2 : 0);
  const wrap = useCallback(() => {
    const el = viewport.current;
    if (!el) return;
    const h = half();
    if (h <= 0) return;
    if (el.scrollLeft >= h) el.scrollLeft -= h;
    else if (el.scrollLeft <= 0) el.scrollLeft += h;
  }, []);

  // Latest pause/flip state for the animation loop (kept in refs so the loop never restarts)
  const pausedRef = useRef(paused);
  const flippedRef = useRef(flipped);
  useEffect(() => { pausedRef.current = paused; }, [paused]);
  useEffect(() => { flippedRef.current = flipped; }, [flipped]);

  // Auto-scroll loop (started once)
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const el = viewport.current;
    if (el) { el.scrollLeft = 1; pos.current = 1; }
    const tick = (t: number) => {
      const dt = Math.min(64, t - last);
      last = t;
      if (el && glide.current) {
        // Arrow-button glide (eased, time-based so it behaves the same in every browser)
        const g = glide.current;
        const p = g.dur ? Math.min(1, (t - g.t0) / g.dur) : 1;
        const eased = 1 - Math.pow(1 - p, 3);
        const h = half();
        let x = g.from + g.delta * eased;
        if (h > 0) x = ((x % h) + h) % h || h;
        el.scrollLeft = x;
        pos.current = x;
        if (p >= 1) glide.current = null;
        raf = requestAnimationFrame(tick);
        return;
      }
      const busy = pausedRef.current || hover.current || drag.current || flippedRef.current || t < holdUntil.current || document.hidden;
      if (el && !busy) {
        // Resync if something else (arrows, swipe) moved the row
        if (Math.abs(el.scrollLeft - pos.current) > 2) pos.current = el.scrollLeft;
        pos.current += (SPEED * dt) / 1000;
        const h = half();
        if (h > 0 && pos.current >= h) pos.current -= h;
        el.scrollLeft = pos.current;
      } else if (el) {
        pos.current = el.scrollLeft;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Mouse drag to scroll (touch uses native swiping)
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !viewport.current) return;
    drag.current = { x: e.clientX, left: viewport.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const el = viewport.current;
    if (!d || !el) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 5 && !d.moved) {
      d.moved = true;
      el.classList.add("is-dragging");
    }
    if (d.moved) {
      el.scrollLeft = d.left - dx;
      const h = half();
      if (el.scrollLeft >= h) { el.scrollLeft -= h; d.left -= h; }
      else if (el.scrollLeft <= 0) { el.scrollLeft += h; d.left += h; }
    }
  };
  const endDrag = () => {
    const d = drag.current;
    viewport.current?.classList.remove("is-dragging");
    holdUntil.current = performance.now() + 1500;
    // Let the click that ends a drag through only if the pointer barely moved
    setTimeout(() => { if (drag.current === d) drag.current = null; }, 0);
  };

  const nudge = (dir: 1 | -1) => {
    const el = viewport.current;
    if (!el) return;
    holdUntil.current = performance.now() + 2500;
    const card = el.querySelector<HTMLElement>(".hc-card");
    const step = card ? card.offsetWidth + 20 : 300;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    glide.current = { from: el.scrollLeft, delta: dir * step, t0: performance.now(), dur: reduce ? 0 : 650 };
  };

  const set = (clone: boolean) => (
    <div className="hc-track" aria-hidden={clone || undefined}>
      {cards.map((c) => {
        const key = `${clone ? "b" : "a"}-${c.slug}`;
        return (
          <HeroCard key={key} card={c} clone={clone} flipped={flipped === key} onFlip={(v) => setFlipped(v ? key : null)} />
        );
      })}
    </div>
  );

  return (
    <div className="hc">
      <div
        ref={viewport}
        className="hc-viewport"
        role="region"
        aria-roledescription="carousel"
        aria-label="Example workflows from our programmes"
        tabIndex={0}
        onScroll={wrap}
        onPointerEnter={(e) => { if (e.pointerType === "mouse") hover.current = true; }}
        onPointerLeave={() => { hover.current = false; if (drag.current) endDrag(); }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onClickCapture={(e) => { if (drag.current?.moved) { e.preventDefault(); e.stopPropagation(); } }}
        onFocus={() => { hover.current = true; }}
        onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) hover.current = false; }}
        onKeyDown={(e) => {
          if (e.target !== e.currentTarget) return;
          if (e.key === "ArrowRight") { e.preventDefault(); nudge(1); }
          if (e.key === "ArrowLeft") { e.preventDefault(); nudge(-1); }
        }}
      >
        {set(false)}
        {set(true)}
      </div>

      <div className="hc-controls">
        <button type="button" className="hc-btn" onClick={() => nudge(-1)} aria-label="Previous cards">
          <Icon name="arrowLeft" size={18} />
        </button>
        <button type="button" className="hc-btn" onClick={() => setPaused((v) => !v)} aria-pressed={paused} aria-label={paused ? "Play card animation" : "Pause card animation"}>
          {paused ? (
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" fill="currentColor" /></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h3.5v16H7zM13.5 4H17v16h-3.5z" fill="currentColor" /></svg>
          )}
        </button>
        <button type="button" className="hc-btn" onClick={() => nudge(1)} aria-label="Next cards">
          <Icon name="arrowRight" size={18} />
        </button>
        <span className="hc-hint">Drag, swipe or tap a card to flip it</span>
      </div>
    </div>
  );
}
