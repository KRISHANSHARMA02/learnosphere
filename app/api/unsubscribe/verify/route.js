import { NextResponse } from "next/server";

// Server-side backend URL hidden from the browser
const BACKEND_URL =
  process.env.WEB_BACKEND_URL ||
  process.env.NEXT_PUBLIC_WEB_BACKEND_URL ||
  "http://localhost:4000";

export async function POST(request) {
  try {
    const body = await request.json();

    const response = await fetch(`${BACKEND_URL}/api/route/unsubscribe/verify-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("[Frontend API] verify unsubscribe error:", error);
    return NextResponse.json(
      { valid: false, message: "Unable to verify unsubscribe request." },
      { status: 500 }
    );
  }
}
