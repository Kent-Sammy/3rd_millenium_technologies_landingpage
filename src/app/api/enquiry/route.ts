import { NextResponse } from "next/server";
import { normalise, validate } from "@/lib/enquiry";

/**
 * Enquiry endpoint.
 *
 * Validates the submission server-side, applies basic spam checks, then
 * forwards it as JSON to ENQUIRY_WEBHOOK_URL (CRM, email service, automation
 * webhook…). If no webhook is configured it returns 503 so the form can tell
 * the visitor honestly that the enquiry was NOT sent.
 */

export const runtime = "nodejs";

const MIN_FILL_MS = 3000; // humans take longer than 3s to complete this form
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>(); // best-effort, per server instance

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_MAX;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });
  }

  // Spam: honeypot field must stay empty; form must not be submitted instantly.
  const startedAt = Number(body.startedAt);
  if (str(body.website) || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    // Respond like a normal rejection without revealing which check failed.
    return NextResponse.json({ ok: false, error: "rejected" }, { status: 400 });
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const data = normalise(body);
  const errors = validate(data);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, error: "validation", fields: errors }, { status: 422 });
  }

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (!webhook) {
    console.warn("[enquiry] ENQUIRY_WEBHOOK_URL is not set — submission was not delivered.");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.ENQUIRY_WEBHOOK_SECRET
          ? { "X-Webhook-Secret": process.env.ENQUIRY_WEBHOOK_SECRET }
          : {}),
      },
      body: JSON.stringify({
        ...data,
        source: "website-enquiry-form",
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (err) {
    console.error("[enquiry] delivery failed:", err);
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

function str(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}
