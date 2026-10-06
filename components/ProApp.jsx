"use client";

/* ProApp — TheNabLabs "Pro" v5 home page. Ported from legacy/pro-app-v4.jsx. */

import { useState, useEffect, useRef } from "react";
import { DATA } from "@/lib/data";
import { Icon, Social } from "@/lib/icons";
import {
  useRevealObserver,
  useScrollNav,
  useCountUp,
  useMobileNav,
  useSwipeCarousel,
  useStripScrollbars,
  scrollToId,
} from "@/lib/hooks";
import { brandOf } from "@/lib/brand";
import NabMark from "@/components/NabMark";
import ContactForm from "@/components/ContactForm";
import { cardLink } from "@/lib/links";
import { ProjectTitle, RoleChips } from "@/lib/title";
import BookingSection from "@/components/BookingSection";

const PRO_NAV = ["Services", "About", "Work", "Skills", "Contact"];

const PRO_SERVICE_CARDS = [
  {
    ico: "pen",
    t: "Product Design",
    d: "Research, flows and validated direction, from problem to shippable concept.",
  },
  {
    ico: "layers",
    t: "UI & Design Systems",
    d: "Pixel-precise, accessible interfaces and the component libraries behind them.",
  },
  {
    ico: "code",
    t: "Front-End Build",
    d: "Production React, Next.js & Angular that matches the design 1:1.",
  },
  {
    ico: "target",
    t: "Product Strategy",
    d: "Aligning business goals and user needs into a focused, shippable roadmap.",
  },
];

const PRO_SKILLS = [
  ["Product & UX Design", 96],
  ["UI Design & Design Systems", 94],
];

const PRO_CAPS = [
  [
    "01",
    "Product",
    "From early ideas and requirements to structure, user flows and product direction.",
  ],
  [
    "02",
    "Design",
    "Clear, intuitive interfaces and scalable design systems built around real users and real products.",
  ],
  [
    "03",
    "Development",
    "Production-ready front-end development that stays faithful to the design and the experience.",
  ],
  [
    "04",
    "Collaboration",
    "When a project needs additional expertise, we work with trusted specialists across back-end, branding, motion and other disciplines to bring the product together.",
  ],
];

const PRO_COUNTERS = [
  { n: 12, suf: "+", l: "Years of experience" },
  { n: 240, suf: "+", l: "Projects delivered" },
  { n: 60, suf: "+", l: "Happy clients & teams" },
  { n: 6, suf: "", l: "Industries served" },
];

const CONNECT_OPTIONS = [
  ["scheduler", "Book a call"],
  ["form", "Send a message"],
];

const PRO_REVIEWS = [
  {
    quote:
      "TheNabLabs is the rare partner that can lead a design critique in the morning and review a pull request in the afternoon, and improve both. They raised the bar for our whole product org.",
    name: "VP of Product",
    role: "Fintech Platform",
    av: "VP",
  },
  {
    quote:
      "They own the full product lifecycle. Strategy, research, polished UI, then a front-end that ships exactly as designed. Our velocity and quality both went up.",
    name: "VP of Engineering",
    role: "Enterprise SaaS",
    av: "VE",
  },
  {
    quote:
      "A truly product-minded team. They see the whole picture, and then build it.",
    name: "Design Lead",
    role: "SaaS Platform",
    av: "DL",
  },
];

function BrandIcon({ brand }) {
  switch (brand) {
    case "smartwealth":
      return (
        <span className="mt-ic sw">
          <i></i>
          <i></i>
          <i></i>
        </span>
      );
    case "alhilal":
      return (
        <span className="mt-ic ah">
          <span></span>
        </span>
      );
    case "wimsa":
      return (
        <span className="mt-ic wm">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M10 2h4v6h6v4h-6v10h-4V12H4V8h6z"
              transform="rotate(45 12 12)"
            />
          </svg>
        </span>
      );
    case "relatedapp":
      return <span className="mt-ic rl">R</span>;
    case "moods":
      return (
        <span className="mt-ic mz">
          <span>M</span>
        </span>
      );
    default:
      return null;
  }
}

