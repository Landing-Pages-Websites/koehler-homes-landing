import { Star, Quote } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

interface Review {
  name: string;
  quote: string;
}

// Verbatim (lightly punctuated) Google reviews from real Koehler customers.
const REVIEWS: Review[] = [
  {
    name: "Kelly Nunn",
    quote: "Easy, smooth experience. Toby was very helpful at every step in the process!",
  },
  {
    name: "Julie",
    quote:
      "Very easy to work with this company. Excellent communication throughout the project. Site prep and cleanup complete. Would highly recommend.",
  },
  {
    name: "Anthony M.",
    quote:
      "I've used Koehler for two different home projects. Highly recommend their services — they do phenomenal work.",
  },
  {
    name: "Lou Tomassone",
    quote:
      "Fair price and no issues with any touch-up items I needed completed. I would recommend them to anyone looking for new windows.",
  },
  {
    name: "Joseph Hill",
    quote: "I'm very satisfied with the windows and door I had done.",
  },
  {
    name: "Jim Mangus",
    quote: "They did what they said and there were no problems.",
  },
];

export default function Testimonials(): React.JSX.Element {
  return (
    <section id="testimonials" className="bg-white py-20 lg:py-28">
      <div className="container-max">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-500">
            Real reviews
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
            What Jacksonville homeowners say
          </h2>
          <p className="mt-4 text-lg text-muted">
            A few words from neighbors who trusted us with their windows, doors, and siding.
          </p>
        </header>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <ScrollReveal key={review.name} delay={(i % 3) * 80}>
              <figure className="flex h-full flex-col rounded-2xl bg-surface p-6 ring-1 ring-line">
                <Quote className="h-7 w-7 text-brand-200" aria-hidden="true" />
                <div className="mt-3 flex gap-0.5" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-navy-900">
                  {review.quote}
                </blockquote>
                <figcaption className="mt-5 border-t border-line pt-4">
                  <span className="font-display text-sm font-semibold text-navy-900">
                    {review.name}
                  </span>
                  <span className="block text-xs text-muted">Verified Google review</span>
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
