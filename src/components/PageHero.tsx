import Image from "next/image";
import { LucideIcon } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { getBreadcrumbs } from "@/lib/breadcrumbs";

interface TrustBadge {
  icon: LucideIcon;
  text: string;
}

interface Props {
  title: string;
  highlight?: string;
  description: string;
  image?: string;
  imageAlt?: string;
  size?: "default" | "sm";
  trustBadges?: TrustBadge[];
  trustBadgesLayout?: "grid" | "flex";
  breadcrumbPath?: string;
}

const heightMap = {
  default: "min-h-[400px] md:min-h-[430px]",
  sm: "min-h-[300px] md:min-h-[300px]",
};

const trustBadgesLayoutMap = {
  grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-3",
  flex: "flex flex-wrap justify-start sm:justify-center gap-x-6 gap-y-3",
};

export default function PageHero({
  title,
  highlight,
  description,
  image,
  imageAlt,
  size = "default",
  trustBadges,
  trustBadgesLayout = "grid",
  breadcrumbPath,
}: Props) {
  const breadcrumbItems = breadcrumbPath ? getBreadcrumbs(breadcrumbPath, title) : undefined;

  return (
    <>
      {breadcrumbItems && <BreadcrumbSchema items={breadcrumbItems} />}
      {breadcrumbItems && <Breadcrumbs items={breadcrumbItems} />}
      <section className={`relative ${heightMap[size]} flex items-center ${!image ? "bg-navy-950" : ""}`}>
        {image && (
          <div className="absolute inset-0">
            <Image
              src={image}
              alt={imageAlt ?? ""}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/80 to-navy-950/60" />
          </div>
        )}
        <div className="relative container-max py-15 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in text-center">
              {title}{" "}
              {highlight && <span className="text-orange-500">{highlight}</span>}
            </h1>
            <p className="text-lg text-white/80 leading-relaxed animate-fade-in text-center" style={{ animationDelay: "100ms" }}>
              {description}
            </p>

            {trustBadges && trustBadges.length > 0 && (
              <div
                className={`${trustBadgesLayoutMap[trustBadgesLayout]} mt-16 animate-fade-in`}
                style={{ animationDelay: "200ms" }}
              >
                {trustBadges.map((badge) => (
                  <div key={badge.text} className="flex items-center gap-2 text-white">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-orange-500/20 border border-orange-500/30 rounded-xl">
                      <badge.icon className="w-5 h-5 text-orange-400" strokeWidth={1.75} />
                    </div>
                    <span className="text-sm font-semibold leading-tight">{badge.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
