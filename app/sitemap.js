import { SITE_URL } from '@/lib/seo';
import { DATA } from '@/lib/data';

/* `output: 'export'` needs these generated at build time (see
   node_modules/next/dist/docs/01-app/02-guides/static-exports.md). */
export const dynamic = 'force-static';

/* Every indexable URL: the two app pages, the case studies, and the static
   showcase pages under public/ (which Next does not know about, so they are
   derived from the project data rather than hand-listed). */
export default function sitemap() {
  const now = new Date();
  const cases = DATA.caseStudies.filter((c) => c.caseHref).map((c) => c.caseHref);
  const showcases = DATA.caseStudies.filter((c) => c.showcaseHref).map((c) => c.showcaseHref);

  const entry = (path, priority, changeFrequency) => ({
    url: SITE_URL + path,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    entry('/', 1.0, 'monthly'),
    entry('/work', 0.9, 'monthly'),
    ...cases.map((p) => entry(p, 0.8, 'yearly')),
    ...showcases.map((p) => entry(p, 0.6, 'yearly')),
  ];
}
