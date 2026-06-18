import { BadgeCheck, Percent, Wind } from "lucide-react";
import { PrimaryCta, PhoneCta } from "@/components/ui/cta";

const TRUST = [
  { icon: Percent, label: "50% off installation" },
  { icon: Wind, label: "Hurricane-rated impact products" },
  { icon: BadgeCheck, label: "Licensed · Insured · CBC056153" },
];

export default function ContactCTA(): React.JSX.Element {
  return (
    <section id="contact" className="bg-navy-950 py-20 text-white lg:py-28">
      <div className="container-max text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-400">
          Your free in-home estimate
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl text-balance font-display text-3xl font-bold text-white sm:text-4xl">
          Let&apos;s make your home more comfortable and storm-ready
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/75">
          Tell us about your project and we&apos;ll schedule a no-pressure visit. Lock
          in 50% off installation and financing as low as $5/day.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PrimaryCta />
          <PhoneCta variant="dark" />
        </div>

        <ul className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {TRUST.map((item) => (
            <li key={item.label} className="flex items-center gap-2 text-sm text-white/80">
              <item.icon className="h-4 w-4 text-gold-400" strokeWidth={2} />
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
