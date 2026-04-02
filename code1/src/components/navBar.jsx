import React, { useState, useEffect } from 'react';
import { Menu, X, Flag, Trophy } from 'lucide-react';
import { Link } from "react-router-dom";

/* ═══════════════════════════════════════════════════════════════
   F1 CAR CURSOR
═══════════════════════════════════════════════════════════════ */
const F1_CURSOR_SVG = `
<svg xmlns='http://www.w3.org/2000/svg' width='52' height='24' viewBox='0 0 52 24'>
  <ellipse cx='28' cy='22' rx='18' ry='2.5' fill='rgba(0,0,0,0.25)'/>
  <circle cx='12' cy='17' r='5.5' fill='%23111' stroke='%23dc2626' stroke-width='1.8'/>
  <circle cx='12' cy='17' r='2.5' fill='%231a1a1a'/>
  <circle cx='40' cy='18' r='4.2' fill='%23111' stroke='%23dc2626' stroke-width='1.5'/>
  <circle cx='40' cy='18' r='1.8' fill='%231a1a1a'/>
  <rect x='2' y='7' width='9' height='2.5' rx='0.5' fill='%23dc2626'/>
  <rect x='4' y='9.5' width='1.5' height='5' fill='%23444'/>
  <rect x='8' y='9.5' width='1.5' height='5' fill='%23444'/>
  <path d='M10 15 Q13 8 20 6.5 L32 5.5 Q40 4.8 43 8 L46 11 Q47.5 13.5 44.5 15.5 L38 17 Q28 18.5 22 18 Z' fill='%231a1a1a'/>
  <path d='M19 7 Q27 5.5 36 6.5 L40 8.5 Q33 7 26 6.5 Q21 6.5 19 7Z' fill='%23dc2626' opacity='0.9'/>
  <path d='M26 7 Q29 4 32 4 Q35 4 37 7 L35 7.5 Q33.5 5.5 31 5.5 Q28.5 5.5 27.5 7Z' fill='%23333'/>
  <ellipse cx='31' cy='7' rx='4' ry='2' fill='%23080808'/>
  <path d='M43 15.5 L50 14 L51 16 L43 17.5Z' fill='%23111' stroke='%23dc2626' stroke-width='0.8'/>
  <ellipse cx='8' cy='13.5' rx='3' ry='1.5' fill='%23dc2626' opacity='0.7'/>
  <ellipse cx='4.5' cy='13.5' rx='2' ry='1' fill='%23ff8800' opacity='0.45'/>
  <line x1='0' y1='10' x2='6' y2='10' stroke='%23dc2626' stroke-width='1.2' opacity='0.5'/>
  <line x1='0' y1='12.5' x2='5' y2='12.5' stroke='%23dc2626' stroke-width='0.9' opacity='0.35'/>
  <line x1='0' y1='15' x2='4' y2='15' stroke='%23dc2626' stroke-width='0.7' opacity='0.2'/>
</svg>`;

const CURSOR_URI = `url("data:image/svg+xml,${F1_CURSOR_SVG.replace(/\n\s*/g, ' ').trim()}") 6 12, pointer`;

