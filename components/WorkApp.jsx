'use client';

/* WorkApp — the "All Work" archive grid. Ported from legacy/work-app.jsx. */

import { useState, useEffect, useRef } from 'react';
import { DATA } from '@/lib/data';
import { Icon, Social } from '@/lib/icons';
import { useRevealObserver, useScrollNav, useMobileNav } from '@/lib/hooks';
import { brandOf } from '@/lib/brand';
import NabMark from '@/components/NabMark';
import { cardLink } from '@/lib/links';
import { ProjectTitle } from '@/lib/title';

const WORK_NAV = ['Services', 'About', 'Skills', 'Work', 'Contact'];

function WorkMegaMenu() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const closeT = useRef(null);
  const items = DATA.featured;
  const openNow = () => { clearTimeout(closeT.current); setOpen(true); };
  const closeSoon = () => { clearTimeout(closeT.current); closeT.current = setTimeout(() => setOpen(false), 150); };
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    const onDocClick = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onDocClick);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('click', onDocClick); clearTimeout(closeT.current); };
  }, []);
  return (
    <div className={'pnav-mega' + (open ? ' open' : '')} ref={wrapRef} onMouseEnter={openNow} onMouseLeave={closeSoon}>
      <a href="/#work" className="mega-trigger" aria-haspopup="true" aria-expanded={open} onFocus={openNow}
         onClick={(e)=>{const noHover=window.matchMedia('(hover: none), (pointer: coarse)').matches; if(noHover){e.preventDefault(); setOpen((o)=>!o);}}}>
        Work <Icon name="chevronDown" />
      </a>
      <div className="mega-panel" role="menu" aria-label="Selected work">
        <div className="mega-head">
          <span className="eyebrow">Selected work</span>
          <a className="mega-all-link" href="/#work" role="menuitem">Back to home <Icon name="arrowUpRight" /></a>
        </div>
        <div className="mega-grid">
          {items.map((c) => {
            const brand = brandOf(c);
            const name = c.title.split('—')[0].trim();
            const FIXM = { '/alhilal/home.jpg': '/alhilal/home-x.jpg', '/alhilal/onb1.jpg': '/alhilal/onb1-x.jpg' };
            const fx = (s) => FIXM[s] || s;
            const shot = fx(c.img || (c.phones && c.phones[0]) || (c.web && c.web[0]));
            const backShot = fx((c.phones && c.phones[1]) || shot);
            return (
              <a className="mega-card" key={c.title} href={c.link ? cardLink(c).href : '/#work'} role="menuitem" onClick={() => setOpen(false)}>
                <span className="mega-thumb">
                  <span className="work-card-art mt" data-accent={c.accent} data-brand={brand}>
                    {c.phones ? (
                      <span className="dev dev-phones">
                        <span className="cphone back"><span className="scr"><img src={backShot} alt="" /></span></span>
                        <span className="cphone front"><span className="scr"><img src={shot} alt={name} /></span></span>
                      </span>
                    ) : (
                      <span className="dev dev-laptop">
                        <span className="dev-top"><span className="dev-scr"><img src={shot} alt={name} /></span></span>
                        <span className="dev-base"></span>
                      </span>
                    )}
                  </span>
                </span>
                <span className="mega-name">{name}</span>
                <span className="mega-ind">{c.ind}</span>
              </a>
            );
          })}
        </div>
        <div className="mega-foot">
          <a className="btn btn-primary" href="/" role="menuitem" onClick={() => setOpen(false)}>Back to homepage</a>
          <span className="pf-more-note">All {DATA.caseStudies.length} projects listed below</span>
        </div>
      </div>
    </div>
  );
}

function WorkNav() {
  const { scrolled } = useScrollNav();
  const [menuOpen, setMenuOpen] = useMobileNav();
  const close = () => setMenuOpen(false);

  return (
    <nav className={`pnav${scrolled ? ' scrolled' : ''}${menuOpen ? ' menu-open' : ''}`}>
      <div className="pnav-inner">
        <a className="plogo" href="/">
          <span className="mk"><NabMark id="mk-nav" /></span><span className="plogo-txt"><span className="wm">the<span className="teal">Nab</span>Labs</span><small>by Nabil Abou Rjeily</small></span>
        </a>
        <div className="pnav-links">
          {WORK_NAV.map((n) => n === 'Work' ? <WorkMegaMenu key={n} /> : <a key={n} href={'/#' + n.toLowerCase()}>{n}</a>)}
        </div>
        <a className="btn btn-teal pnav-cta" href="/#contact" style={{ padding: '12px 22px' }}><span className="btn-neon" aria-hidden="true"></span>Let’s talk</a>
        <button
          type="button"
          className="pnav-burger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="pnav-mobile"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>
        </button>
      </div>

      {/* Below the nav breakpoint .pnav-links is hidden, so the archive page
          needs the same disclosure the home page has to stay navigable. */}
      <div id="pnav-mobile" className="pnav-mobile" hidden={!menuOpen}>
        <div className="pnav-mobile-inner">
          {WORK_NAV.map((n) => (
            <a key={n} href={n === 'Work' ? '/work' : '/#' + n.toLowerCase()} onClick={close}>{n}</a>
          ))}
          <div className="pnav-mobile-sub">
            <span className="pnav-mobile-label">Case studies</span>
            {DATA.featured.map((c) => (
              <a key={c.title} href={c.link ? cardLink(c).href : '/#work'} onClick={close}>{c.title}</a>
            ))}
            <a className="pnav-mobile-all" href="/" onClick={close}>Back to home <Icon name="arrowUpRight" /></a>
          </div>
          <a className="btn btn-teal pnav-mobile-cta" href="/#contact" onClick={close}>Let’s talk <Icon name="arrowUpRight" /></a>
        </div>
      </div>
      <button type="button" className="pnav-scrim" hidden={!menuOpen} tabIndex={-1} aria-hidden="true" onClick={close}></button>
    </nav>
  );
}

