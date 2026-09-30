'use client';

/* hooks.js — motion & behavior primitives. Ported from legacy/hooks.jsx. */
import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from 'react';

/* Reveal-on-scroll: add .in to every .reveal / .line-reveal once it enters view. */
export function useRevealObserver() {
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

/* Theme (light default) with persistence.
   localStorage is external state, so it is read through useSyncExternalStore:
   the server (and the first client render) get the 'light' snapshot, then React
   reconciles to the stored choice without a setState-driven cascade. */
const THEME_KEY = 'nablab-theme';

function subscribeToTheme(onChange) {
  window.addEventListener('storage', onChange);
  return () => window.removeEventListener('storage', onChange);
}

export function useTheme() {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    () => localStorage.getItem(THEME_KEY) || 'light',
    () => 'light',
  );
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  const toggle = useCallback(() => {
    localStorage.setItem(THEME_KEY, theme === 'light' ? 'dark' : 'light');
    // `storage` only fires in other tabs, so nudge this one too.
    window.dispatchEvent(new Event('storage'));
  }, [theme]);
  return [theme, toggle];
}

/* Sticky nav: solidify on scroll, hide on scroll-down / show on scroll-up. */
export function useScrollNav() {
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

/* Flags <html> as .scrolled once the page has moved, for pages whose nav is
   static markup (case studies) and so can't hold its own scroll state. */
export function useScrolledRoot() {
  useEffect(() => {
    const root = document.documentElement;
    const onScroll = () => root.classList.toggle('scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); root.classList.remove('scrolled'); };
  }, []);
}

/* Parallax: translateY by scroll progress for the given ref. */
export function useParallax(ref, strength = 0.12) {
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

/* Count-up when scrolled into view. */
export function useCountUp(target, dur = 1600) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let raf, started = false;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting && !started) {
          started = true; const t0 = performance.now();
          const tick = (t) => {
            const p = Math.min(1, (t - t0) / dur);
            const e2 = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(target * e2));
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [target, dur]);
  return [val, ref];
}

/* Smooth-scroll to a section id. */
export function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
}

/* Mobile nav disclosure.
   The desktop link row is hidden below --bp-nav (940px), so below that width a
   disclosure button owns navigation instead. Open state is held here together
   with the three behaviours a disclosure of this kind owes the user: Escape
   closes it, the page behind it does not scroll while it is open, and growing
   the viewport past the breakpoint closes it so the panel can never be left
   open behind the restored desktop row. */
export function useMobileNav(breakpoint = 940) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    const mq = window.matchMedia(`(min-width: ${breakpoint + 1}px)`);
    const onWide = (e) => { if (e.matches) setOpen(false); };
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onWide);
    // Lock the page behind the panel without losing the scroll position.
    const { overflow, paddingRight } = document.body.style;
    const bar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (bar > 0) document.body.style.paddingRight = `${bar}px`;
    return () => {
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onWide);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [open, breakpoint]);

  return [open, setOpen];
}

/* Swipe carousel (tablet and below).

   Transform-based on purpose. The first version drove a scroll-snap container
   with scrollLeft, which measures fine in every desktop engine and in headless
   WebKit but was unreliable on real iOS hardware: mandatory snapping competes
   with scripted scrolling, and the momentum layer can swallow the movement
   outright. Translating the track sidesteps all of it — the same arithmetic
   runs everywhere, and dragging is handled with pointer events rather than
   native overflow, so there is no scroll state to fight.

   `touch-action: pan-y` on the viewport (set in CSS) keeps vertical page
   scrolling native while the horizontal axis belongs to the carousel.

   Returns { index, goTo, next, prev, count, viewportRef, trackRef, dragging }.
   Inert above `breakpoint`, where CSS restores the original layout. */
