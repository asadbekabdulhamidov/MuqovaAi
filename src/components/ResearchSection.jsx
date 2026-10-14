import React, { useState } from 'react';
import { 
  GraduationCap, 
  BrainCircuit, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Sparkles, 
  Award, 
  Star, 
  Layers, 
  Printer, 
  Send
} from 'lucide-react';

export function ResearchSection() {
  // Dizaynerlar va ekspertlar baholash so'rovnomasi (Interactive Likert Evaluation)
  const [scores, setScores] = useState({
    aesthetic: 5,
    relevance: 5,
    diversity: 5,
    printReady: 5,
    usability: 5
  });

  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [expertComment, setExpertComment] = useState('');

  const criteria = [
    { id: 'aesthetic', name: 'Estetik va kompozitsion jozibadorlik', desc: 'Ranglar uyg‘unligi, vizual iyerarxiya va zamonaviy grafika darajasi' },
    { id: 'relevance', name: 'Kitob mazmuni va janriga muvofiqligi', desc: 'Kiritilgan annotatsiya va janr ruhiyatining muqovada to‘g‘ri aks etishi' },
    { id: 'diversity', name: 'Muqobil variantlarning xilma-xilligi', desc: 'Taklif etilgan 3 ta variantning bir-biridan tubdan farqlanishi' },
    { id: 'printReady', name: 'Bosmaxona talablariga moslik', desc: 'Umurtqa hisobi, kesim zonalari (bleed) va o‘lchamlarning to‘g‘riligi' },
    { id: 'usability', name: 'Tizimning tezkorligi va qulayligi (UX)', desc: 'Interfeys soddaligi, 3D mockup va eksport vositalarining ishlashi' }
  ];

  // O'rtacha ilmiy bahoni hisoblash
  const avgScore = (
    Object.values(scores).reduce((a, b) => a + b, 0) / criteria.length
  ).toFixed(1);

  const handleScoreChange = (id, val) => {
    setScores(prev => ({ ...prev, [id]: val }));
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
  };

  return (
    <section id="research-section" className="space-y-10 py-6">
      {/* 1. Ilmiy ish haqida kirish banneri */}
      <div className="bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/80 rounded-2xl border border-indigo-800/40 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              Ilmiy Tadqiqot Konsepsiyasi
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
              <Award className="w-4 h-4 text-amber-400" />
              Tadqiqotchi: Anvarova Xurshidabonu Xamidillayevna
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
            «Kitob muqovasini Muqobil dizayn variantlarini tavsiya qiluvchi AI tizimini ishlab chiqish va tadqiq qilish»
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Mazkur tadqiqot ishi kitob nashriyotlari va dizaynerlar faoliyatida vaqt va resurs sarfini minimallashtirish, sun’iy intellekt asosida ko‘p mezonli muqobil dizayn variantlarini avtomatlashtirilgan tarzda shakllantirish hamda bosmaxona standartlariga to‘liq javob beruvchi maketlarni yaratishga bag‘ishlangan.
          </p>
        </div>
      </div>

      {/* 2. An'anaviy usul vs MuqovaAI qiyosiy tahlili */}
      <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-800 p-4 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Qiyosiy Samaradorlik Tahlili
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              An’anaviy noshirlik jarayoni hamda taklif etilayotgan AI tizimining ilmiy-amaliy taqqoslanishi
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800 self-start sm:self-auto">
            Vaqt tejalishi: ~94%
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950/80 text-slate-300 font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Taqqoslash Mezoni</th>
                <th className="py-3 px-4 text-rose-300">An’anaviy Jarayon</th>
                <th className="py-3 px-4 text-emerald-300">Taklif Etilayotgan AI Tizimi (MuqovaAI)</th>
                <th className="py-3 px-4 text-indigo-300">Ilmiy & Amaliy Samarasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30">
                <td className="py-3 px-4 font-semibold text-white flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> Dastlabki maket vaqti
                </td>
                <td className="py-3 px-4 text-rose-300">3 — 7 ish kuni</td>
                <td className="py-3 px-4 text-emerald-300 font-bold">15 — 30 soniya</td>
                <td className="py-3 px-4 text-slate-400">Jarayon 94% ga tezlashadi</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-3 px-4 font-semibold text-white flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-slate-400" /> Muqobil variantlar
                </td>
                <td className="py-3 px-4 text-rose-300">1 — 2 ta (cheklangan)</td>
                <td className="py-3 px-4 text-emerald-300 font-bold">3 ta tubdan farqli yo‘nalish (cheksiz)</td>
                <td className="py-3 px-4 text-slate-400">Muallifga tanlash erkinligi beriladi</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-3 px-4 font-semibold text-white flex items-center gap-1.5">
                  <Printer className="w-3.5 h-3.5 text-slate-400" /> Bosmaxona tayyorgarligi
                </td>
                <td className="py-3 px-4 text-rose-300">Dizayner qo‘lda umurtqa va bleed hisoblaydi</td>
                <td className="py-3 px-4 text-emerald-300 font-bold">Avtomatik hisob va texnik pasport</td>
                <td className="py-3 px-4 text-slate-400">Bosmadagi xatolar xavfi bartaraf etiladi</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-3 px-4 font-semibold text-white flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-slate-400" /> Dastlabki xarajat
                </td>
                <td className="py-3 px-4 text-rose-300">50$ — 300$ (Har bir variant uchun)</td>
                <td className="py-3 px-4 text-emerald-300 font-bold">Minimal (0$ — 0.05$)</td>
                <td className="py-3 px-4 text-slate-400">Noshir va muallif budjeti tejaladi</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Tizim Arxitekturasi va Algoritmi */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 hover:border-indigo-500/40 transition-colors space-y-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xs">
            01
          </div>
          <h4 className="font-bold text-sm text-white">Semantik Annotatsiya Tahlili</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Kitob nomi, annotatsiyasi va janri matnli NLP tahlili orqali asosiy vizual metaforalar va hissiy kayfiyat kodlariga ajratiladi.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 hover:border-purple-500/40 transition-colors space-y-2">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-xs">
            02
          </div>
          <h4 className="font-bold text-sm text-white">Ko‘p Mezonli Neyrotarmoq Sintezi</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Generativ neyrotarmoq (FLUX/SDXL) bir vaqtning o‘zida 3 xil fundamental dizayn yo‘nalishi: Minimalist, Illyustrativ va Konseptual kompozitsiyalarni generatsiya qiladi.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 hover:border-emerald-500/40 transition-colors space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs">
            03
          </div>
          <h4 className="font-bold text-sm text-white">Poligrafik Standartlashtirish</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Sahifalar soniga qarab umurtqa qalinligi hisoblanadi, 3D interaktiv kitob renderi va bosmaxona uchun to‘liq yoyilma shakllantiriladi.
          </p>
        </div>
      </div>

      {/* 4. Dizaynerlar va Ekspertlar Baholash So'rovnomasi (Interactive Likert Evaluation) */}
      <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-indigo-900/40 p-4 sm:p-8 shadow-2xl relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-white">
                Dizaynerlar va Ekspertlar Baholash Tizimi
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Prezentatsiya ishtirokchilari tizim natijalarini Likert shkalasi (1 dan 5 gacha) bo‘yicha baholashlari mumkin
            </p>
          </div>

          {/* Average live score pill */}
          <div className="flex items-center gap-3 bg-indigo-950/80 border border-indigo-700/60 p-3 rounded-xl self-start sm:self-auto">
            <div className="text-right">
              <span className="text-[10px] text-indigo-300 uppercase tracking-wider font-semibold block">
                O‘rtacha Ekspert Bahosi
              </span>
              <span className="text-2xl font-black text-amber-400 font-mono">
                {avgScore} <span className="text-xs text-slate-400 font-normal">/ 5.0</span>
              </span>
            </div>
            <div className="flex text-amber-400">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-4 h-4 ${s <= Math.round(avgScore) ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {feedbackSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">Ekspert baholashingiz muvaffaqiyatli saqlandi!</h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Ushbu natijalar ilmiy tadqiqot dissertatsiyasining amaliy sinov va tadbiq qismiga kiritiladi. Fikringiz uchun tashakkur!
            </p>
            <button
              onClick={() => setFeedbackSubmitted(false)}
              className="mt-2 text-xs text-indigo-400 hover:underline"
            >
              Qayta baholash
            </button>
          </div>
        ) : (
          <form onSubmit={handleFeedbackSubmit} className="pt-6 space-y-5">
            <div className="space-y-4">
              {criteria.map((item) => (
                <div key={item.id} className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <h5 className="text-xs font-bold text-slate-200">{item.name}</h5>
                    <p className="text-[11px] text-slate-400">{item.desc}</p>
                  </div>

                  {/* 1-5 Star buttons */}
                  <div className="flex items-center gap-1.5 self-end sm:self-auto">
                    {[1, 2, 3, 4, 5].map((val) => {
                      const isSelected = scores[item.id] >= val;
                      return (
                        <button
                          type="button"
                          key={val}
                          onClick={() => handleScoreChange(item.id, val)}
                          className={`w-8 h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                            isSelected
                              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                              : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                          }`}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Optional expert comment */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Dizayner / Ekspert xulosasi va takliflari (ixtiyoriy):
              </label>
              <textarea
                rows={2}
                value={expertComment}
                onChange={(e) => setExpertComment(e.target.value)}
                placeholder="Loyiha bo‘yicha qo‘shimcha ilmiy-amaliy takliflaringizni yozing..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Baholash Natijasini Tasdiqlash</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
