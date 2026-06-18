"use client";

import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Michael R.",
    location: "Cherry Hill, NJ",
    text: "Cosello Construction replaced all the windows in our home and the difference is incredible. Professional crew, on time, and the energy savings have been noticeable from day one.",
    rating: 5,
  },
  {
    name: "Sarah T.",
    location: "Philadelphia, PA",
    text: "We hired them for a commercial door installation at our office building. They minimized disruption and finished ahead of schedule. Highly recommend for any business.",
    rating: 5,
  },
  {
    name: "David & Karen L.",
    location: "Mount Laurel, NJ",
    text: "Our new Andersen windows look beautiful. The team was respectful of our home and cleaned up perfectly. The 2-year warranty gives us confidence in their work.",
    rating: 5,
  },
];

export default function Reviews() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-max">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-orange-500 font-semibold text-sm tracking-wider uppercase mb-3">
              Testimonials
            </p>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-navy-900">
              What Our <span className="text-orange-500">Customers Say</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-gray-500 text-sm">4.9 out of 5 · 61 Reviews</span>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <ScrollReveal key={review.name} delay={i * 100}>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                <Quote className="w-8 h-8 text-orange-200 mb-4" />
                <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-6">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div>
                    <p className="font-semibold text-navy-900 text-sm">{review.name}</p>
                    <p className="text-xs text-gray-400">{review.location}</p>
                  </div>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={300}>
          <div className="text-center mt-10">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 text-orange-500 font-semibold text-sm hover:text-orange-600 transition-colors"
            >
              Read All 61 Reviews →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
