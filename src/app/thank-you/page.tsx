import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Phone, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Thank You | Cosello Construction",
  description:
    "Thank you for contacting Cosello Construction. We typically respond within 1 business hour.",
};

export default function ThankYouPage() {
  return (
    <section className="section-padding bg-white min-h-[60vh] flex items-center">
      <div className="container-max text-center max-w-2xl mx-auto">
        <div className="flex justify-center mb-6">
          <CheckCircle
            className="w-16 h-16 text-orange-500"
            strokeWidth={1.5}
          />
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 mb-4">
          Thank You for{" "}
          <span className="text-orange-500">Reaching Out!</span>
        </h1>
        <p className="text-gray-600 text-lg mb-3 leading-relaxed">
          We got your request and a team member will be in touch shortly with your free quote.
        </p>
        <p className="text-gray-500 text-sm mb-10">
         Want to get started sooner? Give us a call anytime.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="tel:8563171770"
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-all duration-200 shadow-lg shadow-orange-500/25"
          >
            <Phone className="w-5 h-5" />
            Call Us Now
          </a>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-navy-900 text-navy-900 font-semibold rounded-xl hover:bg-navy-900 hover:text-white transition-all duration-200"
          >
            Back to Home
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}