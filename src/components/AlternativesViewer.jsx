import React, { useState } from 'react';
import { 
  Sparkles, 
  Download, 
  FileText, 
  RefreshCw, 
  Layers, 
  Box, 
  Printer, 
  Info, 
  CheckCircle, 
  Sliders, 
  Palette, 
  ChevronRight
} from 'lucide-react';
import { Book3DMockup } from './Book3DMockup';
import { SpreadLayout } from './SpreadLayout';
import { downloadCoverAsPng, downloadPrintPassport } from '../utils/canvasExport';

export function AlternativesViewer({ 
  variants, 
  activeVariantIndex, 
  setActiveVariantIndex, 
  bookData, 
  onRegenerateVariant, 
  isRegenerating 
}) {
  const [activeTab, setActiveTab] = useState('cover'); // 'cover' | 'mockup3d' | 'spread' | 'analysis'
  const activeVariant = variants[activeVariantIndex] || variants[0];

  const handleDownloadCover = () => {
    downloadCoverAsPng(bookData, activeVariant, activeVariant.imageUrl);
  };

  const handleDownloadPassport = () => {
    downloadPrintPassport(bookData, activeVariant);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* 3 Muqobil Variant Tanlash Barlari (Alternative Cards Top Selector) */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <h3 className="font-bold text-xs sm:text-sm text-white uppercase tracking-wider">
              Muqobil Dizayn Variantlari (3 ta yo‘nalish)
            </h3>
          </div>
          <span className="text-[11px] sm:text-xs text-slate-400 font-mono">
            Tanlangan: <strong className="text-indigo-400">{activeVariant?.title}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3">
          {variants.map((variant, index) => {
            const isSelected = index === activeVariantIndex;
            return (
              <button
                key={variant.id}
                onClick={() => setActiveVariantIndex(index)}
                className={`p-3.5 sm:p-4 rounded-xl text-left border transition-all flex flex-col justify-between relative group ${
                  isSelected
                    ? 'bg-slate-900 border-indigo-500 shadow-xl shadow-indigo-950/50 ring-1 ring-indigo-500'
                    : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Top Badge and Indicator */}
                <div className="flex items-center justify-between w-full mb-1.5">
                  <span 
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider"
                    style={{
                      borderColor: `${variant.accentColor}50`,
                      backgroundColor: `${variant.accentColor}15`,
                      color: variant.accentColor
                    }}
                  >
                    {variant.conceptBadge}
                  </span>
                  
                  {isSelected ? (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                      <CheckCircle className="w-3.5 h-3.5" /> Faol
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-500 group-hover:text-slate-300 flex items-center">
                      Ko‘rish <ChevronRight className="w-3 h-3" />
                    </span>
                  )}
                </div>

                {/* Title & Tagline */}
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-indigo-200">
                    {variant.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {variant.tagline}
                  </p>
                </div>

                {/* Thumbnail Preview */}
                <div className="mt-2.5 pt-2.5 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-mono">
                    {variant.styleName}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-400">
                    ★ {variant.rating}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tanlangan Variantning Interaktiv Vitrinasi (Active Variant Showcase) */}
      <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-3.5 sm:p-6 shadow-2xl space-y-5">
        
        {/* Tab Controls and Actions (Mobile Optimized) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 pb-4 border-b border-slate-800">
          
          {/* Sub-tabs: 2x2 grid on mobile, horizontal on desktop */}
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 w-full lg:w-auto">
            <button
              onClick={() => setActiveTab('cover')}
              className={`flex items-center justify-center sm:justify-start gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'cover'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">Old Muqova (2D)</span>
            </button>

            <button
              onClick={() => setActiveTab('mockup3d')}
              className={`flex items-center justify-center sm:justify-start gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'mockup3d'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Box className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="whitespace-nowrap">3D Kitob Mockup</span>
            </button>

            <button
              onClick={() => setActiveTab('spread')}
              className={`flex items-center justify-center sm:justify-start gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'spread'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Printer className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="whitespace-nowrap">Bosma Yoyilmasi</span>
            </button>

            <button
              onClick={() => setActiveTab('analysis')}
              className={`flex items-center justify-center sm:justify-start gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'analysis'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Info className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="whitespace-nowrap">AI Tahlili</span>
            </button>
          </div>

          {/* Action Export Buttons: 2 cols on mobile + full width download, neat row on desktop */}
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full lg:w-auto">
            <button
              onClick={() => onRegenerateVariant(activeVariantIndex)}
              disabled={isRegenerating}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-white border border-slate-700 transition-all"
              title="Ushbu muqobil variantni yangilash"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin text-indigo-400' : ''}`} />
              <span className="whitespace-nowrap">Qayta Yaratish</span>
            </button>

            <button
              onClick={handleDownloadPassport}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-indigo-300 hover:text-indigo-200 border border-slate-700 transition-all"
              title="Bosmaxona uchun texnik pasportni yuklab olish"
            >
              <FileText className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">Bosma Pasporti</span>
            </button>

            <button
              onClick={handleDownloadCover}
              className="col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition-all"
              title="Muqovani yuqori aniqlikda yuklab olish"
            >
              <Download className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">Muqovani Yuklab Olish</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Old Muqova (2D Cover Preview) */}
        {activeTab === 'cover' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* Visual Cover Art Canvas */}
            <div className="lg:col-span-6 flex justify-center">
              <div 
                className="relative w-full max-w-[270px] sm:max-w-sm aspect-[1/1.44] rounded-xl overflow-hidden shadow-2xl border border-slate-700/80 group"
                style={{
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
                }}
              >
                {/* Artwork */}
                <img
                  src={activeVariant.imageUrl}
                  alt={bookData.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Shading gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/60 pointer-events-none" />

                {/* Typography Layer */}
                <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between z-10 pointer-events-none">
                  <div>
                    <span className="inline-block px-2 py-0.5 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase bg-indigo-600/90 text-white rounded backdrop-blur-sm shadow">
                      {bookData.edition || '1-nashr'}
                    </span>
                    <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-amber-300 drop-shadow mt-1.5">
                      {bookData.author}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight drop-shadow-xl">
                      {bookData.title}
                    </h2>
                    <div className="w-12 sm:w-16 h-1 bg-amber-400" />
                    <p className="text-[11px] sm:text-xs text-slate-200 line-clamp-2 sm:line-clamp-3 leading-relaxed drop-shadow">
                      {bookData.synopsis}
                    </p>
                  </div>

                  <div className="pt-2 sm:pt-3 border-t border-white/20 flex items-center justify-between text-[9px] sm:text-[10px] text-slate-300 font-mono">
                    <span>{bookData.format?.toUpperCase()} • 300 DPI</span>
                    <span className="text-amber-300 truncate max-w-[120px]">{activeVariant.styleName}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Design & Printing Brief */}
            <div className="lg:col-span-6 space-y-3.5">
              <div>
                <span 
                  className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider"
                  style={{
                    borderColor: `${activeVariant.accentColor}50`,
                    backgroundColor: `${activeVariant.accentColor}15`,
                    color: activeVariant.accentColor
                  }}
                >
                  {activeVariant.conceptBadge}
                </span>
                <h3 className="text-lg sm:text-2xl font-bold text-white mt-1.5">
                  {activeVariant.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  {activeVariant.rationale}
                </p>
              </div>

              {/* Attributes checklist */}
              <div className="space-y-2 pt-1">
                <div className="p-2.5 sm:p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs flex items-start gap-2.5">
                  <Palette className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-200">Rang Psixologiyasi:</strong>
                    <p className="text-slate-400 mt-0.5 leading-relaxed">{activeVariant.colorLogic}</p>
                  </div>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs flex items-start gap-2.5">
                  <Sliders className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-200">Tipografik Qonuniyat:</strong>
                    <p className="text-slate-400 mt-0.5 leading-relaxed">{activeVariant.typographyLogic}</p>
                  </div>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs flex items-start gap-2.5">
                  <Printer className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-200">Bosmaxona Pardozlashi:</strong>
                    <p className="text-emerald-300 font-medium mt-0.5 leading-relaxed">{activeVariant.recommendedFinish}</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setActiveTab('mockup3d')}
                  className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 flex items-center justify-center gap-1.5"
                >
                  <Box className="w-3.5 h-3.5 text-amber-400" />
                  <span>3D Mockup</span>
                </button>
                <button
                  onClick={() => setActiveTab('spread')}
                  className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Bosma Yoyilmasi</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: 3D Kitob Mockup */}
        {activeTab === 'mockup3d' && (
          <Book3DMockup
            bookData={bookData}
            variant={activeVariant}
            coverImage={activeVariant.imageUrl}
            spineWidthMm={activeVariant.printSpecs?.spineMm || 14}
          />
        )}

        {/* Tab 3: Bosmaxona Yoyilmasi (Full Printer Spread) */}
        {activeTab === 'spread' && (
          <SpreadLayout
            bookData={bookData}
            variant={activeVariant}
            coverImage={activeVariant.imageUrl}
            spineWidthMm={activeVariant.printSpecs?.spineMm || 14}
          />
        )}

        {/* Tab 4: AI Tahlili & Mezonlar */}
        {activeTab === 'analysis' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  AI Prompt Muhandisligi
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-900 p-3 rounded-lg border border-slate-800 select-all">
                  {activeVariant.prompt}
                </p>
                <p className="text-[11px] text-slate-500">
                  Ushbu prompt foydalanuvchi kiritgan o‘zbekcha kitob parametrlari asosida neyrotarmoqlar uchun maxsus generatsiya qilindi.
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Printer className="w-4 h-4" />
                  Poligrafik Xususiyatlar Jadvali
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Kitob formati:</span>
                    <span className="text-white font-mono">{activeVariant.printSpecs?.widthMm} × {activeVariant.printSpecs?.heightMm} mm</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Umurtqa qalinligi (Spine):</span>
                    <span className="text-amber-400 font-mono font-bold">{activeVariant.printSpecs?.spineMm} mm</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Kesim chegarasi (Bleed):</span>
                    <span className="text-white font-mono">{activeVariant.printSpecs?.bleedMm} mm</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Tavsiya etilgan rezolyutsiya:</span>
                    <span className="text-emerald-400 font-mono font-bold">300 DPI</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Rang modeli:</span>
                    <span className="text-white font-mono">{activeVariant.printSpecs?.colorSpace}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
