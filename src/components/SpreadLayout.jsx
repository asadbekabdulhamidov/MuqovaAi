import React from 'react';
import { Scissors, Ruler, ShieldCheck, Download, Printer } from 'lucide-react';
import { DEFAULT_FALLBACK_IMAGES } from '../services/aiService';

export function SpreadLayout({ 
  bookData, 
  variant, 
  coverImage, 
  spineWidthMm = 14 
}) {
  const specs = variant?.printSpecs || {
    widthMm: 148,
    heightMm: 210,
    spineMm: spineWidthMm,
    bleedMm: 3,
    dpi: 300,
    totalSpreadWidthMm: 308,
    totalSpreadHeightMm: 216
  };

  return (
    <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-3.5 sm:p-6 flex flex-col gap-4 sm:gap-6">
      {/* Mobile Swipe Hint */}
      <div className="lg:hidden flex items-center justify-center gap-1.5 py-1 px-3 bg-indigo-950/60 rounded-lg border border-indigo-800/40 text-[11px] text-indigo-300 font-medium">
        <span>👉 Yoyilmani to‘liq ko‘rish uchun gorizontal suring</span>
      </div>
      {/* Header with technical print badges */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-lg text-white">To‘liq Bosmaxona Yoyilmasi (Printer Spread)</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Orqa muqova + Umurtqa (Spine) + Old muqova + 3 mm kesim chegarasi (Bleed)
          </p>
        </div>

        {/* Technical specs pill */}
        <div className="flex items-center gap-3 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 text-xs font-mono">
          <span className="text-slate-400">Yoyilma:</span>
          <span className="text-emerald-400 font-bold">
            {specs.totalSpreadWidthMm} × {specs.totalSpreadHeightMm} mm
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Umurtqa:</span>
          <span className="text-amber-400 font-bold">{specs.spineMm} mm</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">DPI:</span>
          <span className="text-indigo-400 font-bold">300 DPI</span>
        </div>
      </div>

      {/* Printer Spread Canvas Visualization */}
      <div className="relative overflow-x-auto p-4 bg-slate-950/60 rounded-xl border border-dashed border-slate-700">
        {/* Bleed guide legend */}
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-3 px-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-rose-500 inline-block" />
            <span className="text-rose-400">Qizil chiziq: 3 mm Kesim chegarasi (Bleed cut line)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-blue-500 inline-block" />
            <span className="text-blue-400">Ko‘k chiziq: 5 mm Xavfsiz maydon (Safe print zone)</span>
          </div>
        </div>

        {/* The Full Spread Container */}
        <div className="min-w-[680px] max-w-4xl mx-auto relative border-2 border-dashed border-rose-500/80 p-2 bg-slate-900 rounded shadow-2xl">
          {/* Bleed indicator label */}
          <div className="absolute -top-3 left-4 bg-rose-900/90 text-rose-200 text-[9px] font-mono px-2 py-0.5 rounded border border-rose-500">
            BLEED +3mm
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] h-[400px] border border-blue-500/50 rounded overflow-hidden relative">
            
            {/* 1. BACK COVER (Orqa muqova) */}
            <div className="bg-slate-900 p-6 flex flex-col justify-between border-r border-slate-700/80 relative">
              <div className="space-y-4">
                <div className="inline-block px-2.5 py-0.5 bg-indigo-950 text-indigo-300 rounded text-[10px] font-bold uppercase tracking-wider">
                  Annotatsiya
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {bookData.synopsis}
                </p>

                <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <p><strong className="text-slate-300">Muallif:</strong> {bookData.author}</p>
                  <p><strong className="text-slate-300">Nashr:</strong> {bookData.edition || '1-nashr'}</p>
                  <p><strong className="text-slate-300">Format:</strong> {bookData.format?.toUpperCase()} ({specs.widthMm}×{specs.heightMm} mm)</p>
                  <p><strong className="text-slate-300">Hajmi:</strong> {bookData.pages} bet</p>
                </div>
              </div>

              {/* Bottom barcode and publisher stamp */}
              <div className="pt-4 border-t border-slate-800 flex items-end justify-between">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-slate-400">ISBN & SHTRIX KOD</span>
                  <div className="bg-white p-2 rounded shadow-sm inline-block">
                    {/* Simulated barcode */}
                    <div className="flex h-9 gap-[2px] items-center">
                      {[3,1,2,1,3,1,2,3,1,1,2,1,3,2,1,2,1,3,1,2,1,3,1,2].map((w, i) => (
                        <div key={i} className="bg-black h-full" style={{ width: `${w}px` }} />
                      ))}
                    </div>
                    <div className="text-[8px] font-mono text-black text-center mt-1 tracking-widest font-semibold">
                      {bookData.isbn || '978-9943-01-845-2'}
                    </div>
                  </div>
                </div>

                <div className="text-right text-[10px] text-slate-500 font-mono">
                  <span>NARXI KELISHILGAN</span>
                  <p className="text-slate-400 font-semibold mt-0.5">O‘ZBEKISTON NASHRIYOTI</p>
                </div>
              </div>
            </div>

            {/* 2. SPINE (Umurtqa) */}
            <div 
              className="bg-slate-950 flex flex-col justify-between py-6 px-1.5 border-r border-slate-700/80 relative text-center"
              style={{
                width: `${Math.max(38, specs.spineMm * 3)}px`,
                background: `linear-gradient(90deg, #090d16 0%, ${variant?.accentColor || '#312e81'} 50%, #090d16 100%)`
              }}
            >
              {/* Spine measurement badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-900/90 text-amber-200 text-[8px] font-mono px-1.5 py-0.5 rounded border border-amber-500 whitespace-nowrap">
                {specs.spineMm} mm
              </div>

              <div className="text-[9px] text-slate-400 font-mono rotate-90 whitespace-nowrap origin-center">
                {bookData.author?.slice(0, 18)}
              </div>

              <div className="text-[12px] font-bold text-white font-serif tracking-widest rotate-90 whitespace-nowrap origin-center drop-shadow-md">
                {bookData.title?.slice(0, 28)}
              </div>

              <div className="text-[9px] text-amber-400 font-mono rotate-90 whitespace-nowrap origin-center">
                2026
              </div>
            </div>

            {/* 3. FRONT COVER (Old muqova) */}
            <div className="relative overflow-hidden group">
              <img
                src={coverImage}
                alt={bookData.title}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = DEFAULT_FALLBACK_IMAGES[0];
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50" />

              {/* Title & Author on Cover */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                <div className="space-y-1">
                  <span className="px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase bg-indigo-600 text-white rounded">
                    {bookData.edition || '1-nashr'}
                  </span>
                  <p className="text-xs font-semibold text-amber-300 tracking-wider uppercase drop-shadow">
                    {bookData.author}
                  </p>
                </div>

                <div className="space-y-2">
                  <h2 className="font-serif text-2xl font-black text-white leading-tight drop-shadow-lg">
                    {bookData.title}
                  </h2>
                  <div className="w-16 h-1 bg-amber-400" />
                </div>

                <div className="pt-2 border-t border-white/20 flex items-center justify-between text-[9px] text-slate-300 font-mono">
                  <span>{specs.widthMm} × {specs.heightMm} mm</span>
                  <span>STANDART: 300 DPI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Shop Recommendations and Technical Passport */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs mb-1.5">
            <Ruler className="w-4 h-4" />
            Umurtqa va Kesim
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Umurtqa qalinligi <strong className="text-white">{specs.spineMm} mm</strong> qilib hisoblandi ({bookData.pages} bet). Kesim chetlaridan (Bleed) har tomondan 3 mm ortiqcha fonda qoldirilgan.
          </p>
        </div>

        <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs mb-1.5">
            <ShieldCheck className="w-4 h-4" />
            Rang Profili & Bosma
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Tavsiya etiladigan rang modeli: <strong className="text-white">{specs.colorSpace}</strong>. Yuqori aniqlik uchun kamida 300 DPI rezolyutsiyada bosiladi.
          </p>
        </div>

        <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs mb-1.5">
            <Scissors className="w-4 h-4" />
            Tavsiya Qilinadigan Qoplama
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {variant?.recommendedFinish || 'Matviy laminatsiya + Selektiv UV lak'}
          </p>
        </div>
      </div>
    </div>
  );
}
