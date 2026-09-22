/* Confirm every extracted stylesheet is byte-identical to the <style> blocks
   of the page it came from (bar the deliberate absolute-path selector fix). */
import { readFileSync } from 'node:fs';

const blocks = (f) => [...readFileSync(f, 'utf8')
  .matchAll(/<style(?:\s[^>]*)?>([\s\S]*?)<\/style>/g)]
  .map((m) => m[1].trim()).filter(Boolean).join('\n\n');

const strip = (s) => s.replace(/^\/\*[^\n]*\*\/\n\n/, '').trim();

// Deliberate edits applied after extraction.
const EXPECTED = [
  ['img[src^="base360/"]', 'img[src^="/base360/"]'],
  ['img[src="base360/landing-full.png"]', 'img[src="/base360/landing-full.png"]'],
];

const PAIRS = [
  ['legacy/TheNabLab Pro v5 Charcoal.html', 'app/(home)/home.css'],
  ['legacy/All Work.html', 'app/(work)/work.css'],
  ...['Al Hilal:al-hilal', 'Barley:barley', 'FootyCash:footycash', 'Moodz:moodz',
      'Related:related', 'SmartWealth:smartwealth', 'Wimsa:wimsa']
    .map((p) => { const [name, slug] = p.split(':');
      return [`legacy/${name} Case Study.html`, `app/(case-studies)/case-studies/${slug}/${slug}.css`]; }),
];

let fail = 0;
for (const [src, out] of PAIRS) {
  let want = blocks(src);
  for (const [from, to] of EXPECTED) want = want.split(from).join(to);
  const got = strip(readFileSync(out, 'utf8'));
  if (want === got) {
    console.log(`ok    ${out}  (${got.length} chars)`);
  } else {
    fail++;
    let i = 0; while (i < want.length && want[i] === got[i]) i++;
    console.log(`FAIL  ${out}\n      diverges at char ${i}\n      want …${want.slice(Math.max(0, i - 50), i + 60)}…\n      got  …${got.slice(Math.max(0, i - 50), i + 60)}…`);
  }
}
console.log(fail ? `\n${fail} stylesheet(s) differ.` : '\nAll 9 stylesheets match their source pages exactly.');
process.exit(fail ? 1 : 0);
