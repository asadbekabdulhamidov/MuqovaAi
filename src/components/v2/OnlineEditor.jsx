import React, { useState, useEffect } from 'react';
import { 
  Type, 
  Sliders, 
  Palette, 
  Download, 
  RotateCcw, 
  ZoomIn, 
  Check, 
  Sparkles, 
  Eye, 
  Layers,
  Save
} from 'lucide-react';
import { downloadCoverAsPng } from '../../utils/canvasExport';
import { DEFAULT_FALLBACK_IMAGES } from '../../services/aiService';

export function OnlineEditor({ bookData, variant, onSaveEdits }) {
  const [titleText, setTitleText] = useState(bookData?.title || 'ZAMON');
  const [authorText, setAuthorText] = useState(bookData?.author || 'A. Karimov');
  const [fontFamily, setFontFamily] = useState('Playfair Display');
  const [fontSize, setFontSize] = useState(32);
  const [textColor, setTextColor] = useState('#ffffff');
  const [textAlign, setTextAlign] = useState('center');
  const [isBold, setIsBold] = useState(true);
  const [isItalic, setIsItalic] = useState(false);

  // Rasm filtrlari
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);

  const [appliedNotification, setAppliedNotification] = useState(false);

  // Yuqori formadagi o'zgarishlar bilan darhol avtomatik sinxronlash
  useEffect(() => {
    if (bookData?.title !== undefined) {
      setTitleText(bookData.title);
    }
  }, [bookData?.title]);

  useEffect(() => {
    if (bookData?.author !== undefined) {
      setAuthorText(bookData.author);
    }
  }, [bookData?.author]);

  const handleTitleChange = (val) => {
    setTitleText(val);
    if (onSaveEdits) {
      onSaveEdits({
        title: val,
        author: authorText,
        brightness,
        contrast,
        saturation
      });
    }
  };

  const handleAuthorChange = (val) => {
    setAuthorText(val);
    if (onSaveEdits) {
      onSaveEdits({
        title: titleText,
        author: val,
        brightness,
        contrast,
        saturation
      });
    }
  };

  const handleApplyChanges = () => {
    setAppliedNotification(true);
    setTimeout(() => setAppliedNotification(false), 2000);
    if (onSaveEdits) {
      onSaveEdits({
        title: titleText,
        author: authorText,
        brightness,
        contrast,
        saturation
      });
    }
  };

  const handleResetFilters = () => {
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
  };

  const handleDownload = () => {
    downloadCoverAsPng(
      { ...bookData, title: titleText, author: authorText },
      variant,
      variant?.imageUrl || variant?.fallbackUrl || DEFAULT_FALLBACK_IMAGES[0],
      {
        fontFamily,
        fontSize,
        textColor,
        textAlign,
        isBold,
        isItalic,
        brightness,
        contrast,
        saturation
      }
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-6 space-y-6">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-600" />
            Tanlangan dizaynni tahrirlash (Online Editor)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Muqova matni, shriftlar va rasm filtrlarini real vaqtda sozlang
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetFilters}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all flex items-center gap-1.5"
            title="Filtrlarni tiklash"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Qaytarish</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Yuklab olish</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* CHAP TOMON: Real vaqtda tahrirlanuvchi muqova preview kanvasi */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="relative w-full max-w-[320px] aspect-[1/1.42] rounded-xl overflow-hidden shadow-xl border border-slate-200 group bg-slate-900 select-none">
            
            {/* Rasm (CSS filtrlari bilan jonli o'zgaradi) */}
            <img
              src={variant?.imageUrl || DEFAULT_FALLBACK_IMAGES[0]}
              alt={titleText}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = DEFAULT_FALLBACK_IMAGES[0];
              }}
              className="w-full h-full object-cover transition-all duration-200"
              style={{
                filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`
              }}
            />

            {/* Qoraytiruvchi gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/50 pointer-events-none" />

            {/* Interaktiv tahrirlanuvchi matnlar qatlami */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between z-10 pointer-events-none">
              {/* Yuqori qism: Nashr nishoni */}
              <div className="text-center">
                <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-black/60 text-white backdrop-blur-sm border border-white/20">
                  {bookData.edition || '1-nashr'}
                </span>
              </div>

              {/* Markaziy qism: Sarlavha & Muallif */}
              <div className="space-y-3" style={{ textAlign }}>
                {/* Kitob nomi */}
                <h2
                  className="leading-tight drop-shadow-lg tracking-wide transition-all"
                  style={{
                    fontFamily,
                    fontSize: `${fontSize}px`,
                    color: textColor,
                    fontWeight: isBold ? 'bold' : 'normal',
                    fontStyle: isItalic ? 'italic' : 'normal'
                  }}
                >
                  {titleText}
                </h2>

                <div 
                  className="w-12 h-0.5 bg-amber-400 mx-auto"
                  style={{
                    marginLeft: textAlign === 'left' ? '0' : textAlign === 'right' ? 'auto' : 'auto',
                    marginRight: textAlign === 'right' ? '0' : textAlign === 'left' ? 'auto' : 'auto'
                  }}
                />

                {/* Muallif */}
                <p 
                  className="text-xs uppercase tracking-widest drop-shadow text-amber-200 font-semibold"
                  style={{ color: textColor === '#ffffff' ? '#fef08a' : textColor }}
                >
                  {authorText}
                </p>
              </div>

              {/* Pastki qism */}
              <div className="pt-2 border-t border-white/20 flex items-center justify-between text-[9px] text-slate-300 font-mono">
                <span>{bookData.format?.toUpperCase() || 'A5'} • 300 DPI</span>
                <span>ONLINE EDITOR</span>
              </div>
            </div>
          </div>
        </div>

        {/* O'NG TOMON: Sozlamalar paneli (Matn, Shrift, Rang, Rasm filtrlari) */}
        <div className="lg:col-span-5 space-y-5 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <Type className="w-4 h-4 text-indigo-600" />
              Sozlamalar
            </h4>
            <span className="text-[11px] font-mono text-indigo-600 font-semibold">Jonli Tahrir</span>
          </div>

          {/* 1. Matn kiritish */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kitob nomi (Sarlavha):
              </label>
              <input
                type="text"
                value={titleText}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 font-semibold focus:outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Muallif nomi:
              </label>
              <input
                type="text"
                value={authorText}
                onChange={(e) => handleAuthorChange(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          {/* 2. Shrift va ko'rinish */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Shrift oilasi:
              </label>
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
              >
                <option value="Playfair Display">Playfair Display (Klassik)</option>
                <option value="Plus Jakarta Sans">Plus Jakarta (Zamonaviy)</option>
                <option value="Cinzel">Cinzel (Rimcha / Tarixiy)</option>
                <option value="Inter">Inter (Minimalist)</option>
                <option value="serif">Serif (An'anaviy)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Shrift o‘lchami: ({fontSize}px)
              </label>
              <input
                type="range"
                min="20"
                max="56"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
                className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg mt-2"
              />
            </div>
          </div>

          {/* 3. Rang va Tekislash */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-semibold text-slate-600">Rang:</span>
              <div className="flex items-center gap-1">
                {['#ffffff', '#fef08a', '#93c5fd', '#f43f5e', '#1e293b'].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setTextColor(c)}
                    className={`w-5 h-5 rounded-full border transition-all ${
                      textColor === c ? 'ring-2 ring-indigo-600 scale-110' : 'border-slate-300'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* B / I / Align */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-300">
              <button
                type="button"
                onClick={() => setIsBold(!isBold)}
                className={`w-6 h-6 rounded text-xs font-bold ${isBold ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                B
              </button>
              <button
                type="button"
                onClick={() => setIsItalic(!isItalic)}
                className={`w-6 h-6 rounded text-xs italic font-serif ${isItalic ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                I
              </button>
              <button
                type="button"
                onClick={() => setTextAlign(textAlign === 'center' ? 'left' : textAlign === 'left' ? 'right' : 'center')}
                className="w-6 h-6 rounded text-xs text-slate-600 hover:bg-slate-100 uppercase font-mono"
              >
                {textAlign === 'center' ? '≡' : textAlign === 'left' ? '⇤' : '⇥'}
              </button>
            </div>
          </div>

          {/* 4. Rasm filtrlari (Image Filters: Yorqinlik, Kontrast, To'yinganlik) */}
          <div className="pt-3 border-t border-slate-200 space-y-3">
            <h5 className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>Rasm filtrlari</span>
              <span className="text-[10px] text-slate-400 font-mono">Real-time</span>
            </h5>

            {/* Yorqinlik */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-600">
                <span>Yorqinlik (Brightness):</span>
                <span className="font-mono font-bold text-indigo-600">{brightness}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="150"
                value={brightness}
                onChange={(e) => setBrightness(parseInt(e.target.value, 10))}
                className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
              />
            </div>

            {/* Kontrast */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-600">
                <span>Kontrast (Contrast):</span>
                <span className="font-mono font-bold text-indigo-600">{contrast}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="150"
                value={contrast}
                onChange={(e) => setContrast(parseInt(e.target.value, 10))}
                className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
              />
            </div>

            {/* To'yinganlik */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-600">
                <span>To‘yinganlik (Saturation):</span>
                <span className="font-mono font-bold text-indigo-600">{saturation}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                value={saturation}
                onChange={(e) => setSaturation(parseInt(e.target.value, 10))}
                className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
              />
            </div>
          </div>

          {/* O'zgarishlarni qo'llash tugmasi */}
          <div className="pt-2">
            <button
              onClick={handleApplyChanges}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-1.5"
            >
              {appliedNotification ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>O‘zgarishlar qo‘llandi!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>O‘zgarishlarni qo‘llash</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
