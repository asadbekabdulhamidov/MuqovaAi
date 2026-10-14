import { DESIGN_STYLES, COLOR_PALETTES, BOOK_FORMATS } from '../constants/presets';

/**
 * Bosmaxona uchun umurtqa (spine) qalinligini aniq hisoblash
 * Formula: Sahifalar soni / 2 * qog'oz qalinligi (mm) + muqova karton qalinligi (1.5mm)
 */
export function calculateSpineWidth(pages, paperWeight = 80) {
  const pageCount = parseInt(pages, 10) || 200;
  // 80g qog'oz ~ 0.052 mm per sahifa (varaq qalinligi ~0.104 mm)
  // 100g qog'oz ~ 0.065 mm per sahifa (varaq qalinligi ~0.130 mm)
  const factor = paperWeight >= 100 ? 0.062 : 0.052;
  const spine = (pageCount * factor) + 1.5;
  return Math.max(4, Math.round(spine * 10) / 10); // kamida 4 mm
}

/**
 * 3 ta muqobil variant uchun prompt va tahliliy tushuntirishlarni shakllantirish
 */
export function generateAlternativeVariants(bookData) {
  const format = BOOK_FORMATS.find(f => f.id === bookData.format) || BOOK_FORMATS[0];
  const spineMm = calculateSpineWidth(bookData.pages, bookData.paperWeight);
  const palette = COLOR_PALETTES.find(p => p.id === bookData.palette) || COLOR_PALETTES[0];
  const styleObj = DESIGN_STYLES.find(s => s.id === bookData.style) || DESIGN_STYLES[0];

  const seedA = Math.floor(Math.random() * 900000) + 100000;
  const seedB = seedA + 137;
  const seedC = seedA + 942;

  // Variant A: Tipografik & Minimalist
  const promptA = `Award-winning book cover, minimalist Swiss typography design for "${bookData.title}". Author "${bookData.author}". Theme: ${bookData.synopsis.slice(0, 150)}. Clean composition, single evocative central metaphor, ${palette.prompt}, high-end editorial book cover design, balanced negative space, sharp focus, 8k resolution, professional graphic publishing standard.`;

  // Variant B: Badiiy & Illyustrativ
  const promptB = `Stunning artistic illustrated book cover for "${bookData.title}". Story theme: ${bookData.synopsis.slice(0, 150)}. Rich detailed digital painting, genre: ${bookData.genre}, expressive characters and cinematic atmosphere, ${palette.prompt}, trending on ArtStation, evocative lighting, narrative depth, masterwork cover art.`;

  // Variant C: Konseptual & Ramziy (Simvolik)
  const promptC = `Conceptual avant-garde book cover art for "${bookData.title}". Metaphorical symbolism reflecting: ${bookData.synopsis.slice(0, 150)}. Abstract geometry, dramatic chiaroscuro lighting, deep philosophical duality, ${styleObj.promptStyle}, ${palette.prompt}, sophisticated visual poetry, modern gallery aesthetic.`;

  return [
    {
      id: 'variant_a',
      title: 'Variant A: Tipografik & Minimalist',
      conceptBadge: 'Yuqori O‘qiluvchanlik',
      tagline: 'Toza kompozitsiya va intellektual soddalik',
      styleName: 'Minimalist Modern',
      accentColor: '#3b82f6',
      rating: 9.4,
      seed: seedA,
      prompt: promptA,
      rationale: `Ushbu muqobil variant kitobxon diqqatini sarlavha va bitta kuchli simvolga qaratadi. Ortiqcha detallarsiz toza fon kitobning nufuzini oshiradi va javonda darhol ko‘zga tashlanadi.`,
      colorLogic: `${palette.name} gammasi orqali kitobning ${bookData.genre} yo‘nalishidagi mazmuni qat’iy va ishonchli vizual tilda ifodalangan.`,
      typographyLogic: 'Katta o‘lchamli kontrastli sarlavha (Display serif / Neo-grotesque) va nafis muallif qatori.',
      recommendedFinish: 'Matviy Soft-Touch laminatsiya + Sarlavhaga tanlanma UV lak (Spot UV)',
      printSpecs: {
        widthMm: format.widthMm,
        heightMm: format.heightMm,
        spineMm: spineMm,
        bleedMm: 3,
        dpi: 300,
        colorSpace: 'CMYK (FOGRA39)',
        totalSpreadWidthMm: (format.widthMm * 2) + spineMm + 6,
        totalSpreadHeightMm: format.heightMm + 6
      }
    },
    {
      id: 'variant_b',
      title: 'Variant B: Badiiy & Illyustrativ',
      conceptBadge: 'Emotsional Hissiyot',
      tagline: 'Sujet muhiti va qahramon ruhiyatini aks ettiruvchi boy kompozitsiya',
      styleName: 'Narrative Illustration',
      accentColor: '#a855f7',
      rating: 9.6,
      seed: seedB,
      prompt: promptB,
      rationale: `Vizual hikoyachilik (visual storytelling) tamoyiliga asoslangan. Kitobning qisqacha mazmunidagi asosiy voqelik yoki muhit jonli chizgi va ranglar orqali kitobxonda kuchli qiziqish uyg‘otadi.`,
      colorLogic: `Chuqur rangli kontrastlar orqali dramatik muhit yaratilgan, kitob javonida emotsional tortishuv kuchiga ega.`,
      typographyLogic: 'Illyustratsiyaga uyg‘unlashtirilgan badiiy shrift kompozitsiyasi, kompozitsiya ichiga singdirilgan yozuvlar.',
      recommendedFinish: 'Yaltiroq qisman lak + Relyefli (bo‘rtma) sarlavha',
      printSpecs: {
        widthMm: format.widthMm,
        heightMm: format.heightMm,
        spineMm: spineMm,
        bleedMm: 3,
        dpi: 300,
        colorSpace: 'CMYK (ISO Coated v2)',
        totalSpreadWidthMm: (format.widthMm * 2) + spineMm + 6,
        totalSpreadHeightMm: format.heightMm + 6
      }
    },
    {
      id: 'variant_c',
      title: 'Variant C: Konseptual & Ramziy',
      conceptBadge: 'Falsafiy Chuqurlik',
      tagline: 'Metaforik ramzlar va zamonaviy abstrakt dizayn',
      styleName: 'Conceptual Avant-Garde',
      accentColor: '#f43f5e',
      rating: 9.1,
      seed: seedC,
      prompt: promptC,
      rationale: `Kitobning bevosita sujetini emas, balki uning tub falsafiy mohiyatini ramzlar orqali ochib beradi. Tanqidchilar va intellektual auditoriya uchun mo‘ljallangan nufuzli dizayn yechimi.`,
      colorLogic: `Yorug‘lik va soya (chiaroscuro) kontrasti kitobdagi ichki ziddiyat va g‘oyaviy kurashni aks ettiradi.`,
      typographyLogic: 'Eksperimental minimalist shriftlar va noan’anaviy vertikal/gorizontal joylashuv.',
      recommendedFinish: 'Teksturali qog‘oz + Zarhal yoki kumush shtamp (Foil Stamping)',
      printSpecs: {
        widthMm: format.widthMm,
        heightMm: format.heightMm,
        spineMm: spineMm,
        bleedMm: 3,
        dpi: 300,
        colorSpace: 'CMYK (GRACoL 2006)',
        totalSpreadWidthMm: (format.widthMm * 2) + spineMm + 6,
        totalSpreadHeightMm: format.heightMm + 6
      }
    }
  ];
}

