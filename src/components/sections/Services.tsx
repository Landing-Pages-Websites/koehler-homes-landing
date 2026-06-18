import Image from "next/image";
import { AppWindow, DoorOpen, Layers, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { DualCta } from "@/components/ui/cta";

interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  image: string;
  alt: string;
  body: string;
  points: string[];
}

const SERVICES: Service[] = [
  {
    id: "windows",
    icon: AppWindow,
    title: "Replacement Windows",
    image: "/images/koehler/windows.webp",
    alt: "Energy-efficient replacement window installed in a Jacksonville home",
    body: "Old, leaky windows let Florida's heat and humidity straight into your home and onto your power bill. We install energy-efficient, Low-E replacement windows — including impact and hurricane-rated options — that hold up to storm season and keep conditioned air where it belongs. Cleaner lines, quieter rooms, and a tighter, more comfortable house.",
    points: ["Low-E, energy-efficient glass", "Impact & hurricane-rated options", "Custom-fit to your openings"],
  },
  {
    id: "doors",
    icon: DoorOpen,
    title: "Entry, Patio & Impact Doors",
    image: "/images/koehler/project-may01.webp",
    alt: "Custom double entry doors on a Florida home by Koehler Home Improvement",
    body: "A door is the first thing guests see and your first line of defense against Florida weather. We install entry, sliding glass, French, patio, and impact doors in both fiberglass and steel — built to hurricane code, sealed against humidity, and finished to match your home. Better security, better efficiency, and a real upgrade to your curb appeal.",
    points: ["Entry, sliding, French & patio", "Fiberglass & steel, hurricane-code", "Sealed against heat & humidity"],
  },
  {
    id: "siding",
    icon: Layers,
    title: "James Hardie Fiber Cement Siding",
    image: "/images/koehler/siding.webp",
    alt: "Koehler installer fitting James Hardie fiber cement siding on a Florida home",
    body: "Florida's sun, humidity, and wind are hard on exteriors. James Hardie fiber cement siding is engineered for exactly this climate — it resists moisture, rot, and warping, stands up to wind, and holds its color far longer than ordinary siding. Installed by our own crews, it gives your home a durable, low-maintenance exterior that looks sharp for years.",
    points: ["Engineered for Florida humidity & sun", "Wind, rot & moisture resistant", "Installed by our own employees"],
  },
];

export default function Services(): React.JSX.Element {
  return (
    <section id="services" className="bg-white py-20 lg:py-28">
      <div className="container-max">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-500">
            What we install
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
            Built for Florida homes, installed by our own crews
          </h2>
          <p className="mt-4 text-lg text-muted">
            Three things we do exceptionally well — windows, doors, and siding —
            each chosen and fitted for the way Florida weather actually behaves.
          </p>
        </header>

        <div className="mt-14 space-y-16 lg:space-y-24">
          {SERVICES.map((service, i) => (
            <ScrollReveal key={service.id}>
              <div
                id={service.id}
                className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
                  i % 2 === 1 ? "lg:[&>figure]:order-2" : ""
                }`}
              >
                <figure className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl shadow-navy-950/10 ring-1 ring-line">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(min-width: 1024px) 36rem, 100vw"
                    className="object-cover"
                  />
                </figure>

                <div>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500 ring-1 ring-brand-100">
                    <service.icon className="h-6 w-6" strokeWidth={2} />
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-bold text-navy-900">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{service.body}</p>
                  <ul className="mt-5 space-y-2">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-center gap-2.5 text-sm font-medium text-navy-900">
                        <Check className="h-4 w-4 shrink-0 text-success" strokeWidth={2.5} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <DualCta className="mt-16 justify-center" />
      </div>
    </section>
  );
}
