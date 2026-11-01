"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { site } from "@/config/site";
import { getProgramme } from "@/data/programmes";
import {
  engagementOptions,
  fieldOrder,
  formatOptions,
  normalise,
  participantOptions,
  teamOptions,
  validate,
  type EnquiryData,
  type FieldErrors,
} from "@/lib/enquiry";
import { track } from "@/lib/analytics";
import { Icon } from "./Icon";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; title: string; message: ReactNode; tone?: "warn" | "error" };

const engagementFromParam: Record<string, string> = {
  monthly: "Monthly",
  three: "Three months",
  "three-month": "Three months",
  six: "Six months",
  "six-month": "Six months",
};

function contactFallback() {
  const email = site.contact.email;
  return email ? (
    <>You can also email us directly at <a href={`mailto:${email}`}>{email}</a>.</>
  ) : (
    <>A direct contact email will be listed here once confirmed <span className="placeholder">[Contact email — to be confirmed]</span>.</>
  );
}

export function EnquiryForm() {
  const params = useSearchParams();
  const programme = getProgramme(params.get("programme") ?? "");
  const type = params.get("type") === "consultation" ? "consultation" : "proposal";
  const presetEngagement = engagementFromParam[params.get("engagement") ?? ""] ?? "";

  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef<number>(0);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [enquiryType, setEnquiryType] = useState<"proposal" | "consultation">(type);

  const markStarted = () => {
    if (!startedAt.current) {
      startedAt.current = Date.now();
      track("start_enquiry_form", { enquiryType });
    }
  };

  const collect = (): Record<string, unknown> => {
    const fd = new FormData(formRef.current!);
    const obj: Record<string, unknown> = Object.fromEntries(fd.entries());
    obj.teams = fd.getAll("teams");
    obj.consent = fd.get("consent") === "on";
    obj.enquiryType = enquiryType;
    return obj;
  };

  const focusFirstError = (errs: FieldErrors) => {
    const first = fieldOrder.find((k) => errs[k]);
    if (!first) return;
    const el = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`);
    el?.focus();
  };

  const revalidateField = (name: keyof EnquiryData) => {
    if (!errors[name]) return; // only clear/update errors already shown
    const next = validate(normalise(collect()));
    setErrors((prev) => ({ ...prev, [name]: next[name] }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "submitting") return;
    const raw = collect();
    const data = normalise(raw);
    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).length) {
      setStatus({
        kind: "error",
        title: "Please check the highlighted fields",
        message: `${Object.keys(errs).length} field${Object.keys(errs).length > 1 ? "s need" : " needs"} attention before you can send your enquiry.`,
      });
      focusFirstError(errs);
      return;
    }

    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: raw.website ?? "", startedAt: startedAt.current || Date.now() }),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok && json.ok) {
        track("submit_enquiry_form", { enquiryType, engagement: data.engagement });
        setStatus({ kind: "success" }); // success panel takes focus, which scrolls it into view
        return;
      }

      if (json.error === "validation" && json.fields) {
        setErrors(json.fields);
        focusFirstError(json.fields);
        setStatus({ kind: "error", title: "Please check the highlighted fields", message: "Some details could not be accepted." });
      } else if (json.error === "not_configured") {
        setStatus({
          kind: "error",
          tone: "warn",
          title: "Your enquiry has not been sent",
          message: (
            <>
              <p>The enquiry form is not yet connected to a delivery service, so we did not receive your details. Your answers are still on this page.</p>
              <p>{contactFallback()}</p>
            </>
          ),
        });
      } else if (json.error === "rate_limited") {
        setStatus({ kind: "error", title: "Too many attempts", message: "Please wait a few minutes and try again." });
      } else if (json.error === "rejected") {
        setStatus({ kind: "error", title: "Your enquiry could not be sent", message: "Please wait a few seconds and try again." });
      } else {
        setStatus({
          kind: "error",
          title: "Your enquiry could not be sent",
          message: <>Something went wrong on our side and your details were not received. Please try again shortly. {contactFallback()}</>,
        });
      }
    } catch {
      setStatus({
        kind: "error",
        title: "Your enquiry could not be sent",
        message: "We couldn't reach the server. Please check your connection and try again.",
      });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  if (status.kind === "success") {
    return (
      <div className="success-panel" role="status" tabIndex={-1} ref={(el) => el?.focus()}>
        <div className="card-icon"><Icon name="check" size={22} /></div>
        <h2>Enquiry received</h2>
        <p>
          Thank you for telling us about your team. Your enquiry has been received. We&apos;ll review your
          requirements and follow up about the right programme.
        </p>
        <div className="btn-row">
          <Link href="/programmes" className="btn btn-secondary">Browse programmes</Link>
          <Link href="/" className="btn btn-secondary">Back to home</Link>
        </div>
      </div>
    );
  }

  const err = (k: keyof EnquiryData) =>
    errors[k] ? (
      <p className="error-msg" id={`${k}-error`}>
        <Icon name="alert" size={14} /> {errors[k]}
      </p>
    ) : null;
  const a11y = (k: keyof EnquiryData, hint?: boolean) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": [errors[k] ? `${k}-error` : "", hint ? `${k}-hint` : ""].filter(Boolean).join(" ") || undefined,
  });
  const submitting = status.kind === "submitting";

  return (
    <form
      ref={formRef}
      className="form"
      noValidate
      onSubmit={onSubmit}
      onInput={markStarted}
      aria-describedby="form-required-note"
    >
      <fieldset>
        <legend className="visually-hidden">What would you like?</legend>
        <div className="options options--grid" role="radiogroup" aria-label="Enquiry type">
          <label className="option">
            <input type="radio" name="enquiryTypeUi" value="proposal" checked={enquiryType === "proposal"} onChange={() => setEnquiryType("proposal")} />
            Request a corporate training proposal
          </label>
          <label className="option">
            <input type="radio" name="enquiryTypeUi" value="consultation" checked={enquiryType === "consultation"} onChange={() => setEnquiryType("consultation")} />
            Book a consultation
          </label>
        </div>
      </fieldset>

      <p id="form-required-note" className="hint">Fields marked <span className="req" aria-hidden="true">*</span><span className="visually-hidden">with an asterisk</span> are required.</p>

      {status.kind === "error" && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className={`form-status ${status.tone === "warn" ? "form-status--warn" : "form-status--error"}`}
        >
          <Icon name="alert" size={20} />
          <div>
            <p><strong>{status.title}</strong></p>
            {typeof status.message === "string" ? <p>{status.message}</p> : status.message}
          </div>
        </div>
      )}

      <fieldset>
        <legend>About you</legend>
        <div className="form-grid form-grid--2">
          <div className="field">
            <label htmlFor="fullName">Full name<span className="req" aria-hidden="true">*</span></label>
            <input id="fullName" name="fullName" type="text" autoComplete="name" required onBlur={() => revalidateField("fullName")} {...a11y("fullName")} />
            {err("fullName")}
          </div>
          <div className="field">
            <label htmlFor="workEmail">Work email<span className="req" aria-hidden="true">*</span></label>
            <input id="workEmail" name="workEmail" type="email" autoComplete="email" inputMode="email" required onBlur={() => revalidateField("workEmail")} {...a11y("workEmail")} />
            {err("workEmail")}
          </div>
          <div className="field">
            <label htmlFor="companyName">Company name<span className="req" aria-hidden="true">*</span></label>
            <input id="companyName" name="companyName" type="text" autoComplete="organization" required onBlur={() => revalidateField("companyName")} {...a11y("companyName")} />
            {err("companyName")}
          </div>
          <div className="field">
            <label htmlFor="jobTitle">Job title / role<span className="req" aria-hidden="true">*</span></label>
            <input id="jobTitle" name="jobTitle" type="text" autoComplete="organization-title" required onBlur={() => revalidateField("jobTitle")} {...a11y("jobTitle")} />
            {err("jobTitle")}
          </div>
          <div className="field">
            <label htmlFor="phone">Phone number<span className="opt">(optional)</span></label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" onBlur={() => revalidateField("phone")} {...a11y("phone")} />
            {err("phone")}
          </div>
          <div className="field">
            <label htmlFor="industry">Industry<span className="opt">(optional)</span></label>
            <input id="industry" name="industry" type="text" />
          </div>
        </div>
      </fieldset>

      <hr className="form-divider" />

      <fieldset className={errors.teams ? "fieldset-invalid" : undefined} aria-describedby={errors.teams ? "teams-error" : undefined}>
        <legend>Team(s) to train<span className="req" aria-hidden="true">*</span></legend>
        <div className="options options--grid">
          {teamOptions.map((t) => (
            <label key={t} className="option">
              <input type="checkbox" name="teams" value={t} onChange={() => revalidateField("teams")} />
              {t}
            </label>
          ))}
        </div>
        {err("teams")}
      </fieldset>

      <div className="form-grid form-grid--2">
        <div className="field">
          <label htmlFor="participants">Approximate number of participants<span className="req" aria-hidden="true">*</span></label>
          <select id="participants" name="participants" defaultValue="" required onChange={() => revalidateField("participants")} {...a11y("participants")}>
            <option value="" disabled>Select a range</option>
            {participantOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
          {err("participants")}
        </div>
        <div className="field">
          <label htmlFor="startDate">Target start date<span className="opt">(optional)</span></label>
          <input id="startDate" name="startDate" type="date" />
        </div>
      </div>

      <fieldset className={errors.engagement ? "fieldset-invalid" : undefined} aria-describedby={errors.engagement ? "engagement-error" : undefined}>
        <legend>Preferred engagement<span className="req" aria-hidden="true">*</span></legend>
        <div className="options options--grid">
          {engagementOptions.map((o) => (
            <label key={o} className="option">
              <input type="radio" name="engagement" value={o} defaultChecked={o === presetEngagement} onChange={() => revalidateField("engagement")} />
              {o}
            </label>
          ))}
        </div>
        {err("engagement")}
      </fieldset>

      <fieldset className={errors.deliveryFormat ? "fieldset-invalid" : undefined} aria-describedby={errors.deliveryFormat ? "deliveryFormat-error" : undefined}>
        <legend>Delivery format<span className="req" aria-hidden="true">*</span></legend>
        <div className="options options--grid">
          {formatOptions.map((o) => (
            <label key={o} className="option">
              <input type="radio" name="deliveryFormat" value={o} onChange={() => revalidateField("deliveryFormat")} />
              {o}
            </label>
          ))}
        </div>
        {err("deliveryFormat")}
      </fieldset>

      <hr className="form-divider" />

      <fieldset>
        <legend>Your goals</legend>
        <div className="field">
          <label htmlFor="goals">Primary goals or challenges<span className="req" aria-hidden="true">*</span></label>
          <p className="hint" id="goals-hint">For example: which tasks take too long, what you want teams to be able to do, or tools you want to use better.</p>
          <textarea id="goals" name="goals" rows={5} required onBlur={() => revalidateField("goals")} {...a11y("goals", true)} />
          {err("goals")}
        </div>
        <div className="form-grid form-grid--2">
          <div className="field">
            <label htmlFor="programmesOfInterest">Programmes of interest<span className="opt">(optional)</span></label>
            <input id="programmesOfInterest" name="programmesOfInterest" type="text" defaultValue={programme?.title ?? ""} />
          </div>
          <div className="field">
            <label htmlFor="existingTools">Existing AI tools<span className="opt">(optional)</span></label>
            <input id="existingTools" name="existingTools" type="text" placeholder="e.g. Microsoft 365 Copilot, ChatGPT, Gemini" />
          </div>
        </div>
        <div className="field">
          <label htmlFor="additionalInfo">Additional information<span className="opt">(optional)</span></label>
          <textarea id="additionalInfo" name="additionalInfo" rows={3} />
        </div>
      </fieldset>

      {/* Honeypot: hidden from people, often filled by bots */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="field">
        <label className="option" style={{ alignItems: "flex-start" }}>
          <input type="checkbox" name="consent" onChange={() => revalidateField("consent")} {...a11y("consent")} style={{ marginTop: 2 }} />
          <span>
            I agree that {site.name} may use the details in this form to respond to my enquiry, as described in the{" "}
            <Link href="/privacy">Privacy Policy</Link>.<span className="req" aria-hidden="true">*</span>
          </span>
        </label>
        {err("consent")}
      </div>

      <div>
        <button type="submit" className="btn btn-primary" disabled={submitting} aria-disabled={submitting}>
          {submitting ? (<><span className="spinner" aria-hidden="true" /> Sending…</>) : enquiryType === "consultation" ? "Request a consultation" : "Request a proposal"}
        </button>
        <p className="hint" style={{ marginTop: "0.75rem" }} aria-live="polite">
          {submitting ? "Sending your enquiry…" : "We only use these details to respond to your enquiry."}
        </p>
      </div>
    </form>
  );
}
