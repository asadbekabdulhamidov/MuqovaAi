import React from 'react';
import { 
  Sparkles, 
  Layers, 
  Printer, 
  BrainCircuit, 
  ArrowRight, 
  Zap, 
  CheckCircle2, 
  Wand2, 
  BookOpen, 
  Star 
} from 'lucide-react';
import { SHOWCASE_PRESETS } from '../constants/presets';

export function HeroSection({ onSelectPreset, onStartCreate }) {
  // Featured mockup book for the right side of the hero
  const featuredBook = SHOWCASE_PRESETS[0];

  return (
    <section className="relative py-8 sm:py-12 lg:py-16 overflow-hidden border-b border-slate-800/80">
      {/* Decorative gradient ambient glow backdrop */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[400px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/15 to-pink-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16">
        
        {/* ========================================================
            HERO MAIN: 2 COLUMNS ON DESKTOP, 1 COLUMN ON MOBILE
        ======================================================== */}
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* CHAP USTUN: Sarlavha, 1 jumlalik tavsif, Asosiy CTA va Sokin badglar */}
          <div className="col-span-12 lg:col-span-7 space-y-6 text-left">
            
            {/* Status-teg (Kichik, sokin ilmiy nishon) */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-indigo-500/30 text-indigo-300 text-xs font-semibold shadow-sm">
              <BrainCircuit className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>Ilmiy-amaliy tadqiqot loyihasi (MVP v1.0)</span>
            </div>

            {/* Aniq va ko'zga tashlanadigan H1 Sarlavha */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              Kitob muqovasining <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">muqobil dizayn variantlarini</span> tavsiya qiluvchi AI tizimi
            </h1>

            {/* Bor-yo'g'i 1 ta aniq va lo'nda tavsif jumlasi */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-normal">
              Annotatsiya va janr asosida ko‘p mezonli tahlil bilan bosmaxonaga tayyor 3 xil muqobil variant shakllantiradi.
            </p>

            {/* Asosiy CTA: Markaziy / chapdagi eng ko'zga tashlanadigan yagona yorqin tugma */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onStartCreate}
                className="group px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-pos-0 hover:bg-pos-100 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2.5"
              >
                <Wand2 className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
                <span>Muqova yaratishni boshlash</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Xususiyatlar (Badges): Tugmaga o'xshamaydigan, bitta qatorda sokin status-teglari */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs text-slate-400 font-medium">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                3 ta Variant (MCDM)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800 text-slate-300">
                <Printer className="w-3.5 h-3.5 text-emerald-400" />
                Bosmaxona (300 DPI)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800 text-slate-300">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Tezkor 3D Mockup
              </span>
            </div>
          </div>

          {/* O'NG USTUN: Kitobning jozibador 3D muqova maketi va qiyosiy kartochkalar */}
          <div className="col-span-12 lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
              
              {/* Orqa fon nur effekti */}
              <div className="absolute inset-0 bg-indigo-500/20 rounded-3xl blur-2xl transform -rotate-6 scale-95" />

              {/* 3D Asosiy Kitob Preview Kartochkasi */}
              <div className="relative bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 shadow-2xl backdrop-blur-xl space-y-3 transform hover:scale-[1.01] transition-all duration-500">
                
                {/* Tepasidagi status bar */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px]">
                  <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    AI Muqobil Sintez
                  </span>
                  <span className="text-slate-400 font-mono">B5 • 280 bet</span>
                </div>

                {/* 3D Kitob Muqovasi Visual */}
                <div className="relative aspect-[1/1.38] rounded-xl overflow-hidden shadow-2xl border border-slate-700 group">
                  <img
                    src={featuredBook.mockImages.minimalist}
                    alt={featuredBook.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Realistik gradient va qoraytirgich */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/50" />
                  
                  {/* Umurtqa burmasi soyasi */}
                  <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/60 to-transparent" />

                  {/* Muqova ustidagi matnlar */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-between z-10">
                    <div>
                      <span className="px-2 py-0.5 rounded bg-indigo-600/90 text-[9px] font-bold uppercase tracking-wider text-white">
                        2-to‘ldirilgan nashr
                      </span>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-300 mt-1">
                        Prof. Alisher Karimov
                      </p>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-serif text-xl font-bold text-white leading-tight drop-shadow-md">
                        Koinot va Vaqt Sirlari
                      </h3>
                      <div className="w-10 h-0.5 bg-amber-400" />
                    </div>

                    <div className="pt-2 border-t border-white/20 flex items-center justify-between text-[9px] text-slate-300 font-mono">
                      <span>BOSMAXONA: 300 DPI</span>
                      <span className="text-amber-300">★ 9.6 REYTINQ</span>
                    </div>
                  </div>
                </div>

                {/* Pastdagi 2 ta qiyosiy variant chipi */}
                <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                  <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800">
                    <span className="text-[9px] font-bold text-indigo-400 uppercase block">Variant A</span>
                    <span className="text-slate-200 font-medium">Tipografik & Minimalist</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800">
                    <span className="text-[9px] font-bold text-purple-400 uppercase block">Variant B</span>
                    <span className="text-slate-200 font-medium">Badiiy Illyustratsiya</span>
                  </div>
                </div>
              </div>

              {/* Suzuvchi yon badge */}
              <div className="hidden sm:flex absolute -bottom-3 -left-5 bg-indigo-950/90 border border-indigo-700/60 p-2.5 rounded-xl shadow-xl items-center gap-2 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold text-white">Avtomatik Umurtqa (16.1 mm)</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            NAMUNALAR BLOKI (PREZENTATSIYA UCHUN TAYYOR NAMUNALAR)
            Har bir namunada 2:3 nisbatdagi muqova miniatyurasi
        ======================================================== */}
        <div className="space-y-4 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Prezentatsiya uchun tayyor namunalar (1 bosish bilan sinash)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Dizaynerlar va komissiya oldida turli janrlar bo‘yicha tizim imkoniyatlarini darhol namoyish etish:
              </p>
            </div>
            <span className="text-[11px] text-slate-500 font-mono hidden sm:block">
              Tanlash uchun bosing ↗
            </span>
          </div>

          {/* Desktop: 4 ustunli to'r | Mobile: Gorizontal silliq skroll (snap-x) */}
          <div className="overflow-x-auto flex gap-4 snap-x no-scrollbar pb-3 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible">
            {SHOWCASE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => onSelectPreset(preset)}
                className="group min-w-[260px] sm:min-w-0 snap-start p-3 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 text-left transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-xl hover:shadow-indigo-950/40 relative"
              >
                <div className="space-y-3">
                  {/* Vertikal 2:3 nisbatdagi kitob muqovasi miniatyurasi (Thumbnail) */}
                  <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 group-hover:border-indigo-500/40 transition-colors">
                    <img
                      src={preset.mockImages.illustration || preset.mockImages.minimalist}
                      alt={preset.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                    {/* Janr nishoni (Thumbnail ustida) */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900/90 text-indigo-300 border border-indigo-500/30 backdrop-blur-md">
                        {preset.genreLabel}
                      </span>
                    </div>

                    {/* Format va bet soni (Thumbnail ostida) */}
                    <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] text-slate-300 font-mono">
                      <span className="font-semibold text-white bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm">
                        {preset.format.toUpperCase()}
                      </span>
                      <span className="text-slate-300 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm">
                        {preset.pages} bet
                      </span>
                    </div>
                  </div>

                  {/* Kitob nomi va muallifi */}
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                      {preset.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {preset.author}
                    </p>
                  </div>
                </div>

                {/* Kartochka pastki qismi: harakat ko'rsatkichi */}
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-indigo-400 font-semibold group-hover:text-indigo-300">
                  <span>Namuna bilan sinash</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
