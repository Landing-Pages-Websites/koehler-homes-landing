import Image from "next/image";
import { Phone, MapPin, BadgeCheck } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/components/ui/cta";

const COUNTIES =
  "Duval · St. Johns · Clay · Nassau · Flagler (FL) · Camden · Charlton (GA)";

export default function Footer(): React.JSX.Element {
  return (
    <footer className="bg-navy-950 text-white/70">
      <div className="container-max grid gap-10 py-14 md:grid-cols-3">
        <div>
          <Image
            src="/images/koehler/logo-white-brand.webp"
            alt="Koehler Home Improvement"
            width={410}
            height={95}
            className="h-10 w-auto"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            Family-owned home improvement in Jacksonville since 2003. Energy-efficient,
            hurricane-rated windows, doors and James Hardie siding — installed by our
            own employees, never subcontractors.
          </p>
        </div>

        <div className="space-y-3 text-sm md:justify-self-center">
          <h3 className="font-display text-base font-semibold text-white">Get in touch</h3>
          <a
            href={PHONE_TEL}
            className="flex items-center gap-2 transition-colors hover:text-gold-400"
          >
            <Phone className="h-4 w-4 text-gold-500" />
            {PHONE_DISPLAY}
          </a>
          <p className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
            Jacksonville, Florida
          </p>
          <p className="flex items-start gap-2">
            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
            Florida Certified Building Contractor · CBC056153
          </p>
        </div>

        <div className="space-y-3 text-sm md:justify-self-end">
          <h3 className="font-display text-base font-semibold text-white">Service area</h3>
          <p className="max-w-xs leading-relaxed">{COUNTIES}</p>
          <p className="text-xs text-white/50">Licensed · Insured · Bonded</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-max flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/45 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Koehler Home Improvement. All rights reserved.
          </p>
          <p>Replacement Windows · Doors · James Hardie Siding · Jacksonville, FL</p>
        </div>
      </div>
    </footer>
  );
}
