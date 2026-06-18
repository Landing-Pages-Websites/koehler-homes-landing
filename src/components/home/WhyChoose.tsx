"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { Shield, Zap, Phone, DollarSign, BadgeCheck, Clock } from "lucide-react";

const reasons = [
  {
    icon: BadgeCheck,
    title: "2-Year Labor Warranty",
    description: "Every installation backed by our comprehensive 2-year labor warranty for total peace of mind.",
  },
  {
    icon: Zap,
    title: "Emergency Services",
    description: "Urgent window or door issue? Our emergency team is available to handle time-sensitive repairs fast.",
  },
  {
    icon: Phone,
    title: "Free Instant Quotes",
    description: "Get a fast, no-obligation phone quote. We'll give you an honest price estimate in minutes.",
  },
  {
    icon: DollarSign,
    title: "Competitive Pricing",
    description: "Premium craftsmanship without the premium price tag. Transparent pricing with no hidden fees.",
  },
  {
    icon: Shield,
    title: "Licensed & Fully Insured",
    description: "Fully licensed and insured across New Jersey, Pennsylvania, and Delaware for your protection.",
  },
  {
    icon: Clock,
    title: "Jobs Done in 2 Weeks",
    description: "We respect your time. Most installations are completed within two weeks of project start.",
  },
];

export default function WhyChoose() {
  return (
    <section className="section-padding bg-[#213b54] text-white relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
      </div>

      <div className="container-max relative">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-orange-500 font-semibold text-sm tracking-wider uppercase mb-3">
              Why Choose Us
            </p>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold">
                Why South Jersey Trusts<br />
              <span className="text-orange-500">Cosello Construction</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <ScrollReveal key={reason.title} delay={i * 100}>
              <div className="group p-6 bg-[#112a43] border border-[#395670] rounded-2xl  h-full">
                <div className="flex gap-3 items-center mb-4">
                  <div className="p-3 bg-orange-500 rounded-xl w-fit ">
                    <reason.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-lg">{reason.title}</h3>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">{reason.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
