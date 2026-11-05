import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import SessionWrapper from "@/components/SessionWrapper";
import { FormProvider } from '../src/context/FormContext';
import { UserProvider } from "@/src/context/userContext";
import "react-toastify/dist/ReactToastify.css";
import EventTrackerSetup from "@/components/EventTrackerSetup";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://learnosphere.in"),

  // Optional: safe global fallback
  title: {
    default: "Book an Educator | Learnosphere | Home Tuition",
    template: "%s | Learnosphere",
  },

  // =========================================================================
  // NOTE FOR DEVELOPERS (STAGING ENVIRONMENT):
  // Disabling search engine indexing on staging to prevent ranking on Google.
  // Re-enable (index: true, follow: true) when deploying to Production.
  // =========================================================================
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },

  /*
  // Google Site Verification (commented out for staging)
  verification: {
    google: "GSb4fO30K6S_TqJH1xMI5M7Xt9IZ9BYBw8XLNmvwz0c",
  },
  */
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/*
          ======================================================================
          NOTE FOR DEVELOPERS (STAGING ENVIRONMENT):
          The following SEO, Google Analytics, Google Tag Manager, and Schema.org
          scripts have been temporarily commented out so this staging environment
          does NOT track production analytics or get indexed/ranked by Google.

          Re-enable these scripts ONLY when merging/deploying to Production.
          ======================================================================

          -- Google Analytics --
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-74L2CVZTT6"
            strategy="afterInteractive"
          />
          <Script id="google-tag" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-74L2CVZTT6');
            `}
          </Script>

          -- Google Tag Manager --
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PPW4F2QN');
            `}
          </Script>

          -- Schema.org JSON-LD --
          <Script id="json-ld" type="application/ld+json" strategy="afterInteractive">
            {`
            {
              "@context": "https://schema.org/",
              "@type": "WebSite",
              "name": "learnosphere",
              "url": "https://learnosphere.in/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://learnosphere.in/{search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
            `}
          </Script>
        */}

        {/* Prevent search engines from indexing the staging domain */}
        <meta name="robots" content="noindex, nofollow" />
      </head>

      <body className={inter.className}>
        {/*
          -- Google Tag Manager (noscript) - Commented out for staging --
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-PPW4F2QN"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
        */}
        <SessionWrapper>
       <EventTrackerSetup />
          <UserProvider>
          <FormProvider>
            {/* <Navbar /> */}
            {children}
            {/* <Footer1 /> */}
            {/* <Footer /> */}
          </FormProvider>
        </UserProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
