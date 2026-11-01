/**
 * Enquiry form schema + validation, shared by the browser form and the
 * server route so both enforce the same rules.
 */

export const teamOptions = [
  "Leadership & executives",
  "Finance & accounting",
  "HR & People Operations",
  "Marketing & growth",
  "Sales & business development",
  "Operations",
  "Executive assistants",
  "Legal & compliance",
  "Customer experience",
  "Product management",
  "Design & creative",
  "Software development",
  "Project management",
  "Communications / media / training",
  "Other",
] as const;

export const engagementOptions = ["Monthly", "Three months", "Six months", "Not sure yet"] as const;
export const formatOptions = ["In-person", "Virtual", "Hybrid", "Not sure"] as const;
export const participantOptions = ["1–10", "11–25", "26–50", "51–100", "101–250", "250+"] as const;
export const enquiryTypes = ["proposal", "consultation"] as const;

export type EnquiryData = {
  enquiryType: (typeof enquiryTypes)[number];
  fullName: string;
  workEmail: string;
  companyName: string;
  jobTitle: string;
  teams: string[];
  participants: string;
  engagement: string;
  deliveryFormat: string;
  goals: string;
  phone?: string;
  industry?: string;
  programmesOfInterest?: string;
  startDate?: string;
  existingTools?: string;
  additionalInfo?: string;
  consent: boolean;
};

export type FieldErrors = Partial<Record<keyof EnquiryData, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX = { short: 200, long: 4000 };

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/** Normalise unknown input into EnquiryData (trimmed, length-capped). */
export function normalise(raw: Record<string, unknown>): EnquiryData {
  const cap = (v: unknown, n = MAX.short) => str(v).slice(0, n);
  const teams = Array.isArray(raw.teams)
    ? raw.teams.map((t) => str(t)).filter((t) => (teamOptions as readonly string[]).includes(t))
    : [];
  const type = str(raw.enquiryType);
  return {
    enquiryType: (enquiryTypes as readonly string[]).includes(type)
      ? (type as EnquiryData["enquiryType"])
      : "proposal",
    fullName: cap(raw.fullName),
    workEmail: cap(raw.workEmail),
    companyName: cap(raw.companyName),
    jobTitle: cap(raw.jobTitle),
    teams,
    participants: cap(raw.participants),
    engagement: cap(raw.engagement),
    deliveryFormat: cap(raw.deliveryFormat),
    goals: cap(raw.goals, MAX.long),
    phone: cap(raw.phone, 40) || undefined,
    industry: cap(raw.industry) || undefined,
    programmesOfInterest: cap(raw.programmesOfInterest, 1000) || undefined,
    startDate: cap(raw.startDate, 20) || undefined,
    existingTools: cap(raw.existingTools, 1000) || undefined,
    additionalInfo: cap(raw.additionalInfo, MAX.long) || undefined,
    consent: raw.consent === true || raw.consent === "true" || raw.consent === "on",
  };
}

export function validate(d: EnquiryData): FieldErrors {
  const e: FieldErrors = {};
  if (!d.fullName) e.fullName = "Please enter your full name.";
  if (!d.workEmail) e.workEmail = "Please enter your work email.";
  else if (!EMAIL_RE.test(d.workEmail)) e.workEmail = "Please enter a valid email address, e.g. name@company.com.";
  if (!d.companyName) e.companyName = "Please enter your company name.";
  if (!d.jobTitle) e.jobTitle = "Please enter your job title or role.";
  if (d.teams.length === 0) e.teams = "Please select at least one team you would like to train.";
  if (!(participantOptions as readonly string[]).includes(d.participants))
    e.participants = "Please choose an approximate number of participants.";
  if (!(engagementOptions as readonly string[]).includes(d.engagement))
    e.engagement = "Please choose a preferred engagement.";
  if (!(formatOptions as readonly string[]).includes(d.deliveryFormat))
    e.deliveryFormat = "Please choose a delivery format.";
  if (!d.goals) e.goals = "Please describe your main goals or challenges.";
  else if (d.goals.length < 10) e.goals = "Please add a little more detail (at least 10 characters).";
  if (d.phone && !/^[+()\d\s-]{7,20}$/.test(d.phone))
    e.phone = "Please enter a valid phone number, or leave this blank.";
  if (!d.consent) e.consent = "Please confirm you agree to be contacted about this enquiry.";
  return e;
}

/** Order used to move focus to the first invalid field. */
export const fieldOrder: (keyof EnquiryData)[] = [
  "fullName", "workEmail", "companyName", "jobTitle", "phone", "teams", "participants",
  "engagement", "deliveryFormat", "goals", "consent",
];
