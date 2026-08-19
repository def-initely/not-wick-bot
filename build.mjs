import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";
import esbuildPluginPino from "esbuild-plugin-pino";
import { rm } from "node:fs/promises";

globalThis.require = createRequire(import.meta.url);

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(root, "dist");

await rm(dist, { recursive: true, force: true });

await build({
  entryPoints: [path.resolve(root, "src/not-wick-entry.ts")],
  platform: "node",
  bundle: true,
  format: "esm",
  outdir: dist,
  sourcemap: "linked",
  logLevel: "info",
  external: [
    "discord.js",
    "*.node",
    "sharp",
    "better-sqlite3",
    "sqlite3",
    "canvas",
    "bcrypt",
    "argon2",
    "fsevents"
  ],
  plugins: [
    esbuildPluginPino({
      transports: ["pino-pretty"]
    })
  ],
  banner: {
    js: `import { createRequire as __bannerCrReq } from "node:module";
import __bannerPath from "node:path";
import __bannerUrl from "node:url";

globalThis.require = __bannerCrReq(import.meta.url);
globalThis.__filename = __bannerUrl.fileURLToPath(import.meta.url);
globalThis.__dirname = __bannerPath.dirname(globalThis.__filename);`
  }
});
