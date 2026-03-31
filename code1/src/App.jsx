import './App.css';
import React, { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navBar";
import Homepage from './pages/homePage';
import AboutPage from './pages/AboutPage';
import Rounds from './pages/Rounds';
import { TracksPage } from './pages/TracksPage';
import TimeLine from './pages/TimeLinePage';
import PrizesPage from './pages/PrizePage';
import FAQ from './pages/FAQpage';
import Team from './pages/OurTeamPage';
import ContactPage from "./pages/ContactPage";
import ResultsPage from "./pages/Results"; 

// ⭐ StarBackground stays SAME
const StarBackground = () => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const animationIdRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 0.5;
        this.twinkleSpeed = Math.random() * 0.05 + 0.01;
        this.brightness = Math.random();
        this.twinklePhase = Math.random() * Math.PI * 2;
        this.color = this.getStarColor();
      }
      getStarColor() {
        const colors = [
          'rgba(255, 255, 255, ',
          'rgba(255, 248, 220, ',
          'rgba(176, 196, 222, ',
          'rgba(255, 182, 193, ',
          'rgba(255, 255, 224, ',
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        this.twinklePhase += this.twinkleSpeed;
        this.brightness = (Math.sin(this.twinklePhase) + 1) / 2 * 0.8 + 0.2;
      }
      draw() {
        const alpha = this.brightness;
        ctx.fillStyle = this.color + alpha + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStars = () => {
      starsRef.current = [];
      const numStars = Math.floor((canvas.width * canvas.height) / 8000);
      const starCount = Math.max(100, Math.min(500, numStars));
      for (let i = 0; i < starCount; i++) {
        starsRef.current.push(new Star());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      starsRef.current.forEach(star => {
        star.update();
        star.draw();
      });
      animationIdRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resizeCanvas();
      createStars();
    };

    resizeCanvas();
    createStars();
    animate();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationIdRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

// 🔥 HOME PAGE (your current layout)
const HomePageLayout = () => (
  <div className="relative">
    <div id="home"><Homepage /></div>
    <div id="about"><AboutPage /></div>
    <div id="rounds"><Rounds /></div>
    <div id="tracks"><TracksPage /></div>
    <div id="timeline"><TimeLine /></div>
    <div id="prizes"><PrizesPage /></div>
    <div id="faq"><FAQ /></div>
    <div id="team"><Team /></div>
    <div id="contact"><ContactPage /></div>
  </div>
);

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <Router> <Navbar/>
      <div className="relative min-h-screen bg-black">
        <StarBackground />

        <div className="relative">
          <Routes>
            <Route path="/" element={<HomePageLayout />} />
            <Route path="/results" element={<ResultsPage />} /> {/* ✅ */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;