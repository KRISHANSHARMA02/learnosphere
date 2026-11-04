import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const forwardedFor = request.headers.get("x-forwarded-for") || "";
    const userAgent = request.headers.get("user-agent") || "";

    const candidateBackends = [
      process.env.WEB_BACKEND_URL,
      process.env.NEXT_PUBLIC_WEB_BACKEND_URL,
      "https://dev-uat.learnosphere.cloud",
      "https://learnospherebackend.learnosphere.in",
      "http://localhost:4000",
    ].filter(Boolean);

    const uniqueBackends = Array.from(new Set(candidateBackends.map((u) => u.replace(/\/+$/, ""))));

    let lastErrorData = null;
    let lastStatus = 400;

    for (const backend of uniqueBackends) {
      try {
        const response = await fetch(`${backend}/api/route/unsubscribe/resubscribe`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-forwarded-for": forwardedFor,
            "user-agent": userAgent,
          },
          body: JSON.stringify(body),
          cache: "no-store",
        });

        const contentType = response.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          continue;
        }

        const data = await response.json();

        if (response.ok && data.success) {
          return NextResponse.json(data, { status: 200 });
        }

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
      { success: false, message: "Unable to process resubscribe request." },
      { status: 400 }
    );
  } catch (error) {
    console.error("[Frontend API] resubscribe error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to process resubscribe request." },
      { status: 500 }
    );
  }
}
