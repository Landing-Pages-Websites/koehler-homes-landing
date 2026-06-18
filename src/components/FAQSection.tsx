import Link from "next/link";
import { ReactNode } from "react";
import ScrollReveal from "@/components/ScrollReveal";

export type FAQItem = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  eyebrow?: string;
  title: string;
  highlight?: string;
  faqs: FAQItem[];
  className?: string;
  children?: ReactNode;
};

export function buildFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export default function FAQSection({
  eyebrow = "Common Questions",
  title,
  highlight,
  faqs,
  className = "section-padding bg-white",
  children,
}: FAQSectionProps) {
  return (
    <section className={className}>
      <div className="container-max max-w-4xl">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-orange-500 font-semibold text-sm tracking-wider uppercase mb-3">
              {eyebrow}
            </p>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-navy-900">
              {title}
              {highlight && <span className="text-orange-500"> {highlight}</span>}
            </h2>
          </div>
        </ScrollReveal>
        <div className="space-y-5">
          {faqs.map((faq, i) => (
            <ScrollReveal key={faq.question} delay={i * 80}>
              <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="font-heading font-bold text-lg text-navy-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        {children && (
          <ScrollReveal delay={500}>
            <div className="text-center mt-10 text-gray-600 text-sm leading-relaxed">
              {children}
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}

export function FAQContactLinks({ service }: { service: string }) {
  return (
    <p>
      Have more questions about {service}?{" "}
      <Link href="/contact" className="text-orange-500 hover:underline font-semibold">
        Contact Cosello Construction
      </Link>{" "}
      or call{" "}
      <a href="tel:8563171770" className="text-orange-500 hover:underline font-semibold">
        (856) 317-1770
      </a>
      .
    </p>
  );
}
