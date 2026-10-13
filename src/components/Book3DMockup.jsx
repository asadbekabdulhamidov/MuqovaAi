import React, { useState } from 'react';
import { RotateCw, Eye, Sparkles, Layers } from 'lucide-react';

export function Book3DMockup({ 
  bookData, 
  variant, 
  coverImage, 
  spineWidthMm = 14 
}) {
  const [rotateY, setRotateY] = useState(-25);
  const [rotateX, setRotateX] = useState(5);
  const [isHovered, setIsHovered] = useState(false);

  // Scaled pixel depth for spine
  const spineDepthPx = Math.max(24, Math.min(60, Math.round(spineWidthMm * 2.2)));

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-900/60 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Background radial glow */}
      <div 
        className="absolute w-80 h-80 rounded-full blur-3xl opacity-25 pointer-events-none transition-all duration-700"
        style={{
          background: variant?.accentColor || '#6366f1',
          top: '20%',
          left: '30%'
        }}
      />

      {/* Control bar */}
      <div className="w-full flex items-center justify-between mb-6 z-10">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-semibold text-slate-300 tracking-wider uppercase flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            3D Interaktiv Mockup
          </span>
        </div>

        {/* Rotation quick presets */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => { setRotateY(-32); setRotateX(8); }}
            className={`px-2.5 py-1 rounded-md transition-all ${
              rotateY === -32 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Perspektiva
          </button>
          <button
            onClick={() => { setRotateY(0); setRotateX(0); }}
            className={`px-2.5 py-1 rounded-md transition-all ${
              rotateY === 0 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            To‘g‘ridan (2D)
          </button>
          <button
            onClick={() => { setRotateY(-55); setRotateX(12); }}
            className={`px-2.5 py-1 rounded-md transition-all ${
              rotateY === -55 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Umurtqa (Spine)
          </button>
        </div>
      </div>

      {/* 3D Scene Viewport */}
      <div 
        className="w-full h-[460px] flex items-center justify-center perspective-1000 cursor-grab active:cursor-grabbing select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Book Container with CSS 3D Transforms */}
        <div
          className="relative transform-style-3d transition-transform duration-500 ease-out"
          style={{
            transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
            width: '240px',
            height: '350px'
          }}
        >
          {/* Front Cover */}
          <div
            className="absolute inset-0 rounded-r-lg overflow-hidden transform-style-3d shadow-2xl origin-left"
            style={{
              transform: `translateZ(${spineDepthPx / 2}px)`,
              boxShadow: '10px 15px 35px rgba(0,0,0,0.6), -2px 0 8px rgba(0,0,0,0.4)'
            }}
          >
            {/* Cover Image Background */}
            <img
              src={coverImage}
              alt={bookData.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Agar internet rasmida xatolik bo'lsa, xatolik chiqmasligi uchun ushlab qoladi
                e.target.style.opacity = '0.9';
              }}
            />

            {/* Glossy / Emboss Overlay lighting effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-white/20 pointer-events-none" />

            {/* Left spine fold shadow */}
            <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/50 via-black/20 to-transparent pointer-events-none" />

            {/* Dynamic Title and Author text typography overlay */}
            <div className="absolute inset-0 p-5 flex flex-col justify-between z-10 pointer-events-none">
              <div className="space-y-1">
                <span className="inline-block px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase bg-black/60 backdrop-blur-md text-white rounded border border-white/20">
                  {bookData.edition || '1-nashr'}
                </span>
                <p className="text-[11px] font-semibold tracking-wider uppercase text-amber-200 drop-shadow-md">
                  {bookData.author}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  {bookData.title}
                </h3>
                <div className="w-12 h-0.5 bg-amber-400/80" />
                <p className="text-[10px] text-slate-200 line-clamp-2 leading-tight drop-shadow">
                  {bookData.synopsis}
                </p>
              </div>

              <div className="pt-2 border-t border-white/20 flex items-center justify-between text-[8px] text-slate-300 font-mono">
                <span>{bookData.format?.toUpperCase()} FORMAT</span>
                <span className="flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-amber-400" /> AI DESIGN
                </span>
              </div>
            </div>
          </div>

          {/* Book Spine (Umurtqa) */}
          <div
            className="absolute top-0 bottom-0 left-0 bg-slate-900 overflow-hidden flex flex-col justify-between py-6 px-1.5 origin-left"
            style={{
              width: `${spineDepthPx}px`,
              transform: `rotateY(-90deg) translateX(-${spineDepthPx}px)`,
              background: `linear-gradient(90deg, #111827 0%, ${variant?.accentColor || '#3730a3'} 40%, #0f172a 100%)`,
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.8)'
            }}
          >
            <div className="text-[7px] text-slate-300 font-mono tracking-wider text-center rotate-90 whitespace-nowrap">
              {bookData.author?.slice(0, 16)}
            </div>

            <div className="text-[9px] font-bold text-white tracking-widest text-center rotate-90 whitespace-nowrap origin-center font-serif drop-shadow">
              {bookData.title?.slice(0, 26)}
            </div>

            <div className="text-[7px] text-amber-300 font-mono text-center rotate-90 whitespace-nowrap">
              {bookData.pages} B.
            </div>
          </div>

          {/* Book Pages Edge (O'ng tomon qog'oz qatlamlari) */}
          <div
            className="absolute top-1 bottom-1 right-0 rounded-r-sm overflow-hidden"
            style={{
              width: `${spineDepthPx - 4}px`,
              transform: `rotateY(90deg) translateZ(238px) translateX(-${spineDepthPx / 2}px)`,
              background: 'repeating-linear-gradient(to right, #f8fafc 0px, #e2e8f0 1px, #cbd5e1 2px, #f1f5f9 3px)',
              boxShadow: 'inset 0 0 8px rgba(0,0,0,0.3)'
            }}
          />

          {/* Book Back Cover (Orqa muqova) */}
          <div
            className="absolute inset-0 rounded-l-lg bg-slate-900 p-5 flex flex-col justify-between text-slate-300 border border-slate-700"
            style={{
              transform: `translateZ(-${spineDepthPx / 2}px) rotateY(180deg)`,
              boxShadow: '-10px 15px 35px rgba(0,0,0,0.7)'
            }}
          >
            <div className="space-y-2">
              <span className="text-[9px] font-bold text-amber-400 tracking-wider uppercase">
                Kitob haqida
              </span>
              <p className="text-[9px] leading-relaxed text-slate-300 line-clamp-6">
                {bookData.synopsis}
              </p>
            </div>

            {/* Barcode & ISBN */}
            <div className="pt-3 border-t border-slate-700 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[8px] font-mono text-slate-400">ISBN:</span>
                <p className="text-[8px] font-mono text-slate-200">{bookData.isbn || '978-9943-01-845-2'}</p>
              </div>
              <div className="bg-white p-1 rounded">
                {/* Simulated barcode */}
                <div className="flex h-6 gap-[1.5px] items-center">
                  {[2,1,3,1,2,3,1,1,2,1,3,2,1,2,1,3,1].map((w, i) => (
                    <div 
                      key={i} 
                      className="bg-black h-full" 
                      style={{ width: `${w}px` }} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive slider for manual tilt control */}
      <div className="w-full max-w-xs mt-4 flex items-center gap-3 text-xs text-slate-400">
        <RotateCw className="w-4 h-4 text-slate-500" />
        <span className="whitespace-nowrap">Burchak:</span>
        <input
          type="range"
          min="-70"
          max="20"
          value={rotateY}
          onChange={(e) => setRotateY(parseInt(e.target.value, 10))}
          className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
        />
        <span className="font-mono text-slate-300 w-8 text-right">{rotateY}°</span>
      </div>

      <div className="mt-2 text-[11px] text-slate-500 text-center">
        💡 Sichqoncha orqali slayderni siljiting yoki burchak tugmalarini bosing
      </div>
    </div>
  );
}
