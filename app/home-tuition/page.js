// app/home-tuition/page.js
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import CityPageClient from "./CityPageClient";

export default async function Page() {
  const res = await fetch(
    `${WEB_BACKEND_URL}/api/route/getLocationsFromStateCity`,
    { next: { revalidate: 3600 } },
  );
  const json = await res.json();
  const locations = json.data || [];

  return <CityPageClient initialLocations={locations} />;
}
