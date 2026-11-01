/**
 * Analytics event helper. No tracking provider is installed.
 *
 * Events are pushed to `window.dataLayer` (if a consent-approved tag manager
 * creates it) and dispatched as a DOM `analytics` CustomEvent. Nothing is sent
 * anywhere until an owner-approved analytics tool is connected.
 */

export type AnalyticsEvent =
  | "click_book_consultation"
  | "click_request_proposal"
  | "view_programme"
  | "filter_programmes"
  | "start_enquiry_form"
  | "submit_enquiry_form"
  | "click_email"
  | "click_phone";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: AnalyticsEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer?.push({ event, ...params });
  window.dispatchEvent(new CustomEvent("analytics", { detail: { event, ...params } }));
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event, params);
  }
}

/** Map a CTA href to the matching conversion event, if any. */
export function eventForHref(href: string): AnalyticsEvent | null {
  if (href.includes("type=proposal")) return "click_request_proposal";
  if (href.includes("type=consultation")) return "click_book_consultation";
  if (href.startsWith("mailto:")) return "click_email";
  if (href.startsWith("tel:")) return "click_phone";
  return null;
}
