import {StrictMode,useEffect,useState,useRef} from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';
import './intro.css';

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
    role: 'Co-Founder & Product Lead',
    bio: 'Drives strategic product development, user experience design, and core educational workflows across interactive learning platforms.',
    linkedin: 'https://linkedin.com/company/solzen'
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
    role: 'Co-Founder & Technology Lead',
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

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Track active section as user scrolls
    const sectionIds = ['home', 'about', 'approach', 'technology', 'team', 'insights', 'updates', 'contact'];
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

    return () => {
      window.removeEventListener('scroll', handleScroll);
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
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
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

function App() {
  const [sent, setSent] = useState(false);
  const [opening, setOpening] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [activeTab, setActiveTab] = useState('insights');
  const [activeModal, setActiveModal] = useState(null);
  const [contactPurpose, setContactPurpose] = useState('General enquiry');
  const [contactMessage, setContactMessage] = useState('');

  useEffect(() => {
    const beginExit = setTimeout(() => setLeaving(true), 1600);
    const finishOpening = setTimeout(() => setOpening(false), 2300);
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('show')),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.animate').forEach(el => observer.observe(el));
    return () => {
      clearTimeout(beginExit);
      clearTimeout(finishOpening);
      observer.disconnect();
    };
  }, []);

  const handleContactMember = memberName => {
    setContactPurpose('Partnership');
    setContactMessage(`Hello, I would like to connect with ${memberName} regarding: `);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const submit = e => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      {opening && (
        <div
          className={leaving ? 'brand-intro intro-leave' : 'brand-intro'}
          aria-label="SOLZEN"
        >
          <div className="intro-glow" />
          <img src="/solzen-logo.png" alt="SOLZEN" />
          <div className="intro-wordmark">SOLZEN</div>
          <p>Deeper learning. Better understanding.</p>
        </div>
      )}

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
                <a className="button dark" href="#about">
                  Explore SOLZEN <span>↓</span>
                </a>
                <a className="underlink" href="#contact">
                  Connect With Us <Arrow />
                </a>
              </div>
            </div>

            <div className="hero-object animate">
              <div className="orbit o-one" />
              <div className="orbit o-two" />
              <div className="orbit o-three" />
              <div className="object-core">
                <span>Explore</span>
              </div>
              <p className="coordinate c-one">UNDERSTAND / 01</p>
              <p className="coordinate c-two">APPLY / ∞</p>
            </div>

            <div className="hero-foot">
              <span>Scroll to discover</span>
              <i />
            </div>
          </section>

          {/* 2. ECOSYSTEM / CREDIBILITY BAR (PDF Section 4 & 21) */}
          <section className="ecosystem-bar">
            <div className="ecosystem-badge">
              <span className="ecosystem-badge-tag">Incubated Ecosystem</span>
              <span className="ecosystem-text">
                Supported within the <strong>Nirmaan Ecosystem</strong>, IIT Madras
              </span>
            </div>
            <div className="ecosystem-traits">
              <span><b>·</b> Research-minded</span>
              <span><b>·</b> Purpose-led</span>
              <span><b>·</b> Technology × Education</span>
            </div>
          </section>

          {/* 3. PROBLEM & OPPORTUNITY (PDF Section 4 & 21) */}
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
              </div>

              <form onSubmit={submit}>
                <label>
                  Name *
                  <input required name="name" placeholder="Your name" />
                </label>
                <label>
                  Email *
                  <input required type="email" name="email" placeholder="you@organisation.com" />
                </label>
                <label>
                  Organisation
                  <input name="organisation" placeholder="School, university, company or lab" />
                </label>
                <label>
                  Purpose *
                  <select
                    name="purpose"
                    value={contactPurpose}
                    onChange={e => setContactPurpose(e.target.value)}
                  >
                    <option value="General enquiry">General enquiry</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Education institution">Education institution</option>
                    <option value="Research">Research</option>
                    <option value="Media">Media</option>
                    <option value="Career">Career</option>
                    <option value="Other">Other</option>
                  </select>
                </label>
                <label>
                  Message *
                  <textarea
                    required
                    name="message"
                    rows="3"
                    value={contactMessage}
                    onChange={e => setContactMessage(e.target.value)}
                    placeholder="Tell us a little more about your context and goals"
                  />
                </label>
                <button className="button dark" type="submit">
                  Send message <Arrow />
                </button>
                {sent && (
                  <p className="success">
                    Thank you. Your message has been safely received. A member of our team will respond via verified communication.
                  </p>
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
                  <li><a href="#contact" onClick={() => setContactPurpose('General enquiry')}>General Inquiries</a></li>
                  <li><a href="#contact" onClick={() => setContactPurpose('Partnership')}>Partnerships</a></li>
                  <li><a href="#contact" onClick={() => setContactPurpose('Education institution')}>Institutions</a></li>
                  <li><a href="#contact" onClick={() => setContactPurpose('Career')}>Careers</a></li>
                </ul>
              </div>

              <div className="footer-col">
                <h5>Ecosystem &amp; Social</h5>
                <ul>
                  <li><span style={{ fontSize: '11px', color: '#8ba296' }}>Nirmaan, IIT Madras</span></li>
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
