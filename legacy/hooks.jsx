/* hooks.jsx — motion & behavior primitives. Exposed on window. */
const { useState, useEffect, useRef, useCallback } = React;

/* Reveal-on-scroll: add .in to any [data-reveal] container once. */
function useRevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .line-reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => io.observe(el));
    // Fallback: if IO hasn't revealed an in-view element shortly after load
    // (some embedded/headless contexts never fire), reveal it manually.
    const sweep = () => {
      els.forEach((el) => {
        if (el.classList.contains('in')) return;
        const r = el.getBoundingClientRect();
        if (r.top < (window.innerHeight || 0) * 0.92 && r.bottom > 0) {
          el.classList.add('in'); io.unobserve(el);
        }
      });
    };
    const t = setTimeout(sweep, 600);
    window.addEventListener('load', sweep);
    return () => { io.disconnect(); clearTimeout(t); window.removeEventListener('load', sweep); };
  });
}

/* Theme (light default) with persistence. */
function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem('nablab-theme') || 'light');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('nablab-theme', theme);
  }, [theme]);
  const toggle = useCallback(() => setTheme((t) => (t === 'light' ? 'dark' : 'light')), []);
  return [theme, toggle];
}

/* Sticky nav: solidify on scroll, hide on scroll-down / show on scroll-up. */
function useScrollNav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 600 && y > last + 4);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return { scrolled, hidden };
}

/* Custom cursor — dot + lagging ring; grows over [data-cursor]. */
function CustomCursor() {
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

/* Parallax: translateY by scroll progress for [data-parallax] via ref. */
function useParallax(ref, strength = 0.12) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const center = r.top + r.height / 2 - innerHeight / 2;
        ref.current.style.transform = `translateY(${(-center * strength).toFixed(1)}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, [ref, strength]);
}

/* Smooth-scroll to a section id. */
function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
}

Object.assign(window, { useRevealObserver, useTheme, useScrollNav, CustomCursor, useParallax, scrollToId });
