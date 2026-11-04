import { NextResponse } from "next/server";

function getSafeOrigin(request) {
  try {
    const forwardedHost = request.headers.get("x-forwarded-host");
    const rawHost = forwardedHost || request.headers.get("host") || "";
    const proto = request.headers.get("x-forwarded-proto") || "https";

    // If host is a real public domain and not localhost/127.0.0.1
    if (rawHost && !rawHost.includes("localhost") && !rawHost.includes("127.0.0.1")) {
      return `${proto}://${rawHost}`;
    }

    if (process.env.BASE_URL && !process.env.BASE_URL.includes("localhost")) {
      return process.env.BASE_URL.replace(/\/+$/, "");
    }

    if (process.env.NEXTAUTH_URL && !process.env.NEXTAUTH_URL.includes("localhost")) {
      return process.env.NEXTAUTH_URL.replace(/\/+$/, "");
    }
  } catch (e) {
    // Fallback
  }

  return "https://learnosphere.in";
}

export async function GET(request) {
  const origin = getSafeOrigin(request);
  const fallbackUrl = `${origin}/`;

  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("t") || searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(fallbackUrl, 302);
    }

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

    let resolvedTargetUrl = null;

    for (const backend of uniqueBackends) {
      try {
        const response = await fetch(`${backend}/api/route/redirect/resolve`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-forwarded-for": forwardedFor,
            "user-agent": userAgent,
          },
          body: JSON.stringify({ token }),
          cache: "no-store",
        });

        const contentType = response.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          // Backend returned HTML 404, try next candidate
          continue;
        }

        const data = await response.json();
        if (response.ok && data.success && data.targetUrl) {
          resolvedTargetUrl = data.targetUrl;
          break;
        }
      } catch (backendErr) {
        // Continue to next backend candidate
      }
    }

    if (resolvedTargetUrl) {
      return NextResponse.redirect(resolvedTargetUrl, 307);
    }

    console.warn("[Redirect] Could not resolve token against any configured backend.");
    return NextResponse.redirect(fallbackUrl, 302);
  } catch (err) {
    console.error("[Redirect] Resolution error:", err);
    return NextResponse.redirect(fallbackUrl, 302);
  }
}
