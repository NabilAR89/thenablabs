/* BACKUP — the original ProHeroGeneral, saved 2026-09-13 before the rotating
   hero rebuild.

   To restore: replace the ProHeroGeneral function in components/ProApp.jsx with
   the one below, and delete the "rotating hero" block at the bottom of
   app/(home)/home.css. The markup below relies only on styles that already
   existed (.phero / .gphero in styles/pro.css and app/(home)/home.css), so
   nothing else needs reverting. */

/* ---------- General brand hero (statement-led, no personal bio) ---------- */
function ProHeroGeneral() {
  return (
    <header className="phero gphero line-reveal in" id="top">
      <div className="wrap phero-inner">
        <div className="phero-text">
          <span className="phero-eyebrow"><span className="dot-avail"></span> Product design &amp; front-end engineering</span>
          <h1>
            <span className="line-mask"><span><span style={{color:'#19b7d1'}}>Designing</span> products.</span></span>
            <span className="line-mask"><span><span style={{color:'#8b6bff'}}>Engineering</span> experiences.</span></span>
          </h1>
          <p className="lede">TheNabLab pairs product strategy, interface design and front-end engineering in one place — so ideas ship as products people love, with nothing lost in handoff.</p>
          <div className="phero-cta">
            <a className="btn btn-teal" href="#work" onClick={(e)=>{e.preventDefault(); scrollToId('work');}}><span className="btn-neon" aria-hidden="true"></span>View our work</a>
          </div>
        </div>

        <div className="phero-art">
          <div className="gbrowser">
            <img src="/base360/dashboard.png" alt="Product work — Base360 AI conversation platform" />
          </div>
          <div className="gphone2">
            <span className="s"><img src="/alhilal/home-crop.jpg" alt="Product work — Al Hilal banking app" /></span>
          </div>
          <div className="gphone">
            <span className="s"><img src="/smartwealth/screens/01-splash.jpg" alt="Product work — SmartWealth investing app" /></span>
          </div>
        </div>
      </div>
    </header>
  );
}
