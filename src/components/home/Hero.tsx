"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Phone,
  Building2,
  ShieldCheck,
  Award,
  Wrench,
  ClipboardCheck,
  Users,
} from "lucide-react";
import { useMegaLeadForm } from "@/hooks/useMegaLeadForm";

const trustBadges = [
  { icon: Building2, text: "Commercial & Residential Projects" },
  { icon: ShieldCheck, text: "Licensed & Insured (NJ, PA & DE)" },
  { icon: Award, text: "Andersen Certified Contractor" },
  { icon: Wrench, text: "2-Year Labor Warranty" },
  { icon: ClipboardCheck, text: "Fast, Free Quotes" },
  { icon: Users, text: "Experienced Installation Crews" },
];

export default function Hero() {
  const router = useRouter();
  const { submit } = useMegaLeadForm();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    address: "",
    phone: "",
    email: "",
    job_details: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const honeypotRef = useRef<HTMLInputElement>(null);
  const mountTime = useRef<number>(Date.now());
  useEffect(() => {
    mountTime.current = Date.now();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      // Submit to Keystone (Mega CRM) in parallel with HubSpot API route
      const [keystoneResult, hubspotRes] = await Promise.allSettled([
        submit({ ...formData }),
        fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            company: honeypotRef.current?.value ?? "",
            _t: mountTime.current,
          }),
        }),
      ]);

      const hubspotOk =
        hubspotRes.status === "fulfilled" && hubspotRes.value.ok;

      if (keystoneResult.status === "rejected") {
        console.error("[Hero] Keystone submission error:", keystoneResult.reason);
      }

      if (hubspotOk || keystoneResult.status === "fulfilled") {
        // Fire dataLayer event for GTM/Google Ads conversion tracking
        if (typeof window !== "undefined") {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: "form_submission",
            form_id: "hero-quote-form",
            value: 0,
          });
        }
        router.push("/thank-you");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="relative min-h-[700px] lg:min-h-[750px] flex items-center">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/home-page-banner-v1.webp"
          alt="Beautiful home with professionally installed windows by Cosello Construction"
          fill
          className="object-cover"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/75 to-navy-950/50" />
      </div>

      <div className="relative container-max section-padding w-full">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-end">
          {/* Left content */}
          <div className="lg:col-span-3 animate-fade-in">
            <Image
              src="/images/andersen-logo.png"
              alt="Anderson Certified Logo"
              width={100}
              height={100}
              className="shadow-lg w-30 h-30 object-contain"
            />

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 mt-10">
              Commercial &amp; Residential{" "}
              <span className="text-orange-500">Window and Door</span> Installation
            </h1>

            <p className="text-white/80 font-semibold text-sm tracking-wider uppercase mb-3">
              Serving New Jersey, Philadelphia &amp; Delaware Since 2003
            </p>

            <p className="text-lg text-white max-w-xl mb-8 leading-relaxed">
              Cosello Construction installs windows and doors for commercial properties, builders, and homeowners across the tri-state area. From storefront systems and steel security doors to full window replacements, we deliver reliable installation with fast turnaround times.
            </p>

            {/* Trust badges — mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3 mb-8 lg:hidden">
              {trustBadges.map((badge) => (
                <div key={badge.text} className="flex items-center gap-2 text-white">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-orange-500/20 border border-orange-500/30 rounded-[10px]">
                    <badge.icon className="w-5 h-5 text-orange-400" strokeWidth={1.75} />
                  </div>
                  <span className="text-sm font-semibold leading-tight">{badge.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:8563171770"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 hover:scale-105 transition-all duration-200 shadow-xl shadow-orange-500/30 text-lg"
              >
                <Phone className="w-5 h-5" />
                Call Us Now
              </a>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <Image src="/images/andersen-logo.png" alt="Andersen" width={60} height={60} className="w-10 h-10 md:w-13 md:h-13 lg:w-15 lg:h-15 rounded-full border-2 border-white bg-white object-contain" />
                  <Image src="/images/provia-logo.png" alt="ProVia" width={60} height={60} className="w-10 h-10 md:w-13 md:h-13 lg:w-15 lg:h-15 rounded-full border-2 border-white bg-white object-contain" />
                </div>
                <span className="text-sm text-white">Certified Partner</span>
              </div>
            </div>
          </div>

          {/* Quote form */}
          <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8">
              <h2 className="font-heading text-xl font-bold text-navy-900 mb-1">
                Request A Free Quote
              </h2>
              <p className="text-sm text-gray-500 mb-6">We&apos;d love to hear from you! Please fill out the form and we&apos;ll get back to you as soon as possible.</p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Honeypot */}
                <div className="absolute opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true">
                  <label htmlFor="hero-company">Company</label>
                  <input
                    ref={honeypotRef}
                    type="text"
                    id="hero-company"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="First Name *"
                    value={formData.firstname}
                    onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Last Name *"
                    value={formData.lastname}
                    onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Address *"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
                <textarea
                  required
                  placeholder="Job Details *"
                  rows={3}
                  value={formData.job_details}
                  onChange={(e) => setFormData({ ...formData, job_details: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3.5 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-200 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Sending..." : "Get My Free Quote →"}
                </button>
                {status === "error" && (
                  <p className="text-red-500 text-xs text-center">Something went wrong. Please try again.</p>
                )}
              </form>

              <p className="text-xs text-gray-400 mt-4 text-center">
                No obligation. We typically respond within 1 business hour.
              </p>
            </div>
          </div>
        </div>

        {/* Trust badges — desktop */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-x-6 gap-y-3 mb-8 mt-25 w-full max-w-[1100px] mx-auto">
          {trustBadges.map((badge) => (
            <div key={badge.text} className="flex items-center gap-2 text-white">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-orange-500/20 border border-orange-500/30 rounded-[10px]">
                <badge.icon className="w-5 h-5 text-orange-400" strokeWidth={1.75} />
              </div>
              <span className="text-sm font-semibold leading-tight">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
