import type { Metadata } from "next";
import { Poppins, Rubik } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { buildPageMetadata } from "@/lib/metadata";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-rubik",
  display: "swap",
});

const MEGA_SITE_ID = "18608ed3-80d5-434e-9b06-0255f9eba3fc";
const MEGA_SITE_KEY = "x22yu9m8j8g0cx1r";
const GTM_ID = "GTM-P6GZN8F2";

export const metadata: Metadata = buildPageMetadata({
  title:
    "Replacement Windows, Doors & Siding | Jacksonville, FL | Koehler Home Improvement",
  description:
    "Family-owned Jacksonville home improvement since 2003. 50% off installation + a free in-home estimate on energy-efficient, hurricane-rated windows, doors & siding. Financing as low as $5/day.",
  path: "/",
  image: "/images/koehler/project-a22.webp",
  imageAlt:
    "Florida home with replacement windows and a glass patio door installed by Koehler Home Improvement in Jacksonville",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${rubik.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="mega-site-id" content={MEGA_SITE_ID} />
        {/* Google Tag Manager */}
        <Script id="gtm-base" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        {/* MegaTag optimizer — config must run before the optimizer script */}
        <Script id="mega-tag-config" strategy="afterInteractive">
          {`window.MEGA_TAG_CONFIG={siteKey:"${MEGA_SITE_KEY}",siteId:"${MEGA_SITE_ID}"};window.API_ENDPOINT="https://optimizer.gomega.ai";window.TRACKING_API_ENDPOINT="https://events-api.gomega.ai";`}
        </Script>
        <Script
          id="gomega-optimizer"
          src="https://cdn.gomega.ai/scripts/optimizer.min.js"
          data-site-id={MEGA_SITE_ID}
          strategy="afterInteractive"
        />
      </head>
      <body className="font-sans bg-white antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>

        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingCTA />

        {/* CallTrackingMetrics — shared MEGA universal CTM script */}
        <Script src="https://572388.tctm.co/t.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
