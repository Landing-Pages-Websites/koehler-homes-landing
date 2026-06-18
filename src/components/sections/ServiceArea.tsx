import { MapPin } from "lucide-react";
import { DualCta } from "@/components/ui/cta";

const FL_COUNTIES = ["Duval", "St. Johns", "Clay", "Nassau", "Flagler"];
const GA_COUNTIES = ["Camden", "Charlton"];

export default function ServiceArea(): React.JSX.Element {
  return (
    <section id="service-area" className="bg-surface py-20 lg:py-28">
      <div className="container-max">
        <div className="rounded-3xl bg-navy-900 p-8 text-white sm:p-12 lg:p-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-400">
                Where we work
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
                Proudly serving Northeast Florida &amp; Southeast Georgia
              </h2>
              <p className="mt-4 max-w-lg text-lg text-white/75">
                Based in Jacksonville and covering the communities around it. If you&apos;re
                in one of these counties, we&apos;d love to take a look at your project.
              </p>
              <DualCta className="mt-9" phoneVariant="dark" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <CountyList state="Florida" counties={FL_COUNTIES} />
              <CountyList state="Georgia" counties={GA_COUNTIES} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CountyList({
  state,
  counties,
}: {
  state: string;
  counties: string[];
}): React.JSX.Element {
  return (
    <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
      <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white/60">
        {state}
      </h3>
      <ul className="mt-4 space-y-3">
        {counties.map((county) => (
          <li key={county} className="flex items-center gap-2.5 text-[15px] font-medium text-white">
            <MapPin className="h-4 w-4 shrink-0 text-gold-400" strokeWidth={2} />
            {county} County
          </li>
        ))}
      </ul>
    </div>
  );
}
