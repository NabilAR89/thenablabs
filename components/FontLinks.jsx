/* FontLinks — the webfont + Phosphor icon <link>s every original page carried
   in its <head>. Rendered from a layout; React hoists these into <head>. */
export default function FontLinks({ phosphor = false, weights = '9..40,400;9..40,500;9..40,600' }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href={`https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:opsz,wght@${weights}&display=swap`}
      />
      {phosphor && (
        <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />
      )}
    </>
  );
}
