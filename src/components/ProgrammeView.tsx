"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Fires the `view_programme` analytics event once per detail-page view. */
export function ProgrammeView({ slug }: { slug: string }) {
  useEffect(() => track("view_programme", { slug }), [slug]);
  return null;
}
