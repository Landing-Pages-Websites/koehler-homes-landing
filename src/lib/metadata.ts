import type { Metadata } from "next";

export const siteUrl = "https://www.coselloconstruction.pro";
export const siteName = "Cosello Construction Inc";

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
  image = "/images/social/default-og.webp",
  imageAlt = "Cosello Construction window and door installation services in New Jersey, Pennsylvania, and Delaware",
  socialTitle,
  socialDescription,
  type = "website",
}: PageMetadataInput): Metadata {
  const url = path === "/" ? siteUrl : `${siteUrl}${path}`;
  const openGraphTitle = socialTitle ?? title;
  const openGraphDescription = socialDescription ?? description;

  return {
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
