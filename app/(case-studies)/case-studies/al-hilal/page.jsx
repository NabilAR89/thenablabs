/* AlHilalCaseStudy — ported from "Al Hilal Case Study.html". */

import './al-hilal.css';
import NabMark from '@/components/NabMark';
import RevealOnScroll from '@/components/RevealOnScroll';
import { pageMeta, caseStudyLd, JsonLd } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Al Hilal — Digital Banking App UX/UI Case Study | TheNabLabs',
  description:
    'Al Hilal — a youth-focused digital banking super-app. A case study by Nabil Abou Rjeily.',
  path: '/case-studies/al-hilal',
  image: '/alhilal/home-x.jpg',
  type: 'article',
});

export default function AlHilalCaseStudy() {
  return (
    <>
      <RevealOnScroll />
      <JsonLd data={caseStudyLd({ title: metadata.title, description: metadata.description, path: '/case-studies/al-hilal', image: '/alhilal/home-x.jpg' })} />
      <nav className="csw-nav">
        <div className="csw-nav-inner">
          <a className="csw-back" href="/work">
            <span className="ar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg></span>
            Back to work
          </a>
          <a className="nl-logo" href="/"><span className="nl-mk"><NabMark id="mk-nav" /></span><b><span>the<i>Nab</i>Labs</span><small>by Nabil Abou Rjeily</small></b></a>
          <a className="btn btn-teal" href="/alhilal/AlHilal.html" style={{ padding: '11px 20px', fontSize: '14px' }}>Live showcase</a>
        </div>
      </nav>

      <main>
        <header className="csw-hero">
          <div className="wrap">
            <div className="reveal in"><span className="csw-kick">Case study · Fintech · Mobile · 2025</span></div>
            <h1 className="reveal in">Al Hilal — banking that feels like <span className="teal">everyday life</span>.</h1>
            <p className="lede reveal in">A youth-focused digital banking super-app for Al Hilal Bank, pairing a prepaid debit card and children&apos;s saving accounts with everyday lifestyle services, from a guided onboarding to a rewards-driven home.</p>
            <div className="csw-facts reveal in">
              <div><div className="k">Role</div><div className="v">Product Designer & Front-End</div></div>
              <div><div className="k">Timeline</div><div className="v">4 months</div></div>
              <div><div className="k">Platform</div><div className="v">iOS · React Native</div></div>
              <div><div className="k">Client</div><div className="v">Al Hilal Bank</div></div>
            </div>
            <div className="csw-banner reveal in">
              <div className="phones">
                <div className="bp"><div className="s"><img src="/alhilal/onb2-x.jpg" alt="" /></div></div>
                <div className="bp"><div className="s"><img src="/alhilal/home-crop.jpg" alt="Al Hilal home" /></div></div>
                <div className="bp"><div className="s"><img src="/alhilal/onb1-x.jpg" alt="" /></div></div>
              </div>
            </div>
          </div>
        </header>

        <section className="section" style={{ paddingBlock: 'clamp(50px,7vw,96px)' }}>
          <div className="wrap csw-2col">
            <div className="reveal"><span className="eyebrow">Overview</span><h2 style={{ marginTop: '14px' }}>A bank young people actually open</h2></div>
            <div className="csw-prose reveal reveal-d1">
              <p>Most banking apps talk to adults who already understand banking. <b>Al Hilal needed to speak to a younger audience (and the parents guiding them) without losing the trust a bank has to earn.</b></p>
              <p>We designed the experience around a single idea: turn pocket money into life lessons. The onboarding tells that story in three confident screens, and the home turns the account into a rewards-driven lifestyle hub rather than a list of transactions.</p>
              <p>We owned the flow, the UI against the bold AHB visual language (midnight indigo, Hilal magenta, sunrise orange) and built the front-end so the shipped app matched the design exactly.</p>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: '0' }}>
          <div className="wrap">
            <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px', flexWrap: 'wrap', marginBottom: '26px' }}>
              <div><span className="eyebrow">The screens</span><h2 style={{ fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: 'clamp(26px,3.4vw,42px)', letterSpacing: '-0.025em', marginTop: '14px' }}>Onboarding to home</h2></div>
              <span style={{ color: 'var(--muted-2)', fontSize: '13px' }}>Scroll to browse →</span>
            </div>
            <div className="csw-screens reveal reveal-d1">
              <div className="csw-pill"><div className="csw-phone"><div className="scr"><img src="/alhilal/onb1-x.jpg" alt="Complete digital banking" /></div></div><div className="lab">01 · Digital banking<span>Onboarding story</span></div></div>
              <div className="csw-pill"><div className="csw-phone"><div className="scr"><img src="/alhilal/onb2-x.jpg" alt="Children saving account" /></div></div><div className="lab">02 · Family saving<span>Trusted network</span></div></div>
              <div className="csw-pill"><div className="csw-phone"><div className="scr"><img src="/alhilal/onb3-x.jpg" alt="Marhaba welcome" /></div></div><div className="lab">03 · Marhaba<span>Onboarding pay-off</span></div></div>
              <div className="csw-pill"><div className="csw-phone"><div className="scr"><img src="/alhilal/login-x.jpg" alt="Sign in" /></div></div><div className="lab">04 · Sign in<span>Email, Apple & Google</span></div></div>
              <div className="csw-pill"><div className="csw-phone"><div className="scr"><img src="/alhilal/home-crop.jpg" alt="Rewards home" /></div></div><div className="lab">05 · Rewards home<span>Lifestyle marketplace</span></div></div>
              <div className="csw-pill"><div className="csw-phone"><div className="scr"><img src="/alhilal/offers-x.jpg" alt="Top offers" /></div></div><div className="lab">06 · Top offers<span>Points & referrals</span></div></div>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: '0' }}>
          <div className="wrap">
            <div className="reveal" style={{ maxWidth: '680px', marginBottom: '30px' }}><span className="eyebrow">What we did</span><h2 style={{ fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: 'clamp(26px,3.4vw,42px)', letterSpacing: '-0.025em', marginTop: '14px' }}>From brand story to shipped front-end</h2></div>
            <div className="csw-contrib reveal reveal-d1">
              <div className="c"><span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/></svg></span><b>Narrative onboarding</b><p>Shaped a three-story intro (digital banking, family saving and lifestyle) each anchored by a single illustrative hero.</p></div>
              <div className="c"><span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></span><b>Lifestyle home UI</b><p>Designed a &quot;Marhaba&quot; home with a points balance, service shortcuts and a scrolling offers marketplace.</p></div>
              <div className="c"><span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg></span><b>Front-end build</b><p>Implemented the gradient surfaces, glassy cards and the floating action dock, fast and faithful on device.</p></div>
              <div className="c"><span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg></span><b>Design system fit</b><p>Built reusable components on AHB&apos;s palette so the experience extends cleanly across the product.</p></div>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: '0' }}>
          <div className="wrap">
            <div className="csw-cta reveal">
              <div className="glow"></div>
              <div className="in">
                <span className="kick">Live showcase</span>
                <h2>Walk the full app,<br/>screen by screen.</h2>
                <p>See the onboarding story and the rewards home in interactive iPhone mockups on the branded Al Hilal canvas.</p>
                <a className="btn btn-banner" href="/alhilal/AlHilal.html">Explore the showcase</a>
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
