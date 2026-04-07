import React, { useState } from 'react';
import { Trophy, Flag, Users, Star, Crown, Medal, ChevronDown, ChevronUp, Zap, Award } from 'lucide-react';

/* ══════════════════════════════════════════════
   ROUND 1 — ALL QUALIFYING TEAMS
══════════════════════════════════════════════ */
const ROUND1_TEAMS = [
  "404 Brain Not Found","AlgoAces","All izz well","AnonymousX","Astra",
  "BEROZGAR","BRAIN BRO'S","Benx","Big-O Bros","BoxBox","C4Coders",
  "CLOUDEATER","CYBER PANKHE","CYBER_WARRIORS","Champ_ions","CipherNova",
  "Cloud Fairies","Code Beetles","Code Carnage","Code Garage","Code crew",
  "CodeApex","Cogniforge","Ctrl Alt Elite","DHURANDARS","DRISHTI",
  "Dark Knight","Debuggers","Deeprust","Errorist Rebels","Feedback",
  "Git Happens","Global Scopes","HACKERS","HackElte","HackX","Hacksmiths",
  "Hands2Voice","HarTime Error","IKAGI","Kira's Logic","LordHyphen",
  "NEXT STEP","NOVA","Naan Stop Coders","NayayCoders","Nova Squad",
  "PIT CREW","PaneerCoders","Paradox","PixelPulse","Psycho coders",
  "QUAD INNOVATORS","Quadradar","RB19","Rajma Chawal","Runtime errors",
  "Sarva","Shift-Ctrl-Speed","Solitaire","Stranger Strings","Sudarshan coders",
  "Super Nova","Syntax Error","TEAM JAVABUGS","TEAM VAJRA","Team Aegis5IEGE",
  "Team Compilers","Team Ferrari","Team McLearn","Team Rocket","Team StrawHats",
  "Tech Chaos","Tech Horizon","Termin8ors","TerminalX","The Fall Off",
  "VIRTUS","Veloci vector","Vintage","Weasels & Co.","X-Pirates",
  "Zenith171","codeXwin","coder_zenin","must_be_the_water","pixel pirates",
  "seasaw","vada pav","Midnight Builders"
];

/* ══════════════════════════════════════════════
   ROUND 2 — TOP 27 TEAMS
══════════════════════════════════════════════ */
const ROUND2_TEAMS = [
  'Noodle Dosa',
  'Solitaire',
  'HackElte',
  'Stranger Strings',
  'AnonymousX',
  'HackX',
  'Team McLearn',
  'C4Coders',
  'BoxBox',
  'TEAM JAVABUGS',
  'vada pav',
  'HarTime Error',
  'Big-O Bros',
  'X-Pirates',
  'All izz well',
  'DRISHTI',
  'CYBER PANKHE',
  'Errorist Rebels',
  'LordHyphen',
  'CodeApex',
  'CloudEaster',
  'Team Berozgaar',
  'Hands2Voice',
  'Ctrl Alt Elite',
  'Naan Stop Coders',
  'Team Aegis5IEGE',
  'Veloci vector',
];

/* ══════════════════════════════════════════════
   PODIUM DATA
══════════════════════════════════════════════ */
const RESULTS = {
  winner:   { position: 1, team: 'TBA', track: 'TBA', project: 'TBA', members: ['TBA', 'TBA', 'TBA'], score: '??', badge: 'Champion' },
  runnerUp: { position: 2, team: 'TBA', track: 'TBA', project: 'TBA', members: ['TBA', 'TBA', 'TBA', 'TBA'], score: '??', badge: 'Runner-Up' },
  third:    { position: 3, team: 'TBA', track: 'TBA', project: 'TBA', members: ['TBA', 'TBA', 'TBA'], score: '??', badge: 'Third Place' },
};

