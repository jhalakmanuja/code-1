import React, { useState } from 'react';
import { FileText, Cpu, Trophy, Flag, Calendar, CheckCircle } from 'lucide-react';

import car1 from '../assets/car1.png';
import car2 from '../assets/car2.png';
import car3 from '../assets/car3.png';

/* ─── Data ─────────────────────────────────────────────────── */
const phases = [
  {
    id: 'qualify', number: '01', side: 'right',
    title: 'Qualifying Lap',
    subtitle: 'Idea Submission',
    date: '9 Mar – 31 Mar 2026',
    status: 'live',
    icon: <FileText className="w-6 h-6" />,
    accent: '#dc2626',
    description: 'Submit your PPT proposal on Unstop — your idea, problem statement, and solution approach. The race begins here.',
    location: 'Online (Unstop)',
  },
  {
    id: 'strategy', number: '02', side: 'left',
    title: 'Strategy Lap',
    subtitle: 'Online Shortlisting',
    date: '4 Apr 2026',
    status: 'upcoming',
    icon: <Cpu className="w-6 h-6" />,
    accent: '#f97316',
    description: 'Expert panel reviews submitted ideas on innovation, feasibility, and clarity. Only the sharpest teams advance.',
    location: 'Online',
  },
  {
    id: 'final', number: '03', side: 'right',
    title: 'Final Race',
    subtitle: 'Offline Hackathon',
    date: '10 Apr 2026',
    status: 'upcoming',
    icon: <Trophy className="w-6 h-6" />,
    accent: '#eab308',
    description: 'Finalists build working prototypes at ADGIPS. Mentor pit stops, time pressure, final pitch to judges.',
    location: 'ADGIPS, East Delhi',
  },
  {
    id: 'podium', number: '04', side: 'left',
    title: 'Podium Finish',
    subtitle: 'Awards & Ceremony',
    date: '10 Apr 2026, Evening',
    status: 'upcoming',
    icon: <Flag className="w-6 h-6" />,
    accent: '#22c55e',
    description: 'Winners crowned. Prizes, recognition, and the checkered flag. The race ends at the podium.',
    location: 'ADGIPS, East Delhi',
  },
];

const finalSchedule = [
  { time: '10:00 AM', label: 'Doors Open & Check-in',      type: 'milestone' },
  { time: '10:30 AM', label: 'Opening Ceremony',            type: 'ceremony'  },
  { time: '11:00 AM', label: 'Hacking Begins 🚀',           type: 'main'      },
  { time: '12:30 PM', label: 'Mentor Pit Stops',            type: 'support'   },
  { time: '01:30 PM', label: 'Lunch Break 🍽️',              type: 'break'     },
  { time: '02:30 PM', label: 'Hacking Continues',           type: 'main'      },
  { time: '04:30 PM', label: 'Final Submissions',           type: 'milestone' },
  { time: '05:00 PM', label: 'Project Presentations',       type: 'support'   },
  { time: '06:00 PM', label: 'Podium Ceremony 🏆',          type: 'ceremony'  },
];

const typeStyle = {
  milestone: { border: '#dc2626', text: '#f87171' },
  ceremony:  { border: '#eab308', text: '#fde047' },
  main:      { border: '#3b82f6', text: '#93c5fd' },
  support:   { border: '#8b5cf6', text: '#c4b5fd' },
  break:     { border: '#22c55e', text: '#86efac'  },
};

/* ─── Car images mapped to each lap ─────────────────────────
   Lap 01 (card right) → blank LEFT  → car1
   Lap 02 (card left)  → blank RIGHT → car2
   Lap 03 (card right) → blank LEFT  → car3
   Lap 04 (card left)  → blank RIGHT → car1 (cycle)
──────────────────────────────────────────────────────────── */
const lapCarImages = [car1, car2, car3, car1];

