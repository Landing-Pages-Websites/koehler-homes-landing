import { test } from "node:test";
import assert from "node:assert/strict";
import { EMAIL_ERROR, PHONE_ERROR, formatPhone } from "../src/lib/fields";
import { LEAD_FIELDS, LeadValidationError, normalizeLeadValues, validateLeadValues } from "../src/lib/leadFields";

// Synthetic, non-deliverable identity: never posted anywhere (transport is denied in every test).
const VALID = {
  firstName: "Test",
  lastName: "Fixture",
  email: "test@domain.com",
  phone: "(413) 412-3123",
  ownsHome: "Yes",
  timeline: "ASAP",
} as const;

const N11 = ["211", "311", "411", "511", "611", "711", "811", "911"];

function withField(name: string, value: unknown): Record<string, unknown> {
  return { ...VALID, [name]: value };
}

test("declarations keep the six fields, order and exact options", () => {
  assert.deepEqual(LEAD_FIELDS.map((f) => f.name), ["firstName", "lastName", "email", "phone", "ownsHome", "timeline"]);
  assert.deepEqual(LEAD_FIELDS[4].options, ["Yes", "No"]);
  assert.deepEqual(LEAD_FIELDS[5].options, ["ASAP", "Within 30 days", "1–3 months", "Just researching"]);
});

test("valid control passes and normalizes to the six keys only", () => {
  assert.deepEqual(validateLeadValues(VALID), {});
  assert.deepEqual(normalizeLeadValues({ ...VALID, first_name: "alias" }), { ...VALID, phone: "4134123123" });
});

test("padded mixed-case email is accepted, domain-only lowercased", () => {
  const out = normalizeLeadValues(withField("email", "  Mixed.Local+tag@EXAMPLE.COM  "));
  assert.equal(out.email, "Mixed.Local+tag@example.com");
});

const INVALID_EMAILS = [
  "test", "test@", "test@domain", "a..b@domain.com", ".a@x.com", "a.@x.com", "a@x..com",
  "a@-bad.com", "a@bad-.com", "a b@x.com", "a@x .com", "2@",
  `${"a".repeat(65)}@x.com`, `a@${"b".repeat(64)}.com`, `${"a".repeat(64)}@${"b".repeat(63)}.${"c".repeat(63)}.${"d".repeat(63)}.com`,
];

for (const email of INVALID_EMAILS) {
  test(`rejects email ${JSON.stringify(email.length > 40 ? `${email.slice(0, 20)}…(${email.length})` : email)}`, () => {
    assert.equal(validateLeadValues(withField("email", email)).email, EMAIL_ERROR);
    assert.throws(() => normalizeLeadValues(withField("email", email)), LeadValidationError);
  });
}

function n11Phones(): string[] {
  const national = N11.flatMap((code) => [`${code}4123123`, `413${code}3123`]);
  return [...national, ...national.map((d) => `+1 ${d}`)];
}

function invalidPhones(): string[] {
  return [
    ...n11Phones(),
    "12345", "abcdefghij", "1234567890", "0134123123", "1134123123", "4130123123", "4131123123",
    "212-211-5555", "4134111234", "(413) 555-0123", "+44 7911 123456", "+52 55 1234 5678",
    "413412312345", "+1 413 412 3123 ext 45", "413-412-3123 x45", "Phone #2: 413-412-3123",
  ];
}

test("phone matrix covers all eight N11 codes in area and exchange, national and +1 (32)", () => {
  assert.equal(new Set(n11Phones()).size, 32);
});

for (const phone of invalidPhones()) {
  test(`rejects phone ${JSON.stringify(phone)}`, () => {
    assert.equal(validateLeadValues(withField("phone", phone)).phone, PHONE_ERROR);
    assert.throws(() => normalizeLeadValues(withField("phone", phone)), LeadValidationError);
  });
}

test("foreign and overlong phones are never truncated by the formatter", () => {
  for (const raw of ["+44 7911 123456", "+52 55 1234 5678", "413412312345", "Phone #2: 413-412-3123"]) {
    assert.equal(formatPhone(raw), raw);
  }
});