export const DEFAULT_FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'
];

/**
 * Rasm URL manzilini yaratish (Pollinations tezkor modeli yoki Custom API)
 */
export function getAiImageUrl(prompt, seed, width = 600, height = 900, apiKey = '', provider = 'pollinations') {
  if (provider === 'pollinations' || !apiKey) {
    const cleanPrompt = encodeURIComponent(prompt.trim().slice(0, 180));
    return `https://image.pollinations.ai/prompt/${cleanPrompt}?width=${width}&height=${height}&seed=${seed}&nologo=true`;
  }
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt.trim())}?width=${width}&height=${height}&seed=${seed}&nologo=true`;
}

/**
 * Offline / Fallback SVG muqova generatsiya qiluvchi funksiya
 * Internet sekin bo'lsa yoki taqdimotda rasm yuklanmasa ham benuqson ishlaydi
 */
export function generateSvgFallback(title, author, variantType, styleName) {
  const bgGradients = {
    variant_a: ['#0f172a', '#1e3a8a', '#3b82f6'],
    variant_b: ['#2e1065', '#581c87', '#9333ea'],
    variant_c: ['#450a0a', '#881337', '#e11d48']
  };

  const colors = bgGradients[variantType] || bgGradients.variant_a;

  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="850" viewBox="0 0 600 850">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${colors[0]}" />
        <stop offset="50%" stop-color="${colors[1]}" />
        <stop offset="100%" stop-color="${colors[2]}" />
      </linearGradient>
      <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="600" height="850" fill="url(#bg)"/>
    <rect width="600" height="850" fill="url(#grid)"/>
    
    <!-- Geometric framing -->
    <rect x="40" y="40" width="520" height="770" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
    <rect x="50" y="50" width="500" height="750" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
    
    <!-- Badge -->
    <rect x="220" y="70" width="160" height="28" rx="14" fill="rgba(255,255,255,0.15)"/>
    <text x="300" y="88" fill="#ffffff" font-size="11" font-family="sans-serif" font-weight="bold" text-anchor="middle" letter-spacing="2">${styleName.toUpperCase()}</text>
    
    <!-- Central artistic symbol -->
    <circle cx="300" cy="425" r="130" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
    <circle cx="300" cy="425" r="90" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" stroke-dasharray="6,4"/>
    <circle cx="300" cy="425" r="50" fill="rgba(255,255,255,0.08)"/>
    <polygon points="300,360 360,460 240,460" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
    
    <!-- Book Title -->
    <text x="300" y="210" fill="#ffffff" font-size="34" font-family="serif" font-weight="bold" text-anchor="middle" letter-spacing="1">
      ${title.length > 25 ? title.slice(0, 24) + '...' : title}
    </text>
    <line x1="220" y1="240" x2="380" y2="240" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
    
    <!-- Author -->
    <text x="300" y="280" fill="rgba(255,255,255,0.85)" font-size="18" font-family="sans-serif" font-weight="500" text-anchor="middle" letter-spacing="3">
      ${author.toUpperCase()}
    </text>
    
    <!-- Publisher / Edition info -->
    <text x="300" y="740" fill="rgba(255,255,255,0.6)" font-size="12" font-family="sans-serif" text-anchor="middle" letter-spacing="4">
      ILMIY-AMALIY NASHR
    </text>
    <text x="300" y="765" fill="rgba(255,255,255,0.4)" font-size="10" font-family="monospace" text-anchor="middle">
      AI GENERATED COVER DESIGN SYSTEM
    </text>
  </svg>`;
}
