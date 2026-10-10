import { NextResponse } from "next/server";
import { webBackendFetch } from "@/src/helper/webbackend_api";

export async function POST(req) {
  try {
    const { studentEmail } = await req.json();

    if (!studentEmail) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Here, response is already JSON
    const data = await webBackendFetch(
      "/api/route/record-logout-activity-student",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentEmail }),
      }
    );

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
