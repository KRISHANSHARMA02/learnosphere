export const APP_BACKEND_URL =
  process.env.APP_BACKEND_URL;

export const getAppBackendUrl = (endpoint = "") => {
  const base = (APP_BACKEND_URL || "").replace(/\/+$/, "");
  if (!endpoint) return base;
  return `${base}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
};

export async function backendFetch(endpoint, options = {}) {
  try {
    const url = getAppBackendUrl(endpoint);
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    // 🟡 CASE 1: 404 Not Found → Return JSON without throwing
    if (res.status === 404) {
      const errorJson = await res.json();
      return {
        success: false,
        status: 404,
        ...errorJson,
      };
    }

    // 🔴 CASE 2: Other errors → Throw
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Backend error: ${res.status} - ${errorText}`);
    }

    // 🟢 CASE 3: OK Response → Parse normally
    return await res.json();

  } catch (err) {
    console.error("API Fetch Error:", err);
    throw err; // still throw for truly unexpected failures
  }
}

export default APP_BACKEND_URL;
