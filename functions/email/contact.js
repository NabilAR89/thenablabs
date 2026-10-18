/* contactEmail — the message /api/contact sends to the studio inbox when the
   "Let's work together" form is submitted. Returns { subject, text, html }.

   Email clients ignore <style> blocks, CSS variables and webfonts often
   enough that the HTML is table-based with every style inline. The palette is
   the site's charcoal · cyan tokens (app/(home)/home.css) written out as hex.
   Sora / DM Sans load where the client allows; the system stack covers the
   rest. The logo is the hosted PNG icon, since Gmail and Outlook drop SVG. */

const SITE = 'https://thenablabs.com';

const C = {
  bg: '#111214',
  surface: '#181a1d',
  elevated: '#202328',
  line: '#2b2e33',
  ink: '#f4f1ea',
  muted: '#a6a8ad',
  muted2: '#6f737a',
  teal: '#19b7d1',
};
const DISPLAY = "Sora, 'Segoe UI', Helvetica, Arial, sans-serif";
const BODY = "'DM Sans', 'Segoe UI', Helvetica, Arial, sans-serif";

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/* One labelled row of the sender details. */
const field = (label, value) => `
            <tr>
              <td style="padding:0 0 14px;">
                <div style="font-family:${BODY};font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${C.muted2};padding-bottom:4px;">${label}</div>
                <div style="font-family:${BODY};font-size:16px;line-height:1.4;color:${C.ink};">${value}</div>
              </td>
            </tr>`;

export function contactEmail({ name, email, message, sentAt = new Date() }) {
  const subject = `Project enquiry — ${name}`;
  const when = sentAt.toUTCString().replace(' GMT', ' UTC');
  const text = `New project enquiry from the website\n\nName: ${name}\nEmail: ${email}\nSent: ${when}\n\n${message}\n\n— Reply to this email to answer ${name} directly.`;

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  /* <br> rather than white-space:pre-wrap, which some clients strip. */
  const safeMessage = escapeHtml(message).replace(/\r?\n/g, '<br>');
  const firstName = escapeHtml(name.split(/\s+/)[0]);
  const replyHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: ${subject}`)}`;

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>${escapeHtml(subject)}</title>
  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background:${C.bg};-webkit-text-size-adjust:100%;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${safeName} sent a message through thenablabs.com.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.bg};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">

          <!-- Header -->
          <tr>
            <td style="padding:0 4px 24px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-right:12px;vertical-align:middle;">
                    <img src="${SITE}/icon-192.png" width="36" height="36" alt="TheNabLabs" style="display:block;border:0;border-radius:9px;">
                  </td>
                  <td style="vertical-align:middle;font-family:${DISPLAY};font-size:17px;font-weight:700;color:${C.ink};">TheNabLabs</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:${C.surface};border:1px solid ${C.line};border-radius:20px;padding:32px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-bottom:8px;font-family:${BODY};font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${C.teal};">New project enquiry</td>
                </tr>
                <tr>
                  <td style="padding-bottom:24px;font-family:${DISPLAY};font-size:24px;line-height:1.25;font-weight:700;color:${C.ink};">${safeName} wants to work together</td>
                </tr>
                ${field('Name', safeName)}
                ${field('Email', `<a href="mailto:${safeEmail}" style="color:${C.teal};text-decoration:none;">${safeEmail}</a>`)}
                ${field('Sent', escapeHtml(when))}
                <tr>
                  <td style="padding:10px 0 28px;">
                    <div style="font-family:${BODY};font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${C.muted2};padding-bottom:8px;">Message</div>
                    <div style="background:${C.elevated};border:1px solid ${C.line};border-left:3px solid ${C.teal};border-radius:12px;padding:18px 20px;font-family:${BODY};font-size:15px;line-height:1.6;color:${C.ink};">${safeMessage}</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background:${C.teal};border-radius:999px;">
                          <a href="${replyHref}" style="display:inline-block;padding:13px 26px;font-family:${BODY};font-size:15px;font-weight:500;color:${C.bg};text-decoration:none;">Reply to ${firstName} &rarr;</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:22px 4px 0;font-family:${BODY};font-size:12px;line-height:1.6;color:${C.muted2};">
              Sent from the contact form on <a href="${SITE}" style="color:${C.muted};text-decoration:underline;">thenablabs.com</a>. Replying to this email goes straight to ${safeName}.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, text, html };
}
