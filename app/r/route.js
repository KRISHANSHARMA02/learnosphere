import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.WEB_BACKEND_URL ||
  process.env.NEXT_PUBLIC_WEB_BACKEND_URL ||
  "http://localhost:4000";

export async function GET(request) {
  const origin = new URL(request.url).origin;
  const fallbackUrl = `${origin}/`;

  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("t") || searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(fallbackUrl, 302);
    }

    const forwardedFor = request.headers.get("x-forwarded-for") || "";
    const userAgent = request.headers.get("user-agent") || "";

    const response = await fetch(`${BACKEND_URL}/api/route/redirect/resolve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": forwardedFor,
        "user-agent": userAgent,
      },
      body: JSON.stringify({ token }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.warn(`[Redirect] Token validation rejected with status ${response.status}`);
      return NextResponse.redirect(fallbackUrl, 302);
    }

    const data = await response.json();
    if (data.success && data.targetUrl) {
      return NextResponse.redirect(data.targetUrl, 307);
    }

    return NextResponse.redirect(fallbackUrl, 302);
  } catch (err) {
    console.error("[Redirect] Resolution error:", err);
    return NextResponse.redirect(fallbackUrl, 302);
  }
}
