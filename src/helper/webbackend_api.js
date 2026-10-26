export const WEB_BACKEND_URL =
  process.env.NEXT_PUBLIC_WEB_BACKEND_URL ||
  process.env.WEB_BACKEND_URL ||
  (typeof window !== "undefined"
    ? window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
      ? "http://localhost:4000"
      : "https://learnospherebackend.learnosphere.in"
    : process.env.NODE_ENV === "production"
    ? "https://learnospherebackend.learnosphere.in"
    : "http://localhost:4000");

export const getWebBackendUrl = (endpoint = "") => {
  let base = WEB_BACKEND_URL;
  if (process.env.NODE_ENV !== "production" || (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"))) {
    base = "http://localhost:4000";
  }
  base = (base || "").trim().replace(/\/+$/, "");
  if (!endpoint) return base;
  return `${base}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
};

export async function webBackendFetch(endpoint, options = {}) {
  try {
    const url = getWebBackendUrl(endpoint);
    let res;
    try {
      res = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
      });
    } catch (fetchErr) {
      const fallbackBase = url.includes("localhost")
        ? "https://learnospherebackend.learnosphere.in"
        : "http://localhost:4000";
      const fallbackUrl = `${fallbackBase}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
      res = await fetch(fallbackUrl, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
      });
    }

    const contentType = res.headers.get("content-type");

    // CASE 1: User NOT found (404) → try local fallback if fetched from live, else return json
    if (res.status === 404) {
      if (!url.includes("localhost")) {
        try {
          const localUrl = `http://localhost:4000${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
          const localRes = await fetch(localUrl, {
            ...options,
            headers: {
              "Content-Type": "application/json",
              ...(options.headers || {}),
            },
          });
          if (localRes.ok) {
            const localContentType = localRes.headers.get("content-type");
            if (localContentType?.includes("application/json")) {
              return await localRes.json();
            }
          }
        } catch (e) {}
      }

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
      const json = await res.json();
      // If local database had stub/empty data (missing heading1 and tableData) for samplepaperspdf, fallback to live
      if (url.includes("localhost") && endpoint.includes("samplepaperspdf")) {
        const item = json?.data?.[0];
        if (!item?.heading1 && (!item?.tableData || item.tableData.length === 0)) {
          try {
            let liveUrl = `https://learnospherebackend.learnosphere.in${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
            let liveRes = await fetch(liveUrl, options);
            if (!liveRes.ok) {
              const altEndpoint = endpoint
                .replace(/Sample-Papers-Sa(\d+)/i, 'Sa$1-Sample-Papers')
                .replace(/Sample-Paper-Sa(\d+)/i, 'Sa-$1-Sample-Paper');
              if (altEndpoint !== endpoint) {
                liveUrl = `https://learnospherebackend.learnosphere.in${altEndpoint.startsWith("/") ? "" : "/"}${altEndpoint}`;
                liveRes = await fetch(liveUrl, options);
              }
            }
            if (liveRes.ok) {
              const liveJson = await liveRes.json();
              if (liveJson?.data?.[0]?.heading1 || liveJson?.data?.[0]?.tableData?.length > 0) {
                return liveJson;
              }
            }
          } catch (e) {}
        }
      }
      return json;
    } else {
      throw new Error("Backend did not return JSON!");
    }
  } catch (err) {
    console.error("API Fetch Error:", err);
    throw err;
  }
}
