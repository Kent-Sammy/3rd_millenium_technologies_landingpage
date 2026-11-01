/**
 * Site-wide settings and OWNER PLACEHOLDERS.
 *
 * Every value marked `placeholder: true` (or wrapped in [square brackets])
 * is unconfirmed. Replace it here and it updates across the whole site.
 */

export const site = {
  /** Brand name — not yet confirmed. */
  name: "[Company Name]",
  /** Short line used in the footer and metadata. */
  tagline: "Corporate AI training and implementation",
  description:
    "Practical, role-specific AI training, creative production skills and AI workflow implementation for organisations in Nigeria and across Africa.",
  /**
   * Public address. Set NEXT_PUBLIC_SITE_URL once the real domain exists.
   * On Vercel it falls back to the project's production address.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"),
  /**
   * Search engines are asked not to index the site until a real domain is set,
   * so placeholder content never appears in search results.
   */
  indexable: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
  locale: "en_NG",

  contact: {
    /** Set to null to hide until confirmed. */
    email: null as string | null, // e.g. "hello@yourdomain.com"
    phone: null as string | null, // e.g. "+234 ..."
    location: null as string | null, // e.g. "Lagos, Nigeria"
    emailPlaceholder: "[Contact email — to be confirmed]",
    phonePlaceholder: "[Phone number — to be confirmed]",
    locationPlaceholder: "[Office / service locations — to be confirmed]",
  },

  social: {
    linkedin: null as string | null, // e.g. "https://www.linkedin.com/company/..."
  },

  /** External booking link (Calendly, Microsoft Bookings…). null = use the contact form. */
  bookingUrl: null as string | null,
} as const;

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Programmes", href: "/programmes" },
  { label: "For Organisations", href: "/corporate-training" },
  { label: "AI Implementation", href: "/ai-implementation" },
  { label: "How It Works", href: "/corporate-training#how-it-works" },
  { label: "About", href: "/about" },
];

export const ctas = {
  proposal: { label: "Request a Proposal", href: "/contact?type=proposal" },
  consultation: {
    label: "Book a Consultation",
    href: site.bookingUrl ?? "/contact?type=consultation",
  },
};
