export async function backendFetch(endpoint, options = {}) {
  try {
    const res = await fetch(`${process.env.APP_BACKEND_URL}${endpoint}`, {
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
