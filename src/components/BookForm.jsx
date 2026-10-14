import React, { useState } from 'react';
import { 
  BookOpen, 
  User, 
  FileText, 
  Layers, 
  Palette, 
  Printer, 
  Sparkles, 
  Ruler, 
  Hash, 
  Check, 
  Wand2, 
  Loader2,
  Bookmark
} from 'lucide-react';
import { 
  BOOK_FORMATS, 
  DESIGN_STYLES, 
  BOOK_GENRES, 
  COLOR_PALETTES 
} from '../constants/presets';
import { calculateSpineWidth } from '../services/aiService';

export function BookForm({ 
  formData, 
  setFormData, 
  onGenerate, 
  isGenerating, 
  generationStep 
}) {
  const spineWidth = calculateSpineWidth(formData.pages, formData.paperWeight);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-800 p-4 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Accent corner gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-800/80 mb-6 gap-2">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            Kitob Parametrlari va Kirish Ma’lumotlari
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Muqobil dizayn variantlarini tavsiya etish uchun kitob haqidagi ma’lumotlarni to‘ldiring
          </p>
        </div>
        <div className="self-start sm:self-auto text-[11px] font-mono px-3 py-1 rounded-full bg-indigo-950/60 text-indigo-300 border border-indigo-800/60">
          Semantik Tahlil v1.0
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); onGenerate(); }} className="space-y-6">
        {/* 1. Asosiy identifikatsiya */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5 text-indigo-400" />
              Kitob Nomi <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Masalan: Yulduzli Tunlar Sadosi"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-purple-400" />
              Muallif (Author) <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.author}
              onChange={(e) => handleChange('author', e.target.value)}
              placeholder="Masalan: Abdulla Qodiriy"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* 2. Nashr ma'lumoti va Janr */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-emerald-400" />
              Nashr Ma’lumoti
            </label>
            <input
              type="text"
              value={formData.edition}
              onChange={(e) => handleChange('edition', e.target.value)}
              placeholder="Masalan: 1-nashr, 2-to‘ldirilgan nashr"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              Kitob Janri <span className="text-rose-400">*</span>
            </label>
            <select
              value={formData.genre}
              onChange={(e) => handleChange('genre', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            >
              {BOOK_GENRES.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 3. Mazmuni va Annotatsiyasi (Semantik asos) */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              Qisqacha Mazmuni / Annotatsiya (AI tahlili uchun asosiy ma’lumot) <span className="text-rose-400">*</span>
            </span>
            <span className="text-[10px] text-slate-500 font-normal">
              {formData.synopsis.length} belgi
            </span>
          </label>
          <textarea
            required
            rows={3}
            value={formData.synopsis}
            onChange={(e) => handleChange('synopsis', e.target.value)}
            placeholder="Kitob nima haqida, undagi asosiy mavzu, qahramonlar yoki ilmiy g‘oyalar nimalardan iborat ekanligini yozing..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
          />
        </div>

        {/* 4. Dizayn Uslublari (Design Style Grid) */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-pink-400" />
              Asosiy Dizayn Uslubi (Design Style)
            </span>
            <span className="text-[10px] text-indigo-400 font-mono">Tavsiya mezonlari</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {DESIGN_STYLES.map((style) => {
              const isSelected = formData.style === style.id;
              return (
                <button
                  type="button"
                  key={style.id}
                  onClick={() => handleChange('style', style.id)}
                  className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between relative ${
                    isSelected
                      ? 'bg-indigo-950/60 border-indigo-500 shadow-md shadow-indigo-900/30 ring-1 ring-indigo-500'
                      : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {style.badge}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                    </div>
                    <h4 className="text-xs font-bold text-white leading-tight">
                      {style.name}
                    </h4>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 line-clamp-2">
                    {style.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Ranglar palitrasi */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            Ranglar Gammasi & Kayfiyat
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {COLOR_PALETTES.map((pal) => {
              const isSelected = formData.palette === pal.id;
              return (
                <button
                  type="button"
                  key={pal.id}
                  onClick={() => handleChange('palette', pal.id)}
                  className={`p-2.5 rounded-xl border flex items-center gap-2.5 text-left transition-all ${
                    isSelected
                      ? 'bg-indigo-950/50 border-indigo-500 ring-1 ring-indigo-500'
                      : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex -space-x-1.5">
                    {pal.preview.map((c, idx) => (
                      <span
                        key={idx}
                        className="w-4 h-4 rounded-full border border-slate-900 shadow-sm"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-slate-200 line-clamp-1">
                    {pal.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 6. Bosmaxona va Poligrafik O'lchamlar */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Printer className="w-4 h-4 text-emerald-400" />
              Bosmaxona Parametrlari (Poligrafiya standarti)
            </h3>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
              Avto-kalkulyator
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Format tanlash */}
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">
                Kitob Formati
              </label>
              <select
                value={formData.format}
                onChange={(e) => handleChange('format', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                {BOOK_FORMATS.map((fmt) => (
                  <option key={fmt.id} value={fmt.id}>
                    {fmt.name} ({fmt.label})
                  </option>
                ))}
              </select>
            </div>

            {/* Sahifalar soni */}
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">
                Sahifalar soni (Bet)
              </label>
              <input
                type="number"
                min="32"
                max="1200"
                step="4"
                value={formData.pages}
                onChange={(e) => handleChange('pages', parseInt(e.target.value, 10) || 100)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>

            {/* Hisoblangan Umurtqa (Spine) ko'rsatkichi */}
            <div className="bg-slate-900 p-2.5 rounded-lg border border-indigo-900/40 flex flex-col justify-between">
              <span className="text-[10px] text-slate-400 flex items-center justify-between">
                <span>Hisoblangan Umurtqa:</span>
                <Ruler className="w-3 h-3 text-amber-400" />
              </span>
              <div className="text-sm font-bold text-amber-400 font-mono mt-0.5">
                {spineWidth} mm <span className="text-[10px] font-normal text-slate-400">(80g ofset)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Generatsiya tugmasi */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isGenerating || !formData.title || !formData.author}
            className={`w-full py-4 rounded-xl font-bold text-sm shadow-xl flex items-center justify-center gap-2.5 transition-all ${
              isGenerating
                ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
                : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.01]'
            }`}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-indigo-400" />
                <span>{generationStep || 'AI Muqobil Variantlarini Sintez Qilmoqda...'}</span>
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                <span>AI Muqobil Variantlarini Tavsiya Qilish (3 ta variant)</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
