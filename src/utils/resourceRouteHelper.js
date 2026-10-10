/**
 * Maps a list3 title string to the correct URL.
 * Known titles map to existing pages; everything else goes to /cbse-resources/[slug].
 */

const KNOWN_ROUTES = {
  "cbse": "/CBSE",
  "cbse class 10": "/CBSE/Class-10-Math",
  "cbse class 12": "/CBSE/Class-12-Math",
  "class 5": "/CBSE/Class-5",
  "cbse syllabus for class 3": "/CBSE_Syllabus",
  "cbse syllabus for class 4": "/CBSE_Syllabus",
  "cbse syllabus for class 9": "/CBSE_Syllabus",
  "cbse syllabus for class 10": "/CBSE-10thsyllabus",
  "cbse syllabus for class 11 physics": "/CBSE-11thsyllabus",
  "cbse syllabus for class 12": "/CBSE-12thsyllabus",
  "notes for class 10": "/Cbse-Notes",
  "ncert books": "/Cbse-Notes",
  "ncert solutions": "/Cbse-Notes",
  "sample paper": "/CBSE-Sample-Papers",
  "sample papers for class 8": "/CBSE-Sample-Papers",
  "sample papers for class 10": "/CBSE-Sample-Papers",
  "cbse sample paper for class 12": "/Class-12-Sample-ppr-CBSE",
  "previous year question paper of cbse class 12": "/Cbse-Previosyear-Questions/CBSE-Previous-Year-Question-Paper-for-Class-12-Maths-with-Solutions",
  "cbse previous year question papers class 10 science": "/Cbse-Previosyear-Questions/CBSE-Class-10-Maths-Previous-Year-Papers-with-Solutions",
  "online tuition": "/live-one-to-one",
};

export function getResourceRoute(title) {
  if (!title || typeof title !== "string") return "#";

  const trimmed = title.trim();
  const lower = trimmed.toLowerCase();

  // Check known routes first
  if (KNOWN_ROUTES[lower]) {
    return KNOWN_ROUTES[lower];
  }

  // Generate slug for the cbse-resources route
  const slug = trimmed
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  return `/cbse-resources/${slug}`;
}
