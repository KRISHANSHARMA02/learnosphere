import { NextResponse } from "next/server";
import { webBackendFetch } from "@/src/helper/webbackend_api";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // 🔁 Forward to backend (query param)
    const result = await webBackendFetch(
      `/api/route/getUpiByEmail?email=${encodeURIComponent(email)}`
    );

    // ❌ Backend error
    if (!result?.success) {
      return NextResponse.json(
        {
          success: false,
          message: result?.message || "No UPI found for this email",
          data: null,
        },
        { status: result?.status || 404 }
      );
    }

    // ✅ Success
    return NextResponse.json(
      {
        success: true,
        data: result.data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("💥 Fetch UPI proxy error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}