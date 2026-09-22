/* links.js — where a project card points, and what it should say.
   A project links to its case-study page when one exists; that page then
   links on to the live showcase. Projects without a case study link straight
   to the showcase. Every linked card carries the same label so the grid reads
   as one consistent set of buttons. */
const LABEL = 'View case study & showcase';

export function cardLink(c) {
  if (!c.link) return { href: null, label: 'Case study coming soon' };
  // One shared label keeps the grid reading as a consistent set of buttons,
  // but a project with no live showcase must not advertise one.
  if (c.caseHref) {
    return { href: c.caseHref, label: c.showcaseHref ? LABEL : 'View case study' };
  }
  return { href: c.showcaseHref, label: LABEL };
}
