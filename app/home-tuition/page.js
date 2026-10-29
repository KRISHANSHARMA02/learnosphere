// app/home-tuition/page.js
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import CityPageClient from "./CityPageClient";

const EXCLUDED_CITIES = new Set(["janjgir - champa", "canning - ii"]);

export default async function Page() {
  const res = await fetch(
    `${WEB_BACKEND_URL}/api/route/getLocationsFromStateCity`,
    { next: { revalidate: 3600 } },
  );
  const json = await res.json();
  const rawLocations = json.data || [];
  const locations = rawLocations.filter(
    (item) => item && item.city && !EXCLUDED_CITIES.has(item.city.toLowerCase().trim()),
  );

  return <CityPageClient initialLocations={locations} />;
}
