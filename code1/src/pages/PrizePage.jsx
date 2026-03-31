import React, { useState } from 'react';
import { Crown, Trophy, Medal, Star, Gift } from 'lucide-react';

const SectionLabel = ({ text }) => (
  <div className="flex items-center gap-3 mb-3">
    <div className="h-px flex-1 bg-red-800/40" />
    <span className="text-red-500 text-xs font-bold uppercase tracking-widest">{text}</span>
    <div className="h-px flex-1 bg-red-800/40" />
  </div>
);

const prizes = [
  
  {
    rank: '2ND',
    position: 'RUNNER-UP',
    label: 'Second on Grid',
    icon: <Trophy className="w-12 h-12" />,
    prize: 'TBA',
    benefits: ['Cash Prize', 'Goodies & Swags', 'Certificate of Excellence', 'Community Recognition'],
    accent: '#9ca3af',
    bg: 'from-gray-900/80 to-black',
    border: 'border-gray-600',
    flag: '🥈',
  },
  {
    rank: '1ST',
    position: 'CHAMPION',
    label: 'Pole Position',
    icon: <Crown className="w-12 h-12" />,
    prize: 'TBA',
    benefits: ['Cash Prize', 'Goodies & Swags', 'Certificate of Excellence', 'Community Recognition'],
    accent: '#ef4444',
    bg: 'from-red-950/60 to-black',
    border: 'border-red-600',
    flag: '🏆',
  },
  {
    rank: '3RD',
    position: 'THIRD PLACE',
    label: 'Podium Finish',
    icon: <Medal className="w-12 h-12" />,
    prize: 'TBA',
    benefits: ['Cash Prize', 'Goodies & Swags', 'Certificate of Excellence', 'Community Recognition'],
    accent: '#f97316',
    bg: 'from-orange-950/40 to-black',
    border: 'border-orange-700',
    flag: '🥉',
  },
];

const specialAwards = [
  { title: 'Best F1 Track Project', icon: '🏎️', desc: 'Top motorsport-inspired build with special priority' },
  { title: 'Best Innovation', icon: '💡', desc: 'Most creative and original solution across all tracks' },
  { title: 'Best UI/UX', icon: '🎨', desc: 'Outstanding user experience and design quality' },
  { title: 'Best Social Impact', icon: '🌍', desc: 'Solution with greatest potential societal benefit' },
];

const PrizesPage = () => {
  const [tab, setTab] = useState('overall');

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(220,38,38,0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(220,38,38,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <SectionLabel text="Podium Rewards" />
          <h1 className="text-7xl md:text-9xl font-black leading-none mb-4 text-white"
            style={{ fontFamily: "'Bebas Neue','Impact',sans-serif" }}>
            PODIUM <span className="text-red-600">REWARDS</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Race hard, finish strong. The podium awaits champions.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-gray-950 border border-gray-800">
            {['overall', 'special'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-8 py-3 font-bold text-xs uppercase tracking-widest transition-all duration-300
                  ${tab === t ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                {t === 'overall' ? 'Overall Winners' : 'Special Awards'}
              </button>
            ))}
          </div>
        </div>

        {tab === 'overall' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {prizes.map((p, i) => (
              <div key={i}
                className={`relative bg-gradient-to-b ${p.bg} border ${p.border} p-8 text-center group hover:scale-105 transition-all duration-300 overflow-hidden`}>
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: p.accent }} />
                {/* Bg emoji */}
                <div className="absolute -right-4 -top-4 text-8xl opacity-10">{p.flag}</div>

                <div className="text-gray-600 font-black text-6xl mb-2 leading-none"
                  style={{ fontFamily: "'Bebas Neue','Impact',sans-serif" }}>{p.rank}</div>

                <div className="flex justify-center mb-4" style={{ color: p.accent }}>
                  {p.icon}
                </div>

                <div className="text-xs uppercase tracking-widest mb-1" style={{ color: p.accent }}>{p.label}</div>
                <h3 className="text-3xl font-black text-white mb-4" style={{ fontFamily: "'Bebas Neue','Impact',sans-serif" }}>
                  {p.position}
                </h3>

                <div className="text-4xl font-black mb-6" style={{ color: p.accent, fontFamily: "'Bebas Neue','Impact',sans-serif" }}>
                  {p.prize}
                </div>

                <div className="space-y-2">
                  {p.benefits.map((b, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm text-gray-300 justify-center">
                      <Star className="w-3 h-3 flex-shrink-0" style={{ color: p.accent }} />
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'special' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            {specialAwards.map((a, i) => (
              <div key={i} className="bg-gray-950 border border-gray-800 hover:border-red-700/50 p-7 transition-all duration-300 flex items-start gap-5 group">
                <div className="text-4xl flex-shrink-0">{a.icon}</div>
                <div>
                  <h3 className="text-xl font-black text-white mb-2" style={{ fontFamily: "'Bebas Neue','Impact',sans-serif" }}>{a.title}</h3>
                  <p className="text-gray-400 text-sm">{a.desc}</p>
                  <div className="mt-3 text-red-500 font-black text-lg" style={{ fontFamily: "'Bebas Neue','Impact',sans-serif" }}>TBA</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Total Summary */}
        <div className="bg-gradient-to-r from-red-950/30 via-black to-red-950/30 border border-red-800/40 p-10 text-center">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent" />
          <Gift className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-5xl font-black text-white mb-3" style={{ fontFamily: "'Bebas Neue','Impact',sans-serif" }}>
            Total Prize Pool
          </h2>
          <div className="text-7xl font-black text-red-600 mb-4" style={{ fontFamily: "'Bebas Neue','Impact',sans-serif" }}>TBA</div>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Prizes include cash awards, exclusive goodies, swags, certificates, and community recognition for all podium finishers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrizesPage;