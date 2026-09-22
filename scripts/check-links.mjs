/* Verify every local asset/page reference in the ported app resolves. */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === '.next' || e.name === 'legacy') continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out); else out.push(p);
  }
  return out;
}

const ROUTES = new Set(['/', '/work',
  ...readdirSync('app/(case-studies)/case-studies').map((s) => `/case-studies/${s}`)]);

const sources = walk('.').filter((p) => /\.(jsx?|mjs)$/.test(p) && !p.startsWith('scripts/'));
const showcases = walk('public').filter((p) => p.endsWith('.html'));

let bad = 0, checked = 0;
for (const file of [...sources, ...showcases]) {
  const text = readFileSync(file, 'utf8');
  const refs = new Set([...text.matchAll(/(?:src|href)\s*=\s*["'](\/[^"'{}]*)["']/g)].map((m) => m[1]));
  for (const ref of refs) {
    const path = ref.split(/[?#]/)[0];
    if (path === '/' || ROUTES.has(path)) continue;
    checked++;
    const target = join('public', decodeURIComponent(path));
    if (!existsSync(target) || !statSync(target).isFile()) {
      console.log(`MISSING  ${ref}\n         referenced by ${file}`);
      bad++;
    }
  }
}

// lib/data.jsx carries destinations as bare strings rather than attributes:
// every showcaseHref must be a real file in public/, every caseHref a real route.
const data = readFileSync('lib/data.jsx', 'utf8');
for (const [, field, value] of data.matchAll(/[^a-zA-Z](showcaseHref|caseHref):\s*'([^']+)'/g)) {
  checked++;
  if (field === 'caseHref') {
    if (!ROUTES.has(value)) { console.log(`MISSING  caseHref ${value} is not a route`); bad++; }
  } else if (!existsSync(join('public', value))) {
    console.log(`MISSING  showcaseHref ${value} has no file in public/`); bad++;
  }
}

console.log(`\n${checked} local reference(s) checked, ${bad} missing.`);
process.exit(bad ? 1 : 0);
