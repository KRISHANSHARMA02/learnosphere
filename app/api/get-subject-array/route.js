import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://learnospherebackend.learnosphere.in/api/route/get_subject_array",
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
