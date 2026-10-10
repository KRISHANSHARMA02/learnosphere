import { NextResponse } from "next/server";
import { webBackendFetch } from "@/src/helper/webbackend_api";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, countrycode, mobilenumber, role, gender, address } = body;

    // Validate required fields
    if (!name || !email || !countrycode || !mobilenumber || !role || !gender || !address) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    // Forward to backend with correct endpoint
    const result = await webBackendFetch("/api/route/submitAndgenerate_referral", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        countrycode,
        mobilenumber,
        role,
        gender,
        address,
      }),
    });

    // Handle backend response
    if (!result.success) {
      console.error("Referral form submit failed:", {
        status: result.status,
        error: result.error || result.message,
      });

      // Generic error handling
      return NextResponse.json(
        {
          success: false,
          message: result.message || "Failed to submit referral form",
          error: result.error,
        },
        { status: result.status || 500 }
      );
    }

    // Success response - match backend format exactly
    return NextResponse.json({
      success: true,
      message: result.message,
      data: result.data,
      token: result.token,
    }, { status: result.status || 201 });

  } catch (error) {
    console.error("❌ Referral submit error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Server error. Please try again.",
      },
      { status: 500 }
    );
  }
}