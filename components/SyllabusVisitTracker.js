"use client";
import { useEffect } from "react";
import { trackEvent, EVENT_NAMES } from "../src/lib/eventTracker";

/**
 * A small invisible client component that fires a SYLLABUS_PAGE_VISIT
 * tracking event when rendered. Intended to be dropped into server-side
 * page components so we can track syllabus visits without converting
 * entire pages to "use client".
 */
export default function SyllabusVisitTracker({ page, classNum }) {
    useEffect(() => {
        trackEvent(EVENT_NAMES.SYLLABUS_PAGE_VISIT, { page, class: classNum });
    }, []);

    return null;
}
