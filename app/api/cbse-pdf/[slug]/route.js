import { NextResponse } from "next/server";
import { auth } from "@/src/auth";
import jwt from "jsonwebtoken";
import { webBackendFetch } from "@/src/helper/webbackend_api";

export async function GET(req, { params }) {
  try {
    const { slug } = await params;
    if (!slug) {
      return NextResponse.json({ message: "Slug is required" }, { status: 400 });
    }

    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { message: "Authentication required to view PDF", isLocked: true },
        { status: 401 }
      );
    }

    const secret = process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET_KEY;
    const token = jwt.sign(
      { email: session.user.email, role: session.user.role || "student" },
      secret,
      { expiresIn: "15m" }
    );

    const data = await webBackendFetch(`/api/route/cbsepreviouspaperspdf/${slug}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Failed to fetch PDF" },
      { status: 500 }
    );
  }
}
