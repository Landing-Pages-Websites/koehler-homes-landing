"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { Phone, Gift } from "lucide-react";

export default function Promo() {
  return (
    <section className="section-padding relative py-20 overflow-hidden">
      {/* Background gradient */}
   

      <div className="container-max relative px-4 bg-[#213b54] py-20 rounded-[20px]">
        <ScrollReveal>
          <div className="text-center text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 text-sm mb-6 text-orange-500 font-bold">
              Limited Time Offer
            </div>

            <h2 className="font-heading text-3xl lg:text-5xl font-bold mb-4">
              Buy 4 Windows, Get 1 Free!
            </h2>
            <p className="text-lg text-white/90 max-w-xl mx-auto mb-3">
              Take advantage of our special savings. Upgrade your home&apos;s look and comfort for less.
            </p>
            <p className="text-sm text-white/70 mb-8">
              Contact Cosello Construction today. Not valid with other offers. Restrictions apply.
            </p>

            <a
              href="tel:8563171770"
              className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 hover:scale-105 transition-all duration-200 shadow-xl shadow-orange-500/25 text-lg"
            >
              <Phone className="w-5 h-5" />
              Call Us Now
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
