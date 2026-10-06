import "@/styles/pro.css";
import "./home.css";
import FontLinks from "@/components/FontLinks";
import ContactFab from "@/components/ContactFab";
import { pageMeta, personLd, organizationLd, websiteLd, JsonLd } from "@/lib/seo";

export const metadata = pageMeta({
  title: "TheNabLabs — Product Design & Engineering | Nabil Abou Rjeily",
  description:
    "Nabil Abou Rjeily is a Senior Product Designer and UX Engineer. TheNabLabs is his studio for UX/UI design, design systems and front-end engineering for fintech, SaaS and enterprise products.",
  path: "/",
});

export const viewport = { width: "device-width", initialScale: 1 };

export default function HomeLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <FontLinks phosphor />
        <JsonLd data={personLd()} />
        <JsonLd data={organizationLd()} />
        <JsonLd data={websiteLd()} />
      </head>
      <body>
        {children}
        <ContactFab />
      </body>
    </html>
  );
}
