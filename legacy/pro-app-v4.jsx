/* pro-app-v2.jsx — TheNabLab "Pro" v2. Restructured: general hero → services → about-me. */
const { useState, useEffect, useRef } = React;

const PRO_NAV = ["Services", "About", "Work", "Skills", "Contact"];

const PRO_SERVICE_CARDS = [
  {
    ico: "pen",
    t: "Product Design",
    d: "Research, flows and validated direction — from problem to shippable concept.",
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
    "When a project needs additional expertise, I work with trusted specialists across back-end, branding, motion and other disciplines to bring the product together.",
  ],
];

const PRO_COUNTERS = [
  { n: 12, suf: "+", l: "Years of experience" },
  { n: 240, suf: "+", l: "Projects delivered" },
  { n: 60, suf: "+", l: "Happy clients & teams" },
  { n: 6, suf: "", l: "Industries served" },
];

const PRO_REVIEWS = [
  {
    quote:
      "TheNabLab is the rare partner that can lead a design critique in the morning and review a pull request in the afternoon — and improve both. They raised the bar for our whole product org.",
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
      "A truly product-minded team. They see the whole picture — and then build it.",
    name: "Design Lead",
    role: "SaaS Platform",
    av: "DL",
  },
];

/* count-up when scrolled into view */
function useCountUp(target, dur = 1600) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf,
      started = false;
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            const t0 = performance.now();
            const tick = (t) => {
              const p = Math.min(1, (t - t0) / dur);
              const e2 = 1 - Math.pow(1 - p, 3);
              setVal(Math.round(target * e2));
              if (p < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, dur]);
  return [val, ref];
}

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
  const items = DATA.caseStudies.slice(0, 5);

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
          <a className="mega-all-link" href="All Work.html" role="menuitem">
            View archive <Icon name="arrowUpRight" />
          </a>
        </div>
        <div className="mega-grid">
          {items.map((c) => {
            const brand = (
              c.img ||
              (c.phones && c.phones[0]) ||
              (c.web && c.web[0]) ||
              c.href ||
              ""
            ).split("/")[0];
            const name = c.title.split("—")[0].trim();
            return (
              <a
                className="mega-card"
                key={c.title}
                href={c.link ? c.href : "#work"}
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
                        "alhilal/home.jpg": "alhilal/home-x.jpg",
                        "alhilal/onb1.jpg": "alhilal/onb1-x.jpg",
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
            href="All Work.html"
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
  return (
    <nav className={`pnav${scrolled ? " scrolled" : ""}`}>
      <div className="pnav-inner">
        <a
          className="plogo"
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="mk">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6.6 18.4V6.6c0-.6.7-.9 1.1-.4l8.6 10.6V5.6"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="16.3" cy="5.6" r="2.1" fill="currentColor" />
            </svg>
          </span>
          <span className="plogo-txt">
            <span className="wm">
              the<span className="teal">Nab</span>Lab
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
          className="btn btn-teal"
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("contact");
          }}
          style={{ padding: "12px 22px" }}
        >
          <span className="btn-neon" aria-hidden="true"></span>Let’s talk
        </a>
      </div>
    </nav>
  );
}

/* ---------- General brand hero (statement-led, no personal bio) ---------- */
function ProHeroGeneral() {
  return (
    <header className="phero gphero line-reveal in" id="top">
      <div className="wrap phero-inner">
        <div className="phero-text">
          <span className="phero-eyebrow">
            <span className="dot-avail"></span> Product design &amp; front-end
            engineering
          </span>
          <h1>
            <span className="line-mask">
              <span>
                <span style={{ color: "#19b7d1" }}>Designing</span> products.
              </span>
            </span>
            <span className="line-mask">
              <span>
                <span style={{ color: "#8b6bff" }}>Engineering</span>{" "}
                experiences.
              </span>
            </span>
          </h1>
          <p className="lede">
            TheNabLab pairs product strategy, interface design and front-end
            engineering in one place — so ideas ship as products people love,
            with nothing lost in handoff.
          </p>
          <div className="phero-cta">
            <a
              className="btn btn-teal"
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("work");
              }}
            >
              <span className="btn-neon" aria-hidden="true"></span>View my work{" "}
              <Icon name="arrowRight" />
            </a>
          </div>
        </div>

        <div className="phero-art">
          <div className="gbrowser">
            <img
              src="base360/dashboard.png"
              alt="Product work — Base360 AI conversation platform"
            />
          </div>
          <div className="gphone2">
            <span className="s">
              <img
                src="alhilal/home-crop.jpg"
                alt="Product work — Al Hilal banking app"
              />
            </span>
          </div>
          <div className="gphone">
            <span className="s">
              <img
                src="smartwealth/screens/01-splash.jpg"
                alt="Product work — SmartWealth investing app"
              />
            </span>
          </div>
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
  Figma: "figma-logo",
  "Interaction design": "cursor-click",
  "Design systems": "squares-four",
  Accessibility: "person-arms-spread",
  React: "atom",
  "Next.js": "triangle",
  Angular: "shield-check",
  TypeScript: "file-ts",
  "Business goals": "target",
  "User needs": "heart",
  "Feature planning": "kanban",
  Metrics: "chart-line-up",
};

