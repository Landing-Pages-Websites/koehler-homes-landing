import fs from "fs";
import path from "path";
import { getAllPosts } from "@/lib/blog";

export const SITE_URL = "https://www.coselloconstruction.pro";

const appDirectory = path.join(process.cwd(), "src/app");
const EXCLUDED_ROUTE_SEGMENTS = new Set(["api"]);
const EXCLUDED_ROUTES = new Set([
  "/thank-you",
  "/privacy-policy",
]);
const DYNAMIC_SEGMENT_PATTERN = /^\[.*\]$/;

export interface SitemapRoute {
  url: string;
  lastModified: Date;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
}

function routeFromPageFile(filePath: string): string | null {
  const relativeDirectory = path.relative(appDirectory, path.dirname(filePath));
  const segments = relativeDirectory === "" ? [] : relativeDirectory.split(path.sep);

  if (
    segments.some(
      (segment) =>
        EXCLUDED_ROUTE_SEGMENTS.has(segment) ||
        segment.startsWith("_") ||
        segment.startsWith("(") ||
        DYNAMIC_SEGMENT_PATTERN.test(segment)
    )
  ) {
    return null;
  }

  const route = `/${segments.join("/")}`.replace(/\/$/, "") || "/";

  if (EXCLUDED_ROUTES.has(route)) return null;

  return route;
}

function getPageFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) return getPageFiles(entryPath);
    if (entry.isFile() && entry.name === "page.tsx") return [entryPath];

    return [];
  });
}

function getRoutePriority(route: string): number {
  if (route === "/") return 1;
  if (
    [
      "/window-replacement",
      "/residential-doors",
      "/commercial-doors",
      "/commercial-projects",
      "/commercial-security-doors",
      "/commercial-window-replacement",
      "/storefront-doors-and-windows",
      "/contact",
    ].includes(route)
  ) return 0.9;
  if (route.includes("windows-doors") || route.includes("installation")) return 0.85;
  if (route.startsWith("/blog/")) return 0.7;
  if (route === "/blog") return 0.75;
  return 0.8;
}

function getChangeFrequency(route: string): SitemapRoute["changeFrequency"] {
  if (route === "/" || route === "/blog") return "weekly";
  if (route.startsWith("/blog/")) return "monthly";
  return "monthly";
}

function absoluteUrl(route: string): string {
  return route === "/" ? SITE_URL : `${SITE_URL}${route}`;
}

export function getStaticSitemapRoutes(): SitemapRoute[] {
  const routesByUrl = new Map<string, SitemapRoute>();

  for (const pageFile of getPageFiles(appDirectory)) {
    const route = routeFromPageFile(pageFile);
    if (!route) continue;

    routesByUrl.set(route, {
      url: absoluteUrl(route),
      lastModified: fs.statSync(pageFile).mtime,
      changeFrequency: getChangeFrequency(route),
      priority: getRoutePriority(route),
    });
  }

  return [...routesByUrl.values()].sort((a, b) => a.url.localeCompare(b.url));
}

export function getBlogSitemapRoutes(): SitemapRoute[] {
  return getAllPosts().map((post) => {
    const route = `/blog/${post.slug}`;
    return {
      url: absoluteUrl(route),
      lastModified: new Date(post.date),
      changeFrequency: getChangeFrequency(route),
      priority: getRoutePriority(route),
    };
  });
}

export function getSitemapRoutes(): SitemapRoute[] {
  const routes = [...getStaticSitemapRoutes(), ...getBlogSitemapRoutes()];
  const deduped = new Map(routes.map((route) => [route.url, route]));

  return [...deduped.values()].sort((a, b) => a.url.localeCompare(b.url));
}
