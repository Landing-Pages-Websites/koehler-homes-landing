"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ShieldCheck } from "lucide-react";
import { useMegaLeadForm } from "@/hooks/useMegaLeadForm";
import {
  EMAIL_ERROR,
  EMAIL_MAX_LENGTH,
  EMAIL_PATTERN,
  PHONE_ERROR,
  PHONE_PATTERN,
  formatPhone,
} from "@/lib/fields";
import {
  LEAD_FIELDS,
  OWNS_HOME_OPTIONS,
  TIMELINE_OPTIONS,
  validateLeadValues,
  type LeadFieldErrors,
  type LeadFieldName,
  type LeadValues,
} from "@/lib/leadFields";

// Qualified submitters are redirected here post-submit (the page itself has no
// Calendly widget/button — this redirect is the only Calendly touchpoint).
const CALENDLY_URL =
  "https://calendly.com/toby-koehlerhomesinc/project-consultation";

type FormState = LeadValues;

const EMPTY: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  ownsHome: "",
  timeline: "",
};

type Status = "idle" | "submitting" | "redirecting" | "error";

const IDLE_LABEL = "Get My Free In-Home Estimate";

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

// noValidate leaves the shared declaration validator as the only judge, so the
// first invalid field is focused here instead of by the browser tooltip.
function focusFirstInvalid(form: HTMLFormElement, errors: LeadFieldErrors): void {
  const first = LEAD_FIELDS.find((field) => errors[field.name]);
  if (!first) return;
  const element = form.elements.namedItem(first.name);
  if (element instanceof HTMLElement) element.focus();
}

// Accessible wiring that links a field to its inline error message.
function errorProps(
  name: LeadFieldName,
  error?: string,
): { "aria-invalid"?: boolean; "aria-describedby"?: string } {
  return {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${name}-error` : undefined,
  };
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
  const [errors, setErrors] = useState<LeadFieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const update = (field: keyof FormState, value: string): void => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // Single validated submission routine. The shared six-field validator is the
  // gate: email/phone are decided only by the canonical isValidEmail and
  // isValidPhone in src/lib/fields.ts, and useMegaLeadForm.submit() runs the
  // same validator again before transport.
  const runSubmit = async (): Promise<void> => {
    const form = formRef.current;
    if (!form) return;
    // Terminal latch: once a submission was accepted, block every later call so
    // a delayed redirect/navigation can never fire a second request.
    if (submittedRef.current) return;
    const found = validateLeadValues(data);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      focusFirstInvalid(form, found);
      return;
    }
    // Synchronous latch: only one request may be in flight, cleared on every
    // outcome so a failed submit stays retryable.
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setStatus("submitting");

    const qualified = isQualified(data);

    try {
      // The hook trims, normalizes email/phone and sends the six declared keys.
      const res = await submit(data);
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
        noValidate
        onSubmit={handleFormSubmit}
        onKeyDown={handleKeyDown}
        className="mt-6 space-y-4"
      >
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
                {...errorProps("firstName", errors.firstName)}
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
                {...errorProps("lastName", errors.lastName)}
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
              pattern={EMAIL_PATTERN}
              title={EMAIL_ERROR}
              inputMode="email"
              maxLength={EMAIL_MAX_LENGTH}
              spellCheck={false}
              autoCapitalize="none"
              autoComplete="email"
              {...errorProps("email", errors.email)}
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
              pattern={PHONE_PATTERN}
              title={PHONE_ERROR}
              inputMode="numeric"
              autoComplete="tel-national"
              {...errorProps("phone", errors.phone)}
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
                {...errorProps("ownsHome", errors.ownsHome)}
                value={data.ownsHome}
                onChange={(e) => update("ownsHome", e.target.value)}
                className={selectClass(errors.ownsHome, data.ownsHome)}
              >
                <option value="" disabled>
                  Select…
                </option>
                {OWNS_HOME_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
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
                {...errorProps("timeline", errors.timeline)}
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
          onClick={handleButtonClick}
          disabled={busy}
          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 py-4 font-display text-base font-semibold text-white shadow-lg shadow-brand-500/25 transition-all duration-200 hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {busy && <Loader2 className="h-5 w-5 animate-spin" />}
          {ctaLabel(status)}
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
      {error && (
        <span id={`${htmlFor}-error`} className="mt-1 block text-xs text-[#d92d20]">
          {error}
        </span>
      )}
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
