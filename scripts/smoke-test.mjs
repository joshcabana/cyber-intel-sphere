import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { readFile, readdir } from 'node:fs/promises';
import net from 'node:net';
import path from 'node:path';

const root = process.cwd();
const distDir = path.join(root, 'dist');
const viteBinary = path.join(
  root,
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'vite.cmd' : 'vite',
);

function findFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.listen(0, '127.0.0.1', () => {
      const addr = server.address();
      if (!addr || typeof addr === 'string') { reject(new Error('No port')); return; }
      server.close(() => resolve(addr.port));
    });
    server.on('error', reject);
  });
}

function pass(label) { console.log(`  ✔ ${label}`); }

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
  const port = await findFreePort();
  const child = spawn(viteBinary, ['preview', '--port', String(port), '--strictPort'], {
    cwd: root,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  // Wait for server ready
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error(`Preview server did not start in 15s.\n${capturedOutput}`));
    }, 15_000);
    let capturedOutput = '';
    let settled = false;

    const appendOutput = (chunk) => {
      capturedOutput += chunk.toString();

      if (!settled && capturedOutput.includes('Local:')) {
        settled = true;
        clearTimeout(timeout);
        resolve();
      }
    };

    child.stdout.on('data', appendOutput);
    child.stderr.on('data', appendOutput);
    child.on('error', (err) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      reject(err);
    });
    child.on('exit', (code) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      reject(new Error(`Preview server exited with code ${code}.\n${capturedOutput}`));
    });
  });

  try {
    for (const route of ['/', '/login', '/blog']) {
      const res = await fetch(`http://127.0.0.1:${port}${route}`);
      assert.equal(res.status, 200, `GET ${route} must return 200`);
      if (route === '/') {
        const html = await res.text();
        assert(html.includes('id="root"'), 'Homepage must contain #root');
      }
      pass(`GET ${route} → 200`);
    }
  } finally {
    child.kill('SIGTERM');
  }
}

console.log('\nSmoke tests (Vite SPA)\n');

console.log('1. Build output:');
await checkDistOutput();

console.log('\n2. Preview server:');
await checkPreviewServer();

console.log('\n✔ All smoke tests passed.\n');
