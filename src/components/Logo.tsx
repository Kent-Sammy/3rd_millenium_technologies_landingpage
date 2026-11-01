import Link from "next/link";
import { site } from "@/config/site";

/** Placeholder logo mark — replace with the final brand asset. */
export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" className="brand" onClick={onClick} aria-label={`${site.name} — home`}>
      <span className="brand-mark" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M4 18 10 6l4 8 2-4 4 8" />
        </svg>
      </span>
      <span className="brand-name">
        {site.name}
        <small>Logo placeholder</small>
      </span>
    </Link>
  );
}
