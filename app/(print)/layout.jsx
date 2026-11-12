import "./portfolio/portfolio.css";
import FontLinks from "@/components/FontLinks";
import { pageMeta } from "@/lib/seo";

/* The print portfolio is its own root layout, like every other theme here:
   it shares none of pro.css, so nothing from the site's screen styles can
   leak into the A4 sheets. scripts/build-pdf.mjs renders this page to the
   downloadable PDF. Not indexed — the home page is the canonical portfolio. */
export const metadata = {
  ...pageMeta({
    title: "Portfolio (PDF) — Nabil Abou Rjeily | TheNabLabs",
    description:
      "A printable portfolio of Nabil Abou Rjeily: experience, skills and selected product design and front-end work.",
    path: "/portfolio",
  }),
  robots: { index: false, follow: true },
};

export const viewport = { width: "device-width", initialScale: 1 };

export default function PrintLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <FontLinks weights="9..40,400;9..40,500;9..40,600;9..40,700" />
      </head>
      <body>{children}</body>
    </html>
  );
}
