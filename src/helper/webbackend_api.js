export const WEB_BACKEND_URL =
  process.env.WEB_BACKEND_URL ||
"https://learnospherebackend.learnosphere.in";

export const getWebBackendUrl = (endpoint = "") => {
  const base = (WEB_BACKEND_URL || "").replace(/\/+$/, "");
  if (!endpoint) return base;
  return `${base}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
};

export async function webBackendFetch(endpoint, options = {}) {
  try {
    const url = getWebBackendUrl(endpoint);
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    const contentType = res.headers.get("content-type");

    // CASE 1: User NOT found (404) → try json, else return message
    if (res.status === 404) {
      if (contentType?.includes("application/json")) {
        const errorJson = await res.json();
        return { success: false, ...errorJson };
      } else {
        return { success: false, message: "Resource not found" };
      }
    }

    // CASE 2: Other errors → throw
    if (!res.ok) {
      let errorText;
      if (contentType?.includes("application/json")) {
        const errJson = await res.json();
        errorText = JSON.stringify(errJson);
      } else {
        errorText = await res.text();
      }
      throw new Error(`Backend error: ${res.status} - ${errorText}`);
    }

    // CASE 3: Normal success
    if (contentType?.includes("application/json")) {
      return await res.json();
    } else {
      throw new Error("Backend did not return JSON!");
    }
  } catch (err) {
    console.error("API Fetch Error:", err);
    throw err;
  }
}

export default WEB_BACKEND_URL;
