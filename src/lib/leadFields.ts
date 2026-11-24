import { EMAIL_ERROR, PHONE_ERROR, isValidEmail, isValidPhone, normalizeEmail, phoneDigits } from "@/lib/fields";

// The six lead-form declarations and the one validator that both the form's
// submit gate and useMegaLeadForm.submit() run before any lead is sent. Email
// and phone decisions come only from the canonical src/lib/fields.ts; the
// text/select rules mirror lp-starter's leadPayload.ts validateField.

export const TIMELINE_OPTIONS = ["ASAP", "Within 30 days", "1–3 months", "Just researching"] as const;
export const OWNS_HOME_OPTIONS = ["Yes", "No"] as const;

const TEXT_MAX_LENGTH = 200;
const TEXT_TOO_LONG_ERROR = `Use ${TEXT_MAX_LENGTH} characters or fewer`;
const CHOICE_ERROR = "Choose one of the options";

interface LeadFieldDeclaration {
  readonly name: LeadFieldName;
  readonly kind: "text" | "email" | "tel" | "select";
  /** Shown when the field is left blank; keeps the form's existing copy. */
  readonly requiredError: string;
  readonly options?: readonly string[];
}

export type LeadFieldName = "firstName" | "lastName" | "email" | "phone" | "ownsHome" | "timeline";
export type LeadValues = Record<LeadFieldName, string>;
export type LeadFieldErrors = Partial<Record<LeadFieldName, string>>;

export const LEAD_FIELDS: readonly LeadFieldDeclaration[] = [
  { name: "firstName", kind: "text", requiredError: "Enter your first name" },
  { name: "lastName", kind: "text", requiredError: "Enter your last name" },
  { name: "email", kind: "email", requiredError: "Enter your email" },
  { name: "phone", kind: "tel", requiredError: PHONE_ERROR },
  { name: "ownsHome", kind: "select", requiredError: "Select an option", options: OWNS_HOME_OPTIONS },
  { name: "timeline", kind: "select", requiredError: "Select a timeline", options: TIMELINE_OPTIONS },
];

export class LeadValidationError extends Error {
  readonly errors: LeadFieldErrors;

  constructor(errors: LeadFieldErrors) {
    super(`Lead form is invalid: ${Object.keys(errors).join(", ")}`);
    this.name = "LeadValidationError";
    this.errors = errors;
  }
}

/** Own data properties only: a prototype or alias key never stands in for a declared field,
 *  and a getter is never run, so the value validated is exactly the value normalized. */
function ownValue(values: unknown, name: LeadFieldName): unknown {
  if (typeof values !== "object" || values === null || Array.isArray(values)) return undefined;
  const descriptor = Object.getOwnPropertyDescriptor(values, name);
  return descriptor && "value" in descriptor ? descriptor.value : undefined;
}

/** Primitive strings only: anything else fails before any trim or coercion could call its methods. */
function fieldError(field: LeadFieldDeclaration, value: unknown): string | null {
  if (typeof value !== "string") return field.requiredError;
  // Select values are exact, so only "" is blank there; whitespace stays an invalid choice.
  const trimmed = value.trim();
  if (field.kind === "select" ? value === "" : trimmed === "") return field.requiredError;
  switch (field.kind) {
    case "email":
      return isValidEmail(value) ? null : EMAIL_ERROR;
    case "tel":
      return isValidPhone(value) ? null : PHONE_ERROR;
    case "select":
      return field.options?.includes(value) ? null : CHOICE_ERROR;
    case "text":
      return trimmed.length > TEXT_MAX_LENGTH ? TEXT_TOO_LONG_ERROR : null;
  }
}

/** Each declared field read once, so validation and normalization see the same values. */
function snapshot(values: unknown): Record<LeadFieldName, unknown> {
  const read = {} as Record<LeadFieldName, unknown>;
  for (const field of LEAD_FIELDS) read[field.name] = ownValue(values, field.name);
  return read;
}

function snapshotErrors(read: Record<LeadFieldName, unknown>): LeadFieldErrors {
  const errors: LeadFieldErrors = {};
  for (const field of LEAD_FIELDS) {
    const error = fieldError(field, read[field.name]);
    if (error) errors[field.name] = error;
  }
  return errors;
}

/** The one validation entry point: the form's submit gate and the hook both call it. */
export function validateLeadValues(values: unknown): LeadFieldErrors {
  return snapshotErrors(snapshot(values));
}

function normalizeValue(field: LeadFieldDeclaration, value: string): string {
  if (field.kind === "email") return normalizeEmail(value);
  if (field.kind === "tel") return phoneDigits(value);
  if (field.kind === "text") return value.trim();
  return value;
}

/** Throws on invalid input; returns exactly the six declared keys that are sent as form_data. */
export function normalizeLeadValues(values: unknown): LeadValues {
  const read = snapshot(values);
  const errors = snapshotErrors(read);
  if (Object.keys(errors).length > 0) throw new LeadValidationError(errors);
  const normalized = {} as LeadValues;
  // Every snapshot value is a validated primitive string here.
  for (const field of LEAD_FIELDS) normalized[field.name] = normalizeValue(field, read[field.name] as string);
  return normalized;
}
