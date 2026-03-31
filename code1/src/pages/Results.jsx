import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Flag, Users, Star, Crown, Medal, ChevronDown, ChevronUp, Zap, Award } from 'lucide-react';

/* ══════════════════════════════════════════════
   SAMPLE DATA  — replace with real results
══════════════════════════════════════════════ */
const RESULTS = {
  winner: {
    position: 1,
    team: 'TBA',
    track: 'TBA',
    project: 'TBA',
    members: ['TBA', 'TBA', 'TBA'],
    score: '??',
    badge: 'Champion',
  },
  runnerUp: {
    position: 2,
    team: 'TBA',
    track: 'TBA',
    project: 'TBA',
    members: ['TBA', 'TBA', 'TBA', 'TBA'],
    score: '??',
    badge: 'Runner-Up',
  },
  third: {
    position: 3,
    team: 'TBA',
    track: 'TBA',
    project: 'TBA',
    members: ['TBA', 'TBA', 'TBA'],
    score: '??',
    badge: 'Third Place',
  },
};

const ALL_TEAMS = [
  { team: 'TBA', track: 'TBA', members: ['TBA', 'TBA', 'TBA'],             rank: 1  },
  { team: 'TBA', track: 'TBA', members: ['TBA', 'TBA', 'TBA', 'TBA'],      rank: 2  },
  { team: 'TBA', track: 'TBA', members: ['TBA', 'TBA', 'TBA'],             rank: 3  },
  { team: 'TBA', track: 'TBA', members: ['TBA', 'TBA', 'TBA'],             rank: 4  },
  { team: 'TBA', track: 'TBA', members: ['TBA', 'TBA', 'TBA'],             rank: 5  },
  { team: 'TBA', track: 'TBA', members: ['TBA', 'TBA', 'TBA'],             rank: 6  },
  { team: 'TBA', track: 'TBA', members: ['TBA', 'TBA', 'TBA', 'TBA'],      rank: 7  },
  { team: 'TBA', track: 'TBA', members: ['TBA', 'TBA', 'TBA'],             rank: 8  },
  { team: 'TBA', track: 'TBA', members: ['TBA', 'TBA'],                    rank: 9  },
  { team: 'TBA', track: 'TBA', members: ['TBA', 'TBA', 'TBA'],             rank: 10 },
  { team: 'TBA', track: 'TBA', members: ['TBA', 'TBA'],                    rank: 11 },
  { team: 'TBA', track: 'TBA', members: ['TBA', 'TBA', 'TBA', 'TBA'],      rank: 12 },
];

