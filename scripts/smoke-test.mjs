import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const distDir = path.join(root, 'dist');
const distRoot = path.resolve(distDir);

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.gif', 'image/gif'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.jpeg', 'image/jpeg'],
  ['.jpg', 'image/jpeg'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.map', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml; charset=utf-8'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.webp', 'image/webp'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
]);

function pass(label) { console.log(`  ✔ ${label}`); }

function hasExtension(pathname) {
  return path.basename(pathname).includes('.');
}

function getContentType(filePath) {
  return contentTypes.get(path.extname(filePath).toLowerCase()) ?? 'application/octet-stream';
}

function resolveWithinDist(requestPath) {
  const relativePath = requestPath === '/' ? 'index.html' : requestPath.replace(/^\/+/, '');
  const resolvedPath = path.resolve(distRoot, relativePath);

  if (resolvedPath !== distRoot && !resolvedPath.startsWith(`${distRoot}${path.sep}`)) {
    throw new Error(`Path traversal attempt rejected: ${requestPath}`);
  }

  return resolvedPath;
}

async function resolveFilePath(requestPath) {
  const requestedPath = resolveWithinDist(requestPath);

  try {
    const requestedStats = await stat(requestedPath);
    if (requestedStats.isDirectory()) {
      const nestedIndex = path.join(requestedPath, 'index.html');
      const nestedStats = await stat(nestedIndex);
      if (nestedStats.isFile()) {
        return nestedIndex;
      }
    } else if (requestedStats.isFile()) {
      return requestedPath;
    }
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      throw error;
    }
  }

  if (!hasExtension(requestPath)) {
    return path.join(distRoot, 'index.html');
  }

  return null;
}

async function startPreviewServer() {
  const server = createServer(async (req, res) => {
    try {
      if (!req.url) {
        res.writeHead(400, { 'content-type': 'text/plain; charset=utf-8' });
        res.end('Missing request URL');
        return;
      }

      if (req.method !== 'GET' && req.method !== 'HEAD') {
        res.writeHead(405, { allow: 'GET, HEAD' });
        res.end();
        return;
      }

      const url = new URL(req.url, 'http://127.0.0.1');
      const filePath = await resolveFilePath(url.pathname);

      if (!filePath) {
        res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
        res.end('Not found');
        return;
      }

      const body = await readFile(filePath);
      res.writeHead(200, {
        'content-length': String(body.length),
        'content-type': getContentType(filePath),
      });

      if (req.method === 'HEAD') {
        res.end();
        return;
      }

      res.end(body);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
      res.end(message);
    }
  });

  await new Promise((resolve, reject) => {
    server.listen(0, '127.0.0.1', () => resolve());
    server.on('error', reject);
  });

  const address = server.address();
  assert(address && typeof address !== 'string', 'Preview server must bind to a numeric port');

  return {
    port: address.port,
    close: () => new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    }),
  };
}

async function checkDistOutput() {
  const indexHtml = await readFile(path.join(distDir, 'index.html'), 'utf8');
  assert(indexHtml.includes('id="root"'), 'dist/index.html must contain id="root" mount point');
  pass('dist/index.html contains #root mount point');

  const assets = await readdir(path.join(distDir, 'assets'));
  assert(assets.some(f => f.endsWith('.js')), 'dist/assets/ must contain JS bundles');
  assert(assets.some(f => f.endsWith('.css')), 'dist/assets/ must contain CSS bundles');
  pass(`dist/assets/ has ${assets.length} files (JS + CSS present)`);
}

async function checkPreviewServer() {
  const previewServer = await startPreviewServer();

  try {
    for (const route of ['/', '/login', '/blog']) {
      const res = await fetch(`http://127.0.0.1:${previewServer.port}${route}`);
      assert.equal(res.status, 200, `GET ${route} must return 200`);
      if (route === '/') {
        const html = await res.text();
        assert(html.includes('id="root"'), 'Homepage must contain #root');
      }
      pass(`GET ${route} → 200`);
    }
  } finally {
    await previewServer.close();
  }
}

console.log('\nSmoke tests (Vite SPA)\n');

console.log('1. Build output:');
await checkDistOutput();

console.log('\n2. Preview server:');
await checkPreviewServer();

console.log('\n✔ All smoke tests passed.\n');