function WorkMenu() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const closeT = useRef(null);
  const items = DATA.featured;

  const openNow = () => {
    clearTimeout(closeT.current);
    setOpen(true);
  };
  const closeSoon = () => {
    clearTimeout(closeT.current);
    closeT.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onDocClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onDocClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onDocClick);
      clearTimeout(closeT.current);
    };
  }, []);

  const onTrigger = (e) => {
    e.preventDefault();
    const noHover = window.matchMedia(
      "(hover: none), (pointer: coarse)",
    ).matches;
    if (noHover) {
      setOpen((o) => !o);
    } else {
      setOpen(false);
      scrollToId("work");
    }
  };

  return (
    <div
      className={"pnav-mega" + (open ? " open" : "")}
      ref={wrapRef}
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
    >
      <a
        href="#work"
        className="mega-trigger"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={onTrigger}
        onFocus={openNow}
      >
        Work <Icon name="chevronDown" />
      </a>
      <div className="mega-panel" role="menu" aria-label="Selected work">
        <div className="mega-head">
          <span className="eyebrow">Selected work</span>
        </div>
        <div className="mega-grid">
          {items.map((c) => {
            const brand = brandOf(c);
            const name = c.title.split("—")[0].trim();
            return (
              <a
                className="mega-card"
                key={c.title}
                href={c.link ? cardLink(c).href : "#work"}
                role="menuitem"
                onClick={(e) => {
                  if (!c.link) {
                    e.preventDefault();
                    setOpen(false);
                    scrollToId("work");
                  } else {
                    setOpen(false);
                  }
                }}
              >
                <span className="mega-thumb">
                  <span
                    className="work-card-art mt"
                    data-accent={c.accent}
                    data-brand={brand}
                  >
                    {(() => {
                      const FIXM = {
                        "/alhilal/home.jpg": "/alhilal/home-x.jpg",
                        "/alhilal/onb1.jpg": "/alhilal/onb1-x.jpg",
                      };
                      const fx = (s) => FIXM[s] || s;
                      const shot = fx(
                        c.img ||
                          (c.phones && c.phones[0]) ||
                          (c.web && c.web[0]),
                      );
                      const backShot = fx((c.phones && c.phones[1]) || shot);
                      if (!shot)
                        return (
                          <span className="mt-lockup">
                            <BrandIcon brand={brand} />
                          </span>
                        );
                      return c.phones ? (
                        <span className="dev dev-phones">
                          <span className="cphone back">
                            <span className="scr">
                              <img src={backShot} alt="" />
                            </span>
                          </span>
                          <span className="cphone front">
                            <span className="scr">
                              <img src={shot} alt={name} />
                            </span>
                          </span>
                        </span>
                      ) : (
                        <span className="dev dev-laptop">
                          <span className="dev-top">
                            <span className="dev-scr">
                              <img src={shot} alt={name} />
                            </span>
                          </span>
                          <span className="dev-base"></span>
                        </span>
                      );
                    })()}
                  </span>
                </span>
                <span className="mega-name">{name}</span>
                <span className="mega-ind">{c.ind}</span>
              </a>
            );
          })}
        </div>
        <div className="mega-foot">
          <a
            className="btn btn-primary btn-neon-host"
            href="/work"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            <span className="btn-neon" aria-hidden="true"></span>Explore all
            work <Icon name="arrowUpRight" />
          </a>
          <span className="pf-more-note">
            All {DATA.caseStudies.length} projects in the full archive
          </span>
        </div>
      </div>
    </div>
  );
}

function ProNav() {
  const { scrolled } = useScrollNav();
  const [menuOpen, setMenuOpen] = useMobileNav();
  const close = () => setMenuOpen(false);
  const jump = (id) => (e) => {
    e.preventDefault();
    close();
    scrollToId(id);
  };

  return (
    <nav
      className={`pnav${scrolled ? " scrolled" : ""}${menuOpen ? " menu-open" : ""}`}
    >
      <div className="pnav-inner">
        <a
          className="plogo"
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            close();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="mk">
            <NabMark id="mk-nav" />
          </span>
          <span className="plogo-txt">
            <span className="wm">
              the<span className="teal">Nab</span>Labs
            </span>
            <small>by Nabil Abou Rjeily</small>
          </span>
        </a>
        <div className="pnav-links">
          {PRO_NAV.map((n) =>
            n === "Work" ? (
              <WorkMenu key={n} />
            ) : (
              <a
                key={n}
                href={"#" + n.toLowerCase()}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(n.toLowerCase());
                }}
              >
                {n}
              </a>
            ),
          )}
        </div>
        <a
          className="btn btn-teal pnav-cta"
          href="#contact"
          onClick={jump("contact")}
        >
          <span className="btn-neon" aria-hidden="true"></span>Let’s talk
        </a>
        <button
          type="button"
          className="pnav-burger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="pnav-mobile"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      {/* Mobile navigation. Rendered at every width but only displayed below the
          nav breakpoint, where .pnav-links is hidden — without it the site has
          no navigation at all on phones and small tablets. */}
      <div id="pnav-mobile" className="pnav-mobile" hidden={!menuOpen}>
        <div className="pnav-mobile-inner">
          {PRO_NAV.map((n) => (
            <a
              key={n}
              href={"#" + n.toLowerCase()}
              onClick={jump(n.toLowerCase())}
            >
              {n}
            </a>
          ))}
          <div className="pnav-mobile-sub">
            <span className="pnav-mobile-label">Case studies</span>
            {DATA.featured.map((c) => (
              <a
                key={c.title}
                href={c.link ? cardLink(c).href : "#work"}
                onClick={close}
              >
                {c.title}
              </a>
            ))}
            <a className="pnav-mobile-all" href="/work" onClick={close}>
              Explore all work <Icon name="arrowUpRight" />
            </a>
          </div>
          <a
            className="btn btn-teal pnav-mobile-cta"
            href="#contact"
            onClick={jump("contact")}
          >
            Let’s talk <Icon name="arrowUpRight" />
          </a>
        </div>
      </div>
      <button
        type="button"
        className="pnav-scrim"
        hidden={!menuOpen}
        tabIndex={-1}
        aria-hidden="true"
        onClick={close}
      ></button>
    </nav>
  );
}

