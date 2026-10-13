/* GoogleTag — the Google tag (gtag.js) for the Google Ads account. Rendered
   from every layout; conversions are sent from lib/analytics. */

import Script from 'next/script';
import { GOOGLE_ADS_ID } from '@/lib/analytics';

export default function GoogleTag() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}');`}
      </Script>
    </>
  );
}