/* ══════════════════════════════════════════════
   CONFETTI BURST
══════════════════════════════════════════════ */
const Confetti = ({ active }) => {
  if (!active) return null;
  const pieces = Array.from({ length: 30 }, (_, i) => ({
    x: Math.random() * 100,
    delay: Math.random() * 1.2,
    dur: 1.5 + Math.random() * 1.5,
    color: ['#dc2626','#fff','#f97316','#eab308','#3b82f6'][i % 5],
    size: 4 + Math.random() * 6,
    rot: Math.random() * 360,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p,i) => (
        <div key={i} className="absolute rounded-sm"
          style={{
            left:`${p.x}%`, top:'-10px',
            width: p.size, height: p.size,
            background: p.color,
            transform: `rotate(${p.rot}deg)`,
            animation: `confettiFall ${p.dur}s ${p.delay}s ease-in forwards`,
          }} />
      ))}
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(0) rotate(0deg); opacity:1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity:0; }
        }
      `}</style>
    </div>
  );
};

/* ══════════════════════════════════════════════
   PODIUM BLOCK
══════════════════════════════════════════════ */
const podiumConfig = {
  1: { height:'h-48 md:h-56', icon:<Crown className="w-10 h-10"/>, glow:'#dc2626', label:'1ST', order:'order-2' },
  2: { height:'h-36 md:h-40', icon:<Trophy className="w-8 h-8"/>,  glow:'#9ca3af', label:'2ND', order:'order-1' },
  3: { height:'h-28 md:h-32', icon:<Medal className="w-7 h-7"/>,   glow:'#f97316', label:'3RD', order:'order-3' },
};

const PodiumBlock = ({ data }) => {
  const cfg = podiumConfig[data.position];
  const [hov, setHov] = useState(false);
  return (
    <div className={`flex flex-col items-center ${cfg.order}`}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {/* Team card floating above */}
      <div className="relative mb-3 w-52 md:w-60 text-center">
        <Confetti active={hov} />
        {/* Glow ring */}
        <div className="absolute inset-0 rounded-sm transition-opacity duration-500"
          style={{ boxShadow: `0 0 40px ${cfg.glow}${hov?'55':'22'}`, opacity: hov ? 1 : 0.4 }} />

        <div className="relative border bg-[#080808] p-5 transition-all duration-500"
          style={{
            borderColor: hov ? cfg.glow : '#1c1c1c',
            transform: hov && data.position === 1 ? 'scale(1.05)' : 'scale(1)',
            boxShadow: hov ? `0 0 30px ${cfg.glow}30` : 'none',
          }}>
          <div className="absolute top-0 inset-x-0 h-[2px]" style={{ background: cfg.glow }} />

          <div style={{ color: cfg.glow }} className="flex justify-center mb-3">{cfg.icon}</div>

          <div className="text-[9px] font-bold uppercase tracking-[0.2em] mb-1"
            style={{ color: cfg.glow, fontFamily:"'Courier New',monospace" }}>
            {data.badge}
          </div>

          <div className="text-2xl font-black text-white mb-1" style={{ fontFamily:"'Bebas Neue','Impact',sans-serif" }}>
            {data.team}
          </div>
          <div className="text-[10px] text-gray-500 mb-3">{data.track}</div>

          {/* Score */}
          <div className="text-4xl font-black leading-none mb-2" style={{ fontFamily:"'Bebas Neue','Impact',sans-serif", color: cfg.glow }}>
            {data.score}
            <span className="text-base text-gray-600">/100</span>
          </div>

          {/* Members */}
          <div className="mt-3 space-y-1">
            {data.members.map((m,i) => (
              <div key={i} className="text-[11px] text-gray-400 flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: cfg.glow }} />{m}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Podium step */}
      <div className={`w-52 md:w-60 ${cfg.height} flex items-start justify-center pt-4 transition-all duration-500`}
        style={{
          background: `linear-gradient(180deg, ${cfg.glow}22 0%, #0a0a0a 100%)`,
          border: `1px solid ${hov ? cfg.glow : '#222'}`,
          borderBottom:'none',
        }}>
        <span className="font-black text-6xl md:text-7xl" style={{ fontFamily:"'Bebas Neue','Impact',sans-serif", color:`${cfg.glow}30` }}>
          {cfg.label}
        </span>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   TEAM GRID CARD
══════════════════════════════════════════════ */
const rankStyle = (rank) => {
  if (rank === 1) return { border:'#dc2626', accent:'#dc2626', bg:'rgba(220,38,38,0.06)' };
  if (rank === 2) return { border:'#9ca3af', accent:'#9ca3af', bg:'rgba(156,163,175,0.05)' };
  if (rank === 3) return { border:'#f97316', accent:'#f97316', bg:'rgba(249,115,22,0.06)' };
  return { border:'#1c1c1c', accent:'#555', bg:'transparent' };
};

