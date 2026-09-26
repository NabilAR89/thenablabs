/* Worker entry — the static export in out/ is served by the assets binding;
   this script exists only for the two API routes.

   The handlers in functions/ were written for Cloudflare Pages, which routes
   by filename and passes a context object. Workers has no file-based routing,
   so the mapping is explicit here and the handlers themselves are unchanged:
   they still take { request, env } and still never see the Cal.com key on the
   client. `run_worker_first` in wrangler.jsonc is what steers /api/* here
   rather than into the asset lookup. */

import { onRequestGet as slots } from './functions/api/slots.js';
import { onRequestPost as book } from './functions/api/book.js';

/* Pages answered a wrong method with 405 rather than falling through to the
   asset handler; keep that, including the Allow header the spec requires. */
const methodNotAllowed = (allow) =>
  new Response(JSON.stringify({ error: `Use ${allow} for this endpoint.` }), {
    status: 405,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      allow: `${allow}, OPTIONS`,
    },
  });

const ROUTES = {
  '/api/slots': { method: 'GET', handler: slots },
  '/api/book': { method: 'POST', handler: book },
};

const worker = {
  async fetch(request, env, ctx) {
    const route = ROUTES[new URL(request.url).pathname];
    if (!route) return env.ASSETS.fetch(request);

    /* A HEAD is a GET whose body is dropped, so let it through to a GET route
       and strip the body on the way back out. */
    const method = request.method === 'HEAD' ? 'GET' : request.method;
    if (method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: { allow: `${route.method}, OPTIONS` },
      });
    }
    if (method !== route.method) return methodNotAllowed(route.method);

    const res = await route.handler({ request, env, ctx });
    return request.method === 'HEAD' ? new Response(null, res) : res;
  },
};

export default worker;
