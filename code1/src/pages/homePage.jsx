import React, { useState, useEffect } from 'react';
import { ChevronRight, MapPin, Calendar, Flag, Minus, Plus, Timer, Users, Zap, Trophy, Gauge } from 'lucide-react';
import Navbar from '../components/navBar';

// Asset imports
import car1 from '../assets/car1.png';
import car2 from '../assets/car2.png';
import car3 from '../assets/car3.png';
import CollazonLogo from '../assets/Collazon.png';

// ✅ FIXED: Sponsor images imported properly so Vite bundles them correctly
import unstopLogo from '../assets/Unstop.jpg';
import xyzLogo from '../assets/xyz.webp';
import digimationLogo from '../assets/digimationflight.jpg';
import uptoSkillsLogo from '../assets/UptoSkills.webp';
import edubukLogo from '../assets/edubuklogo.png';

// ✅ FIXED: mainbg.mp4 removed from assets import.
// Move mainbg.mp4 into your /public folder and reference it as '/mainbg.mp4' below.

export default function HomePage({ onNavigate }) {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [openFaq, setOpenFaq] = useState(0);
  const [activeInnovationCard, setActiveInnovationCard] = useState(0);

  const timerDisplay = [countdown.days, countdown.hours, countdown.minutes, countdown.seconds]
    .map((value) => String(value).padStart(2, '0'))
    .join(':');

  const locationEmbedUrl =
    'https://www.google.com/maps?q=Dr.%20Akhilesh%20Das%20Gupta%20Institute%20of%20Professional%20Studies&output=embed';
  const locationDirectUrl =
    'https://www.google.com/maps/search/?api=1&query=Dr.+Akhilesh+Das+Gupta+Institute+of+Professional+Studies';

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const innovationCards = [
    {
      icon: Timer,
      statTag: 'COLLAZON // STATS_01',
      value: '8',
      label: 'HOURS OF HACKING',
      color: 'red',
      carImage: car1,
    },
    {
      icon: Users,
      statTag: 'COLLAZON // STATS_02',
      value: '40+',
      label: 'TEAMS IN HACKATHON',
      color: 'yellow',
      carImage: car2,
    },
    {
      icon: Trophy,
      statTag: 'COLLAZON // STATS_03',
      value: '50K+',
      label: 'PRIZE POOL',
      color: 'blue',
      carImage: car3,
    },
  ];

  useEffect(() => {
    const targetDate = new Date('2026-04-10T09:00:00').getTime();
    let timeoutId;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return true;
      }

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });

      return false;
    };

    const scheduleNextTick = () => {
      const msUntilNextSecond = 1000 - (Date.now() % 1000);
      timeoutId = setTimeout(tick, msUntilNextSecond);
    };

    const tick = () => {
      const isFinished = updateCountdown();
      if (!isFinished) {
        scheduleNextTick();
      }
    };

    tick();

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const rotationId = setInterval(() => {
      setActiveInnovationCard((prev) => (prev + 1) % innovationCards.length);
    }, 2500);

    return () => clearInterval(rotationId);
  }, [innovationCards.length]);

  return (
    <div className="min-h-screen">
      <div className="racing-grid"></div>

      {/* ── HERO SECTION ── */}
      <section className="relative min-h-screen overflow-hidden border-b border-red-500/20">

        {/* ✅ FIXED: Video src now points to /public/mainbg.mp4 — no import needed.
            Make sure you move mainbg.mp4 from src/assets/ into the /public folder. */}
        <video
          autoPlay
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ filter: 'brightness(0.45) saturate(1.2)' }}
        >
          <source src="/mainbg.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_20%_35%,rgba(239,68,68,0.18),transparent_40%),radial-gradient(circle_at_78%_50%,rgba(14,116,144,0.15),transparent_40%),linear-gradient(to_bottom,rgba(7,9,15,0.3)_0%,rgba(7,9,15,0.1)_40%,rgba(7,9,15,0.7)_80%,rgba(7,9,15,1)_100%)]"></div>

        {/* Speed lines */}
        <div className="speed-lines opacity-40 absolute inset-0 z-[2]"></div>

        {/* Foreground */}
        <div className="relative z-10 min-h-screen flex flex-col">

          {/* CODE1 — flex item, sits above timer */}
          <div className="flex-1 flex justify-center items-center pt-20 pb-4 pointer-events-none">
            <h1
              className="font-black leading-none select-none text-center"
              style={{
                fontSize: 'clamp(4rem, 17vw, 16rem)',
                color: 'rgba(255,255,255,0.92)',
                WebkitTextStroke: '3px rgba(239,68,68,0.7)',
                textShadow:
                  '0 0 40px rgba(239,68,68,0.9), 0 0 100px rgba(239,68,68,0.5), 0 0 180px rgba(239,68,68,0.25), 0 4px 30px rgba(0,0,0,0.8)',
                letterSpacing: '0.06em',
                paintOrder: 'stroke fill',
              }}
            >
              CODE1
            </h1>
          </div>

          {/* Timer card + date bar — sits in the bottom 32% of the hero */}
          <div className="mt-auto w-full px-4 sm:px-6 lg:px-0 md:pb-30">
            <div className="max-w-7xl mx-auto">

              {/* Timer card — right-aligned on md+, centred on mobile */}
              <div className="flex justify-center md:justify-end mb-4 md:mb-5">
                <div
                  className="w-full rounded-2xl overflow-hidden border border-red-500/40 shadow-[0_0_60px_rgba(239,68,68,0.18)] bg-gradient-to-br from-[#0a0000]/90 via-[#0d0000]/90 to-black/90 backdrop-blur-sm"
                  style={{ maxWidth: 'min(520px, 100%)' }}
                >
                  {/* top bar */}
                  <div className="flex items-center justify-between px-4 sm:px-5 py-2 bg-red-950/40 border-b border-red-500/25">
                    <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] text-red-400 font-bold">CODE1 //</span>
                    <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] text-red-500 font-bold">F1 MODE</span>
                  </div>

                  {/* big timer */}
                  <div className="px-4 sm:px-5 pt-3 sm:pt-4 pb-1">
                    <div
                      data-text={timerDisplay}
                      className="glitch font-mono text-red-500 font-bold tracking-widest"
                      style={{
                        fontSize: 'clamp(1.8rem, 7vw, 3.5rem)',
                        textShadow: '0 0 18px rgba(239,68,68,0.7), 0 0 40px rgba(239,68,68,0.3)',
                      }}
                    >
                      {timerDisplay}
                    </div>
                    <div className="mt-1 font-mono text-[9px] sm:text-[10px] text-gray-600 tracking-[0.15em] flex justify-between">
                      <span>DD : HH : MM : SS</span>
                      <span className="text-gray-500">10 APR 2026 &bull; 09:00</span>
                    </div>
                  </div>

                  {/* scan line */}
                  <div className="relative mx-4 sm:mx-5 my-2 sm:my-3 h-[2px] bg-red-950/40 overflow-hidden rounded-full">
                    <div className="race-scan-line absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full"></div>
                  </div>

                  {/* terminal + geo */}
                  <div className="px-4 sm:px-5 pb-3 flex justify-between items-start gap-2 sm:gap-4">
                    <div className="font-mono text-[10px] sm:text-[11px] leading-5 sm:leading-6 text-gray-500 space-y-0.5 min-w-0 flex-1">
                      <div className="truncate">
                        <span className="text-green-500">SYS</span>{' '}
                        <span className="text-gray-400">INITIALIZING SECURE LINK...</span>
                        <span className="terminal-cursor"></span>
                      </div>
                      <div className="truncate">
                        <span className="text-yellow-500">SYS</span>{' '}
                        <span className="text-gray-400">BYPASS PROTOCOL: CODE1</span>
                      </div>
                      <div>
                        <span className="text-red-400 text-[11px] sm:text-[12px]">TARGET:</span>{' '}
                        <span className="text-red-400 text-[11px] sm:text-[12px] font-bold tracking-wide">ADGIPS_DELHI_01</span>
                      </div>
                    </div>
                    <div className="font-mono text-[9px] sm:text-[10px] leading-5 text-right text-gray-500 space-y-0.5 flex-shrink-0">
                      <div><span className="text-gray-600">LAT:</span> <span className="text-gray-300">28.6784698°N</span></div>
                      <div><span className="text-gray-600">LON:</span> <span className="text-gray-300">77.2634409°E</span></div>
                    </div>
                  </div>

                  {/* bottom bar */}
                  <div className="mt-1 px-4 sm:px-5 py-2 bg-red-950/30 border-t border-red-500/20 font-mono text-[9px] sm:text-[10px] tracking-widest flex justify-between">
                    <span className="text-red-500/60">SECURE LINK ACTIVE</span>
                    <span className="text-red-500/60">COLLAZON © 2026</span>
                  </div>
                </div>
              </div>

              {/* Date bar */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-stretch sm:items-center">
                <div className="px-6 sm:px-8 py-3 bg-red-600 text-white text-base sm:text-lg font-black tracking-[0.15em] text-center -skew-x-6 flex-shrink-0">
                  <span className="inline-block skew-x-6">10 APRIL</span>
                </div>
                <div className="px-4 sm:px-8 py-3 bg-white text-black text-xs sm:text-sm lg:text-lg font-black tracking-[0.04em] sm:tracking-[0.08em] text-center -skew-x-3 flex-1">
                  <span className="inline-block skew-x-3">8 HOURS IN-PERSON HACKATHON AT DR. AKHILESH DAS GUPTA INSTITUTE OF PROFESSIONAL STUDIES</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-black via-black/80 to-transparent z-[3]"></div>
      </section>

      {/* ── INNOVATION SECTION ── */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-[1450px] mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
              INNOVATION AT <span className="text-red-500">MAXIMUM SPEED</span>
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
            <div className="racing-card p-6 sm:p-8 md:p-12 text-left flex flex-col justify-center">
              <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed mb-5 sm:mb-7">
                At Collazon, we engineer experiences that go beyond traditional hackathons. CODE 1 is built to simulate real-world pressure, where speed, adaptability, and execution define success. This is where ideas are not just discussed - they are built, tested, and pushed to their limits in record time.
              </p>
              <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed">
                With a focus on rapid innovation and high-performance collaboration, participants step into an environment where every moment counts. It's not just about what you build, but how fast and how well you deliver when it matters most.
              </p>
            </div>

            {/* Carousel */}
            <div className="w-full flex flex-col gap-4">
              <div className="overflow-hidden w-full rounded-xl">
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${activeInnovationCard * 100}%)` }}
                >
                  {innovationCards.map((item) => (
                    <div
                      key={item.statTag}
                      className="racing-card flex-shrink-0 w-full overflow-hidden"
                      style={{ minWidth: '100%' }}
                    >
                      {/* Card header */}
                      <div className="flex items-center justify-between px-5 sm:px-8 pt-5 sm:pt-6 pb-2 font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-gray-500">
                        <span>{item.statTag}</span>
                        <span className="text-red-500 flex items-center gap-1">
                          F1
                          <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        </span>
                      </div>

                      {/* Car image */}
                      <div className="relative w-full" style={{ height: 'clamp(130px, 22vw, 220px)' }}>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0d0d14]"></div>
                        <div className="absolute inset-x-0 bottom-0 h-16" style={{ background: 'linear-gradient(to top, rgba(13,13,20,1) 0%, transparent 100%)' }}></div>
                        <img
                          src={item.carImage}
                          alt={item.label}
                          className="w-full h-full object-contain"
                          style={{ filter: 'drop-shadow(0 10px 40px rgba(239,68,68,0.35)) saturate(1.2)' }}
                        />
                      </div>

                      {/* Stats */}
                      <div className="text-center px-5 sm:px-8 pb-5 sm:pb-6 pt-2">
                        <div
                          className="font-black text-red-500 tracking-[0.04em] leading-none"
                          style={{ fontSize: 'clamp(2.5rem, 9vw, 5rem)', textShadow: '0 0 24px rgba(239,68,68,0.5)' }}
                        >
                          {item.value}
                        </div>
                        <div
                          className="mt-2 sm:mt-3 text-white font-black tracking-[0.08em] uppercase"
                          style={{ fontSize: 'clamp(1rem, 3.5vw, 1.75rem)' }}
                        >
                          {item.label}
                        </div>
                      </div>

                      {/* Telemetry footer */}
                      <div className="px-5 sm:px-8 py-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-1 font-mono text-[9px] sm:text-[11px] tracking-[0.09em] uppercase text-gray-500 bg-black/30">
                        <span>STATUS: <span className="text-red-500">SECURE_LINK</span></span>
                        <span>TELEMETRY: <span className="text-red-500">LIVE</span></span>
                        <span>TARGET: <span className="text-gray-300">VERIFIED</span></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel controls */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setActiveInnovationCard((prev) => (prev - 1 + innovationCards.length) % innovationCards.length)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-red-500/50 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors text-base sm:text-lg font-black"
                >←</button>
                {innovationCards.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveInnovationCard(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${idx === activeInnovationCard ? 'w-8 bg-red-500' : 'w-2 bg-gray-600 hover:bg-gray-400'}`}
                  />
                ))}
                <button
                  onClick={() => setActiveInnovationCard((prev) => (prev + 1) % innovationCards.length)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-red-500/50 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors text-base sm:text-lg font-black"
                >→</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRACKS ── */}
      <section className="relative py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-black via-red-950/10 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6">
            CHOOSE YOUR <span className="text-yellow-400">RACING CIRCUIT</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mb-8 sm:mb-12">
            6 innovation tracks + 1 special Formula 1 challenge.<br /> Pick your lane.
          </p>
          <button
            onClick={() => {
              if (typeof onNavigate === 'function') {
                onNavigate('tracks');
              }
              window.location.hash = '#tracks';
            }}
            className="relative px-10 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-black text-xl rounded-lg hover:scale-105 transition-transform group"
          >
            <span className="relative z-10">VIEW ALL TRACKS</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity rounded-lg"></div>
          </button>
        </div>
      </section>

      {/* ── ORGANISED BY ── */}
      <section className="relative py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-6 sm:mb-8">
            ORGANISED BY
          </h2>
          <div className="racing-card p-8 sm:p-12 inline-flex flex-col items-center justify-center">
            <img
              src={CollazonLogo}
              alt="Collazon"
              className="max-h-32 sm:max-h-44 max-w-[200px] sm:max-w-sm object-contain"
              style={{ filter: 'drop-shadow(0 0 20px rgba(239,68,68,0.5))' }}
            />
            <p className="text-gray-200 text-lg sm:text-xl mt-2">Collazon</p>
          </div>
        </div>
      </section>

      {/* ── SPONSORS ── */}
      <section id="sponsors" className="relative px-4 sm:px-6 pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-[0.12em] mb-4">
              OUR SPONSORS
            </h2>
            <p className="text-red-500 font-black tracking-[0.35em] text-sm md:text-base uppercase">
              Backing the builders on the grid
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
            {[
              { src: unstopLogo,    alt: 'Unstop',            name: 'UNSTOP'            },
              { src: xyzLogo,       alt: '.xyz',              name: '.XYZ'              },
              { src: digimationLogo,alt: 'Digimation Flight', name: 'DIGIMATION FLIGHT' },
              { src: uptoSkillsLogo,alt: 'UptoSkills',        name: 'UPTOSKILLS'        },
              { src: edubukLogo,    alt: 'Edubuk',            name: 'EDUBUK'            },
            ].map((s) => (
              <div key={s.name} className="racing-card min-h-[160px] sm:min-h-[180px] px-6 sm:px-8 py-6 sm:py-8 flex flex-col items-center justify-center text-center bg-black/70 border border-white/10">
                <img src={s.src} alt={s.alt} className="h-24 sm:h-32 w-40 sm:w-48 object-contain mb-3 sm:mb-4" />
                <div className="text-white font-black text-base sm:text-xl tracking-[0.2em] uppercase">{s.name}</div>
              </div>
            ))}
            <div className="racing-card min-h-[160px] sm:min-h-[180px] px-6 sm:px-8 py-8 sm:py-10 flex flex-col items-center justify-center text-center bg-black/70 border border-white/5">
              <div className="text-white/30 text-xl sm:text-3xl font-black tracking-[0.2em] uppercase">Coming Soon</div>
              <div className="w-10 h-1 bg-red-600 mt-4 sm:mt-5"></div>
            </div>
          </div>

          <div className="text-center">
            <a
              href="https://forms.gle/1eX8oFssLFEe3itg6"
              target="_blank"
              rel="noreferrer"
              className="inline-block px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-red-700 to-red-500 text-white font-black text-base sm:text-lg rounded-lg hover:scale-105 transition-transform"
            >
              BECOME A SPONSOR
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative px-4 sm:px-6 pt-12 sm:pt-16 pb-10 sm:pb-12 border-t border-red-500/20 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1.6fr]">

            <div>
              <div className="text-red-500 text-xs font-black tracking-[0.22em] uppercase mb-3 sm:mb-4">Collazon Network</div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-[0.08em] text-white leading-tight">COLLAZON</h3>
              <p className="mt-4 sm:mt-5 text-gray-400 text-sm sm:text-base leading-relaxed max-w-sm">
                A high-adrenaline hackathon pushing builders to the limit. No comfort zone. Just code.
              </p>
              <div className="mt-5 sm:mt-6 flex items-center gap-4 flex-wrap">
                <a
                  href="https://www.linkedin.com/company/the-collazon/posts/?feedView=all"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors font-bold tracking-wide text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
                <a
                  href="https://unstop.com/hackathons/code-1-dr-akhilesh-das-gupta-institute-of-professional-studies-1655695"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors font-bold tracking-wide text-sm"
                >
                  <img src={unstopLogo} alt="Unstop" className="w-5 h-5 object-contain rounded-sm" />
                  Unstop
                </a>
              </div>
            </div>

            <div>
              <div className="text-white text-xs font-black tracking-[0.2em] uppercase mb-4 sm:mb-5">Waypoints</div>
              <div className="space-y-2 sm:space-y-3">
                {['homePage', 'About', 'Tracks', 'Register', 'Community'].map((item) =>
                  item === 'Register' ? (
                    <a
                      key={item}
                      href="https://unstop.com/hackathons/code-1-dr-akhilesh-das-gupta-institute-of-professional-studies-1655695"
                      target="_blank"
                      rel="noreferrer"
                      className="block text-left text-gray-300 hover:text-red-400 transition-colors font-bold tracking-wide uppercase text-sm"
                    >
                      {item}
                    </a>
                  ) : (
                    <button
                      key={item}
                      onClick={() => onNavigate(item.toLowerCase())}
                      className="block text-left text-gray-300 hover:text-red-400 transition-colors font-bold tracking-wide uppercase text-sm"
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            </div>

            <div>
              <div className="text-white text-xs font-black tracking-[0.2em] uppercase mb-4 sm:mb-5">Race Ctrl</div>
              <div className="space-y-2 sm:space-y-3 font-bold tracking-wide uppercase text-sm">
                <button type="button" onClick={() => scrollToSection('sponsors')} className="block text-gray-400 hover:text-red-400 transition-colors">
                  Partners
                </button>
                <button type="button" onClick={() => scrollToSection('faq')} className="block text-gray-400 hover:text-red-400 transition-colors">
                  Telemetry
                </button>
              </div>
            </div>

            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between mb-3">
                <div className="text-white text-xs font-black tracking-[0.2em] uppercase">Circuit // Location</div>
                <a
                  href={locationDirectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-red-500 text-[10px] font-black tracking-[0.2em] uppercase hover:text-red-400"
                >
                  Live Tracking
                </a>
              </div>
              <div className="border border-red-500/40 bg-[#0b0b0b] p-1">
                <iframe
                  src={locationEmbedUrl}
                  className="w-full h-36 sm:h-44"
                  title="Hackathon Location Map"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="mt-10 sm:mt-12 h-px bg-gradient-to-r from-transparent via-red-500/70 to-transparent"></div>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="text-white text-3xl sm:text-4xl font-black tracking-tight">Collazon</div>
            <p className="text-gray-500 text-xs sm:text-sm font-semibold tracking-[0.12em] uppercase">
              © 2026 CODE 1 Hackathon • Powered by Collazon
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}