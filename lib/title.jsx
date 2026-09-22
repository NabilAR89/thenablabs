/* title.jsx — project titles read "Name — Caption" (Al Hilal — Digital
   Banking App). The name is the thing being named; the caption after the dash
   is supporting text, so it renders a step smaller than the name it follows.
   Sized in `em` so it tracks whatever the surrounding heading is set to. */

export function ProjectTitle({ title = '' }) {
  const i = title.indexOf('—');
  if (i < 0) return title;
  return (
    <>
      {title.slice(0, i).trim()}
      <span className="pf-title-sub">{'— ' + title.slice(i + 1).trim()}</span>
    </>
  );
}
