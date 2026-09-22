'use client';

/* CustomCursor — dot + lagging ring; grows over [data-cursor] targets.
   Ported from legacy/hooks.jsx. Not mounted by any page today, kept because
   pro.css still ships the .cursor-dot / .cursor-ring styles. */
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dot = useRef(null), ring = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    document.body.classList.add('has-cursor');
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, raf;
    const move = (e) => {
      mx = e.clientX; my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      const t = e.target.closest('a, button, [data-cursor], input, textarea');
      if (ring.current) ring.current.classList.toggle('hover', !!t);
    };
    const leave = () => { ring.current && ring.current.classList.add('hide'); dot.current && dot.current.classList.add('hide'); };
    const enter = () => { ring.current && ring.current.classList.remove('hide'); dot.current && dot.current.classList.remove('hide'); };
    const loop = () => {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
      document.body.classList.remove('has-cursor');
    };
  }, []);
  return (<><div className="cursor-dot" ref={dot}></div><div className="cursor-ring" ref={ring}></div></>);
}
