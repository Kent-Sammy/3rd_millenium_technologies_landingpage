import Link from "next/link";
import { site } from "@/config/site";
import { BrandLogo } from "./BrandLogo";

/** Company logo linking home. Colours adapt to the background via CSS. */
export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" className="brand" onClick={onClick}>
      <BrandLogo className="brand-logo" />
      <span className="visually-hidden">{site.name} — home</span>
    </Link>
  );
}
