/* FootyCashCaseStudy — ported from "FootyCash Case Study.html". */

import './footycash.css';
import NabMark from '@/components/NabMark';
import RevealOnScroll from '@/components/RevealOnScroll';
import { pageMeta, caseStudyLd, JsonLd } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'FootyCash — Case Study · TheNabLab',
  description:
    'FootyCash — a pool-based football prediction & betting platform for Ghana, across web and mobile. A case study by Nabil Abou Rjeily.',
  path: '/case-studies/footycash',
  image: '/footycash/home-web.jpg',
  type: 'article',
});

export default function FootyCashCaseStudy() {
  return (
    <>
      <RevealOnScroll />
      <JsonLd data={caseStudyLd({ title: metadata.title, description: metadata.description, path: '/case-studies/footycash', image: '/footycash/home-web.jpg' })} />
      <nav className="csw-nav">
        <div className="csw-nav-inner">
          <a className="csw-back" href="/work">
            <span className="ar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg></span>
            Back to work
          </a>
          <a className="nl-logo" href="/"><span className="nl-mk"><NabMark id="mk-nav" /></span><b><span>the<i>Nab</i>Labs</span><small>by Nabil Abou Rjeily</small></b></a>
          <a className="btn btn-teal" href="/footycash/FootyCash.html" style={{ padding: '11px 20px', fontSize: '14px' }}>Live showcase</a>
        </div>
      </nav>

      <main>
        <header className="csw-hero">
          <div className="wrap">
            <div className="reveal in"><span className="csw-kick">Case study · iGaming · Web &amp; Mobile · 2025</span></div>
            <h1 className="reveal in">FootyCash — turning a football hunch into a <span className="teal">shared pool</span>.</h1>
            <p className="lede reveal in">A pool-based football prediction and betting platform for Ghana&apos;s leagues: score predictors, three bet types and live pools, delivered as a fast mobile app and a data-dense desktop console on a stadium-night neon identity.</p>
            <div className="csw-facts reveal in">
              <div><div className="k">Role</div><div className="v">Product Designer &amp; Front-End</div></div>
              <div><div className="k">Timeline</div><div className="v">5 months</div></div>
              <div><div className="k">Platform</div><div className="v">Web &amp; Mobile</div></div>
              <div><div className="k">Market</div><div className="v">Ghana · Football pools</div></div>
            </div>
            <div className="csw-banner reveal in">
              <div className="phones">
                <div className="bp"><div className="s"><img src="/footycash/predictor-m.jpg" alt="" /></div></div>
                <div className="bp"><div className="s"><img src="/footycash/home-m.jpg" alt="FootyCash home" /></div></div>
                <div className="bp"><div className="s"><img src="/footycash/mybets-m.jpg" alt="" /></div></div>
              </div>
            </div>
          </div>
        </header>

        <section className="section" style={{ paddingBlock: 'clamp(50px,7vw,96px)' }}>
          <div className="wrap csw-2col">
            <div className="reveal"><span className="eyebrow">Overview</span><h2 style={{ marginTop: '14px' }}>A betting product that rewards football knowledge</h2></div>
            <div className="csw-prose reveal reveal-d1">
              <p>Most betting apps are walls of odds. <b>FootyCash bets on knowledge instead, punters predict exact scores and outcomes, then share a transparent pool where the payout is visible before a cedi is staked.</b></p>
              <p>I designed the product around three pillars that map to how Ghanaian fans actually play: a single-match predictor, three combined bet types, and multi-match pools, each surfaced consistently on mobile and on a wider desktop console.</p>
              <p>I owned the flows, the dark stadium-night UI with its neon green, floodlight lime and predictor violet, and built the responsive front-end so the same markets feel native on a phone and on a three-column web layout.</p>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: '0' }}>
          <div className="wrap">
            <div className="reveal" style={{ maxWidth: '680px', marginBottom: '30px' }}><span className="eyebrow">What I did</span><h2 style={{ fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: 'clamp(26px,3.4vw,42px)', letterSpacing: '-0.025em', marginTop: '14px' }}>From bet markets to a responsive front-end</h2></div>
            <div className="csw-contrib reveal reveal-d1">
              <div className="c"><span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v14H4zM4 9h16M8 13h3"/></svg></span><b>Bet-market UX</b><p>Designed the score grid, double chance, draw-no-bet and handicap markets into one scannable, colour-coded slip.</p></div>
              <div className="c"><span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18M7 14l3-3 3 3 4-5"/></svg></span><b>Transparent pools</b><p>Surfaced total pool, total payout and projected user payout so players see the value before staking.</p></div>
              <div className="c"><span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg></span><b>Responsive front-end</b><p>Built the dark neon system once and laid it out as a single-column app and a three-column web console.</p></div>
              <div className="c"><span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg></span><b>Results &amp; stats</b><p>A my-bets dashboard and last-5 / head-to-head stats close the loop from prediction to payout.</p></div>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: '0' }}>
          <div className="wrap">
            <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px', flexWrap: 'wrap', marginBottom: '26px' }}>
              <div><span className="eyebrow">The screens</span><h2 style={{ fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: 'clamp(26px,3.4vw,42px)', letterSpacing: '-0.025em', marginTop: '14px' }}>Predict, pool, track</h2></div>
              <span style={{ color: 'var(--muted-2)', fontSize: '13px' }}>Scroll to browse →</span>
            </div>
            <div className="csw-screens reveal reveal-d1">
              <div className="csw-pill"><div className="csw-phone"><div className="scr"><img src="/footycash/home-m-top.jpg" alt="FootyCash home" /></div></div><div className="lab">01 · Home<span>Live &amp; discover pools</span></div></div>
              <div className="csw-pill"><div className="csw-phone"><div className="scr"><img src="/footycash/predictor-m-top.jpg" alt="Match predictor" /></div></div><div className="lab">02 · Match Predicator<span>Correct score grid</span></div></div>
              <div className="csw-pill"><div className="csw-phone"><div className="scr"><img src="/footycash/threebet-m-top.jpg" alt="Three bet types" /></div></div><div className="lab">03 · Three Bet Types<span>Multi-match pool</span></div></div>
              <div className="csw-pill"><div className="csw-phone"><div className="scr"><img src="/footycash/mybets-m.jpg" alt="My bets" /></div></div><div className="lab">04 · My Bets<span>Won / lost &amp; payout</span></div></div>
              <div className="csw-pill"><div className="csw-phone"><div className="scr"><img src="/footycash/stats-m-top.jpg" alt="Statistics" /></div></div><div className="lab">05 · Statistics<span>Form &amp; head to head</span></div></div>
            </div>
          </div>
        </section>

        {/* The desktop console. The mobile screens above are the product most
            people use; these are the same four flows on the web build, which
            until now only existed in the live showcase. */}
        <section className="section" style={{ paddingTop: '0' }}>
          <div className="wrap">
            <div className="reveal" style={{ maxWidth: '680px', marginBottom: '26px' }}>
              <span className="eyebrow">The web app</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: 'clamp(26px,3.4vw,42px)', letterSpacing: '-0.025em', marginTop: '14px' }}>The same pools, on a data-dense desktop console</h2>
            </div>
            <div className="csw-web reveal reveal-d1">
              <div className="frame"><div className="bar"><i></i><i></i><i></i></div><img src="/footycash/home-web.jpg" alt="FootyCash web — home dashboard with live match, open pools and trending news" /><div className="lab">01 · Home<span>Live match, open pools, trending news</span></div></div>
              <div className="frame"><div className="bar"><i></i><i></i><i></i></div><img src="/footycash/predictor-web.jpg" alt="FootyCash web — match predictor with correct score and market tabs" /><div className="lab">02 · Match Predicator<span>Correct score, double chance, over / under</span></div></div>
              <div className="frame"><div className="bar"><i></i><i></i><i></i></div><img src="/footycash/threebet-web.jpg" alt="FootyCash web — three bet types across three fixtures" /><div className="lab">03 · Three Bet Types<span>Three fixtures, one slip</span></div></div>
              <div className="frame"><div className="bar"><i></i><i></i><i></i></div><img src="/footycash/mybets-web.jpg" alt="FootyCash web — my bets with won and lost breakdown and payout" /><div className="lab">04 · My Bets<span>Won / lost split and running payout</span></div></div>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: '0' }}>
          <div className="wrap">
            <div className="csw-cta reveal">
              <div className="glow"></div>
              <div className="in">
                <span className="kick">Live showcase</span>
                <h2>Walk the full platform,<br/>mobile and web.</h2>
                <p>See the predictor, the pools and the results dashboard in interactive mobile mockups and desktop browser frames on the branded FootyCash canvas.</p>
                <a className="btn btn-banner" href="/footycash/FootyCash.html">Explore the showcase</a>
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
            <span>© 2026 TheNabLab</span>
            <span className="nl-tag"><b style={{ fontWeight: 'inherit', color: '#19b7d1' }}>Designing</b> products. <b style={{ fontWeight: 'inherit', color: '#8b6bff' }}>Engineering</b> experiences.</span>
            <div className="nl-socials"><a href="https://www.linkedin.com/in/nabil-abou-rjeily-b033a698" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.22 8.02h4.52V24H.22zM8.34 8.02h4.33v2.18h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V24h-4.52v-7.66c0-1.83-.03-4.18-2.55-4.18-2.56 0-2.95 2-2.95 4.05V24H8.34z" fill="currentColor" stroke="none"/></svg></a><a href="https://www.behance.net/nabil_abourjeily" target="_blank" rel="noopener noreferrer" aria-label="Behance"><svg viewBox="0 0 24 24"><path d="M7.5 11.3c1.2-.5 1.9-1.5 1.9-2.9 0-2.6-1.9-3.4-4.2-3.4H0v13.9h5.4c2.4 0 4.7-1.2 4.7-4 0-1.7-.8-3-2.6-3.6zM3 7.4h2.1c.9 0 1.7.3 1.7 1.3 0 1-.7 1.4-1.6 1.4H3zm2.3 9H3v-3.2h2.4c1.1 0 1.8.5 1.8 1.6 0 1.2-.8 1.6-1.9 1.6zM18.8 9c-2.8 0-4.7 2.1-4.7 4.9s1.8 4.8 4.7 4.8c2.2 0 3.8-1 4.5-3h-2.4c-.3.8-1.1 1.2-1.9 1.2-1.5 0-2.3-.9-2.3-2.4h6.8c.2-2.9-1.4-5.5-4.7-5.5zm-2.1 3.9c0-1.2.9-2.1 2.1-2.1 1.3 0 1.9.7 2 2.1zM15.2 5.9h5.9v1.5h-5.9z" fill="currentColor" stroke="none"/></svg></a></div>
          </div>
        </div>
      </footer>
      </main>
    </>
  );
}
