import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const SRC_ROOT = new URL("../src/", import.meta.url);
const EXTENSIONS = [".ts", ".tsx"];

function withExtension(url) {
  if (existsSync(fileURLToPath(url))) return url;
  const match = EXTENSIONS.map((ext) => new URL(`${url.href}${ext}`)).find((candidate) => existsSync(fileURLToPath(candidate)));
  return match ?? url;
}

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    return { url: withExtension(new URL(specifier.slice(2), SRC_ROOT)).href, shortCircuit: true };
  }
  if (specifier.startsWith(".") && context.parentURL?.startsWith("file:") && !/\.[cm]?[jt]sx?$/.test(specifier)) {
    return { url: withExtension(new URL(specifier, context.parentURL)).href, shortCircuit: true };
  }
  return nextResolve(specifier, context);
}
