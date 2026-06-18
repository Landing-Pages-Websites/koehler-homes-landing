import Link from "next/link";
import { Phone } from "lucide-react";

interface Props {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTABanner({
  title = "Ready to Get Started?",
  description = "Contact us today for a free, no-obligation quote. We serve homeowners and businesses across NJ, PA, and DE.",
  primaryLabel = "Call Us Now",
  primaryHref = "tel:8563171770",
  secondaryLabel = "Request A Quote →",
  secondaryHref = "/contact",
}: Props) {
  return (
    <section className="py-16 px-4">
      <div className="container-max text-center text-white container-max section-padding rounded-[20px] bg-[#213b54]">
        <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{title}</h2>
        <p className="text-white/90 mb-8 max-w-xl mx-auto">{description}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={primaryHref}
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 hover:scale-105 transition-all duration-200 shadow-xl shadow-orange-500/25 text-lg"
          >
            <Phone className="w-5 h-5" />
            {primaryLabel}
          </a>
          <Link
            href={secondaryHref}
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-orange text-orange-500 font-semibold rounded-xl hover:bg-white hover:text-navy-900 transition-all duration-200"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}