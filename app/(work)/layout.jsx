import '@/styles/pro.css';
import './work.css';
import FontLinks from '@/components/FontLinks';
import ContactFab from '@/components/ContactFab';
import { pageMeta, personLd, JsonLd } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'All Work — Product Design & Engineering | TheNabLabs',
  description:
    'The complete archive of products Nabil Abou Rjeily has designed and built, across fintech, healthcare, hospitality, govtech, AI and enterprise.',
  path: '/work',
});

export const viewport = { width: 'device-width', initialScale: 1 };

export default function WorkLayout({ children }) {
  return (
    <html lang="en">
      <head><FontLinks /><JsonLd data={personLd()} /></head>
      <body>{children}<ContactFab /></body>
    </html>
  );
}
