import React, { useState } from 'react';
import { X, Sparkles, Key, Shield, Check, Cpu } from 'lucide-react';

export function ApiSettingsModal({ isOpen, onClose, settings, onSaveSettings }) {
  const [provider, setProvider] = useState(settings?.provider || 'pollinations');
  const [apiKey, setApiKey] = useState(settings?.apiKey || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSaveSettings({ provider, apiKey });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">AI Dvigateli va Integratsiya Sozlamalari</h3>
            <p className="text-xs text-slate-400">Muqovalarni generatsiya qilish uchun AI manbasini tanlang</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="mt-5 space-y-5">
          {/* AI Providers */}
          <div className="space-y-2.5">
            <label className="block text-xs font-semibold text-slate-300">
              Generativ AI Provayderi:
            </label>

            {/* Provider 1: Pollinations (Free & Default) */}
            <div
              onClick={() => setProvider('pollinations')}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                provider === 'pollinations'
                  ? 'bg-indigo-950/60 border-indigo-500 ring-1 ring-indigo-500'
                  : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-white">Pollinations AI (FLUX & Turbo)</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    BEPUL • API KALITSIZ
                  </span>
                </div>
                {provider === 'pollinations' && <Check className="w-4 h-4 text-indigo-400" />}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                To‘g‘ridan-to‘g‘ri ishlaydi, hech qanday to‘lov yoki ro‘yxatdan o‘tish shart emas. Ta’lim va ilmiy taqdimotlar uchun tavsiya etiladi.
              </p>
            </div>

            {/* Provider 2: OpenAI DALL-E 3 */}
            <div
              onClick={() => setProvider('openai')}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                provider === 'openai'
                  ? 'bg-indigo-950/60 border-indigo-500 ring-1 ring-indigo-500'
                  : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-white">OpenAI DALL-E 3 (Shaxsiy API kalit)</span>
                {provider === 'openai' && <Check className="w-4 h-4 text-indigo-400" />}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Agar o‘zingizning OpenAI platformangizdagi API kalitingiz bo‘lsa, to‘g‘ridan-to‘g‘ri ulashingiz mumkin.
              </p>
            </div>

            {/* Provider 3: Offline Studio */}
            <div
              onClick={() => setProvider('offline')}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                provider === 'offline'
                  ? 'bg-indigo-950/60 border-indigo-500 ring-1 ring-indigo-500'
                  : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-white">Lokal Vektor Generator (Offline SVG)</span>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-800">
                    Offline
                  </span>
                </div>
                {provider === 'offline' && <Check className="w-4 h-4 text-indigo-400" />}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Internet uzilib qolgan taqdirda taqdimot buzilmasligi uchun dasturiy grafik muqovalarni yaratadi.
              </p>
            </div>
          </div>

          {/* API Key field if OpenAI */}
          {provider === 'openai' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-indigo-400" />
                OpenAI API Key (sk-...)
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-proj-..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-indigo-500"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                API kalit brauzeringiz xotirasida (localStorage) xavfsiz saqlanadi, tashqariga uzatilmaydi.
              </span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Saqlandi!</span>
                </>
              ) : (
                <span>Saqlash</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
