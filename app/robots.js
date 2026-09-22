import { SITE_URL } from '@/lib/seo';

/* `output: 'export'` needs these generated at build time (see
   node_modules/next/dist/docs/01-app/02-guides/static-exports.md). */
export const dynamic = 'force-static';

/* Statically emitted to /robots.txt by `next build` (output: 'export'). */
export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
