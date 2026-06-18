import { Zap, Percent, Wallet } from "lucide-react";
import { DualCta } from "@/components/ui/cta";

const PERKS = [
  { icon: Zap, title: "Quick, often instant approval", note: "Apply in minutes — no long wait to get started." },
  { icon: Percent, title: "0% deferred-interest option", note: "Qualified buyers can finance with no interest if paid in the promo window." },
  { icon: Wallet, title: "Keep your cash on hand", note: "Upgrade your home now and spread the cost into easy monthly payments." },
];

export default function Financing(): React.JSX.Element {
  return (
    <section id="financing" className="bg-surface py-20 lg:py-28">
      <div className="container-max grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-500">
            Flexible financing
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
            New windows for about the price of a coffee a day
          </h2>
          <div className="mt-8 flex items-end gap-3">
            <span className="font-display text-7xl font-bold leading-none text-brand-500 sm:text-8xl">
              $5
            </span>
            <span className="mb-2 font-display text-2xl font-semibold text-navy-900">
              /day
            </span>
          </div>
          <p className="mt-4 max-w-md text-lg text-muted">
            With <strong className="font-semibold text-navy-900">GreenSky®</strong>{" "}
            financing, projects can start as low as $5/day — so a more comfortable,
            storm-ready home doesn&apos;t have to wait.
          </p>
          <DualCta className="mt-9" />
        </div>

        <div className="grid gap-4">
          {PERKS.map((perk) => (
            <div
              key={perk.title}
              className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-line"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-500 ring-1 ring-brand-100">
                <perk.icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-navy-900">
                  {perk.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{perk.note}</p>
              </div>
            </div>
          ))}
          <p className="px-2 text-xs text-muted">
            Financing provided by GreenSky® and subject to credit approval. Ask your
            estimator for current terms.
          </p>
        </div>
      </div>
    </section>
  );
}