function WorkGrid() {
  return (
    <section className="section workhero">
      <div className="wrap">
        <div className="work-head reveal">
          <span className="eyebrow center">All work</span>
          <h1>Everything from the <span className="teal">lab</span>.</h1>
          <p className="sec-sub" style={{ marginInline: 'auto' }}>The complete archive of products I’ve designed and shipped: across fintech, healthcare, hospitality, AI and enterprise.</p>
        </div>
        <div className="work-grid">
          {DATA.caseStudies.map((c, i) => {
            // Al Hilal exports ship with a lavender frame baked in — use cleaned full-bleed crops
            const FIX = { '/alhilal/home.jpg': '/alhilal/home-x.jpg', '/alhilal/onb1.jpg': '/alhilal/onb1-x.jpg' };
            const fix = (s) => FIX[s] || s;
            const shot = fix(c.img || (c.phones && c.phones[0]) || (c.web && c.web[0]));
            const backShot = fix((c.phones && c.phones[1]) || shot);
            const isMobile = !!c.phones;
            const brand = (shot || '').replace(/^\//, '').split('/')[0];
            const Tag = c.link ? 'a' : 'div';
            const link = cardLink(c);
            const props = c.link ? { href: link.href } : {};
            return (
              <Tag className="work-card reveal" key={c.title} {...props}>
                <div className="work-card-art" data-accent={c.accent} data-brand={brand}>
                  {isMobile ? (
                    <span className="dev dev-phones">
                      <span className="cphone back"><span className="scr"><img src={backShot} alt="" /></span></span>
                      <span className="cphone front"><span className="scr">{shot ? <img src={shot} alt={c.title} /> : <span className="ph-screen"></span>}</span></span>
                    </span>
                  ) : (
                    <span className="dev dev-laptop">
                      <span className="dev-top"><span className="dev-scr">{shot ? <img src={shot} alt={c.title} /> : <span className="ph-screen"></span>}</span></span>
                      <span className="dev-base"></span>
                    </span>
                  )}
                </div>
                <div className="work-card-body">
                  <div className="pf-no">{c.ind} · {c.yr}</div>
                  <h3><ProjectTitle title={c.title} /></h3>
                  <p>{c.desc}</p>
                  <div className="work-card-foot">
                    <div className="pf-tags">
                      <span>{c.role}</span>
                      {(c.tags || []).map((t) => <span key={t}>{t}</span>)}
                    </div>
                    <span className={'work-card-link' + (c.link ? '' : ' muted')}>
                      {link.label} <Icon name="arrowUpRight" />
                    </span>
                  </div>
                </div>
              </Tag>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WorkFooter() {
  return (
    <footer className="pfooter">
      <div className="wrap">
        <div className="pfooter-top">
          <a className="plogo" href="/"><span className="mk"><NabMark id="mk-foot" /></span><span>the<span className="teal">Nab</span>Labs</span></a>
          <div className="pfooter-links">{WORK_NAV.map((n) => n === 'Work' ? <a key={n} href="/work">{n}</a> : <a key={n} href={'/#' + n.toLowerCase()}>{n}</a>)}</div>
        </div>
        <div className="pfooter-bottom">
          <span>© 2026 TheNabLab</span>
          <span className="pfooter-tag"><span style={{color:'#19b7d1'}}>Designing</span> products. <span style={{color:'#8b6bff'}}>Engineering</span> experiences.</span>
          <div className="socials">
            <a href="https://www.linkedin.com/in/nabil-abou-rjeily-b033a698" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Social name="linkedin" /></a>
            <a href="https://www.behance.net/nabil_abourjeily" target="_blank" rel="noopener noreferrer" aria-label="Behance"><Social name="behance" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function WorkApp() {
  useRevealObserver();
  return (
    <>
      <WorkNav />
      <WorkGrid />
      <WorkFooter />
    </>
  );
}

export default WorkApp;
