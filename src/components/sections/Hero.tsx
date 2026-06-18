import Image from "next/image";
import { CalendarClock, Users, ShieldCheck, Wind } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import { DualCta } from "@/components/ui/cta";

const CHIPS = [
  { icon: CalendarClock, label: "Family-owned since 2003" },
  { icon: Users, label: "Our employees, never subcontractors" },
  { icon: ShieldCheck, label: "Florida Lic. CBC056153" },
  { icon: Wind, label: "Hurricane-rated impact products" },
];

export default function Hero(): React.JSX.Element {
  return (
    <section id="hero" className="relative overflow-hidden bg-navy-900">
      <div className="absolute inset-0">
        <Image
          src="/images/koehler/project-a22.webp"
          alt="Jacksonville, Florida home with replacement windows and a glass patio door installed by Koehler"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/92 to-navy-900/70" />
      </div>

      <div className="relative container-max grid items-center gap-12 py-16 lg:grid-cols-12 lg:gap-10 lg:py-24">
        <div className="animate-fade-up lg:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-gold-400 ring-1 ring-gold-500/30">
            Jacksonville, FL · 50% off installation
          </span>

          <h1 className="mt-5 max-w-2xl text-balance font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-[3.25rem]">
            Replacement Windows, Doors &amp; Siding for{" "}
            <span className="text-gold-400">Jacksonville</span> Homes
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
            Get <strong className="font-semibold text-white">50% off installation</strong>{" "}
            and a free in-home estimate from a family-owned Jacksonville company that
            has been doing this the right way since 2003 — built for Florida heat,
            humidity, and hurricane season.
          </p>

          <div className="mt-8">
            <DualCta phoneVariant="dark" />
          </div>

          <ul className="mt-10 grid max-w-xl grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {CHIPS.map((chip) => (
              <li key={chip.label} className="flex items-center gap-2.5 text-sm text-white/85">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
                  <chip.icon className="h-4 w-4 text-gold-400" strokeWidth={2} />
                </span>
                {chip.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative animate-fade-in lg:col-span-5">
          {/* Signature offer seal */}
          <div
            aria-hidden="true"
            className="absolute -top-4 -right-2 z-10 hidden h-24 w-24 rotate-12 flex-col items-center justify-center rounded-full bg-gold-500 text-center font-display font-bold leading-none text-navy-900 shadow-xl ring-4 ring-white sm:flex"
          >
            <span className="text-2xl">50%</span>
            <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider">
              Off Install
            </span>
          </div>
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
