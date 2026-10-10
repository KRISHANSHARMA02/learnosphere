"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { trackEvent } from "../src/lib/eventTracker";

const Footer = () => {
  const { data: session, status } = useSession();

  const handleFooterClick = (label, href) => {
    const userData =
      status === "authenticated" && session?.user
        ? { name: session.user.name || session.user.firstname || null, email: session.user.email || null }
        : { user_type: "guest" };

            const eventName = `FOOTER_${label.replace(/[^A-Za-z0-9]/g, '_').replace(/_+/g, '_').toUpperCase()}_CLICK`;

     trackEvent(eventName, {
      custom_action: "FOOTER_LINK_CLICK",
      link_label:    label,
      link_href:     href,
      section:       "footer",
      ...userData,
    });
  };

  return (
    <footer>
      <div className="bg-stone-300 flex flex-col md:flex-row justify-center items-center py-4 gap-2 flex-wrap">
        <p className="text-xs sm:text-xl md:text-xl text-slate-700 font-Poppins text-center">
          © Copyright Learn
          <b className="text-orange-600 font-Poppins">O</b>sphere.in {new Date().getFullYear()}. All Rights Reserved.
        </p>
        <div className="flex gap-4 text-center">
          <Link
            href="/privacy-policy"
            onClick={() => handleFooterClick("Privacy Policy", "/privacy-policy")}
            className="text-xs sm:text-sm md:text-base text-orange-600 hover:underline font-Poppins"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-and-conditions"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleFooterClick("Terms of Use", "/terms-and-conditions")}
            className="text-xs sm:text-sm md:text-base text-orange-600 hover:underline font-Poppins"
          >
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
