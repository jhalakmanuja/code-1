import React, { useState } from 'react';
import {
  FileText, Lightbulb, Trophy,
  CheckCircle, Star, ChevronRight, Flag, Zap,
} from 'lucide-react';
import { Link } from "react-router-dom";
/* ─── Section label ──────────────────────────────────────────── */
const SectionLabel = ({ text }) => (
  <div className="flex items-center gap-3 mb-3">
    <div className="h-px flex-1 bg-red-800/40" />
    <span className="text-red-500 text-[10px] font-bold uppercase tracking-[0.2em]">{text}</span>
    <div className="h-px flex-1 bg-red-800/40" />
  </div>
);

/* ─── Round data ─────────────────────────────────────────────── */
const rounds = [
  {
    number: 'LAP 1',
    title: 'Qualifying Lap',
    subtitle: 'Idea Submission',
    date: '9 Mar – 31 Mar 2026',
    format: 'Online',
    status: 'completed',          // completed | live | upcoming
    icon: <FileText className="w-10 h-10" />,
    description:
      'Teams must submit a PPT proposal describing their idea, problem statement, and solution approach. This is where your race begins — put your best concept on paper and earn your grid position.',
    challenges: [
      'Clear problem statement',
      'Innovative solution approach',
      'Technology stack overview',
      'Feasibility analysis',
    ],
    criteria: [
      'Clarity of idea',
      'Creativity & innovation',
      'Feasibility & impact',
      'Presentation quality',
    ],
  },
  {
    number: 'LAP 2',
    title: 'Strategy Lap',
    subtitle: 'Online Mentoring and Judging',
    date: '4 Apr 2026',
    format: 'Online Review',
    status: 'completed',
    icon: <Lightbulb className="w-10 h-10" />,
    description:
      'Shortlisted ideas are reviewed by the expert panel based on innovation, feasibility, and clarity. Selected teams advance to the Final Race. This is your pit stop strategy — only the sharpest minds proceed.',
    challenges: [
      'Defend your idea concept',
      'Demonstrate feasibility',
      'Show clear tech roadmap',
      'Highlight uniqueness',
    ],
    criteria: [
      'Innovation depth',
      'Solution feasibility',
      'Technical clarity',
      'Team potential',
    ],
  },
  {
    number: 'LAP 3',
    title: 'Final Race',
    subtitle: 'Offline Hackathon',
    date: '10 Apr 2026',
    format: 'Offline at ADGIPS',
    status: 'completed',
    icon: <Trophy className="w-10 h-10" />,
    description:
      'Finalist teams competed in the main offline hackathon — building working prototypes, collaborating with mentors, and refining solutions within limited time. Teams presented to the judging panel. Winners crowned on the podium.',
    challenges: [
      'Build working prototype',
      'Mentor collaboration',
      'Time-pressure execution',
      'Final presentation pitch',
    ],
    criteria: [
      'Technical implementation',
      'Innovation factor',
      'Business value',
      'Presentation quality',
    ],
  },
];

