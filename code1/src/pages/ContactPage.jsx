import React, { useState } from 'react';
import { Mail, MessageCircle, Instagram, Send, User, MessageSquare } from 'lucide-react';

const SectionLabel = ({ text }) => (
  <div className="flex items-center gap-3 mb-3">
    <div className="h-px flex-1 bg-red-800/40" />
    <span className="text-red-500 text-xl font-bold uppercase tracking-widest">{text}</span>
    <div className="h-px flex-1 bg-red-800/40" />
  </div>
);

const contactMethods = [
  {
    icon: <MessageCircle className="w-7 h-7" />,
    title: 'Hackathon Group',
    desc: 'Join for all updates, submissions & schedules',
    label: 'Join WhatsApp Group',
    accent: '#22c55e',
    href: 'https://chat.whatsapp.com/KkSVnMzqsVD9ch2P9dGbdS',
  },
  {
    icon: <MessageCircle className="w-7 h-7" />,
    title: 'Collazon Community',
    desc: 'Future events, workshops and opportunities',
    label: 'Join Community',
    accent: '#22c55e',
    href: 'https://chat.whatsapp.com/DQz6VNmRokJ8dATie99NXw',
  },
  {
    icon: <Instagram className="w-7 h-7" />,
    title: 'Instagram',
    desc: 'Follow for updates and announcements',
    label: '@the_collazon',
    accent: '#ec4899',
    href: 'https://instagram.com/the_collazon',
  },
  {
    icon: <Mail className="w-7 h-7" />,
    title: 'Email',
    desc: 'For general queries and partnerships',
    label: 'collazon.official@gmail.com',
    accent: '#3b82f6',
    href: 'mailto:collazon.official@gmail.com',
  },
];

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setForm({ name: '', email: '', subject: '', message: '' });
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

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
          <SectionLabel text="Get in Touch" />
          <h1 className="text-7xl md:text-9xl font-black leading-none mb-4 text-white"
            style={{ fontFamily: "'Bebas Neue','Impact',sans-serif" }}>
            CON<span className="text-red-600">TACT</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Questions before the race starts? We're in the pit lane, ready to help.
          </p>
        </div>

        <div className="flex flex-col items-center mb-12">
          {/* Contact Methods */}
          <div className="space-y-4 max-w-xl w-full mx-auto">
            <h2 className="text-2xl font-black text-white mb-6"
              style={{ fontFamily: "'Bebas Neue','Impact',sans-serif" }}>
              Connect With Us
            </h2>
            {contactMethods.map((m, i) => (
              <a
                key={i}
                href={m.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 bg-gray-950 border border-gray-800 hover:border-red-700/50 p-5 transition-all duration-300 group"
              >
                <div className="p-3 flex-shrink-0 transition-transform group-hover:scale-110" style={{ color: m.accent }}>
                  {m.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">{m.title}</h3>
                  <p className="text-gray-500 text-xs mb-0.5">{m.desc}</p>
                  <span className="text-xs font-bold" style={{ color: m.accent }}>{m.label}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;