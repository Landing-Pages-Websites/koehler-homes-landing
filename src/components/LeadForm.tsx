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

// Qualified submitters are redirected here post-submit (the page itself has no
// Calendly widget/button — this redirect is the only Calendly touchpoint).
const CALENDLY_URL =
  "https://calendly.com/toby-koehlerhomesinc/project-consultation";

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
type Status = "idle" | "submitting" | "redirecting" | "error";

const US_COUNTRY_CODE = "1";
const NATIONAL_LENGTH = 10;
const IDLE_LABEL = "Get My Free In-Home Estimate";

interface ParsedPhone {
  countryCode: boolean;
  national: string;
  plus: boolean;
}

// Split an optional US +1 country code off the raw input. A leading "1" counts
// as the country code only when the user typed a literal "+" or supplied more
// than a full national number — so an ordinary 10-digit number is never
// mis-read and no digit is dropped (the live truncation bug this fixes).
// `plus` records that a literal "+" was typed even before any digit exists, so
// the prefix survives sequential entry (+ → +1 → +15…) and an unsupported
// "+<code>" (e.g. +9045550199) keeps its stray "+" rather than passing as a
// bare national number.
function parsePhone(raw: string): ParsedPhone {
  const digits = raw.replace(/\D/g, "");
  const plus = raw.trimStart().startsWith("+");
  const countryCode =
    digits.startsWith(US_COUNTRY_CODE) &&
    (digits.length > NATIONAL_LENGTH || plus);
  return { countryCode, national: countryCode ? digits.slice(1) : digits, plus };
}

// Label kept in a module-scope helper (above the button) so the status copy
// stays byte-identical while remaining a single source of truth.
function ctaLabel(status: Status): string {
  if (status === "redirecting")
    return "Redirecting you to book your consultation…";
  if (status === "submitting") return "Sending…";
  return IDLE_LABEL;
}

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
  // Exact ten national digits after stripping an optional US +1 country code
  // (literal !== 10 keeps the landing-page phone lint contract satisfied).
  if (parsePhone(data.phone).national.length !== 10)
    errors.phone = "Enter a valid phone number";
  if (!data.ownsHome) errors.ownsHome = "Select an option";
  if (!data.timeline) errors.timeline = "Select a timeline";
  return errors;
}

// Render the national number as (XXX) XXX-XXXX, prefixing "+1 " when a US
// country code was supplied. A typed-but-unresolved "+" (lone "+" mid-entry, or
// an unsupported "+<non-1 code>") keeps a bare "+" so React never drops it and
// the value fails the tel pattern instead of masquerading as a national number.
// Never truncates: any overflow digit stays visible so an over-length number
// fails validation instead of being silently trimmed.
function formatPhone(value: string): string {
  const { countryCode, national, plus } = parsePhone(value);
  const prefix = countryCode ? "+1 " : plus ? "+" : "";
  if (national.length === 0) return prefix;
  if (national.length < 4) return `${prefix}(${national}`;
  if (national.length < 7)
    return `${prefix}(${national.slice(0, 3)}) ${national.slice(3)}`;
  return `${prefix}(${national.slice(0, 3)}) ${national.slice(3, 6)}-${national.slice(6)}`;
}

