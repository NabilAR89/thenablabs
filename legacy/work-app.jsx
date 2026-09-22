/* work-app.jsx — TheNabLab "All Work" archive (card grid). */
const HOME = 'TheNabLab Pro v5 Charcoal.html';
const WORK_NAV = ['Services', 'About', 'Skills', 'Work', 'Contact'];

function WorkMegaMenu() {
  const [open, setOpen] = React.useState(false);
  const wrapRef = React.useRef(null);
  const closeT = React.useRef(null);
  const items = DATA.caseStudies.slice(0, 5);
  const openNow = () => { clearTimeout(closeT.current); setOpen(true); };
  const closeSoon = () => { clearTimeout(closeT.current); closeT.current = setTimeout(() => setOpen(false), 150); };
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    const onDocClick = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onDocClick);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('click', onDocClick); clearTimeout(closeT.current); };
  }, []);
  return (
    <div className={'pnav-mega' + (open ? ' open' : '')} ref={wrapRef} onMouseEnter={openNow} onMouseLeave={closeSoon}>
      <a href={HOME + '#work'} className="mega-trigger" aria-haspopup="true" aria-expanded={open} onFocus={openNow}
         onClick={(e)=>{const noHover=window.matchMedia('(hover: none), (pointer: coarse)').matches; if(noHover){e.preventDefault(); setOpen((o)=>!o);}}}>
        Work <Icon name="chevronDown" />
      </a>
      <div className="mega-panel" role="menu" aria-label="Selected work">
        <div className="mega-head">
          <span className="eyebrow">Selected work</span>
          <a className="mega-all-link" href={HOME + '#work'} role="menuitem">Back to home <Icon name="arrowUpRight" /></a>
        </div>
        <div className="mega-grid">
          {items.map((c) => {
            const brand = (c.img || (c.phones && c.phones[0]) || (c.web && c.web[0]) || c.href || '').split('/')[0];
            const name = c.title.split('—')[0].trim();
            const FIXM = { 'alhilal/home.jpg': 'alhilal/home-x.jpg', 'alhilal/onb1.jpg': 'alhilal/onb1-x.jpg' };
            const fx = (s) => FIXM[s] || s;
            const shot = fx(c.img || (c.phones && c.phones[0]) || (c.web && c.web[0]));
            const backShot = fx((c.phones && c.phones[1]) || shot);
            return (
              <a className="mega-card" key={c.title} href={c.link ? c.href : HOME + '#work'} role="menuitem" onClick={() => setOpen(false)}>
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
          <a className="btn btn-primary" href={HOME} role="menuitem" onClick={() => setOpen(false)}>Back to homepage <Icon name="arrowUpRight" /></a>
          <span className="pf-more-note">All {DATA.caseStudies.length} projects listed below</span>
        </div>
      </div>
    </div>
  );
}

function WorkNav() {
  const { scrolled } = useScrollNav();
  return (
    <nav className={`pnav${scrolled ? ' scrolled' : ''}`}>
      <div className="pnav-inner">
        <a className="plogo" href={HOME}>
          <span className="mk"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.6 18.4V6.6c0-.6.7-.9 1.1-.4l8.6 10.6V5.6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="16.3" cy="5.6" r="2.1" fill="currentColor" /></svg></span><span className="plogo-txt"><span className="wm">the<span className="teal">Nab</span>Lab</span><small>by Nabil Abou Rjeily</small></span>
        </a>
        <div className="pnav-links">
          {WORK_NAV.map((n) => n === 'Work' ? <WorkMegaMenu key={n} /> : <a key={n} href={HOME + '#' + n.toLowerCase()}>{n}</a>)}
        </div>
        <a className="btn btn-teal" href={HOME + '#contact'} style={{ padding: '12px 22px' }}><span className="btn-neon" aria-hidden="true"></span>Let’s talk</a>
      </div>
    </nav>
  );
}

function WorkGrid() {
  return (
    <section className="section workhero">
      <div className="wrap">
        <div className="work-topbar reveal">
          <a className="work-back" href={HOME}><Icon name="arrowRight" /> Back to home</a>
        </div>
        <div className="work-head reveal">
          <span className="eyebrow center">All work</span>
          <h1>Everything from the <span className="teal">lab</span>.</h1>
          <p className="sec-sub" style={{ marginInline: 'auto' }}>The complete archive of products I’ve designed and shipped — across fintech, healthcare, hospitality, AI and enterprise.</p>
        </div>
        <div className="work-grid">
          {DATA.caseStudies.map((c, i) => {
            // Al Hilal exports ship with a lavender frame baked in — use cleaned full-bleed crops
            const FIX = { 'alhilal/home.jpg': 'alhilal/home-x.jpg', 'alhilal/onb1.jpg': 'alhilal/onb1-x.jpg' };
            const fix = (s) => FIX[s] || s;
            const shot = fix(c.img || (c.phones && c.phones[0]) || (c.web && c.web[0]));
            const backShot = fix((c.phones && c.phones[1]) || shot);
            const isMobile = !!c.phones;
            const brand = (shot || '').split('/')[0];
            const Tag = c.link ? 'a' : 'div';
            const props = c.link ? { href: c.href } : {};
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
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                  <div className="pf-tags"><span>{c.role}</span></div>
                  <span className={'work-card-link' + (c.link ? '' : ' muted')}>
                    {c.link ? 'Read the case study' : 'Case study coming soon'} <Icon name="arrowUpRight" />
                  </span>
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
          <a className="plogo" href={HOME}><span className="mk"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.6 18.4V6.6c0-.6.7-.9 1.1-.4l8.6 10.6V5.6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="16.3" cy="5.6" r="2.1" fill="currentColor" /></svg></span><span>the<span className="teal">Nab</span>Lab</span></a>
          <div className="pfooter-links">{WORK_NAV.map((n) => n === 'Work' ? <a key={n} href="All Work.html">{n}</a> : <a key={n} href={HOME + '#' + n.toLowerCase()}>{n}</a>)}</div>
        </div>
        <div className="pfooter-bottom">
          <span>© 2026 TheNabLab</span>
          <span className="pfooter-tag"><span style={{color:'#19b7d1'}}>Designing</span> products. <span style={{color:'#8b6bff'}}>Engineering</span> experiences.</span>
          <div className="socials">
            <a href="#" aria-label="LinkedIn"><Social name="linkedin" /></a>
            <a href="#" aria-label="Behance"><Social name="behance" /></a>
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

ReactDOM.createRoot(document.getElementById('wroot')).render(<WorkApp />);