/* ---------- General brand hero — rotating statement + availability ----------
   The kicker/headline pairs live in DATA.hero and cross-fade on a timer. Every
   pair is rendered stacked in the same grid cell, so the block is always as
   tall as the longest line and nothing shifts as they swap. */
const HERO_INTERVAL = 4200;

function ProHeroGeneral() {
  const { lines, devices, web, web2, lead } = DATA.hero;
  const [i, setI] = useState(0);
  /* Six slides either way, but not the same six: desktop shows the Moods
     browser frame plus the five placed phones, the carousel drops that frame
     and opens on the SmartWealth home screen instead. Both are rendered; CSS
     decides which is in play, and the carousel measures what is visible. */
  const {
    index: slide,
    goTo: goToSlide,
    count: slideCount,
    viewportRef,
    trackRef,
  } = useSwipeCarousel({ interval: 3800 });

  useEffect(() => {
    if (lines.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(
      () => setI((n) => (n + 1) % lines.length),
      HERO_INTERVAL,
    );
    return () => clearInterval(t);
  }, [lines.length]);

  return (
    <header className="phero hero-v2 in" id="top">
      {/* Ambient motion behind the hero — drifting light, a slow diagonal sweep
          and a few floating sparks. Purely decorative; all of it stops under
          prefers-reduced-motion (see .hero-fx in app/(home)/home.css). */}
      <div className="hero-fx" aria-hidden="true">
        <span className="hero-orb o1" />
        <span className="hero-orb o2" />
        <span className="hero-orb o3" />
        <span className="hero-sweep" />
        <span className="hero-sparks">
          {Array.from({ length: 18 }, (_, n) => (
            <i key={n} style={{ "--n": n }} />
          ))}
        </span>
      </div>

      <div className="wrap hero-stack">
        {/* The page's one H1 is this static line, not the rotating statements
            below: those all sit in the markup at once, so as a heading they
            read to search engines as five slogans run together, none of which
            says what the studio does. */}
        <h1 className="hero-kicks">
          <span className="hero-kick on">Product Design &amp; UX Engineering</span>
        </h1>

        <p className="hero-heads">
          {lines.map((l, n) => (
            <span
              className={"hero-head" + (n === i ? " on" : "")}
              key={l.kick}
              aria-hidden={n !== i}
            >
              {l.head}
            </span>
          ))}
        </p>

        {/* Desktop floats these absolutely; at 1024px and below the same nodes
            become a scroll-snap carousel so each mockup can be shown at full
            height rather than shrunk to a four-across row.

            Two slides are width-specific. The lead phone opens the carousel on
            the SmartWealth home screen and has no place in the desktop
            arrangement, whose coordinates are hand-tuned; the Moods browser
            frame is the reverse — it anchors the desktop composition but is the
            one mockup that cannot fill a track sized for portrait phones, so a
            handset gets phones only. Each is hidden by CSS at the width where
            it does not belong. */}
        <div
          className="hero-devices"
          ref={viewportRef}
          role="group"
          aria-roledescription="carousel"
          aria-label="Product mockups"
        >
          <div className="hero-track" ref={trackRef}>
            <span className="hero-phone hero-phone-lead">
              <span className="s">
                <img src={lead.src} alt={lead.alt} draggable="false" />
              </span>
            </span>
            {devices.map((d, n) => (
              <span
                className="hero-phone"
                key={d.src}
                style={{
                  "--i": n + 1,
                  "--l": d.l,
                  "--t": d.t,
                  "--w": d.w,
                  "--z": d.z,
                }}
              >
                <span className="s">
                  <img src={d.src} alt={d.alt} draggable="false" />
                </span>
              </span>
            ))}
            <span
              className={"hero-web" + (web.chrome ? " has-chrome" : "")}
              style={{ "--i": 0 }}
            >
              {!web.chrome && (
                <span className="bar" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              )}
              <span className="s">
                <img src={web.src} alt={web.alt} draggable="false" />
              </span>
            </span>
            {web2 && (
              <span className="hero-web hero-web-2" style={{ "--i": 6 }}>
                <span className="bar" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="s">
                  <img src={web2.src} alt={web2.alt} draggable="false" />
                </span>
              </span>
            )}
          </div>
        </div>

        <div className="hero-dots">
          {Array.from({ length: slideCount }, (_, n) => (
            <button
              key={n}
              type="button"
              className={"hero-dot" + (n === slide ? " on" : "")}
              aria-label={`Show mockup ${n + 1} of ${slideCount}`}
              aria-current={n === slide}
              onClick={() => goToSlide(n)}
            />
          ))}
        </div>
      </div>
    </header>
  );
}

function ProStrip() {
  const items = DATA.disciplines;
  return (
    <div className="pstrip" aria-hidden="true">
      <div className="pstrip-track">
        {[0, 1].map((k) => (
          <span key={k}>
            {items.map((it) => (
              <b key={it}>{it}</b>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

const TAG_ICON_PATHS = {
  "User research": "users-three",
  Wireframes: "layout",
  "User flows": "flow-arrow",
  Prototyping: "device-mobile",
  "Journey mapping": "path",
  "Usability testing": "flask",
  Figma: "figma-logo",
  "Interaction design": "cursor-click",
  "Design systems": "squares-four",
  Accessibility: "person-arms-spread",
  "Design tokens": "swatches",
  "Responsive UI": "devices",
  React: "atom",
  "Next.js": "triangle",
  Angular: "angular-logo",
  TypeScript: "file-ts",
  Tailwind: "wind",
  Git: "git-branch",
  "Business goals": "target",
  "User needs": "heart",
  "Feature planning": "kanban",
  Metrics: "chart-line-up",
  Roadmapping: "map-trifold",
  Workshops: "presentation-chart",
};

const TAG_TINT = {
  "User research": "#E7663F",
  Wireframes: "#3F7FE7",
  "User flows": "#7A5CE0",
  Prototyping: "#1BB0CE",
  "Journey mapping": "#35B37E",
  "Usability testing": "#D96BA8",
  Figma: "#E0457B",
  "Interaction design": "#F0A22E",
  "Design systems": "#2FA36B",
  Accessibility: "#4A6CF0",
  "Design tokens": "#9B6BE0",
  "Responsive UI": "#29B6C9",
  React: "#31A8D8",
  "Next.js": "#8A8F98",
  Angular: "#D93A5C",
  TypeScript: "#3178C6",
  Tailwind: "#38BDF8",
  Git: "#F1502F",
  "Business goals": "#C9A227",
  "User needs": "#E05252",
  "Feature planning": "#5B8DEF",
  Metrics: "#A3D63B",
  Roadmapping: "#38B2AC",
  Workshops: "#B57BE0",
};

/* A section that becomes a swipeable carousel on phones and stays the layout
   it already had above the breakpoint. The viewport is display:contents up
   there, so the track keeps whatever class the section used to carry and the
   desktop CSS goes on applying to it untouched. */
function TouchCarousel({ trackClass, label, children, arrows = true }) {
  const { index, goTo, next, prev, count, viewportRef, trackRef } =
    useSwipeCarousel();
  return (
    <div className="tcar">
      <div
        className="tcar-vp"
        ref={viewportRef}
        role="group"
        aria-roledescription="carousel"
        aria-label={label}
      >
        <div className={"tcar-track " + trackClass} ref={trackRef}>
          {children}
        </div>
      </div>
      {arrows && (
        <div className="tcar-nav" aria-hidden={count < 2}>
          <button
            type="button"
            className="tcar-arrow"
            onClick={prev}
            disabled={index <= 0}
            aria-label={`Previous ${label}`}
          >
            <Icon name="arrowLeft" />
          </button>
          <span className="tcar-count">
            {Math.min(index + 1, count || 1)} / {count || 1}
          </span>
          <button
            type="button"
            className="tcar-arrow"
            onClick={next}
            disabled={index >= count - 1}
            aria-label={`Next ${label}`}
          >
            <Icon name="arrowRight" />
          </button>
        </div>
      )}
    </div>
  );
}

function TagIcon({ tag }) {
  return (
    <i
      className={"ph ph-" + (TAG_ICON_PATHS[tag] || "circle")}
      aria-hidden="true"
    ></i>
  );
}

function ProServices() {
  return (
    <section className="section" id="services">
      <div className="wrap">
        <div
          className="reveal"
          style={{ maxWidth: 680, marginBottom: "clamp(30px,4vw,52px)" }}
        >
          <span className="eyebrow">Services</span>
          <h2 className="h-sec">
            Services built around the <span className="teal">whole</span>{" "}
            product.
          </h2>
        </div>
        <TouchCarousel trackClass="svc-list reveal reveal-d1" label="Services">
          {DATA.expertise.map((e, i) => (
            <div className="svc-row" key={e.title}>
              <span className="no">0{i + 1}</span>
              <span className="nm">{e.title}</span>
              <span className="svc-tags">
                {e.tags.map((t) => (
                  <span
                    className="svc-tag"
                    key={t}
                    data-tip={t}
                    style={{ "--tint": TAG_TINT[t] || "var(--teal)" }}
                  >
                    <span
                      className="svc-shield"
                      style={{ "--tint": TAG_TINT[t] || "var(--teal)" }}
                    >
                      <TagIcon tag={t} />
                    </span>
                    <span className="svc-tag-label">{t}</span>
                  </span>
                ))}
              </span>
            </div>
          ))}
        </TouchCarousel>
      </div>
    </section>
  );
}

function ProServiceCards() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head-center reveal">
          <span className="eyebrow center">Process</span>
          <h2 className="h-sec">From first sketch to shipped front-end.</h2>
        </div>
        <div className="scards reveal reveal-d1">
          {PRO_SERVICE_CARDS.map((c) => (
            <article className="scard" key={c.t}>
              <span className="sc-ic">
                <Icon name={c.ico} />
              </span>
              <h4>{c.t}</h4>
              <p>{c.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- About the studio (company voice, no personal bio) ---------- */
function ProAbout() {
  return (
    <section className="section" id="about">
      <div className="wrap approach">
        <div className="approach-art reveal">
          <div className="studio-mix">
            <img
              className="studio-mix-photo"
              src="/assets/nabil-studio.jpeg"
              alt="Nabil"
            />
            <span className="studio-mix-mark" aria-hidden="true">
              N
            </span>
            <span className="studio-mix-badge">
              <span className="mk">
                <NabMark id="mk-badge" />
              </span>
              <span>
                the<span className="teal">Nab</span>Labs
              </span>
            </span>
          </div>
          <div className="approach-stat">
            <div className="n">
              12+<span className="u">years</span>
            </div>
            <div className="l">design → ship</div>
          </div>
        </div>
        <div className="reveal reveal-d1">
          <span className="eyebrow">About</span>
          <h2 className="h-sec" style={{ marginTop: 14 }}>
            From product idea to polished experience.
          </h2>
          <p className="sec-sub">
            Hello 👋 I’m Nabil Abou Rjeily, a Senior Product Designer and UX
            Engineer, and founder of theNabLabs. I’ve spent 12+ years in the
            digital field, designing and building products across fintech,
            SaaS, enterprise and more. We’re an independent studio that takes
            products the whole way: strategy, product design, interface and
            motion, development and launch, bringing every step under one roof
            so ideas ship as products people love, with nothing lost in between.
          </p>
          <p className="sec-sub" style={{ marginTop: 14 }}>
            <b style={{ color: "var(--ink)" }}>
              A studio that scales with the project.
            </b>{" "}
            Trusted specialists join when needed, from back-end development to
            motion, branding and beyond.
          </p>
        </div>
      </div>
    </section>
  );
}

function ProSkills() {
  return (
    <section className="section" id="skills">
      <div className="wrap skills-wrap">
        <div className="reveal">
          <span className="eyebrow">Capabilities</span>
          <h2 className="h-sec">
            From idea to interface to something people can use.
          </h2>
          <p className="sec-sub">
            The Nablab brings together product thinking, design and front-end
            development to turn ideas into thoughtful digital experiences.
          </p>
          <a
            className="btn btn-primary btn-neon-host"
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("contact");
            }}
            style={{ marginTop: 28 }}
          >
            <span className="btn-neon" aria-hidden="true"></span>Start a project
          </a>
        </div>
        <TouchCarousel
          trackClass="cap-list reveal reveal-d1"
          label="Capabilities"
        >
          {PRO_CAPS.map(([num, title, desc]) => (
            <div className="cap-item" key={num}>
              <span className="cap-num">
                {num} — {title}
              </span>
              <p>{desc}</p>
            </div>
          ))}
        </TouchCarousel>
      </div>
    </section>
  );
}

function Counter({ n, suf, l }) {
  const [val, ref] = useCountUp(n);
  return (
    <div className="counter" ref={ref}>
      <div className="n">
        {val}
        <span className="teal">{suf}</span>
      </div>
      <div className="l">{l}</div>
    </div>
  );
}

function ProCounters() {
  return (
    <section
      className="section"
      style={{ paddingBlock: "clamp(20px,3vw,40px)" }}
    >
      <div className="wrap">
        <div className="counters reveal">
          {PRO_COUNTERS.map((c) => (
            <Counter key={c.l} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}

const PROJECT_ACCENT = {
  SmartWealth: "#b6f13a",
  "Al Hilal": "#ff1f6a",
  Wimsa: "#12b5a6",
  Related: "#e8a33d",
  Base360: "#6D5EFF",
  Moods: "#c66bff",
  Gaia: "#2ff3ff",
  Msheireb: "#5b8def",
  Discotek: "#ff3ba7",
  Locus: "#3fa9f5",
  Goalpot: "#2fd07a",
  Barley: "#e0552b",
};
function accentOf(title) {
  const k = Object.keys(PROJECT_ACCENT).find(
    (n) => (title || "").indexOf(n) === 0,
  );
  return PROJECT_ACCENT[k] || "var(--teal)";
}

const PROJECT_STRIPS =
  ".pf-art.phones-art .pf-phones, .pf-banner-art.three .ahb-phones," +
  " .wimsa-stage > .wm-phones, .moods-stage";

function ProPortfolio() {
  useStripScrollbars(PROJECT_STRIPS);
  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="sec-head-split reveal">
          <div>
            <span className="eyebrow">Selected work</span>
            <h2 className="h-sec">Projects we’re proud of.</h2>
          </div>
          <a className="btn btn-primary btn-neon-host" href="/work">
            <span className="btn-neon" aria-hidden="true"></span>Explore all
            work <Icon name="arrowUpRight" />
          </a>
        </div>
        <div className="pf-list">
          {DATA.featured.map((c, i) => {
            const link = cardLink(c);
            return c.weblab ? (
              <article
                style={{ "--pacc": accentOf(c.title) }}
                className="pf-item pf-showcase-item reveal"
                key={c.title}
              >
                <div className="wimsa-block">
                  <div className="wimsa-head">
                    <div className="pf-no moods-no">
                      PROJECT 0{i + 1} · {c.ind}
                    </div>
                    <h3>
                      <ProjectTitle title={c.title} />
                    </h3>
                    <p>{c.desc}</p>
                    <div className="pf-tags">
                      <RoleChips role={c.role} />
                      {/* the discipline tags; the industry ones that close each
                         list already read in the kicker above the title */}
                      {(c.tags || []).slice(0, 4).map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    {c.link && (
                      <a
                        className="pf-link"
                        style={{ "--pacc": accentOf(c.title) }}
                        href={link.href}
                      >
                        {link.label}{" "}
                        <span className="ar">
                          <Icon name="arrowUpRight" />
                        </span>
                      </a>
                    )}
                  </div>
                  <div className="moods-stage">
                    <span className="ml-glow" aria-hidden="true"></span>
                    <span className="ml-laptop back">
                      <span className="scr">
                        <img
                          src={c.web[1]}
                          alt={c.title + " — AI chat & product suggestions"}
                        />
                      </span>
                    </span>
                    <span className="ml-laptop front">
                      <span className="scr">
                        <img src={c.web[0]} alt={c.title + " — home"} />
                      </span>
                    </span>
                  </div>
                </div>
              </article>
            ) : c.showcase ? (
              <article
                style={{ "--pacc": accentOf(c.title) }}
                className="pf-item pf-showcase-item reveal"
                key={c.title}
              >
                <div className="wimsa-block wimsa-stacked">
                  <div className="wimsa-head">
                    <div className="pf-no wimsa-no">
                      PROJECT 0{i + 1} · {c.ind}
                    </div>
                    <h3>
                      <ProjectTitle title={c.title} />
                    </h3>
                    <p>{c.desc}</p>
                  </div>
                  <div className="wimsa-stage">
                    <span className="wm-monitor">
                      <span className="scr">
                        <img
                          src={c.web[0]}
                          alt={c.title + " web — scheduler"}
                        />
                      </span>
                    </span>
                    <span className="wm-laptop">
                      <span className="scr">
                        <img src={c.web[1]} alt={c.title + " web — orders"} />
                      </span>
                    </span>
                    <span className="wm-phones">
                      <span className="wm-phone p2">
                        <span className="scr">
                          <img src={c.mobile[1]} alt="" />
                        </span>
                      </span>
                      <span className="wm-phone p1">
                        <span className="scr">
                          <img src={c.mobile[0]} alt={c.title + " mobile"} />
                        </span>
                      </span>
                    </span>
                  </div>
                  <div className="wimsa-foot">
                    <div className="pf-tags">
                      <RoleChips role={c.role} />
                      {/* the discipline tags; the industry ones that close each
                         list already read in the kicker above the title */}
                      {(c.tags || []).slice(0, 4).map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    {c.link && (
                      <a
                        className="pf-link"
                        style={{ "--pacc": accentOf(c.title) }}
                        href={link.href}
                      >
                        {link.label}{" "}
                        <span className="ar">
                          <Icon name="arrowUpRight" />
                        </span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ) : c.banner ? (
              <article
                style={{ "--pacc": accentOf(c.title) }}
                className="pf-item pf-banner-item reveal"
                key={c.title}
              >
                <div className="pf-banner" data-brand={brandOf(c)}>
                  <span
                    className="pf-banner-glow g-a"
                    aria-hidden="true"
                  ></span>
                  <span
                    className="pf-banner-glow g-b"
                    aria-hidden="true"
                  ></span>
                  <div className="pf-banner-copy">
                    <div className="pf-no on-dark">
                      PROJECT 0{i + 1} · {c.ind}
                    </div>
                    <h3>
                      <ProjectTitle title={c.title} />
                    </h3>
                    <div className="pf-tags on-dark">
                      <RoleChips role={c.role} />
                      {/* the discipline tags; the industry ones that close each
                         list already read in the kicker above the title */}
                      {(c.tags || []).slice(0, 4).map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    <p>{c.desc}</p>
                    {c.link ? (
                      <a
                        className="pf-link on-dark"
                        style={{ "--pacc": accentOf(c.title) }}
                        href={link.href}
                      >
                        {link.label}{" "}
                        <span className="ar">
                          <Icon name="arrowUpRight" />
                        </span>
                      </a>
                    ) : (
                      <span
                        className="pf-link on-dark"
                        style={{ "--pacc": accentOf(c.title), opacity: 0.9 }}
                      >
                        Case study coming soon{" "}
                        <span className="ar">
                          <Icon name="arrowUpRight" />
                        </span>
                      </span>
                    )}
                  </div>
                  {c.phones ? (
                    <div className="pf-banner-art three">
                      <span className="ahb-phones">
                        <span className="ahb-phone side left">
                          <span className="scr">
                            <img src={c.phones[2]} alt="" />
                          </span>
                        </span>
                        <span className="ahb-phone side right">
                          <span className="scr">
                            <img src={c.phones[1]} alt="" />
                          </span>
                        </span>
                        <span
                          className={
                            "ahb-phone main" + (c.video ? " video" : "")
                          }
                        >
                          {c.video ? (
                            <img
                              className="ahb-live"
                              src={c.video}
                              alt={c.title}
                            />
                          ) : (
                            <span className="scr">
                              <img src={c.phones[0]} alt={c.title} />
                            </span>
                          )}
                        </span>
                      </span>
                    </div>
                  ) : (
                    /* web products get the laptop pair instead of the phone fan */
                    <div className="pf-banner-art laptops">
                      <span className="ml-glow" aria-hidden="true"></span>
                      <span className="ml-laptop back">
                        <span className="scr">
                          <img src={c.web[1]} alt={c.title + " — dashboard"} />
                        </span>
                      </span>
                      <span className="ml-laptop front">
                        <span className="scr">
                          <img
                            src={c.web[0]}
                            alt={c.title + " — landing page"}
                          />
                        </span>
                      </span>
                    </div>
                  )}
                </div>
              </article>
            ) : (
              <article
                style={{ "--pacc": accentOf(c.title) }}
                className="pf-item reveal"
                key={c.title}
              >
                <div
                  className={
                    "pf-art" +
                    (c.phones ? " phones-art" : c.img ? " has-img" : "")
                  }
                >
                  {c.phones ? (
                    <a
                      href={link.href}
                      aria-label={c.title}
                      className="pf-phones"
                    >
                      {c.featured && (
                        <span className="pf-badge">
                          Featured · live showcase
                        </span>
                      )}
                      <span className="pf-phone back">
                        <span className="scr">
                          <img src={c.phones[1]} alt="" />
                        </span>
                      </span>
                      <span className="pf-phone front">
                        <span className="scr">
                          <img src={c.phones[0]} alt={c.title} />
                        </span>
                      </span>
                    </a>
                  ) : c.img ? (
                    <a href={link.href} aria-label={c.title}>
                      <img src={c.img} alt={c.title} className="pf-img" />
                      {c.featured && (
                        <span className="pf-badge">
                          Featured · live showcase
                        </span>
                      )}
                    </a>
                  ) : (
                    <div
                      className="ph"
                      aria-hidden="true"
                      style={{
                        background: `linear-gradient(150deg, color-mix(in oklab, var(--teal) ${18 + i * 6}%, var(--cream-2)), var(--cream-2))`,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          left: "10%",
                          top: "12%",
                          right: "10%",
                          height: "16%",
                          borderRadius: 12,
                          background: "var(--paper)",
                          boxShadow: "0 16px 34px -20px rgba(0,0,0,.3)",
                        }}
                      ></div>
                      <div
                        style={{
                          position: "absolute",
                          left: "10%",
                          top: "36%",
                          width: "42%",
                          bottom: "12%",
                          borderRadius: 12,
                          background: "var(--teal)",
                        }}
                      ></div>
                      <div
                        style={{
                          position: "absolute",
                          right: "10%",
                          top: "36%",
                          width: "34%",
                          height: "30%",
                          borderRadius: 12,
                          background: "var(--paper)",
                        }}
                      ></div>
                      <div
                        style={{
                          position: "absolute",
                          right: "10%",
                          bottom: "12%",
                          width: "34%",
                          height: "18%",
                          borderRadius: 12,
                          background: "var(--sand)",
                        }}
                      ></div>
                    </div>
                  )}
                </div>
                <div>
                  <div className="pf-no">
                    PROJECT 0{i + 1} · {c.ind}
                  </div>
                  <h3>
                    <ProjectTitle title={c.title} />
                  </h3>
                  <div className="pf-tags">
                    <RoleChips role={c.role} />
                    {/* the discipline tags; the industry ones that close each
                       list already read in the kicker above the title */}
                    {(c.tags || []).slice(0, 4).map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <p>{c.desc}</p>
                  {c.link ? (
                    <a
                      className="pf-link"
                      style={{ "--pacc": accentOf(c.title) }}
                      href={link.href}
                    >
                      {link.label}{" "}
                      <span className="ar">
                        <Icon name="arrowUpRight" />
                      </span>
                    </a>
                  ) : (
                    <span
                      className="pf-link"
                      style={{ "--pacc": accentOf(c.title), opacity: 0.6 }}
                    >
                      Case study coming soon{" "}
                      <span className="ar">
                        <Icon name="arrowUpRight" />
                      </span>
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
        <div className="pf-more reveal">
          <a className="btn btn-primary btn-neon-host" href="/work">
            <span className="btn-neon" aria-hidden="true"></span>Explore all
            work <Icon name="arrowUpRight" />
          </a>
          <span className="pf-more-note">
            {DATA.caseStudies.length} projects in the full archive
          </span>
        </div>
      </div>
    </section>
  );
}

function ProReviews() {
  return (
    <section className="section" id="reviews">
      <div className="wrap">
        <div className="sec-head-center reveal">
          <span className="eyebrow center">Kind words</span>
          <h2 className="h-sec">What clients &amp; teams say.</h2>
        </div>
        <div className="tcards reveal reveal-d1">
          {PRO_REVIEWS.map((t, i) => (
            <figure className="tcard" key={i}>
              <div className="stars">★★★★★</div>
              <p>“{t.quote}”</p>
              <figcaption className="by">
                <span className="av">{t.av}</span>
                <span>
                  <b>{t.name}</b>
                  <span>{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProCTA() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="cta reveal">
          <span className="cta-neon" aria-hidden="true"></span>
          <div className="cta-in">
            <span className="eyebrow center">Get in touch</span>
            <h2>Let’s work together.</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ProConnect — one switch over the two ways to get in touch. The scheduler is
   the default; only the chosen panel is mounted, so the booking section never
   fetches availability while the message form is showing. This wrapper also
   carries #contact, since the nav and the hero CTAs scroll to it and the form
   is no longer always in the document. */
function ProConnect() {
  const [view, setView] = useState("scheduler");
  /* The panel below is swapped in after ProApp's own reveal pass has run, and
     switching views only re-renders this component — so observe again here, or
     the freshly mounted .reveal nodes stay at opacity:0. */
  useRevealObserver();
  return (
    <div className="connect" id="contact">
      {/* Two slow light pools and nothing else — there is a form and a calendar
          to read here, so this stays at the edge of noticeable. See .connect-fx. */}
      <div className="connect-fx" aria-hidden="true">
        <span className="connect-orb c1" />
        <span className="connect-orb c2" />
      </div>

      <div className="wrap">
        <div
          className="cswitch reveal"
          role="group"
          aria-label="How would you like to get in touch?"
        >
          <span
            className={"cswitch-thumb" + (view === "form" ? " right" : "")}
            aria-hidden="true"
          />
          {CONNECT_OPTIONS.map(([id, label]) => (
            <button
              type="button"
              key={id}
              className={"cswitch-opt" + (view === id ? " on" : "")}
              aria-pressed={view === id}
              onClick={() => setView(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      {view === "scheduler" ? <BookingSection /> : <ProCTA />}
    </div>
  );
}

function ProFooter() {
  return (
    <footer className="pfooter">
      <div className="wrap">
        <div className="pfooter-top">
          <a
            className="plogo"
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="mk">
              <NabMark id="mk-foot" />
            </span>
            <span>
              the<span className="teal">Nab</span>Labs
            </span>
          </a>
          <div className="pfooter-links">
            {PRO_NAV.map((n) =>
              n === "Work" ? (
                <a key={n} href="/work">
                  {n}
                </a>
              ) : (
                <a
                  key={n}
                  href={"#" + n.toLowerCase()}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(n.toLowerCase());
                  }}
                >
                  {n}
                </a>
              ),
            )}
          </div>
        </div>
        <div className="pfooter-bottom">
          <span>© 2026 TheNabLabs</span>
          <span className="pfooter-tag">
            <span style={{ color: "#19b7d1" }}>Designing</span> products.{" "}
            <span style={{ color: "#8b6bff" }}>Engineering</span> experiences.
          </span>
          <div className="socials">
            <a
              href="https://www.linkedin.com/in/nabil-abou-rjeily-b033a698"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Social name="linkedin" />
            </a>
            <a
              href="https://www.behance.net/nabil_abourjeily"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Behance"
            >
              <Social name="behance" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ProApp() {
  useRevealObserver();
  return (
    <>
      <ProNav />
      <ProHeroGeneral />
      <ProStrip />
      <ProServices />
      <ProAbout />
      <ProSkills />
      <ProPortfolio />
      <ProConnect />
      <ProFooter />
    </>
  );
}

export default ProApp;
