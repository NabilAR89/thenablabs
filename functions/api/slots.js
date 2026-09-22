/* GET /api/slots?start=YYYY-MM-DD&end=YYYY-MM-DD&timeZone=Area/City
   Cloudflare Pages Function. Proxies Cal.com's availability so the API key
   stays server-side — it is never shipped to the browser.
   Set CAL_API_KEY and CAL_EVENT_TYPE_ID in the Pages project's env vars. */

const CAL_SLOTS = 'https://api.cal.com/v2/slots';
const API_VERSION = '2024-09-04';
const DATE = /^\d{4}-\d{2}-\d{2}$/;

const json = (body, status = 200, cache = 'no-store') =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': cache },
  });

export async function onRequestGet({ request, env }) {
  if (!env.CAL_API_KEY || !env.CAL_EVENT_TYPE_ID) {
    return json({ error: 'Booking is not configured yet.' }, 503);
  }

  const { searchParams } = new URL(request.url);
  const start = searchParams.get('start');
  const end = searchParams.get('end');
  const timeZone = searchParams.get('timeZone') || 'UTC';

  if (!DATE.test(start || '') || !DATE.test(end || '')) {
    return json({ error: 'start and end must be YYYY-MM-DD.' }, 400);
  }

  const api = new URL(CAL_SLOTS);
  api.searchParams.set('eventTypeId', env.CAL_EVENT_TYPE_ID);
  api.searchParams.set('start', start);
  api.searchParams.set('end', end);
  api.searchParams.set('timeZone', timeZone);

  let res;
  try {
    res = await fetch(api, {
      headers: { authorization: `Bearer ${env.CAL_API_KEY}`, 'cal-api-version': API_VERSION },
    });
  } catch {
    return json({ error: 'Could not reach the calendar.' }, 502);
  }

  if (!res.ok) return json({ error: 'Could not load availability.' }, 502);

  const payload = await res.json();
  /* Cal returns { data: { 'YYYY-MM-DD': [{ start: ISO }] } } — hand the page
     just the ISO strings it renders, nothing else from the account. */
  const days = {};
  for (const [date, slots] of Object.entries(payload?.data || {})) {
    if (Array.isArray(slots) && slots.length) days[date] = slots.map((s) => s.start).filter(Boolean);
  }
  return json({ days }, 200, 'public, max-age=60');
}
