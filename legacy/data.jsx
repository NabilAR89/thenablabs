/* data.jsx — content + inline icon set. Exposed on window. */

const ICONS = {
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  arrowUpRight: "M7 17 17 7M8 7h9v9",
  sun: "M12 4V2M12 22v-2M4 12H2M22 12h-2M6 6 4.5 4.5M19.5 19.5 18 18M18 6l1.5-1.5M4.5 19.5 6 18",
  moon: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z",
  menu: "M3 6h18M3 12h18M3 18h18",
  layers: "M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  pen: "M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.586 7.586",
  code: "M16 18l6-6-6-6M8 6l-6 6 6 6",
  target:
    "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  mail: "M4 4h16v16H4zM4 6l8 6 8-6",
  download: "M12 3v12M7 11l5 5 5-5M5 21h14",
  spark: "M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3",
  zap: "M13 2 3 14h8l-1 8 10-12h-8z",
  chevronDown: "M6 9l6 6 6-6",
};

function Icon({ name, style }) {
  const d = ICONS[name];
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      aria-hidden="true"
    >
      {d
        .split("M")
        .filter(Boolean)
        .map((seg, i) => (
          <path key={i} d={"M" + seg} />
        ))}
    </svg>
  );
}

/* Brand social glyphs (filled, simple) */
function Social({ name }) {
  const paths = {
    linkedin:
      "M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7 0h3.8v2.05h.05c.53-1 1.83-2.05 3.76-2.05 4.02 0 4.76 2.65 4.76 6.1V23h-4v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.53 1.72-2.53 3.49V23h-4V8z",
    github:
      "M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z",
    behance:
      "M8.2 7.3c.6 0 1.15.05 1.65.16.5.1.92.27 1.27.5.36.24.63.56.83.96.2.4.29.9.29 1.5 0 .63-.15 1.16-.44 1.58-.28.42-.7.77-1.27 1.04.78.22 1.36.62 1.74 1.18.38.56.58 1.24.58 2.04 0 .64-.13 1.2-.38 1.67-.25.47-.58.85-1 1.15-.42.3-.9.5-1.45.65-.54.13-1.1.2-1.67.2H1V7.3h7.2zM7.77 12c.5 0 .9-.12 1.22-.36.32-.24.48-.62.48-1.16 0-.3-.05-.54-.16-.73a1.2 1.2 0 0 0-.44-.45 1.9 1.9 0 0 0-.64-.23 4.2 4.2 0 0 0-.76-.06H4.3V12h3.47zm.2 4.95c.28 0 .55-.03.8-.08.25-.06.47-.15.66-.28.19-.13.34-.31.45-.53.11-.23.17-.51.17-.85 0-.67-.19-1.15-.56-1.44-.38-.28-.88-.42-1.5-.42H4.3v3.6h3.67zM16.4 16.9c.34.33.83.5 1.47.5.46 0 .86-.12 1.19-.35.33-.23.53-.48.6-.74h2.36c-.38 1.17-.96 2-1.74 2.51-.78.5-1.72.76-2.82.76-.77 0-1.46-.12-2.08-.37a4.3 4.3 0 0 1-1.57-1.04 4.6 4.6 0 0 1-1-1.62 6 6 0 0 1-.35-2.09c0-.74.12-1.43.36-2.06a4.8 4.8 0 0 1 2.6-2.73 5.1 5.1 0 0 1 2.04-.4c.84 0 1.57.16 2.2.49.62.32 1.13.76 1.53 1.31.4.55.69 1.18.86 1.88.17.7.23 1.44.18 2.2h-7.04c0 .77.21 1.41.55 1.74zm2.56-4.7c-.27-.3-.7-.46-1.28-.46-.38 0-.7.07-.95.2-.25.12-.45.28-.6.46a1.6 1.6 0 0 0-.31.59c-.06.21-.1.4-.11.57h4.36c-.13-.69-.32-1.18-.6-1.48zM15.2 8.2h5.45v1.32H15.2z",
  };
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}

