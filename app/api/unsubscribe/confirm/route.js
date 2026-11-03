import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.WEB_BACKEND_URL ||
  process.env.NEXT_PUBLIC_WEB_BACKEND_URL ||
  "http://localhost:4000";

export async function POST(request) {
  try {
    const body = await request.json();

    // Forward client IP and User-Agent for audit logging
    const forwardedFor = request.headers.get("x-forwarded-for") || "";
    const userAgent = request.headers.get("user-agent") || "";

    const response = await fetch(`${BACKEND_URL}/api/route/unsubscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": forwardedFor,
        "user-agent": userAgent,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("[Frontend API] confirm unsubscribe error:", error);
    return NextResponse.json(
      { success: false, message: "Server error confirming unsubscription." },
      { status: 500 }
    );
  }
}
