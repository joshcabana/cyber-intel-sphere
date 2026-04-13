import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const manifestPath = path.join(root, 'content-manifest.json');

const REQUIRED_ARTICLE_FIELDS = ['slug', 'title', 'date', 'category', 'section'];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function validateManifest() {
  const raw = await fs.readFile(manifestPath, 'utf8');
  const manifest = JSON.parse(raw);

  assert(typeof manifest.articleCount === 'number', 'articleCount must be a number');
  assert(Array.isArray(manifest.articles), 'articles must be an array');
  assert(manifest.articleCount === manifest.articles.length,
    `articleCount (${manifest.articleCount}) does not match articles.length (${manifest.articles.length})`);
  assert(Array.isArray(manifest.categories), 'categories must be an array');
  assert(Array.isArray(manifest.sections), 'sections must be an array');

  const slugs = new Set();
  for (const article of manifest.articles) {
    for (const field of REQUIRED_ARTICLE_FIELDS) {
      assert(
        typeof article[field] === 'string' && article[field].trim().length > 0,
        `Article "${article.slug || '?'}" missing required field "${field}".`,
      );
    }
    assert(!slugs.has(article.slug), `Duplicate slug "${article.slug}".`);
    slugs.add(article.slug);
  }

  console.log(`Content manifest is valid (${manifest.articleCount} articles, ${manifest.categories.length} categories).`);
}

async function main() {
  const mode = process.argv[2];

  if (mode === '--check') {
    await validateManifest();
    return;
  }

  if (mode === '--write') {
    // In the SPA architecture, the manifest is maintained manually or via automation.
    // --write is a no-op that validates and confirms the file exists.
    await validateManifest();
    console.log('Manifest file is up to date.');
    return;
  }

  throw new Error('Usage: node scripts/content-manifest.mjs --write|--check');
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