test("ordinary and +1 phones display nationally and wire as national digits", () => {
  for (const raw of ["4134123123", "+1 (413) 412-3123", "1-413-412-3123"]) {
    assert.equal(formatPhone(raw), "(413) 412-3123");
    assert.equal(normalizeLeadValues(withField("phone", raw)).phone, "4134123123");
  }
});

test("mandated QA number is valid: display (555) 555-0100, wire 5555550100", () => {
  assert.equal(formatPhone("+15555550100"), "(555) 555-0100");
  assert.equal(normalizeLeadValues(withField("phone", "+15555550100")).phone, "5555550100");
});

const NON_STRINGS: [string, unknown][] = [
  ["missing", undefined], ["null", null], ["false", false], ["0", 0], ["boxed String", Object("Test")],
  ["array", ["Test"]], ["object", { value: "Test" }],
];

function stringLike(): { calls: number; value: object } {
  const probe = { calls: 0, value: {} };
  probe.value = {
    toString: () => { probe.calls += 1; return "Test"; },
    trim: () => { probe.calls += 1; return "Test"; },
    valueOf: () => { probe.calls += 1; return "Test"; },
  };
  return probe;
}

for (const field of LEAD_FIELDS) {
  test(`${field.name}: rejects blank, whitespace and every non-string without coercion`, () => {
    for (const [label, value] of NON_STRINGS) {
      const values = label === "missing" ? omit(field.name) : withField(field.name, value);
      assert.ok(validateLeadValues(values)[field.name], `${field.name} ${label}`);
      assert.throws(() => normalizeLeadValues(values), LeadValidationError);
    }
    const probe = stringLike();
    assert.ok(validateLeadValues(withField(field.name, probe.value))[field.name]);
    assert.equal(probe.calls, 0, "custom string-like methods must never be called");
    assert.ok(validateLeadValues(withField(field.name, ""))[field.name]);
    assert.ok(validateLeadValues(withField(field.name, "   "))[field.name]);
  });
}

function omit(name: string): Record<string, unknown> {
  const copy: Record<string, unknown> = { ...VALID };
  delete copy[name];
  return copy;
}

test("text fields: trimmed and at most 200 characters", () => {
  assert.equal(normalizeLeadValues(withField("firstName", "  Test  ")).firstName, "Test");
  assert.deepEqual(validateLeadValues(withField("lastName", "x".repeat(200))), {});
  assert.ok(validateLeadValues(withField("lastName", "x".repeat(201))).lastName);
});

test("selects accept only exact declared values", () => {
  for (const bad of ["yes", " Yes", "Yes ", "Maybe"]) assert.ok(validateLeadValues(withField("ownsHome", bad)).ownsHome);
  for (const bad of ["asap", "1-3 months", " ASAP"]) assert.ok(validateLeadValues(withField("timeline", bad)).timeline);
  assert.deepEqual(validateLeadValues(withField("timeline", "1–3 months")), {});
});

test("non-object payloads reject every field", () => {
  for (const values of [null, undefined, "x", 1, ["Test"]]) {
    assert.equal(Object.keys(validateLeadValues(values)).length, 6);
  }
});

test("inherited (prototype) keys are not accepted as fields", () => {
  const values = Object.create({ ...VALID }) as Record<string, unknown>;
  assert.equal(Object.keys(validateLeadValues(values)).length, 6);
});

test("accessor properties are rejected and never invoked (no validate/normalize read split)", () => {
  for (const field of LEAD_FIELDS) {
    let reads = 0;
    const values: Record<string, unknown> = { ...VALID };
    Object.defineProperty(values, field.name, { enumerable: true, get: () => (reads++ === 0 ? VALID[field.name as keyof typeof VALID] : { evil: true }) });
    assert.ok(validateLeadValues(values)[field.name], field.name);
    assert.throws(() => normalizeLeadValues(values), LeadValidationError);
    assert.equal(reads, 0, `${field.name} getter must never run`);
  }
});
