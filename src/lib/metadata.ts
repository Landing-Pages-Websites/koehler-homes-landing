import type { Metadata } from "next";

export const siteUrl = "https://book.koehlerhomesinc.com";
export const siteName = "Koehler Home Improvement";

export type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  socialTitle?: string;
  socialDescription?: string;
  type?: "website" | "article";
};

export function buildPageMetadata({
  title,
  description,
  path,
  image = "/images/koehler/project-a22.webp",
  imageAlt = "Koehler Home Improvement replacement windows, doors and siding on a Jacksonville, Florida home",
  socialTitle,
  socialDescription,
  type = "website",
}: PageMetadataInput): Metadata {
  const url = path === "/" ? siteUrl : `${siteUrl}${path}`;
  const openGraphTitle = socialTitle ?? title;
  const openGraphDescription = socialDescription ?? description;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: openGraphTitle,
      description: openGraphDescription,
      url,
      siteName,
      locale: "en_US",
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: openGraphTitle,
      description: openGraphDescription,
      images: [
        {
          url: image,
          alt: imageAlt,
        },
      ],
    },
  };
}
