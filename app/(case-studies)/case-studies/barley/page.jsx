/* BarleyCaseStudy — ported from "Barley Case Study.html". */

import './barley.css';
import NabMark from '@/components/NabMark';
import RevealOnScroll from '@/components/RevealOnScroll';
import { pageMeta, caseStudyLd, JsonLd } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Barley — Case Study · TheNabLabs',
  description:
    'Barley — a full-screen, story-driven website for a Beirut steak & burger restaurant. A case study by Nabil Abou Rjeily.',
  path: '/case-studies/barley',
  image: '/barley/home.jpg',
  type: 'article',
});

export default function BarleyCaseStudy() {
  return (
    <>
      <RevealOnScroll />
      <JsonLd data={caseStudyLd({ title: metadata.title, description: metadata.description, path: '/case-studies/barley', image: '/barley/home.jpg' })} />
      <nav className="csw-nav">
        <div className="csw-nav-inner">
          <a className="csw-back" href="/work">
            <span className="ar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg></span>
            Back to work
          </a>
          <a className="nl-logo" href="/"><span className="nl-mk"><NabMark id="mk-nav" /></span><b><span>the<i>Nab</i>Labs</span><small>by Nabil Abou Rjeily</small></b></a>
          <a className="btn btn-teal" href="/barley/Barley.html" style={{ padding: '11px 20px', fontSize: '14px' }}>Live showcase</a>
        </div>
      </nav>

      <main>
        <header className="csw-hero">
          <div className="wrap">
            <div className="reveal in"><span className="csw-kick">Case study · Hospitality · Web · 2024</span></div>
            <h1 className="reveal in">Barley — a restaurant told <span className="teal">one frame at a time</span>.</h1>
            <p className="lede reveal in">A full-screen, story-driven website for Barley, a Beirut steak &amp; burger house. Each section is a cinematic frame (a flame-grilled hero, a welcome on cream paper, popular platters and a full burger menu) switching between charcoal-dark and warm light.</p>
            <div className="csw-facts reveal in">
              <div><div className="k">Role</div><div className="v">Product Designer &amp; Front-End</div></div>
              <div><div className="k">Timeline</div><div className="v">3 months</div></div>
              <div><div className="k">Platform</div><div className="v">Web · Single-page</div></div>
              <div><div className="k">Client</div><div className="v">Barley Steak &amp; Burger</div></div>
            </div>
            <div className="csw-banner reveal in">
              <img src="/barley/home.jpg" alt="Barley home hero — flame-grilled grill with the brand crest" />
            </div>
          </div>
        </header>

        <section className="section" style={{ paddingBlock: 'clamp(50px,7vw,96px)' }}>
          <div className="wrap csw-2col">
            <div className="reveal"><span className="eyebrow">Overview</span><h2 style={{ marginTop: '14px' }}>A menu site that feels like a tasting</h2></div>
            <div className="csw-prose reveal reveal-d1">
              <p>Most restaurant sites bury the food under navigation. <b>Barley does the opposite, the food is the interface, and every scroll is a full-screen frame you move through like courses.</b></p>
              <p>We built the experience around a fixed chrome (menu, &quot;reserve now&quot;, social and a section counter) that stays put while cinematic frames slide beneath it. The rhythm alternates charcoal-dark sections for grilled drama with warm cream pages for calm, readable menus.</p>
              <p>We owned the art direction, the high-contrast serif and coral identity, and the front-end (full-bleed photography, the carousel menu and the burger detail interactions) so the shipped site matched the design exactly.</p>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: '0' }}>
          <div className="wrap">
            <div className="reveal" style={{ maxWidth: '680px', marginBottom: '30px' }}><span className="eyebrow">What we did</span><h2 style={{ fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: 'clamp(26px,3.4vw,42px)', letterSpacing: '-0.025em', marginTop: '14px' }}>From art direction to a shipped site</h2></div>
            <div className="csw-contrib reveal reveal-d1">
              <div className="c"><span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h20v14H2zM8 21h8M12 17v4"/></svg></span><b>Full-screen art direction</b><p>Designed each section as a self-contained cinematic frame with one hero image and a clear focal point.</p></div>
              <div className="c"><span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7V5h16v2M9 20h6M12 5v15"/></svg></span><b>Type &amp; identity</b><p>Paired a high-contrast serif with a clean sans and a single coral accent across dark and cream worlds.</p></div>
              <div className="c"><span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg></span><b>Front-end build</b><p>Built the carousel menu, the platter slider and the draggable burger detail control, fast and faithful.</p></div>
              <div className="c"><span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-8-4.5-8-11a8 8 0 0 1 16 0c0 6.5-8 11-8 11zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg></span><b>Contact &amp; reservations</b><p>Surfaced hours, a styled map and a persistent &quot;reserve now&quot; so booking is always one click away.</p></div>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: '0' }}>
          <div className="wrap">
            <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px', flexWrap: 'wrap', marginBottom: '26px' }}>
              <div><span className="eyebrow">The sections</span><h2 style={{ fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: 'clamp(26px,3.4vw,42px)', letterSpacing: '-0.025em', marginTop: '14px' }}>Eight frames, one story</h2></div>
            </div>
            <div className="csw-screens reveal reveal-d1">
              <div className="csw-frame"><img src="/barley/welcome.jpg" alt="Welcome section" /><div className="lab"><b>Welcome</b><span>Traditional · tasty · delicious</span></div></div>
              <div className="csw-frame"><img src="/barley/popular.jpg" alt="Popular platters" /><div className="lab"><b>Popular platters</b><span>Dark dish carousel</span></div></div>
              <div className="csw-frame"><img src="/barley/burger-hero.jpg" alt="Burger title screen" /><div className="lab"><b>Burger title</b><span>Amber wordmark</span></div></div>
              <div className="csw-frame"><img src="/barley/burgers-list.jpg" alt="Burger list" /><div className="lab"><b>Burger list</b><span>Priced in LBP</span></div></div>
              <div className="csw-frame"><img src="/barley/burger-details.jpg" alt="Burger detail" /><div className="lab"><b>Burger detail</b><span>Ingredients &amp; price</span></div></div>
              <div className="csw-frame"><img src="/barley/contact.jpg" alt="Contact" /><div className="lab"><b>Contact</b><span>Hours &amp; map</span></div></div>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: '0' }}>
          <div className="wrap">
            <div className="csw-cta reveal">
              <div className="glow"></div>
              <div className="in">
                <span className="kick">Live showcase</span>
                <h2>Walk the full site,<br/>frame by frame.</h2>
                <p>See the flame-grilled hero, the platter carousel and the burger menu in full-width browser frames on the branded Barley canvas.</p>
                <a className="btn btn-banner" href="/barley/Barley.html">Explore the showcase</a>
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
