/* Compare each ported case-study route's rendered body against the original
   static HTML: tag histogram, class histogram, image srcs and visible text. */
import { readFileSync } from 'node:fs';

const PAGES = [
  ['Al Hilal Case Study.html', 'al-hilal'], ['Barley Case Study.html', 'barley'],
  ['FootyCash Case Study.html', 'goalpot'], ['Moodz Case Study.html', 'moods'],
  ['Related Case Study.html', 'related'], ['SmartWealth Case Study.html', 'smartwealth'],
  ['Wimsa Case Study.html', 'wimsa'],
];

const body = (h) => {
  const m = h.match(/<body[^>]*>([\s\S]*)<\/body>/);
  return (m ? m[1] : h)
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<template[\s\S]*?<\/template>/g, '')       // Next dev-overlay markup
    .replace(/<next-route-announcer[\s\S]*?<\/next-route-announcer>/g, '')
    .replace(/<div hidden=""><!--\$--><!--\/\$--><\/div>/g, '') // React's inert client-boundary marker
    .replace(/<!--[\s\S]*?-->/g, '');
};

const hist = (s, rx, pick = (m) => m[1]) => {
  const counts = {};
  for (const m of s.matchAll(rx)) for (const v of [pick(m)].flat()) counts[v] = (counts[v] || 0) + 1;
  return counts;
};
const tags = (s) => hist(s, /<([a-zA-Z][a-zA-Z0-9]*)/g, (m) => m[1].toLowerCase());
const classes = (s) => hist(s, /class="([^"]*)"/g, (m) => m[1].trim().split(/\s+/));
const imgs = (s) => [...s.matchAll(/<img[^>]*src="([^"]*)"/g)].map((m) => m[1].replace(/^\//, '')).sort();
const text = (s) => s.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&').replace(/&#x27;|&apos;/g, "'").replace(/&quot;/g, '"')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();

const diffHist = (a, b) => {
  const keys = [...new Set([...Object.keys(a), ...Object.keys(b)])].sort();
  return keys.filter((k) => (a[k] || 0) !== (b[k] || 0)).map((k) => `${k}: original=${a[k] || 0} next=${b[k] || 0}`);
};

let fail = 0;
for (const [file, slug] of PAGES) {
  const orig = body(readFileSync(`legacy/${file}`, 'utf8'));
  const next = body(await (await fetch(`http://localhost:3000/case-studies/${slug}`)).text());

  const problems = [];
  const t = diffHist(tags(orig), tags(next));
  const c = diffHist(classes(orig), classes(next));
  if (t.length) problems.push(`  tags:    ${t.join(' | ')}`);
  if (c.length) problems.push(`  classes: ${c.join(' | ')}`);

  const [oi, ni] = [imgs(orig), imgs(next)];
  if (oi.join() !== ni.join()) problems.push(`  images:  original=${oi.join(',')}\n           next=${ni.join(',')}`);

  const [ot, nt] = [text(orig), text(next)];
  if (ot !== nt) {
    let i = 0; while (i < ot.length && ot[i] === nt[i]) i++;
    problems.push(`  text diverges at char ${i}:\n           original …${ot.slice(Math.max(0, i - 40), i + 60)}…\n           next     …${nt.slice(Math.max(0, i - 40), i + 60)}…`);
  }

  if (problems.length) { fail++; console.log(`FAIL  ${slug}\n${problems.join('\n')}`); }
  else console.log(`ok    ${slug}  (${Object.keys(classes(orig)).length} classes, ${oi.length} images, ${ot.length} chars of text — identical)`);
}
console.log(fail ? `\n${fail} page(s) differ.` : '\nAll 7 case-study pages render identically to the originals.');
process.exit(fail ? 1 : 0);
