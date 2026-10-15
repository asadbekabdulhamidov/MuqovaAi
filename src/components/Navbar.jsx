import React from 'react';
import { BookMarked, Settings2, Sun, Moon, Presentation } from 'lucide-react';

export function Navbar({ 
  onOpenSettings, 
  theme = 'light', 
  setTheme 
}) {
  const isDark = theme === 'dark';

  return (
    <header className="sticky top-0 z-50 transition-colors duration-300 bg-white/95 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200/90 dark:border-slate-800/80 shadow-sm dark:shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        
        {/* Logo (Chap tomonda: Muqova AI) */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 cursor-pointer shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-500/25 border border-indigo-400/30">
            <BookMarked className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-lg tracking-tight font-sans text-slate-900 dark:text-white">
              Muqova<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600"> AI</span>
            </span>
          </div>
        </div>

        {/* Desktop Tabs (Markazda: Bosh sahifa, Dizayn yaratish, Muqobil variantlar, Online Editor) */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-xl border bg-slate-100/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
          >
            Bosh sahifa
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('create-section') || document.getElementById('v2-create-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
          >
            Dizayn yaratish
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('alternatives-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
          >
            Muqobil variantlar
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('editor-section') || document.getElementById('v2-editor-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
          >
            Online Editor
          </button>
        </nav>

        {/* Right side: Dark / Light Mode Switcher + Taqdimot + Sozlamalar */}
        <div className="flex items-center gap-2">
          
          {/* Dark / Light Rejim Tugmasi */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border shadow-sm bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
            title={isDark ? "Yorug‘ rejimga o‘tish (Light)" : "Qorong‘i rejimga o‘tish (Dark)"}
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-600" />
                <span>Dark</span>
              </>
            )}
          </button>

          {/* Slides / Taqdimot Button */}
          <a
            href="/slides.html"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all shadow-sm flex items-center gap-1.5 bg-purple-50 hover:bg-purple-100/80 dark:bg-purple-950/60 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/60"
            title="Loyiha taqdimoti (12 ta interaktiv slayd & .PPTX yuklab olish)"
          >
            <Presentation className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="hidden sm:inline font-bold">Taqdimot</span>
          </a>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl text-xs border transition-all shadow-sm flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
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

export default Navbar;
