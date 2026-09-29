/* SmartWealthCaseStudy — ported from "SmartWealth Case Study.html". */

import './smartwealth.css';
import NabMark from '@/components/NabMark';
import RevealOnScroll from '@/components/RevealOnScroll';
import { pageMeta, caseStudyLd, JsonLd } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'SmartWealth — Case Study · TheNabLabs',
  description:
    'SmartWealth by NBK Wealth — designing and building an end-to-end investing onboarding flow. A case study by Nabil Abou Rjeily.',
  path: '/case-studies/smartwealth',
  image: '/smartwealth/screens/01-splash.jpg',
  type: 'article',
});

export default function SmartWealthCaseStudy() {
  return (
    <>
      <RevealOnScroll />
      <JsonLd data={caseStudyLd({ title: metadata.title, description: metadata.description, path: '/case-studies/smartwealth', image: '/smartwealth/screens/01-splash.jpg' })} />
      <nav className="csw-nav">
        <div className="csw-nav-inner">
          <a className="csw-back" href="/work">
            <span className="ar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg></span>
            Back to work
          </a>
          <a className="nl-logo" href="/"><span className="nl-mk"><NabMark id="mk-nav" /></span><b><span>the<i>Nab</i>Labs</span><small>by Nabil Abou Rjeily</small></b></a>
          <a className="btn btn-teal" href="/smartwealth/SmartWealth.html" style={{ padding: '11px 20px', fontSize: '14px' }}>Live showcase</a>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <header className="csw-hero">
          <div className="wrap">
            <div className="reveal in"><span className="csw-kick">Case study · Fintech · Mobile · 2025</span></div>
            <h1 className="reveal in">SmartWealth — investing that starts in <span className="teal">minutes</span>.</h1>
            <p className="lede reveal in">An end-to-end onboarding flow for SmartWealth by NBK Wealth: turning account opening, identity, KYC and investment setup into one confident, five-screen journey.</p>
            <div className="csw-facts reveal in">
              <div><div className="k">Role</div><div className="v">Product Designer & Front-End</div></div>
              <div><div className="k">Timeline</div><div className="v">5 months</div></div>
              <div><div className="k">Platform</div><div className="v">iOS · React Native</div></div>
              <div><div className="k">Client</div><div className="v">NBK Wealth</div></div>
            </div>
            <div className="csw-screens reveal in">
              <div className="csw-pill"><div className="csw-phone"><div className="scr"><img src="/smartwealth/screens/01-splash.jpg" alt="Splash" /></div></div><div className="lab">01 · Welcome<span>Brand intro & start</span></div></div>
              <div className="csw-pill"><div className="csw-phone"><div className="scr"><img src="/smartwealth/screens/02-face.jpg" alt="Face verification" /></div></div><div className="lab">02 · ID & Face<span>Biometric verification</span></div></div>
              <div className="csw-pill"><div className="csw-phone"><div className="scr"><img src="/smartwealth/screens/03-kyc.jpg" alt="KYC" /></div></div><div className="lab">03 · KYC<span>Investment profile</span></div></div>
              <div className="csw-pill"><div className="csw-phone"><div className="scr"><img src="/smartwealth/screens/04-preferences.jpg" alt="Preferences" /></div></div><div className="lab">04 · Preferences<span>Objectives & risk</span></div></div>
              <div className="csw-pill"><div className="csw-phone"><div className="scr"><img src="/smartwealth/screens/05-done.jpg" alt="All set" /></div></div><div className="lab">05 · All set<span>Funded & ready</span></div></div>
            </div>
          </div>
        </header>

        {/* OVERVIEW */}
        <section className="section" style={{ paddingBlock: 'clamp(50px,7vw,96px)' }}>
          <div className="wrap csw-2col">
            <div className="reveal"><span className="eyebrow">Overview</span><h2 style={{ marginTop: '14px' }}>A first impression that builds trust</h2></div>
            <div className="csw-prose reveal reveal-d1">
              <p>Opening an investment account is where most fintech apps lose people: too many forms, too much jargon, no sense of progress. <b>SmartWealth needed an onboarding that felt as premium and reassuring as the brand itself.</b></p>
              <p>I owned the experience end-to-end: defining the flow, designing every screen against the SmartWealth visual language (deep black, signal lime, electric blue), and building the front-end so the shipped app matched the design exactly.</p>
            </div>
          </div>
        </section>

        {/* CONTRIBUTION */}
        <section className="section" style={{ paddingTop: '0' }}>
          <div className="wrap">
            <div className="reveal" style={{ maxWidth: '680px', marginBottom: '30px' }}><span className="eyebrow">What I did</span><h2 style={{ fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: 'clamp(26px,3.4vw,42px)', letterSpacing: '-0.025em', marginTop: '14px' }}>From flow to shipped front-end</h2></div>
            <div className="csw-contrib reveal reveal-d1">
              <div className="c"><span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/></svg></span><b>Flow & UX architecture</b><p>Mapped account opening into a clear three-step path (identity, KYC, preferences) with visible progress at every screen.</p></div>
              <div className="c"><span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></span><b>UI design</b><p>Designed every screen in the SmartWealth system: biometric scan, risk sliders, multi-select objectives and a celebratory success state.</p></div>
              <div className="c"><span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg></span><b>Front-end build</b><p>Implemented the screens, the animated lime motifs, sliders and transitions, pixel-faithful and fast on device.</p></div>
              <div className="c"><span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg></span><b>Design system fit</b><p>Kept every component on-brand and reusable, so the onboarding extends cleanly into the rest of the product.</p></div>
            </div>
          </div>
        </section>

        {/* CTA to live showcase */}
        <section className="section" style={{ paddingTop: '0' }}>
          <div className="wrap">
            <div className="csw-cta reveal">
              <div className="glow"></div>
              <div className="in">
                <span className="kick">Live showcase</span>
                <h2>Walk the full onboarding,<br/>screen by screen.</h2>
                <p>See all five screens in interactive iPhone mockups on the branded SmartWealth canvas.</p>
                <a className="btn btn-lime" href="/smartwealth/SmartWealth.html">Explore the showcase</a>
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
