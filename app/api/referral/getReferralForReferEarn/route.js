import { NextResponse } from "next/server";
import { webBackendFetch } from "@/src/helper/webbackend_api";

export async function GET(request) {
  try {
    const authHeader = request.headers.get("authorization");
    
    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: "Token missing" },
        { status: 401 }
      );
    }

    // Forward to actual backend
    const result = await webBackendFetch("api/route/getReferralForReferEarn", {
      headers: {
        "Authorization": authHeader,
      },
    });

    // Handle backend response
    if (!result.success) {
      if (result.status === 401 || result.status === 403) {
        return NextResponse.json(
          { success: false, message: result.message || "Invalid token" },
          { status: result.status }
        );
      }
      return NextResponse.json(
        { success: false, message: result.message },
        { status: result.status || 500 }
      );
    }

    // Success
    return NextResponse.json({
      success: true,
      referralCode: result.referralCode,
    }, { status: 200 });

  } catch (error) {
    console.error("💥 Get referral error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}