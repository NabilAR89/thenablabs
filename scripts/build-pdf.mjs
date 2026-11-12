/* build-pdf.mjs — print /portfolio to the downloadable PDF.

   Run after `next build` (or just `npm run pdf`, which does both). It serves
   out/ on a local port, prints the page with headless Chrome, and writes the
   PDF to public/ (so it ships with the next deploy) and to out/ (so the build
   you just made already has it).

   Images: the page asks for each one as `<path>?w=<width>`; this server
   answers those with a downsized JPEG so the PDF stays small enough to attach
   to an application. Without the hint, files are served untouched.

   Chrome: set CHROME_PATH if it is not in the usual place. */
import { createServer } from 'node:http';
import { readFile, copyFile, stat } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { promisify } from 'node:util';
import sharp from 'sharp';

const ROOT = resolve(import.meta.dirname, '..');
const OUT = join(ROOT, 'out');
// Keep in step with PORTFOLIO_PDF in lib/links.js, which the site links to.
const FILE = 'Nabil-Abou-Rjeily-Portfolio.pdf';

const CHROME = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find((p) => p && existsSync(p));

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

/* The export writes /portfolio.html; the site links the extensionless path. */
async function resolveFile(pathname) {
  const base = join(OUT, decodeURIComponent(pathname));
  if (!base.startsWith(OUT)) return null;
  for (const p of [base, base + '.html', join(base, 'index.html')]) {
    try {
      if ((await stat(p)).isFile()) return p;
    } catch {}
  }
  return null;
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const file = await resolveFile(url.pathname);
  if (!file) {
    res.writeHead(404).end();
    return;
  }
  const w = Number(url.searchParams.get('w'));
  if (w && /\.(jpe?g|png|webp)$/i.test(file)) {
    /* Flatten onto the art panel colour (--panel) so transparent PNG corners
       don't turn black as JPEG. */
    const body = await sharp(file)
      .resize({ width: w * 2, withoutEnlargement: true })
      .flatten({ background: '#f4efe7' })
      .jpeg({ quality: 78, mozjpeg: true })
      .toBuffer();
    res.writeHead(200, { 'content-type': 'image/jpeg' }).end(body);
    return;
  }
  res
    .writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream' })
    .end(await readFile(file));
});

async function main() {
  if (!existsSync(join(OUT, 'portfolio.html'))) {
    throw new Error('out/portfolio.html is missing — run `next build` first.');
  }
  if (!CHROME) {
    throw new Error('Chrome not found — set CHROME_PATH to a Chrome or Chromium binary.');
  }

  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const { port } = server.address();
  const target = join(ROOT, 'public', FILE);

  try {
    await promisify(execFile)(
      CHROME,
      [
        '--headless',
        '--disable-gpu',
        '--hide-scrollbars',
        '--no-pdf-header-footer',
        '--run-all-compositor-stages-before-draw',
        // Room for the webfonts and every image to arrive before printing.
        '--virtual-time-budget=20000',
        `--print-to-pdf=${target}`,
        `http://127.0.0.1:${port}/portfolio`,
      ],
      { timeout: 120_000 },
    );
  } finally {
    server.close();
  }

  await copyFile(target, join(OUT, FILE));
  const kb = Math.round((await stat(target)).size / 1024);
  console.log(`✓ public/${FILE} (${kb} KB)`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
