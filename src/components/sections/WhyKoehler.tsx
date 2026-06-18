import { Check, BadgeCheck } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { DualCta } from "@/components/ui/cta";

const REASONS = [
  "Family-owned since 2003 — over 20 years serving Jacksonville",
  "Installed by our own employees, never subcontractors",
  "Owner Toby personally reviews every proposal",
  "Florida Certified Building Contractor (CBC056153)",
  "Licensed, insured & bonded",
  "Backed by a written workmanship warranty",
];

export default function WhyKoehler(): React.JSX.Element {
  return (
    <section id="why-koehler" className="bg-navy-900 py-20 text-white lg:py-28">
      <div className="container-max grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-400">
            Why homeowners choose Koehler
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            A neighbor who actually shows up — and stands behind the work
          </h2>
          <p className="mt-4 max-w-lg text-lg text-white/75">
            We&apos;re not a national chain or a big-box referral. You work directly
            with the family that runs the company, and the same crew that quotes your
            project is the one that installs it.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {REASONS.map((reason) => (
              <li key={reason} className="flex items-start gap-3 text-[15px] text-white/90">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" strokeWidth={2.5} />
                {reason}
              </li>
            ))}
          </ul>

          <DualCta className="mt-10" phoneVariant="dark" />
        </div>

        {/* Signature: contractor credential plate */}
        <ScrollReveal className="lg:justify-self-end">
          <div className="relative mx-auto max-w-sm overflow-hidden rounded-3xl bg-gradient-to-br from-navy-800 to-navy-950 p-8 ring-1 ring-white/10">
            <div className="flex items-center gap-2 text-gold-400">
              <BadgeCheck className="h-6 w-6" />
              <span className="font-display text-sm font-semibold uppercase tracking-wider">
                Verified credentials
              </span>
            </div>

            <div className="mt-6 rounded-xl border-2 border-dashed border-gold-500/40 bg-white/5 px-5 py-4">
              <p className="text-xs uppercase tracking-wider text-white/55">
                Florida Certified Building Contractor
              </p>
              <p className="mt-1 font-display text-3xl font-bold tracking-[0.08em] text-white">
                CBC056153
              </p>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-white/5 p-4">
                <dt className="text-xs uppercase tracking-wider text-white/55">Established</dt>
                <dd className="mt-1 font-display text-2xl font-bold text-gold-400">2003</dd>
              </div>
              <div className="rounded-xl bg-white/5 p-4">
                <dt className="text-xs uppercase tracking-wider text-white/55">In business</dt>
                <dd className="mt-1 font-display text-2xl font-bold text-gold-400">20+ yrs</dd>
              </div>
            </dl>

            <p className="mt-6 text-sm text-white/60">
              Licensed, insured &amp; bonded in the State of Florida.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
