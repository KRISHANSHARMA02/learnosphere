
import { webBackendFetch } from "../../helper/webbackend_api";


export async function getSamplePapers(slug) {
  if (!slug) return [];
  try {
    const data = await webBackendFetch(`/api/route/SamplePapers/${slug}`, {
      method: "GET", // Use POST if you want to hide params in body
    });

    // Adjust according to your backend response structure
    return data?.data || [];
  } catch (err) {
    console.error("Error fetching sample papers:", err);
    return [];
  }
}

export async function getSamplePapersSlug() {
  try {
    const data = await webBackendFetch(`/api/route/getAllSlugsForSamplePapers`, {
      method: "GET",
    });
 
    return data?.slugs || [];
  } catch (err) {
    console.error("Error fetching sample papers slugs:", err);
    return [];
  }
}


// get sample papers pdf 
export async function getSamplePapersPDF(slug) {
    if (!slug) return [];
    try {
        let data = await webBackendFetch(`/api/route/samplepaperspdf/${slug}`, {
            method: "GET",
        });

        const firstItem = data?.data?.[0];
        if (!firstItem || (!firstItem.heading1 && (!firstItem.tableData || firstItem.tableData.length === 0))) {
            let altSlug = slug
                .replace(/Sample-Papers-Sa(\d+)/i, 'Sa$1-Sample-Papers')
                .replace(/Sample-Paper-Sa(\d+)/i, 'Sa-$1-Sample-Paper');
            if (altSlug === slug) {
                altSlug = slug
                    .replace(/Sa(\d+)-Sample-Papers/i, 'Sample-Papers-Sa$1')
                    .replace(/Sa-(\d+)-Sample-Paper/i, 'Sample-Paper-Sa$1');
            }
            if (altSlug !== slug) {
                const altData = await webBackendFetch(`/api/route/samplepaperspdf/${altSlug}`, {
                    method: "GET",
                });
                if (altData?.data && altData.data.length > 0) {
                    return altData.data;
                }
            }
        }

        return data?.data || [];
    } catch (err) {
        console.error("Error fetching sample papers PDF:", err);
        return [];
    }
}

// get slug for sample papers pdf 
export async function getSamplePapersPDFSlug() {
  try {
    const data = await webBackendFetch(`/api/route/getSlugdataForSamplePapersPdf`, {
      method: "GET",
    });
   
    return data?.data || [];
  } catch (err) {
    console.error("Error fetching sample papers PDF slugs:", err);
    return [];
  }
}

// get ICSE sample papers 
export async function getIcseSamplePapers(slug) {
    if (!slug) return [];
    try {
        const data = await webBackendFetch(`/api/route/IcseSamplePapers/${slug}`, {
            method: "GET",
        });

        return data?.data || [];
    } catch (err) {
        console.error("Error fetching ICSE sample papers:", err);
        return [];
    }
}


// get ICSE sample papers slug
export async function getIcseSamplePapersSlug() {
    try {
        const data = await webBackendFetch(`/api/route/getSlugdataForIcseSamplePapers`, {
            method: "GET",
        });

        return data?.data || [];
    } catch (err) {
        console.error("Error fetching ICSE sample papers slugs:", err);
        return [];
    }
}


// topic function for get important topic from backend 

export async function getImportantTopics(slug) {
  if (!slug) return null;

  try {
    const data = await webBackendFetch(
      `/api/route/getImportantTopics?slug=${slug}`,
      {
        method: "GET",
      }
    );

    // CASE 1: Backend returned success: false (404 or similar)
    if (data.success === false) {
      return null;
    }

    // CASE 2: Valid data returned
    return data?.data || null;
  } catch (err) {
    console.error("Error fetching Important Topics:", err);
    return null; // API or network error
  }
}

// get  CBSE Previous Year Questions Slug

export async function getCbsePreviousSlug(slug) {
  try {
    const data = await webBackendFetch(`/api/route/CbsePreviousyearQuestions/${slug}`,
      {
        method: "GET",
      }
    );
    return data?.data || [];

  } catch (err) {
    console.error("Error fetching Cbse previous year papers slugs:", err);
    return [];
  }
}

// get  CBSE Previous Year Questions Slug

export async function getCbsePrevQuePpr(slug) {
  try {
    const data = await webBackendFetch(`/api/route/cbsepreviouspaperspdf/${slug}`,
      {
        method: "GET",
      }
    );
    return data?.data || [];

  } catch (err) {
    console.error("Error fetching Cbse sample papers slugs:", err);
    return [];
  }
}