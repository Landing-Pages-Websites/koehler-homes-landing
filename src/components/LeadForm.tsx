"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ShieldCheck } from "lucide-react";
import { useMegaLeadForm } from "@/hooks/useMegaLeadForm";

const TIMELINE_OPTIONS = [
  "ASAP",
  "Within 30 days",
  "1–3 months",
  "Just researching",
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  ownsHome: string;
  timeline: string;
}

const EMPTY: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  ownsHome: "",
  timeline: "",
};

type Errors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "submitting" | "error";

function isQualified(data: FormState): boolean {
  return (
    data.ownsHome === "Yes" &&
    data.timeline !== "" &&
    data.timeline !== "Just researching"
  );
}

function validate(data: FormState): Errors {
  const errors: Errors = {};
  if (!data.firstName.trim()) errors.firstName = "Enter your first name";
  if (!data.lastName.trim()) errors.lastName = "Enter your last name";
  if (!data.email.trim()) errors.email = "Enter your email";
  else if (!EMAIL_RE.test(data.email)) errors.email = "Enter a valid email";
  if (data.phone.replace(/\D/g, "").length < 10)
    errors.phone = "Enter a valid phone number";
  if (!data.ownsHome) errors.ownsHome = "Select an option";
  if (!data.timeline) errors.timeline = "Select a timeline";
  return errors;
}

function pushDataLayer(event: string, qualified: boolean): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    form_id: "koehler-lead-form",
    lead_quality: qualified ? "qualified" : "disqualified",
  });
}

export default function LeadForm(): React.JSX.Element {
  const router = useRouter();
  const { submit } = useMegaLeadForm();
  const formRef = useRef<HTMLFormElement>(null);
  const [data, setData] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const update = (field: keyof FormState, value: string): void => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // Validate first, then hand off to the form's submit handler.
  const onSubmitClick = (): void => {
    if (status === "submitting") return;
    const found = validate(data);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }
    formRef.current?.requestSubmit();
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");

    const qualified = isQualified(data);

    try {
      await submit({
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        ownsHome: data.ownsHome,
        timeline: data.timeline,
      });

      // Fire MegaTag conversion before any dataLayer push.
      window.MegaTag?.trackEvent?.("form_submit", {
        lead_quality: qualified ? "qualified" : "disqualified",
      });
      pushDataLayer("form_submit", qualified);
      pushDataLayer("form_submission", qualified);
      if (qualified) pushDataLayer("qualified_lead", qualified);

      router.push("/thank-you");
    } catch {
      setStatus("error");
    }
  };

  const submitting = status === "submitting";

  return (
    <div
      id="get-quote"
      className="rounded-2xl bg-white p-6 shadow-2xl shadow-navy-950/30 ring-1 ring-line sm:p-8"
    >
      <h2 className="font-display text-2xl font-semibold text-navy-900">
        Get My Free In-Home Estimate
      </h2>
      <p className="mt-1.5 text-sm text-muted">
        No pressure, no obligation. We&apos;ll confirm your details and schedule
        a visit.
      </p>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        className="mt-6 space-y-4"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="First name"
            error={errors.firstName}
            input={
              <input
                type="text"
                autoComplete="given-name"
                value={data.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                className={inputClass(errors.firstName)}
                placeholder="Jane"
              />
            }
          />
          <Field
            label="Last name"
            error={errors.lastName}
            input={
              <input
                type="text"
                autoComplete="family-name"
                value={data.lastName}
                onChange={(e) => update("lastName", e.target.value)}
                className={inputClass(errors.lastName)}
                placeholder="Doe"
              />
            }
          />
        </div>

        <Field
          label="Email"
          error={errors.email}
          input={
            <input
              type="email"
              autoComplete="email"
              value={data.email}
              onChange={(e) => update("email", e.target.value)}
              className={inputClass(errors.email)}
              placeholder="jane@email.com"
            />
          }
        />

        <Field
          label="Phone"
          error={errors.phone}
          input={
            <input
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              value={data.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={inputClass(errors.phone)}
              placeholder="(904) 555-0199"
            />
          }
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="Do you own the home?"
            error={errors.ownsHome}
            input={
              <select
                value={data.ownsHome}
                onChange={(e) => update("ownsHome", e.target.value)}
                className={selectClass(errors.ownsHome, data.ownsHome)}
              >
                <option value="" disabled>
                  Select…
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            }
          />
          <Field
            label="When do you want to start?"
            error={errors.timeline}
            input={
              <select
                value={data.timeline}
                onChange={(e) => update("timeline", e.target.value)}
                className={selectClass(errors.timeline, data.timeline)}
              >
                <option value="" disabled>
                  Select…
                </option>
                {TIMELINE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            }
          />
        </div>

        <button
          type="button"
          onClick={onSubmitClick}
          disabled={submitting}
          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 py-4 font-display text-base font-semibold text-white shadow-lg shadow-brand-500/25 transition-all duration-200 hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting && <Loader2 className="h-5 w-5 animate-spin" />}
          {submitting ? "Sending…" : "Get My Free In-Home Estimate"}
        </button>

        {status === "error" && (
          <p className="text-center text-sm text-[#d92d20]" role="alert">
            Something went wrong. Please try again or call (904) 746-4003.
          </p>
        )}

        <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted">
          <ShieldCheck className="h-3.5 w-3.5 text-success" />
          Your information stays private. We never sell or spam.
        </p>
      </form>
    </div>
  );
}

function Field({
  label,
  error,
  input,
}: {
  label: string;
  error?: string;
  input: React.ReactNode;
}): React.JSX.Element {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-navy-900">
        {label}
      </span>
      {input}
      {error && <span className="mt-1 block text-xs text-[#d92d20]">{error}</span>}
    </label>
  );
}

function inputClass(error?: string): string {
  return `w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-ink placeholder:text-slate-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
    error ? "border-[#d92d20]" : "border-line"
  }`;
}

function selectClass(error: string | undefined, value: string): string {
  return `w-full rounded-xl border bg-white px-4 py-3 text-[15px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
    value ? "text-ink" : "text-slate-400"
  } ${error ? "border-[#d92d20]" : "border-line"}`;
}