const DATA = {
  nav: [
    "About",
    "Expertise",
    "Experience",
    "Skills",
    "Case Studies",
    "Projects",
    "Contact",
  ],

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
    "Web Apps",
    "Mobile Apps",
    "Motion & Micro-interactions",
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
      tags: ["User research", "Wireframes", "User flows", "Prototyping"],
    },
    {
      ico: "layers",
      title: "UX / UI Design",
      desc: "Interfaces that are precise, accessible, and unmistakably premium.",
      tags: ["Figma", "Interaction design", "Design systems", "Accessibility"],
    },
    {
      ico: "code",
      title: "Front-End Engineering",
      desc: "Production-grade, scalable front-ends that match the design 1:1.",
      tags: ["React", "Next.js", "Angular", "TypeScript"],
    },
    {
      ico: "target",
      title: "Product Strategy",
      desc: "Aligning business goals and user needs into a focused roadmap.",
      tags: ["Business goals", "User needs", "Feature planning", "Metrics"],
    },
  ],

  timeline: [
    {
      when: "2021 — Now",
      now: true,
      role: "Senior UX/UI Engineer",
      co: "Enterprise Cloud Platform",
      desc: "Own product design and front-end architecture for a multi-product B2B cloud platform — driving the design system, component library, and cross-functional delivery.",
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
      desc: "Designed and built the end-to-end onboarding for SmartWealth by NBK Wealth — from splash through biometric ID, KYC and investment preferences to a funded portfolio.",
      role: "Product Designer & Front-End",
      duration: "5 months",
      href: "smartwealth/SmartWealth.html",
      showcaseHref: "smartwealth/SmartWealth.html",
      img: "smartwealth/screens/01-splash.jpg",
      phones: [
        "smartwealth/screens/01-splash.jpg",
        "smartwealth/screens/kyc-investment.jpg",
      ],
      accent: 0,
      link: true,
      featured: true,
    },
    {
      ind: "Fintech · Mobile",
      yr: "2025",
      title: "Al Hilal — Digital Banking App",
      desc: "A youth-focused digital banking super-app for Al Hilal Bank — pairing a prepaid debit card and children’s saving accounts with everyday lifestyle services, from a guided onboarding to a rewards-driven home.",
      role: "Product Designer & Front-End",
      duration: "4 months",
      phones: [
        "alhilal/home-x.jpg",
        "alhilal/onb1-x.jpg",
        "alhilal/onb2-x.jpg",
      ],
      video: "alhilal/home-anim.webp",
      banner: true,
      accent: 1,
      href: "alhilal/AlHilal.html",
      showcaseHref: "alhilal/AlHilal.html",
      link: true,
    },
    {
      ind: "Healthcare SaaS · Web & Mobile",
      yr: "2024",
      title: "Wimsa — Clinic Management Platform",
      desc: "An end-to-end clinic management platform — secure medical records, scheduling, lab orders and task workflows. Delivered as a responsive web console for the front desk and a companion mobile app for clinicians on the move.",
      role: "Product Designer & Front-End",
      duration: "10 months",
      web: ["wimsa/w-today.jpg", "wimsa/w-diagnostics.jpg"],
      mobile: ["wimsa/m-today.png", "wimsa/m-chart.png"],
      showcase: true,
      accent: 0,
      href: "wimsa/Wimsa.html",
      showcaseHref: "wimsa/Wimsa.html",
      link: true,
    },
    {
      ind: "Hospitality · Mobile",
      yr: "2025",
      title: "Related — Restaurant Table Booking",
      desc: "A concierge-style dining app for discovering venues and reserving the perfect table — from date, guests and live availability through an interactive floor plan, special requests and a confirmed booking with reminders.",
      role: "Product Designer & Front-End",
      duration: "4 months",
      phones: ["relatedapp/front.jpg", "relatedapp/back.jpg"],
      href: "relatedapp/Related.html",
      showcaseHref: "relatedapp/Related.html",
      accent: 2,
      link: true,
    },
    {
      ind: "AI SaaS · Web",
      yr: "2026",
      title: "Base360 — AI Conversation & Lead Platform",
      desc: "A platform that unifies every channel — Meta and TikTok comments, DMs, WhatsApp, SMS, email and calls — into one inbox where AI agents reply in seconds, turn each thread into a tracked lead, and nurture it through to the sale.",
      role: "Product Designer & Front-End",
      duration: "4 months",
      web: ["base360/landing-full.png", "base360/dashboard.png"],
      weblab: true,
      accent: 2,
      href: "base360/Base360.html",
      showcaseHref: "base360/Base360.html",
      link: true,
    },
    {
      ind: "AI · E-commerce · Web",
      yr: "2025",
      title: "Moodz — AI Fashion Store",
      desc: "A conversational shopping experience where an AI stylist turns a vibe into an outfit — neon-lit browsing, chat-driven product suggestions, live restyle/recolor controls, and a frictionless cart-to-checkout flow.",
      role: "Product Designer & Front-End",
      duration: "5 months",
      web: ["moods/hero.jpg", "moods/chat.jpg"],
      accent: 2,
      href: "moods/Moodz.html",
      showcaseHref: "moods/Moodz.html",
      link: true,
    },
    {
      ind: "AI · E-commerce · Web",
      yr: "2025",
      title: "Gaia — AI Shopping Assistant",
      desc: "A conversational AI assistant woven into the BuyMore storefront — it tracks orders, applies promos, surfaces collections and resolves issues, turning support tickets and dead-end searches into a single, friendly chat.",
      role: "Product Designer & Front-End",
      duration: "5 months",
      web: ["gaia/home.jpg", "gaia/assistant.jpg"],
      accent: 1,
      href: "gaia/Gaia.html",
      showcaseHref: "gaia/Gaia.html",
      link: true,
    },
    {
      ind: "Smart City · Web & Mobile",
      yr: "2025",
      title: "Msheireb — Smart District Living",
      desc: "A marketing site and companion home-automation app for Msheireb Downtown Doha — the world\u2019s first sustainable downtown. The site sells the district\u2019s vision; the app puts climate, energy, devices and visitor access in residents\u2019 hands.",
      role: "Product Designer & Front-End",
      duration: "6 months",
      web: ["msheireb/hero.jpg", "msheireb/m-home.jpg"],
      accent: 0,
      href: "msheireb/Msheireb.html",
      showcaseHref: "msheireb/Msheireb.html",
      link: true,
    },
    {
      ind: "Nightlife · Web",
      yr: "2024",
      title: "Discotek — Club & Events Site",
      desc: "A neon-soaked nightlife site for the Discotek club — a video-led hero, headline-act events and ticketing, a resident-DJ roster, a charged photo gallery and table bookings, all wrapped in a cyan-and-magenta identity that glows in the dark.",
      role: "Product Designer & Front-End",
      duration: "3 months",
      web: ["discotek/hero.png", "discotek/events.png"],
      accent: 2,
      href: "discotek/Discotek.html",
      showcaseHref: "discotek/Discotek.html",
      link: true,
    },
    {
      ind: "PropTech · Web & Mobile",
      yr: "2024",
      title: "Locus — Property Management Platform",
      desc: "A property-management platform for agencies — a data-dense web console for portfolios, listings, repairs, leads and cashflow, paired with a mobile app that keeps bookings, offers and maintenance requests moving on the go.",
      role: "Product Designer & Front-End",
      duration: "8 months",
      web: ["locus/dash-1.png", "locus/properties.png"],
      accent: 0,
      href: "locus/Locus.html",
      showcaseHref: "locus/Locus.html",
      link: true,
    },
    {
      ind: "iGaming · Web & Mobile",
      yr: "2025",
      title: "FootyCash — Football Prediction Platform",
      desc: "A pool-based football prediction and betting platform for Ghana\u2019s leagues — score predictors, three bet types and live pools with transparent payouts, delivered as a fast mobile app and a data-dense desktop console on a stadium-night neon identity.",
      role: "Product Designer & Front-End",
      duration: "5 months",
      phones: [
        "footycash/home-m-top.jpg",
        "footycash/predictor-m-top.jpg",
        "footycash/threebet-m-top.jpg",
      ],
      accent: 0,
      href: "footycash/FootyCash.html",
      showcaseHref: "footycash/FootyCash.html",
      link: true,
    },
    {
      ind: "Hospitality · Web",
      yr: "2024",
      title: "Barley — Steak & Burger Restaurant",
      desc: "A full-screen, story-driven website for Barley, a Beirut steak & burger house — each section a cinematic frame, from a flame-grilled hero and a cream welcome to popular platters and a full burger menu, switching between charcoal-dark and warm light.",
      role: "Product Designer & Front-End",
      duration: "3 months",
      web: ["barley/home.jpg", "barley/burger-hero.jpg"],
      accent: 2,
      href: "barley/Barley.html",
      showcaseHref: "barley/Barley.html",
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
        "Nabil is the rare person who can lead a design critique in the morning and review a pull request in the afternoon — and improve both. He raised the bar for the entire product org.",
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

  contact: [
    {
      k: "Email",
      v: "hello@thenablabs.com",
      href: "mailto:hello@thenablabs.com",
      icon: "linkedin",
    },
    { k: "LinkedIn", v: "/in/nabil-abou-rjeily", href: "#", icon: "linkedin" },
    { k: "Behance", v: "/thenablab", href: "#", icon: "behance" },
    { k: "GitHub", v: "/thenablab", href: "#", icon: "github" },
  ],
};

Object.assign(window, { Icon, Social, DATA });