export function useSwipeCarousel({ interval = 0, breakpoint = 1024 } = {}) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [dragging, setDragging] = useState(false);

  const active = useRef(false);
  const paused = useRef(false);
  const resumeT = useRef(null);
  const drag = useRef(null);
  const offset = useRef(0);

  const slides = useCallback(() => {
    const t = trackRef.current;
    if (!t) return [];
    return [...t.children].filter((c) => c.offsetWidth > 0);
  }, []);

  /* Where the track must sit for slide n to be centred.

     Measured from rectangles rather than offsetLeft/scrollWidth: offsetLeft is
     relative to whichever ancestor happens to be positioned, which differs
     between the sections this runs in, and scrollWidth rounds to integers and
     drops the track's trailing padding — which is what left the final slide
     clipped against the right edge. Subtracting the track's own left makes the
     reading independent of the transform currently applied. */
  const offsetFor = useCallback((n) => {
    const vp = viewportRef.current;
    const track = trackRef.current;
    const list = slides();
    const slide = list[n];
    if (!vp || !track || !slide) return 0;
    const tRect = track.getBoundingClientRect();
    const sRect = slide.getBoundingClientRect();
    const within = sRect.left - tRect.left;
    const want = within + sRect.width / 2 - vp.clientWidth / 2;
    const max = Math.max(0, tRect.width - vp.clientWidth);
    return -Math.max(0, Math.min(want, max));
  }, [slides]);

  const apply = useCallback((x, animate) => {
    const t = trackRef.current;
    if (!t) return;
    t.style.transition = animate ? 'transform .5s cubic-bezier(.22,1,.36,1)' : 'none';
    t.style.transform = `translate3d(${x}px,0,0)`;
    offset.current = x;
  }, []);

  /* Above the breakpoint the track must carry no transform at all. Even an
     identity transform makes it a containing block for absolutely positioned
     descendants, which collapses the percentage offsets the desktop hero
     places its devices with — every mockup lands on the same line. */
  const clear = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    t.style.transition = '';
    t.style.transform = '';
    offset.current = 0;
  }, []);

  const goTo = useCallback((n, animate = true) => {
    const list = slides();
    if (!list.length) return;
    const i = Math.max(0, Math.min(n, list.length - 1));
    setIndex(i);
    apply(offsetFor(i), animate);
  }, [slides, offsetFor, apply]);

  const hold = useCallback(() => {
    paused.current = true;
    clearTimeout(resumeT.current);
    if (interval) resumeT.current = setTimeout(() => { paused.current = false; }, interval * 2);
  }, [interval]);

  const next = useCallback(() => { hold(); goTo(index + 1); }, [goTo, index, hold]);
  const prev = useCallback(() => { hold(); goTo(index - 1); }, [goTo, index, hold]);

  /* Keep the carousel in step with its own layout: how many slides are
     showing, and whether the carousel is the layout in use at all. */
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const sync = () => {
      active.current = mq.matches;
      const list = slides();
      setCount(list.length);
      if (!mq.matches) { clear(); return; }
      setIndex((i) => {
        const n = Math.max(0, Math.min(i, list.length - 1));
        apply(offsetFor(n), false);
        return n;
      });
    };
    sync();
    mq.addEventListener('change', sync);
    window.addEventListener('resize', sync);
    window.addEventListener('orientationchange', sync);
    // Images settle after load and change slide widths.
    const imgs = [...vp.querySelectorAll('img')].filter((i) => !i.complete);
    imgs.forEach((i) => i.addEventListener('load', sync, { once: true }));
    return () => {
      mq.removeEventListener('change', sync);
      window.removeEventListener('resize', sync);
      window.removeEventListener('orientationchange', sync);
    };
  }, [breakpoint, slides, offsetFor, apply, clear]);

  /* Dragging. Pointer events cover touch and mouse alike; the gesture only
     claims the pointer once it is clearly horizontal, so a vertical flick
     still scrolls the page. */
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    const down = (e) => {
      if (!active.current || e.button > 0) return;
      drag.current = { x: e.clientX, y: e.clientY, at: offset.current, id: e.pointerId, axis: null, t: Date.now() };
      hold();
    };
    const move = (e) => {
      const d = drag.current;
      if (!d || e.pointerId !== d.id) return;
      const dx = e.clientX - d.x, dy = e.clientY - d.y;
      if (!d.axis) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        d.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
        if (d.axis === 'x') {
          setDragging(true);
          try { vp.setPointerCapture(d.id); } catch { /* not capturable */ }
        }
      }
      if (d.axis !== 'x') return;
      if (e.cancelable) e.preventDefault();
      // Resist past the ends rather than stopping dead.
      const list = slides();
      const min = offsetFor(list.length - 1), max = 0;
      let x = d.at + dx;
      if (x > max) x = max + (x - max) * 0.35;
      if (x < min) x = min + (x - min) * 0.35;
      apply(x, false);
    };
    const up = (e) => {
      const d = drag.current;
      if (!d || (e.pointerId !== undefined && e.pointerId !== d.id)) return;
      drag.current = null;
      setDragging(false);
      try { vp.releasePointerCapture(d.id); } catch { /* already released */ }
      if (d.axis !== 'x') return;
      const dx = (e.clientX ?? d.x) - d.x;
      const dt = Math.max(1, Date.now() - d.t);
      const v = dx / dt;                       // px per ms
      const list = slides();
      const w = list[index]?.offsetWidth || vp.clientWidth;
      let target = index;
      // A short flick counts as much as a long drag.
      if (Math.abs(v) > 0.35) target = index + (v < 0 ? 1 : -1);
      else if (Math.abs(dx) > w * 0.28) target = index + (dx < 0 ? 1 : -1);
      goTo(Math.max(0, Math.min(target, list.length - 1)));
      hold();
    };

    vp.addEventListener('pointerdown', down);
    vp.addEventListener('pointermove', move, { passive: false });
    vp.addEventListener('pointerup', up);
    vp.addEventListener('pointercancel', up);
    return () => {
      vp.removeEventListener('pointerdown', down);
      vp.removeEventListener('pointermove', move);
      vp.removeEventListener('pointerup', up);
      vp.removeEventListener('pointercancel', up);
    };
  }, [index, slides, offsetFor, apply, goTo, hold]);

  /* Autoplay. */
  useEffect(() => {
    if (!interval) return;
    const timer = setInterval(() => {
      if (paused.current || document.hidden || !active.current) return;
      const list = slides();
      if (list.length < 2) return;
      setIndex((i) => {
        const n = (i + 1) % list.length;
        apply(offsetFor(n), true);
        return n;
      });
    }, interval);
    return () => clearInterval(timer);
  }, [interval, slides, offsetFor, apply]);

  useEffect(() => () => clearTimeout(resumeT.current), []);

  return { index, goTo, next, prev, count, viewportRef, trackRef, dragging };
}

