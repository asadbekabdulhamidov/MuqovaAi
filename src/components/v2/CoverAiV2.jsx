import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  ThumbsUp, 
  Download, 
  ArrowRight, 
  RefreshCw, 
  Check, 
  Palette, 
  Sliders, 
  BookOpen, 
  Wand2, 
  Loader2, 
  Eye, 
  SlidersHorizontal,
  ChevronDown,
  Edit3,
  Bookmark,
  Clock
} from 'lucide-react';
import { 
  BOOK_FORMATS, 
  DESIGN_STYLES, 
  BOOK_GENRES, 
  COLOR_PALETTES,
  SHOWCASE_PRESETS 
} from '../../constants/presets';
import { OnlineEditor } from './OnlineEditor';
import { downloadCoverAsPng, downloadPrintPassport } from '../../utils/canvasExport';
import { DEFAULT_FALLBACK_IMAGES } from '../../services/aiService';

export function CoverAiV2({ 
  formData, 
  setFormData, 
  variants, 
  activeVariantIndex, 
  setActiveVariantIndex, 
  onGenerate, 
  isGenerating, 
  generationStep,
  onRegenerateVariant,
  isRegenerating
}) {
  const [activeSubTab, setActiveSubTab] = useState('create'); // 'home' | 'create' | 'results' | 'editor'
  const activeVariant = variants[activeVariantIndex] || variants[0];

  // Ranglar ro'yxati (Client mockupdagi doiralar: Ko'k, Binafsha, To'q, Qora, Oq)
  const quickColors = [
    { id: 'deep_mystery', color: '#1e3a8a', label: 'To‘q ko‘k' },
    { id: 'vibrant_dynamic', color: '#7c3aed', label: 'Binafsha' },
    { id: 'emerald_nature', color: '#0f766e', label: 'Zumrad' },
    { id: 'minimal_mono', color: '#0f172a', label: 'To‘q qora' },
    { id: 'warm_gold', color: '#b45309', label: 'Oltinrang' }
  ];

  // 6 ta misol uslublari (Panel 2 o'ng tomondagi "Misol uchun" kartochkalari)
  const sampleStyles = [
    { id: 'minimalist', name: 'Minimalist', img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80' },
    { id: 'classic', name: 'Klassik', img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80' },
    { id: 'digital3d', name: 'Zamonaviy', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80' },
    { id: 'illustration', name: 'Fantaziya', img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80' },
    { id: 'science', name: 'Ilmiy', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80' },
    { id: 'business', name: 'Motivatsion', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80' }
  ];

  const handleApplySample = (sample) => {
    setFormData(prev => ({
      ...prev,
      style: sample.id === 'science' || sample.id === 'business' ? 'minimalist' : sample.id
    }));
  };

  const handleDownload = (variant) => {
    downloadCoverAsPng(formData, variant, variant.imageUrl || variant.fallbackUrl);
  };

  return (
    <div className="space-y-8 pb-12 font-sans text-slate-800">
      
      {/* ========================================================
          PANEL 1: BOSH SAHIFA HERO & 4 ASOSIY XUSUSIYATLAR
      ======================================================== */}
      <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Chap tomondagi matnlar */}
          <div className="lg:col-span-7 space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15]">
              Kitob muqovasi dizayni <br className="hidden sm:inline" />
              endi yanada oson!
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-lg leading-relaxed">
              Sun’iy intellekt yordamida kitobingiz uchun eng yaxshi muqobil dizayn variantlarini yarating va tavsiya oling.
            </p>

            <div className="pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('v2-create-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-sm shadow-lg shadow-purple-900/40 hover:scale-[1.02] transition-all flex items-center gap-2"
              >
                <span>Dizayn yaratish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* O'ng tomondagi 3D Kitoblar ko'rgazmasi */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative flex items-center justify-center -space-x-8 sm:-space-x-12">
              {/* Kitob 1 (Orqada) */}
              <div className="w-32 sm:w-40 aspect-[1/1.4] rounded-lg shadow-2xl overflow-hidden border border-white/20 transform -rotate-12 translate-y-3 opacity-75">
                <img
                  src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80"
                  alt="Tabiat"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Kitob 2 (Asosiy / Markazda) */}
              <div className="w-40 sm:w-48 aspect-[1/1.4] rounded-xl shadow-2xl overflow-hidden border-2 border-white/30 transform z-20 hover:scale-105 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80"
                  alt="Zamon"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 p-4 flex flex-col justify-between">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-white/80">CoverAI</span>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white leading-tight">ZAMON</h3>
                    <p className="text-[10px] text-amber-300">A. Karimov</p>
                  </div>
                </div>
              </div>

              {/* Kitob 3 (O'ngda) */}
              <div className="w-32 sm:w-40 aspect-[1/1.4] rounded-lg shadow-2xl overflow-hidden border border-white/20 transform rotate-12 translate-y-3 opacity-75">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80"
                  alt="Ilm"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 ta Asosiy Xususiyat (Client mockupdagi oq kartochkalar) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm flex items-center gap-3.5 hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">AI orqali dizayn</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Tezkor generatsiya</p>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm flex items-center gap-3.5 hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Bir nechta muqobil</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">3-4 xil variant</p>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm flex items-center gap-3.5 hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-pink-600 shrink-0">
            <ThumbsUp className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Sizning didingizga mos</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Aqlli tavsiyalar</p>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm flex items-center gap-3.5 hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Yuqori sifatli</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">PNG, PDF bosmaxona</p>
          </div>
        </div>
      </div>

      {/* ========================================================
          PANEL 2: DIZAYN YARATISH SAHIFASI (ASOSIY ISHCHI QISM)
      ======================================================== */}
      <section id="v2-create-section" className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              Dizayn yaratish sahifasi (asosiy ishchi qism)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Kitob ma’lumotlarini kiriting va AI orqali professional muqova variantlarini yarating
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* CHAP USTUN: Forma (Kitob ma'lumotlari & Uslub va parametrlari) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-indigo-600">
                1. Kitob ma’lumotlari
              </h3>

              {/* Kitob nomi */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kitob nomi <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Masalan: Zamon"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all font-medium"
                />
              </div>

              {/* Muallif */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Muallif <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="Masalan: A. Karimov"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all font-medium"
                />
              </div>

              {/* Janr */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Janr
                </label>
                <select
                  value={formData.genre}
                  onChange={(e) => setFormData(prev => ({ ...prev, genre: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-600 transition-all font-medium"
                >
                  {BOOK_GENRES.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Qisqacha tavsif (Annotatsiya + 54/500 hisoblagich) */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Qisqacha tavsif
                  </label>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {formData.synopsis.length}/500
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={formData.synopsis}
                  onChange={(e) => setFormData(prev => ({ ...prev, synopsis: e.target.value }))}
                  placeholder="Zamon va inson hayoti, o‘zgarishlar, umid va kelajak haqida roman..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all resize-none font-medium"
                />
              </div>
            </div>

            {/* 2. Uslub va parametrlari */}
            <div className="pt-3 border-t border-slate-100 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-indigo-600">
                2. Uslub va parametrlari
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Dizayn uslubi */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Dizayn uslubi
                  </label>
                  <select
                    value={formData.style}
                    onChange={(e) => setFormData(prev => ({ ...prev, style: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-600 font-medium"
                  >
                    {DESIGN_STYLES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Format */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Format
                  </label>
                  <select
                    value={formData.format}
                    onChange={(e) => setFormData(prev => ({ ...prev, format: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-600 font-medium"
                  >
                    {BOOK_FORMATS.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name} ({f.label})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Asosiy ranglar (Doira shaklidagi palitra tanlagich) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Asosiy ranglar
                </label>
                <div className="flex items-center gap-2">
                  {quickColors.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, palette: c.id }))}
                      className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                        formData.palette === c.id
                          ? 'border-indigo-600 scale-110 shadow-md ring-2 ring-indigo-200'
                          : 'border-white shadow-sm hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.color }}
                      title={c.label}
                    >
                      {formData.palette === c.id && (
                        <Check className="w-3.5 h-3.5 text-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Katta binafsha tugma */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onGenerate}
                  disabled={isGenerating || !formData.title || !formData.author}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-sm shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>{generationStep || 'AI variantlarni yaratmoqda...'}</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4" />
                      <span>AI orqali dizayn variantlarini yaratish ✨</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* O'NG USTUN: Misol uchun (Uslublar kartochkalari 3x2) */}
          <div className="lg:col-span-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Misol uchun uslublar:
              </h4>
              <span className="text-[11px] text-indigo-600 font-medium">Tanlash uchun bosing</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {sampleStyles.map((sample) => (
                <div
                  key={sample.id}
                  onClick={() => handleApplySample(sample)}
                  className="group cursor-pointer rounded-xl overflow-hidden bg-white border border-slate-200 hover:border-indigo-500 shadow-sm hover:shadow-md transition-all p-1.5 flex flex-col items-center"
                >
                  <div className="aspect-[2/3] w-full rounded-lg overflow-hidden bg-slate-900 relative">
                    <img
                      src={sample.img}
                      alt={sample.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = DEFAULT_FALLBACK_IMAGES[0];
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 mt-1.5 group-hover:text-indigo-600 transition-colors">
                    {sample.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          PANEL 3: AI GENERATSIYA NATIJALARI (MUQOBIL VARIANTLAR)
      ======================================================== */}
      <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Generatsiya natijalari (muqobil variantlar)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Quyida sizning ma’lumotlaringiz asosida AI tomonidan yaratilgan muqobil dizayn variantlari keltirilgan.
            </p>
          </div>

          <button
            onClick={() => onRegenerateVariant(activeVariantIndex)}
            disabled={isRegenerating}
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-1.5 self-start sm:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin text-indigo-600' : ''}`} />
            <span>Qayta generatsiya qilish</span>
          </button>
        </div>

        {/* 3-4 ta Muqobil variantlar kartochkalari (Client Mockup Panel 3) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {variants.map((variant, index) => {
            const isSelected = index === activeVariantIndex;
            const isReady = variant.loadingStatus === 'ready' || !variant.loadingStatus;
            const isGeneratingThis = variant.loadingStatus === 'generating';
            const isWaitingThis = variant.loadingStatus === 'waiting';

            return (
              <div
                key={variant.id}
                className={`bg-white rounded-2xl border p-3 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3 ${
                  isSelected ? 'border-indigo-600 ring-2 ring-indigo-100' : 'border-slate-200'
                }`}
              >
                {/* 2:3 Vertical Cover Artwork */}
                <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-200 group">
                  {isGeneratingThis ? (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950">
                      <div className="relative mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center animate-pulse">
                          <Wand2 className="w-7 h-7 text-indigo-300 animate-spin" />
                        </div>
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-2">
                        {variant.title} ({variant.conceptBadge})
                      </span>
                      <h4 className="text-white font-bold text-sm">AI rasm chizmoqda... ✨</h4>
                      <p className="text-[11px] text-slate-400 mt-1">Neyrotarmoq variantni shakllantirmoqda</p>
                    </div>
                  ) : isWaitingThis ? (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-900/95 border border-slate-800">
                      <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-3">
                        <Clock className="w-6 h-6 text-amber-400 animate-pulse" />
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 mb-2">
                        Navbatda
                      </span>
                      <h4 className="text-slate-200 font-bold text-xs">{variant.title} tayyorlanmoqda...</h4>
                      <p className="text-[10px] text-slate-400 mt-1">Oldingi variant tayyorlangach avtomatik chiziladi</p>
                    </div>
                  ) : (
                    <>
                      <img
                        src={variant.imageUrl || variant.fallbackUrl || DEFAULT_FALLBACK_IMAGES[index % DEFAULT_FALLBACK_IMAGES.length]}
                        alt={formData.title}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = variant.fallbackUrl || DEFAULT_FALLBACK_IMAGES[index % DEFAULT_FALLBACK_IMAGES.length];
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 p-4 flex flex-col justify-between">
                        <span className="self-start text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-md uppercase tracking-wider">
                          {variant.conceptBadge}
                        </span>
                        <div>
                          <h3 className="font-serif text-lg font-bold text-white leading-tight">
                            {formData.title}
                          </h3>
                          <p className="text-[11px] text-amber-300 font-medium">{formData.author}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Variant nomi va tavsifi */}
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-slate-900">{variant.title}</h4>
                    {isGeneratingThis && (
                      <span className="text-[10px] text-indigo-600 font-bold animate-pulse">Chizilmoqda...</span>
                    )}
                    {isWaitingThis && (
                      <span className="text-[10px] text-amber-600 font-semibold">Navbatda</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{variant.tagline}</p>
                </div>

                {/* 2 ta Tugma: [Tavsiya qilish] va [Yuklab olish] */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => {
                      if (!isReady) return;
                      setActiveVariantIndex(index);
                      const el = document.getElementById('v2-editor-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    disabled={!isReady}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                      !isReady
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : isSelected
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                    }`}
                  >
                    <span>{isReady ? 'Tavsiya qilish' : 'Tayyorlanmoqda...'}</span>
                  </button>

                  <button
                    onClick={() => isReady && handleDownload(variant)}
                    disabled={!isReady}
                    className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                      !isReady
                        ? 'border-slate-100 text-slate-300 cursor-not-allowed'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Yuklab olish</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          PANEL 5: AI TAVSIYALARI SAHIFASI (NIMA UCHUN TAVSIYA ETILDI?)
      ======================================================== */}
      <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-8 space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            AI tavsiyalari (Nima uchun tavsiya etildi?)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Tizim sizning kitob ma’lumotlaringiz va afzalliklaringiz asosida eng mos dizaynlarni tavsiya qiladi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* 1. Eng mos variant */}
          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wide">
                Eng mos variant
              </span>
            </div>

            <div className="aspect-[2/3] w-full max-w-[180px] mx-auto rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-slate-900">
              {variants[0]?.loadingStatus === 'generating' ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-indigo-950 to-slate-900">
                  <Wand2 className="w-6 h-6 text-indigo-400 animate-spin mb-2" />
                  <span className="text-[11px] font-bold text-white">AI chizmoqda...</span>
                  <span className="text-[10px] text-indigo-300 mt-0.5">1-variant</span>
                </div>
              ) : variants[0]?.loadingStatus === 'waiting' ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-slate-900">
                  <Clock className="w-5 h-5 text-amber-400 animate-pulse mb-2" />
                  <span className="text-[11px] font-bold text-slate-300">Tayyorlanmoqda...</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">Navbatda</span>
                </div>
              ) : (
                <img
                  src={variants[0]?.imageUrl || variants[0]?.fallbackUrl || DEFAULT_FALLBACK_IMAGES[0]}
                  alt="Variant 1"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = variants[0]?.fallbackUrl || DEFAULT_FALLBACK_IMAGES[0];
                  }}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="pt-2 border-t border-slate-200 space-y-1.5 text-xs text-slate-700">
              <p className="font-bold text-slate-900">Nima uchun tavsiya etildi?</p>
              <div className="flex items-center gap-1.5 text-emerald-600">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>Janrga to‘liq mos uslub</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-600">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>Ranglar uyg‘unligi va kontrast</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-600">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>Zamonaviy va jozibador ko‘rinish</span>
              </div>
            </div>
          </div>

          {/* 2. Muqobil variant */}
          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wide">
                Muqobil variant
              </span>
            </div>

            <div className="aspect-[2/3] w-full max-w-[180px] mx-auto rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-slate-900">
              {variants[1]?.loadingStatus === 'generating' ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-purple-950 to-slate-900">
                  <Wand2 className="w-6 h-6 text-purple-400 animate-spin mb-2" />
                  <span className="text-[11px] font-bold text-white">AI chizmoqda...</span>
                  <span className="text-[10px] text-purple-300 mt-0.5">2-variant</span>
                </div>
              ) : variants[1]?.loadingStatus === 'waiting' ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-slate-900">
                  <Clock className="w-5 h-5 text-amber-400 animate-pulse mb-2" />
                  <span className="text-[11px] font-bold text-slate-300">Tayyorlanmoqda...</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">Navbatda</span>
                </div>
              ) : (
                <img
                  src={variants[1]?.imageUrl || variants[1]?.fallbackUrl || DEFAULT_FALLBACK_IMAGES[1]}
                  alt="Variant 2"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = variants[1]?.fallbackUrl || DEFAULT_FALLBACK_IMAGES[1];
                  }}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="pt-2 border-t border-slate-200 space-y-1.5 text-xs text-slate-700">
              <p className="font-bold text-slate-900">Nima uchun tavsiya etildi?</p>
              <div className="flex items-center gap-1.5 text-emerald-600">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>Soddalik va minimalistlik</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-600">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>Matn yaxshi o‘qilishi</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-600">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>Nashriyot talablariga mos</span>
              </div>
            </div>
          </div>

          {/* 3. Muqobil variant */}
          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-pink-600 text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
              <span className="text-xs font-bold text-pink-700 uppercase tracking-wide">
                Muqobil variant
              </span>
            </div>

            <div className="aspect-[2/3] w-full max-w-[180px] mx-auto rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-slate-900">
              {variants[2]?.loadingStatus === 'generating' ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-pink-950 to-slate-900">
                  <Wand2 className="w-6 h-6 text-pink-400 animate-spin mb-2" />
                  <span className="text-[11px] font-bold text-white">AI chizmoqda...</span>
                  <span className="text-[10px] text-pink-300 mt-0.5">3-variant</span>
                </div>
              ) : variants[2]?.loadingStatus === 'waiting' ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-slate-900">
                  <Clock className="w-5 h-5 text-amber-400 animate-pulse mb-2" />
                  <span className="text-[11px] font-bold text-slate-300">Tayyorlanmoqda...</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">Navbatda</span>
                </div>
              ) : (
                <img
                  src={variants[2]?.imageUrl || variants[2]?.fallbackUrl || DEFAULT_FALLBACK_IMAGES[2]}
                  alt="Variant 3"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = variants[2]?.fallbackUrl || DEFAULT_FALLBACK_IMAGES[2];
                  }}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="pt-2 border-t border-slate-200 space-y-1.5 text-xs text-slate-700">
              <p className="font-bold text-slate-900">Nima uchun tavsiya etildi?</p>
              <div className="flex items-center gap-1.5 text-emerald-600">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>Yorqin va esda qoladigan dizayn</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-600">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>Maqsadli auditoriyaga mos</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-600">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>Original ijodiy yondashuv</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PANEL 4: TANLANGAN DIZAYNNI TAHRIRLASH (ONLINE EDITOR)
      ======================================================== */}
      <section id="v2-editor-section" className="scroll-mt-20">
        <OnlineEditor
          bookData={formData}
          variant={activeVariant}
          onSaveEdits={(edits) => {
            setFormData(prev => ({
              ...prev,
              title: edits.title,
              author: edits.author
            }));
          }}
        />
      </section>

    </div>
  );
}
