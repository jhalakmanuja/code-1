import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Shield, Zap } from 'lucide-react';

const SectionLabel = ({ text }) => (
  <div className="flex items-center gap-3 mb-3">
    <div className="h-px flex-1 bg-red-800/40" />
    <span className="text-red-500 text-xs font-bold uppercase tracking-widest">{text}</span>
    <div className="h-px flex-1 bg-red-800/40" />
  </div>
);

const faqs = [
  {
    q: 'What is CODE 1?',
    a: 'CODE 1 is a high-energy, Formula 1-inspired innovation hackathon organized by Collazon. It challenges participants to build impactful tech solutions through 3 race stages: Qualifying Lap (PPT submission), Strategy Lap (online shortlisting), and the Final Race (offline hackathon on 10 April 2026).',
  },
  {
    q: 'Who can participate?',
    a: 'CODE 1 is open to students from all streams — Engineering, Postgraduate, Undergraduate, and Arts/Commerce/Sciences. Women participation is highly encouraged to promote diversity in tech innovation.',
  },
  {
    q: 'What is the team size?',
    a: 'Teams must have 2 to 4 members. You can also register as an individual and be matched with others or form a team later.',
  },
  {
    q: 'Is there a registration fee?',
    a: 'Registration is done on Unstop. Check the Unstop listing for any fees or free registration details.',
  },
  {
    q: 'What do I need to submit for the Qualifying Lap?',
    a: 'A PPT proposal describing your idea, the problem statement, and your solution approach. The submission deadline is 31 March 2026.',
  },
  {
    q: 'What are the 7 racing tracks?',
    a: 'Rapid Response Racing (Healthcare), Sustainable Speed Circuit (Climate), Firewall Grand Prix (Cybersecurity), FinTech Fast Lane (Finance), Smart City Speedway (IoT/Urban), Wildcard Innovation Lap (Open), and the Formula 1 Track (Motorsport — gets special priority).',
  },
  {
    q: 'Where is the Final Race held?',
    a: 'The Final Race — Offline Hackathon — is held at Dr. Akhilesh Das Gupta Institute of Professional Studies, East Delhi, India on 10 April 2026 from 10:00 AM to 5:00 PM.',
  },
  {
    q: 'What happens on the Final Race day?',
    a: 'Finalist teams build working prototypes, collaborate with mentors in pit stops, and refine their solutions over the day. Teams then present to a judging panel, followed by the winner announcement and prize ceremony.',
  },
  {
    q: 'How will projects be evaluated?',
    a: 'Projects are judged on innovation, technical implementation, feasibility, user experience, business value, and presentation quality.',
  },
  {
    q: 'What should I bring to the final?',
    a: 'Bring your laptop, chargers, any necessary hardware, a valid ID, and a lot of energy. WiFi and workspace will be provided at the venue.',
  },
  {
    q: 'How do I stay updated?',
    a: 'Join the official CODE 1 Hackathon WhatsApp group (link on the event page) for all announcements, round updates, submission links, and schedules. Also join the Collazon Community to stay updated on future events.',
  },
  {
    q: 'Does the Formula 1 track get special treatment?',
    a: 'Yes! Projects built in the Formula 1 Track — covering racing analytics, fan engagement, racing simulations, performance tracking, or other motorsport-inspired innovations — receive special priority consideration from the judging panel.',
  },
];

const FAQItem = ({ faq, isOpen, onToggle }) => (
  <div className={`bg-gray-950 border transition-all duration-300 ${isOpen ? 'border-red-700/60' : 'border-gray-800 hover:border-gray-700'}`}>
    <button
      onClick={onToggle}
      className="w-full px-6 py-4 flex items-center justify-between text-left"
    >
      <span className="text-white font-bold text-sm pr-4 leading-snug">{faq.q}</span>
      <div className="text-red-500 flex-shrink-0">
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </div>
    </button>
    {isOpen && (
      <div className="px-6 pb-5">
        <div className="border-l-2 border-red-600 pl-4">
          <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
        </div>
      </div>
    )}
  </div>
);

const FAQPage = () => {
  const [open, setOpen] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(220,38,38,0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(220,38,38,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <SectionLabel text="Need Help?" />
          <h1 className="text-7xl md:text-9xl font-black leading-none mb-4 text-white"
            style={{ fontFamily: "'Bebas Neue','Impact',sans-serif" }}>
            F<span className="text-red-600">A</span>Q
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to know before the lights go out.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-16">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>

        {/* Still have questions */}
        <div className="bg-gray-950 border border-gray-800 p-10 text-center">
          <Shield className="w-10 h-10 text-red-500 mx-auto mb-4" />
          <h2 className="text-3xl font-black text-white mb-3" style={{ fontFamily: "'Bebas Neue','Impact',sans-serif" }}>
            Still Have Questions?
          </h2>
          <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
            Reach out to the Collazon team and we'll get back to you before the next lap.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:collazon@contact.com"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-bold text-xs uppercase tracking-widest transition-colors"
            >
              <Zap className="w-4 h-4" /> Email Support
            </a>
            <a
              href="https://chat.whatsapp.com/KkSVnMzqsVD9ch2P9dGbdS"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-gray-700 hover:border-red-700 text-gray-300 hover:text-white px-8 py-3 font-bold text-xs uppercase tracking-widest transition-colors"
            >
              Join WhatsApp Group
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;