/* ══════════════════════════════════════════════
   CONFETTI
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
      {pieces.map((p, i) => (
        <div key={i} className="absolute rounded-sm"
          style={{ left:`${p.x}%`, top:'-10px', width:p.size, height:p.size, background:p.color, transform:`rotate(${p.rot}deg)`, animation:`confettiFall ${p.dur}s ${p.delay}s ease-in forwards` }}/>
      ))}
      <style>{`@keyframes confettiFall{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(100vh) rotate(720deg);opacity:0}}`}</style>
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
      <div className="relative mb-3 w-52 md:w-60 text-center">
        <Confetti active={hov} />
        <div className="absolute inset-0 rounded-sm transition-opacity duration-500"
          style={{ boxShadow:`0 0 40px ${cfg.glow}${hov?'55':'22'}`, opacity:hov?1:0.4 }}/>
        <div className="relative border bg-[#080808] p-5 transition-all duration-500"
          style={{ borderColor:hov?cfg.glow:'#1c1c1c', transform:hov&&data.position===1?'scale(1.05)':'scale(1)', boxShadow:hov?`0 0 30px ${cfg.glow}30`:'none' }}>
          <div className="absolute top-0 inset-x-0 h-[2px]" style={{ background:cfg.glow }}/>
          <div style={{ color:cfg.glow }} className="flex justify-center mb-3">{cfg.icon}</div>
          <div className="text-[9px] font-bold uppercase tracking-[0.2em] mb-1" style={{ color:cfg.glow, fontFamily:"'Courier New',monospace" }}>{data.badge}</div>
          <div className="text-2xl font-black text-white mb-1" style={{ fontFamily:"'Bebas Neue','Impact',sans-serif" }}>{data.team}</div>
          <div className="text-[10px] text-gray-500 mb-3">{data.track}</div>
          <div className="text-4xl font-black leading-none mb-2" style={{ fontFamily:"'Bebas Neue','Impact',sans-serif", color:cfg.glow }}>
            {data.score}<span className="text-base text-gray-600">/100</span>
          </div>
          <div className="mt-3 space-y-1">
            {data.members.map((m,i)=>(
              <div key={i} className="text-[11px] text-gray-400 flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background:cfg.glow }}/>{m}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={`w-52 md:w-60 ${cfg.height} flex items-start justify-center pt-4 transition-all duration-500`}
        style={{ background:`linear-gradient(180deg, ${cfg.glow}22 0%, #0a0a0a 100%)`, border:`1px solid ${hov?cfg.glow:'#222'}`, borderBottom:'none' }}>
        <span className="font-black text-6xl md:text-7xl" style={{ fontFamily:"'Bebas Neue','Impact',sans-serif", color:`${cfg.glow}30` }}>{cfg.label}</span>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   SECTION DIVIDER
══════════════════════════════════════════════ */
const SectionLabel = ({ label }) => (
  <div className="flex items-center gap-3 mb-2 justify-center">
    <div className="h-px w-16 bg-red-900/30"/>
    <span className="text-red-500 text-[10px] font-bold uppercase tracking-[0.2em]">{label}</span>
    <div className="h-px w-16 bg-red-900/30"/>
  </div>
);

