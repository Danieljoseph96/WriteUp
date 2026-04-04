import React from 'react';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/60 dark:bg-[#0d0e13]/60 backdrop-blur-xl bg-gradient-to-b from-[#121319] to-transparent shadow-[0_0_40px_rgba(0,0,0,0.4)]">
      <div className="flex justify-between items-center px-8 py-4 max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#99f7ff]">sensors</span>
          <span className="text-xl font-bold text-[#99f7ff] tracking-tighter font-headline">SENTINEL AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-headline font-medium tracking-tight">
          <a className="text-[#f7f5fd]/70 hover:text-[#99f7ff] transition-colors" href="#services">Services</a>
          <a className="text-[#f7f5fd]/70 hover:text-[#99f7ff] transition-colors" href="#ai-agents">AI Agents</a>
          <a className="text-[#f7f5fd]/70 hover:text-[#99f7ff] transition-colors" href="#security">Security</a>
          <a className="text-[#f7f5fd]/70 hover:text-[#99f7ff] transition-colors" href="#consulting">Consulting</a>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-6 py-2 rounded-md bg-gradient-to-r from-primary to-primary-container text-on-primary font-headline font-semibold text-sm hover:shadow-[0_0_15px_rgba(153,247,255,0.4)] transition-all active:scale-95 duration-200">
            Launch Project
          </button>
        </div>
      </div>
    </nav>
  );
}
