/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Cloudflare Pages serves the exported HTML from out/, with the Workers in
     functions/ handling /api/*. `next build` writes out/; preview the whole
     thing (pages + functions + .dev.vars) with `npx wrangler pages dev out`.
     Note `next start` does not work with this target — use the line above. */
  output: 'export',
  images: { unoptimized: true },
};

export default nextConfig;