/* ═══════════════════════════════════════════════════════════════
   NAVBAR
   Props:
     onNavigate(page) — optional, called when logo or nav links clicked
                        so the parent App can switch pages.
                        If not provided, falls back to hash/scroll behaviour.
═══════════════════════════════════════════════════════════════ */
const Navbar = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Map each nav link to:
       path  — hash fallback (scroll within page)
       page  — onNavigate key (for SPA page switching)         */
  const navLinks = [
    { name: 'About',    path: '#about',    page: 'about'    },
    { name: 'Tracks',   path: '#tracks',   page: 'tracks'   },
    { name: 'Rounds',   path: '#rounds',   page: 'rounds'   },
    { name: 'Timeline', path: '#timeline', page: 'timeline' },
    { name: 'Prizes',   path: '#prizes',   page: 'prizes'   },
    { name: 'FAQ',      path: '#faq',      page: 'faq'      },
    { name: 'Team',     path: '#team',     page: 'team'     },
    { name: 'Contact',  path: '#contact',  page: 'contact'  },
  ];

  /* Click handler for logo — go to homepage */
  const handleLogoClick = () => {
    setIsMenuOpen(false);
    if (typeof onNavigate === 'function') {
      onNavigate('homepage');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  /* Click handler for nav links */
  const handleNavClick = (e, link) => {
    setIsMenuOpen(false);
    if (typeof onNavigate === 'function') {
      e.preventDefault();
      onNavigate(link.page);
    }
    // else fall through to normal <a href="#..."> scroll behaviour
  };

  return (
    <nav
      className={`fixed w-screen top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/95 backdrop-blur-md border-b border-red-600/40 shadow-lg shadow-red-900/20'
          : 'bg-transparent'
      }`}
    >
      {/* Racing stripe top */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-red-600 to-transparent" />

      <div className="w-full px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 w-full">

          {/* ── Logo → Home ── */}
          <button
  type="button"
  onClick={handleLogoClick}
  className="flex items-center flex-shrink-0 group bg-transparent border-0 p-0"
  style={{ cursor: CURSOR_URI }}
  aria-label="Go to home page"
>
  <img
    src="/src/assets/code1.png"
    alt="CODE1 Logo"
    className="h-10 w-auto object-contain group-hover:opacity-80 transition-opacity duration-300"
  />
</button>

          {/* ── Desktop nav links ── */}
          <div className="hidden lg:flex flex-1 justify-center px-4">
            <div className="flex items-baseline space-x-1 xl:space-x-2">
              {navLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.path}
                  onClick={(e) => handleNavClick(e, link)}
                  className="relative text-gray-400 hover:text-white px-3 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 group"
                  style={{ cursor: CURSOR_URI }}
                >
                  <span className="relative z-10">{link.name}</span>
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-red-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Desktop CTAs ── */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">

            {/* Register */}
            <a
              href="https://unstop.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden bg-red-600 hover:bg-red-700 text-white px-5 py-2 font-black text-xs uppercase tracking-widest transition-all duration-300 hover:shadow-md hover:shadow-red-600/40"
              style={{
                clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)',
                cursor: CURSOR_URI,
              }}
            >
              Register Now
            </a>

            {/* Results — gold */}
            <Link
              to="/results"
              className="relative overflow-hidden flex items-center gap-1.5 text-xs font-black uppercase tracking-widest px-5 py-2 transition-all duration-300 group"
              style={{
                clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)',
                background: 'linear-gradient(135deg,#92400e,#b45309)',
                color: '#fde68a',
                boxShadow: '0 0 12px rgba(234,179,8,0.25)',
                cursor: CURSOR_URI,
              }}
            >
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'linear-gradient(90deg,transparent,rgba(253,230,138,0.15),transparent)' }}
              />
              <Trophy className="w-3.5 h-3.5 relative z-10" />
              <span className="relative z-10">Results</span>
              <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            </Link>
          </div>

          {/* ── Mobile hamburger ── */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-red-400 p-2 transition-colors"
              style={{ cursor: CURSOR_URI }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {isMenuOpen && (
        <div className="lg:hidden bg-black/98 backdrop-blur-lg border-t border-red-900/40">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={link.path}
                onClick={(e) => handleNavClick(e, link)}
                className="block text-gray-300 hover:text-red-400 px-3 py-3 text-sm font-bold uppercase tracking-widest border-b border-gray-900 transition-colors"
                style={{ cursor: CURSOR_URI }}
              >
                {link.name}
              </a>
            ))}

            {/* Mobile Register */}
            <a
              href="https://unstop.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-3 font-black uppercase tracking-widest text-center transition-colors"
              style={{ cursor: CURSOR_URI }}
              onClick={() => setIsMenuOpen(false)}
            >
              Register Now
            </a>

            {/* Mobile Results */}
            <a
              href="#results"
              className="block w-full mt-2 font-black uppercase tracking-widest text-center px-6 py-3 border border-yellow-700/60 flex items-center justify-center gap-2 transition-all hover:bg-yellow-900/20"
              style={{
                background: 'rgba(120,53,15,0.3)',
                color: '#fde68a',
                cursor: CURSOR_URI,
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              <Trophy className="w-4 h-4" />
              Race Results
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;