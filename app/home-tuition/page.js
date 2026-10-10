// app/home-tuition/page.js
import CityPageClient from "./CityPageClient";

export default async function Page() {
  const res = await fetch(
    "https://learnospherebackend.learnosphere.in/api/route/getLocationsFromStateCity",
    { next: { revalidate: 3600 } },
  );
  const json = await res.json();
  const locations = json.data || [];

  return <CityPageClient initialLocations={locations} />;
}
