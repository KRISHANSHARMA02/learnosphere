/**
 * Utility for generating SEO-compliant canonical URLs.
 * 
 * Rules:
 * - Domain: https://learnosphere.in
 * - Strips query parameters (?foo=bar) and hash fragments (#section)
 * - Strips trailing slashes unless it is root ("/")
 * - Safely handles URI encoding for path segments without double-encoding
 */

export const CANONICAL_BASE_URL = "https://learnosphere.in";

/**
 * Builds a clean canonical URL adhering strictly to technical SEO standards.
 * 
 * @param {string|string[]} pathParts - Path string (e.g. "/contact", "home-tuition/delhi") or array of path segments
 * @returns {string} Absolute canonical URL (e.g. "https://learnosphere.in/contact")
 */
export function buildCanonicalUrl(pathParts) {
  if (!pathParts || pathParts === "/" || (Array.isArray(pathParts) && pathParts.length === 0)) {
    return CANONICAL_BASE_URL;
  }

  let segments = [];
  if (Array.isArray(pathParts)) {
    segments = pathParts.flatMap((part) => {
      if (part == null) return [];
      const cleanPart = String(part).split("?")[0].split("#")[0].trim();
      return cleanPart.split("/").filter(Boolean);
    });
  } else {
    const cleanStr = String(pathParts).split("?")[0].split("#")[0].trim();
    segments = cleanStr.split("/").filter(Boolean);
  }

  if (segments.length === 0) {
    return CANONICAL_BASE_URL;
  }

  const cleanPath = segments
    .map((seg) => {
      try {
        // Decode first to prevent double-encoding (%20 -> %2520), then encode properly
        // Preserve RFC 3986 sub-delims like '&' in path names
        return encodeURIComponent(decodeURIComponent(seg)).replace(/%26/g, "&");
      } catch (e) {
        return encodeURIComponent(seg).replace(/%26/g, "&");
      }
    })
    .join("/");

  return `${CANONICAL_BASE_URL}/${cleanPath}`;
}
