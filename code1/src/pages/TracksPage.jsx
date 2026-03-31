import React, { useState } from 'react';
import {
  Heart, Shield, Banknote, Building2, Leaf, DollarSign, Cpu, X, Lightbulb, Flag
} from 'lucide-react';

import img13 from '../assets/13.png';
import img14 from '../assets/14.png';
import img15 from '../assets/15.png';
import img16 from '../assets/16.png';
import img17 from '../assets/17.png';
import img18 from '../assets/18.png';
import carimg from '../assets/main_car.jpeg';
export function TracksPage() {
  const [selectedTrack, setSelectedTrack] = useState(null);

  const trackImages = [img13, img14, img15, img16, img17, img18, carimg];

  const tracks = [
    {
      id: 'IOT',
      name: 'Smart Cities / IoT',
      description: 'Build with IoT, automation, connected systems, and smart infrastructure to shape how future cities think and move.',
      icon: 'heart',
      color: 'red',
    },
    {
      id: 'CYBERSECURITY',
      name: 'CyberSecurity',
      description: 'Build cybersecurity solutions that defend data, strengthen digital trust, and secure tomorrow\'s technology.',
      icon: 'leaf',
      color: 'green',
    },
    {
      id: 'Fine',
      name: 'FinTech',
      description: 'Create smarter financial systems, payment solutions, accessibility tools, or next-gen fintech ideas that can redefine transactions.',
      icon: 'shield',
      color: 'blue',
    },
    {
      id: 'open',
      name: 'Open Innovation',
      description: 'If your idea breaks categories and still solves something meaningful, this is your lane. Bring bold thinking. Surprise the grid.',
      icon: 'dollar',
      color: 'yellow',
    },
    {
      id: 'health',
      name: 'Healthcare',
      description: 'Build solutions that can transform healthcare, improve accessibility, optimize systems, or create faster responses where every second matters.',
      icon: 'cpu',
      color: 'purple',
    },
    {
      id: 'sustainable',
      name: 'Sustainable',
      description: 'Create solutions that drive sustainability, reduce waste, improve energy efficiency, and power greener systems for tomorrow.',
      icon: 'lightbulb',
      color: 'orange',
    },
    {
      id: 'f1',
      name: 'Formula 1 Track',
      description: 'Build solutions inspired directly by Formula 1 and motorsports technology such as racing analytics, fan engagement platforms, racing simulations, performance tracking systems, and motorsport-inspired innovations.Projects built in this track will receive special priority.',
      icon: 'flag',
      color: 'red',
      isSpecial: true,
    },
  ];

  const trackDetails = {
    IOT: {
      whatYouWillBuild:
        'IoT and data-driven solutions for urban life such as traffic optimization systems, smart waste management, energy-efficient infrastructure, public safety tech, or smart governance platforms.',
      judgingCriteria: [
        'Urban Impact (25%)',
        'Integration of IoT/Data (20%)',
        'Feasibility (20%)',
        'Scalability (15%)',
        'Innovation (10%)',
        'Presentation (10%)',
      ],
    },
    CYBERSECURITY: {
      whatYouWillBuild:
        'Cybersecurity-focused solutions such as threat detection systems, privacy tools, secure authentication systems, blockchain security apps, or vulnerability analysis platforms.',
      judgingCriteria: [
        'Security Strength (25%) - How robust is it?',
        'Innovation (20%) - Unique approach to security',
        'Technical Depth (20%)',
        'Real-world Applicability (15%)',
        'Performance & Reliability (10%)',
        'Presentation (10%)',
      ],
    },
    Fine: {
      whatYouWillBuild:
        'Next-gen financial solutions like digital payment systems, DeFi apps, blockchain-based platforms, budgeting tools, lending platforms, or financial inclusion systems.',
      judgingCriteria: [
        'Innovation in Finance (25%)',
        'Usability & Trust (20%)',
        'Technical Implementation (20%)',
        'Scalability (15%)',
        'Security & Compliance Awareness (10%)',
        'Presentation (10%)',
      ],
    },
    open: {
      whatYouWillBuild:
        'Anything groundbreaking. This track encourages out-of-the-box ideas across any domain - AI, Web3, SaaS, productivity, social impact, or experimental tech.',
      judgingCriteria: [
        'Originality (30%)',
        'Innovation (20%)',
        'Execution Quality (20%)',
        'Impact Potential (15%)',
        'Technical Depth (10%)',
        'Presentation (5%)',
      ],
    },
    health: {
      whatYouWillBuild:
        'Participants will develop solutions that enhance healthcare systems and emergency response efficiency. This may include AI-powered diagnostics, real-time patient monitoring systems, ambulance optimization platforms, telemedicine innovations, or crisis-response coordination tools.',
      judgingCriteria: [
        'Impact & Usefulness (25%) - Real-world healthcare value',
        'Speed & Efficiency (20%) - Response time optimization',
        'Technical Innovation (20%) - AI/ML, data usage, system design',
        'Scalability (15%) - Can it work at city/national level?',
        'User Experience (10%) - Accessibility for patients/doctors',
        'Presentation (10%)',
      ],
    },
    sustainable: {
      whatYouWillBuild:
        'Solutions focused on sustainability, climate action, and renewable energy. Projects may include carbon tracking tools, smart energy systems, waste management platforms, green mobility solutions, or climate awareness tech.',
      judgingCriteria: [
        'Environmental Impact (25%)',
        'Innovation & Creativity (20%)',
        'Feasibility (20%) - Practical implementation',
        'Scalability (15%)',
        'Tech Stack Usage (10%)',
        'Presentation (10%)',
      ],
    },
    f1: {
      whatYouWillBuild:
        'Solutions inspired by motorsports and Formula 1 such as race analytics dashboards, telemetry systems, fan engagement platforms, simulation tools, performance optimization systems, or pit-stop strategy tools.',
      judgingCriteria: [
        'Relevance to Motorsports (25%)',
        'Innovation & Creativity (20%)',
        'Technical Complexity (20%)',
        'User Experience (15%)',
        'Performance & Real-time Capabilities (10%)',
        'Presentation (10%)',
      ],
      bonusAdvantage:
        'Projects in this track receive special priority and visibility during evaluation.',
    },
  };

  const selectedTrackDetails = selectedTrack ? trackDetails[selectedTrack.id] : null;

  const getIcon = (iconName) => {
    const icons = {
      heart: Heart,
      leaf: Leaf,
      shield: Shield,
      dollar: DollarSign,
      cpu: Cpu,
      lightbulb: Lightbulb,
      flag: Flag,
    };
    return icons[iconName];
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="racing-grid"></div>

      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
              SELECT YOUR <span className="text-red-500 glow-red">RACING TRACK</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              7 innovation tracks designed to test your speed, strategy, and skills.
              Choose your circuit and start building the future.
            </p>
            <div className="h-1 w-48 bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 mx-auto mt-8"></div>
          </div>

          {/* 6 Main Track Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {tracks.slice(0, 6).map((track, index) => {
              const Icon = getIcon(track.icon);
              return (
                <div
                  key={track.id}
                  onClick={() => setSelectedTrack(track)}
                  className="racing-card p-8 cursor-pointer group hover:scale-105 transition-all duration-300 relative overflow-hidden"
                  style={{ minHeight: '280px' }}
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-center bg-cover bg-no-repeat transition-opacity duration-300"
                    style={{
                      backgroundImage: `url(${trackImages[index]})`,
                      opacity: 1,
                    }}
                  ></div>

                  {/* Dark overlay — just enough to keep text readable */}
                  <div className="absolute inset-0 bg-black/45 group-hover:bg-black/30 transition-colors duration-300"></div>

                  {/* Decorative corner gradient */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/20 to-transparent rounded-bl-full"></div>

                  {/* Content */}
                  <div className="relative mb-6">
                    <Icon className={`w-16 h-16 text-${track.color}-500 group-hover:scale-110 transition-transform`} />
                    <div className={`absolute inset-0 bg-${track.color}-500 blur-2xl opacity-30 group-hover:opacity-60 transition-opacity`}></div>
                  </div>

                  <h3 className="relative text-2xl font-black text-white mb-3">{track.name}</h3>
                  <p className="relative text-gray-400 text-sm line-clamp-3">{track.description}</p>

                  <div className="relative mt-6 flex items-center justify-between">
                    <span className="text-red-500 font-bold text-sm">VIEW DETAILS</span>
                    <div className="w-8 h-8 rounded-full border-2 border-red-500 flex items-center justify-center group-hover:bg-red-500 transition-colors">
                      <span className="text-white text-lg">→</span>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              );
            })}
          </div>

          {/* F1 Special Track */}
          <div className="relative">
            <div
              onClick={() => setSelectedTrack(tracks[6])}
              className="racing-card p-12 cursor-pointer group hover:scale-[1.02] transition-all duration-300 relative overflow-hidden border-2 border-red-500 special-glow"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-yellow-400/5 to-blue-500/10"></div>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse"></div>

              <div className="relative flex flex-col md:flex-row items-center gap-8">
                <div className="relative">
                  <Flag className="w-24 h-24 text-red-500 animate-pulse" />
                  <div className="absolute inset-0 bg-red-500 blur-3xl opacity-50"></div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="inline-block px-4 py-1 bg-red-500/20 border border-red-500 rounded-full text-red-500 text-sm font-black mb-4">
                    SPECIAL TRACK
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black text-white mb-4 glow-red">
                    {tracks[6].name}
                  </h3>
                  <p className="text-gray-300 text-lg mb-6">{tracks[6].description}</p>
                  <div className="flex flex-wrap gap-4">
                    {['Telemetry', 'Analytics', 'Strategy', 'Innovation'].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-black border border-red-500/30 text-red-500 text-sm font-bold rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 rounded-full border-4 border-red-500 flex items-center justify-center group-hover:bg-red-500 transition-colors">
                    <span className="text-white text-3xl font-black">→</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 via-yellow-400 to-red-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedTrack && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="racing-card max-w-3xl w-full p-8 md:p-12 relative animate-slide-up">
            <button
              onClick={() => setSelectedTrack(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center hover:bg-red-500 transition-colors group"
            >
              <X className="w-5 h-5 text-red-500 group-hover:text-white" />
            </button>

            <div className="mb-8">
              <div className="relative inline-block mb-6">
                {(() => {
                  const Icon = getIcon(selectedTrack.icon);
                  return <Icon className={`w-20 h-20 text-${selectedTrack.color}-500`} />;
                })()}
                <div className={`absolute inset-0 bg-${selectedTrack.color}-500 blur-3xl opacity-50`}></div>
              </div>

              {selectedTrack.isSpecial && (
                <div className="inline-block px-4 py-1 bg-red-500/20 border border-red-500 rounded-full text-red-500 text-sm font-black mb-4">
                  SPECIAL TRACK
                </div>
              )}

              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                {selectedTrack.name}
              </h2>

              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {selectedTrack.description}
              </p>

              <div className="space-y-4">
                <div className="racing-card p-6 bg-black/50">
                  <h3 className="text-xl font-black text-red-500 mb-3">WHAT YOU'LL BUILD</h3>
                  <p className="text-gray-400">
                    {selectedTrackDetails?.whatYouWillBuild}
                  </p>
                </div>

                <div className="racing-card p-6 bg-black/50">
                  <h3 className="text-xl font-black text-yellow-400 mb-3">JUDGING CRITERIA</h3>
                  <ul className="text-gray-400 space-y-2">
                    {selectedTrackDetails?.judgingCriteria.map((criterion) => (
                      <li key={criterion}>• {criterion}</li>
                    ))}
                  </ul>
                </div>

                {selectedTrackDetails?.bonusAdvantage && (
                  <div className="racing-card p-6 bg-red-950/20 border border-red-500/35">
                    <h3 className="text-xl font-black text-red-400 mb-3">BONUS ADVANTAGE</h3>
                    <p className="text-gray-300">{selectedTrackDetails.bonusAdvantage}</p>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setSelectedTrack(null)}
              className="w-full py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-black text-lg rounded-lg hover:scale-105 transition-transform"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}