/* Google Ads — the account tag loaded by GoogleTag on every page, and the
   "lead form submitted" conversion fired by the forms once a send succeeds. */

export const GOOGLE_ADS_ID = 'AW-18509348019';
const LEAD_CONVERSION = `${GOOGLE_ADS_ID}/9wCbCPfTkJsdELP5-PlE`;

export function trackLead() {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'conversion', {
    send_to: LEAD_CONVERSION,
    value: 1.0,
    currency: 'USD',
  });
}
