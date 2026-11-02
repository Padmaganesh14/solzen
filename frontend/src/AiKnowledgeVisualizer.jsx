import React, { useState, useEffect, useRef, useMemo } from 'react';

/**
 * AI Knowledge Visualizer for SOLZEN About Section
 *
 * Features:
 * - Interactive 3D neural network & interconnected knowledge nodes
 * - Floating translucent glass cards (Concepts, Understanding, Memory, Problem-Solving)
 * - Animated connecting lines with pulse particles (Scattered -> Connected transformation)
 * - Interactive cursor-following 3D perspective tilt
 * - Hover/tap node inspection revealing pedagogical explanation
 * - Mode toggle: "Connected Mental Model" vs "Fragmented Information"
 * - Respects prefers-reduced-motion
 */
export default function AiKnowledgeVisualizer() {
  const [mode, setMode] = useState('connected'); // 'connected' | 'scattered'
  const [activeNode, setActiveNode] = useState('understanding');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isIntersecting, setIsIntersecting] = useState(false);
  const containerRef = useRef(null);

  const conceptNodes = useMemo(() => [
    {
      id: 'concepts',
      title: 'Concepts',
      subtitle: 'Underlying Principles',
      badge: 'Foundations',
      tooltip: 'Deconstructing abstract theories into tangible, intuitive visual building blocks.',
      cx: 24, // % coordinates in stage
      cy: 22,
      accent: '#C98B3C',
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v3m0 12v3M3 12h3m12 0h3" />
          <path d="m5.6 5.6 2.1 2.1m8.6 8.6 2.1 2.1m-12.8 0 2.1-2.1m8.6-8.6 2.1-2.1" />
        </svg>
      )
    },
    {
      id: 'understanding',
      title: 'Understanding',
      subtitle: 'Cognitive Synthesis',
      badge: 'Core Model ✦',
      tooltip: 'Connecting isolated facts into dynamic, durable mental models that make sense.',
      cx: 52,
      cy: 45,
      isCore: true,
      accent: '#DFAB62',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      )
    },
    {
      id: 'memory',
      title: 'Memory',
      subtitle: 'Durable Retention',
      badge: 'Reinforcement',
      tooltip: 'Strengthening neural connections so knowledge remains resilient and unshakeable over time.',
      cx: 22,
      cy: 74,
      accent: '#7E998B',
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-10 10c0 4.4 2.9 8.2 7 9.5.5.1.7-.2.7-.5v-1.7" />
          <path d="M12 6a6 6 0 0 0-6 6c0 2.6 1.7 4.9 4.2 5.7" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      )
    },
    {
      id: 'problem-solving',
      title: 'Problem-Solving',
      subtitle: 'Confident Execution',
      badge: 'Actionable',
      tooltip: 'Transforming deep conceptual clarity into confident, real-world execution and critical thinking.',
      cx: 78,
      cy: 72,
      accent: '#C98B3C',
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      )
    }
  ], []);

  // Intersection observer to trigger subtle entrance pulse
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Subtle 3D perspective tilt on cursor movement
  const handleMouseMove = (e) => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width - 0.5;
    const yRatio = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: +(yRatio * -8).toFixed(2),
      y: +(xRatio * 10).toFixed(2)
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const currentNodeData = conceptNodes.find(n => n.id === activeNode) || conceptNodes[1];

  return (
    <div
      ref={containerRef}
      className={`ai-visualizer-wrapper ${isIntersecting ? 'visualizer-in-view' : ''} mode-${mode}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="AI Knowledge Visualization"
    >
      {/* Visualizer Header Bar with State Switcher */}
      <div className="ai-visualizer-bar">
        <div className="ai-status-indicator">
          <span className="ai-pulsing-node" aria-hidden="true" />
          <span className="ai-model-tag">
            {mode === 'connected' ? 'AI Neural Synthesis' : 'Fragmented Knowledge'}
          </span>
        </div>

        {/* Transformation Toggle: Scattered vs Connected */}
        <div className="ai-mode-toggle" role="tablist" aria-label="Transformation mode">
          <button
            type="button"
            className={`ai-toggle-btn ${mode === 'connected' ? 'active' : ''}`}
            onClick={() => setMode('connected')}
            title="View integrated conceptual mental model"
            aria-selected={mode === 'connected'}
          >
            <span>Connected Model</span>
          </button>
          <button
            type="button"
            className={`ai-toggle-btn ${mode === 'scattered' ? 'active' : ''}`}
            onClick={() => setMode('scattered')}
            title="View isolated, disconnected concepts"
            aria-selected={mode === 'scattered'}
          >
            <span>Scattered Facts</span>
          </button>
        </div>
      </div>

      {/* 3D Perspective Visual Stage */}
      <div
        className="ai-stage-container"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
        }}
      >
        {/* Ambient Neural Light Blooms */}
        <div className="ai-light-bloom gold-bloom" aria-hidden="true" />
        <div className="ai-light-bloom forest-bloom" aria-hidden="true" />

        {/* SVG Interconnected Neural Lines & Particle Network */}
        <svg className="ai-neural-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="lineGradGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C98B3C" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#DFAB62" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0B332B" stopOpacity="0.4" />
            </linearGradient>

            <linearGradient id="lineGradMuted" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A8B3A7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#C98B3C" stopOpacity="0.4" />
            </linearGradient>

            <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Concentric Cosmic Grid Rings */}
          <g className="ai-bg-orbits" opacity={mode === 'connected' ? '0.45' : '0.15'}>
            <circle cx="52" cy="45" r="16" stroke="rgba(201, 139, 60, 0.25)" strokeWidth="0.3" strokeDasharray="1.5 1.5" />
            <circle cx="52" cy="45" r="30" stroke="rgba(11, 51, 43, 0.15)" strokeWidth="0.25" />
            <circle cx="52" cy="45" r="44" stroke="rgba(201, 139, 60, 0.18)" strokeWidth="0.25" strokeDasharray="2 2" />
          </g>

          {/* Connecting Neural Paths */}
          {mode === 'connected' && (
            <g className="ai-active-connections">
              {/* Path 1: Concepts -> Understanding */}
              <path
                d="M 24,22 C 38,20 44,35 52,45"
                fill="none"
                stroke="url(#lineGradGold)"
                strokeWidth={activeNode === 'concepts' || activeNode === 'understanding' ? '0.85' : '0.55'}
                filter="url(#glowEffect)"
                className="ai-neural-path"
              />
              <circle cx="38" cy="32" r="0.7" fill="#DFAB62" className="ai-travel-particle p1" />

              {/* Path 2: Understanding -> Memory */}
              <path
                d="M 52,45 C 38,50 30,62 22,74"
                fill="none"
                stroke="url(#lineGradGold)"
                strokeWidth={activeNode === 'memory' || activeNode === 'understanding' ? '0.85' : '0.55'}
                filter="url(#glowEffect)"
                className="ai-neural-path"
              />
              <circle cx="34" cy="62" r="0.7" fill="#C98B3C" className="ai-travel-particle p2" />

              {/* Path 3: Understanding -> Problem Solving */}
              <path
                d="M 52,45 C 64,48 70,60 78,72"
                fill="none"
                stroke="url(#lineGradGold)"
                strokeWidth={activeNode === 'problem-solving' || activeNode === 'understanding' ? '0.85' : '0.55'}
                filter="url(#glowEffect)"
                className="ai-neural-path"
              />
              <circle cx="66" cy="60" r="0.7" fill="#DFAB62" className="ai-travel-particle p3" />

              {/* Path 4: Reinforcement loop: Memory -> Problem Solving */}
              <path
                d="M 22,74 C 42,88 62,86 78,72"
                fill="none"
                stroke="url(#lineGradMuted)"
                strokeWidth="0.4"
                strokeDasharray="1.5 1.5"
                className="ai-neural-path-secondary"
              />
              <circle cx="50" cy="84" r="0.6" fill="#A8B3A7" className="ai-travel-particle p4" />
            </g>
          )}

          {/* Scattered disconnected state indicator lines */}
          {mode === 'scattered' && (
            <g className="ai-scattered-gaps" opacity="0.35">
              <line x1="24" y1="22" x2="36" y2="28" stroke="#A8B3A7" strokeWidth="0.4" strokeDasharray="1 1" />
              <line x1="22" y1="74" x2="34" y2="68" stroke="#A8B3A7" strokeWidth="0.4" strokeDasharray="1 1" />
              <line x1="78" y1="72" x2="66" y2="66" stroke="#A8B3A7" strokeWidth="0.4" strokeDasharray="1 1" />
            </g>
          )}
        </svg>

        {/* Floating Translucent Glass Concept Cards */}
        {conceptNodes.map((node, index) => {
          const isActive = activeNode === node.id;
          return (
            <div
              key={node.id}
              className={`ai-concept-card card-${node.id} ${node.isCore ? 'core-card' : ''} ${isActive ? 'is-active' : ''}`}
              style={{
                top: `${node.cy}%`,
                left: `${node.cx}%`,
                animationDelay: `${index * 0.4}s`
              }}
              onMouseEnter={() => setActiveNode(node.id)}
              onClick={() => setActiveNode(node.id)}
              tabIndex={0}
              role="button"
              aria-label={`Explore concept: ${node.title}`}
            >
              <div className="card-top-row">
                <div className="card-icon-badge" style={{ color: node.accent }}>
                  {node.icon}
                </div>
                <span className="card-badge-pill">{node.badge}</span>
              </div>

              <div className="card-body">
                <h4 className="card-title">{node.title}</h4>
                <p className="card-sub">{node.subtitle}</p>
              </div>

              <div className="card-glow-reflection" aria-hidden="true" />
            </div>
          );
        })}
      </div>

      {/* Interactive Concept Inspector Tooltip Bar */}
      <div className="ai-inspector-bar">
        <div className="inspector-badge">
          <span className="inspector-sparkle" aria-hidden="true">✦</span>
          <span className="inspector-name">{currentNodeData.title}</span>
        </div>
        <p className="inspector-description">
          {currentNodeData.tooltip}
        </p>
      </div>
    </div>
  );
}
