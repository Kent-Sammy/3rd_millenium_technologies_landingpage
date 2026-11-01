import Link from "next/link";
import { site } from "@/config/site";
import { categoryMeta } from "@/data/programmes";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { TrackedLink } from "./TrackedLink";

export function Footer() {
  const year = new Date().getFullYear();
  const { contact, social } = site;

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Logo />
            <p style={{ marginTop: "1.25rem", maxWidth: "38ch" }}>
              We help organisations in Nigeria and across Africa train their people, improve everyday workflows and
              adopt AI responsibly.
            </p>
          </div>

          <nav aria-label="Programmes">
            <h2>Programmes</h2>
            <ul>
              <li><Link href="/programmes">All programmes</Link></li>
              {(Object.keys(categoryMeta) as (keyof typeof categoryMeta)[]).map((c) => (
                <li key={c}><Link href={`/programmes?category=${c}`}>{categoryMeta[c].shortLabel}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Corporate services">
            <h2>Corporate services</h2>
            <ul>
              <li><Link href="/corporate-training">Corporate AI training</Link></li>
              <li><Link href="/ai-implementation">AI implementation</Link></li>
              <li><Link href="/corporate-training#how-it-works">How it works</Link></li>
              <li><Link href="/pricing">Engagements &amp; pricing</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact?type=proposal">Request a proposal</Link></li>
            </ul>
          </nav>

          <div>
            <h2>Contact</h2>
            <ul className="footer-contact">
              <li>
                <Icon name="mail" size={16} />
                {contact.email ? (
                  <TrackedLink href={`mailto:${contact.email}`}>{contact.email}</TrackedLink>
                ) : (
                  <span className="placeholder">{contact.emailPlaceholder}</span>
                )}
              </li>
              <li>
                <Icon name="phone" size={16} />
                {contact.phone ? (
                  <TrackedLink href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</TrackedLink>
                ) : (
                  <span className="placeholder">{contact.phonePlaceholder}</span>
                )}
              </li>
              <li>
                <Icon name="pin" size={16} />
                {contact.location ?? <span className="placeholder">{contact.locationPlaceholder}</span>}
              </li>
              <li>
                <Icon name="linkedin" size={16} />
                {social.linkedin ? (
                  <a href={social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                ) : (
                  <span className="placeholder">[LinkedIn — to be confirmed]</span>
                )}
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p style={{ margin: 0 }}>© {year} {site.name}. All rights reserved.</p>
          <ul>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
