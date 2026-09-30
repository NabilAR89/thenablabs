/* data.jsx — site content. Ported from legacy/data.jsx.
   Asset paths are root-absolute because the project media now lives in public/. */

export const DATA = {
  nav: [
    "About",
    "Expertise",
    "Experience",
    "Skills",
    "Case Studies",
    "Projects",
    "Contact",
  ],

  /* Booking — copy for the "book a call" section. The event itself (length,
     availability, buffers) is configured in Cal.com; CAL_EVENT_TYPE_ID in the
     Cloudflare Pages env vars decides which event type is booked. */
  booking: {
    kicker: "Book a call",
    title: (
      <>
        Let&rsquo;s build something <span className="teal">great</span>.
      </>
    ),
    lead: "Tell us what you\u2019re working on and pick a time that suits you. We\u2019ll talk through the idea and what it would take to ship it.",
    eventLabel: "30-minute intro call",
    footnote:
      "30-minute calls. All times are shown in your selected time zone.",
    email: "hello@thenablabs.com",
    panel: {
      kicker: "Your idea, our craft",
      title: (
        <>
          30 minutes, <br />
          no sales pitch.
        </>
      ),
      body: "You\u2019ll talk directly with the person who designs and builds the work, not an account manager.",
      points: [
        "Share the product you want to build",
        "Get a candid design and technical read",
        "Leave with a clear, practical next step",
      ],
    },
  },

  /* Hero — the kicker/headline pairs cross-fade on a timer (see ProHeroGeneral
     in components/ProApp.jsx). Add, remove or reorder freely; the rotator
     follows the list length. Keep headlines to roughly two lines. */
  hero: {
    lines: [
      {
        kick: "We design & build",
        head: (
          <>
            Products people actually <span className="hl">love</span> to use
          </>
        ),
      },
      {
        kick: "Design-first",
        head: (
          <>
            Interfaces that set your <span className="hl">brand</span> apart
          </>
        ),
      },
      {
        kick: "We solve hard problems",
        head: (
          <>
            Turning complexity into <span className="hl">clear</span>, simple
            flows
          </>
        ),
      },
      {
        kick: "Fast delivery",
        head: (
          <>
            From idea to launch in <span className="hl">weeks</span>, not months
          </>
        ),
      },
      {
        kick: "Build once",
        head: (
          <>
            One system, shipped to{" "}
            <span className="hl">web, iOS and Android</span>
          </>
        ),
      },
    ],
    /* The desktop mockup anchors the composition; the phones float around it.
       Placement is per-device so it can be tuned without touching the CSS:
       l and w are percentages of the box's WIDTH; t is a percentage of its
       HEIGHT (that is how CSS resolves `left`/`width` vs `top`), z is the
       stacking order. The box is sized in home.css — its aspect-ratio has to
       leave room for t plus the phone's own height. */
    /* `chrome: true` marks a screenshot that already carries its own browser
       bar, so the frame does not draw one over it (base360/dashboard.png is
       one such asset). This one has none, so the frame supplies it. */
    /* Taller than the 16:10 frame, so it cover-crops from the top — the frame
       shows the first ~71% of the page, which reads as a browser scrolled to
       the top. Header, imaging viewer and the synthesis panel all survive. */
    web: {
      src: "/wimsa/w-diagnostics.jpg",
      alt: "Wimsa — diagnostics and imaging review",
    },

    /* A second desktop screen, tucked down and to the right of the first so
       the pair reads as layered windows. This one carries the whole Tahakkom
       wall, so its frame takes the wall's own 5.44:1 rather than the 1200/740
       the first screen uses: same width, a fraction of the height, nothing
       cropped (see .hero-web-2 in home.css). */
    web2: {
      src: "/tahakkom/wall.jpg",
      alt: "Tahakkom — the full Riyadh command wall",
    },

    /* Carousel-only lead slide. The desktop composition is a fixed arrangement
       of `web` plus `devices` at hand-tuned coordinates, so this one is not
       part of it — it exists to open the tablet/mobile carousel on the
       SmartWealth home screen, and is hidden above that breakpoint. */
    lead: {
      src: "/smartwealth/screens/01-splash.jpg",
      alt: "SmartWealth — home screen",
    },

    devices: [
      {
        src: "/smartwealth/screens/03-kyc.jpg",
        alt: "SmartWealth — KYC verification step",
        l: "6.9%",
        t: "19%",
        w: "15.3%",
        z: 2,
      },
      {
        src: "/alhilal/home-crop.jpg",
        alt: "Al Hilal — digital banking app",
        l: "13.8%",
        t: "27.4%",
        w: "15.3%",
        z: 3,
      },
      {
        src: "/wimsa/m-today.png",
        alt: "Wimsa — clinic management",
        l: "0%",
        t: "10.8%",
        w: "15.3%",
        z: 1,
      },
      {
        src: "/relatedapp/front.jpg",
        alt: "Related — restaurant table booking",
        l: "84.7%",
        t: "16.5%",
        w: "15.3%",
        z: 1,
      },
      {
        src: "/msheireb/m-home.jpg",
        alt: "Msheireb — smart home control",
        l: "77.9%",
        t: "24.7%",
        w: "15.3%",
        z: 2,
      },
    ],
  },

  stats: [
    { n: "12+", l: "Years bridging design & engineering" },
    { n: "40+", l: "Products shipped to production" },
    { n: "6", l: "Industries — fintech, SaaS, enterprise & more" },
  ],

  disciplines: [
    "Product Design",
    "UX / UI Design",
    "Front-End Engineering",
    "Design Systems",
    "Prototyping",
    "User Research",
    "Interaction Design",
    "Websites",
    "Web Apps",
    "Mobile Apps",
    "Ecommerce",
    "Design to Code",
  ],

  about: {
    lead: (
      <>
        I started as a designer obsessed with pixels — and became an engineer
        obsessed with <span className="accent">shipping</span>. Today I live in
        the space between the two.
      </>
    ),
    body: [
      "Over 12+ years I evolved from crafting interfaces in Figma to architecting the front-end systems that bring them to life. That dual fluency means I design with implementation in mind, and I build with the user experience in mind — nothing gets lost in handoff because there is no handoff.",
      "I have led product design and front-end architecture for fintech platforms, enterprise SaaS, and open-banking products — owning everything from early research and user flows to design systems, component libraries, and scalable Angular and React codebases.",
      "What drives me is the whole arc: understanding a business problem, shaping the experience, and engineering a solution real people love to use.",
    ],
    chips: [
      "12+ years",
      "UX / UI Design",
      "Product Design",
      "Angular",
      "React",
      "Next.js",
      "Design Systems",
      "Fintech",
      "Enterprise",
    ],
  },

  expertise: [
    {
      ico: "pen",
      title: "Product Design",
      desc: "Turning ambiguous problems into clear, validated product direction.",
      tags: [
        "User research",
        "Wireframes",
        "User flows",
        "Prototyping",
        "Journey mapping",
        "Usability testing",
      ],
    },
    {
      ico: "layers",
      title: "UX / UI Design",
      desc: "Interfaces that are precise, accessible, and unmistakably premium.",
      tags: [
        "Figma",
        "Interaction design",
        "Design systems",
        "Accessibility",
        "Design tokens",
        "Responsive UI",
      ],
    },
    {
      ico: "code",
      title: "Front-End Engineering",
      desc: "Production-grade, scalable front-ends that match the design 1:1.",
      tags: ["React", "Next.js", "Angular", "TypeScript", "Tailwind", "Git"],
    },
    {
      ico: "target",
      title: "Product Strategy",
      desc: "Aligning business goals and user needs into a focused roadmap.",
      tags: [
        "Business goals",
        "User needs",
        "Feature planning",
        "Metrics",
        "Roadmapping",
        "Workshops",
      ],
    },
  ],

  timeline: [
    {
      when: "2021 — Now",
      now: true,
      role: "Senior UX/UI Engineer",
      co: "Enterprise Cloud Platform",
      desc: "Own product design and front-end architecture for a multi-product B2B cloud platform: driving the design system, component library, and cross-functional delivery.",
      resp: [
        "Product Design",
        "Front-End Architecture",
        "Design Systems",
        "Cross-functional collaboration",
      ],
    },
    {
      when: "2018 — 2021",
      role: "Lead Product Designer",
      co: "Fintech Scale-up",
      desc: "Led end-to-end design for consumer and B2B fintech products, from research through shipped, instrumented interfaces.",
      resp: ["UX Research", "Design Systems", "Prototyping", "Front-End"],
    },
    {
      when: "2015 — 2018",
      role: "UX/UI Designer",
      co: "Digital Product Agency",
      desc: "Designed and built digital products for startups and enterprise clients across SaaS, commerce, and platforms.",
      resp: ["UX/UI Design", "Interaction", "HTML/CSS/JS"],
    },
    {
      when: "2013 — 2015",
      role: "Front-End Developer",
      co: "SaaS Startup",
      desc: "Built and maintained responsive front-ends, collaborating closely with design and product from day one.",
      resp: ["JavaScript", "CSS", "Responsive", "UI"],
    },
  ],

  skills: {
    Design: [
      ["UX Research", 88],
      ["User Flows", 90],
      ["Wireframing", 94],
      ["Design Systems", 96],
      ["Figma", 95],
    ],
    Engineering: [
      ["React", 92],
      ["Next.js", 88],
      ["Angular", 90],
      ["TypeScript", 89],
      ["HTML / CSS", 96],
      ["Tailwind", 90],
    ],
    Tools: [
      ["Figma", 95],
      ["Jira", 85],
      ["Git", 90],
      ["VS Code", 92],
      ["Adobe Suite", 80],
      ["Storybook", 86],
    ],
  },

  caseStudies: [
    {
      ind: "Fintech · Mobile",
      yr: "2025",
      title: "SmartWealth — Investing Onboarding",
      desc: "Designed and built the end-to-end onboarding for SmartWealth by NBK Wealth, from splash through biometric ID, KYC and investment preferences to a funded portfolio.",
      role: "Product Design & Front-End",
      tags: [
        "UX",
        "UI",
        "Prototyping",
        "Design System",
        "Fintech",
        "Investing",
      ],
      duration: "5 months",
      showcaseHref: "/smartwealth/SmartWealth.html",
      caseHref: "/case-studies/smartwealth",
      img: "/smartwealth/screens/01-splash.jpg",
      phones: [
        "/smartwealth/screens/01-splash.jpg",
        "/smartwealth/screens/kyc-investment.jpg",
      ],
      accent: 0,
      link: true,
      featured: true,
    },
    {
      ind: "Fintech · Mobile",
      yr: "2025",
      title: "Al Hilal — Digital Banking App",
      desc: "A youth-focused digital banking super-app for Al Hilal Bank, pairing a prepaid debit card and children’s saving accounts with everyday lifestyle services, from a guided onboarding to a rewards-driven home.",
      role: "Product Design & Front-End",
      tags: [
        "UX",
        "UI",
        "Design System",
        "Motion",
        "Fintech",
        "Digital Banking",
      ],
      duration: "4 months",
      phones: [
        "/alhilal/home-x.jpg",
        "/alhilal/onb1-x.jpg",
        "/alhilal/onb2-x.jpg",
      ],
      video: "/alhilal/home-anim.webp",
      banner: true,
      accent: 1,
      showcaseHref: "/alhilal/AlHilal.html",
      caseHref: "/case-studies/al-hilal",
      link: true,
    },
    {
      ind: "Healthcare SaaS · Web & Mobile",
      yr: "2024",
      title: "Wimsa — Clinic Management Platform",
      desc: "An end-to-end clinic management platform: secure medical records, scheduling, lab orders and task workflows. Delivered as a responsive web console for the front desk and a companion mobile app for clinicians on the move.",
      role: "Product Design & Front-End",
      tags: [
        "UX",
        "UI",
        "Design System",
        "Responsive Web",
        "Healthcare",
        "SaaS",
      ],
      duration: "10 months",
      web: ["/wimsa/w-today.jpg", "/wimsa/w-diagnostics.jpg"],
      mobile: ["/wimsa/m-today.png", "/wimsa/m-chart.png"],
      showcase: true,
      accent: 0,
      showcaseHref: "/wimsa/Wimsa.html",
      caseHref: "/case-studies/wimsa",
      link: true,
    },
    {
      ind: "Govtech · Command Center · Web",
      yr: "2026",
      title: "Tahakkom — Unified Systems & SLA Wall",
      desc: "A 17,000px control-room video wall and operations console for Tahakkom’s Riyadh command center: 4,548 enforcement and sensor sites on one live map, with SLA attainment, capture delays, outages, ticket ageing and a scrolling alert feed readable from across the room.",
      role: "Product Design & Front-End",
      tags: [
        "UX",
        "UI",
        "Data Viz",
        "Design System",
        "Govtech",
        "Command Center",
      ],
      duration: "7 months",
      web: ["/tahakkom/wall.jpg", "/tahakkom/ops.jpg"],
      accent: 1,
      caseHref: "/case-studies/tahakkom",
      link: true,
    },
    {
      ind: "AI · E-commerce · Web",
      yr: "2025",
      title: "Moods — AI Fashion Store",
      desc: "A conversational shopping experience where an AI stylist turns a vibe into an outfit: neon-lit browsing, chat-driven product suggestions, live restyle/recolor controls, and a frictionless cart-to-checkout flow.",
      role: "Product Design & Front-End",
      tags: ["UX", "UI", "Interaction Design", "AI", "Ecommerce", "Fashion"],
      duration: "5 months",
      web: ["/moods/d-discover.jpg", "/moods/d-suggestions.jpg"],
      accent: 2,
      showcaseHref: "/moods/Moods.html",
      caseHref: "/case-studies/moods",
      link: true,
    },
    {
      ind: "Smart City · Web & Mobile",
      yr: "2025",
      title: "Msheireb — Smart District Living",
      desc: "A marketing site and companion home-automation app for Msheireb Downtown Doha: the world\u2019s first sustainable downtown. The site sells the district\u2019s vision; the app puts climate, energy, devices and visitor access in residents\u2019 hands.",
      role: "Product Design & Front-End",
      tags: ["UX", "UI", "Web Design", "Motion", "Real Estate", "Smart Home"],
      duration: "6 months",
      web: ["/msheireb/hero.jpg", "/msheireb/m-home.jpg"],
      accent: 0,
      showcaseHref: "/msheireb/Msheireb.html",
      link: true,
    },
    {
      ind: "Hospitality · Mobile",
      yr: "2025",
      title: "Related — Restaurant Table Booking",
      desc: "A concierge-style dining app for discovering venues and reserving the perfect table: from date, guests and live availability through an interactive floor plan, special requests and a confirmed booking with reminders.",
      role: "Product Design & Front-End",
      tags: [
        "UX",
        "UI",
        "Interaction Design",
        "Prototyping",
        "Hospitality",
        "Booking",
      ],
      duration: "4 months",
      phones: [
        "/relatedapp/front.jpg",
        "/relatedapp/back.jpg",
        "/relatedapp/confirm-booking.jpg",
      ],
      banner: true,
      showcaseHref: "/relatedapp/Related.html",
      caseHref: "/case-studies/related",
      accent: 2,
      link: true,
    },
    {
      ind: "AI SaaS · Web",
      yr: "2026",
      title: "Base360 — AI Conversation & Lead Platform",
      desc: "A platform that unifies every channel (Meta and TikTok comments, DMs, WhatsApp, SMS, email and calls) into one inbox where AI agents reply in seconds, turn each thread into a tracked lead, and nurture it through to the sale.",
      role: "Product Design & Front-End",
      tags: ["UX", "UI", "Design System", "Dashboards", "AI", "SaaS", "CRM"],
      duration: "4 months",
      web: ["/base360/landing-full.png", "/base360/dashboard.png"],
      banner: true,
      accent: 2,
      showcaseHref: "/base360/Base360.html",
      link: true,
    },
    {
      ind: "AI · E-commerce · Web",
      yr: "2025",
      title: "Gaia — AI Shopping Assistant",
      desc: "A conversational AI assistant woven into the BuyMore storefront. It tracks orders, applies promos, surfaces collections and resolves issues, turning support tickets and dead-end searches into a single, friendly chat.",
      role: "Product Design & Front-End",
      tags: [
        "UX",
        "UI",
        "Conversational UI",
        "AI",
        "Ecommerce",
        "Customer Support",
      ],
      duration: "5 months",
      web: ["/gaia/home.jpg", "/gaia/assistant.jpg"],
      accent: 1,
      showcaseHref: "/gaia/Gaia.html",
      link: true,
    },
    {
      ind: "Nightlife · Web",
      yr: "2024",
      title: "Discotek — Club & Events Site",
      desc: "A neon-soaked nightlife site for the Discotek club: a video-led hero, headline-act events and ticketing, a resident-DJ roster, a charged photo gallery and table bookings, all wrapped in a cyan-and-magenta identity that glows in the dark.",
      role: "Product Design & Front-End",
      tags: [
        "UI",
        "Web Design",
        "Motion",
        "Art Direction",
        "Nightlife",
        "Events",
      ],
      duration: "3 months",
      web: ["/discotek/hero.png", "/discotek/events.png"],
      accent: 2,
      showcaseHref: "/discotek/Discotek.html",
      link: true,
    },
    {
      ind: "PropTech · Web & Mobile",
      yr: "2024",
      title: "Locus — Property Management Platform",
      desc: "A property-management platform for agencies: a data-dense web console for portfolios, listings, repairs, leads and cashflow, paired with a mobile app that keeps bookings, offers and maintenance requests moving on the go.",
      role: "Product Design & Front-End",
      tags: [
        "UX",
        "UI",
        "Data Viz",
        "Design System",
        "PropTech",
        "Real Estate",
      ],
      duration: "8 months",
      web: ["/locus/dash-1.png", "/locus/properties.png"],
      accent: 0,
      showcaseHref: "/locus/Locus.html",
      link: true,
    },
    {
      ind: "iGaming · Web & Mobile",
      yr: "2025",
      title: "Goalpot — Football Prediction Platform",
      desc: "A pool-based football prediction and betting platform for Ghana\u2019s leagues: score predictors, three bet types and live pools with transparent payouts, delivered as a fast mobile app and a data-dense desktop console on a stadium-night neon identity.",
      role: "Product Design & Front-End",
      tags: ["UX", "UI", "Data Viz", "Design System", "iGaming", "Sports"],
      duration: "5 months",
      phones: [
        "/goalpot/m-home.png",
        "/goalpot/m-predictor.png",
        "/goalpot/m-threebet.png",
      ],
      accent: 0,
      showcaseHref: "/goalpot/Goalpot.html",
      caseHref: "/case-studies/goalpot",
      link: true,
    },
    {
      ind: "Hospitality · Web",
      yr: "2024",
      title: "Barley — Steak & Burger Restaurant",
      desc: "A full-screen, story-driven website for Barley, a Beirut steak & burger house: each section a cinematic frame, from a flame-grilled hero and a cream welcome to popular platters and a full burger menu, switching between charcoal-dark and warm light.",
      role: "Product Design & Front-End",
      tags: [
        "UI",
        "Web Design",
        "Motion",
        "Art Direction",
        "Hospitality",
        "Restaurant",
      ],
      duration: "3 months",
      web: ["/barley/popular.jpg", "/barley/home.jpg"],
      accent: 2,
      showcaseHref: "/barley/Barley.html",
      caseHref: "/case-studies/barley",
      link: true,
    },
  ],

  projects: [
    {
      cat: "Web App",
      name: "Ledger Dashboard",
      tools: "React · TS · D3",
      accent: 0,
    },
    {
      cat: "Mobile",
      name: "Wallet Onboarding",
      tools: "Figma · Prototype",
      accent: 1,
    },
    {
      cat: "Design System",
      name: "Component Library",
      tools: "Storybook · React",
      accent: 2,
    },
    {
      cat: "Marketing",
      name: "Product Site",
      tools: "Next.js · Motion",
      accent: 0,
    },
    {
      cat: "Enterprise",
      name: "Admin Console",
      tools: "Angular · TS",
      accent: 1,
    },
    { cat: "Concept", name: "AI Agent UI", tools: "Figma · React", accent: 2 },
  ],

  testimonials: [
    {
      quote:
        "Nabil is the rare person who can lead a design critique in the morning and review a pull request in the afternoon, and improve both. He raised the bar for the entire product org.",
      name: "Product Director",
      role: "Enterprise Cloud Platform",
      av: "PD",
    },
    {
      quote:
        "He owns the full product lifecycle. Strategy, research, polished UI, then a front-end that ships exactly as designed. Our velocity and quality both went up.",
      name: "VP of Engineering",
      role: "Fintech Scale-up",
      av: "VE",
    },
  ],

  /* The home page and both Work megamenus show a hand-picked five, each with
     its own art treatment in ProApp — a banner, a showcase block or a phone
     fan. They used to be `caseStudies.slice(0, 5)`, which quietly tied them
     to the archive's running order: reordering the archive silently changed
     which projects the home page featured, and any project without banner /
     showcase / phones art fell through to a grey placeholder. Named here so
     the two orders can move independently. */
  featuredTitles: ["SmartWealth", "Al Hilal", "Wimsa", "Related", "Base360"],

  contact: [
    {
      k: "Email",
      v: "hello@thenablabs.com",
      href: "mailto:hello@thenablabs.com",
      icon: "mail",
    },
    {
      k: "LinkedIn",
      v: "/in/nabil-abou-rjeily",
      href: "https://www.linkedin.com/in/nabil-abou-rjeily-b033a698",
      icon: "linkedin",
    },
    {
      k: "Behance",
      v: "/nabil_abourjeily",
      href: "https://www.behance.net/nabil_abourjeily",
      icon: "behance",
    },
    { k: "GitHub", v: "/thenablabs", href: "#", icon: "github" },
  ],
};

export default DATA;

/* Resolved once, in the order named above. */
DATA.featured = DATA.featuredTitles
  .map((name) => DATA.caseStudies.find((c) => c.title.startsWith(name)))
  .filter(Boolean);
