import { afterEach, test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { useMegaLeadForm } from "../src/hooks/useMegaLeadForm";
import { normalizeLeadValues } from "../src/lib/leadFields";

// LeadForm.tsx is JSX, so its authored envelope and DOM identity are pinned
// from source here; the contained real-optimizer fixture proves the wire.
const SOURCE = readFileSync(new URL("../src/components/LeadForm.tsx", import.meta.url), "utf8");
const FORM_ID = "koehler-lead-form";
const SIX_KEYS = ["firstName", "lastName", "email", "phone", "ownsHome", "timeline"];

// Marked fixture identity: fetch is mocked, nothing leaves the test.
const RAW = {
  firstName: "  Test ",
  lastName: " MEGA QA ",
  email: " qatest+fixture@GoMega.ai ",
  phone: "+1 (413) 412-3123",
  ownsHome: "Yes",
  timeline: "ASAP",
};

const realFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = realFetch;
});

function runSubmitBody(): string {
  const start = SOURCE.indexOf("const runSubmit = async");
  const endIndex = SOURCE.indexOf("const handleButtonClick");
  assert.ok(start > 0 && endIndex > start, "runSubmit routine not found");
  return SOURCE.slice(start, endIndex);
}

test("the actual <form> carries the koehler-lead-form id inside the #form wrapper", () => {
  const wrapper = SOURCE.indexOf('id="form"');
  const form = SOURCE.indexOf("<form");
  const formTag = SOURCE.slice(form, SOURCE.indexOf(">", form));
  assert.ok(wrapper > 0 && wrapper < form, "#form wrapper must still enclose the form");
  assert.match(formTag, new RegExp(`\\bid="${FORM_ID}"`));
  assert.equal(SOURCE.split(`id="${FORM_ID}"`).length - 1, 1, "form id appears once");
});

test("the success-only MegaTag form_submit carries elementId and normalized formData", () => {
  const call = runSubmitBody().match(/trackEvent\?\.\("form_submit", \{([\s\S]*?)\}\);/);
  assert.ok(call, "MegaTag form_submit call not found");
  const keys = [...call[1].matchAll(/^\s*(\w+):/gm)].map((match) => match[1]);
  assert.deepEqual(keys.sort(), ["elementId", "formData", "lead_quality"]);
  assert.match(call[1], new RegExp(`elementId: "${FORM_ID}"`));
  assert.match(call[1], /formData: normalizeLeadValues\(data\)/);
  assert.match(call[1], /lead_quality: qualified \? "qualified" : "disqualified"/);
});

test("MegaTag fires after acceptance, then the named dataLayer sequence, then navigation", () => {
  const body = runSubmitBody();
  const order = [
    'if (res?.ok !== true) throw',
    "submittedRef.current = true",
    'trackEvent?.("form_submit"',
    'pushDataLayer("form_submit"',
    'pushDataLayer("form_submission"',
    'if (qualified) pushDataLayer("qualified_lead"',
    "window.location.assign(CALENDLY_URL)",
    'router.push("/thank-you")',
  ].map((marker) => {
    const index = body.indexOf(marker);
    assert.ok(index >= 0, `missing ${marker}`);
    assert.equal(body.indexOf(marker, index + 1), -1, `${marker} appears once`);
    return index;
  });
  assert.deepEqual(order, [...order].sort((a, b) => a - b));
  assert.equal(SOURCE.split("trackEvent").length - 1, 1, "exactly one MegaTag call");
});

test("no native submit path is introduced", () => {
  assert.doesNotMatch(SOURCE, /requestSubmit|type="submit"/);
});

test("formData equals the six normalized keys the hook actually sends as form_data", async () => {
  const sent: unknown[] = [];
  globalThis.fetch = (async (_url: string, init: RequestInit) => {
    sent.push(JSON.parse(String(init.body)).form_data);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }) as typeof fetch;
  type Submit = ReturnType<typeof useMegaLeadForm>["submit"];
  const holder: { submit?: Submit } = {};
  function Probe({ onReady }: { onReady: (submit: Submit) => void }): null {
    onReady(useMegaLeadForm().submit);
    return null;
  }
  renderToString(createElement(Probe, { onReady: (submit: Submit) => { holder.submit = submit; } }));
  assert.ok(holder.submit, "hook did not render");
  await holder.submit(RAW);

  const formData = normalizeLeadValues(RAW);
  assert.equal(sent.length, 1);
  assert.deepEqual(formData, sent[0]);
  assert.deepEqual(Object.keys(formData), SIX_KEYS);
  assert.deepEqual(formData, {
    firstName: "Test",
    lastName: "MEGA QA",
    email: "qatest+fixture@gomega.ai",
    phone: "4134123123",
    ownsHome: "Yes",
    timeline: "ASAP",
  });
});
