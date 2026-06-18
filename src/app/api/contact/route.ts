import { NextRequest, NextResponse } from "next/server";
import {
  validateContactForm,
  type ContactPayload,
} from "@/lib/contactValidation";

const ipTimestamps = new Map<string, number[]>();
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 3;

const KEYSTONE_CONFIG = {
  CUSTOMER_ID: "8b47c5f4-f321-402f-b208-d778ccc05934",
  SITE_ID: "00fbcebb-a640-43d6-80d6-c1570f6cc2d9",
  SOURCE_PROVIDER: "cosello-construction-website",
  ENDPOINT: "https://analytics.gomega.ai/submission/submit",
};

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const stamps = (ipTimestamps.get(ip) ?? []).filter(
    (t) => now - t < RATE_WINDOW_MS
  );

  if (stamps.length >= RATE_MAX) return true;

  stamps.push(now);
  ipTimestamps.set(ip, stamps);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body: ContactPayload = await req.json();
    const result = validateContactForm(body);

    if (result.spam) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    if (!result.valid) {
      return NextResponse.json(
        { error: "Validation failed.", details: result.errors },
        { status: 400 }
      );
    }

    const portalId = process.env.HUBSPOT_PORTAL_ID;
    const formId = process.env.HUBSPOT_FORM_ID;

    if (!portalId || !formId) {
      return NextResponse.json(
        { error: "HubSpot configuration missing." },
        { status: 500 }
      );
    }

    const { firstname, lastname, address, phone, email, job_details } = body;

    // Submit to Keystone (Mega CRM) — fire-and-forget, do not block HubSpot
    const keystonePayload = {
      customer_id: KEYSTONE_CONFIG.CUSTOMER_ID,
      site_id: KEYSTONE_CONFIG.SITE_ID,
      source_provider: KEYSTONE_CONFIG.SOURCE_PROVIDER,
      form_data: { firstname, lastname, address, phone, email, job_details },
      url: req.headers.get("referer") ?? "",
      referrer_url: null,
      session_id: null,
      visitor_id: null,
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_term: null,
      utm_content: null,
      gclid: null,
      gbraid: null,
      wbraid: null,
      fbclid: null,
      fbp: null,
      fbc: null,
    };

    fetch(KEYSTONE_CONFIG.ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(keystonePayload),
    }).catch((err) =>
      console.error("[contact/route] Keystone submission error:", err)
    );

    // Submit to HubSpot
    const hubspotPayload = {
      fields: [
        { objectTypeId: "0-1", name: "firstname", value: firstname },
        { objectTypeId: "0-1", name: "lastname", value: lastname },
        { objectTypeId: "0-2", name: "address", value: address },
        { objectTypeId: "0-1", name: "phone", value: phone },
        { objectTypeId: "0-1", name: "email", value: email },
        { objectTypeId: "0-1", name: "job_details", value: job_details },
      ],
      context: {
        pageUri: req.headers.get("referer") ?? "",
        pageName: "Cosello Construction Contact Form",
      },
    };

    const hubspotRes = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hubspotPayload),
      }
    );

    if (!hubspotRes.ok) {
      const errorText = await hubspotRes.text();
      console.error("[contact/route] HubSpot error:", errorText);
      return NextResponse.json(
        { error: "Failed to submit form." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[contact/route] Caught error:", err);
    return NextResponse.json(
      { error: "Failed to submit form." },
      { status: 500 }
    );
  }
}
