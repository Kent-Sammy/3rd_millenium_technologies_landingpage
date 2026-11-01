"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { eventForHref, track } from "@/lib/analytics";

/** next/link that fires the matching analytics event for CTA hrefs. */
export function TrackedLink({
  href,
  onClick,
  ...rest
}: ComponentProps<typeof Link> & { href: string }) {
  const isExternal = /^(https?:|mailto:|tel:)/.test(href);
  const handle: ComponentProps<"a">["onClick"] = (e) => {
    const event = eventForHref(href);
    if (event) track(event, { href });
    onClick?.(e);
  };
  if (isExternal) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        onClick={handle}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(rest as ComponentProps<"a">)}
      />
    );
  }
  return <Link href={href} onClick={handle} {...rest} />;
}
