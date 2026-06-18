export interface ContactPayload {
  firstname?: string;
  lastname?: string;
  address?: string;
  phone?: string;
  email?: string;
  job_details?: string;
  company?: string; // honeypot
  _t?: number; // mount timestamp
}

export interface ValidationResult {
  valid: boolean;
  spam: boolean;
  errors: string[];
}

const MIN_FILL_TIME_MS = 2_000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(data: ContactPayload): ValidationResult {
  const errors: string[] = [];

  // Spam: honeypot filled
  if (data.company && data.company.trim().length > 0) {
    return { valid: false, spam: true, errors: [] };
  }

  // Spam: submitted too fast
  if (data._t && Date.now() - data._t < MIN_FILL_TIME_MS) {
    return { valid: false, spam: true, errors: [] };
  }

  if (!data.firstname?.trim()) errors.push("First name is required.");
  if (!data.lastname?.trim()) errors.push("Last name is required.");
  if (!data.address?.trim()) errors.push("Address is required.");
  if (!data.phone?.trim()) errors.push("Phone is required.");
  if (!data.email?.trim()) {
    errors.push("Email is required.");
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.push("Invalid email format.");
  }
  if (!data.job_details?.trim()) errors.push("Job details are required.");

  return { valid: errors.length === 0, spam: false, errors };
}

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}