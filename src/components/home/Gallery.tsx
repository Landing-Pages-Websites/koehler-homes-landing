"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

const projects = [
  { src: "/images/gallery-1-v2.webp", alt: "Double doors with sidelights installation" },
  { src: "/images/gallery-2-enhanced.webp", alt: "Interior room with arched windows" },
  { src: "/images/gallery-3-enhanced.webp", alt: "Bay window installation on brick home" },
  { src: "/images/gallery-4-enhanced.webp", alt: "Kitchen skylight installation" },
  { src: "/images/gallery-5-enhanced.webp", alt: "Commercial brick storefront windows" },
  { src: "/images/gallery-8-enhanced.webp", alt: "Residential entry door installation" },
];

export default function Gallery() {
  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-orange-500 font-semibold text-sm tracking-wider uppercase mb-3">
              Our Work
            </p>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-navy-900">
              Recent <span className="text-orange-500">Projects</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Browse our portfolio of completed window and door installations across South Jersey and Philadelphia.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <ScrollReveal key={project.src} delay={i * 80}>
              <div className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer">
                <Image
                  src={project.src}
                  alt={project.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
              </div>
            </ScrollReveal>
          ))}
        </div>

       
      </div>
    </section>
  );
}