/* ══════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════ */
const ResultsPage = () => {
  const [r1Search, setR1Search] = useState('');
  const filtered1 = ROUND1_TEAMS.filter(t => t.toLowerCase().includes(r1Search.toLowerCase()));

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:`linear-gradient(rgba(220,38,38,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(220,38,38,0.04) 1px,transparent 1px)`, backgroundSize:'60px 60px' }}/>
      {/* Concentric rings */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center" style={{ top:'-20%' }}>
        {[900,720,540,360].map((r,i)=>(
          <div key={i} className="absolute rounded-full border border-red-900/10 flex-shrink-0"
            style={{ width:r, height:r, top:'20%', left:'50%', transform:'translateX(-50%)' }}/>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

        {/* ── HEADER ── */}
        <div className="text-center mb-20">
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
            The checkered flag is almost here. Results of Round-1: Qualifying Lap are announced.
          </p>
        </div>

        {/* ══════════════════════════════════════════════
            ROUND 1 — QUALIFYING LAP
        ══════════════════════════════════════════════ */}
        <div className="mb-28">
          <SectionLabel label="Round 1" />
          <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-3"
            style={{ fontFamily:"'Bebas Neue','Impact',sans-serif" }}>
            QUALIFYING <span className="text-red-600">LAP</span>
          </h2>
          <p className="text-center text-gray-500 text-sm mb-10 tracking-wide">
            All teams that entered the race — <span className="text-white font-bold">{ROUND1_TEAMS.length} squads</span> on the grid
          </p>

          {/* Search */}
          <div className="relative max-w-sm mx-auto mb-8">
            <input
              type="text"
              placeholder="Search team..."
              value={r1Search}
              onChange={e => setR1Search(e.target.value)}
              className="w-full bg-transparent border border-gray-800 focus:border-red-700 outline-none px-4 py-2 text-sm text-white placeholder-gray-700 transition-colors duration-200"
              style={{ fontFamily:"'Courier New',monospace" }}
            />
            <span className="absolute right-3 top-2.5 text-[10px] text-gray-700" style={{ fontFamily:"'Courier New',monospace" }}>
              {filtered1.length}/{ROUND1_TEAMS.length}
            </span>
          </div>

          {/* Team name grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
            {filtered1.map((name, i) => (
              <div key={i}
                className="border border-gray-900 bg-[#060606] px-3 py-2.5 flex items-center gap-2 group hover:border-red-900/50 transition-all duration-200">
                <div className="w-1 h-1 rounded-full bg-red-700 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"/>
                <span className="text-[11px] text-gray-400 group-hover:text-white transition-colors leading-tight" style={{ fontFamily:"'Courier New',monospace" }}>
                  {name}
                </span>
              </div>
            ))}
          </div>

          {filtered1.length === 0 && (
            <p className="text-center text-gray-700 text-sm mt-6">No teams match your search.</p>
          )}
        </div>

        {/* ══════════════════════════════════════════════
            ROUND 2 — STRATEGY LAP
        ══════════════════════════════════════════════ */}
        <div className="mb-28">
          <SectionLabel label="Round 2" />
          <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-3"
            style={{ fontFamily:"'Bebas Neue','Impact',sans-serif" }}>
            STRATEGY <span className="text-red-600">LAP</span>
          </h2>
          <p className="text-center text-gray-500 text-sm mb-10 tracking-wide">
            Top <span className="text-white font-bold">27 selected teams</span> advancing to the final lap
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
            {ROUND2_TEAMS.map((team, i) => (
              <div key={i}
                className="border border-gray-900 bg-[#060606] px-3 py-2.5 flex items-center gap-2 group hover:border-red-900/50 transition-all duration-200">
                <div className="w-1 h-1 rounded-full bg-red-700 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"/>
                <span className="text-[11px] text-gray-400 group-hover:text-white transition-colors leading-tight" style={{ fontFamily:"'Courier New',monospace" }}>
                  {team}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 border border-dashed border-red-900/20 p-5 text-center">
            <p className="text-[11px] text-gray-600 uppercase tracking-widest" style={{ fontFamily:"'Courier New',monospace" }}>
              // Round 2 rankings will be revealed after judging
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            PODIUM — CHAMPIONS
        ══════════════════════════════════════════════ */}
        <div className="mb-16">
          <SectionLabel label="Champions" />
          <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-12"
            style={{ fontFamily:"'Bebas Neue','Impact',sans-serif" }}>
            THE <span className="text-red-600">CHAMPIONS</span>
          </h2>

          <div className="flex items-end justify-center gap-2 md:gap-4">
            <PodiumBlock data={RESULTS.runnerUp} />
            <PodiumBlock data={RESULTS.winner} />
            <PodiumBlock data={RESULTS.third} />
          </div>
          <div className="h-3 bg-gradient-to-b from-gray-900 to-black border-t border-gray-800 mx-4"/>
        </div>

        {/* Bottom note */}
        <div className="mt-16 border border-gray-900 p-6 text-center">
          <Award className="w-8 h-8 text-red-600 mx-auto mb-3"/>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">
            All participating teams receive a <span className="text-white font-bold">Certificate of Participation</span> from Collazon. Reach out via WhatsApp or email to claim yours.
          </p>
        </div>

      </div>
    </div>
  );
};

export default ResultsPage;