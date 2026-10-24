import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const session_id = searchParams.get("session_id");

    if (!session_id) {
      return NextResponse.json(
        { success: false, message: "session_id missing" },
        { status: 400 }
      );
    }

    const backendResponse = await fetch(
      `${WEB_BACKEND_URL}/api/route/recent-search/get?session_id=${session_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // important for fresh data
      }
    );

    const data = await backendResponse.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { success: false, message: "Proxy failed" },
      { status: 500 }
    );
  }
}
