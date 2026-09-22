/* brand.js — derive the brand folder name for a case study, used to key
   per-brand artwork styling (`[data-brand="…"]`). Asset paths are
   root-absolute now, so the first path segment sits after the leading slash. */
export function brandOf(c) {
  const path = c.img || (c.phones && c.phones[0]) || (c.web && c.web[0]) || c.showcaseHref || '';
  return path.replace(/^\//, '').split('/')[0];
}