/* ─── Hoverable Waypoint Card ─────────────────────────────── */
const WaypointCard = ({ phase, side }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative cursor-pointer transition-all duration-500 ${side === 'right' ? 'ml-auto pl-8' : 'mr-auto pr-8'}`}
      style={{ width: '42%', minWidth: 260 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Connector line to track */}
      <div
        className={`absolute top-8 transition-all duration-400 ${side === 'right' ? 'left-0 w-8' : 'right-0 w-8'} h-px`}
        style={{ backgroundColor: hovered ? phase.accent : '#333' }}
      />

      {/* Card */}
      <div
        className="relative bg-gray-950 border overflow-hidden transition-all duration-500"
        style={{
          borderColor: hovered ? phase.accent : '#1f1f1f',
          transform: hovered ? 'translateY(-4px) scale(1.02)' : 'none',
          boxShadow: hovered ? `0 12px 40px ${phase.accent}22` : 'none',
        }}
      >
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-400"
          style={{ backgroundColor: hovered ? phase.accent : 'transparent' }} />

        {/* Telemetry header */}
        <div className="flex items-center justify-between px-4 pt-3 pb-1.5"
          style={{ fontFamily: "'Courier New', monospace" }}>
          <span className="text-[10px] text-gray-600 uppercase tracking-widest">
            CODE1 // LAP_{phase.number}
          </span>
          <span className="flex items-center gap-1 text-[10px]" style={{ color: phase.accent }}>
            {phase.status === 'live'
              ? <><span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse" style={{ backgroundColor: phase.accent }} />LIVE</>
              : 'UPCOMING'}
          </span>
        </div>

        <div className="mx-4 h-px bg-gray-900" />

        {/* Body */}
        <div className="px-4 pt-4 pb-5">
          {/* Icon + title */}
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 flex-shrink-0 transition-colors duration-300"
              style={{ color: hovered ? phase.accent : '#555' }}>
              {phase.icon}
            </div>
            <div>
              <div className="text-gray-500 text-[10px] uppercase tracking-widest">{phase.number}</div>
              <h3 className="text-lg font-black text-white leading-tight"
                style={{ fontFamily: "'Bebas Neue','Impact',sans-serif" }}>
                {phase.title}
              </h3>
            </div>
          </div>

          {/* Date pill */}
          <div className="inline-block text-xs font-bold px-2 py-0.5 mb-3 border"
            style={{ color: phase.accent, borderColor: `${phase.accent}40`, backgroundColor: `${phase.accent}10` }}>
            📅 {phase.date}
          </div>

          {/* Description — only on hover */}
          <div
            className="overflow-hidden transition-all duration-500"
            style={{ maxHeight: hovered ? 120 : 0, opacity: hovered ? 1 : 0 }}
          >
            <p className="text-gray-400 text-xs leading-relaxed mb-2">{phase.description}</p>
            <p className="text-gray-600 text-[10px]">📍 {phase.location}</p>
          </div>

          {/* Subtitle always visible */}
          <p className="text-gray-500 text-xs mt-1">{phase.subtitle}</p>
        </div>
      </div>
    </div>
  );
};

/* ─── Car Image Panel ─────────────────────────────────────── */
/* Fills the blank space opposite each waypoint card.
   side = 'left' means the card is on right, so image goes left (and vice-versa).
   We mirror the image horizontally when on the right side so the car always
   faces toward the track center. */
const CarPanel = ({ src, cardSide, accent }) => {
  /* cardSide='right' → image panel is on LEFT side of track
     cardSide='left'  → image panel is on RIGHT side of track */
  const facingRight = cardSide === 'right'; // card right → image left → car faces right (toward track)

  return (
    <div
      className="flex items-center justify-center w-full h-full"
      style={{ padding: '1px 8px' }}
    >
      <div className="relative w-full">
        {/* Subtle glow behind car */}
        <div
          className="absolute inset-0 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: accent }}
        />
        <img
          src={src}
          alt="F1 car"
          className="w-full h-auto object-contain relative z-10"
          style={{
            transform: facingRight ? 'scaleX(1)' : 'scaleX(-1)',
            filter: `drop-shadow(0 8px 32px ${accent}55) saturate(1.15)`,
            maxHeight: '160px',
          }}
        />
      </div>
    </div>
  );
};

/* ─── Curved SVG Race Track ───────────────────────────────── */
const RaceTrack = () => {
  const [hoveredDot, setHoveredDot] = useState(null);

  const pathD = `
    M 400 30
    C 400 80, 600 130, 600 200
    C 600 270, 200 320, 200 400
    C 200 480, 600 530, 600 610
    C 600 680, 200 740, 200 820
  `;

  const dots = [
    { cx: 400, cy: 30,  phase: phases[0] },
    { cx: 200, cy: 400, phase: phases[1] },
    { cx: 600, cy: 610, phase: phases[2] },
    { cx: 200, cy: 820, phase: phases[3] },
  ];

  return (
    <div className="relative w-full">
      {/* SVG track */}
      <svg
        viewBox="0 0 800 860"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        style={{ maxHeight: 860 }}
        preserveAspectRatio="xMidYMid meet"
      >
        <path d={pathD} fill="none" stroke="rgba(220,38,38,0.15)" strokeWidth="28" strokeLinecap="round" />
        <path d={pathD} fill="none" stroke="#1a1a1a" strokeWidth="20" strokeLinecap="round" />
        <path
          d={pathD}
          fill="none"
          stroke="#dc2626"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="12 10"
          opacity="0.7"
        />
        <path
          d={pathD}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray="30 20"
        />

        {/* Waypoint dots */}
        {dots.map((dot, i) => (
          <g key={i}>
            {hoveredDot === i && (
              <circle cx={dot.cx} cy={dot.cy} r="22" fill="none" stroke={dot.phase.accent}
                strokeWidth="2" opacity="0.5" className="animate-ping"
                style={{ transformOrigin: `${dot.cx}px ${dot.cy}px` }} />
            )}
            <circle cx={dot.cx} cy={dot.cy} r="16" fill="#0a0a0a"
              stroke={hoveredDot === i ? dot.phase.accent : '#dc2626'}
              strokeWidth={hoveredDot === i ? 2.5 : 2}
              style={{ cursor: 'pointer', transition: 'stroke 0.3s' }}
              onMouseEnter={() => setHoveredDot(i)}
              onMouseLeave={() => setHoveredDot(null)}
            />
            <circle cx={dot.cx} cy={dot.cy} r="6"
              fill={hoveredDot === i ? dot.phase.accent : '#dc2626'}
              style={{ transition: 'fill 0.3s' }}
            />
            <text x={dot.cx} y={dot.cy + 1} textAnchor="middle" dominantBaseline="middle"
              fill="white" fontSize="8" fontFamily="'Courier New',monospace" fontWeight="bold">
              {dot.phase.number}
            </text>
          </g>
        ))}
      </svg>

      {/* ── Overlaid cards + car images positioned absolutely ── */}
      <div className="absolute inset-0 pointer-events-none">

        {/* ── LAP 01 — card RIGHT, car LEFT ── */}
        <div className="absolute pointer-events-auto" style={{ top: '1%', right: '2%', width: '44%' }}>
          <WaypointCard phase={phases[0]} side="right" />
        </div>
        <div className="absolute pointer-events-none flex items-center"
          style={{ top: '1%', left: '2%', width: '40%', height: '12%' }}>
          <CarPanel src={lapCarImages[0]} cardSide="right" accent={phases[0].accent} />
        </div>

        {/* ── LAP 02 — card LEFT, car RIGHT ── */}
        <div className="absolute pointer-events-auto" style={{ top: '43%', left: '2%', width: '44%' }}>
          <WaypointCard phase={phases[1]} side="left" />
        </div>
        <div className="absolute pointer-events-none flex items-center"
          style={{ top: '43%', right: '2%', width: '40%', height: '12%' }}>
          <CarPanel src={lapCarImages[1]} cardSide="left" accent={phases[1].accent} />
        </div>

        {/* ── LAP 03 — card RIGHT, car LEFT ── */}
        <div className="absolute pointer-events-auto" style={{ top: '64%', right: '2%', width: '44%' }}>
          <WaypointCard phase={phases[2]} side="right" />
        </div>
        <div className="absolute pointer-events-none flex items-center"
          style={{ top: '64%', left: '2%', width: '40%', height: '12%' }}>
          <CarPanel src={lapCarImages[2]} cardSide="right" accent={phases[2].accent} />
        </div>

        {/* ── LAP 04 — card LEFT, car RIGHT ── */}
        <div className="absolute pointer-events-auto" style={{ top: '88%', left: '2%', width: '44%' }}>
          <WaypointCard phase={phases[3]} side="left" />
        </div>
        <div className="absolute pointer-events-none flex items-center"
          style={{ top: '88%', right: '2%', width: '40%', height: '10%' }}>
          <CarPanel src={lapCarImages[3]} cardSide="left" accent={phases[3].accent} />
        </div>
      </div>
    </div>
  );
};

/* ─── Main Page ───────────────────────────────────────────── */
const TimelinePage = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(220,38,38,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(220,38,38,0.04) 1px,transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center gap-3 mb-3 justify-center">
            <div className="h-px w-16 bg-red-800/40" />
            <span className="text-red-500 text-xs font-bold uppercase tracking-widest">Race Schedule</span>
            <div className="h-px w-16 bg-red-800/40" />
          </div>
          <h1 className="text-7xl md:text-9xl font-black leading-none mb-4 text-white"
            style={{ fontFamily: "'Bebas Neue','Impact',sans-serif" }}>
            THE <span className="text-red-600">CIRCUIT</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Every lap counts. Hover over each waypoint to unlock the details of your race.
          </p>
        </div>

        {/* Desktop track */}
        <div className="hidden md:block mb-4">
          <RaceTrack />
        </div>

        {/* Mobile fallback */}
        <div className="md:hidden space-y-4 mb-16">
          {phases.map((phase, i) => (
            <div key={i} className="bg-gray-950 border border-gray-800 hover:border-red-700/50 transition-all duration-300 overflow-hidden">
              {/* Car image on mobile too */}
              <div className="w-full flex justify-center pt-4 px-6">
                <img
                  src={lapCarImages[i]}
                  alt="F1 car"
                  className="h-24 object-contain"
                  style={{
                    filter: `drop-shadow(0 4px 16px ${phase.accent}55) saturate(1.15)`,
                  }}
                />
              </div>
              <div className="flex items-center justify-between px-4 pt-3 pb-1.5"
                style={{ fontFamily: "'Courier New',monospace" }}>
                <span className="text-[10px] text-gray-600 uppercase tracking-widest">CODE1 // LAP_{phase.number}</span>
                {phase.status === 'live'
                  ? <span className="flex items-center gap-1 text-[10px] text-green-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />LIVE
                    </span>
                  : <span className="text-[10px] text-gray-600">UPCOMING</span>}
              </div>
              <div className="mx-4 h-px bg-gray-900" />
              <div className="px-4 py-4">
                <div className="flex items-center gap-3 mb-2" style={{ color: phase.accent }}>
                  {phase.icon}
                  <h3 className="text-xl font-black text-white"
                    style={{ fontFamily: "'Bebas Neue','Impact',sans-serif" }}>{phase.title}</h3>
                </div>
                <div className="text-xs font-bold mb-2 px-2 py-0.5 inline-block border"
                  style={{ color: phase.accent, borderColor: `${phase.accent}40`, backgroundColor: `${phase.accent}10` }}>
                  📅 {phase.date}
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-1">{phase.description}</p>
                <p className="text-gray-600 text-xs">📍 {phase.location}</p>
              </div>
            </div>
          ))}
        </div>

        <br /><br /><br /><br /><br /><br />

        {/* Final Day Schedule */}
        <div className="bg-gray-950 border border-gray-800 p-8 md:p-10 mt-8">
          <h2 className="text-3xl font-black text-white mb-2 flex items-center gap-3"
            style={{ fontFamily: "'Bebas Neue','Impact',sans-serif" }}>
            <Calendar className="w-7 h-7 text-red-500" />
            Final Race Day – 10 April 2026
          </h2>
          <p className="text-gray-500 text-xs mb-8" style={{ fontFamily: "'Courier New',monospace" }}>
            ADGIPS_EAST_DELHI · 10:00 – 18:00 IST · STATUS: UPCOMING
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {finalSchedule.map((item, i) => {
              const s = typeStyle[item.type];
              return (
                <div key={i}
                  className="flex items-center gap-4 border-l-2 bg-black/40 px-4 py-3 hover:bg-black/60 transition-colors group"
                  style={{ borderColor: s.border }}>
                  <span className="text-sm font-black tabular-nums min-w-[70px] group-hover:text-white transition-colors"
                    style={{ fontFamily: "'Bebas Neue','Impact',sans-serif", color: s.text }}>
                    {item.time}
                  </span>
                  <span className="text-gray-400 text-sm group-hover:text-gray-200 transition-colors">{item.label}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-800">
            <div className="flex flex-wrap gap-4 text-xs text-gray-600">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-green-500" />All times in IST</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-green-500" />Updates via WhatsApp group</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-green-500" />Bring laptop + valid ID</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;