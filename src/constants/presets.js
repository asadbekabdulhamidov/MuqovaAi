// Kitob formatlari va bosmaxona standartlari
export const BOOK_FORMATS = [
  {
    id: 'a5',
    name: 'A5 Standart',
    label: '148 × 210 mm',
    widthMm: 148,
    heightMm: 210,
    aspectRatio: '148 / 210',
    description: 'Eng ommabop badiiy va publitsistik kitoblar o‘lchami',
    category: 'Ommabop',
    spineFactor: 0.055 // har bir sahifa uchun qalinlik koeffitsiyenti (80g ofset qog'oz)
  },
  {
    id: 'b5',
    name: 'B5 Akademik',
    label: '176 × 250 mm',
    widthMm: 176,
    heightMm: 250,
    aspectRatio: '176 / 250',
    description: 'Darsliklar, ilmiy monografiyalar va qo‘llanmalar formati',
    category: 'Ilmiy',
    spineFactor: 0.052
  },
  {
    id: 'pocket',
    name: 'Cho‘ntak (Pocket)',
    label: '110 × 180 mm',
    widthMm: 110,
    heightMm: 180,
    aspectRatio: '110 / 180',
    description: 'Yengil qissa, she’riy to‘plam va ixcham kitoblar',
    category: 'Ixcham',
    spineFactor: 0.048
  },
  {
    id: 'a4',
    name: 'A4 Katta Format',
    label: '210 × 297 mm',
    widthMm: 210,
    heightMm: 297,
    aspectRatio: '210 / 297',
    description: 'Albomlar, bolalar ensiklopediyalari va atlaslar',
    category: 'Maxsus',
    spineFactor: 0.060
  }
];

// Dizayn uslublari
export const DESIGN_STYLES = [
  {
    id: 'minimalist',
    name: 'Minimalistik & Zamonaviy',
    enName: 'Minimalist & Modern Swiss Design',
    desc: 'Toza bo‘shliq, kuchli tipografiya va bitta markaziy metaforik simvol',
    badge: 'Tavsiya etiladi',
    color: 'from-blue-500 to-indigo-600',
    accentColor: '#3b82f6',
    promptStyle: 'minimalist modern book cover, elegant typography, generous whitespace, single powerful metaphorical object, clean aesthetic, award winning graphic design'
  },
  {
    id: 'classic',
    name: 'Klassik & Tarixiy Vintage',
    enName: 'Classic Vintage & Academic',
    desc: 'Oltin hoshiyalar, gravyura uslubi, qadimiy shriftlar va chuqur tekstura',
    badge: 'Klassika',
    color: 'from-amber-600 to-yellow-700',
    accentColor: '#d97706',
    promptStyle: 'classic vintage leather bound book cover style, ornate golden frames, botanical engravings, antique typography, royal dark tones, academic prestige'
  },
  {
    id: 'illustration',
    name: 'Badiiy & Raqamli Illyustratsiya',
    enName: 'Artistic & Digital Illustration',
    desc: 'Boy ranglar gammasi, qahramon yoki voqea sujeti aks etgan chizilgan kompozitsiya',
    badge: 'Badiiy',
    color: 'from-purple-500 to-pink-600',
    accentColor: '#a855f7',
    promptStyle: 'award-winning book cover art, digital painting, rich storytelling atmosphere, dynamic characters or cinematic landscape, trending on ArtStation'
  },
  {
    id: 'digital3d',
    name: '3D Render & Kinematografik',
    enName: '3D Cinematic & Futuristic',
    desc: 'Hajmdor 3D obyektlar, neon/dramatik yorug‘lik va chuqur render',
    badge: 'Trend 2026',
    color: 'from-cyan-500 to-blue-600',
    accentColor: '#06b6d4',
    promptStyle: '3D hyperrealistic octane render, volumetric cinematic lighting, subsurface scattering, dramatic angle, futuristic book cover visual'
  },
  {
    id: 'oriental',
    name: 'Sharqona & Milliy Ornamentlar',
    enName: 'Eastern & National Islamic Art',
    desc: 'Islimiy va girih naqshlar, ganchkorlik uslubi, xattotlik bilan uyg‘unlashgan dizayn',
    badge: 'Milliy meros',
    color: 'from-emerald-600 to-teal-700',
    accentColor: '#059669',
    promptStyle: 'traditional Uzbek and oriental islamic geometric patterns, gold leaf gilding, azure turquoise and lapis lazuli accents, intricate calligraphy harmony'
  },
  {
    id: 'conceptual',
    name: 'Konseptual & Abstrakt',
    enName: 'Conceptual & Abstract Metaphor',
    desc: 'Falsafiy ma’no, geometrik abstraksiya va emotsional kontrast',
    badge: 'Avangard',
    color: 'from-rose-500 to-orange-600',
    accentColor: '#f43f5e',
    promptStyle: 'conceptual fine art book cover, abstract geometric symbolism, deep philosophical contrast, Bauhaus and surrealism influence'
  }
];