const TeamCard = ({ data }) => {
  const [open, setOpen] = useState(false);
  const s = rankStyle(data.rank);
  return (
    <div className="border bg-[#080808] overflow-hidden transition-all duration-300 hover:border-red-800/50 cursor-pointer"
      style={{ borderColor: open ? s.border : s.border === '#1c1c1c' ? '#1c1c1c' : s.border, background: s.bg }}
      onClick={() => setOpen(!open)}>
      {/* rank top bar */}
      <div className="h-[2px]" style={{ background: s.accent }} />

      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Rank number */}
            <span className="font-black text-3xl leading-none w-10 flex-shrink-0"
              style={{ fontFamily:"'Bebas Neue','Impact',sans-serif", color: s.accent }}>
              {String(data.rank).padStart(2,'0')}
            </span>
            <div>
              <div className="text-white font-black text-base leading-tight" style={{ fontFamily:"'Bebas Neue','Impact',sans-serif" }}>
                {data.team}
              </div>
              <div className="text-gray-600 text-[10px] uppercase tracking-wider">{data.track}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-600" style={{ fontFamily:"'Courier New',monospace" }}>
              {data.members.length} members
            </span>
            {open ? <ChevronUp className="w-4 h-4 text-gray-600"/> : <ChevronDown className="w-4 h-4 text-gray-600"/>}
          </div>
        </div>

        {/* Members expand */}
        <div className="overflow-hidden transition-all duration-400" style={{ maxHeight: open ? 200 : 0, opacity: open ? 1 : 0 }}>
          <div className="mt-4 pt-4 border-t border-gray-900">
            <div className="text-[9px] text-gray-600 uppercase tracking-widest mb-2" style={{ fontFamily:"'Courier New',monospace" }}>
              CODE1 // TEAM_MEMBERS
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {data.members.map((m,i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs text-gray-400">
                  <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: s.accent }} />{m}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   LIVE LEADERBOARD TICKER
══════════════════════════════════════════════ */
const LeaderTicker = () => {
  const top5 = ALL_TEAMS.slice(0,5);
  const repeated = [...top5,...top5,...top5];
  return (
    <div className="overflow-hidden border-y border-red-900/20 bg-black py-2 mb-16">
      <div className="flex gap-16 whitespace-nowrap" style={{ animation:'ticker 20s linear infinite' }}>
        {repeated.map((t,i) => (
          <span key={i} className="text-[10px] font-black uppercase tracking-widest text-gray-600 flex items-center gap-2 flex-shrink-0">
            <span className="text-red-500">P{t.rank}</span> {t.team}
            <span className="text-gray-800">·</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </div>
  );
};

/* ══════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════ */
const ResultsPage = () => {
  const [filter, setFilter] = useState('All');
  const tracks = ['All', ...Array.from(new Set(ALL_TEAMS.map(t=>t.track)))];
  const filtered = filter === 'All' ? ALL_TEAMS : ALL_TEAMS.filter(t => t.track === filter);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:`linear-gradient(rgba(220,38,38,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(220,38,38,0.04) 1px,transparent 1px)`, backgroundSize:'60px 60px' }} />

      {/* Concentric rings */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center" style={{ top:'-20%' }}>
        {[900,720,540,360].map((r,i)=>(
          <div key={i} className="absolute rounded-full border border-red-900/10 flex-shrink-0"
            style={{ width:r, height:r, top:'20%', left:'50%', transform:'translateX(-50%)' }}/>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

        {/* ── HEADER ── */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 border border-red-800/40 bg-red-950/20 px-4 py-1.5 mb-6 text-red-400 text-[10px] font-bold uppercase tracking-[0.2em]">
            <Zap className="w-3 h-3 animate-pulse"/>Results · Coming Soon
          </div>

          <div className="relative mb-4">
            <h1 className="font-black leading-none text-[clamp(4rem,16vw,12rem)] pointer-events-none select-none"
              style={{ fontFamily:"'Bebas Neue','Impact',sans-serif", color:'rgba(220,38,38,0.06)', position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
              RESULTS
            </h1>
            <h1 className="relative font-black leading-none text-[clamp(4rem,16vw,12rem)]"
              style={{ fontFamily:"'Bebas Neue','Impact',sans-serif" }}>
              RACE <span className="text-red-600">RESULTS</span>
            </h1>
          </div>

          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            The checkered flag is almost here. Results will be announced soon — stay tuned.
          </p>
        </div>

        {/* ── TICKER ── */}
        <LeaderTicker />

        {/* ── PODIUM ── */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-2 justify-center">
            <div className="h-px w-16 bg-red-900/30"/>
            <span className="text-red-500 text-[10px] font-bold uppercase tracking-[0.2em]">Podium Finish</span>
            <div className="h-px w-16 bg-red-900/30"/>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-12"
            style={{ fontFamily:"'Bebas Neue','Impact',sans-serif" }}>
            THE CHAMPIONS
          </h2>

          {/* Podium */}
          <div className="flex items-end justify-center gap-2 md:gap-4">
            <PodiumBlock data={RESULTS.runnerUp} />
            <PodiumBlock data={RESULTS.winner} />
            <PodiumBlock data={RESULTS.third} />
          </div>

          {/* Podium base */}
          <div className="h-3 bg-gradient-to-b from-gray-900 to-black border-t border-gray-800 mx-4"/>
        </div>

        {/* ── SPECIAL AWARDS ── */}
        <div className="mb-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { award:'Best F1 Track Build',  team:'TBA', icon:'🏎️', color:'#dc2626' },
            { award:'Best Innovation',      team:'TBA', icon:'💡', color:'#f97316' },
            { award:'Best UI/UX',           team:'TBA', icon:'🎨', color:'#3b82f6' },
            { award:'Best Social Impact',   team:'TBA', icon:'🌍', color:'#22c55e' },
          ].map((a,i) => (
            <div key={i} className="relative border bg-[#080808] p-5 hover:border-opacity-80 transition-all duration-400 group overflow-hidden"
              style={{ borderColor:`${a.color}33` }}>
              <div className="absolute top-0 inset-x-0 h-[2px]" style={{ background: a.color }}/>
              <div className="text-3xl mb-3">{a.icon}</div>
              <div className="text-[9px] uppercase tracking-widest mb-1"
                style={{ color: a.color, fontFamily:"'Courier New',monospace" }}>Special Award</div>
              <div className="text-white font-bold text-sm mb-1">{a.award}</div>
              <div className="text-xl font-black" style={{ fontFamily:"'Bebas Neue','Impact',sans-serif", color: a.color }}>
                {a.team}
              </div>
            </div>
          ))}
        </div>

        {/* ── ALL TEAMS ── */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px flex-1 bg-red-900/30"/>
            <span className="text-red-500 text-[10px] font-bold uppercase tracking-[0.2em]">All Finalists</span>
            <div className="h-px flex-1 bg-red-900/30"/>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <h2 className="text-4xl font-black text-white" style={{ fontFamily:"'Bebas Neue','Impact',sans-serif" }}>
              FULL GRID — <span className="text-red-600">{ALL_TEAMS.length} TEAMS</span>
            </h2>
            {/* Filter */}
            <div className="flex flex-wrap gap-2">
              {['All','Formula 1 Track','FinTech Fast Lane','Firewall Grand Prix'].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className="text-[10px] px-3 py-1.5 font-bold uppercase tracking-widest border transition-all duration-200"
                  style={{
                    borderColor: filter===f ? '#dc2626' : '#1c1c1c',
                    background: filter===f ? 'rgba(220,38,38,0.15)' : 'transparent',
                    color: filter===f ? '#dc2626' : '#555',
                  }}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Click-to-expand team cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((t,i) => <TeamCard key={i} data={t}/>)}
          </div>

          {/* Bottom note */}
          <div className="mt-10 border border-gray-900 p-6 text-center">
            <Award className="w-8 h-8 text-red-600 mx-auto mb-3"/>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">
              All participating teams receive a <span className="text-white font-bold">Certificate of Participation</span> from Collazon. Reach out via WhatsApp or email to claim yours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;