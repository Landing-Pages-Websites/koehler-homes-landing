"use client";

import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Residential Windows",
    description: "Upgrade your home's comfort and curb appeal with our full range of residential window installations — from double-hung to bay windows, energy-efficient options, and more.",
    href: "/residential-windows",
    image: "/images/svc-res-windows.webp",
    imageAlt: "Residential window installation service by Cosello Construction",
  },
  {
    title: "Residential Doors",
    description: "Make a statement with a new front entry door, upgrade to sliding patio doors, or replace aging storm doors. We install every type of residential door with precision.",
    href: "/residential-doors",
    image: "/images/svc-res-doors.webp",
    imageAlt: "Residential front door installation service by Cosello Construction",
  },
  {
    title: "Commercial Windows & Doors",
    description: "From aluminum storefronts to fire-rated doors, our commercial team handles large-scale projects with minimal disruption to your business operations.",
    href: "/commercial-windows-and-doors",
    image: "/images/svc-commercial.webp",
    imageAlt: "Commercial window and door installation for business properties",
  },
  {
    title: "New Home Builders",
    description: "We partner with builders and general contractors to deliver modern window and door solutions for new construction — on time and on spec.",
    href: "/new-home-builders",
    image: "/images/svc-builders.webp",
    imageAlt: "Window and door installation for new home builders",
  },
  {
    title: "Window & Door Repair",
    description: "Don't replace when you can repair. Our technicians fix frames, glass panels, glazing beads, sills, and more at a fraction of replacement cost.",
    href: "/window-repair",
    image: "/images/svc-repair.webp",
    imageAlt: "Window and door repair service by Cosello Construction",
  },
  {
    title: "Brands We Carry",
    description: "As an Andersen certified contractor, we install industry-leading brands including Andersen, ProVia, and more — all backed by manufacturer warranties.",
    href: "/brands",
    image: "/images/svc-brands.webp",
    imageAlt: "Andersen and ProVia window and door brands installed by Cosello Construction",
  },
];

export default function Services() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-max">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-orange-500 font-semibold text-sm tracking-wider uppercase mb-3">
              Our Services
            </p>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-navy-900">
              Window & Door Installation{" "}
              <span className="text-orange-500">Services</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              We provide installation services for both commercial and residential projects, including storefront systems, security doors, replacement windows, and new construction work.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 100}>
              <Link href={service.href} className="group block h-full">
                <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-100 hover:shadow-2xl hover:border-orange-200 transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-heading font-bold text-lg text-navy-900 mb-2 group-hover:text-orange-500 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1">{service.description}</p>
                    <div className="flex items-center gap-1 text-orange-500 font-semibold text-sm mt-4 group-hover:gap-2 transition-all">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
