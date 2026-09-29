# TheNabLab

Portfolio site for Nabil Abou Rjeily — product design & front-end engineering.
Next.js 16 (App Router, React 19, JavaScript).

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export into out/
npm run preview  # out/ + the API, on the real Workers runtime, port 8788
npm run lint
```

`next start` does not work here: `next.config.mjs` sets `output: 'export'`, so
there is no Next server to start. `npm run preview` is the equivalent — it
serves the export through Wrangler, which is also what production runs.

## Routes

| Route | Source |
| --- | --- |
| `/` | `components/ProApp.jsx` — the charcoal/cyan home page |
| `/work` | `components/WorkApp.jsx` — the full archive grid |
| `/case-studies/al-hilal` · `barley` · `goalpot` · `moods` · `related` · `smartwealth` · `wimsa` | `app/(case-studies)/case-studies/<slug>/page.jsx` |
| `/<brand>/<Brand>.html` | self-contained showcase pages in `public/` |

## Layout

```
app/
  (home)/         layout.jsx · page.jsx · home.css        -> /
  (work)/         layout.jsx · work/page.jsx · work.css   -> /work
  (case-studies)/ layout.jsx · case-studies/<slug>/       -> /case-studies/<slug>
components/       ProApp, WorkApp, FontLinks, RevealOnScroll, CustomCursor
lib/              data.jsx (content) · hooks.js · icons.jsx · links.js · brand.js
styles/pro.css    the shared design system
public/           all project media + the standalone showcase pages
legacy/           the pre-Next.js sources this app was ported from
scripts/          verification scripts (see below)
```

### Three root layouts, on purpose

The original site was a set of separate HTML documents, each shipping its own
theme on top of `pro.css`: the home and work pages are charcoal-dark, the case
studies are light cream. Those override blocks now live in `home.css`,
`work.css` and `<slug>.css`.

Because App Router keeps one document across client-side navigations, a single
root layout would let one page's `:root` override bleed into the next. So each
theme gets its own root layout via a route group — one `<html>`/`<body>` per
theme, exactly like the original documents.

For the same reason internal links are plain `<a>`, not `next/link`. Next.js
hard-navigates between root layouts anyway, so `next/link` would buy nothing
here while making the full page load look accidental rather than intended.
`@next/next/no-html-link-for-pages` is switched off in `eslint.config.mjs` for
that reason — if you ever add a link *within* one route group, use `next/link`.

### Content and where a card points

All content lives in `lib/data.jsx`. `DATA.caseStudies` drives the home
portfolio, the nav mega-menu and the archive grid. Each project carries:

- `showcaseHref` — the standalone showcase page in `public/` (all 12 projects).
- `caseHref` — the case-study route, for the 7 projects that have one.

`lib/links.js` turns those into a destination and a label: a project links to
its case study when it has one (the case-study page then links on to the live
showcase), and otherwise links straight to the showcase and says
"View the live showcase" rather than promising a case study that does not exist.

Asset paths in `data.jsx` are root-absolute because the media lives in `public/`.

## Verifying the port

```bash
npm run verify        # every local asset, route, showcaseHref and caseHref
                      # resolves; every extracted stylesheet still matches the
                      # legacy page it came from, byte for byte
npm run dev &         # then, against a running server:
npm run verify:pages  # each case-study route's rendered DOM is compared against
                      # the original static HTML — tag histogram, class
                      # histogram, image list and visible text must all match
```

These are regression tests, not one-shot checks: `legacy/` is kept precisely so
they keep working. The one-shot converters that generated `components/` and the
case-study routes have been removed — that code is now hand-maintained source,
so a generator that could overwrite it would be a hazard.

## Notes

- The showcase pages under `public/` are self-contained documents with inline
  CSS/JS. They stay static assets; only their back-links were rewritten to `/`
  and `/work`.
- `ProServiceCards`, `ProCounters` and `ProReviews` in `ProApp.jsx` are complete
  but not mounted by `ProApp` — they were already switched off before the port
  and were left that way. Add them to `ProApp` to bring them back.
- `legacy/authoring-runtime/` holds `image-slot.js` and its state sidecar from
  the previous authoring environment. Nothing loads them; the unreachable
  `<image-slot>` element was dropped from `ProApp` since nothing defines it now.
- `AGENTS.md` / `CLAUDE.md` are generated and refreshed by `next dev`.

## Deploying

Cloudflare Workers, built from `main` by the `thenablabs` project:

```
Build command:   npm run build      # writes the static export to out/
Deploy command:  npx wrangler deploy
Root directory:  /
```

`wrangler.jsonc` is what makes that work. Without it Wrangler sees a Next.js
app, assumes it needs a server, and runs `opennextjs-cloudflare build` — which
fails, and would be wrong regardless: the export is plain HTML and there is no
server to bundle.

The two Cal.com endpoints were originally Pages Functions, which routed by
filename. Workers has no file-based routing, so `worker.js` maps the paths
explicitly and `assets.run_worker_first` steers `/api/*` to it instead of into
the asset lookup. The handlers in `functions/` are unchanged and still take
`{ request, env }`.

Everything else short-circuits to a static asset before the Worker runs, so the
site costs no Worker invocations.

### Environment

`CAL_API_KEY` and `CAL_EVENT_TYPE_ID` must be set on the Worker (Settings →
Variables and Secrets → **Runtime**, not build variables) or `/api/slots` and
`/api/book` return 503 and the booking panel reports that booking is not
configured. Locally the same two values go in `.dev.vars`, which is gitignored.
