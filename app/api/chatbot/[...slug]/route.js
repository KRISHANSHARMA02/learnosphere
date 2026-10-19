import { NextResponse } from "next/server";

const REMOTE_CHATBOT_URL = "https://ai-backend.learnosphere.in/chatbot";

async function proxyRequest(request, context) {
  try {
    const params = await context.params;
    const slug = Array.isArray(params?.slug)
      ? params.slug.join("/")
      : params?.slug || "";

    const { search } = new URL(request.url);
    const targetUrl = `${REMOTE_CHATBOT_URL}/${slug}${search}`;

    const headers = new Headers();
    const contentType = request.headers.get("content-type");
    if (contentType) {
      headers.set("content-type", contentType);
    } else {
      headers.set("content-type", "application/json");
    }
    headers.set("X-Client-Type", "web");

    const fetchOptions = {
      method: request.method,
      headers,
      cache: "no-store",
    };

    if (request.method !== "GET" && request.method !== "HEAD") {
      const body = await request.text();
      if (body) {
        fetchOptions.body = body;
      }
    }

    const response = await fetch(targetUrl, fetchOptions);
    const data = await response.text();

    return new NextResponse(data, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("content-type") || "application/json",
      },
    });
  } catch (error) {
    console.error("[Chatbot API Proxy Error]:", error);
    return NextResponse.json(
      { detail: error.message || "Failed to reach AI Chatbot server" },
      { status: 502 }
    );
  }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const DELETE = proxyRequest;
export const OPTIONS = proxyRequest;
