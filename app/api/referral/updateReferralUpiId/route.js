import { NextResponse } from "next/server";
import { webBackendFetch } from "@/src/helper/webbackend_api";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, upiId } = body;

    if (!email || !upiId) {
      return NextResponse.json(
        { success: false, message: "Email and UPI ID are required" },
        { status: 400 },
      );
    }

    // Validate UPI format (optional - backend bhi validate karega)
    const UPI_REGEX = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
    if (!UPI_REGEX.test(upiId)) {
      return NextResponse.json(
        { success: false, message: "Invalid UPI ID format" },
        { status: 400 },
      );
    }

    // Forward to actual backend
    const result = await webBackendFetch("/api/route/verify_and_save_vpa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, upiId }),
    });

    const responseData = result;

    // Pass through the backend response exactly
    return NextResponse.json(responseData, { status: result.status });
  } catch (error) {
    console.error("💥 Update UPI Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
