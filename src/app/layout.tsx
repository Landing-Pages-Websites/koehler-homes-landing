import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { buildPageMetadata } from "@/lib/metadata";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

const SITE_ID = "00fbcebb-a640-43d6-80d6-c1570f6cc2d9";
const SITE_KEY = "sk_mnyn5cy1_mhuq3o2zbmm";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.coselloconstruction.pro"),
  // 👇 ADD THIS LINE TO FORCE SERVER-SIDE CANONICAL TAGS GLOBALLY
  alternates: {
    canonical: "./",
  },
  ...buildPageMetadata({
    title: "Cosello Construction | Window & Door Installation | NJ, PA, DE",
    description:
      "South Jersey's trusted window and door installation experts since 2003. Andersen Certified Contractor serving NJ, PA & DE. Free quotes, 2-year labor warranty. Call (856) 215-3470.",
    path: "/",
    image: "/images/social/homepage-og.webp",
    imageAlt:
      "Cosello Construction window and door installation team serving New Jersey, Pennsylvania, and Delaware",
    socialDescription:
      "South Jersey's trusted window and door installation experts since 2003. Free quotes & 2-year labor warranty.",
  }),
  keywords:
    "window installation, door installation, Cosello Construction, South Jersey, Philadelphia, Andersen certified contractor, window replacement, residential windows, commercial doors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      {/* 👇 ADD THIS HEAD BLOCK AND CHARSET TAG AS THE FIRST ITEM */}
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className="font-sans bg-white">
        {/* Google Ads */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-675660857"
          strategy="afterInteractive"
        />
        <Script id="google-ads-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-675660857');
          `}
        </Script>

        <Header />
        <main>{children}</main>
        <Footer />

        {/* Mega optimizer — siteKey config must come before the script */}
        <Script id="mega-tag-config" strategy="afterInteractive">
          {`window.MEGA_TAG_CONFIG={siteKey:"${SITE_KEY}",siteId:"${SITE_ID}"};window.API_ENDPOINT="https://optimizer.gomega.ai";window.TRACKING_API_ENDPOINT="https://events-api.gomega.ai";`}
        </Script>
        <Script
          id="gomega-optimizer"
          src="https://cdn.gomega.ai/scripts/optimizer.min.js"
          data-site-id={SITE_ID}
          strategy="afterInteractive"
        />

        {/* CTM call tracking */}
        <Script
          src="https://572388.tctm.co/t.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
