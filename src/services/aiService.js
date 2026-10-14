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

  const redesignContext = bookData.oldCoverImage
    ? 'Modern remaster and visual redesign of previous book cover edition: '
    : '';

  // Variant A: Tipografik & Minimalist
  const promptA = `${redesignContext}Award-winning minimalist book cover art, genre: ${bookData.genre}. Abstract central concept: ${bookData.title}, elegant modern composition, Swiss graphic design style, ${palette.prompt}, cinematic atmospheric lighting, hyper-detailed, 8k resolution, editorial masterpiece, clean aesthetic, no text, no words, no letters`;

  // Variant B: Badiiy & Illyustrativ
  const promptB = `${redesignContext}Masterpiece narrative digital illustration for a book cover, genre: ${bookData.genre}. Atmospheric visual storytelling inspired by ${bookData.title}, expressive cinematic mood, intricate details, trending on ArtStation, ${palette.prompt}, dramatic volumetric lighting, 8k, photorealistic octane render, no text, no typography`;

  // Variant C: Konseptual & Ramziy
  const promptC = `${redesignContext}Deep philosophical avant-garde book cover art, genre: ${bookData.genre}. Symbolic surrealism representing ${bookData.title}, ${styleObj.promptStyle}, ${palette.prompt}, chiaroscuro dramatic contrast, gallery fine art exhibition standard, sophisticated visual metaphor, 8k resolution, masterpiece, no text`;

  return [
    {
      id: 'variant_a',
      title: bookData.oldCoverImage ? 'Variant A: Tipografik Redesign' : 'Variant A: Tipografik & Minimalist',
      conceptBadge: bookData.oldCoverImage ? 'Yangi Redesign' : 'Yuqori O‘qiluvchanlik',
      tagline: bookData.oldCoverImage ? 'Eski versiyadagi ortiqcha detallarsiz toza zamonaviy ko‘rinish' : 'Toza kompozitsiya va intellektual soddalik',
      styleName: 'Minimalist Modern',
      accentColor: '#3b82f6',
      rating: 9.4,
      seed: seedA,
      prompt: promptA,
      rationale: bookData.oldCoverImage 
        ? `Eski muqovadagi kompozitsion va tipografik kamchiliklar bartaraf etilib, zamonaviy jahon standartlaridagi intellektual soddalik va yuqori o‘qiluvchanlik ta’minlandi.`
        : `Ushbu muqobil variant kitobxon diqqatini sarlavha va bitta kuchli simvolga qaratadi. Ortiqcha detallarsiz toza fon kitobning nufuzini oshiradi va javonda darhol ko‘zga tashlanadi.`,
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
      title: bookData.oldCoverImage ? 'Variant B: Illyustrativ Redesign' : 'Variant B: Badiiy & Illyustrativ',
      conceptBadge: bookData.oldCoverImage ? 'Badiiy Yangilanish' : 'Emotsional Hissiyot',
      tagline: bookData.oldCoverImage ? 'Eski mavzuni boy ranglar va zamonaviy illyustratsiya bilan qayta gavdalantirish' : 'Sujet muhiti va qahramon ruhiyatini aks ettiruvchi boy kompozitsiya',
      styleName: 'Narrative Illustration',
      accentColor: '#a855f7',
      rating: 9.6,
      seed: seedB,
      prompt: promptB,
      rationale: bookData.oldCoverImage
        ? `Eski versiyadagi qotib qolgan kompozitsiya o‘rniga kitob mavzusi bo‘yicha chuqur emotsional va zamonaviy raqamli illyustratsiya yaratildi.`
        : `Vizual hikoyachilik (visual storytelling) tamoyiliga asoslangan. Kitobning qisqacha mazmunidagi asosiy voqelik yoki muhit jonli chizgi va ranglar orqali kitobxonda kuchli qiziqish uyg‘otadi.`,
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
      title: bookData.oldCoverImage ? 'Variant C: Konseptual Redesign' : 'Variant C: Konseptual & Ramziy',
      conceptBadge: bookData.oldCoverImage ? 'Falsafiy Yangilanish' : 'Falsafiy Chuqurlik',
      tagline: bookData.oldCoverImage ? 'Eski g‘oyani zamonaviy ramziy abstraksiya orqali yangi bosqichga olib chiqish' : 'Metaforik ramzlar va zamonaviy abstrakt dizayn',
      styleName: 'Conceptual Avant-Garde',
      accentColor: '#f43f5e',
      rating: 9.1,
      seed: seedC,
      prompt: promptC,
      rationale: bookData.oldCoverImage
        ? `Eski muqova konsepsiyasi zamonaviy metaforik ramzlar va falsafiy yondashuv bilan boyitilib, intellektual va estetik qiymati oshirildi.`
        : `Kitobning bevosita sujetini emas, balki uning tub falsafiy mohiyatini ramzlar orqali ochib beradi. Tanqidchilar va intellektual auditoriya uchun mo‘ljallangan nufuzli dizayn yechimi.`,
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

/**
 * Offline / Fallback SVG muqova generatsiya qiluvchi funksiya
 * Internet sekin bo'lsa yoki taqdimotda rasm yuklanmasa ham benuqson ishlaydi
 */
export function generateSvgFallback(title = 'Kitob Nomi', author = 'Muallif', variantType = 'variant_a', styleName = 'Dizayn') {
  const safeTitle = (title || 'Kitob Nomi').replace(/[<>&"]/g, '');
  const safeAuthor = (author || 'Muallif').replace(/[<>&"]/g, '');
  const safeStyle = (styleName || 'Muqobil Variant').replace(/[<>&"]/g, '');

  const palettes = {
    variant_a: {
      bg1: '#0f172a',
      bg2: '#1e3a8a',
      accent: '#38bdf8',
      badge: '#2563eb',
      sub: '#93c5fd'
    },
    variant_b: {
      bg1: '#2e1065',
      bg2: '#581c87',
      accent: '#c084fc',
      badge: '#9333ea',
      sub: '#e9d5ff'
    },
    variant_c: {
      bg1: '#450a0a',
      bg2: '#881337',
      accent: '#fb7185',
      badge: '#e11d48',
      sub: '#fecdd3'
    }
  };

  const p = palettes[variantType] || palettes.variant_a;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900" viewBox="0 0 600 900">
    <defs>
      <linearGradient id="bg_${variantType}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${p.bg1}" />
        <stop offset="50%" stop-color="${p.bg2}" />
        <stop offset="100%" stop-color="#020617" />
      </linearGradient>
      <radialGradient id="glow_${variantType}" cx="50%" cy="45%" r="50%">
        <stop offset="0%" stop-color="${p.accent}" stop-opacity="0.35" />
        <stop offset="100%" stop-color="${p.bg1}" stop-opacity="0" />
      </radialGradient>
      <pattern id="grid_${variantType}" width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="600" height="900" fill="url(#bg_${variantType})"/>
    <circle cx="300" cy="420" r="260" fill="url(#glow_${variantType})"/>
    <rect width="600" height="900" fill="url(#grid_${variantType})"/>

    <!-- Geometric Framing -->
    <rect x="35" y="35" width="530" height="830" rx="14" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="1.5"/>
    <rect x="45" y="45" width="510" height="810" rx="10" fill="none" stroke="${p.accent}" stroke-opacity="0.35" stroke-width="1"/>

    <!-- Concept Badge -->
    <rect x="160" y="70" width="280" height="32" rx="16" fill="${p.badge}" fill-opacity="0.6"/>
    <text x="300" y="91" fill="#ffffff" font-size="11" font-family="system-ui, sans-serif" font-weight="bold" text-anchor="middle" letter-spacing="2">
      ${safeStyle.toUpperCase()}
    </text>

    <!-- Centerpiece Metaphor -->
    <circle cx="300" cy="430" r="130" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
    <circle cx="300" cy="430" r="90" fill="none" stroke="${p.accent}" stroke-opacity="0.5" stroke-width="1.5" stroke-dasharray="6,4"/>
    <circle cx="300" cy="430" r="50" fill="rgba(255,255,255,0.06)"/>
    <polygon points="300,340 375,470 225,470" fill="none" stroke="${p.accent}" stroke-width="2.5"/>

    <!-- Title -->
    <text x="300" y="210" fill="#ffffff" font-size="32" font-family="Georgia, serif" font-weight="bold" text-anchor="middle">
      ${safeTitle.length > 25 ? safeTitle.slice(0, 24) + '...' : safeTitle}
    </text>
    <line x1="220" y1="240" x2="380" y2="240" stroke="${p.accent}" stroke-width="2.5" stroke-linecap="round"/>

    <!-- Author -->
    <text x="300" y="280" fill="${p.sub}" font-size="16" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle" letter-spacing="3">
      ${safeAuthor.toUpperCase()}
    </text>

    <!-- Footer specs -->
    <text x="300" y="760" fill="rgba(255,255,255,0.7)" font-size="12" font-family="system-ui, sans-serif" font-weight="bold" text-anchor="middle" letter-spacing="4">
      MUQOBIL DIZAYN VARIANTI
    </text>
    <text x="300" y="785" fill="rgba(255,255,255,0.4)" font-size="10" font-family="monospace" text-anchor="middle" letter-spacing="1">
      AI GENERATED • BOSMAXONA STANDARTI
    </text>
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export const DEFAULT_FALLBACK_IMAGES = [
  generateSvgFallback('Tipografik Dizayn', 'MuqovaAI', 'variant_a', 'Variant 1: Tipografik'),
  generateSvgFallback('Badiiy Illyustratsiya', 'MuqovaAI', 'variant_b', 'Variant 2: Badiiy'),
  generateSvgFallback('Konseptual Falsafa', 'MuqovaAI', 'variant_c', 'Variant 3: Konseptual'),
  generateSvgFallback('Akademik Standart', 'MuqovaAI', 'variant_a', 'Variant 4: Standart')
];

/**
 * Rasm URL manzilini yaratish (FLUX modeli orqali Pollinations)
 */
export function getAiImageUrl(prompt, seed, width = 500, height = 750, apiKey = '', provider = 'pollinations') {
  const cleanPrompt = encodeURIComponent(prompt.trim());
  return `https://image.pollinations.ai/prompt/${cleanPrompt}?model=flux&width=${width}&height=${height}&seed=${seed}&nologo=true`;
}

/**
 * OpenAI DALL-E 3 rasmiy API orqali ultra-aniq vertikal kitob muqovasini generatsiya qilish
 */
export async function generateOpenAiImage(prompt, apiKey) {
  if (!apiKey || !apiKey.trim()) {
    throw new Error("OpenAI API kaliti kiritilmagan. Iltimos, Sozlamalar darchasida kalitingizni kiriting.");
  }

  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey.trim()}`
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt: prompt.trim(),
      n: 1,
      size: '1024x1792',
      quality: 'standard'
    })
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMsg = data?.error?.message || `OpenAI server xatosi (${response.status})`;
    throw new Error(errorMsg);
  }

  if (!data?.data?.[0]?.url) {
    throw new Error("OpenAI tasvir manzilini qaytara olmadi.");
  }

  return data.data[0].url;
}
