import React from 'react';
import { BookMarked, Sparkles, Settings2, Award } from 'lucide-react';

export function Navbar({ onOpenSettings, activeTab, setActiveTab }) {
  return (
    <header className="sticky top-0 z-50 bg-[#090d16]/95 backdrop-blur-xl border-b border-slate-800/90 shadow-lg shadow-black/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Brand & Research topic badge */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 border border-indigo-400/30 shrink-0">
            <BookMarked className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white font-sans whitespace-nowrap">
                Muqova<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">AI</span>
              </span>
              <span className="hidden md:inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                <Award className="w-3 h-3 text-amber-400" /> Ilmiy Tadqiqot MVP
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-400 hidden lg:block truncate">
              Kitob muqovasining muqobil dizayn variantlarini tavsiya qiluvchi AI tizimi
            </p>
          </div>
        </div>

        {/* Navigation Tabs (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'generator'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            AI Generator
          </button>
          <button
            onClick={() => setActiveTab('alternatives')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'alternatives'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Muqobil Variantlar
          </button>
          <button
            onClick={() => setActiveTab('research')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'research'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Ilmiy Asos & Tahlil
          </button>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={onOpenSettings}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/80 text-xs text-slate-300 hover:text-white transition-all shadow-sm flex items-center gap-1.5"
            title="AI Dvigateli va API sozlamalari"
          >
            <Settings2 className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">Sozlamalar</span>
          </button>

          <a
            href="#research-section"
            onClick={() => setActiveTab('research')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-indigo-600/25 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-xs">Prezentatsiya</span>
          </a>
        </div>
      </div>

      {/* Mobile quick navigation tabs */}
      <div className="md:hidden flex items-center justify-around px-2 py-1.5 bg-slate-950/80 border-t border-slate-800/80 text-xs">
        <button
          onClick={() => setActiveTab('generator')}
          className={`flex-1 py-1.5 text-center font-semibold rounded-lg transition-all ${
            activeTab === 'generator' ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' : 'text-slate-400'
          }`}
        >
          Generator
        </button>
        <button
          onClick={() => setActiveTab('alternatives')}
          className={`flex-1 py-1.5 text-center font-semibold rounded-lg transition-all ${
            activeTab === 'alternatives' ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' : 'text-slate-400'
          }`}
        >
          Variantlar (3)
        </button>
        <button
          onClick={() => setActiveTab('research')}
          className={`flex-1 py-1.5 text-center font-semibold rounded-lg transition-all ${
            activeTab === 'research' ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' : 'text-slate-400'
          }`}
        >
          Ilmiy Tahlil
        </button>
      </div>
    </header>
  );
}
