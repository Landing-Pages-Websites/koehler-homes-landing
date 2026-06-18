import { ChevronDown } from "lucide-react";
import { DualCta } from "@/components/ui/cta";

interface QA {
  q: string;
  a: string;
}

const FAQS: QA[] = [
  {
    q: "Do you offer financing?",
    a: "Yes. Through GreenSky®, projects can start as low as $5/day, with quick — often instant — approval and a 0% deferred-interest option for qualified buyers. Your estimator will walk you through current terms.",
  },
  {
    q: "Are your windows and doors hurricane-rated?",
    a: "We offer impact and hurricane-rated windows and doors built for Florida's code and climate — engineered to stand up to high winds and storm season while improving your home's energy efficiency.",
  },
  {
    q: "Is the work guaranteed?",
    a: "It is. We're a Florida Certified Building Contractor (CBC056153) — licensed, insured, and bonded — and every project is backed by a written workmanship warranty.",
  },
  {
    q: "Do you use subcontractors?",
    a: "Never. Your project is installed by Koehler's own employees. The crew that does the work is part of our team, and owner Toby reviews every proposal personally.",
  },
  {
    q: "How long will my project take?",
    a: "It depends on the scope and your materials, but you'll get a clear timeline in your written proposal up front — and because we use our own crews, we keep it on schedule.",
  },
  {
    q: "Why is this phone number different from your website?",
    a: "The number on this page, (904) 746-4003, routes straight to our sales line and helps us see which ads are working. It reaches the same Koehler Home Improvement team — call it anytime.",
  },
];

export default function Faq(): React.JSX.Element {
  return (
    <section id="faq" className="bg-surface py-20 lg:py-28">
      <div className="container-max max-w-3xl">
        <header className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-500">
            Good questions
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
            Frequently asked questions
          </h2>
        </header>

        <div className="mt-10 space-y-3">
          {FAQS.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-2xl bg-white p-5 ring-1 ring-line [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
                {faq.q}
                <ChevronDown className="h-5 w-5 shrink-0 text-brand-500 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{faq.a}</p>
            </details>
          ))}
        </div>

        <DualCta className="mt-12 justify-center" />
      </div>
    </section>
  );
}
