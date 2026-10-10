"use client";

import { useEffect, useRef } from "react";
import { trackEvent, EVENT_NAMES, setGlobalSession } from "../src/lib/eventTracker";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function EventTrackerSetup() {
    const pathname = usePathname();
    const hasTrackedVisit = useRef(false);
    const { data: session } = useSession();

    useEffect(() => {
        setGlobalSession(session);
    }, [session]);

    useEffect(() => {
        // Track initial website visit only once per session
        if (!hasTrackedVisit.current) {
            trackEvent(EVENT_NAMES.WEBSITE_VISIT, { initial_path: pathname });
            hasTrackedVisit.current = true;
        }
    }, [pathname]);

    // Global click listener for all buttons and links
    useEffect(() => {
        const handleGlobalClick = (e) => {
            const target = e.target.closest("button, a, [role='button']");
            if (!target) return;

            // Don't duplicate dashboard clicks if they are already handled locally
            // but we can track everything universally here.
            const actionText = target.innerText?.trim() || target.getAttribute('aria-label') || target.title || target.id || target.tagName;
            
            const eventData = {
                action: `Click: ${actionText}`,
                tag: target.tagName,
                url: window.location.href,
                path: window.location.pathname
            };

            if (session?.user?.email) {
                eventData.email = session.user.email;
                eventData.name = session.user.name || "";
            } else {
                eventData.email = "guest";
            }

            trackEvent(`USER_INTERACTION`, eventData);
        };

        document.addEventListener("click", handleGlobalClick);
        return () => document.removeEventListener("click", handleGlobalClick);
    }, [session]);

    return null; // This component does not render anything
}