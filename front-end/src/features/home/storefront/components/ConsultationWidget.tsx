'use client';

import { useState, useEffect } from 'react';

export default function ConsultationWidget() {
  const [chatOpen, setChatOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating buttons */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4 items-center">
        {/* Consultation button */}
        <button
          aria-label="Consultation"
          onClick={() => setChatOpen((prev) => !prev)}
          className="w-14 h-14 bg-[#7B1113] text-white rounded-full flex items-center justify-center shadow-xl hover:bg-[#570005] transition-all transform hover:scale-110 active:scale-95 group relative"
        >
          <span className="material-symbols-outlined text-2xl">chat</span>
          <span className="absolute right-full mr-4 bg-stone-800 text-white text-xs py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
            Consultation
          </span>
        </button>

        {/* Scroll to top button */}
        <button
          aria-label="Scroll to Top"
          onClick={handleScrollTop}
          className={`w-14 h-14 bg-stone-100 text-[#7B1113] border border-[#7B1113]/20 rounded-full flex items-center justify-center shadow-xl hover:bg-stone-200 transition-all transform hover:scale-110 active:scale-95 group relative duration-300 ${
            showScrollTop ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <span className="material-symbols-outlined text-2xl">arrow_upward</span>
          <span className="absolute right-full mr-4 bg-stone-800 text-white text-xs py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
            Scroll to Top
          </span>
        </button>
      </div>

      {/* Consultation chat dialog */}
      <div
        className={`fixed bottom-24 right-8 w-[350px] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl z-[110] flex flex-col border border-stone-200 overflow-hidden transform transition-all duration-300 ${
          chatOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'
        }`}
      >
        {/* Chat header */}
        <div className="bg-[#7B1113] p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
              <span className="material-symbols-outlined">support_agent</span>
            </div>
            <div>
              <h4 className="font-headline text-white font-bold leading-tight">Heritage Expert</h4>
              <p className="text-white/70 text-xs">Always online</p>
            </div>
          </div>
          <button
            className="text-white/80 hover:text-white"
            onClick={() => setChatOpen(false)}
            aria-label="Close chat"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
          {/* Advisor message */}
          <div className="flex flex-col gap-1 items-start">
            <div className="bg-white border border-stone-200 p-3 rounded-2xl rounded-tl-none max-w-[80%] shadow-sm">
              <p className="text-sm text-stone-800">
                Greetings from Heritage Ginseng. I am your personal health consultant. How may I assist you with our
                signature preparations today?
              </p>
            </div>
            <span className="text-[10px] text-stone-400 ml-1">10:24 AM</span>
          </div>

          {/* Customer message */}
          <div className="flex flex-col gap-1 items-end">
            <div className="bg-[#7B1113] text-white p-3 rounded-2xl rounded-tr-none max-w-[80%] shadow-sm">
              <p className="text-sm">{"I'm interested in the Red Ginseng Extract for energy."}</p>
            </div>
            <span className="text-[10px] text-stone-400 mr-1">10:25 AM</span>
          </div>
        </div>

        {/* Chat input */}
        <div className="p-4 bg-white border-t border-stone-200 flex items-center gap-2">
          <input
            className="flex-1 border-none focus:ring-0 text-sm py-2 bg-transparent outline-none"
            placeholder="Type your message..."
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="text-[#7B1113] hover:scale-110 transition-transform"
            aria-label="Send message"
            onClick={() => setMessage('')}
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>
    </>
  );
}
