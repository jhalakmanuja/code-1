import React, { useState, useEffect, useRef } from 'react';
import { Flag, Zap, Users, Trophy, Target, Cpu, Globe, ChevronRight, Activity } from 'lucide-react';

/* ══════════════════════════════════════════════
   ANIMATED COUNTER
══════════════════════════════════════════════ */
const AnimCounter = ({ to, suffix = '', duration = 1800 }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 4);
          setVal(Math.floor(ease * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to, duration]);

  return <span ref={ref}>{val}{suffix}</span>;
};

/* ══════════════════════════════════════════════
   TELEMETRY FLASHCARD  (OFFGRID // STATS style)
══════════════════════════════════════════════ */
const TelCard = ({ label, stat, suffix = '', desc, accent, isText = false }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="relative bg-[#080808] border overflow-hidden cursor-pointer select-none"
      style={{
        borderColor: hov ? accent : '#1c1c1c',
        transform: hov ? 'translateY(-5px)' : 'none',
        boxShadow: hov ? `0 16px 40px ${accent}25` : 'none',
        transition: 'all 0.45s cubic-bezier(0.23,1,0.32,1)',
      }}
    >
      {/* glow bar top */}
      <div className="absolute top-0 inset-x-0 h-[2px]" style={{ background: hov ? accent : 'transparent', transition: 'background 0.4s' }} />
      {/* scanline shimmer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100"
        style={{ background: `linear-gradient(180deg, transparent 40%, ${accent}08 50%, transparent 60%)`, animation: hov ? 'scanline 1.2s linear infinite' : 'none' }} />

      {/* header row */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1" style={{ fontFamily: "'Courier New',monospace" }}>
        <span className="text-[9px] text-gray-600 uppercase tracking-widest">CODE1 // {label}</span>
        <span className="flex items-center gap-1.5 text-[9px]" style={{ color: accent }}>
          <span className="inline-block w-[6px] h-[6px] rounded-full animate-pulse" style={{ background: accent }} />
          F1 ·
        </span>
      </div>
      <div className="mx-4 h-px bg-gray-900" />

      {/* stat */}
      <div className="px-4 pt-4 pb-5">
        <div className="font-black leading-none mb-2" style={{
          fontFamily: "'Bebas Neue','Impact',sans-serif",
          fontSize: 'clamp(2.8rem,6vw,4.5rem)',
          color: hov ? accent : '#fff',
          transition: 'color 0.35s',
          whiteSpace: 'pre-line',
        }}>
          {isText ? stat : <AnimCounter to={typeof stat === 'number' ? stat : parseInt(stat)} suffix={suffix} />}
        </div>
        <p className="text-gray-500 text-[11px] leading-relaxed">{desc}</p>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   TRACK SPEEDOMETER BAR
══════════════════════════════════════════════ */
const SpeedBar = ({ label, value, max = 100, accent, delay = 0 }) => {
  const [w, setW] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setTimeout(() => setW(value), delay);
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value, delay]);

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">{label}</span>
        <span className="text-xs font-black" style={{ fontFamily: "'Bebas Neue','Impact',sans-serif", color: accent }}>{value}%</span>
      </div>
      <div className="h-[3px] bg-gray-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000"
          style={{ width: `${w}%`, background: `linear-gradient(90deg, ${accent}aa, ${accent})` }} />
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   PILLAR CARD  (flip-reveal on hover)
══════════════════════════════════════════════ */
const PillarCard = ({ icon, tag, title, description, points, accent = '#dc2626' }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="relative bg-[#080808] border overflow-hidden"
      style={{
        borderColor: hov ? accent : '#1c1c1c',
        transform: hov ? 'scale(1.02)' : 'scale(1)',
        boxShadow: hov ? `0 20px 50px ${accent}20` : 'none',
        transition: 'all 0.4s cubic-bezier(0.23,1,0.32,1)',
      }}
    >
      {/* Angled accent corner */}
      <div className="absolute top-0 left-0 w-0 h-0 transition-all duration-500"
        style={{
          borderTop: `60px solid ${accent}`,
          borderRight: '60px solid transparent',
          opacity: hov ? 0.15 : 0,
        }} />
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: hov ? accent : 'transparent', transition: 'background 0.4s' }} />

      <div className="p-7">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-3 border transition-all duration-300"
            style={{ borderColor: hov ? accent : '#222', color: hov ? accent : '#555' }}>
            {icon}
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: accent }}>{tag}</span>
        </div>
        <h3 className="font-black text-white mb-3 text-3xl leading-none" style={{ fontFamily: "'Bebas Neue','Impact',sans-serif" }}>{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-5">{description}</p>
        <div className="space-y-2">
          {points.map((pt, j) => (
            <div key={j} className="flex items-start gap-2.5 group/item">
              <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 transition-transform group-hover/item:translate-x-1" style={{ color: accent }} />
              <span className="text-gray-300 text-sm">{pt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   RACING TRACK DETAIL CARD
══════════════════════════════════════════════ */
const TrackDetailCard = ({ number, title, subtitle, desc, accent, barValue }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="relative border bg-[#080808] overflow-hidden cursor-pointer"
      style={{
        borderColor: hov ? accent : '#1c1c1c',
        transition: 'all 0.4s',
        boxShadow: hov ? `0 8px 32px ${accent}20` : 'none',
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: hov ? accent : 'transparent', transition: 'background 0.4s' }} />
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <span className="text-gray-800 font-black text-5xl leading-none" style={{ fontFamily: "'Bebas Neue','Impact',sans-serif" }}>{number}</span>
          <span className="text-[10px] font-bold px-2 py-0.5 border" style={{ color: accent, borderColor: `${accent}40`, background: `${accent}10` }}>{subtitle}</span>
        </div>
        <h4 className="text-white font-bold text-base mb-1">{title}</h4>
        <p className="text-gray-600 text-xs mb-4">{desc}</p>
        <SpeedBar label="intensity" value={barValue} accent={accent} />
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   SCROLLING TICKER
══════════════════════════════════════════════ */
const Ticker = () => {
  const items = ['QUALIFYING LAP OPEN', 'SUBMIT YOUR PPT BY 31 MARCH', 'FINAL RACE: 10 APRIL 2026', '7 INNOVATION TRACKS', 'ORGANIZED BY COLLAZON', 'TEAMS OF 2-4 MEMBERS', 'ADGIPS · EAST DELHI', 'RACE TO THE PODIUM'];
  const repeated = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-red-900/30 bg-red-950/10 py-2.5 my-16">
      <div className="flex gap-12 whitespace-nowrap" style={{ animation: 'ticker 28s linear infinite' }}>
        {repeated.map((item, i) => (
          <span key={i} className="text-xs font-black uppercase tracking-widest text-red-500 flex items-center gap-3 flex-shrink-0">
            <Flag className="w-3 h-3" />{item}
          </span>
        ))}
      </div>
      <style>{`@keyframes ticker { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }`}</style>
    </div>
  );
};

/* ══════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════ */
const AboutPage = () => {
  const flashcards = [
    { label: 'STAGES_COUNT',  stat: 3,     suffix: '',    desc: 'Progressive race laps from idea to podium', accent: '#dc2626' },
    { label: 'TRACKS_TOTAL',  stat: 7,     suffix: '',    desc: 'Innovation racing tracks across tech domains', accent: '#f97316' },
    { label: 'TEAM_SIZE_MAX', stat: 4,     suffix: '+',   desc: 'Members per team — diverse skill wins races', accent: '#3b82f6' },
    { label: 'FINAL_DATE',    stat: '10\nAPR', suffix: '', desc: 'Offline hackathon at ADGIPS East Delhi', accent: '#8b5cf6', isText: true },
    { label: 'STREAMS_OPEN',  stat: 'ALL', suffix: '',    desc: 'Open to engineering, arts, commerce & sciences', accent: '#22c55e', isText: true },
    { label: 'PRIZE_POOL',    stat: 'TBA', suffix: '',    desc: 'Podium prizes, goodies, swags & recognition', accent: '#eab308', isText: true },
  ];

  const pillars = [
    {
      icon: <Zap className="w-7 h-7"/>, tag: 'What is it', title: 'CODE 1',
      accent: '#dc2626',
      description: 'A high-energy hackathon inspired by the speed, precision and technological excellence of F1. Build impactful tech solutions under race-day time pressure.',
      points: ['F1-inspired 3-stage race format', 'Developers, designers & innovators', 'Real-world problem solving', 'Hybrid — online qualifying + offline final'],
    },
    {
      icon: <Trophy className="w-7 h-7"/>, tag: 'Why join', title: 'The Race',
      accent: '#f97316',
      description: 'Push your technical limits. Compete for podium prizes. Transform ideas into working prototypes in front of an industry-grade judging panel.',
      points: ['Prizes for top 3 teams', 'Expert mentor pit stops', 'Certificate for all participants', 'Network with fellow builders'],
    },
    {
      icon: <Users className="w-7 h-7"/>, tag: 'How it works', title: 'Grid Up',
      accent: '#3b82f6',
      description: 'Form a team, choose your track, submit your PPT, survive shortlisting, and race to build your prototype at the offline finale on April 10.',
      points: ['Team: 2–4 members', 'PPT deadline: 31 March 2026', 'Mentoring and Judging: 4 April 2026', 'Final race: 10 April 2026'],
    },
  ];

  const tracks = [
    { number:'01', title:'Rapid Response Racing',   subtitle:'Healthcare',     desc:'AI diagnostics, emergency response, health accessibility', accent:'#ef4444', barValue:85 },
    { number:'02', title:'Sustainable Speed Circuit', subtitle:'Climate Tech', desc:'Renewables, green innovation, sustainability platforms', accent:'#22c55e', barValue:78 },
    { number:'03', title:'Firewall Grand Prix',      subtitle:'Cybersecurity', desc:'Privacy tools, secure infra, digital protection systems', accent:'#3b82f6', barValue:90 },
    { number:'04', title:'FinTech Fast Lane',        subtitle:'Finance',       desc:'Payments, blockchain, financial inclusion platforms', accent:'#f59e0b', barValue:82 },
    { number:'05', title:'Smart City Speedway',      subtitle:'IoT & Urban',   desc:'Data-driven cities, automation, urban intelligence', accent:'#8b5cf6', barValue:75 },
    { number:'06', title:'Wildcard Innovation Lap',  subtitle:'Open Track',    desc:'Any groundbreaking idea that defies categories', accent:'#ec4899', barValue:95 },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:`linear-gradient(rgba(220,38,38,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(220,38,38,0.04) 1px,transparent 1px)`, backgroundSize:'60px 60px' }} />

      {/* Scanline CSS */}
      <style>{`
        @keyframes scanline { 0%{transform:translateY(-100%)} 100%{transform:translateY(200%)} }
      `}</style>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

        {/* ── HERO HEADER ── */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 border border-red-800/40 bg-red-950/20 px-4 py-1.5 mb-6 text-red-400 text-[10px] font-bold uppercase tracking-[0.2em]">
            <Activity className="w-3 h-3 animate-pulse" /> Live Event · March–April 2026
          </div>

          {/* Giant layered heading */}
          <div className="relative mb-4">
            {/* ghost */}
            <h1 className="font-black leading-none text-[clamp(4rem,14vw,11rem)] pointer-events-none select-none"
              style={{ fontFamily:"'Bebas Neue','Impact',sans-serif", color:'rgba(220,38,38,0.06)', position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
              ABOUT
            </h1>
            <h1 className="relative font-black leading-none text-[clamp(4rem,14vw,11rem)]"
              style={{ fontFamily:"'Bebas Neue','Impact',sans-serif" }}>
              ABOUT <span className="text-red-600">CODE 1</span>
            </h1>
          </div>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Where innovation meets the relentless precision of Formula 1.<br/>
            Build fast. Think smarter. <span className="text-red-500 font-bold">Race to the podium.</span>
          </p>
        </div>

        {/* ── TICKER ── */}
        <Ticker />

        {/* ── TELEMETRY FLASHCARDS ── */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px flex-1 bg-red-900/30" />
            <span className="text-red-500 text-[10px] font-bold uppercase tracking-[0.2em]">Race Stats</span>
            <div className="h-px flex-1 bg-red-900/30" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-10" style={{ fontFamily:"'Bebas Née Neue','Impact',sans-serif" }}>
            BY THE <span className="text-red-600">NUMBERS</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {flashcards.map((c,i) => <TelCard key={i} {...c} />)}
          </div>
        </div>

        {/* ── THREE PILLARS ── */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px flex-1 bg-red-900/30" />
            <span className="text-red-500 text-[10px] font-bold uppercase tracking-[0.2em]">Core Blueprint</span>
            <div className="h-px flex-1 bg-red-900/30" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-10" style={{ fontFamily:"'Bebas Neue','Impact',sans-serif" }}>
            THE RACE <span className="text-red-600">BLUEPRINT</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {pillars.map((p,i) => <PillarCard key={i} {...p}/>)}
          </div>
        </div>

      
        {/* ── SIX TRACKS PREVIEW ── */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px flex-1 bg-red-900/30" />
            <span className="text-red-500 text-[10px] font-bold uppercase tracking-[0.2em]">Racing Tracks</span>
            <div className="h-px flex-1 bg-red-900/30" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-3" style={{ fontFamily:"'Bebas Neue','Impact',sans-serif" }}>
            CHOOSE YOUR <span className="text-red-600">LANE</span>
          </h2>
          <p className="text-gray-500 text-sm text-center mb-10 max-w-xl mx-auto">Six innovation tracks + one special Formula 1 track with priority status. Every lane leads to the podium.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {tracks.map((t,i) => <TrackDetailCard key={i} {...t} />)}
          </div>
          {/* Special F1 track banner */}
          <div className="mt-4 border border-red-700/50 bg-red-950/10 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 group hover:border-red-500 transition-colors">
            <div className="text-5xl font-black text-gray-800 leading-none flex-shrink-0" style={{ fontFamily:"'Bebas Neue','Impact',sans-serif" }}>07</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xl font-black text-white" style={{ fontFamily:"'Bebas Neue','Impact',sans-serif" }}>Formula 1 Track</span>
                <span className="bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest">Special Priority</span>
              </div>
              <p className="text-gray-500 text-xs">Motorsport analytics, fan platforms, racing simulations, performance tracking. Builds here receive special judge priority.</p>
            </div>
            <Flag className="w-8 h-8 text-red-600 flex-shrink-0" />
          </div>
        </div>

        {/* ── ELIGIBILITY ── */}
        <div className="border border-gray-900 grid grid-cols-1 md:grid-cols-3">
          {[
            { label: 'WHO',   title: 'Eligibility', items: ['Engineering students', 'Postgraduate students', 'Undergraduate students', 'Arts, Commerce, Sciences'] },
            { label: 'SIZE',  title: 'Team Format', items: ['2 to 4 members per team', 'Solo registration allowed', 'Diverse skills encouraged', 'Women participation valued'] },
            { label: 'MODE',  title: 'Event Mode',  items: ['Hybrid format', 'Online: PPT Mentoring and Judging', 'Offline: Final race at ADGIPS', 'Mentors present on-site'] },
          ].map((col,i) => (
            <div key={i} className="p-7 border-b md:border-b-0 md:border-r border-gray-900 last:border-0 hover:bg-gray-950/40 transition-colors">
              <div className="text-red-500 text-[9px] font-bold uppercase tracking-[0.2em] mb-1" style={{ fontFamily:"'Courier New',monospace" }}>CODE1 // {col.label}</div>
              <h3 className="text-2xl font-black text-white mb-4" style={{ fontFamily:"'Bebas Neue','Impact',sans-serif" }}>{col.title}</h3>
              <ul className="space-y-2">
                {col.items.map((item,j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-1 h-1 bg-red-600 rounded-full flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AboutPage;