const TAG_TINT = {
  "User research": "#E7663F",
  Wireframes: "#3F7FE7",
  "User flows": "#7A5CE0",
  Prototyping: "#1BB0CE",
  Figma: "#E0457B",
  "Interaction design": "#F0A22E",
  "Design systems": "#2FA36B",
  Accessibility: "#4A6CF0",
  React: "#31A8D8",
  "Next.js": "#8A8F98",
  Angular: "#D93A5C",
  TypeScript: "#3178C6",
  "Business goals": "#C9A227",
  "User needs": "#E05252",
  "Feature planning": "#5B8DEF",
  Metrics: "#A3D63B",
};

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
        <div className="svc-list reveal reveal-d1">
          {DATA.expertise.map((e, i) => (
            <div className="svc-row" key={e.title}>
              <span className="no">0{i + 1}</span>
              <span className="nm">{e.title}</span>
              <span className="svc-tags">
                {e.tags.map((t) => (
                  <span className="svc-tag" key={t} data-tip={t}>
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
        </div>
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
              src="assets/nabil-studio.jpeg"
              alt="Nabil"
            />
            <span className="studio-mix-mark" aria-hidden="true">
              N
            </span>
            <span className="studio-mix-badge">
              <span className="mk">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M6.6 18.4V6.6c0-.6.7-.9 1.1-.4l8.6 10.6V5.6"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="16.3" cy="5.6" r="2.1" fill="currentColor" />
                </svg>
              </span>
              <span>
                the<span className="teal">Nab</span>Lab
              </span>
            </span>
          </div>
          <div className="approach-stat">
            <div className="n">12+</div>
            <div className="l">years, design → ship</div>
          </div>
        </div>
        <div className="reveal reveal-d1">
          <span className="eyebrow">About</span>
          <h2 className="h-sec" style={{ marginTop: 14 }}>
            From product idea to polished experience.
          </h2>
          <p className="sec-sub">
            The Nablab is an independent product design and front-end studio
            founded by Nabil, bringing strategy, interface design and
            engineering under one roof, so ideas ship as products people love,
            with nothing lost between design and build.
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
            <span className="btn-neon" aria-hidden="true"></span>Start a project{" "}
            <Icon name="arrowRight" />
          </a>
        </div>
        <div className="cap-list reveal reveal-d1">
          {PRO_CAPS.map(([num, title, desc]) => (
            <div className="cap-item" key={num}>
              <span className="cap-num">
                {num} — {title}
              </span>
              <p>{desc}</p>
            </div>
          ))}
        </div>
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
  Moodz: "#c66bff",
  Gaia: "#2ff3ff",
  Msheireb: "#5b8def",
  Discotek: "#ff3ba7",
  Locus: "#3fa9f5",
  FootyCash: "#2fd07a",
  Barley: "#e0552b",
};
function accentOf(title) {
  const k = Object.keys(PROJECT_ACCENT).find(
    (n) => (title || "").indexOf(n) === 0,
  );
  return PROJECT_ACCENT[k] || "var(--teal)";
}

function ProPortfolio() {
  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="sec-head-center reveal">
          <span className="eyebrow center">Selected work</span>
          <h2 className="h-sec">Projects we’re proud of.</h2>
        </div>
        <div className="pf-list">
          {DATA.caseStudies.slice(0, 5).map((c, i) =>
            c.weblab ? (
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
                    <h3>{c.title}</h3>
                    <p>{c.desc}</p>
                    <div className="pf-tags">
                      <span>{c.role}</span>
                      <span>{c.duration}</span>
                      <span>{c.yr}</span>
                    </div>
                    {c.link && (
                      <a
                        className="pf-link"
                        style={{ "--pacc": accentOf(c.title) }}
                        href={c.href}
                      >
                        Read the case study{" "}
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
                <div className="wimsa-block">
                  <div className="wimsa-head">
                    <div className="pf-no wimsa-no">
                      PROJECT 0{i + 1} · {c.ind}
                    </div>
                    <h3>{c.title}</h3>
                    <p>{c.desc}</p>
                    <div className="pf-tags">
                      <span>{c.role}</span>
                      <span>{c.duration}</span>
                      <span>{c.yr}</span>
                    </div>
                    {c.link && (
                      <a
                        className="pf-link"
                        style={{ "--pacc": accentOf(c.title) }}
                        href={c.href}
                      >
                        Read the case study{" "}
                        <span className="ar">
                          <Icon name="arrowUpRight" />
                        </span>
                      </a>
                    )}
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
                </div>
              </article>
            ) : c.banner ? (
              <article
                style={{ "--pacc": accentOf(c.title) }}
                className="pf-item pf-banner-item reveal"
                key={c.title}
              >
                <div className="pf-banner">
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
                    <h3>{c.title}</h3>
                    <div className="pf-tags on-dark">
                      <span>{c.role}</span>
                      <span>{c.duration}</span>
                      <span>{c.yr}</span>
                    </div>
                    <p>{c.desc}</p>
                    {c.link ? (
                      <a
                        className="pf-link on-dark"
                        style={{ "--pacc": accentOf(c.title) }}
                        href={c.href}
                      >
                        Read the case study{" "}
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
                        className={"ahb-phone main" + (c.video ? " video" : "")}
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
                    <a href={c.href} aria-label={c.title} className="pf-phones">
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
                    <a href={c.href} aria-label={c.title}>
                      <img src={c.img} alt={c.title} className="pf-img" />
                      {c.featured && (
                        <span className="pf-badge">
                          Featured · live showcase
                        </span>
                      )}
                    </a>
                  ) : (
                    <React.Fragment>
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
                      <image-slot
                        id={"pro2-pf-" + i}
                        shape="rounded"
                        radius="28"
                        placeholder="Drop project shot"
                      ></image-slot>
                    </React.Fragment>
                  )}
                </div>
                <div>
                  <div className="pf-no">
                    PROJECT 0{i + 1} · {c.ind}
                  </div>
                  <h3>{c.title}</h3>
                  <div className="pf-tags">
                    <span>{c.role}</span>
                    <span>{c.duration}</span>
                    <span>{c.yr}</span>
                  </div>
                  <p>{c.desc}</p>
                  {c.link ? (
                    <a
                      className="pf-link"
                      style={{ "--pacc": accentOf(c.title) }}
                      href={c.href}
                    >
                      {c.featured
                        ? "View case study & showcase"
                        : "Read the case study"}{" "}
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
            ),
          )}
        </div>
        <div className="pf-more reveal">
          <a className="btn btn-primary btn-neon-host" href="All Work.html">
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
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    const f = e.target;
    const body = `Name: ${f.name.value}\nEmail: ${f.email.value}\n\n${f.message.value}`;
    window.location.href = `mailto:hello@thenablabs.com?subject=${encodeURIComponent("Project enquiry — " + f.name.value)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  return (
    <section className="section" id="contact" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="cta reveal">
          <span className="cta-neon" aria-hidden="true"></span>
          <div className="cta-in">
            <span className="eyebrow center">Get in touch</span>
            <h2>Let’s work together.</h2>
            <form className="cform" onSubmit={submit}>
              <div className="cform-row">
                <label className="cfield">
                  <span>Name</span>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                  />
                </label>
                <label className="cfield">
                  <span>Email</span>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                  />
                </label>
              </div>
              <label className="cfield">
                <span>Project</span>
                <textarea
                  name="message"
                  rows="4"
                  required
                  placeholder="What are you building, and what do you need help with?"
                ></textarea>
              </label>
              <button className="btn btn-light btn-neon-host" type="submit">
                <span className="btn-neon" aria-hidden="true"></span>
                {sent ? "Opening your mail app…" : "Send message"}{" "}
                <i className="ph ph-arrow-right" aria-hidden="true"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
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
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6.6 18.4V6.6c0-.6.7-.9 1.1-.4l8.6 10.6V5.6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="16.3" cy="5.6" r="2.1" fill="currentColor" />
              </svg>
            </span>
            <span>
              the<span className="teal">Nab</span>Lab
            </span>
          </a>
          <div className="pfooter-links">
            {PRO_NAV.map((n) =>
              n === "Work" ? (
                <a key={n} href="All Work.html">
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
          <span>© 2026 TheNabLab</span>
          <span className="pfooter-tag">
            <span style={{ color: "#19b7d1" }}>Designing</span> products.{" "}
            <span style={{ color: "#8b6bff" }}>Engineering</span> experiences.
          </span>
          <div className="socials">
            <a href="#" aria-label="LinkedIn">
              <Social name="linkedin" />
            </a>
            <a href="#" aria-label="Behance">
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
      <ProCTA />
      <ProFooter />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("proot")).render(<ProApp />);
