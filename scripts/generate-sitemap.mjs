#!/usr/bin/env node
/**
 * Build-time sitemap generator.
 * Reads article slugs from src/lib/imported-articles.ts (via regex) and
 * hardcoded articles from src/lib/articles.ts, then writes public/sitemap.xml.
 *
 * Usage: node scripts/generate-sitemap.mjs
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SITE_URL = "https://aithreatbrief.com";

// Static pages
const staticPaths = [
  "/",
  "/blog",
  "/matrix",
  "/pricing",
  "/about",
  "/pro",
  "/login",
];

// Extract slugs from imported-articles.ts
function extractSlugs(filePath) {
  try {
    const content = readFileSync(resolve(ROOT, filePath), "utf-8");
    const slugs = [];
    const re = /slug:\s*["']([^"']+)["']/g;
    let match;
    while ((match = re.exec(content)) !== null) {
      slugs.push(match[1]);
    }
    return slugs;
  } catch {
    return [];
  }
}

const importedSlugs = extractSlugs("src/lib/imported-articles.ts");
const hardcodedSlugs = extractSlugs("src/lib/articles.ts");
const allSlugs = [...new Set([...hardcodedSlugs, ...importedSlugs])];

const today = new Date().toISOString().split("T")[0];

const urls = [
  ...staticPaths.map(
    (p) =>
      `  <url><loc>${SITE_URL}${p}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${p === "/" ? "1.0" : "0.8"}</priority></url>`,
  ),
  ...allSlugs.map(
    (slug) =>
      `  <url><loc>${SITE_URL}/blog/${slug}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`,
  ),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

const outPath = resolve(ROOT, "public/sitemap.xml");
writeFileSync(outPath, sitemap, "utf-8");
console.log(`✅ Sitemap written to ${outPath} (${staticPaths.length + allSlugs.length} URLs)`);
