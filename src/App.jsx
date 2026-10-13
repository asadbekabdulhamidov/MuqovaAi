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
import { Sparkles, BookMarked, GraduationCap, ChevronDown } from 'lucide-react';

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
    // Dastlabki tayyor 3 ta muqobil variant
    const initialVariants = generateAlternativeVariants(formData);
    return initialVariants.map((v, i) => {
      // 1-namuna rasmlari
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
      // 1-bosqich
      setGenerationStep('1/4: Semantik annotatsiya va kitob parametrlari tahlil qilinmoqda...');
      await new Promise(r => setTimeout(r, 450));

      // 2-bosqich
      setGenerationStep('2/4: 3 xil muqobil uslub (Tipografik, Illyustrativ, Konseptual) promptlari shakllantirilmoqda...');
      await new Promise(r => setTimeout(r, 450));

      // 3-bosqich
      setGenerationStep('3/4: Bosmaxona o‘lchamlari va umurtqa qalinligi hisoblanmoqda...');
      const newVariants = generateAlternativeVariants(dataToUse);
      await new Promise(r => setTimeout(r, 400));

      // 4-bosqich
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

      // Agar generator tabida bo'lsa, natijaga silliq tushiramiz
      const resultsElement = document.getElementById('alternatives-section');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
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

    // Namunadagi oldindan tayyor rasmlarni yuklash
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

    // Natijaga yo'naltirish
    const el = document.getElementById('alternatives-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Yuqori navigatsiya paneli */}
      <Navbar
        onOpenSettings={() => setIsSettingsOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="flex-1 pb-16">
        {/* Ilmiy kirish va Prezentatsiya Hero bo'limi */}
        <HeroSection
          onSelectPreset={handleSelectPreset}
          onStartNew={() => {
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
            window.scrollTo({ top: 380, behavior: 'smooth' });
          }}
        />

        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 mt-5 sm:mt-10 space-y-6 sm:space-y-12">
          
          {/* Asosiy Ishchi Maydon: Forma va Natijalar */}
          {(activeTab === 'generator' || activeTab === 'alternatives') && (
            <div className="space-y-12">
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

              {/* Muqobil Variantlar Natijasi Vitrinasi */}
              <div id="alternatives-section" className="pt-4 scroll-mt-24">
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

          {/* Ilmiy Tadqiqot va Qiyosiy Tahlil Bo'limi */}
          <div className={activeTab === 'research' ? 'block' : 'mt-16'}>
            <ResearchSection />
          </div>
        </div>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-600/30 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
              <BookMarked className="w-3.5 h-3.5" />
            </div>
            <span className="text-slate-300 font-semibold">
              MuqovaAI — Kitob muqovasining muqobil dizayn variantlarini tavsiya qiluvchi AI tizimi
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500 font-mono">
            <span>Ilmiy-amaliy tadqiqot MVP</span>
            <span>•</span>
            <span>React & Tailwind CSS</span>
            <span>•</span>
            <span>2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
