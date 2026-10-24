import { StrictMode, useEffect, useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import emailjs from '@emailjs/browser';
import './styles.css';
import './intro.css';
import BrandIntro from './BrandIntro';

const Arrow = () => <span className="arrow">↗</span>;
const Logo = () => (
  <a className="logo" href="#home" aria-label="SOLZEN home">
    <img src="/solzen-logo.png" alt="SOLZEN" />
    <span>SOLZEN</span>
  </a>
);

const steps = [
  ['01', 'Understand', 'Start with the underlying idea, not just the answer. Visualise core principles and build intuition first.'],
  ['02', 'Assess', 'Make progress visible with thoughtful, conceptual evidence. Identify misconceptions early without anxiety.'],
  ['03', 'Reinforce', 'Strengthen cognitive connections where they matter most with adaptive, targeted reinforcement.'],
  ['04', 'Apply', 'Turn deep understanding into confident action, real-world execution and critical problem-solving.']
];

const thinking = [
  ['Concept-first', 'Start with understanding rather than memorisation.'],
  ['Human-centred', 'Connect explanations with how learners naturally think.'],
  ['Visual', 'Make difficult ideas easier to see, connect and explore.'],
  ['Measurable', 'Use evidence of learning to guide what comes next.'],
  ['Applicable', 'Move learning toward confident problem-solving and action.']
];

const techPillars = [
  ['01', 'Conceptual Visualisation', 'Making invisible relationships and abstract mental models tangible, intuitive and exploratory.'],
  ['02', 'Interactive Exploration', 'Active inquiry environments built around the way learners naturally think, discover and test hypotheses.'],
  ['03', 'Continuous Diagnostic Assessment', 'Formative, low-anxiety evidence signals that reveal depth of understanding rather than mere recall.'],
  ['04', 'Personalised Reinforcement', 'Dynamic cognitive pathways that strengthen retention right when neural connections need reinforcement most.'],
  ['05', 'Regional & Localised Learning', 'Contextualised pedagogical framing and linguistic accessibility designed for diverse learning ecosystems.']
];

const teamMembers = [
  {
    initials: 'PG',
    name: 'Padma Ganesh P',
    role: 'Founder & Product Lead',
    bio: 'Drives strategic product development, user experience design, and core educational workflows across interactive learning platforms.',
    linkedin: 'https://www.linkedin.com/in/padma-ganesh-p'
  },
  {
    initials: 'R',
    name: 'Rubeak',
    role: 'Co-Founder & Systems Architecture',
    bio: 'Specialises in scalable distributed systems, real-time diagnostic pipelines, and robust platform infrastructure for next-generation learning.',
    linkedin: 'https://linkedin.com/company/solzen'
  },
  {
    initials: 'VS',
    name: 'Vignesh R S',
    role: 'Technology Lead',
    bio: 'Directs interactive visual systems, frontend architecture, and cognitive modelling technologies to make complex concepts intuitive.',
    linkedin: 'https://linkedin.com/company/solzen'
  }
];

const articles = [
  {
    tag: 'Learning Science',
    time: '5 min read',
    title: 'What does it mean to truly understand something?',
    subtitle: 'Exploring the cognitive transition from rote memorisation to intuitive mastery.',
    num: '01'
  },
  {
    tag: 'Perspective',
    time: '4 min read',
    title: 'Beyond the myth of the “right answer”',
    subtitle: 'Why conceptual reasoning and error analysis build more resilient problem-solvers.',
    num: '02'
  },
  {
    tag: 'Research Notes',
    time: '6 min read',
    title: 'Making invisible cognitive connections visible',
    subtitle: 'How multi-modal visual scaffolding assists learners through complex threshold concepts.',
    num: '03'
  }
];

const updates = [
  {
    date: 'March 2026',
    tag: 'Ecosystem',
    title: 'Nirmaan Pre-Incubation Engagement at IIT Madras',
    desc: 'SOLZEN is supported within the Nirmaan ecosystem at IIT Madras, collaborating on foundational validation and research-oriented development.'
  },
  {
    date: 'February 2026',
    tag: 'Research',
    title: 'Formative Diagnostic Pedagogy Pilot',
    desc: 'Commenced structured pedagogical observations focusing on student conceptual bottlenecks across technical disciplines.'
  },
  {
    date: 'January 2026',
    tag: 'Milestone',
    title: 'Four-Stage Learning Pipeline Validation',
    desc: 'Formalised the Understand → Assess → Reinforce → Apply framework for structured interactive curriculum deployment.'
  }
];

const orbitSections = {
  explore: {
    id: 'explore',
    num: '00',
    category: 'OVERVIEW',
    label: 'EXPLORE',
    title: 'Making Learning Deeper.',
    subtitle: 'Making Understanding Actionable.',
    desc: 'SOLZEN is building a new pedagogical approach — moving beyond memorisation toward deeper understanding, measurable progress and real-world application.',
    actionLabel: 'Explore SOLZEN',
    actionHref: '#about',
    accent: 'Pedagogical Architecture'
  },
  about: {
    id: 'about',
    num: '01',
    category: 'PROBLEM & OPPORTUNITY',
    label: 'ABOUT',
    title: 'Beyond Memorisation',
    subtitle: 'Visualising abstract concepts',
    desc: 'Students struggle to visualise underlying principles. We address where memorisation ends and durable, applicable understanding begins.',
    actionLabel: 'Read Problem & Opportunity',
    actionHref: '#about',
    accent: 'Cognitive Depth',
    x: 142,
    y: 152,
    lx: 126,
    ly: 136,
    anchor: 'end'
  },
  approach: {
    id: 'approach',
    num: '02',
    category: 'LEARNING PIPELINE',
    label: 'APPROACH',
    title: 'Depth Has a Process',
    subtitle: 'Understand · Assess · Reinforce · Apply',
    desc: 'A structured four-stage learning rhythm: start with underlying intuition, assess conceptual evidence, adaptively reinforce, and apply knowledge.',
    actionLabel: 'View learning pipeline',
    actionHref: '#approach',
    accent: '4-Stage Pipeline',
    x: 412,
    y: 140,
    lx: 430,
    ly: 124,
    anchor: 'start'
  },
  technology: {
    id: 'technology',
    num: '03',
    category: 'CAPABILITIES',
    label: 'TECHNOLOGY',
    title: 'Technology × Learning',
    subtitle: 'Broad capabilities, kept high-level',
    desc: 'Five public research pillars: conceptual visualisation, active inquiry exploration, continuous diagnostics, personalized reinforcement, and localized learning.',
    actionLabel: 'Explore 5 tech pillars',
    actionHref: '#technology',
    accent: '5 Research Pillars',
    x: 494,
    y: 262,
    lx: 512,
    ly: 262,
    anchor: 'start'
  },
  team: {
    id: 'team',
    num: '04',
    category: 'LEADERSHIP',
    label: 'TEAM',
    title: 'The People Behind SOLZEN',
    subtitle: 'Product, systems & cognitive modeling',
    desc: 'Led by Padma Ganesh P, Rubeak, and Vignesh R S — combining product vision, distributed systems, and cognitive modeling technologies.',
    actionLabel: 'Meet our leadership',
    actionHref: '#team',
    accent: 'Research Leadership',
    x: 418,
    y: 415,
    lx: 436,
    ly: 435,
    anchor: 'start'
  },
  insights: {
    id: 'insights',
    num: '05',
    category: 'RESEARCH JOURNAL',
    label: 'INSIGHTS',
    title: 'Learning Science Insights',
    subtitle: 'Threshold concepts & cognitive depth',
    desc: 'Essays on true understanding, moving beyond right answers, and making invisible mental models visible through multi-modal scaffolding.',
    actionLabel: 'Read research insights',
    actionHref: '#insights',
    accent: 'Learning Science',
    x: 280,
    y: 512,
    lx: 280,
    ly: 542,
    anchor: 'middle'
  },
  updates: {
    id: 'updates',
    num: '06',
    category: 'MILESTONES',
    label: 'UPDATES',
    title: 'News & Announcements',
    subtitle: 'IIT Madras Nirmaan ecosystem engagement',
    desc: 'Supported within the Nirmaan Pre-Incubation ecosystem at IIT Madras, validating formative diagnostic pedagogy and our four-stage framework.',
    actionLabel: 'See recent updates',
    actionHref: '#updates',
    accent: 'Ecosystem News',
    x: 132,
    y: 410,
    lx: 112,
    ly: 434,
    anchor: 'end'
  },
  connect: {
    id: 'connect',
    num: '07',
    category: 'COLLABORATION',
    label: 'CONNECT',
    title: 'Start a Conversation',
    subtitle: 'Partnerships & institutional collaboration',
    desc: 'Open channels for educational institutions, research collaborators, media inquiries, and career opportunities.',
    actionLabel: 'Connect with our team',
    actionHref: '#contact',
    accent: 'Partnership Channels',
    x: 72,
    y: 268,
    lx: 54,
    ly: 268,
    anchor: 'end'
  }
};

const orbitNodes = [
  orbitSections.about,
  orbitSections.approach,
  orbitSections.technology,
  orbitSections.team,
  orbitSections.insights,
  orbitSections.updates,
  orbitSections.connect
];

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const isNavigatingRef = useRef(false);
  const navTimeoutRef = useRef(null);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Approach', href: '#approach' },
    { label: 'Technology', href: '#technology' },
    { label: 'Team', href: '#team' },
    { label: 'Insights', href: '#insights' },
    { label: 'Updates', href: '#updates' },
    { label: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
          setScrollProgress(pageHeight > 0 ? Math.min(100, (window.scrollY / pageHeight) * 100) : 0);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Track active section as user scrolls
    const sectionIds = ['home', 'about', 'approach', 'technology', 'team', 'insights', 'updates', 'contact'];
    const syncHashState = () => {
      const hashId = window.location.hash.replace('#', '');
      if (!sectionIds.includes(hashId)) return;

      setActiveSection(hashId);
      const target = document.getElementById(hashId);
      if (target && hashId !== 'home') {
        window.requestAnimationFrame(() => {
          const headerOffset = 82;
          const targetY = target.getBoundingClientRect().top + window.scrollY - headerOffset;
          window.scrollTo({ top: Math.max(0, targetY), behavior: 'auto' });
        });
      }
    };
    const observer = new IntersectionObserver(
      entries => {
        if (isNavigatingRef.current) return;
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    syncHashState();
    window.addEventListener('hashchange', syncHashState);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', syncHashState);
      observer.disconnect();
      clearTimeout(navTimeoutRef.current);
    };
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setOpen(false);

    isNavigatingRef.current = true;
    clearTimeout(navTimeoutRef.current);
    navTimeoutRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 850);

    if (href === '#home') {
      setActiveSection('home');
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', '#home');
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      setActiveSection(href.slice(1));
      const headerOffset = 82;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
      window.history.pushState(null, '', href);
    }
  };

  return (
    <header
      className={`header ${scrolled ? 'scrolled' : ''}`}
      style={{ '--scroll-progress': `${scrollProgress}%` }}
    >
      <a
        className="logo"
        href="#home"
        onClick={e => handleNavClick(e, '#home')}
        aria-label="SOLZEN home"
      >
        <img src="/solzen-logo.png" alt="SOLZEN" />
        <span>SOLZEN</span>
      </a>

      <button
        className={`menu ${open ? 'menu-active' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
        aria-expanded={open}
      >
        <span />
        <span />
      </button>

      {open && (
        <div
          className="nav-backdrop"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <nav className={open ? 'nav nav-open' : 'nav'}>
        <div className="nav-links-wrap">
          {navItems.map(item => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                className={`nav-link ${isActive ? 'active' : ''}`}
                onClick={e => handleNavClick(e, item.href)}
                href={item.href}
                key={item.label}
              >
                {item.label}
              </a>
            );
          })}
        </div>
        <a
          onClick={e => handleNavClick(e, '#contact')}
          className="nav-contact"
          href="#contact"
        >
          Connect / Partner <Arrow />
        </a>
      </nav>
      <span className="scroll-progress" aria-hidden="true" />
    </header>
  );
}

function LegalModal({ type, onClose }) {
  if (!type) return null;

  const content = {
    privacy: {
      title: 'Privacy Policy',
      subtitle: 'Commitment to Student & Institutional Privacy',
      body: (
        <>
          <p>
            SOLZEN (solzen.in) is committed to rigorous privacy standards. Because our educational direction involves students and potentially minors, data protection is treated as a fundamental requirement rather than an afterthought.
          </p>
          <p>
            <strong>Core Privacy Principles:</strong>
          </p>
          <ul>
            <li>No personal learner data is tracked or sold to third-party ad networks.</li>
            <li>Marketing website inquiries are handled through secure, controlled channels with strict access authorization.</li>
            <li>We do not collect student profiles or minor information on this public informational site.</li>
            <li>All future interactive platforms comply with Indian and international data privacy protection standards.</li>
          </ul>
          <p>
            For privacy inquiries or data requests, contact: <em>privacy@solzen.in</em>.
          </p>
        </>
      )
    },
    terms: {
      title: 'Terms of Use',
      subtitle: 'Public Website Guidelines',
      body: (
        <>
          <p>
            Welcome to SOLZEN. By accessing solzen.in, you agree to these Terms of Use governing public informational access to our website.
          </p>
          <p>
            <strong>Intellectual Property &amp; Confidentiality:</strong>
          </p>
          <ul>
            <li>All brand names, learning frameworks, articles, and trademarks are proprietary to SOLZEN.</li>
            <li>Content on this website is provided for informational and partnership exploration purposes.</li>
            <li>Unauthorised reproduction, automated scraping, or misuse of site materials is prohibited.</li>
          </ul>
        </>
      )
    },
    cookies: {
      title: 'Cookie Policy',
      subtitle: 'Minimal & Essential Usage',
      body: (
        <>
          <p>
            SOLZEN maintains a minimal cookie footprint. We only employ necessary technical cookies required for website routing, display preferences, and anti-spam verification.
          </p>
          <ul>
            <li>No invasive cross-site advertising or tracking cookies are utilized.</li>
            <li>Session cookies automatically expire upon closing your browser.</li>
          </ul>
        </>
      )
    }
  }[type];

  if (!content) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
        <h3>{content.title}</h3>
        <p className="modal-subtitle">{content.subtitle}</p>
        <div className="modal-body">{content.body}</div>
      </div>
    </div>
  );
}

function ExploreOrbit({
  activeOrbitId,
  setActiveOrbitId,
  hoveredOrbitId,
  setHoveredOrbitId,
  isInteractingOrbit,
  setIsInteractingOrbit
}) {
  return (
    <div
      className={`hero-object animate show ${isInteractingOrbit || hoveredOrbitId ? 'orbit-paused' : ''}`}
      id="hero-learning-sculpture"
      onMouseEnter={() => setIsInteractingOrbit(true)}
      onMouseLeave={() => setIsInteractingOrbit(false)}
    >
      {/* Soft blurred gold-and-sage glow behind planet */}
      <div className="hero-glow" aria-hidden="true" />

      {/* Entire planet system floating stage */}
      <div className="planet-system orbit-interactive-system">
        <svg
          viewBox="0 0 560 560"
          className="orbit-svg"
          aria-label="Interactive Solzen Explore Orbit Navigation"
        >
          <defs>
            <radialGradient id="planetGrad" cx="36%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#1E594B" />
              <stop offset="55%" stopColor="#0B332B" />
              <stop offset="100%" stopColor="#061A15" />
            </radialGradient>
            <radialGradient id="activeNodeGrad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#E5B56E" />
              <stop offset="50%" stopColor="#C98B3C" />
              <stop offset="100%" stopColor="#9B6622" />
            </radialGradient>
            <radialGradient id="goldAuraGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(201, 139, 60, 0.45)" />
              <stop offset="60%" stopColor="rgba(201, 139, 60, 0.12)" />
              <stop offset="100%" stopColor="rgba(201, 139, 60, 0)" />
            </radialGradient>
          </defs>

          {/* Concentric & Elliptical Guide Rings - Continuously rotating independent orbital tracks */}
          <g className="orbit-guides" aria-hidden="true">
            {/* Outer Dashed Sage Ring (r=256, clockwise slow rotation) */}
            <g className="orbit-track-outer">
              <circle cx="280" cy="280" r="256" className="svg-ring-outer" />
            </g>

            {/* Mid Fine Sage Ring (r=202, counter-clockwise smooth rotation) */}
            <g className="orbit-track-mid">
              <circle cx="280" cy="280" r="202" className="svg-ring-mid" />
            </g>

            {/* Inner Dotted Gold Ring (r=148, clockwise golden dot glide) */}
            <g className="orbit-track-inner">
              <circle cx="280" cy="280" r="148" className="svg-ring-inner" />
            </g>

            {/* Primary Tilted Elliptical Orbit Path (-24deg tilt, rx=262, ry=142, slow orbital precession) */}
            <g className="orbit-track-ellipse-primary">
              <ellipse
                cx="280"
                cy="280"
                rx="262"
                ry="142"
                transform="rotate(-24 280 280)"
                className="svg-ellipse-primary"
              />
            </g>

            {/* Secondary Faint Elliptical Orbit Path (+24deg tilt, rx=246, ry=126, counter-precession) */}
            <g className="orbit-track-ellipse-secondary">
              <ellipse
                cx="280"
                cy="280"
                rx="246"
                ry="126"
                transform="rotate(24 280 280)"
                className="svg-ellipse-secondary"
              />
            </g>
          </g>

          {/* Revolving Decorative Orbit Beads */}
          <g className="orbit-revolve-wrapper" aria-hidden="true">
            <circle cx="482" cy="184" r="5.5" className="node-amber-svg" />
            <circle cx="82" cy="370" r="4" className="node-forest-svg" />
          </g>

          {/* Scientific Coordinates */}
          <g className="orbit-coordinates" aria-hidden="true">
            <text x="450" y="65" textAnchor="end" className="svg-coord">UNDERSTAND / 01</text>
            <text x="115" y="500" textAnchor="start" className="svg-coord">APPLY / ∞</text>
          </g>

          {/* 7 Interactive Section Nodes */}
          <g className="orbit-interactive-nodes" role="group" aria-label="Solzen website sections">
            {orbitNodes.map(sec => {
              const isSelected = activeOrbitId === sec.id;
              const isHovered = hoveredOrbitId === sec.id;
              const isHighlighted = isSelected || isHovered;

              return (
                <g
                  key={sec.id}
                  className={`orbit-node-group ${isSelected ? 'is-selected' : ''} ${isHovered ? 'is-hovered' : ''}`}
                  onClick={() => setActiveOrbitId(sec.id)}
                  onMouseEnter={() => setHoveredOrbitId(sec.id)}
                  onMouseLeave={() => setHoveredOrbitId(null)}
                  onFocus={() => setHoveredOrbitId(sec.id)}
                  onBlur={() => setHoveredOrbitId(null)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Explore ${sec.label} section: ${sec.title}`}
                  aria-pressed={isSelected}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveOrbitId(sec.id);
                    }
                  }}
                >
                  {/* Comfortable touch / click hit area */}
                  <circle cx={sec.x} cy={sec.y} r="26" className="node-hit-area" />

                  {/* Pulsing aura when active or hovered */}
                  {isHighlighted && (
                    <circle cx={sec.x} cy={sec.y} r="16" className="node-glow-aura" />
                  )}

                  {/* Connecting tick line from path to label */}
                  <line
                    x1={sec.x}
                    y1={sec.y}
                    x2={sec.lx}
                    y2={sec.ly - 4}
                    className="node-connector"
                  />

                  {/* Main Node Bead */}
                  <circle
                    cx={sec.x}
                    cy={sec.y}
                    r={isSelected ? 7.5 : 5.5}
                    className="node-bead-circle"
                  />
                  <circle
                    cx={sec.x}
                    cy={sec.y}
                    r={isSelected ? 3 : 2}
                    className="node-core-dot"
                  />

                  {/* Number Tag */}
                  <text
                    x={sec.lx}
                    y={sec.ly - 13}
                    textAnchor={sec.anchor}
                    className="node-text-num"
                  >
                    {sec.num}
                  </text>

                  {/* Section Label */}
                  <text
                    x={sec.lx}
                    y={sec.ly}
                    textAnchor={sec.anchor}
                    className="node-text-label"
                  >
                    {sec.label}
                  </text>

                  {/* Active Indicator Accent */}
                  {isSelected && (
                    <circle
                      cx={sec.anchor === 'start' ? sec.lx + 8 : sec.anchor === 'end' ? sec.lx - 8 : sec.lx}
                      cy={sec.ly + 9}
                      r="2.5"
                      className="node-active-accent"
                    />
                  )}
                </g>
              );
            })}
          </g>

          {/* Central SOLZEN Core (overview / reset) */}
          <g
            className={`orbit-center-core ${activeOrbitId === 'explore' ? 'is-overview' : ''}`}
            onClick={() => setActiveOrbitId('explore')}
            onMouseEnter={() => setHoveredOrbitId('explore')}
            onMouseLeave={() => setHoveredOrbitId(null)}
            onFocus={() => setHoveredOrbitId('explore')}
            onBlur={() => setHoveredOrbitId(null)}
            tabIndex={0}
            role="button"
            aria-label="Return to SOLZEN overview"
            aria-pressed={activeOrbitId === 'explore'}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveOrbitId('explore');
              }
            }}
          >
            <circle cx="280" cy="280" r="66" className="center-hit-area" />
            <circle cx="280" cy="280" r="60" className="center-pulse-ring" />
            <circle cx="280" cy="280" r="54" fill="url(#planetGrad)" className="center-sphere" />
            <circle cx="280" cy="280" r="54" className="center-border" />
            <defs>
              <clipPath id="centerLogoClip">
                <circle cx="280" cy="280" r="35" />
              </clipPath>
            </defs>
            <circle cx="280" cy="280" r="36" className="center-logo-disc" />
            <image
              href="/solzen-logo.png"
              x="244"
              y="244"
              width="72"
              height="72"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#centerLogoClip)"
              className="center-logo-image"
            />
          </g>
        </svg>

        {/* Soft ground shadow beneath the planet */}
        <div className="hero-shadow" aria-hidden="true" />
      </div>

    </div>
  );
}

