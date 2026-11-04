import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token") || "";

    const forwardedFor = request.headers.get("x-forwarded-for") || "";
    const userAgent = request.headers.get("user-agent") || "";

    const candidateBackends = [
      process.env.WEB_BACKEND_URL,
      process.env.NEXT_PUBLIC_WEB_BACKEND_URL,
      "https://dev-uat.learnosphere.cloud",
      "https://learnospherebackend.learnosphere.in",
      "http://localhost:4000",
    ].filter(Boolean);

    const uniqueBackends = Array.from(new Set(candidateBackends.map(u => u.replace(/\/+$/, ""))));

    for (const backend of uniqueBackends) {
      try {
        const response = await fetch(
          `${backend}/api/route/unsubscribe/one-click?token=${encodeURIComponent(token)}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "x-forwarded-for": forwardedFor,
              "user-agent": userAgent,
            },
            body: "List-Unsubscribe=One-Click",
            cache: "no-store",
          }
        );

        if (response.ok) {
          const text = await response.text();
          return new NextResponse(text, {
            status: response.status,
            headers: { "Content-Type": "text/plain" },
          });
        }
      } catch (backendErr) {
        // Continue
      }
    }

    return new NextResponse("Unsubscribe link invalid or expired", { status: 400 });
  } catch (error) {
    console.error("[Frontend API] one-click unsubscribe error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(request) {
  // If a mail client attempts GET, redirect safely to the web unsubscribe confirmation page
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token") || "";
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost || request.headers.get("host") || "learnosphere.in";
  const proto = request.headers.get("x-forwarded-proto") || "https";
  const base = `${proto}://${host}`;
  return NextResponse.redirect(`${base}/unsubscribe?token=${encodeURIComponent(token)}`, 302);
}
