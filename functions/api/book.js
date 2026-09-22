/* POST /api/book  { start, name, email, timeZone, notes }
   Cloudflare Pages Function. Creates the Cal.com booking server-side so the
   API key never reaches the browser, and so the slot is validated by Cal
   rather than trusted from the page. */

const CAL_BOOKINGS = 'https://api.cal.com/v2/bookings';
const API_VERSION = '2024-08-13';
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

export async function onRequestPost({ request, env }) {
  if (!env.CAL_API_KEY || !env.CAL_EVENT_TYPE_ID) {
    return json({ error: 'Booking is not configured yet.' }, 503);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Expected JSON.' }, 400);
  }

  const name = String(body?.name || '').trim().slice(0, 120);
  const email = String(body?.email || '').trim().slice(0, 200);
  const notes = String(body?.notes || '').trim().slice(0, 2000);
  const timeZone = String(body?.timeZone || 'UTC').slice(0, 64);
  const start = String(body?.start || '');

  if (!name) return json({ error: 'Please add your name.' }, 400);
  if (!EMAIL.test(email)) return json({ error: 'Please add a valid email.' }, 400);
  if (Number.isNaN(Date.parse(start))) return json({ error: 'Pick a time slot.' }, 400);
  if (Date.parse(start) < Date.now()) return json({ error: 'That time has passed.' }, 400);

  let res, payload;
  try {
    res = await fetch(CAL_BOOKINGS, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${env.CAL_API_KEY}`,
        'cal-api-version': API_VERSION,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        start,
        eventTypeId: Number(env.CAL_EVENT_TYPE_ID),
        attendee: { name, email, timeZone, language: 'en' },
        ...(notes ? { bookingFieldsResponses: { notes } } : {}),
      }),
    });
    payload = await res.json();
  } catch {
    return json({ error: 'Could not reach the calendar.' }, 502);
  }

  if (!res.ok) {
    /* Cal's own message is the useful one here — a taken slot, a closed day —
       but never pass through anything else from the response. */
    const msg = payload?.error?.message || payload?.message;
    /* A message from Cal means the caller can act on it — a taken slot, a
       closed day — so surface it as a conflict rather than a gateway error. */
    return json({ error: msg || 'That slot could not be booked. Try another time.' }, msg ? 409 : 502);
  }

  const booking = payload?.data || {};
  return json({ ok: true, start: booking.start || start, uid: booking.uid || null });
}
