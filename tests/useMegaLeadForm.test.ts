import { afterEach, test } from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { useMegaLeadForm } from "../src/hooks/useMegaLeadForm";
import { LEAD_FIELDS, LeadValidationError } from "../src/lib/leadFields";

type Submit = ReturnType<typeof useMegaLeadForm>["submit"];

// Synthetic, non-deliverable identity: fetch is denied or mocked in every test.
const VALID = {
  firstName: "  Test ",
  lastName: "Fixture",
  email: " Mixed.Local+tag@EXAMPLE.COM ",
  phone: "+1 (413) 412-3123",
  ownsHome: "No",
  timeline: "Just researching",
};

const realFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = realFetch;
});

function captureSubmit(): Submit {
  const holder: { submit?: Submit } = {};
  function Probe({ onReady }: { onReady: (submit: Submit) => void }): null {
    onReady(useMegaLeadForm().submit);
    return null;
  }
  renderToString(createElement(Probe, { onReady: (submit: Submit) => { holder.submit = submit; } }));
  if (!holder.submit) throw new Error("hook did not render");
  return holder.submit;
}

/** Every call is recorded and refused: no request can leave the test. */
function denyFetch(): { calls: number } {
  const counter = { calls: 0 };
  globalThis.fetch = (async () => {
    counter.calls += 1;
    throw new Error("transport denied in tests");
  }) as typeof fetch;
  return counter;
}

const BAD_VALUES: [string, unknown][] = [
  ["empty", ""], ["blank", "   "], ["null", null], ["undefined", undefined], ["false", false], ["0", 0],
  ["boxed String", Object("Test")], ["array", ["Test"]], ["object", { a: 1 }],
  ["string-like", { toString: () => "Test", trim: () => "Test" }],
];

for (const field of LEAD_FIELDS) {
  test(`hook rejects invalid ${field.name} before any request`, async () => {
    const denied = denyFetch();
    const submit = captureSubmit();
    for (const [label, value] of BAD_VALUES) {
      await assert.rejects(submit({ ...VALID, [field.name]: value }), LeadValidationError, `${field.name}=${label}`);
    }
    const omitted: Record<string, unknown> = { ...VALID };
    delete omitted[field.name];
    await assert.rejects(submit(omitted), LeadValidationError);
    assert.equal(denied.calls, 0);
  });
}

test("hook rejects canonical-invalid email/phone and aliased keys with zero requests", async () => {
  const denied = denyFetch();
  const submit = captureSubmit();
  for (const email of ["a..b@domain.com", "test@domain", ".a@x.com"]) {
    await assert.rejects(submit({ ...VALID, email }), LeadValidationError);
  }
  for (const phone of ["(123) 456-7890", "212-211-5555", "+1 911 412 3123", "4135550123", "+44 7911 123456"]) {
    await assert.rejects(submit({ ...VALID, phone }), LeadValidationError);
  }
  const { firstName, ...rest } = VALID;
  await assert.rejects(submit({ ...rest, first_name: firstName }), LeadValidationError);
  await assert.rejects(submit({ ...VALID, ownsHome: "yes" }), LeadValidationError);
  assert.equal(denied.calls, 0);
});

test("hook sends exactly the six normalized keys to a mocked endpoint", async () => {
  const bodies: string[] = [];
  globalThis.fetch = (async (_url: unknown, init?: RequestInit) => {
    bodies.push(String(init?.body));
    return new Response(JSON.stringify({ ok: true, id: "mock" }), { status: 200 });
  }) as typeof fetch;
  const submit = captureSubmit();
  await submit({ ...VALID, extra: "dropped" });
  assert.equal(bodies.length, 1);
  const payload = JSON.parse(bodies[0]) as { form_data: Record<string, string> };
  assert.deepEqual(payload.form_data, {
    firstName: "Test",
    lastName: "Fixture",
    email: "Mixed.Local+tag@example.com",
    phone: "4134123123",
    ownsHome: "No",
    timeline: "Just researching",
  });
});

test("hook still treats HTTP 500, ok:false and unreadable JSON as failures", async () => {
  const submit = captureSubmit();
  const responses = [
    new Response(JSON.stringify({ ok: true }), { status: 500 }),
    new Response(JSON.stringify({ ok: false }), { status: 200 }),
    new Response("not json", { status: 200 }),
    new Response("null", { status: 200 }),
  ];
  for (const response of responses) {
    globalThis.fetch = (async () => response) as typeof fetch;
    await assert.rejects(submit(VALID));
  }
});