/* Visible scroll indicators for the project strips.

   iOS only ever draws an overlay scrollbar — it flashes while a finger is
   down and reserves no space — and no combination of `scrollbar-width` or
   `::-webkit-scrollbar` changes that (measured: 0px reserved in every case).
   So the bar is drawn here instead: one element per strip, sized and moved
   from the scroller's own numbers, which behaves identically on every engine.

   The indicator is inserted after the strip it belongs to and removed on
   cleanup, so the markup for each project stays as it was. */
export function useStripScrollbars(selector, breakpoint = 820) {
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const made = [];

    const build = () => {
      for (const strip of document.querySelectorAll(selector)) {
        if (strip.dataset.stripBar) continue;
        const bar = document.createElement('div');
        bar.className = 'strip-scroll';
        bar.setAttribute('aria-hidden', 'true');
        bar.innerHTML = '<i></i>';
        const thumb = bar.firstChild;

        const sync = () => {
          const { scrollWidth: sw, clientWidth: cw, scrollLeft: sl } = strip;
          // Edge fades (home.css) only on a side that has more to scroll to.
          strip.classList.toggle('fade-l', sl > 1);
          strip.classList.toggle('fade-r', sl < sw - cw - 1);
          if (sw <= cw + 1) { bar.hidden = true; return; }
          bar.hidden = false;
          thumb.style.width = `${(cw / sw) * 100}%`;
          thumb.style.left = `${(sl / sw) * 100}%`;
        };

        strip.addEventListener('scroll', sync, { passive: true });
        window.addEventListener('resize', sync);
        strip.insertAdjacentElement('afterend', bar);
        strip.dataset.stripBar = '1';
        sync();
        made.push({ strip, bar, sync });
      }
    };

    const teardown = () => {
      for (const { strip, bar, sync } of made.splice(0)) {
        strip.removeEventListener('scroll', sync);
        window.removeEventListener('resize', sync);
        delete strip.dataset.stripBar;
        strip.classList.remove('fade-l', 'fade-r');
        bar.remove();
      }
    };

    const apply = () => { teardown(); if (mq.matches) build(); };
    apply();
    mq.addEventListener('change', apply);
    return () => { mq.removeEventListener('change', apply); teardown(); };
  }, [selector, breakpoint]);
}