// Kitob janrlari
export const BOOK_GENRES = [
  { id: 'fiction', name: 'Badiiy adabiyot & Roman', icon: 'BookOpen' },
  { id: 'science', name: 'Ilmiy-ommabop & Texnologiya', icon: 'Atom' },
  { id: 'business', name: 'Biznes, Moliya & Boshqaruv', icon: 'Briefcase' },
  { id: 'psychology', name: 'Psixologiya & Rivojlanish', icon: 'Brain' },
  { id: 'history', name: 'Tarixiy & Biografiya', icon: 'Landmark' },
  { id: 'scifi', name: 'Fantastika & Sci-Fi', icon: 'Sparkles' },
  { id: 'detective', name: 'Detektiv & Triller', icon: 'Compass' },
  { id: 'children', name: 'Bolalar adabiyoti', icon: 'Palette' },
  { id: 'poetry', name: 'She’riyat & Falsafa', icon: 'Feather' }
];

// Ranglar palitralari
export const COLOR_PALETTES = [
  { id: 'deep_mystery', name: 'To‘q & Sirli (Noir)', preview: ['#0f172a', '#1e293b', '#3b82f6'], prompt: 'deep moody dark tones, midnight blue and obsidian, subtle glowing blue highlights' },
  { id: 'warm_gold', name: 'Zarhal & Issiq Nurlar', preview: ['#78350f', '#b45309', '#fef3c7'], prompt: 'luxurious warm palette, amber, deep mahogany, metallic gold leaf accents' },
  { id: 'minimal_mono', name: 'Monoxrom & Qat’iy', preview: ['#000000', '#52525b', '#ffffff'], prompt: 'strict stark monochrome black and white, high contrast, timeless editorial palette' },
  { id: 'vibrant_dynamic', name: 'Jonli & Dinamik', preview: ['#4f46e5', '#ec4899', '#f59e0b'], prompt: 'vibrant saturated colors, energetic contrasting hues, contemporary gradient flow' },
  { id: 'calm_pastel', name: 'Osoyishta & Pastel', preview: ['#e0e7ff', '#fce7f3', '#ccfbf1'], prompt: 'soft serene pastel tones, gentle cream, muted sage and lavender tints' },
  { id: 'emerald_nature', name: 'Zumrad & Tabiiy', preview: ['#064e3b', '#047857', '#a7f3d0'], prompt: 'deep forest emerald green, earthy ochre, fresh natural tones with gold dust' }
];

