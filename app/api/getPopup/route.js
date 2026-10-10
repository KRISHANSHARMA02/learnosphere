import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const response = await fetch(
      `https://dev-backend.learnosphere.in/api/route/getActivePopup`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    // No popup found
    if (response.status === 404) {
      return new NextResponse(null, { status: 204 });
    }

    // Backend error
    if (!response.ok) {
      const errorText = await response.text();

      console.error("Popup fetch failed:", {
        status: response.status,
        error: errorText,
      });

      return NextResponse.json(
        {
          message: "Failed to fetch popup",
          error: errorText,
        },
        {
          status: response.status || 500,
        }
      );
    }

    // Parse successful response
    const result = await response.json();

    // Popup exists but no image
    if (!result.imageUrl) {
      return new NextResponse(null, { status: 204 });
    }

    // Popup found
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Popup API error:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch popup",
      },
      { status: 500 }
    );
  }
}