function App() {
  // Intro loading screen appears on initial application mount / every page reload
  const [opening, setOpening] = useState(true);
  const [activeTab, setActiveTab] = useState('insights');
  const [activeModal, setActiveModal] = useState(null);
  const [activeOrbitId, setActiveOrbitId] = useState('explore');
  const [hoveredOrbitId, setHoveredOrbitId] = useState(null);
  const [isInteractingOrbit, setIsInteractingOrbit] = useState(false);

  // EmailJS Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: '', text: '' });

  const handleIntroComplete = () => {
    setOpening(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('show')),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.animate').forEach(el => observer.observe(el));
    return () => {
      observer.disconnect();
    };
  }, []);

  const handleContactMember = memberName => {
    setFormData(prev => ({
      ...prev,
      subject: `Inquiry regarding ${memberName}`,
      message: `Hello, I would like to connect with ${memberName} regarding: `
    }));
    setFormStatus({ type: '', text: '' });
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPurpose = category => {
    setFormData(prev => ({
      ...prev,
      subject: `${category} Inquiry`
    }));
    setFormStatus({ type: '', text: '' });
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToSection = (e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      const headerOffset = 82;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
      window.history.pushState(null, '', `#${targetId}`);
    }
  };

  const isValidEmail = email => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formStatus.text) {
      setFormStatus({ type: '', text: '' });
    }
  };

  const submit = async e => {
    e.preventDefault();
    if (formLoading) return;

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedSubject = formData.subject.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName) {
      setFormStatus({ type: 'error', text: 'Please enter your full name.' });
      return;
    }

    if (!trimmedEmail) {
      setFormStatus({ type: 'error', text: 'Please enter your email address.' });
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setFormStatus({ type: 'error', text: 'Please enter a valid email address (e.g. name@organisation.com).' });
      return;
    }

    if (!trimmedSubject) {
      setFormStatus({ type: 'error', text: 'Please enter a subject for your message.' });
      return;
    }

    if (!trimmedMessage) {
      setFormStatus({ type: 'error', text: 'Please enter your message.' });
      return;
    }

    const backendUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!backendUrl && (!serviceId || !templateId || !publicKey)) {
      setFormStatus({
        type: 'error',
        text: 'No mail configuration detected. Please set VITE_API_URL in your .env or run the local backend server.'
      });
      return;
    }

    setFormLoading(true);
    setFormStatus({ type: '', text: '' });

    try {
      if (backendUrl) {
        // Send to Solzen Node.js / Express backend with Gmail Nodemailer
        const res = await fetch(`${backendUrl.replace(/\/$/, '')}/api/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: trimmedName,
            email: trimmedEmail,
            subject: trimmedSubject,
            message: trimmedMessage,
          }),
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok || data.success === false) {
          throw new Error(data.error || `Server responded with status ${res.status}`);
        }
      } else {
        // Fallback to EmailJS SDK
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: trimmedName,
            from_email: trimmedEmail,
            subject: trimmedSubject,
            message: trimmedMessage,
            name: trimmedName,
            email: trimmedEmail,
            reply_to: trimmedEmail,
          },
          { publicKey }
        );
      }

      setFormStatus({
        type: 'success',
        text: 'Thank you! Your message has been safely received. A member of our team will respond shortly.'
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      console.error('Contact submission error:', err);
      const detail = (err && (err.text || err.message)) || 'Service unreachable';
      setFormStatus({
        type: 'error',
        text: `Failed to send message (${detail}). Please check your connection or reach us at contact@solzen.in.`
      });
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <>
      {opening && <BrandIntro onComplete={handleIntroComplete} />}

      <div className={opening ? 'site site-wait' : 'site'}>
        <Header />

        <main>
          {/* 1. HERO SECTION */}
          <section className="hero" id="home">
            <div className="hero-noise" />
            <div className="hero-copy animate show">
              <p className="kicker">Technology × Education</p>
              <h1>
                Making Learning Deeper.<br />
                <i>Making Understanding Actionable.</i>
              </h1>
              <p className="lede">
                SOLZEN is building a new approach to learning — one that moves beyond memorisation toward deeper understanding, measurable progress and real-world application.
              </p>
              <div className="hero-actions">
                <a className="button dark hero-primary-cta" href="#about" onClick={e => handleScrollToSection(e, 'about')}>
                  <span>Explore SOLZEN</span> <span className="cta-arrow" aria-hidden="true">↓</span>
                </a>
                <a className="underlink hero-secondary-link" href="#contact" onClick={e => handleScrollToSection(e, 'contact')}>
                  <span>Connect With Us</span> <Arrow />
                </a>
              </div>
            </div>

            <ExploreOrbit
              activeOrbitId={activeOrbitId}
              setActiveOrbitId={setActiveOrbitId}
              hoveredOrbitId={hoveredOrbitId}
              setHoveredOrbitId={setHoveredOrbitId}
              isInteractingOrbit={isInteractingOrbit}
              setIsInteractingOrbit={setIsInteractingOrbit}
            />

            <div className="hero-foot">
              <span>Scroll to discover</span>
              <i />
            </div>
          </section>

          {/* 2. PROBLEM & OPPORTUNITY (PDF Section 4 & 21) */}
          <section className="opportunity shell" id="about">
            <p className="section-label">01 / The Problem &amp; Opportunity</p>
            <div className="split">
              <h2>Students struggle to <i>visualise concepts</i> and apply knowledge.</h2>
              <div className="copy">
                <p>
                  Information is everywhere, yet learners still struggle to visualise underlying principles, build deep understanding and translate knowledge into problem-solving and real-world application.
                </p>
                <p>
                  We are addressing the critical gap where memorisation ends and genuine, durable understanding begins — making invisible mental models visible, measurable and applicable.
                </p>
                <a className="underlink" href="#approach">Our learning pipeline <span>↓</span></a>
              </div>
            </div>
          </section>

          {/* 4. LEARNING PHILOSOPHY & FRAMEWORK (PDF Section 4 & 21) */}
          <section className="approach" id="approach">
            <div className="shell">
              <div className="approach-intro">
                <div>
                  <p className="kicker gold">A learning rhythm</p>
                  <h2>Depth has a <i>process.</i></h2>
                </div>
                <p>
                  Our work is shaped by a simple conviction: people learn best when understanding is invited, progress is visible and application feels possible.
                </p>
              </div>
              <div className="steps">
                {steps.map(([n, title, text]) => (
                  <article className="step animate" key={title}>
                    <span>{n}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                    <b>↗</b>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* 5. HOW WE THINK (PDF Section 4 & 21) */}
          <section className="think shell">
            <p className="section-label">02 / How We Think</p>
            <div className="think-layout">
              <div>
                <h2>
                  Made for<br />
                  the way minds <i>move.</i>
                </h2>
                <p className="copy-intro">
                  Learning is human before it is technical. Everything we build begins with how the human mind naturally explores and connects ideas.
                </p>
              </div>
              <div className="principle-list">
                {thinking.map(([title, text], i) => (
                  <div className="principle" key={title}>
                    <span>0{i + 1}</span>
                    <strong>{title}</strong>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 6. TECHNOLOGY × LEARNING (PDF Section 4 & 21) */}
          <section className="tech-section" id="technology">
            <div className="shell">
              <div className="tech-head">
                <div>
                  <p className="kicker">03 / Technology × Learning</p>
                  <h2>Broad capabilities, <i>kept high-level.</i></h2>
                </div>
                <p className="tech-intro-text">
                  We explore technological frontiers strictly to serve cognitive depth. Our public research focuses on five broad pillars without disclosing proprietary implementation details.
                </p>
              </div>
              <div className="tech-grid">
                {techPillars.map(([num, title, desc]) => (
                  <div className="tech-card animate" key={title}>
                    <span className="tech-num">{num}</span>
                    <h3>{title}</h3>
                    <p>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 7. TEAM SECTION (PDF Section 6 & 21) */}
          <section className="team shell" id="team">
            <div className="section-head">
              <div>
                <p className="kicker">04 / Leadership &amp; Research</p>
                <h2>The people behind <i>SOLZEN.</i></h2>
              </div>
              <a className="underlink" href="#contact">Connect with our team <Arrow /></a>
            </div>

            <div className="team-grid-cards">
              {teamMembers.map(m => (
                <div className="team-card animate" key={m.name}>
                  <div className="team-card-top">
                    <div className="team-avatar">{m.initials}</div>
                    <div className="team-meta">
                      <h4>{m.name}</h4>
                      <span className="team-role">{m.role}</span>
                    </div>
                  </div>
                  <p className="team-bio">{m.bio}</p>
                  <div className="team-actions">
                    <a
                      className="team-linkedin"
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${m.name} on LinkedIn`}
                    >
                      LinkedIn <Arrow />
                    </a>
                    <button
                      className="team-contact-btn"
                      onClick={() => handleContactMember(m.name)}
                    >
                      Contact Member <Arrow />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <blockquote className="animate" style={{ marginTop: '48px' }}>
              “Better learning is not a feature. It’s a philosophy.”
              <cite>— SOLZEN Core Principle</cite>
            </blockquote>
          </section>

          {/* 8. LATEST INSIGHTS & UPDATES (PDF Section 8, 9 & 21) */}
          <section className="journal shell" id="insights">
            <div className="section-head" id="updates">
              <div>
                <p className="kicker">05 / Notes &amp; Announcements</p>
                <h2>From our <i>journal &amp; updates.</i></h2>
              </div>
              <div className="content-tabs">
                <button
                  className={activeTab === 'insights' ? 'tab-btn active' : 'tab-btn'}
                  onClick={() => setActiveTab('insights')}
                >
                  Insights &amp; Ideas
                </button>
                <button
                  className={activeTab === 'updates' ? 'tab-btn active' : 'tab-btn'}
                  onClick={() => setActiveTab('updates')}
                >
                  News &amp; Updates
                </button>
              </div>
            </div>

            <div className={`journal-grid ${activeTab === 'insights' ? 'tab-content-active' : 'tab-content-hidden'}`}>
              {articles.map(art => (
                <a
                  href="#contact"
                  className={`story story-${art.num} animate show`}
                  key={art.title}
                >
                  <div className="art">
                    <span>{art.num}</span>
                    <i />
                  </div>
                  <p>{art.tag} <b>·</b> {art.time}</p>
                  <h3>{art.title}</h3>
                  <Arrow />
                </a>
              ))}
            </div>

            <div className={`updates-list ${activeTab === 'updates' ? 'tab-content-active' : 'tab-content-hidden'}`}>
              {updates.map(item => (
                <div className="update-item" key={item.title}>
                  <div className="update-date">{item.date}</div>
                  <div className="update-content">
                    <span className="update-tag">{item.tag}</span>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                  <a className="underlink" href="#contact" style={{ alignSelf: 'center' }}>
                    Inquire <Arrow />
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* 9. VISION SECTION (PDF Section 4 & 21) */}
          <section className="statement">
            <div className="statement-grid">
              <span className="statement-rule" />
              <p>
                The future of learning is not about consuming more information.{' '}
                <i>It is about understanding better.</i>
              </p>
              <span className="statement-index">SOLZEN / 2026</span>
            </div>
          </section>

          {/* 10. CONTACT SECTION (PDF Section 11 & 21) */}
          <section className="contact" id="contact">
            <div className="shell contact-wrap">
              <div>
                <p className="kicker gold">Let’s begin</p>
                <h2>Start a <i>conversation.</i></h2>
                <p className="contact-intro">
                  Whether you are exploring a partnership, have an educational or research perspective to share, or want to discuss institutional collaboration — we’d like to hear from you.
                </p>
                <div style={{ marginTop: '24px', fontSize: '11px', color: '#91a59b', lineHeight: '1.8' }}>
                  <p style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '.1em', color: '#e4bd78' }}>
                    Channels:
                  </p>
                  <span>General Enquiries · Partnerships · Institutional Research · Media · Careers</span>
                </div>

                {/* INSTITUTIONAL AFFILIATION LOCKUP (NIRMAAN ECOSYSTEM, IIT MADRAS) */}
                <div className="contact-ecosystem-slot" aria-label="Institutional Affiliation">
                  <div className="ecosystem-lockup contact-ecosystem-lockup">
                    <div className="ecosystem-label-row">
                      <span className="ecosystem-badge-tag">
                        <span className="ecosystem-tag-dot" aria-hidden="true" />
                        INCUBATED ECOSYSTEM
                      </span>
                    </div>
                    <div className="ecosystem-card" title="Nirmaan, The Pre-Incubation Cell at IIT Madras">
                      <div className="ecosystem-logo-frame">
                        <img
                          src="/nirmaan-logo.png"
                          alt="Nirmaan IIT Madras Logo"
                          className="ecosystem-logo"
                          width="140"
                          height="139"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="ecosystem-details">
                      <div className="ecosystem-accent-line" aria-hidden="true" />
                      <p className="ecosystem-text">
                        Supported within the <strong>Nirmaan Ecosystem</strong>, <strong>IIT Madras</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={submit} className="contact-form-card" noValidate>
                <div className="form-field">
                  <label htmlFor="contact-name">
                    Full Name <span className="req" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    disabled={formLoading}
                    autoComplete="name"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="contact-email">
                    Email Address <span className="req" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@organisation.com"
                    disabled={formLoading}
                    autoComplete="email"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="contact-subject">
                    Subject <span className="req" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Partnership, Institutional Research, or General Inquiry"
                    disabled={formLoading}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="contact-message">
                    Message <span className="req" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="4"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us a little more about your context and goals..."
                    disabled={formLoading}
                  />
                </div>

                <button
                  className={`button dark contact-submit-btn ${formLoading ? 'loading' : ''}`}
                  type="submit"
                  disabled={formLoading}
                  aria-busy={formLoading}
                >
                  {formLoading ? (
                    <>
                      <span className="spinner" aria-hidden="true" />
                      <span>Sending message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send message</span>
                      <Arrow />
                    </>
                  )}
                </button>

                {formStatus.text && (
                  <div
                    className={`form-status ${formStatus.type}`}
                    role="alert"
                    aria-live="polite"
                  >
                    <span className="status-icon" aria-hidden="true">
                      {formStatus.type === 'success' ? '✓' : '!'}
                    </span>
                    <p className="status-text">{formStatus.text}</p>
                  </div>
                )}
              </form>
            </div>
          </section>
        </main>

        {/* 11. BRAND MOTTO STRIP & FOOTER (PDF Section 7, 18 & 19) */}
        <footer>
          <div className="brand-motto-strip">
            <span>Mission: <b>Make learning deeper, measurable and applicable.</b></span>
            <span>Motto: <b>Understand. Apply. Advance.</b></span>
          </div>

          <div className="shell" style={{ paddingTop: '50px' }}>
            <div className="footer-main">
              <div className="footer-brand">
                <Logo />
                <p>
                  SOLZEN builds deeper, more applicable learning experiences — moving beyond memorisation toward lasting conceptual understanding.
                </p>
                <div className="footer-northstar">
                  <span>North Star</span>
                  Make difficult concepts visible, measurable and applicable.
                </div>
              </div>

              <div className="footer-col">
                <h5>Company</h5>
                <ul>
                  <li><a href="#about">About Us</a></li>
                  <li><a href="#approach">Learning Approach</a></li>
                  <li><a href="#technology">Technology Pillars</a></li>
                  <li><a href="#team">Team &amp; Research</a></li>
                  <li><a href="#updates">News &amp; Updates</a></li>
                </ul>
              </div>

              <div className="footer-col">
                <h5>Connect</h5>
                <ul>
                  <li><a href="#contact" onClick={() => handleSelectPurpose('General')}>General Inquiries</a></li>
                  <li><a href="#contact" onClick={() => handleSelectPurpose('Partnership')}>Partnerships</a></li>
                  <li><a href="#contact" onClick={() => handleSelectPurpose('Institutional Research')}>Institutions</a></li>
                  <li><a href="#contact" onClick={() => handleSelectPurpose('Career')}>Careers</a></li>
                </ul>
              </div>

              <div className="footer-col">
                <h5>Ecosystem &amp; Social</h5>
                <ul>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img
                      src="/nirmaan-logo.png"
                      alt="Nirmaan"
                      style={{ width: '18px', height: '18px', borderRadius: '4px', objectFit: 'contain' }}
                    />
                    <span style={{ fontSize: '12px', color: '#8ba296' }}>Nirmaan, IIT Madras</span>
                  </li>
                  <li><a href="https://linkedin.com/company/solzen" target="_blank" rel="noopener noreferrer">LinkedIn <Arrow /></a></li>
                  <li><a href="https://x.com/solzen_in" target="_blank" rel="noopener noreferrer">X / Twitter <Arrow /></a></li>
                  <li><a href="mailto:contact@solzen.in">contact@solzen.in</a></li>
                </ul>
              </div>
            </div>

            <div className="footer-bottom">
              <span>© 2026 SOLZEN (solzen.in). All rights reserved.</span>
              <div className="footer-meta-links">
                <button type="button" onClick={() => setActiveModal('privacy')}>Privacy Policy</button>
                <button type="button" onClick={() => setActiveModal('terms')}>Terms of Use</button>
                <button type="button" onClick={() => setActiveModal('cookies')}>Cookie Policy</button>
              </div>
            </div>
          </div>
        </footer>

        {/* Legal Modals */}
        <LegalModal type={activeModal} onClose={() => setActiveModal(null)} />
      </div>
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
