import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";

export const metadata = { ...pageMeta({ title: "Terms of Use", description: "Terms governing the use of this website.", path: "/terms" }), robots: { index: false } };

export default function Page() {
  return (
    <section className="section">
      <div className="container prose">
        <p className="eyebrow">Legal</p>
        <h1>Terms of Use</h1>
        <div className="callout callout--warn" style={{ margin: "1.5rem 0" }}>
          <p>
            <strong>Placeholder.</strong> This page must be replaced with a legally reviewed terms of use before launch
            {" "}<span className="placeholder">[To be supplied by {site.name}]</span>.
          </p>
        </div>
        <h2>Points the final terms should cover</h2>
        <ul>
          <li>The legal entity operating this website.</li>
          <li>That website content is general information and not a binding offer; engagements are governed by written proposals and contracts.</li>
          <li>Intellectual property in website content and materials.</li>
          <li>Limitations of liability and governing law.</li>
        </ul>
      </div>
    </section>
  );
}
