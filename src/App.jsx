import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BookForm } from './components/BookForm';
import { AlternativesViewer } from './components/AlternativesViewer';
import { ResearchSection } from './components/ResearchSection';
import { ApiSettingsModal } from './components/ApiSettingsModal';
import { 
  SHOWCASE_PRESETS, 
  BOOK_FORMATS, 
  DESIGN_STYLES, 
  BOOK_GENRES, 
  COLOR_PALETTES 
} from './constants/presets';
import { 
  generateAlternativeVariants, 
  getAiImageUrl, 
  generateSvgFallback 
} from './services/aiService';
import { 
  Sparkles, 
  BookMarked, 
  GraduationCap, 
  ArrowLeft, 
  ArrowRight, 
  PlusCircle, 
  SlidersHorizontal 
} from 'lucide-react';

export function App() {
  // Boshlang'ich qiymat sifatida 1-namunadan foydalanamiz
  const defaultPreset = SHOWCASE_PRESETS[0];

  const [formData, setFormData] = useState({
    title: defaultPreset.title,
    author: defaultPreset.author,
    edition: defaultPreset.edition,
    genre: defaultPreset.genre,
    synopsis: defaultPreset.synopsis,
    style: defaultPreset.style,
    palette: defaultPreset.palette,
    format: defaultPreset.format,
    pages: defaultPreset.pages,
    paperWeight: defaultPreset.paperWeight,
    isbn: defaultPreset.isbn
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('bookcover_ai_settings');
    return saved ? JSON.parse(saved) : { provider: 'pollinations', apiKey: '' };
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('generator'); // 'generator' | 'alternatives' | 'research'
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);

  // Generatsiya qilingan variantlar ro'yxati
  const [variants, setVariants] = useState(() => {
    const initialVariants = generateAlternativeVariants(formData);
    return initialVariants.map((v, i) => {
      const mockImg = i === 0 
        ? defaultPreset.mockImages.minimalist 
        : i === 1 
          ? defaultPreset.mockImages.illustration 
          : defaultPreset.mockImages.conceptual;

      return {
        ...v,
        imageUrl: mockImg || getAiImageUrl(v.prompt, v.seed)
      };
    });
  });

  // Sozlamalarni saqlash
  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem('bookcover_ai_settings', JSON.stringify(newSettings));
  };

  // Asosiy generatsiya jarayoni
  const handleGenerate = async (customData = null) => {
    const dataToUse = customData || formData;
    setIsGenerating(true);

    try {
      setGenerationStep('1/4: Semantik annotatsiya va kitob parametrlari tahlil qilinmoqda...');
      await new Promise(r => setTimeout(r, 450));

      setGenerationStep('2/4: 3 xil muqobil uslub (Tipografik, Illyustrativ, Konseptual) promptlari shakllantirilmoqda...');
      await new Promise(r => setTimeout(r, 450));

      setGenerationStep('3/4: Bosmaxona o‘lchamlari va umurtqa qalinligi hisoblanmoqda...');
      const newVariants = generateAlternativeVariants(dataToUse);
      await new Promise(r => setTimeout(r, 400));

      setGenerationStep('4/4: Neyrotarmoq orqali muqova kompozitsiyalari sintezlanmoqda...');

      const variantsWithImages = newVariants.map((v) => {
        let url;
        if (settings.provider === 'offline') {
          url = generateSvgFallback(dataToUse.title, dataToUse.author, v.id, v.styleName);
        } else {
          url = getAiImageUrl(v.prompt, v.seed, 768, 1088, settings.apiKey, settings.provider);
        }
        return {
          ...v,
          imageUrl: url
        };
      });

      await new Promise(r => setTimeout(r, 500));
      setVariants(variantsWithImages);
      setActiveVariantIndex(0);

      // Natijalarni ko'rish uchun avtomatik "Muqobil Variantlar" tabiga o'tkazamiz!
      setActiveTab('alternatives');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Generatsiya xatosi:', err);
    } finally {
      setIsGenerating(false);
      setGenerationStep('');
    }
  };

  // Alohida bitta variantni qayta yaratish
  const handleRegenerateVariant = async (index) => {
    setIsRegenerating(true);
    try {
      const current = variants[index];
      const newSeed = Math.floor(Math.random() * 900000) + 100000;
      let newUrl;

      if (settings.provider === 'offline') {
        newUrl = generateSvgFallback(formData.title, formData.author, current.id, current.styleName);
      } else {
        newUrl = getAiImageUrl(current.prompt, newSeed, 768, 1088, settings.apiKey, settings.provider);
      }

      await new Promise(r => setTimeout(r, 600));

      setVariants(prev => {
        const next = [...prev];
        next[index] = {
          ...next[index],
          seed: newSeed,
          imageUrl: newUrl
        };
        return next;
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsRegenerating(false);
    }
  };

  // Taqdimot namunalaridan birini tanlash
  const handleSelectPreset = (preset) => {
    const updated = {
      title: preset.title,
      author: preset.author,
      edition: preset.edition,
      genre: preset.genre,
      synopsis: preset.synopsis,
      style: preset.style,
      palette: preset.palette,
      format: preset.format,
      pages: preset.pages,
      paperWeight: preset.paperWeight,
      isbn: preset.isbn
    };
    setFormData(updated);

    const generated = generateAlternativeVariants(updated);
    const withImages = generated.map((v, i) => {
      const img = i === 0 
        ? preset.mockImages.minimalist 
        : i === 1 
          ? preset.mockImages.illustration 
          : preset.mockImages.conceptual;
      return {
        ...v,
        imageUrl: img || getAiImageUrl(v.prompt, v.seed)
      };
    });

    setVariants(withImages);
    setActiveVariantIndex(0);

    // Namuna tanlanganda darhol natijalar vitrinasiga o'tamiz
    setActiveTab('alternatives');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Yangi bo'sh forma boshlash
  const handleStartNew = () => {
    setFormData({
      title: '',
      author: '',
      edition: '1-nashr',
      genre: 'fiction',
      synopsis: '',
      style: 'minimalist',
      palette: 'deep_mystery',
      format: 'a5',
      pages: 200,
      paperWeight: 80,
      isbn: '978-9943-' + Math.floor(100000 + Math.random() * 900000)
    });
    setActiveTab('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Yuqori navigatsiya paneli */}
      <Navbar
        onOpenSettings={() => setIsSettingsOpen(true)}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <main className="flex-1 pb-16">
        {/* ========================================================
            TAB 1: AI GENERATOR (Forma va Tayyor Namunalar)
        ======================================================== */}
        {activeTab === 'generator' && (
          <div className="space-y-6 sm:space-y-10">
            {/* Hero & Presets Section */}
            <HeroSection
              onSelectPreset={handleSelectPreset}
              onStartNew={handleStartNew}
              onStartCreate={() => {
                const el = document.getElementById('generator-form-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 space-y-6">
              {/* Kitob ma'lumotlarini kiritish formasi */}
              <div id="generator-form-section">
                <BookForm
                  formData={formData}
                  setFormData={setFormData}
                  onGenerate={() => handleGenerate()}
                  isGenerating={isGenerating}
                  generationStep={generationStep}
                />
              </div>

              {/* Variantlarga o'tish tugmasi */}
              {variants.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      Mavjud muqobil variantlar tayyor ({variants.length} ta dizayn)
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      «{formData.title || 'Kitob'}» uchun yaratilgan 3D mockup va bosmaxona yoyilmalarini ko‘rish
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab('alternatives');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-4 py-2.5 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-all shadow-md shadow-indigo-600/20"
                  >
                    <span>Muqobil Variantlarni Ko‘rish</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: MUQOBIL VARIANTLAR (Faqat Natijalar Vitrinasi)
        ======================================================== */}
        {activeTab === 'alternatives' && (
          <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-5">
            {/* Context Status Bar */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 uppercase tracking-wider">
                    Faol Loyiha
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {(formData.format || 'A5').toUpperCase()} • {formData.pages} bet
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-white truncate max-w-lg">
                  «{formData.title || 'Kitob'}» — <span className="text-slate-300 font-normal">{formData.author}</span>
                </h2>
              </div>

              {/* Navigation Back / New Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setActiveTab('generator');
                    window.scrollTo({ top: 350, behavior: 'smooth' });
                  }}
                  className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-white border border-slate-700 transition-all flex items-center justify-center gap-1.5"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Parametrlarni Tahrirlash</span>
                </button>

                <button
                  onClick={handleStartNew}
                  className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-xs font-semibold text-indigo-300 hover:text-white border border-indigo-500/30 transition-all flex items-center justify-center gap-1.5"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Yangi Kitob</span>
                </button>
              </div>
            </div>

            {/* Alternatives Viewer Component */}
            <div id="alternatives-section">
              <AlternativesViewer
                variants={variants}
                activeVariantIndex={activeVariantIndex}
                setActiveVariantIndex={setActiveVariantIndex}
                bookData={formData}
                onRegenerateVariant={handleRegenerateVariant}
                isRegenerating={isRegenerating}
              />
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: ILMIY ASOS & TAHLIL (Prezentatsiya va Himoya)
        ======================================================== */}
        {activeTab === 'research' && (
          <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-6">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 uppercase tracking-wider">
                  Ilmiy Himoya & Prezentatsiya
                </span>
                <h2 className="text-base sm:text-lg font-bold text-white mt-1">
                  Tadqiqot Metodologiyasi va Ekspert Bahosi
                </h2>
              </div>

              <button
                onClick={() => {
                  setActiveTab('generator');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-white border border-slate-700 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Generatorga Qaytish</span>
              </button>
            </div>

            <ResearchSection />
          </div>
        )}
      </main>

      {/* API Sozlamalari Modali */}
      <ApiSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSaveSettings={handleSaveSettings}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/30 flex items-center justify-center text-indigo-400 border border-indigo-500/20 shrink-0">
              <BookMarked className="w-4 h-4" />
            </div>
            <div>
              <span className="text-slate-200 font-bold block text-sm">
                MuqovaAI — Intellektual Muqova Dizayn Tizimi
              </span>
              <p className="text-[11px] text-slate-500 max-w-md">
                «Kitob muqovasini Muqobil dizayn variantlarini tavsiya qiluvchi AI tizimini ishlab chiqish va tadqiq qilish»
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-right">
            <div className="bg-indigo-950/70 border border-indigo-800/60 px-4 py-2 rounded-xl flex items-center gap-2.5 shadow-lg shadow-indigo-950/50">
              <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="text-left">
                <span className="text-[10px] text-indigo-300 font-mono uppercase tracking-wider block font-semibold">
                  Tadqiqotchi & Loyiha Muallifi:
                </span>
                <span className="text-xs font-bold text-white tracking-wide">
                  Anvarova Xurshidabonu Xamidillayevna
                </span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 font-mono">
              <span>Ilmiy MVP • 2026</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
