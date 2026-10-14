import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BookForm } from './components/BookForm';
import { AlternativesViewer } from './components/AlternativesViewer';
import { CoverAiV2 } from './components/v2/CoverAiV2';
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

/**
 * Tasvirni neyrotarmoqdan yuklab olinishini xavfsiz kutuvchi yordamchi funksiya
 */
function preloadImageWithTimeout(url, timeoutMs = 32000) {
  return new Promise((resolve) => {
    const img = new Image();
    const timer = setTimeout(() => {
      resolve(false);
    }, timeoutMs);

    img.onload = () => {
      clearTimeout(timer);
      resolve(true);
    };
    img.onerror = () => {
      clearTimeout(timer);
      resolve(false);
    };
    img.src = url;
  });
}

export function App() {
  // Dizayn rejimi: 'v2' (Yorug' CoverAI) yoki 'v1' (Dark MuqovaAI)
  const [designMode, setDesignMode] = useState(() => {
    const saved = localStorage.getItem('coverai_design_mode');
    return saved || 'v2'; // Standart holatda V2 (mijoz xohlagan yorug' rejim)
  });

  const handleSetDesignMode = (mode) => {
    setDesignMode(mode);
    localStorage.setItem('coverai_design_mode', mode);
  };

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
    isbn: defaultPreset.isbn,
    oldCoverImage: null,
    oldCoverName: '',
    oldCoverSize: ''
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('bookcover_ai_settings');
    return saved ? JSON.parse(saved) : { provider: 'pollinations', apiKey: '' };
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('generator'); // 'generator' | 'alternatives'
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);

  // Generatsiya qilingan variantlar ro'yxati
  const [variants, setVariants] = useState(() => {
    const initialVariants = generateAlternativeVariants(formData);
    return initialVariants.map((v, i) => {
      const fallback = generateSvgFallback(formData.title, formData.author, v.id, v.title);
      const mockImg = i === 0 
        ? defaultPreset.mockImages.minimalist 
        : i === 1 
          ? defaultPreset.mockImages.illustration 
          : defaultPreset.mockImages.conceptual;

      return {
        ...v,
        imageUrl: mockImg || fallback,
        fallbackUrl: fallback,
        loadingStatus: 'ready'
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

      setGenerationStep('4/4: Neyrotarmoq variantlarni ketma-ket generatsiya qilmoqda...');

      // 1. Dastlabki holat: Variant A aktiv generatsiyada, Variant B va C navbatda (kutilmoqda)
      const initialList = newVariants.map((v, i) => {
        const fallback = generateSvgFallback(dataToUse.title, dataToUse.author, v.id, v.title);
        return {
          ...v,
          imageUrl: fallback,
          fallbackUrl: fallback,
          loadingStatus: i === 0 ? 'generating' : 'waiting'
        };
      });

      setVariants(initialList);
      setActiveVariantIndex(0);

      if (designMode === 'v1') {
        setActiveTab('alternatives');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById('v2-editor-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }

      // Agar oflayn rejim bo'lsa darhol yakunlaymiz
      if (settings.provider === 'offline') {
        setVariants(prev => prev.map(v => ({ ...v, loadingStatus: 'ready' })));
        return;
      }

      // 2. Ketma-ket (bitta-bitta) neyrotarmoqdan yuklash navbati (Pipeline)
      // Pollinations serveriga bir vaqtda faqat 1 ta so'rov yuboriladi
      // Har bir variantni ketma-ket, tartib bilan generatsiya qilamiz
      (async () => {
        for (let i = 0; i < newVariants.length; i++) {
          // Ushbu variantni aktiv generatsiya holatiga o'tkazamiz
          setVariants(prev => {
            const next = [...prev];
            if (next[i]) {
              next[i] = { ...next[i], loadingStatus: 'generating' };
            }
            return next;
          });

          const v = newVariants[i];
          let chosenUrl = v.fallbackUrl;

          if (settings.provider === 'offline') {
            chosenUrl = v.fallbackUrl;
          } else {
            const fluxUrl = getAiImageUrl(v.prompt, v.seed, 500, 750, settings.apiKey, settings.provider);
            // 1-bosqich: FLUX modeli (25 soniya kutamiz)
            const isFluxSuccess = await preloadImageWithTimeout(fluxUrl, 25000);

            if (isFluxSuccess) {
              chosenUrl = fluxUrl;
            } else {
              // 2-bosqich: FLUX band bo'lsa yoki server cheklov qo'ysa, tezkor Turbo AI modeliga o'tamiz
              const cleanPrompt = encodeURIComponent(v.prompt.trim());
              const fastAiUrl = `https://image.pollinations.ai/prompt/${cleanPrompt}?width=500&height=750&seed=${v.seed}&nologo=true`;
              const isFastSuccess = await preloadImageWithTimeout(fastAiUrl, 12000);

              if (isFastSuccess) {
                chosenUrl = fastAiUrl;
              } else {
                // 3-bosqich: Agar internet umuman bo'lmasa, SVG zaxira
                chosenUrl = v.fallbackUrl;
              }
            }
          }

          // Rasm tayyor bo'lgach, uni o'z o'rniga joylaymiz
          setVariants(prev => {
            const next = [...prev];
            if (next[i]) {
              next[i] = {
                ...next[i],
                imageUrl: chosenUrl,
                loadingStatus: 'ready'
              };
            }
            return next;
          });

          // Server keyingi so'rovda rate limit bermasligi uchun 2000ms tanaffus
          await new Promise(r => setTimeout(r, 2000));
        }
      })();

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
    setVariants(prev => {
      const next = [...prev];
      if (next[index]) {
        next[index] = { ...next[index], loadingStatus: 'generating' };
      }
      return next;
    });

    try {
      const current = variants[index];
      const newSeed = Math.floor(Math.random() * 900000) + 100000;
      const fallback = generateSvgFallback(formData.title, formData.author, current.id, current.title);
      let newUrl = fallback;

      if (settings.provider !== 'offline') {
        const fluxUrl = getAiImageUrl(current.prompt, newSeed, 500, 750, settings.apiKey, settings.provider);
        const isFluxSuccess = await preloadImageWithTimeout(fluxUrl, 25000);
        if (isFluxSuccess) {
          newUrl = fluxUrl;
        } else {
          const cleanPrompt = encodeURIComponent(current.prompt.trim());
          const fastAiUrl = `https://image.pollinations.ai/prompt/${cleanPrompt}?width=500&height=750&seed=${newSeed}&nologo=true`;
          const isFastSuccess = await preloadImageWithTimeout(fastAiUrl, 12000);
          if (isFastSuccess) {
            newUrl = fastAiUrl;
          }
        }
      }

      setVariants(prev => {
        const next = [...prev];
        next[index] = {
          ...next[index],
          seed: newSeed,
          imageUrl: newUrl,
          fallbackUrl: fallback,
          loadingStatus: 'ready'
        };
        return next;
      });
    } catch (e) {
      console.error(e);
      setVariants(prev => {
        const next = [...prev];
        if (next[index]) next[index] = { ...next[index], loadingStatus: 'ready' };
        return next;
      });
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
      const fallback = generateSvgFallback(updated.title, updated.author, v.id, v.title);
      const img = i === 0 
        ? preset.mockImages.minimalist 
        : i === 1 
          ? preset.mockImages.illustration 
          : preset.mockImages.conceptual;
      return {
        ...v,
        imageUrl: img || fallback,
        fallbackUrl: fallback
      };
    });

    setVariants(withImages);
    setActiveVariantIndex(0);

    if (designMode === 'v1') {
      setActiveTab('alternatives');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById('v2-create-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
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
      isbn: '978-9943-' + Math.floor(100000 + Math.random() * 900000),
      oldCoverImage: null,
      oldCoverName: '',
      oldCoverSize: ''
    });
    setActiveTab('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isV2 = designMode === 'v2';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      isV2 ? 'bg-[#f8fafc] text-slate-800' : 'bg-[#090d16] text-slate-100 selection:bg-indigo-500 selection:text-white'
    }`}>
      {/* Yuqori navigatsiya paneli (V1/V2 tugmasi bilan) */}
      <Navbar
        onOpenSettings={() => setIsSettingsOpen(true)}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        designMode={designMode}
        setDesignMode={handleSetDesignMode}
      />

      <main className="flex-1 pb-16">
        {/* ========================================================
            REJIM 2: V2 COVERAI LIGHT MODE (Mijozning skrinshotidagi dizayn)
        ======================================================== */}
        {isV2 ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
            <CoverAiV2
              formData={formData}
              setFormData={setFormData}
              variants={variants}
              activeVariantIndex={activeVariantIndex}
              setActiveVariantIndex={setActiveVariantIndex}
              onGenerate={() => handleGenerate()}
              isGenerating={isGenerating}
              generationStep={generationStep}
              onRegenerateVariant={handleRegenerateVariant}
              isRegenerating={isRegenerating}
            />
          </div>
        ) : (
          /* ========================================================
              REJIM 1: V1 DARK MODE (Oldingi to'q rejim)
          ======================================================== */
          <div className="space-y-6 sm:space-y-10">
            {activeTab === 'generator' && (
              <>
                <HeroSection
                  onSelectPreset={handleSelectPreset}
                  onStartNew={handleStartNew}
                  onStartCreate={() => {
                    const el = document.getElementById('generator-form-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                />

                <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 space-y-6">
                  <div id="generator-form-section">
                    <BookForm
                      formData={formData}
                      setFormData={setFormData}
                      onGenerate={() => handleGenerate()}
                      isGenerating={isGenerating}
                      generationStep={generationStep}
                    />
                  </div>

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
              </>
            )}

            {activeTab === 'alternatives' && (
              <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-5">
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

                <AlternativesViewer
                  variants={variants}
                  activeVariantIndex={activeVariantIndex}
                  setActiveVariantIndex={setActiveVariantIndex}
                  bookData={formData}
                  onRegenerateVariant={handleRegenerateVariant}
                  isRegenerating={isRegenerating}
                />
              </div>
            )}
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
      <footer className={`border-t py-8 text-xs transition-colors duration-300 ${
        isV2 
          ? 'bg-white border-slate-200 text-slate-600' 
          : 'bg-slate-950 border-slate-800/80 text-slate-400'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 shrink-0">
              <BookMarked className="w-4 h-4" />
            </div>
            <div>
              <span className={`font-bold block text-sm ${isV2 ? 'text-slate-900' : 'text-slate-200'}`}>
                CoverAI — Sun’iy Intellekt Muqova Tizimi
              </span>
              <p className={`text-[11px] max-w-md ${isV2 ? 'text-slate-500' : 'text-slate-400'}`}>
                Kitob muqovasining muqobil dizayn variantlarini tavsiya qiluvchi AI tizimi
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-right">
            <div className={`px-4 py-2 rounded-xl flex items-center gap-2.5 shadow-sm border ${
              isV2
                ? 'bg-slate-50 border-slate-200 shadow-slate-100'
                : 'bg-indigo-950/70 border-indigo-800/60 shadow-indigo-950/50'
            }`}>
              <GraduationCap className={`w-4 h-4 shrink-0 ${isV2 ? 'text-indigo-600' : 'text-amber-400'}`} />
              <div className="text-left">
                <span className={`text-[10px] font-mono uppercase tracking-wider block font-semibold ${
                  isV2 ? 'text-indigo-600' : 'text-indigo-300'
                }`}>
                  Tadqiqotchi & Loyiha Muallifi:
                </span>
                <span className={`text-xs font-bold tracking-wide ${
                  isV2 ? 'text-slate-900' : 'text-white'
                }`}>
                  Anvarova Xurshidabonu Xamidillayevna
                </span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 font-mono">
              <span>{isV2 ? 'CoverAI v2.0 Light' : 'MuqovaAI v1.0 Dark'} • 2026</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
