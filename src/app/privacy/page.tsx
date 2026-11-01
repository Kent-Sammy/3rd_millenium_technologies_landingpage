import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";

export const metadata = { ...pageMeta({ title: "Privacy Policy", description: "How we collect and use information submitted through this website.", path: "/privacy" }), robots: { index: false } };

export default function Page() {
  return (
    <section className="section">
      <div className="container prose">
        <p className="eyebrow">Legal</p>
        <h1>Privacy Policy</h1>
        <div className="callout callout--warn" style={{ margin: "1.5rem 0" }}>
          <p>
            <strong>Placeholder.</strong> This page must be replaced with a legally reviewed privacy policy before launch
            {" "}<span className="placeholder">[To be supplied by {site.name}]</span>.
          </p>
        </div>
        <h2>Points the final policy should cover</h2>
        <ul>
          <li>Who is responsible for personal data collected through this website, and how to contact them.</li>
          <li>What the enquiry form collects (name, work email, company, role, team and programme details, optional phone number) and why.</li>
          <li>Where enquiry data is sent and stored (CRM, email or form provider, once selected).</li>
          <li>How long enquiry data is kept and how people can request access, correction or deletion.</li>
          <li>Whether analytics or cookies are used, and how consent is obtained.</li>
          <li>Compliance with the Nigeria Data Protection Act 2023 and any other applicable law.</li>
        </ul>
      </div>
    </section>
  );
}
