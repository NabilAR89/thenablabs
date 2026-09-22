/* NabMark — the circled "N" brand mark. The teal→violet gradient lives inside
   the svg (strokes can't take a CSS gradient), so `id` must be unique among
   the marks rendered on a single page. Sized by its container, not here. */
export default function NabMark({ id }) {
  const paint = `url(#${id})`;
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#19b7d1" />
        <stop offset="1" stopColor="#8b6bff" />
      </linearGradient>
      <circle cx="12" cy="12" r="10.85" stroke={paint} strokeWidth="2.2" />
      <path d="M8.7 7.9h1.8l3 5.13V7.9h1.8V16.1h-1.8l-3-5.13V16.1H8.7Z" fill={paint} />
    </svg>
  );
}
