/* MoodzCaseStudy — ported from "Moodz Case Study.html". */

import './moodz.css';
import NabMark from '@/components/NabMark';
import RevealOnScroll from '@/components/RevealOnScroll';
import { pageMeta, caseStudyLd, JsonLd } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Moodz — Case Study · TheNabLab',
  description:
    'Moodz — a conversational AI fashion store. A case study by Nabil Abou Rjeily.',
  path: '/case-studies/moodz',
  image: '/moods/ms-1.jpg',
  type: 'article',
});

export default function MoodzCaseStudy() {
  return (
    <>
      <RevealOnScroll />
      <JsonLd data={caseStudyLd({ title: metadata.title, description: metadata.description, path: '/case-studies/moodz', image: '/moods/ms-1.jpg' })} />
      <nav className="csw-nav">
        <div className="csw-nav-inner">
          <a className="csw-back" href="/work">
            <span className="ar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg></span>
            Back to work
          </a>
          <a className="nl-logo" href="/"><span className="nl-mk"><NabMark id="mk-nav" /></span><b><span>the<i>Nab</i>Labs</span><small>by Nabil Abou Rjeily</small></b></a>
          <a className="btn btn-teal" href="/moods/Moodz.html" style={{ padding: '11px 20px', fontSize: '14px' }}>Live showcase</a>
        </div>
      </nav>

      <main>
        <header className="csw-hero">
          <div className="wrap">
            <div className="reveal in"><span className="csw-kick">Case study · AI · E-commerce · Web · 2025</span></div>
            <h1 className="reveal in">Moodz — turning a vibe into an <span className="teal">outfit</span>.</h1>
            <p className="lede reveal in">A conversational shopping experience where an AI stylist turns a vibe into an outfit: neon-lit browsing, chat-driven product suggestions, live restyle/recolor controls and a frictionless cart-to-checkout flow.</p>
            <div className="csw-facts reveal in">
              <div><div className="k">Role</div><div className="v">Product Designer & Front-End</div></div>
              <div><div className="k">Timeline</div><div className="v">5 months</div></div>
              <div><div className="k">Platform</div><div className="v">Web · React</div></div>
              <div><div className="k">Domain</div><div className="v">AI E-commerce</div></div>
            </div>
            <div className="csw-banner reveal in">
              <div className="laptop"><div className="scr"><img src="/moods/ms-1.jpg" alt="Moodz storefront" /></div></div>
            </div>
          </div>
        </header>

        <section className="section" style={{ paddingBlock: 'clamp(50px,7vw,96px)' }}>
          <div className="wrap csw-2col">
            <div className="reveal"><span className="eyebrow">Overview</span><h2 style={{ marginTop: '14px' }}>A store that talks back</h2></div>
            <div className="csw-prose reveal reveal-d1">
              <p>Endless grids and filters ask shoppers to do the work of a stylist. <b>Moodz flips that. You describe a vibe, and an AI stylist assembles the look for you.</b></p>
              <p>I designed a neon-lit storefront that doubles as a chat surface: browse mood tiles and trends, or open the stylist and let swipeable product cards come to you, recolor and restyle them live, then drop them straight into a cart that never breaks the flow.</p>
              <p>I owned the experience and the front-end: the conversational UI, the product-card carousels, the live restyle controls and the checkout, all on a bold neon design language.</p>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: '0' }}>
          <div className="wrap">
            <div className="reveal" style={{ maxWidth: '680px', marginBottom: '30px' }}><span className="eyebrow">What I did</span><h2 style={{ fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: 'clamp(26px,3.4vw,42px)', letterSpacing: '-0.025em', marginTop: '14px' }}>Conversational commerce, end to end</h2></div>
            <div className="csw-contrib reveal reveal-d1">
              <div className="c"><span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z"/></svg></span><b>Conversational UX</b><p>Designed a chat that returns shoppable cards, quick-reply chips and a voice-friendly input bar.</p></div>
              <div className="c"><span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></span><b>Neon UI system</b><p>Built a glowing dark visual language (cyan, magenta, ember) that stays legible behind product imagery.</p></div>
              <div className="c"><span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg></span><b>Front-end build</b><p>Implemented the card carousels, live restyle/recolor controls and the cart-to-checkout flow in React.</p></div>
              <div className="c"><span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg></span><b>Browse & filter</b><p>Mood-led navigation by trend, gender, season and color/style so the store reads the room.</p></div>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: '0' }}>
          <div className="wrap">
            <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px', flexWrap: 'wrap', marginBottom: '26px' }}>
              <div><span className="eyebrow">The screens</span><h2 style={{ fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: 'clamp(26px,3.4vw,42px)', letterSpacing: '-0.025em', marginTop: '14px' }}>From a vibe to a placed order</h2></div>
            </div>
            <div className="csw-web reveal reveal-d1">
              <div className="frame wide"><div className="bar"><i></i><i></i><i></i></div><img src="/moods/ms-1.jpg" alt="Moodz storefront" /><div className="lab">01 · Storefront<span>Mood tiles & discovery filters</span></div></div>
              <div className="frame"><div className="bar"><i></i><i></i><i></i></div><img src="/moods/ms-2.jpg" alt="Moodz AI stylist" /><div className="lab">02 · AI stylist<span>Open canvas, voice-ready input</span></div></div>
              <div className="frame"><div className="bar"><i></i><i></i><i></i></div><img src="/moods/ms-3.jpg" alt="Moodz suggestions" /><div className="lab">03 · Suggestions<span>Shoppable cards from one prompt</span></div></div>
              <div className="frame"><div className="bar"><i></i><i></i><i></i></div><img src="/moods/ms-4.jpg" alt="Moodz product card" /><div className="lab">04 · Product<span>Size, colour & live restyle</span></div></div>
              <div className="frame"><div className="bar"><i></i><i></i><i></i></div><img src="/moods/ms-5.jpg" alt="Moodz cart drawer" /><div className="lab">05 · Cart drawer<span>Adjust without leaving the chat</span></div></div>
              <div className="frame"><div className="bar"><i></i><i></i><i></i></div><img src="/moods/ms-6.jpg" alt="Moodz full cart" /><div className="lab">06 · Full cart<span>Order summary & totals</span></div></div>
              <div className="frame"><div className="bar"><i></i><i></i><i></i></div><img src="/moods/ms-7.jpg" alt="Moodz checkout" /><div className="lab">07 · Checkout<span>Details, then place the order</span></div></div>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: '0' }}>
          <div className="wrap">
            <div className="csw-cta reveal">
              <div className="glow"></div>
              <div className="in">
                <span className="kick">Live showcase</span>
                <h2>Shop the whole flow,<br/>vibe to checkout.</h2>
                <p>See the storefront, the AI stylist and the cart in full-width browser frames on the branded neon canvas.</p>
                <a className="btn btn-banner" href="/moods/Moodz.html">Explore the showcase</a>
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
