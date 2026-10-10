const BLOGS_URL = "https://blogs.learnosphere.in/wp-json/wp/v2/posts";

async function safeFetchBlogs(url) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // 8s timeout

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.WORDPRESS_API_TOKEN}`,
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    // ❌ API unreachable / 4xx / 5xx
    if (!res.ok) {
      console.warn("Blog API error:", res.status);
      return [];
    }

    // ❌ API returned HTML instead of JSON
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.warn("Blog API returned non-JSON response");
      return [];
    }

    const blogs = await res.json();

    // ❌ Invalid data
    if (!Array.isArray(blogs)) {
      return [];
    }

    return blogs;
  } catch (error) {
    console.warn("Blog fetch skipped:", error.message);
    return [];
  }
}

/* ----------------------------------
   Get all blogs (SAFE)
---------------------------------- */
export async function getAllBlogs() {
  return safeFetchBlogs(
    `${BLOGS_URL}?_embed&per_page=100`
  );
}

/* ----------------------------------
   Get recent blogs (SAFE)
---------------------------------- */
export async function getRecentBlogs() {
  const blogs = await safeFetchBlogs(
    `${BLOGS_URL}?_embed&per_page=100`
  );

  return blogs;
}