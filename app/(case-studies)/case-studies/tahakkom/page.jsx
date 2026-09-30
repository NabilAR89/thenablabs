/* TahakkomCaseStudy — Riyadh command-center video wall and operations console.
   Same construction as the other case studies; the project's own plum and
   turquoise replace the site teal (see tahakkom.css). */

import './tahakkom.css';
import NabMark from '@/components/NabMark';
import RevealOnScroll from '@/components/RevealOnScroll';
import { pageMeta, caseStudyLd, JsonLd } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Tahakkom — Case Study · TheNabLabs',
  description:
    'Tahakkom — a control-room video wall and operations console for 4,548 enforcement and sensor sites across the Riyadh region. A case study by Nabil Abou Rjeily.',
  path: '/case-studies/tahakkom',
  image: '/tahakkom/wall.jpg',
  type: 'article',
});

export default function TahakkomCaseStudy() {
  return (
    <>
      <RevealOnScroll />
      <JsonLd data={caseStudyLd({ title: metadata.title, description: metadata.description, path: '/case-studies/tahakkom', image: '/tahakkom/wall.jpg' })} />
      <nav className="csw-nav">
        <div className="csw-nav-inner">
          <a className="csw-back" href="/work">
            <span className="ar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg></span>
            Back to work
          </a>
          <a className="nl-logo" href="/"><span className="nl-mk"><NabMark id="mk-nav" /></span><b><span>the<i>Nab</i>Labs</span><small>by Nabil Abou Rjeily</small></b></a>
        </div>
      </nav>

      <main>
        <header className="csw-hero">
          <div className="wrap">
            <div className="reveal in"><span className="csw-kick">Case study · Govtech · Command Center · 2026</span></div>
            <h1 className="reveal in">A region&rsquo;s traffic network, <span className="teal">on one wall</span>.</h1>
            <p className="lede reveal in">A control-room video wall and operations console for Tahakkom&rsquo;s Riyadh command center. Every enforcement and sensor site in the region (4,548 of them) reporting health, SLA attainment, capture delays, outages and live alerts on a single 17,000&thinsp;px canvas that has to be read from the back of the room.</p>
            <div className="csw-facts reveal in">
              <div><div className="k">Role</div><div className="v">Product Design &amp; Front-End</div></div>
              <div><div className="k">Timeline</div><div className="v">7 months</div></div>
              <div><div className="k">Platform</div><div className="v">Video wall · Web console</div></div>
              <div><div className="k">Client</div><div className="v">Tahakkom · تحكم</div></div>
            </div>
            <div className="csw-banner reveal in">
              <img src="/tahakkom/wall.jpg" alt="The full Tahakkom command wall — KPI column, operations snapshot, Riyadh sensor map, detections, SLA matrix and live alerts" />
            </div>
          </div>
        </header>

        <section className="section" style={{ paddingBlock: 'clamp(50px,7vw,96px)' }}>
          <div className="wrap csw-2col">
            <div className="reveal"><span className="eyebrow">Overview</span><h2 style={{ marginTop: '14px' }}>One canvas, read from ten metres away</h2></div>
            <div className="csw-prose reveal reveal-d1">
              <p>Tahakkom operates the enforcement and monitoring systems on Saudi roads. Their Riyadh control room had the data but not the picture: <b>availability in one system, tickets in another, capture delays in a third, and nothing that answered &ldquo;is the region healthy right now?&rdquo; at a glance.</b></p>
              <p>The wall is one composition, not a grid of embedded dashboards. It runs left to right as an answer to that question: the regional KPI column, then the operations snapshot, then the live sensor map, then detections and outages, and finally SLA and the alert feed that operators actually act on.</p>
              <p>Every number is sized for viewing distance rather than for a desk. We owned the design system, the wall composition and the front-end build, including the operations console the same components serve at desk scale.</p>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: '0' }}>
          <div className="wrap">
            <div className="reveal" style={{ maxWidth: '680px', marginBottom: '30px' }}><span className="eyebrow">What we did</span><h2 style={{ fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: 'clamp(26px,3.4vw,42px)', letterSpacing: '-0.025em', marginTop: '14px' }}>From scattered systems to a single operating picture</h2></div>
            <div className="csw-contrib reveal reveal-d1">
              <div className="c"><span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18M7 15l4-4 3 3 5-6"/></svg></span><b>Wall composition</b><p>Laid out a 17,280&times;3,225 canvas as one reading order, with type and chart weights set for a ten-metre viewing distance.</p></div>
              <div className="c"><span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></span><b>Design system</b><p>Light and dark command-center foundations: plum and turquoise primitives, glass surfaces, spacing and radius scales, Arabic and Latin type in Noto Sans Arabic.</p></div>
              <div className="c"><span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M9 20l-5.4 1.8 1.8-5.4A8.5 8.5 0 1 1 9 20z"/><path d="M8 11h8M8 15h5"/></svg></span><b>Live data views</b><p>Sensor map with system-by-shape and status-by-fill encoding, detection volumes, outage tables and a scrolling alert feed with severity triage.</p></div>
              <div className="c"><span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg></span><b>Front-end build</b><p>Built the wall and the desk console from one component set, so a KPI tile or SLA table behaves the same at both scales.</p></div>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: '0' }}>
          <div className="wrap">
            <div className="reveal" style={{ maxWidth: '680px', marginBottom: '26px' }}>
              <span className="eyebrow">In the room</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: 'clamp(26px,3.4vw,42px)', letterSpacing: '-0.025em', marginTop: '14px' }}>Running live in the Riyadh control center</h2>
            </div>
            <div className="csw-photo reveal reveal-d1">
              <img src="/tahakkom/room.jpg" alt="The Tahakkom command wall running live above the operator desks in the Riyadh control center" />
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: '0' }}>
          <div className="wrap">
            <div className="reveal" style={{ maxWidth: '680px', marginBottom: '26px' }}>
              <span className="eyebrow">The panels</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: 'clamp(26px,3.4vw,42px)', letterSpacing: '-0.025em', marginTop: '14px' }}>Three reads, left to right</h2>
            </div>
            <div className="csw-web reveal reveal-d1">
              <div className="frame"><div className="bar"><i></i><i></i><i></i></div><img src="/tahakkom/ops.jpg" alt="Tahakkom operations snapshot — SLA attainment against target, trucks inspected, active mobile units and capture delays" /><div className="lab">01 · Operations snapshot<span>SLA attainment against target, plus the lagging sites</span></div></div>
              <div className="frame"><div className="bar"><i></i><i></i><i></i></div><img src="/tahakkom/map.jpg" alt="Riyadh region sensor network map — system encoded by shape, status by fill, over the road network" /><div className="lab">02 · Sensor network<span>System by shape, status by fill, 205 clusters</span></div></div>
              <div className="frame"><div className="bar"><i></i><i></i><i></i></div><img src="/tahakkom/sla.jpg" alt="Ticket and dispatch SLA with ticket ageing, active breaches and the live alert feed" /><div className="lab">03 · SLA &amp; live alerts<span>Ticket ageing, active breaches, scrolling feed</span></div></div>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: '0' }}>
          <div className="wrap csw-2col">
            <div className="reveal"><span className="eyebrow">Foundations</span><h2 style={{ marginTop: '14px' }}>A system built for two rooms</h2></div>
            <div className="csw-prose reveal reveal-d1">
              <p>The same tokens drive the wall and the desk console, in dark and light. <b>Plum and turquoise carry the brand; lime, amber and coral carry status, and never anything else.</b></p>
              <p>Type is Noto Sans Arabic across both scripts, so an Arabic label and its Latin counterpart sit on the same baseline at the same weight, which matters when a KPI is read in one language and its unit in the other.</p>
            </div>
          </div>
        </section>

        {/* The foundations, as content rather than a screenshot of one — the
            swatches carry their real values, so the palette on this page is
            the palette itself. Hex values are the ones sampled from the
            delivered system sheet. */}
        <section className="section tk-found" style={{ paddingTop: 'clamp(26px,3.4vw,42px)' }}>
          <div className="wrap">
            <div className="tk-sheet reveal">
              <div className="tk-sheet-head">
                <img src="/tahakkom/logo-light.svg" alt="Tahakkom" />
                <div>
                  <b>Urban Intelligence UI</b>
                  <span>Light + dark command-center foundations · Noto Sans Arabic</span>
                </div>
              </div>

              <h3>Brand primitives</h3>
              <div className="tk-swatches">
                <figure><span style={{ background: '#602650' }}></span><figcaption>brand/plum/600<b>#602650</b></figcaption></figure>
                <figure><span style={{ background: '#9d4b8e' }}></span><figcaption>brand/plum/400<b>#9D4B8E</b></figcaption></figure>
                <figure><span style={{ background: '#12afa6' }}></span><figcaption>brand/turquoise/600<b>#12AFA6</b></figcaption></figure>
                <figure><span style={{ background: '#67e4dc' }}></span><figcaption>brand/turquoise/300<b>#67E4DC</b></figcaption></figure>
                <figure><span style={{ background: '#d9db78' }}></span><figcaption>support/lime<b>#D9DB78</b></figcaption></figure>
              </div>

              <h3>Light semantics</h3>
              <div className="tk-swatches">
                <figure><span style={{ background: '#f5f9fa' }}></span><figcaption>canvas/base<b>#F5F9FA</b></figcaption></figure>
                <figure><span style={{ background: 'rgba(255,255,255,.72)' }} className="chk"></span><figcaption>surface/glass<b>white 72%</b></figcaption></figure>
                <figure><span style={{ background: '#ffffff' }}></span><figcaption>surface/glass-strong<b>#FFFFFF</b></figcaption></figure>
                <figure><span style={{ background: '#0a0b10' }}></span><figcaption>text/primary<b>#0A0B10</b></figcaption></figure>
                <figure><span style={{ background: '#12afa6' }}></span><figcaption>accent/primary<b>#12AFA6</b></figcaption></figure>
              </div>

              <h3>Dark semantics</h3>
              <div className="tk-swatches">
                <figure><span style={{ background: '#0a0b10' }}></span><figcaption>canvas/base<b>#0A0B10</b></figcaption></figure>
                <figure><span style={{ background: '#6c6d71' }}></span><figcaption>surface/glass<b>#6C6D71</b></figcaption></figure>
                <figure><span style={{ background: '#424348' }}></span><figcaption>surface/glass-strong<b>#424348</b></figcaption></figure>
                <figure><span style={{ background: '#ffffff' }}></span><figcaption>text/primary<b>#FFFFFF</b></figcaption></figure>
                <figure><span style={{ background: '#25c6bc' }}></span><figcaption>accent/primary<b>#25C6BC</b></figcaption></figure>
              </div>

              <h3>Typography</h3>
              <div className="tk-type">
                <div><span className="k">Display / KPI</span><p className="t-display">Urban intelligence · <i>تحكم</i></p></div>
                <div><span className="k">Heading / Panel</span><p className="t-head">Leading the future of urban intelligence · <i>تحكم</i></p></div>
                <div><span className="k">Body / Medium</span><p className="t-body">Leading the future of urban intelligence · <i>تحكم</i></p></div>
                <div><span className="k">Label / Medium</span><p className="t-label">Leading the future of urban intelligence · <i>تحكم</i></p></div>
              </div>

              <h3>Spacing &amp; radius</h3>
              <div className="tk-scale">
                <div className="tk-space">
                  <figure><span style={{ width: '8px' }}></span><figcaption>space/2<b>8px</b></figcaption></figure>
                  <figure><span style={{ width: '16px' }}></span><figcaption>space/4<b>16px</b></figcaption></figure>
                  <figure><span style={{ width: '32px' }}></span><figcaption>space/6<b>32px</b></figcaption></figure>
                  <figure><span style={{ width: '64px' }}></span><figcaption>space/8<b>64px</b></figcaption></figure>
                </div>
                <div className="tk-radius">
                  <figure><span style={{ borderRadius: '6px' }}></span><figcaption>radius/sm</figcaption></figure>
                  <figure><span style={{ borderRadius: '12px' }}></span><figcaption>radius/md</figcaption></figure>
                  <figure><span style={{ borderRadius: '20px' }}></span><figcaption>radius/lg</figcaption></figure>
                  <figure><span style={{ borderRadius: '999px' }}></span><figcaption>radius/pill</figcaption></figure>
                </div>
              </div>

              <h3>Glass effects</h3>
              <div className="tk-glass">
                <div className="g g-light">Glass / Light</div>
                <div className="g g-dark">Glass / Dark</div>
                <div className="g g-float">Elevation / Floating</div>
              </div>
            </div>
          </div>
        </section>

        <footer className="nl-footer">
        <div className="nl-fwrap">
          <div className="nl-ftop">
            <a className="nl-logo" href="/"><span className="nl-mk"><NabMark id="mk-foot" /></span><b><span>the<i>Nab</i>Labs</span><small>by Nabil Abou Rjeily</small></b></a>
            <div className="nl-flinks"><a href="/#services">Services</a><a href="/#about">About</a><a href="/#skills">Skills</a><a href="/work">Work</a><a href="/#contact">Contact</a></div>
          </div>
          <div className="nl-fbot">
            <span>© 2026 TheNabLabs</span>
            <span className="nl-tag"><b style={{ fontWeight: 'inherit', color: '#19b7d1' }}>Designing</b> products. <b style={{ fontWeight: 'inherit', color: '#8b6bff' }}>Engineering</b> experiences.</span>
            <div className="nl-socials"><a href="https://www.linkedin.com/in/nabil-abou-rjeily-b033a698" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.22 8.02h4.52V24H.22zM8.34 8.02h4.33v2.18h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V24h-4.52v-7.66c0-1.83-.03-4.18-2.55-4.18-2.56 0-2.95 2-2.95 4.05V24H8.34z" fill="currentColor" stroke="none"/></svg></a><a href="https://www.behance.net/nabil_abourjeily" target="_blank" rel="noopener noreferrer" aria-label="Behance"><svg viewBox="0 0 24 24"><path d="M7.5 11.3c1.2-.5 1.9-1.5 1.9-2.9 0-2.6-1.9-3.4-4.2-3.4H0v13.9h5.4c2.4 0 4.7-1.2 4.7-4 0-1.7-.8-3-2.6-3.6zM3 7.4h2.1c.9 0 1.7.3 1.7 1.3 0 1-.7 1.4-1.6 1.4H3zm2.3 9H3v-3.2h2.4c1.1 0 1.8.5 1.8 1.6 0 1.2-.8 1.6-1.9 1.6zM18.8 9c-2.8 0-4.7 2.1-4.7 4.9s1.8 4.8 4.7 4.8c2.2 0 3.8-1 4.5-3h-2.4c-.3.8-1.1 1.2-1.9 1.2-1.5 0-2.3-.9-2.3-2.4h6.8c.2-2.9-1.4-5.5-4.7-5.5zm-2.1 3.9c0-1.2.9-2.1 2.1-2.1 1.3 0 1.9.7 2 2.1zM15.2 5.9h5.9v1.5h-5.9z" fill="currentColor" stroke="none"/></svg></a></div>
          </div>
        </div>
      </footer>
      </main>
    </>
  );
}
