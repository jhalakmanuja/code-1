import React, { useState } from 'react';
import { Linkedin, Flag } from 'lucide-react';
import sa from '../assets/srishti_aggarwal.jpeg';
import rs from '../assets/rishabh_singh.jpeg';
import rb from '../assets/riddhi_bansal.jpeg';
import jm from '../assets/Jhalak.jpeg';
import ak from '../assets/akshatsharma.png';
import nk from '../assets/nikunj.png';
import rv from '../assets/raunakvats.png';
const SectionLabel = ({ text }) => (
  <div className="flex items-center gap-3 mb-3">
    <div className="h-px flex-1 bg-red-800/40" />
    <span className="text-red-500 text-xs font-bold uppercase tracking-widest">{text}</span>
    <div className="h-px flex-1 bg-red-800/40" />
  </div>
);

const teamMembers = [
  {
    name: 'Srishti Aggarwal',
    designation: 'Founder',
    photo: sa,
    bio: 'Leading Collazon ⚡ Where ideas meet opportunity',
    linkedin: 'https://www.linkedin.com/in/srishti-aggarwal-055592236?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    initials: 'SA',
  },
  {
    name: 'Akshat Sharma',
    designation: 'Technical Lead',
    photo: ak,
    bio: 'Designing the race stages, managing teams, and ensuring every lap runs smoothly.',
    linkedin: 'https://www.linkedin.com/in/akshat-sharma-159b79326?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    initials: 'AS',
  },
  {
    name: 'Ambika Jain',
    designation: 'Content Lead',
    photo: null,
    bio: 'Building the infrastructure that powers CODE 1 — from platform to submissions.',
    linkedin: 'https://www.linkedin.com/in/ambika-jain-900389268?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    initials: 'AJ',
  },
  {
    name: 'Jhalak Manuja',
    designation: 'Event Management Lead',
    photo: jm,
    bio: 'Managing chaos to deliver seamless hackathon experiences',
    linkedin: 'https://www.linkedin.com/in/jhalak-manuja-450361284?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    initials: 'JM',
  },
  {
    name: 'Riddhi Bansal',
    designation: 'Sponsorship Lead',
    photo: rb,
    bio: 'Crafting the F1 visual identity and all creative assets for CODE 1.',
    linkedin: '#',
    initials: 'RB',
  },
  {
    name: 'Mohit Chauhan',
    designation: 'Social Media Lead',
    photo: null,
    bio: 'Securing partnerships and building relationships that fuel the prize pool.',
    linkedin: '#',
    initials: 'MC',
  },
  {
    name: 'Nikunj Aggarwal',
    designation: 'Management Lead',
    photo: nk,
    bio: 'I turn complex event ideas into seamless realities.',
    linkedin: 'www.linkedin.com/in/frostys',
    initials: 'N',
  },
  {
    name: 'Rishabh Singh',
    designation: 'Management Lead',
    photo: rs,
    bio: 'Strategy in mind, leadership in action.',
    linkedin: '#',
    initials: 'RS',
  },
  {
    name: 'Raunak Vats',
    designation: 'Management Lead',
    photo: rv,
    bio: 'Securing partnerships and building relationships that fuel the prize pool.',
    linkedin: '#',
    initials: 'RV',
  },
  {
    name: 'Rehan',
    designation: 'Graphics Lead',
    photo: null,
    bio: 'Dedicated to designing meaningful attractive visuals.',
    linkedin: '#',
    initials: 'R',
  },
  {
    name: 'K Sahinandan',
    designation: 'Graphics Lead',
    photo: null,
    bio: 'Securing partnerships and building relationships that fuel the prize pool.',
    linkedin: '#',
    initials: 'KS',
  },
];

const MemberCard = ({ member }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative bg-gray-950 border border-gray-800 hover:border-red-700/60 p-6 transition-all duration-400 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

      {/* Photo or Initials */}
      <div className="flex justify-center mb-5">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-800 group-hover:border-red-700 transition-colors duration-300">
          {member.photo ? (
            <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-red-950/60 flex items-center justify-center">
              <span className="text-2xl font-black text-red-500"
                style={{ fontFamily: "'Bebas Neue','Impact',sans-serif" }}>
                {member.initials}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-xl font-black text-white mb-1" style={{ fontFamily: "'Bebas Neue','Impact',sans-serif" }}>
          {member.name}
        </h3>
        <div className="inline-block bg-red-950/60 border border-red-800/40 text-red-400 text-xs font-bold px-3 py-1 uppercase tracking-widest mb-3">
          {member.designation}
        </div>
        <p className="text-gray-500 text-xs leading-relaxed mb-4">{member.bio}</p>
      </div>

      <div className="flex justify-center">
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-blue-950/40 border border-blue-800/30 text-blue-400 hover:bg-blue-900/40 hover:border-blue-600 transition-all duration-300"
        >
          <Linkedin className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

const TeamPage = () => (
  <div className="min-h-screen bg-black text-white relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `linear-gradient(rgba(220,38,38,0.05) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(220,38,38,0.05) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <SectionLabel text="The Pit Crew" />
        <h1 className="text-7xl md:text-9xl font-black leading-none mb-4 text-white"
          style={{ fontFamily: "'Bebas Neue','Impact',sans-serif" }}>
          THE <span className="text-red-600">PIT CREW</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          The minds behind making the race happen !
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {teamMembers.map((m, i) => (
          <MemberCard key={i} member={m} />
        ))}
      </div>

      {/* Community CTA */}
      <div className="bg-gray-950 border border-gray-800 p-10 text-center mt-8">
        <Flag className="w-10 h-10 text-red-500 mx-auto mb-4" />
        <h2 className="text-3xl font-black text-white mb-3" style={{ fontFamily: "'Bebas Neue','Impact',sans-serif" }}>
          Join the Collazon Community
        </h2>
        <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
          Stay updated on future events, workshops, and opportunities organized by Collazon.
        </p>
        <a
          href="https://chat.whatsapp.com/DQz6VNmRokJ8dATie99NXw"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-bold text-xs uppercase tracking-widest transition-colors"
        >
          Join Community
        </a>
      </div>
    </div>
  </div>
);

export default TeamPage;