/* ─── Status badge ───────────────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const map = {
    completed: { label: 'Completed', color: '#22c55e', bg: 'rgba(34,197,94,0.1)',  border: 'rgba(34,197,94,0.3)'  },
    live:      { label: 'Live',      color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.4)', pulse: true },
    upcoming:  { label: 'Upcoming',  color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)' },
  };
  const s = map[status] || map.upcoming;
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.15em] px-2 py-0.5 border"
      style={{ color: s.color, background: s.bg, borderColor: s.border, fontFamily: "'Courier New',monospace" }}
    >
      {s.pulse && <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: s.color }} />}
      {s.label}
    </span>
  );
};

/* ─── Animated progress bar for laps ────────────────────────── */
const LapProgress = ({ rounds }) => {
  const done   = rounds.filter(r => r.status === 'completed').length;
  const active = rounds.findIndex(r => r.status === 'live');
  const pct    = done === rounds.length ? 100 : Math.round((done / rounds.length) * 100);

  return (
    <div className="mb-12 border border-gray-900 bg-[#080808] p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] text-gray-600 uppercase tracking-widest" style={{ fontFamily: "'Courier New',monospace" }}>
          CODE1 // RACE_PROGRESS
        </span>
        <span className="text-[10px] font-black text-red-500" style={{ fontFamily: "'Bebas Neue','Impact',sans-serif" }}>
          {pct}% COMPLETE
        </span>
      </div>

      {/* Track bar */}
      <div className="relative h-2 bg-gray-900 rounded-full overflow-hidden mb-4">
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-all duration-1000"
          style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #7f1d1d, #dc2626, #ef4444)' }}
        />
        {/* Checkpoint markers */}
        {rounds.map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 -translate-y-1/2 w-px h-3 bg-black"
            style={{ left: `${((i + 1) / rounds.length) * 100}%` }}
          />
        ))}
      </div>

      {/* Lap indicators */}
      <div className="flex justify-between">
        {rounds.map((r, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full border"
              style={{
                background: r.status === 'completed' ? '#dc2626' : r.status === 'live' ? '#ef4444' : '#1c1c1c',
                borderColor: r.status === 'upcoming' ? '#333' : '#dc2626',
              }}
            />
            <span className="text-[10px] text-gray-600 uppercase hidden sm:inline" style={{ fontFamily: "'Courier New',monospace" }}>
              {r.number}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── Results Redirect Banner ────────────────────────────────── */
const ResultsBanner = () => {
  const [hov, setHov] = useState(false);
  return (
    <a
      href="#results"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="block mt-12 relative overflow-hidden group transition-all duration-500 cursor-pointer"
      style={{
        border: `1px solid ${hov ? '#b45309' : 'rgba(180,83,9,0.4)'}`,
        boxShadow: hov ? '0 0 40px rgba(234,179,8,0.15)' : 'none',
        background: hov
          ? 'linear-gradient(135deg, rgba(120,53,15,0.5) 0%, rgba(0,0,0,0.8) 100%)'
          : 'linear-gradient(135deg, rgba(120,53,15,0.2) 0%, rgba(0,0,0,0.6) 100%)',
      }}
    >
      {/* Top gold bar */}
      <div className="absolute top-0 inset-x-0 h-[2px] transition-all duration-400"
        style={{ background: hov ? '#fde68a' : '#92400e' }} />

      {/* Shimmer sweep */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none"
        style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(253,230,138,0.07) 50%, transparent 70%)', transform: hov ? 'translateX(100%)' : 'translateX(-100%)', transition: 'transform 0.8s ease' }} />

      <div className="px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

        {/* Left: icon + copy */}
        <div className="flex items-start gap-5">
          {/* Trophy with glow */}
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 blur-lg rounded-full transition-opacity duration-400"
              style={{ background: '#fde68a', opacity: hov ? 0.35 : 0.12 }} />
            <div className="relative p-4 border"
              style={{ borderColor: hov ? '#fde68a88' : '#92400e', background: 'rgba(120,53,15,0.3)' }}>
              <Trophy className="w-10 h-10 transition-colors duration-300" style={{ color: hov ? '#fde68a' : '#d97706' }} />
            </div>
          </div>

          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 flex items-center gap-2"
              style={{ color: '#d97706', fontFamily: "'Courier New',monospace" }}>
              CODE1 // RACE_COMPLETE
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse inline-block" />
            </div>
            <h3 className="font-black text-white leading-none mb-2 text-3xl md:text-4xl"
              style={{ fontFamily: "'Bebas Neue','Impact',sans-serif" }}>
              THE RACE IS OVER.{' '}
              <span style={{ color: '#fde68a' }}>SEE WHO WON.</span>
            </h3>
            <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
              All three laps completed. The checkered flag has dropped. View the full podium,
              team results, special awards, and every finalist who raced to the finish.
            </p>
          </div>
        </div>

        {/* Right: CTA button */}
        <div className="flex-shrink-0">
          <Link  to="/results"
            className="flex items-center gap-3 px-8 py-4 font-black text-sm uppercase tracking-widest transition-all duration-300"
            style={{
              clipPath: 'polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)',
              background: hov ? '#fde68a' : 'rgba(234,179,8,0.15)',
              color: hov ? '#000' : '#fde68a',
              border: `1px solid ${hov ? 'transparent' : '#b4530966'}`,
            }}
          >
            View Results
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Bottom: mini podium preview */}
      <div className="border-t px-8 py-4 flex flex-wrap gap-6"
        style={{ borderColor: 'rgba(180,83,9,0.25)' }}>
        {[
          { pos:'P1', team:'NullPointers',  label:'Champion',   color:'#dc2626' },
          { pos:'P2', team:'ByteForce',     label:'Runner-Up',  color:'#9ca3af' },
          { pos:'P3', team:'GridLockers',   label:'3rd Place',  color:'#f97316' },
        ].map((p, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="font-black text-lg leading-none" style={{ fontFamily:"'Bebas Neue','Impact',sans-serif", color: p.color }}>{p.pos}</span>
            <div>
              <div className="text-white text-xs font-bold leading-none">{p.team}</div>
              <div className="text-[9px] uppercase tracking-wider" style={{ color: p.color }}>{p.label}</div>
            </div>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-1.5 text-[10px] text-gray-600 uppercase tracking-wider self-center" style={{ fontFamily:"'Courier New',monospace" }}>
          <Flag className="w-3 h-3 text-red-600" />
          +{12 - 3} more teams
        </div>
      </div>
    </a>
  );
};

/* ─── Main page ──────────────────────────────────────────────── */
const RoundsPage = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(220,38,38,0.04) 1px,transparent 1px),
                            linear-gradient(90deg,rgba(220,38,38,0.04) 1px,transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

        {/* ── Header ── */}
        <div className="text-center mb-16">
          <SectionLabel text="Race Structure" />
          <h1 className="text-7xl md:text-9xl font-black leading-none mb-4 text-white"
            style={{ fontFamily: "'Bebas Neue','Impact',sans-serif" }}>
            COMPETITION <span className="text-red-600">LAPS</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Three stages. Every lap counts. Push harder as you advance toward the checkered flag.
          </p>
        </div>

        {/* ── Progress bar ── */}
        <LapProgress rounds={rounds} />

        {/* ── Round selector cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-12">
          {rounds.map((r, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              className={`cursor-pointer relative bg-[#080808] border p-7 transition-all duration-300 group overflow-hidden
                ${active === i ? 'border-red-600' : 'border-gray-900 hover:border-red-900/60'}`}
              style={{ boxShadow: active === i ? '0 0 24px rgba(220,38,38,0.12)' : 'none' }}
            >
              {/* Active top bar */}
              {active === i && <div className="absolute top-0 inset-x-0 h-[2px] bg-red-600" />}

              {/* Completed checkered pattern corner */}
              {r.status === 'completed' && (
                <div className="absolute top-3 right-3 opacity-20">
                  <Flag className="w-5 h-5 text-green-400" />
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <span className="text-gray-800 font-black text-6xl leading-none"
                  style={{ fontFamily: "'Bebas Neue','Impact',sans-serif" }}>{i + 1}</span>
                <StatusBadge status={r.status} />
              </div>

              <div className={`mb-4 transition-colors duration-300 ${active === i ? 'text-red-500' : 'text-gray-700 group-hover:text-red-800'}`}>
                {r.icon}
              </div>

              <div className="text-red-500 text-[10px] font-black uppercase tracking-[0.15em] mb-1"
                style={{ fontFamily: "'Courier New',monospace" }}>{r.number}</div>
              <h3 className="text-2xl font-black text-white mb-1"
                style={{ fontFamily: "'Bebas Neue','Impact',sans-serif" }}>{r.title}</h3>
              <p className="text-gray-600 text-xs mb-4 uppercase tracking-wider">{r.subtitle}</p>

              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-gray-500">
                  <span className="text-red-700">▸</span> {r.date}
                </div>
                <div className="flex items-center gap-1.5 text-gray-500">
                  <span className="text-red-700">▸</span> {r.format}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Detail panel ── */}
        <div className="bg-[#080808] border border-gray-900 p-8 md:p-12 mb-0">
          {/* Panel header */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="text-red-500">{rounds[active].icon}</div>
              <div>
                <div className="text-red-500 text-[10px] font-black uppercase tracking-[0.15em] mb-0.5"
                  style={{ fontFamily: "'Courier New',monospace" }}>{rounds[active].number}</div>
                <h2 className="text-4xl font-black text-white leading-none"
                  style={{ fontFamily: "'Bebas Neue','Impact',sans-serif" }}>{rounds[active].title}</h2>
              </div>
            </div>
            <div className="sm:ml-auto">
              <StatusBadge status={rounds[active].status} />
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed mb-10 text-base max-w-3xl">{rounds[active].description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Challenges */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-red-500" /> Key Challenges
              </h4>
              <div className="space-y-2">
                {rounds[active].challenges.map((c, i) => (
                  <div key={i} className="flex items-center gap-3 border border-gray-900 bg-black/30 px-4 py-2.5 group hover:border-red-900/40 transition-colors">
                    <div className="w-1 h-4 bg-red-700 flex-shrink-0 group-hover:bg-red-500 transition-colors" />
                    <span className="text-gray-400 text-sm">{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Evaluation */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                <Star className="w-4 h-4 text-red-500" /> Evaluation Criteria
              </h4>
              <div className="space-y-2">
                {rounds[active].criteria.map((c, i) => (
                  <div key={i} className="flex items-center gap-3 border border-gray-900 bg-black/30 px-4 py-2.5 group hover:border-gray-700 transition-colors">
                    <div className="w-1 h-4 bg-gray-700 flex-shrink-0 group-hover:bg-gray-500 transition-colors" />
                    <span className="text-gray-400 text-sm">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA row */}
          <div className="pt-8 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://unstop.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-10 py-4 font-black uppercase tracking-widest transition-all duration-300 hover:shadow-lg hover:shadow-red-600/30 text-sm group"
              style={{ clipPath: 'polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)' }}
            >
              <Zap className="w-4 h-4" />
              Register on Unstop
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* ── RESULTS REDIRECT BANNER ── */}
        <ResultsBanner />

      </div>
    </div>
  );
};

export default RoundsPage;