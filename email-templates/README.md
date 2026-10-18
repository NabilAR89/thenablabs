# Email templates

Branded HTML emails for writing to clients. This folder is not part of the
site build — nothing here is deployed.

| File | Use |
| --- | --- |
| `client-email.html` | General client email: updates, proposals, hand-offs, follow-ups |
| `brainspace-intro.html` | Filled-in example: intro / outreach email to BrainSpace |

## Images

Images must be **hosted URLs** — an email can't carry files from this folder.
Anything under `public/` is live at `https://thenablabs.com/<path>`, e.g.
`public/moods/d-discover.jpg` → `https://thenablabs.com/moods/d-discover.jpg`.

- Use PNG or JPG (not SVG or WebP), ideally under ~300 KB each.
- Hero: 534px wide. Side-by-side pair: 259px each, with matching proportions.
- Good ready-made picks (all ~16:10): `og.png` (hero), `base360/dashboard.png`,
  `moods/d-discover.jpg`, `moods/d-suggestions.jpg`, `locus/dash-1.png`.
- `public/email/` holds copies cropped to 16:10 and compressed just for email
  (e.g. `email/wimsa-today.jpg`). Add new ones there; they go live on deploy.
- Images only show while the site is live, and some clients (Outlook, Gmail
  for new senders) hide images until the recipient allows them — so the text
  must make sense on its own.

## Filling one in

1. Make a copy (e.g. `client-email-acme-update.html`) so the template stays clean.
2. Replace every `[BRACKETED]` placeholder, including the `<title>` and the
   hidden inbox preview line near the top.
3. Delete the blocks you don't need — the highlight box and the button are
   both optional and marked with comments.
4. Open the file in a browser to check it.

## Sending it

**Gmail (web):** open the file in Chrome, press <kbd>Cmd</kbd>+<kbd>A</kbd>
then <kbd>Cmd</kbd>+<kbd>C</kbd>, and paste into a new Gmail message. The
layout, colours and links carry over. Send yourself a test first.

**Apple Mail:** open the file in Safari and use *File → Share → Email This
Page* (or copy/paste as above).

**Outlook / a mailing tool (Mailchimp, Brevo, etc.):** use the tool's
"paste HTML" or "code your own" option and paste the file's source.

## Editing rules

Email clients strip most modern CSS, so keep to what the template already does:
tables for layout, styles inline on each element, images as hosted PNG/JPG
(never SVG), and no JavaScript.
