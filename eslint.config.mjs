import next from 'eslint-config-next/core-web-vitals';

const config = [
  { ignores: ['.next/**', 'legacy/**', 'public/**'] },
  ...next,
  {
    rules: {
      // Project cards and nav links point at device-mockup screenshots and
      // pages in other root layouts. next/image's wrapper and sizing fight the
      // rotated/scaled CSS frames these sit in, and next/link buys nothing
      // across root layouts (Next.js hard-navigates between them anyway) while
      // making the full page load look accidental rather than intended.
      // See "Three root layouts, on purpose" in README.md.
      '@next/next/no-img-element': 'off',
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
];

export default config;
