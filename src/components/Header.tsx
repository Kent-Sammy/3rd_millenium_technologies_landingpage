"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ctas, mainNav } from "@/config/site";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { TrackedLink } from "./TrackedLink";

function isCurrent(pathname: string, href: string) {
  const path = href.split("#")[0].split("?")[0];
  if (href.includes("#")) return false;
  return path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(path + "/");
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close menu on route change
  useEffect(() => setOpen(false), [pathname]);

  // Track scroll so the homepage header can sit transparently on the hero
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const overlay = pathname === "/" && !scrolled && !open;

  // Lock scroll, close on Escape, keep focus inside while open
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const items = panelRef.current.querySelectorAll<HTMLElement>("a, button");
        const list = [toggleRef.current!, ...Array.from(items)];
        const idx = list.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && idx <= 0) { e.preventDefault(); list[list.length - 1].focus(); }
        else if (!e.shiftKey && idx === list.length - 1) { e.preventDefault(); list[0].focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`site-header${overlay ? " is-overlay" : ""}${scrolled ? " is-scrolled" : ""}`}>
      <div className="container header-inner">
        <Logo onClick={close} />

        <nav className="nav-desktop" aria-label="Main">
          <ul>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={isCurrent(pathname, item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-cta">
          <TrackedLink href={ctas.proposal.href} className="btn btn-primary btn-sm">
            {ctas.proposal.label}
          </TrackedLink>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} size={22} />
          <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      {open && (
        <div id="mobile-nav" ref={panelRef} className="mobile-nav">
          <nav aria-label="Mobile">
            <ul>
              <li><Link href="/" onClick={close} aria-current={pathname === "/" ? "page" : undefined}>Home <Icon name="arrowRight" size={18} /></Link></li>
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={close} aria-current={isCurrent(pathname, item.href) ? "page" : undefined}>
                    {item.label} <Icon name="arrowRight" size={18} />
                  </Link>
                </li>
              ))}
              <li><Link href="/pricing" onClick={close} aria-current={pathname === "/pricing" ? "page" : undefined}>Pricing <Icon name="arrowRight" size={18} /></Link></li>
            </ul>
          </nav>
          <TrackedLink href={ctas.proposal.href} className="btn btn-primary" onClick={close}>
            {ctas.proposal.label}
          </TrackedLink>
          <TrackedLink href={ctas.consultation.href} className="btn btn-secondary" onClick={close}>
            {ctas.consultation.label}
          </TrackedLink>
        </div>
      )}
    </header>
  );
}
