export const APP_BACKEND_URL =
  process.env.NEXT_PUBLIC_APP_BACKEND_URL ||
  process.env.APP_BACKEND_URL ||
  "https://mobileapp.backend.learnosphere.in";

export const getAppBackendUrl = (endpoint = "") => {
  const base = (APP_BACKEND_URL || "https://mobileapp.backend.learnosphere.in").replace(/\/+$/, "");
  if (!endpoint) return base;
  return `${base}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
};

export async function backendFetch(endpoint, options = {}) {
  try {
    const url = getAppBackendUrl(endpoint);
    let res;
    try {
      res = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
      });
    } catch (netErr) {
      // If localhost failed (e.g. ECONNREFUSED on port 5000), fallback to live backend
      if (url.includes("localhost") || url.includes("127.0.0.1")) {
        const fallbackBase = "https://mobileapp.backend.learnosphere.in";
        const fallbackUrl = `${fallbackBase}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
        res = await fetch(fallbackUrl, {
          ...options,
          headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
          },
        });
      } else {
        throw netErr;
      }
    }

    // 🟡 CASE 1: 404 Not Found → Return JSON without throwing
    if (res.status === 404) {
      const errorJson = await res.json().catch(() => ({}));
      return {
        success: false,
        status: 404,
        ...errorJson,
      };
    }

    // 🔴 CASE 2: Other errors → Throw
    if (!res.ok) {
      const errorText = await res.text().catch(() => "Unknown error");
      throw new Error(`Backend error: ${res.status} - ${errorText}`);
    }

    // 🟢 CASE 3: OK Response → Parse normally
    return await res.json();

  } catch (err) {
    console.warn("API Fetch Warning (handled):", err.message || err);
    return null;
  }
}

export default APP_BACKEND_URL;
