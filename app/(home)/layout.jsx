import "@/styles/pro.css";
import "./home.css";
import FontLinks from "@/components/FontLinks";
import { pageMeta, personLd, websiteLd, JsonLd } from "@/lib/seo";

export const metadata = pageMeta({
  title: "TheNabLabs — Product Design & Engineering | Nabil Abou Rjeily",
  description:
    "TheNabLabs is an independent product design studio founded by Nabil Abou Rjeily: strategy, product design, interface and motion, and production engineering all under one roof.",
  path: "/",
});

export const viewport = { width: "device-width", initialScale: 1 };

export default function HomeLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <FontLinks phosphor />
        <JsonLd data={personLd()} />
        <JsonLd data={websiteLd()} />
      </head>
      <body>{children}</body>
    </html>
  );
}
