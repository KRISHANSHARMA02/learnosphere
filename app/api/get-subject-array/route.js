import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      `${WEB_BACKEND_URL}/api/route/get_subject_array`,
      {
        cache: "no-store", // fresh data always
      }
    );

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch subjects" },
      { status: 500 }
    );
  }
}