// Canonical value sent to the lead endpoint: E.164 (+1XXXXXXXXXX) when a US
// country code was supplied, otherwise the formatted national number as typed.
function toSubmittedPhone(value: string): string {
  const { countryCode, national } = parsePhone(value);
  return countryCode ? `+1${national}` : value.trim();
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
  const inFlightRef = useRef<boolean>(false);
  const submittedRef = useRef<boolean>(false);
  const [data, setData] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const update = (field: keyof FormState, value: string): void => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // Single validated submission routine. Native validity is the gate; inline
  // errors mirror it for accessible field-level messaging.
  const runSubmit = async (): Promise<void> => {
    const form = formRef.current;
    if (!form) return;
    // Terminal latch: once a submission was accepted, block every later call so
    // a delayed redirect/navigation can never fire a second request.
    if (submittedRef.current) return;
    if (!form.checkValidity()) {
      setErrors(validate(data));
      form.reportValidity();
      return;
    }
    // Synchronous latch: only one request may be in flight, cleared on every
    // outcome so a failed submit stays retryable.
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setStatus("submitting");

    const qualified = isQualified(data);

    try {
      const res = await submit({
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email.trim(),
        phone: toSubmittedPhone(data.phone),
        ownsHome: data.ownsHome,
        timeline: data.timeline,
      });
      if (res?.ok !== true) throw new Error("Submission was not accepted");
      // Accepted: flip the terminal latch before any event/redirect so nothing
      // downstream can trigger a second submission during pending navigation.
      submittedRef.current = true;

      // Fire MegaTag conversion before any dataLayer push.
      window.MegaTag?.trackEvent?.("form_submit", {
        lead_quality: qualified ? "qualified" : "disqualified",
      });
      pushDataLayer("form_submit", qualified);
      pushDataLayer("form_submission", qualified);
      if (qualified) pushDataLayer("qualified_lead", qualified);

      // Qualified → book a consultation (Calendly). Disqualified leads still
      // reached HubSpot via the submit above; they get the thank-you page only.
      if (qualified) {
        setStatus("redirecting");
        window.location.assign(CALENDLY_URL);
        return;
      }
      router.push("/thank-you");
    } catch {
      setStatus("error");
    } finally {
      inFlightRef.current = false;
    }
  };

  // Submit button: cancel native submission, then run the validated routine
  // directly so no pre-response native submit beacon can fire.
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    void runSubmit();
  };

  // Native submit is only ever a fallback; it must never fire the request.
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  // Enter in a field must not trigger a native submit; route it through the
  // same validated routine exactly once.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>): void => {
    if (e.key !== "Enter") return;
    if ((e.target as HTMLElement).tagName === "TEXTAREA") return;
    e.preventDefault();
    void runSubmit();
  };

  const submitting = status === "submitting";
  const busy = submitting || status === "redirecting";

  return (
    <div
      id="form"
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
        onSubmit={handleFormSubmit}
        onKeyDown={handleKeyDown}
        className="mt-6 space-y-4"
      >
        <button
          type="button"
          onClick={handleButtonClick}
          disabled={busy}
          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 py-4 font-display text-base font-semibold text-white shadow-lg shadow-brand-500/25 transition-all duration-200 hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {busy && <Loader2 className="h-5 w-5 animate-spin" />}
          {ctaLabel(status)}
        </button>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="First name"
            htmlFor="firstName"
            error={errors.firstName}
            input={
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
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
            htmlFor="lastName"
            error={errors.lastName}
            input={
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
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
          htmlFor="email"
          error={errors.email}
          input={
            <input
              id="email"
              name="email"
              type="email"
              required
              pattern="[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}"
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
          htmlFor="phone"
          error={errors.phone}
          input={
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              pattern="(\+1 )?\(\d{3}\) \d{3}-\d{4}"
              title="Enter a 10-digit US phone number, optionally with a +1 country code"
              inputMode="numeric"
              autoComplete="tel"
              value={data.phone}
              onChange={(e) => update("phone", formatPhone(e.target.value))}
              className={inputClass(errors.phone)}
              placeholder="(904) 555-0199"
            />
          }
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="Do you own the home?"
            htmlFor="ownsHome"
            error={errors.ownsHome}
            input={
              <select
                id="ownsHome"
                name="ownsHome"
                required
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
            htmlFor="timeline"
            error={errors.timeline}
            input={
              <select
                id="timeline"
                name="timeline"
                required
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
  htmlFor,
  error,
  input,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  input: React.ReactNode;
}): React.JSX.Element {
  return (
    <div className="block">
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-medium text-navy-900"
      >
        {label}
      </label>
      {input}
      {error && <span className="mt-1 block text-xs text-[#d92d20]">{error}</span>}
    </div>
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
