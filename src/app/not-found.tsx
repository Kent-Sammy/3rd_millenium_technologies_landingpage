import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container container--narrow" style={{ textAlign: "center" }}>
        <p className="eyebrow">Page not found</p>
        <h1>We couldn&apos;t find that page</h1>
        <p className="lead">The link may be out of date. Try one of these instead.</p>
        <div className="btn-row" style={{ justifyContent: "center", marginTop: "1.5rem" }}>
          <Link href="/" className="btn btn-primary">Home</Link>
          <Link href="/programmes" className="btn btn-secondary">Programmes</Link>
          <Link href="/contact" className="btn btn-secondary">Contact</Link>
        </div>
      </div>
    </section>
  );
}
