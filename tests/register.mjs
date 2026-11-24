// Test-only resolver: maps the "@/..." alias and extensionless relative
// imports onto the TypeScript sources so `node --test` runs them directly.
import { register } from "node:module";

register(new URL("./resolve-hooks.mjs", import.meta.url));
