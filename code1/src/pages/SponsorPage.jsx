import React from 'react';
import { Crown, Trophy, Star, Heart, Mail } from 'lucide-react';

const SectionLabel = ({ text }) => (
  <div className="flex items-center gap-3 mb-3">
    <div className="h-px flex-1 bg-red-800/40" />
    <span className="text-red-500 text-xs font-bold uppercase tracking-widest">{text}</span>
    <div className="h-px flex-1 bg-red-800/40" />
  </div>
);

const TierSection = ({ title, icon, sponsors, accent, border }) => (
  <div className="mb-16">
    <div className="flex items-center justify-center gap-3 mb-8">
      <div style={{ color: accent }}>{icon}</div>
      <h2 className="text-3xl font-black text-white" style={{ fontFamily: "'Bebas Neue','Impact',sans-serif" }}>
        {title}
      </h2>
      <div style={{ color: accent }}>{icon}</div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {sponsors.map((s, i) => (
        <div key={i}
          className="bg-gray-950 border hover:scale-105 transition-all duration-300 p-8 text-center group cursor-pointer"
          style={{ borderColor: border }}>
          <div className="w-20 h-20 rounded mx-auto mb-4 flex items-center justify-center text-2xl font-black text-white"
            style={{ backgroundColor: `${accent}22`, border: `1px solid ${accent}40`, fontFamily: "'Bebas Neue','Impact',sans-serif" }}>
            {s.logo || '?'}
          </div>
          <h3 className="text-white font-bold mb-1">{s.name}</h3>
          <p className="text-gray-500 text-xs">{s.desc}</p>
        </div>
      ))}
      {/* Placeholder if empty */}
      {sponsors.length === 0 && (
        <div className="col-span-full border border-dashed border-gray-800 p-10 text-center text-gray-600 text-sm">
          Sponsorship spots available — become a partner!
        </div>
      )}
    </div>
  </div>
);

const SponsorsPage = () => {
  // Replace these with actual sponsor data when available
  const platinum = [];
  const gold = [];
  const silver = [];

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
          <SectionLabel text="Our Partners" />
          <h1 className="text-7xl md:text-9xl font-black leading-none mb-4 text-white"
            style={{ fontFamily: "'Bebas Neue','Impact',sans-serif" }}>
            SPON<span className="text-red-600">SORS</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The teams fueling our race. Powering innovation through strategic partnerships.
          </p>
        </div>

        <TierSection
          title="Platinum Partners"
          icon={<Crown className="w-7 h-7" />}
          sponsors={platinum}
          accent="#a855f7"
          border="rgba(168,85,247,0.3)"
        />
        <TierSection
          title="Gold Partners"
          icon={<Trophy className="w-7 h-7" />}
          sponsors={gold}
          accent="#f59e0b"
          border="rgba(245,158,11,0.3)"
        />
        <TierSection
          title="Silver Partners"
          icon={<Star className="w-7 h-7" />}
          sponsors={silver}
          accent="#9ca3af"
          border="rgba(156,163,175,0.3)"
        />

        {/* Become a Sponsor */}
        <div className="bg-gradient-to-r from-red-950/30 via-black to-red-950/30 border border-red-800/40 p-12 text-center">
          <Heart className="w-10 h-10 text-red-500 mx-auto mb-4" />
          <h2 className="text-4xl font-black text-white mb-3" style={{ fontFamily: "'Bebas Neue','Impact',sans-serif" }}>
            Become a Sponsor
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto mb-6">
            Partner with CODE 1 and get your brand in front of India's next generation of innovators. Multiple tiers available.
          </p>
          <a
            href="mailto:collazon@contact.com"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-bold text-xs uppercase tracking-widest transition-colors"
          >
            <Mail className="w-4 h-4" /> Contact for Sponsorship
          </a>
        </div>
      </div>
    </div>
  );
};

export default SponsorsPage;