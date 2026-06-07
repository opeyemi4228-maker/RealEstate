import { Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";

/**
 * RootLayout — Real Estate
 *
 * Brand:
 *  - Navy:  #0A1A36
 *  - Gold:  #FFC72C
 *  - Font:  Montserrat
 *
 * Environment:
 *  - Set NEXT_PUBLIC_SITE_URL to your production domain
 *  - Replace /og-image.jpg (1200x630) in /public before launch
 *  - Replace /favicon.ico, /apple-touch-icon.png, /site.webmanifest
 */

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-montserrat",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.realestate.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Real Estate — Property Listings & Agents",
    template: "%s · Real Estate",
  },

  description:
    "Real Estate — Browse property listings, find agents, and contact sellers. Search homes, apartments, and commercial properties with filters and map views.",

  applicationName: "Real Estate",
  authors: [{ name: "Real Estate" }],
  creator: "Real Estate",
  publisher: "Real Estate",
  generator: "Next.js",
  referrer: "strict-origin-when-cross-origin",

  keywords: [
    "real estate",
    "property listings",
    "homes for sale",
    "apartments for rent",
    "real estate agents",
    "property management",
    "commercial real estate",
    "house hunting",
  ],

  category: "Real Estate",

  alternates: {
    canonical: "/",
    languages: { "en-GB": "/" },
  },

  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: "Real Estate",
    title: "Real Estate — Property Listings & Agents",
    description:
      "Find your next home. Search listings, view photos, contact agents, and save favorite properties.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Real Estate — Property Listings",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Real Estate — Property Listings & Agents",
    description: "Find homes, apartments, and commercial properties near you.",
    images: ["/og-image.jpg"],
    creator: "@realestate",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#FFC72C" }],
  },

  manifest: "/site.webmanifest",

  other: {
    "format-detection": "telephone=no, address=no, email=no",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0A1A36" },
  ],
  colorScheme: "light",
};

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Real Estate",
      alternateName: "Real Estate",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
        width: 512,
        height: 512,
      },
      sameAs: [
        "https://www.linkedin.com/company/realestate",
        "https://x.com/realestate",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "info@realestate.com",
          telephone: "+234-803-000-0100",
          areaServed: ["NG"],
          availableLanguage: ["English"],
        },
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Plot 123, Adetokunbo Ademola Crescent, Wuse 2",
        addressLocality: "Abuja",
        addressRegion: "Federal Capital Territory",
        addressCountry: "NG",
      },
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#service`,
      name: "Real Estate — Property Marketplace",
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      description:
        "Online property marketplace listing residential and commercial properties, with agent contacts and lead capture.",
      areaServed: [
        { "@type": "Place", name: "Abuja" },
        { "@type": "Place", name: "Nigeria" },
      ],
      serviceType: ["Property Listings", "Agent Directory", "Lead Capture"],
      slogan: "Find your next home",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Real Estate",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-GB",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />

        <Script
          id="ld-root"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
      </head>

      <body
        suppressHydrationWarning
        className={`${montserrat.className} antialiased text-[#0A1A36] bg-white selection:bg-[#FFC72C]/30 selection:text-[#0A1A36]`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-[#FFC72C] focus:text-[#0A1A36] focus:font-bold focus:tracking-[0.14em] focus:uppercase focus:text-[11px] focus:rounded-full focus:shadow-lg focus:outline-none"
        >
          Skip to content
        </a>

        <Toaster
          position="top-center"
          gutter={12}
          toastOptions={{
            duration: 4000,
            style: {
              fontFamily:
                "var(--font-montserrat), ui-sans-serif, system-ui, sans-serif",
              fontSize: "13.5px",
              fontWeight: 500,
              padding: "14px 18px",
              borderRadius: "9999px",
              background: "#0A1A36",
              color: "#FFFFFF",
              border: "1px solid rgba(255,199,44,0.4)",
              boxShadow:
                "0 12px 40px -12px rgba(10,26,54,0.45), 0 0 0 1px rgba(255,199,44,0.15)",
              maxWidth: "420px",
            },
            success: {
              iconTheme: { primary: "#FFC72C", secondary: "#0A1A36" },
              style: {
                background: "#0A1A36",
                color: "#FFFFFF",
                border: "1px solid rgba(255,199,44,0.55)",
              },
            },
            error: {
              iconTheme: { primary: "#EF4444", secondary: "#FFFFFF" },
              style: {
                background: "#0A1A36",
                color: "#FFFFFF",
                border: "1px solid rgba(239,68,68,0.55)",
              },
            },
            loading: {
              iconTheme: { primary: "#FFC72C", secondary: "#0A1A36" },
            },
          }}
        />

        <AppContextProvider>{children}</AppContextProvider>

        {process.env.NEXT_PUBLIC_ANALYTICS_ID && (
          <Script
            id="analytics-gate"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                (function () {
                  try {
                    var consent = localStorage.getItem('gcsa.cookieConsent');
                    if (consent === 'accepted') {
                      window.dispatchEvent(new Event('load-analytics'));
                    }
                    window.addEventListener('cookie-consent-change', function (e) {
                      if (e && e.detail && e.detail.consent === 'accepted') {
                        window.dispatchEvent(new Event('load-analytics'));
                      }
                    });
                  } catch (err) { /* ignore */ }
                })();
              `,
            }}
          />
        )}
      </body>
    </html>
  );
}