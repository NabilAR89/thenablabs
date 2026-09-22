/* seo.js — one place for the metadata every route repeats.

   SITE_URL has to be absolute for canonicals, Open Graph and the sitemap to
   be valid. Nothing in the repo declared a domain, so it is derived from the
   contact address (hello@thenablabss.com) and can be overridden at build time
   with NEXT_PUBLIC_SITE_URL without touching code. */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://thenablabs.com"
).replace(/\/$/, "");
export const SITE_NAME = "TheNabLab";
export const AUTHOR = "Nabil Abou Rjeily";
export const OG_IMAGE = "/og.png";

/* Build a page's metadata: canonical URL, Open Graph and Twitter card all
   derive from the same title/description so they can never drift apart. */
export function pageMeta({
  title,
  description,
  path = "/",
  image = OG_IMAGE,
  type = "website",
}) {
  const url = SITE_URL + path;
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    applicationName: SITE_NAME,
    authors: [{ name: AUTHOR }],
    creator: AUTHOR,
    publisher: SITE_NAME,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      title,
      description,
      locale: "en_US",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@thenablabs",
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
    },
    manifest: "/site.webmanifest",
  };
}

/* JSON-LD. Rendered from the layouts so every page carries the graph. */
export function personLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR,
    url: SITE_URL,
    jobTitle: "Senior UX/UI Designer & Front-End Engineer",
    email: "mailto:hello@thenablabss.com",
    sameAs: [
      "https://www.linkedin.com/in/nabil-abou-rjeily-b033a698",
      "https://www.behance.net/nabil_abourjeily",
    ],
    worksFor: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en",
    publisher: { "@type": "Person", name: AUTHOR },
  };
}

export function caseStudyLd({ title, description, path, image }) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description,
    url: SITE_URL + path,
    ...(image ? { image: SITE_URL + image } : {}),
    author: { "@type": "Person", name: AUTHOR },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    inLanguage: "en",
  };
}

/* A single <script type="application/ld+json"> — Next keeps this in the DOM
   as-is, and the JSON is serialised rather than interpolated as markup. */
export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
