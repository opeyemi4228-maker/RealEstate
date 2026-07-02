import { Montserrat, Fraunces } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";

/**
 * RootLayout, Prime Homes
 *
 * Brand:
 *  - Navy:  #141210
 *  - Gold:  #E6A032
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

// Editorial display serif, pairs with Montserrat for headline contrast
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-fraunces",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.primehomes.ng";

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Prime Homes, Premium Real Estate in Nigeria",
    template: "%s · Prime Homes",
  },

  description:
    "Prime Homes is a premium real estate company redefining property acquisition, investment, and development in Nigeria, backed by transparency, due diligence, and end-to-end value delivery.",

  applicationName: "Prime Homes",
  authors: [{ name: "Prime Homes" }],
  creator: "Prime Homes",
  publisher: "Prime Homes",
  generator: "Next.js",
  referrer: "strict-origin-when-cross-origin",

  keywords: [
    "real estate Nigeria",
    "property for sale Abuja",
    "property investment Nigeria",
    "real estate development",
    "diaspora property investment",
    "land acquisition Nigeria",
    "property management Abuja",
    "Prime Homes",
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
    siteName: "Prime Homes",
    title: "Prime Homes, Premium Real Estate in Nigeria",
    description:
      "Secure, well-structured, high-value property solutions for individuals, corporates, and diaspora investors. Do it right, deliver value, build trust.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Prime Homes, Premium Real Estate in Nigeria",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Prime Homes, Premium Real Estate in Nigeria",
    description: "Premium property acquisition, investment, and development across Nigeria.",
    images: ["/og-image.jpg"],
    creator: "@primehomesng",
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
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#E6A032" }],
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
    { media: "(prefers-color-scheme: dark)", color: "#141210" },
  ],
  colorScheme: "light",
};

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Prime Homes",
      alternateName: "Prime Homes",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
        width: 512,
        height: 512,
      },
      sameAs: [
        "https://www.linkedin.com/company/primehomesng",
        "https://x.com/primehomesng",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "info@primehomes.ng",
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
      name: "Prime Homes, Premium Real Estate",
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      description:
        "End-to-end real estate solutions: property sourcing and acquisition, investment advisory, development and project supervision, legal verification, and property management.",
      areaServed: [
        { "@type": "Place", name: "Abuja" },
        { "@type": "Place", name: "Nigeria" },
      ],
      serviceType: [
        "Property Acquisition",
        "Investment Advisory",
        "Real Estate Development",
        "Legal Verification",
        "Property Management",
      ],
      slogan: "Do it right, deliver value, and build trust.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Prime Homes",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-GB",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
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
        className={`${montserrat.className} antialiased text-white bg-white selection:bg-[#E6A032]/30 selection:text-white`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-[#E6A032] focus:text-white focus:font-bold focus:tracking-[0.14em] focus:uppercase focus:text-[11px] focus:rounded-full focus:shadow-lg focus:outline-none"
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
              background: "#141210",
              color: "#FFFFFF",
              border: "1px solid rgba(230,160,50,0.4)",
              boxShadow:
                "0 12px 40px -12px rgba(0,0,0,0.45), 0 0 0 1px rgba(230,160,50,0.15)",
              maxWidth: "420px",
            },
            success: {
              iconTheme: { primary: "#E6A032", secondary: "#141210" },
              style: {
                background: "#141210",
                color: "#FFFFFF",
                border: "1px solid rgba(230,160,50,0.55)",
              },
            },
            error: {
              iconTheme: { primary: "#EF4444", secondary: "#FFFFFF" },
              style: {
                background: "#141210",
                color: "#FFFFFF",
                border: "1px solid rgba(239,68,68,0.55)",
              },
            },
            loading: {
              iconTheme: { primary: "#E6A032", secondary: "#141210" },
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