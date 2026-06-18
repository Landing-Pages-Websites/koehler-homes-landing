import { PhoneCall, FileText, Hammer, ClipboardCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { DualCta } from "@/components/ui/cta";

interface Step {
  icon: LucideIcon;
  title: string;
  body: string;
}

const STEPS: Step[] = [
  { icon: PhoneCall, title: "Free Consultation", body: "We visit your home, listen to what you need, and take exact measurements — no pressure." },
  { icon: FileText, title: "Custom Proposal", body: "You get a clear, written proposal with honest pricing and financing options. Owner Toby reviews every one." },
  { icon: Hammer, title: "Professional Installation", body: "Our own employee crews install your windows, doors, or siding cleanly and on schedule." },
  { icon: ClipboardCheck, title: "Final Walkthrough", body: "We walk the finished project with you and don't leave until you're completely satisfied." },
];

export default function Process(): React.JSX.Element {
  return (
    <section id="process" className="bg-white py-20 lg:py-28">
      <div className="container-max">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-500">
            How it works
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
            Four simple steps, no surprises
          </h2>
          <p className="mt-4 text-lg text-muted">
            From the first call to the final walkthrough, you always know exactly
            what happens next.
          </p>
        </header>

        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative">
              {i < STEPS.length - 1 && (
                <div
                  aria-hidden="true"
                  className="absolute left-12 top-6 hidden h-px w-full bg-line lg:block"
                />
              )}
              <div className="relative flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-900 font-display text-lg font-bold text-gold-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <step.icon className="h-6 w-6 text-brand-500" strokeWidth={2} />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-navy-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <DualCta className="mt-14 justify-center" />
      </div>
    </section>
  );
}
