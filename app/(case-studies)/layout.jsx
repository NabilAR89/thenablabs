import '@/styles/pro.css';
import './dark.css';
import FontLinks from '@/components/FontLinks';
import { pageMeta, personLd, JsonLd } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Case Studies — TheNabLabs',
  description: 'Case studies by Nabil Abou Rjeily: product design and front-end engineering, from research through to shipped interface.',
  path: '/case-studies',
  type: 'article',
});

export const viewport = { width: 'device-width', initialScale: 1 };

export default function CaseStudyLayout({ children }) {
  return (
    <html lang="en">
      <head><FontLinks weights="9..40,400;9..40,500;9..40,600;9..40,700" /><JsonLd data={personLd()} /></head>
      <body>{children}</body>
    </html>
  );
}
