import React from 'react';
import { Sparkles, Layers, Printer, BrainCircuit, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { SHOWCASE_PRESETS } from '../constants/presets';

export function HeroSection({ onSelectPreset, onStartNew }) {
  return (
    <section className="relative pt-4 sm:pt-8 pb-8 sm:pb-12 overflow-hidden border-b border-slate-800/80">
      {/* Decorative gradient glow backdrop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/15 to-pink-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-3.5 sm:space-y-5">
          {/* Scientific Topic Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/90 border border-indigo-500/30 text-indigo-300 text-[11px] sm:text-xs font-semibold backdrop-blur-md shadow-lg shadow-indigo-950/40">
            <BrainCircuit className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span>Ilmiy-amaliy tadqiqot mavzusi bo‘yicha MVP loyihasi</span>
          </div>

          {/* Main Topic Title */}
          <h1 className="text-xl sm:text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-snug">
            Kitob muqovasini <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">Muqobil dizayn variantlarini</span> tavsiya qiluvchi AI tizimi
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Kitob parametrlari, janri va semantik annotatsiyasi asosida generativ neyrotarmoqlar yordamida bir vaqtning o‘zida <strong className="text-white">3 ta muqobil kompozitsion variant</strong> hamda <strong className="text-white">bosmaxona uchun tayyor 3D va yoyilma andozalarini</strong> shakllantiruvchi intellektual platforma.
          </p>

          {/* Quick Metrics / Research Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 pt-1 text-[11px] sm:text-xs text-slate-300 font-medium">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-900/60 rounded-lg border border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>3 ta Variant (MCDM)</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-900/60 rounded-lg border border-slate-800">
              <Printer className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>Bosmaxona (300 DPI & Bleed)</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-900/60 rounded-lg border border-slate-800">
              <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Tezkor & 3D Mockup</span>
            </div>
          </div>
        </div>

        {/* 1-Click Interactive Showcase Presets */}
        <div className="mt-6 sm:mt-10 p-3.5 sm:p-5 rounded-2xl glass-panel border border-slate-800 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 sm:mb-4">
            <div>
              <h3 className="text-xs font-bold text-slate-200 tracking-wider uppercase flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Prezentatsiya uchun tayyor namunalar (1 bosish bilan sinash)
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Komissiya va dizaynerlar oldida ko‘rsatish uchun janrlar bo‘yicha oldindan shakllantirilgan namunalar:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
            {SHOWCASE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => onSelectPreset(preset)}
                className="group p-3 rounded-xl bg-slate-800/40 hover:bg-indigo-950/40 border border-slate-700/60 hover:border-indigo-500/50 text-left transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 px-2 py-0.5 bg-indigo-500/10 rounded inline-block mb-1.5">
                    {preset.genreLabel}
                  </span>
                  <h4 className="font-semibold text-xs text-white group-hover:text-indigo-200 line-clamp-1">
                    {preset.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                    {preset.author}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-700/40 flex items-center justify-between text-[10px] text-slate-400 group-hover:text-indigo-300">
                  <span>{preset.format.toUpperCase()} • {preset.pages} bet</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
