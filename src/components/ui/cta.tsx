import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";

// CTM routing number for call attribution (display differs from the live site by design).
export const PHONE_DISPLAY = "(904) 746-4003";
export const PHONE_TEL = "tel:+19047464003";

export function PrimaryCta({
  label = "Get My Free In-Home Estimate",
  className = "",
}: {
  label?: string;
  className?: string;
}): React.JSX.Element {
  return (
    <Link
      href="#form"
      className={`group inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-7 py-4 font-display text-base font-semibold text-white shadow-lg shadow-brand-500/25 transition-all duration-200 hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold-400 ${className}`}
    >
      {label}
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  );
}

export function PhoneCta({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "dark";
  className?: string;
}): React.JSX.Element {
  const tone =
    variant === "dark"
      ? "border-white/30 text-white hover:border-gold-400 hover:text-gold-400"
      : "border-navy-900/20 text-navy-900 hover:border-brand-500 hover:text-brand-500";
  return (
    <a
      href={PHONE_TEL}
      aria-label={`Call Koehler Home Improvement at ${PHONE_DISPLAY}`}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border-2 px-7 py-4 font-display text-base font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold-400 ${tone} ${className}`}
    >
      <Phone className="h-4 w-4" />
      {PHONE_DISPLAY}
    </a>
  );
}

export function DualCta({
  primaryLabel,
  phoneVariant = "light",
  className = "",
}: {
  primaryLabel?: string;
  phoneVariant?: "light" | "dark";
  className?: string;
}): React.JSX.Element {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:items-center ${className}`}>
      <PrimaryCta label={primaryLabel} />
      <PhoneCta variant={phoneVariant} />
    </div>
  );
}
