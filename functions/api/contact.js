/* POST /api/contact  { name, email, message, website }
   Sends the home page's "Let's work together" form to the studio inbox
   through Cloudflare's send_email binding (env.EMAIL, see wrangler.jsonc), so
   the visitor never has to open a mail app. The visitor's address goes in
   Reply-To: the From has to be on our own domain.

   Until thenablabs.com is onboarded for Email Sending, Cloudflare only
   delivers to *verified Email Routing destinations* — hello@ is a routing
   address, not one of those, so sends to it fail. CONTACT_TO (a runtime
   variable set in the dashboard) points the form at the verified inbox
   instead; hello@ is the fallback once the domain is onboarded. */

const DEFAULT_TO = 'hello@thenablabs.com';
const FROM = { email: 'website@thenablabs.com', name: 'TheNabLabs website' };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export async function onRequestPost({ request, env }) {
  if (!env.EMAIL) return json({ error: 'The contact form is not configured yet.' }, 503);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Expected JSON.' }, 400);
  }

  /* `website` is a honeypot: the field is hidden from people, so only bots
     fill it. Answer as if it worked so they have nothing to retry against. */
  if (String(body?.website || '').trim()) return json({ ok: true });

  /* Name and email land in headers, so no line breaks in either. */
  const name = String(body?.name || '').replace(/[\r\n]+/g, ' ').trim().slice(0, 120);
  const email = String(body?.email || '').replace(/[\r\n]+/g, '').trim().slice(0, 200);
  const message = String(body?.message || '').trim().slice(0, 5000);

  if (!name) return json({ error: 'Please add your name.' }, 400);
  if (!EMAIL.test(email)) return json({ error: 'Please add a valid email.' }, 400);
  if (!message) return json({ error: 'Tell me a little about the project.' }, 400);

  const text = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const html =
    `<p><b>Name:</b> ${escapeHtml(name)}<br><b>Email:</b> ${escapeHtml(email)}</p>` +
    `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`;

  try {
    await env.EMAIL.send({
      to: env.CONTACT_TO || DEFAULT_TO,
      from: FROM,
      replyTo: { email, name },
      subject: `Project enquiry — ${name}`,
      text,
      html,
    });
  } catch (err) {
    console.error('contact send failed', err?.code, err?.message);
    return json({ error: 'Your message could not be sent. Please email hello@thenablabs.com directly.' }, 502);
  }

  return json({ ok: true });
}
