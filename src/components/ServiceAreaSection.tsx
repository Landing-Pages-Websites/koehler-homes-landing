"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { MapPin } from "lucide-react";

interface Props {
  title?: string;
  highlight?: string;
  description?: string;
}

const serviceAreas = [
  { state: "New Jersey", areas: "South Jersey, Cherry Hill, Mount Laurel, Camden County, Burlington County" },
  { state: "Philadelphia", areas: "Northeast Philadelphia, South Philadelphia, West Philadelphia" },
  { state: "Delaware", areas: "Northern Delaware, Wilmington area" },
];

export default function ServiceAreaSection({
  title = "Service",
  highlight = "Area",
  description = "Proudly serving South Jersey, Philadelphia, and the Tri-State area.",
}: Props) {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-max">
        <ScrollReveal>
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-navy-900 mb-3">
              {title} {highlight && <span className="text-orange-500">{highlight}</span>}
            </h2>
            {description && (
              <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        </ScrollReveal>
        <div className="grid lg:grid-cols-3 gap-6">
          {serviceAreas.map((s, i) => (
            <ScrollReveal key={s.state} delay={i * 100}>
              <div className="bg-navy-50 rounded-2xl p-6 text-center h-full">
                <MapPin className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <h3 className="font-heading font-bold text-xl text-navy-900 mb-2">{s.state}</h3>
                <p className="text-gray-500 text-sm">{s.areas}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}