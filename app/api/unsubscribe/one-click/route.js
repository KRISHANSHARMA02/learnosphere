import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.WEB_BACKEND_URL ||
  process.env.NEXT_PUBLIC_WEB_BACKEND_URL ||
  "http://localhost:4000";

export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token") || "";

    const forwardedFor = request.headers.get("x-forwarded-for") || "";
    const userAgent = request.headers.get("user-agent") || "";

    const response = await fetch(
      `${BACKEND_URL}/api/route/unsubscribe/one-click?token=${encodeURIComponent(token)}`,
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

    const text = await response.text();
    return new NextResponse(text, {
      status: response.status,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("[Frontend API] one-click unsubscribe error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(request) {
  // If a mail client attempts GET, redirect safely to the web unsubscribe confirmation page
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token") || "";
  const base = new URL(request.url).origin;
  return NextResponse.redirect(`${base}/unsubscribe?token=${encodeURIComponent(token)}`, 302);
}
