"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Building2,
  HardHat,
  Landmark,
  Users,
} from "lucide-react";

const clients = [
  {
    icon: Landmark,
    title: "Property Managers",
    desc: "We partner with property management companies to maintain, replace, and upgrade doors across multi-tenant commercial properties — on schedule and within budget.",
  },
  {
    icon: HardHat,
    title: "General Contractors",
    desc: "GCs rely on us as their go-to door subcontractor. We coordinate with other trades, meet tight deadlines, and deliver clean, code-compliant installs every time.",
  },
  {
    icon: Building2,
    title: "Developers",
    desc: "From ground-up construction to tenant fit-outs, we supply and install full commercial door packages that meet spec, pass inspection, and stay on schedule.",
  },
  {
    icon: Users,
    title: "Business Owners",
    desc: "Need a new storefront entry, a security upgrade, or an ADA-compliant automatic door? We work directly with business owners for projects large and small.",
  },
];

export default function About() {
  return (
    <>
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            <ScrollReveal>
              <div className="relative h-[520px] my-8 hidden md:block">
                {/* Top-right image */}
                <Image
                  src="/images/about-workers-v3.webp"
                  alt="Cosello Construction technicians installing windows on a commercial building"
                  width={600}
                  height={450}
                  className="rounded-2xl shadow-lg object-cover absolute w-full max-w-[55%] lg:max-w-[425px] top-0 right-0 z-10"
                />
                {/* Bottom-left image */}
                <Image
                  src="/images/about-workers-v4.webp"
                  alt="Cosello Construction technicians installing windows on a residential home"
                  width={600}
                  height={450}
                  className="rounded-2xl shadow-lg object-cover absolute w-full max-w-[55%] lg:max-w-[425px] bottom-0 left-0 z-20"
                />
                {/* Badge */}
                <div className="absolute right-[35%] bottom-[-40px] lg:right-[12%] bg-orange-500 text-white rounded-2xl p-5 shadow-lg z-30">
                  <p className="text-3xl font-bold font-heading">20+</p>
                  <p className="text-sm font-medium">Years of Excellence</p>
                </div>
              </div>
              {/* Mobile fallback — single image with badge */}
              <div className="relative md:hidden my-8">
                <Image
                  src="/images/about-workers-v4.webp"
                  alt="Cosello Construction technicians installing windows"
                  width={600}
                  height={450}
                  className="rounded-2xl shadow-lg object-cover w-full"
                />
                <div className="absolute bottom-[-40px] right-[0] bg-orange-500 text-white rounded-2xl p-4 shadow-lg">
                  <p className="text-2xl font-bold font-heading">20+</p>
                  <p className="text-sm font-medium">Years of Excellence</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div>
                <p className="text-orange-500 font-semibold text-sm tracking-wider uppercase mb-3">
                  About Cosello Construction
                </p>
                <h2 className="font-heading text-3xl lg:text-4xl font-bold text-navy-900 mb-6">
                  A Reliable Installation Partner for {" "}
                  <span className="text-orange-500">Commercial &amp; Residential Projects</span>
                </h2>
                <p className="text-gray-600 leading-relaxed mb-5">
                  Since 2003, Cosello Construction has worked with property managers, general contractors, developers, and homeowners across New Jersey, Philadelphia, and Delaware.
                </p>
                <p className="text-gray-600 leading-relaxed mb-8">
                  We install everything from commercial storefront systems and security doors to residential windows and patio doors. Our team focuses on clear communication, dependable scheduling, and quality workmanship on every project.
                </p>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-4 bg-navy-50 rounded-xl">
                    <p className="text-2xl font-bold text-navy-900 font-heading">2003</p>
                    <p className="text-xs text-gray-500 mt-1">Established</p>
                  </div>
                  <div className="text-center p-4 bg-navy-50 rounded-xl">
                    <p className="text-2xl font-bold text-navy-900 font-heading">3 States</p>
                    <p className="text-xs text-gray-500 mt-1">NJ, PA, DE</p>
                  </div>
                </div>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 hover:scale-105 transition-all duration-200 text-sm shadow-orange-500/30"
                >
                  Learn More About Us →
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-orange-500 font-semibold text-sm tracking-wider uppercase mb-3">
                Our Clients
              </p>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-navy-900">
                Who We <span className="text-orange-500">Work With</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clients.map((c, i) => (
              <ScrollReveal key={c.title} delay={i * 80}>
                <div className="bg-white rounded-2xl p-6 shadow-2xl border border-gray-100 h-full">
                  <div className="flex gap-3 items-center mb-4">
                    <div className="p-3 bg-orange-50 rounded-xl w-fit">
                      <c.icon className="w-6 h-6 text-orange-500" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-navy-900">
                      {c.title}
                    </h3>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}