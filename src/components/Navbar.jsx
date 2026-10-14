import React from 'react';
import { BookMarked, Settings2, Sun, Moon, Wand2, Sparkles, Presentation } from 'lucide-react';

export function Navbar({ 
  onOpenSettings, 
  activeTab, 
  setActiveTab, 
  designMode, 
  setDesignMode 
}) {
  const isV2 = designMode === 'v2';

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-300 ${
      isV2 
        ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-sm' 
        : 'bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-black/20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        
        {/* Logo (Chap tomonda) */}
        <div 
          onClick={() => setActiveTab('generator')}
          className="flex items-center gap-2.5 cursor-pointer shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-500/25 border border-indigo-400/30">
            <BookMarked className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <span className={`font-extrabold text-lg tracking-tight font-sans ${isV2 ? 'text-slate-900' : 'text-white'}`}>
              Cover<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">AI</span>
            </span>
            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${
              isV2 
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200' 
                : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20'
            }`}>
              {isV2 ? 'V2 Light' : 'V1 Dark'}
            </span>
          </div>
        </div>

        {/* Desktop Tabs (Markazda - Faqat asosiy ishchi sahifalar, ilmiy sahifa olib tashlangan) */}
        <nav className={`hidden md:flex items-center gap-1 p-1 rounded-xl border ${
          isV2 
            ? 'bg-slate-100/80 border-slate-200' 
            : 'bg-slate-900/80 border-slate-800/80'
        }`}>
          <button
            onClick={() => {
              setActiveTab('generator');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'generator'
                ? isV2 
                  ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/80' 
                  : 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : isV2 ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
            }`}
          >
            Bosh sahifa
          </button>

          <button
            onClick={() => {
              setActiveTab('generator');
              const el = document.getElementById(isV2 ? 'v2-create-section' : 'generator-form-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isV2 ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
            }`}
          >
            Dizayn yaratish
          </button>

          <button
            onClick={() => {
              setActiveTab('alternatives');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'alternatives'
                ? isV2 
                  ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/80' 
                  : 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : isV2 ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
            }`}
          >
            Muqobil variantlar
          </button>

          {isV2 && (
            <button
              onClick={() => {
                setActiveTab('generator');
                const el = document.getElementById('v2-editor-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition-all"
            >
              Online Editor
            </button>
          )}
        </nav>

        {/* Right side: V1 / V2 SWITCHER BUTTON + Settings */}
        <div className="flex items-center gap-2">
          
          {/* V1 / V2 Dizayn O'zgartirish Tugmasi (Asosiy rejim tugmasi) */}
          <button
            onClick={() => setDesignMode(isV2 ? 'v1' : 'v2')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border shadow-sm ${
              isV2
                ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border-indigo-200 hover:border-indigo-400'
                : 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40 hover:bg-indigo-600/30'
            }`}
            title="Dizayn rejimini o‘zgartirish (V1 Dark / V2 Light CoverAI)"
          >
            {isV2 ? (
              <>
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Rejim: <strong className="text-indigo-600">V2 (Yorug‘)</strong></span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-400" />
                <span>Rejim: <strong className="text-indigo-300">V1 (Dark)</strong></span>
              </>
            )}
          </button>

          {/* Slides / Taqdimot Button */}
          <a
            href="/slides.html"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all shadow-sm flex items-center gap-1.5 ${
              isV2
                ? 'bg-purple-50 hover:bg-purple-100/80 text-purple-700 border-purple-200'
                : 'bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 border-purple-800/60'
            }`}
            title="Loyiha taqdimoti (12 ta interaktiv slayd)"
          >
            <Presentation className="w-4 h-4 text-purple-600" />
            <span className="hidden sm:inline font-bold">Taqdimot</span>
          </a>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className={`p-2 rounded-xl text-xs border transition-all shadow-sm flex items-center gap-1.5 ${
              isV2 
                ? 'bg-slate-100 hover:bg-slate-200/80 border-slate-200 text-slate-700' 
                : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-300'
            }`}
            title="AI Dvigateli va API sozlamalari"
          >
            <Settings2 className="w-4 h-4 text-indigo-500" />
            <span className="hidden lg:inline text-xs">Sozlamalar</span>
          </button>
        </div>

      </div>
    </header>
  );
}
