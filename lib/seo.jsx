/* seo.js — one place for the metadata every route repeats.

   SITE_URL has to be absolute for canonicals, Open Graph and the sitemap to
   be valid. Nothing in the repo declared a domain, so it is derived from the
   contact address (hello@thenablabs.com) and can be overridden at build time
   with NEXT_PUBLIC_SITE_URL without touching code. */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://thenablabs.com"
).replace(/\/$/, "");
export const SITE_NAME = "TheNabLabs";
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

/* JSON-LD. Rendered from the layouts so every page carries the graph. The
   Person and the Organization each have a stable @id, so every other block
   points at them by reference rather than repeating a thinner copy of each —
   that is what lets Google join them into one entity per name. */
const PERSON_ID = `${SITE_URL}/#person`;
const ORG_ID = `${SITE_URL}/#organization`;

const PROFILES = [
  "https://www.linkedin.com/in/nabil-abou-rjeily-b033a698",
  "https://www.behance.net/nabil_abourjeily",
];

export function personLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: AUTHOR,
    url: SITE_URL,
    image: `${SITE_URL}/assets/nabil-studio.jpeg`,
    jobTitle: "Senior Product Designer & UX Engineer",
    knowsAbout: [
      "Product design",
      "UX/UI design",
      "UX engineering",
      "Design systems",
      "Front-end engineering",
      "Figma",
      "React",
    ],
    email: "mailto:hello@thenablabs.com",
    sameAs: PROFILES,
    worksFor: { "@id": ORG_ID },
  };
}

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon-512.png`,
    email: "hello@thenablabs.com",
    description:
      "Independent studio for product design, UX/UI, design systems and front-end engineering.",
    founder: { "@id": PERSON_ID },
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
  };
}

/* Home → … → this page. `trail` is [name, path] pairs after Home. */
export function breadcrumbLd(trail) {
  return { "@context": "https://schema.org", ...crumbs(trail) };
}

function crumbs(trail) {
  const items = [["Home", "/"], ...trail];
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: SITE_URL + (path === "/" ? "" : path),
    })),
  };
}

/* The case study plus its breadcrumb, in one graph so the call sites stay a
   single <JsonLd>. Case studies are listed under /work, so that is the parent
   crumb; the crumb's own name is the project, i.e. the title before " — ". */
export function caseStudyLd({ title, description, path, image }) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        name: title,
        description,
        url: SITE_URL + path,
        ...(image ? { image: SITE_URL + image } : {}),
        author: { "@id": PERSON_ID },
        publisher: { "@id": ORG_ID },
        inLanguage: "en",
      },
      crumbs([
        ["Work", "/work"],
        [title.split(" — ")[0], path],
      ]),
    ],
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
