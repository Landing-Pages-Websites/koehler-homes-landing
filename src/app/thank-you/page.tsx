import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Phone, ArrowRight } from "lucide-react";

const PHONE_DISPLAY = "(904) 746-4003";
const PHONE_TEL = "tel:+19047464003";

export const metadata: Metadata = {
  title: "Thank You | Koehler Home Improvement",
  description:
    "Thanks for reaching out to Koehler Home Improvement. A team member will be in touch shortly about your free in-home estimate.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage(): React.JSX.Element {
  return (
    <section className="flex min-h-[60vh] items-center bg-surface py-20">
      <div className="container-max max-w-2xl text-center">
        <div className="mb-6 flex justify-center">
          <CheckCircle2 className="h-16 w-16 text-success" strokeWidth={1.5} />
        </div>
        <h1 className="font-display text-3xl font-bold text-navy-900 sm:text-4xl">
          Thanks — we&apos;ve got your request
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-muted">
          A member of the Koehler team will reach out shortly to confirm the details
          and schedule your free in-home estimate.
        </p>
        <p className="mt-2 text-sm text-muted">Want to get started sooner? Give us a call.</p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={PHONE_TEL}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-7 py-4 font-display text-base font-semibold text-white shadow-lg shadow-brand-500/25 transition-colors hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold-400"
          >
            <Phone className="h-5 w-5" />
            Call {PHONE_DISPLAY}
          </a>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-navy-900/20 px-7 py-4 font-display text-base font-semibold text-navy-900 transition-colors hover:border-brand-500 hover:text-brand-500"
          >
            Back to home
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
