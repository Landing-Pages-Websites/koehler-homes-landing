"use client";

import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { Phone, ArrowRight, MapPin } from "lucide-react";

export default function CTA() {
  return (
    <section className="section-padding text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500 rounded-full blur-3xl" />
      </div>

      <div className="container-max relative section-padding rounded-[20px] bg-[#213b54]">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold mb-6">
              Need a {" "}
              <span className="text-orange-500">Quote?</span>
            </h2>
            <p className="text-white/70 text-lg mb-4 leading-relaxed">
              Call today or request a fast, free estimate.
            </p>
            <div className="flex items-center justify-center gap-2 text-white/50 text-sm mb-10">
              <MapPin className="w-4 h-4" />
              Serving New Jersey, Philadelphia &amp; Delaware since 2003
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:8563171770"
                className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 hover:scale-105 transition-all duration-200 shadow-xl shadow-orange-500/25 text-lg"
              >
                <Phone className="w-5 h-5" />
                Call Us Now
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-orange text-orange-500 font-semibold rounded-xl hover:bg-white hover:text-navy-900 transition-all duration-200"
              >
                Request A Quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
