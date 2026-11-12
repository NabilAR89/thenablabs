/* /portfolio — the site as a set of A4 sheets, for the downloadable PDF.
   Everything is read from lib/data.jsx so the PDF never drifts from the site;
   `npm run pdf` prints this page to public/ (see scripts/build-pdf.mjs). */
import { DATA } from "@/lib/data";
import { SITE_URL, AUTHOR } from "@/lib/seo";
import { PORTFOLIO_PDF } from "@/lib/links";
import NabMark from "@/components/NabMark";

const TITLE = "Senior Product Designer & UX Engineer";
const SITE = SITE_URL.replace(/^https?:\/\//, "");
const EMAIL = DATA.booking.email;

/* `?w=` is a hint for the PDF build: its local server downsizes each image to
   that width so the file stays small enough to attach. The live site ignores
   the query and serves the original. */
const img = (path, w) => `${path}?w=${w}`;

const linkOf = (c) => c.caseHref || c.showcaseHref;

/* Work sheets are a 2×2 grid. A featured project takes a full row (two
   cells), the rest of the archive one cell each; cells are filled in order,
   and whatever is left on the last sheet goes to the closing contact block. */
const featured = DATA.featured;
const rest = DATA.caseStudies.filter((c) => !featured.includes(c));
const workSheets = [];
for (const [c, size] of [
  ...featured.map((c) => [c, "lg"]),
  ...rest.map((c) => [c, "sm"]),
]) {
  const cells = size === "lg" ? 2 : 1;
  let sheet = workSheets.at(-1);
  if (!sheet || sheet.used + cells > 4) {
    sheet = { items: [], used: 0 };
    workSheets.push(sheet);
  }
  sheet.items.push({ c, size });
  sheet.used += cells;
}
const TOTAL = 3 + workSheets.length;

function Brand({ id }) {
  return (
    <span className="pf-brand">
      <span className="pf-mk">
        <NabMark id={id} />
      </span>
      <span>
        the<span className="teal">Nab</span>Labs
      </span>
    </span>
  );
}

function Sheet({ n, label, dark, children }) {
  return (
    <section className={"pf-sheet" + (dark ? " pf-sheet--dark" : "")}>
      {label && (
        <header className="pf-head">
          <Brand id={`mk-${n}`} />
          <span className="pf-head-label">{label}</span>
        </header>
      )}
      <div className="pf-body">{children}</div>
      <footer className="pf-foot">
        <span>
          {AUTHOR} — {TITLE}
        </span>
        <span>
          <a href={SITE_URL}>{SITE}</a> · <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </span>
        <span className="pf-page">
          {String(n).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
        </span>
      </footer>
    </section>
  );
}

function Cover() {
  return (
    <Sheet n={1} dark>
      <div className="pf-cover">
        <Brand id="mk-cover" />
        <div className="pf-cover-main">
          <div className="pf-cover-text">
            <p className="pf-kicker">Portfolio · {new Date().getFullYear()}</p>
            <h1 className="pf-name">{AUTHOR}</h1>
            <p className="pf-role">{TITLE}</p>
            <p className="pf-lead">{DATA.about.lead}</p>
          </div>
          <img
            className="pf-portrait"
            src={img("/assets/nabil-studio.jpeg", 700)}
            alt={AUTHOR}
          />
        </div>
        <div className="pf-stats">
          {DATA.stats.map((s) => (
            <div key={s.l}>
              <strong>{s.n}</strong>
              <span>{s.l}</span>
            </div>
          ))}
        </div>
        <ul className="pf-contact">
          <li>
            <span>Web</span>
            <a href={SITE_URL}>{SITE}</a>
          </li>
          {DATA.contact
            .filter((c) => c.href !== "#")
            .map((c) => (
              <li key={c.k}>
                <span>{c.k}</span>
                <a href={c.href}>{c.v}</a>
              </li>
            ))}
        </ul>
        <div className="pf-chips">
          {DATA.disciplines.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
      </div>
    </Sheet>
  );
}

function AboutExperience() {
  return (
    <Sheet n={2} label="About & Experience">
      <h2 className="pf-h2">About</h2>
      <div className="pf-about">
        {DATA.about.body.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>
      <h2 className="pf-h2">Experience</h2>
      <ol className="pf-timeline">
        {DATA.timeline.map((t) => (
          <li key={t.when} className={t.now ? "now" : ""}>
            <span className="pf-when">{t.when}</span>
            <div>
              <h3>{t.role}</h3>
              <p className="pf-co">{t.co}</p>
              <p>{t.desc}</p>
              <div className="pf-tags">
                {t.resp.map((r) => (
                  <span key={r}>{r}</span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Sheet>
  );
}

function ExpertiseSkills() {
  return (
    <Sheet n={3} label="Expertise & Skills">
      <h2 className="pf-h2">Expertise</h2>
      <div className="pf-expertise">
        {DATA.expertise.map((e) => (
          <div key={e.title}>
            <h3>{e.title}</h3>
            <p>{e.desc}</p>
            <div className="pf-tags">
              {e.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <h2 className="pf-h2">Skills</h2>
      <div className="pf-skills">
        {Object.entries(DATA.skills).map(([group, items]) => (
          <div key={group}>
            <h3>{group}</h3>
            {items.map(([name, v]) => (
              <div className="pf-bar" key={name}>
                <span>{name}</span>
                <i style={{ "--v": `${v}%` }} />
              </div>
            ))}
          </div>
        ))}
      </div>
      <h2 className="pf-h2">What people say</h2>
      <div className="pf-quotes">
        {DATA.testimonials.map((t) => (
          <figure key={t.name}>
            <blockquote>“{t.quote}”</blockquote>
            <figcaption>
              {t.name} · {t.role}
            </figcaption>
          </figure>
        ))}
      </div>
    </Sheet>
  );
}

/* One picture per project: the first desktop screen in a browser frame (with
   a phone over it when the project has a mobile app too), else a row of
   phone screens. */
function Art({ c, size }) {
  if (c.web) {
    return (
      <div className="pf-art pf-art--web">
        <div className="pf-browser">
          <span />
          <span />
          <span />
        </div>
        <img src={img(c.web[0], size === "lg" ? 1400 : 900)} alt={c.title} />
        {c.mobile && (
          <img className="pf-art-phone" src={img(c.mobile[0], 360)} alt="" />
        )}
      </div>
    );
  }
  const phones = (c.phones || [c.img]).slice(0, 3);
  return (
    <div className="pf-art pf-art--phones" style={{ "--n": phones.length }}>
      {phones.map((p) => (
        <img key={p} src={img(p, 420)} alt={c.title} />
      ))}
    </div>
  );
}

function Project({ c, size }) {
  const href = linkOf(c);
  const [name, ...sub] = c.title.split(" — ");
  return (
    <article className={`pf-project pf-project--${size}`}>
      <Art c={c} size={size} />
      <div className="pf-project-text">
        <p className="pf-meta">
          {c.ind} · {c.yr} · {c.duration}
        </p>
        <h3>
          {name}
          {sub.length > 0 && <span> — {sub.join(" — ")}</span>}
        </h3>
        <p className="pf-desc">{c.desc}</p>
        <div className="pf-tags">
          {c.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        {href && (
          <a className="pf-link" href={SITE_URL + href}>
            {SITE + href} ↗
          </a>
        )}
      </div>
    </article>
  );
}

function Closing() {
  return (
    <div className="pf-closing">
      <p className="pf-kicker">{DATA.booking.kicker}</p>
      <h2>{DATA.booking.title}</h2>
      <p>{DATA.booking.panel.body}</p>
      <ul className="pf-contact">
        <li>
          <span>Web</span>
          <a href={SITE_URL}>{SITE}</a>
        </li>
        {DATA.contact
          .filter((c) => c.href !== "#")
          .map((c) => (
            <li key={c.k}>
              <span>{c.k}</span>
              <a href={c.href}>{c.v}</a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <>
      <div className="pf-toolbar">
        <span>Printable portfolio</span>
        <a href={PORTFOLIO_PDF} download>
          Download PDF
        </a>
      </div>
      <main className="pf">
        <Cover />
        <AboutExperience />
        <ExpertiseSkills />
        {workSheets.map((s, i) => (
          <Sheet
            key={i}
            n={4 + i}
            label={
              s.items.some((it) => it.size === "lg")
                ? "Selected Work"
                : "More Work"
            }
          >
            <div className="pf-work">
              {s.items.map(({ c, size }) => (
                <Project key={c.title} c={c} size={size} />
              ))}
              {i === workSheets.length - 1 && s.used < 4 && <Closing />}
            </div>
          </Sheet>
        ))}
      </main>
    </>
  );
}
