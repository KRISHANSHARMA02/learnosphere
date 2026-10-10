import { NextResponse } from "next/server";
import { webBackendFetch } from "@/src/helper/webbackend_api";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { message: "Slug is required" },
        { status: 400 }
      );
    }

    // Call backend API using your helper function
    const data = await webBackendFetch(
      `/api/route/getImportantTopics?slug=${slug}`,
      {
        method: "GET",
      }
    );

    // CASE 1: Helper returns "success: false" → backend 404 response
    if (data.success === false) {
      return NextResponse.json(
        { message: data.message || "Data not found" },
        { status: 404 }
      );
    }

    // CASE 2: Valid data
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