// Bosma pardozlash turlari (Finishing effects)
export const PRINT_FINISHES = [
  { id: 'soft_touch', name: 'Matviy Soft-Touch laminatsiya', desc: 'Mayin baxmal teginish hissi, aks etmaydi' },
  { id: 'spot_uv', name: 'Selektiv UV lak (Spot UV)', desc: 'Sarlavha va asosiy tasvir ustida yaltiroq ko‘tarilgan lak' },
  { id: 'gold_foil', name: 'Zarhal shtamp (Foil Stamping)', desc: 'Muallif va nom uchun oltin yoki kumush metall qatlam' },
  { id: 'emboss', name: 'Relyefli bosish (Embossing)', desc: 'Harflar va tasvirlarni bo‘rtirib chiqarish' }
];

// Taqdimot uchun tayyor namunalar (Showcase Presets)
export const SHOWCASE_PRESETS = [
  {
    id: 'preset_science',
    title: 'Koinot va Vaqt Sirlari',
    author: 'Professor Alisher Karimov',
    edition: '2-to‘ldirilgan nashr',
    genre: 'science',
    genreLabel: 'Ilmiy-ommabop',
    format: 'b5',
    pages: 280,
    paperWeight: 80,
    style: 'digital3d',
    palette: 'deep_mystery',
    finish: 'spot_uv',
    isbn: '978-9943-01-845-2',
    synopsis: 'Kvant mexanikasi, umumiy nisbiylik nazariyasi hamda qora tuynuklarning insoniyat tafakkuriga ta’siri haqida ommabop ilmiy qo‘llanma. Koinotning paydo bo‘lishi va kelajakdagi ehtimoliy taqdiri chuqur tahlil etiladi.',
    mockImages: {
      minimalist: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
      illustration: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
      conceptual: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80'
    }
  },
  {
    id: 'preset_novel',
    title: 'Yulduzli Tunlar Sadosi',
    author: 'Zilola Rahimova',
    edition: '1-nashr',
    genre: 'fiction',
    genreLabel: 'Badiiy Roman',
    format: 'a5',
    pages: 340,
    paperWeight: 80,
    style: 'illustration',
    palette: 'warm_gold',
    finish: 'gold_foil',
    isbn: '978-9943-45-112-9',
    synopsis: 'Tarixiy shahar ko‘chalarida kechgan murakkab taqdirlar, muhabbat va vafodorlik qissasi. Qahramonlarning ichki kechinmalari orqali xalqning ma’naviy uyg‘onish davri mahorat bilan tasvirlangan.',
    mockImages: {
      minimalist: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
      illustration: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
      conceptual: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=1200&q=80'
    }
  },
  {
    id: 'preset_business',
    title: 'Raqamli Davr Liderligi',
    author: 'Davron Bekmurodov',
    edition: '1-nashr',
    genre: 'business',
    genreLabel: 'Biznes & Boshqaruv',
    format: 'a5',
    pages: 210,
    paperWeight: 80,
    style: 'minimalist',
    palette: 'minimal_mono',
    finish: 'soft_touch',
    isbn: '978-9943-77-301-4',
    synopsis: 'Sun’iy intellekt va avtomatlashtirish asrida jamoani samarali boshqarish, strategik qarorlar qabul qilish hamda innovatsion ekotizim yaratish bo‘yicha amaliy qo‘llanma.',
    mockImages: {
      minimalist: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      illustration: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
      conceptual: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
    }
  },
  {
    id: 'preset_history',
    title: 'Buyuk Ipak Yo‘li Merosi',
    author: 'Hamidulla Boboyev',
    edition: 'Sovg‘abop nashr',
    genre: 'history',
    genreLabel: 'Tarixiy & Madaniyat',
    format: 'b5',
    pages: 420,
    paperWeight: 100,
    style: 'oriental',
    palette: 'warm_gold',
    finish: 'emboss',
    isbn: '978-9943-88-990-1',
    synopsis: 'Markaziy Osiyo orqali o‘tgan karvon yo‘llari, me’moriy yodgorliklar va madaniyatlar almashinuvi haqida fundamental tadqiqot. Nodir miniatyuralar va arxiv hujjatlari asosida yaratilgan.',
    mockImages: {
      minimalist: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
      illustration: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
      conceptual: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80'
    }
  }
];
