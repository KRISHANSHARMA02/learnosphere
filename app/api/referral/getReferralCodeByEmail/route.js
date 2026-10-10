
import { NextResponse } from "next/server";
import { webBackendFetch } from "@/src/helper/webbackend_api";

export async function GET(request) {
  try {
      // ✅ Get email from query params
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 }
      );
    }

    // Forward to backend
    const result = await webBackendFetch(`/api/route/getReferralCodeByEmail/${encodeURIComponent(email)}`);

    // Handle backend response
    if (!result.success) {
      console.error("Referral code fetch failed:", {
        status: result.status,
        error: result.error || result.message,
      });

      // Handle specific status codes
      if (result.status === 404) {
        return NextResponse.json(
          {
            success: false,
            message: result.message || "No referral code found for this email",
          },
          { status: 404 }
        );
      }

      // Generic error
      return NextResponse.json(
        {
          success: false,
          message: result.message || "Failed to fetch referral code",
          error: result.error,
        },
        { status: result.status || 500 }
      );
    }

    // Success response
    return NextResponse.json({
      success: true,
      referralCode: result.referralCode,
    }, { status: 200 });

  } catch (error) {
    console.error("💥 Get referral code error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}