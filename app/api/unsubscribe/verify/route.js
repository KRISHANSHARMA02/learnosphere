import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const candidateBackends = [
      process.env.WEB_BACKEND_URL,
      process.env.NEXT_PUBLIC_WEB_BACKEND_URL,
      "https://dev-uat.learnosphere.cloud",
      "https://learnospherebackend.learnosphere.in",
      "http://localhost:4000",
    ].filter(Boolean);

    const uniqueBackends = Array.from(new Set(candidateBackends.map(u => u.replace(/\/+$/, ""))));

    let lastErrorData = null;
    let lastStatus = 400;

    for (const backend of uniqueBackends) {
      try {
        const response = await fetch(`${backend}/api/route/unsubscribe/verify-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
          cache: "no-store",
        });

        const contentType = response.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          // Received HTML 404 or non-JSON, try next candidate
          continue;
        }

        const data = await response.json();

        if (response.ok && data.valid) {
          return NextResponse.json(data, { status: 200 });
        }

        // Keep explicit backend validation error for fallback
        lastErrorData = data;
        lastStatus = response.status;
      } catch (backendErr) {
        // Continue to next candidate
      }
    }

    if (lastErrorData) {
      return NextResponse.json(lastErrorData, { status: lastStatus });
    }

    return NextResponse.json(
      { valid: false, message: "This unsubscribe link is invalid or has expired." },
      { status: 400 }
    );
  } catch (error) {
    console.error("[Frontend API] verify unsubscribe error:", error);
    return NextResponse.json(
      { valid: false, message: "Unable to verify unsubscribe request." },
      { status: 500 }
    );
  }
}
