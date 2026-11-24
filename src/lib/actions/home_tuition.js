import { webBackendFetch } from "../../helper/webbackend_api.js";

const EXCLUDED_CITIES = new Set([
  "home-tuition-in-janjgir - champa",
  "home-tuition-in-janjgir-champa",
  "home-tuition-in-canning - ii",
  "home-tuition-in-canning-ii",
  "janjgir - champa",
  "janjgir-champa",
  "janjgir champa",
  "canning - ii",
  "canning-ii",
  "canning ii",
]);

/**
 * Fetches unique, valid Home Tuition slugs dynamically from the backend locations API.
 * Follows the canonical route format used by the Home Tuition module:
 *   /home-tuition/home-tuition-in-<city>
 *
 * @returns {Promise<string[]>} Array of unique, valid Home Tuition slugs
 */
export async function getHomeTuitionSlugs() {
  try {
    const data = await webBackendFetch(`/api/route/getLocationsFromStateCity`, {
      method: "GET",
    });

    const rawLocations = data?.data || [];
    if (!Array.isArray(rawLocations)) {
      return [];
    }

    const seenCities = new Set();
    const slugs = [];

    for (const item of rawLocations) {
      if (!item || !item.city || typeof item.city !== "string") {
        continue;
      }

      const cleanCity = item.city.trim();
      if (!cleanCity) {
        continue;
      }

      const cityKey = cleanCity.toLowerCase();
      if (
        EXCLUDED_CITIES.has(cityKey) ||
        EXCLUDED_CITIES.has(`home-tuition-in-${cityKey}`)
      ) {
        continue;
      }

      if (seenCities.has(cityKey)) {
        continue;
      }

      seenCities.add(cityKey);
      slugs.push(`home-tuition-in-${cleanCity}`);
    }

    return slugs;
  } catch (err) {
    console.error("Error fetching home tuition slugs:", err);
    return [];
  }
}
