const pptxgen = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

async function createPresentation() {
  const pres = new pptxgen();
  
  // 16:9 Widescreen Layout (10 x 5.625 inches)
  pres.layout = 'LAYOUT_16x9';
  pres.author = 'Anvarova Xurshidabonu Xamidillayevna';
  pres.company = 'MuqovaAI Innovatsion Loyihasi';
  pres.title = 'MuqovaAI — Taqdimot';

  // Palette
  const C = {
    navyBg: '0B0F19',
    navyCard: '161E31',
    lightBg: 'F8FAFC',
    white: 'FFFFFF',
    primary: '4F46E5', // Indigo
    primaryLight: 'EEF2FF',
    accent: '7C3AED', // Purple
    accentLight: 'F5F3FF',
    textDark: '0F172A',
    textMuted: '64748B',
    border: 'E2E8F0',
    borderDark: '1E293B',
    success: '059669',
    amber: 'D97706',
    rose: 'E11D48'
  };

  // Helper for slide header
  function addSlideHeader(slide, category, title, subtitle) {
    slide.background = { color: C.lightBg };
    
    // Category pill
    slide.addText(category.toUpperCase(), {
      x: 0.8,
      y: 0.4,
      w: 8.4,
      h: 0.25,
      fontSize: 9,
      bold: true,
      color: C.primary,
      charSpacing: 2,
      fontFace: 'Arial'
    });

    // Title
    slide.addText(title, {
      x: 0.8,
      y: 0.65,
      w: 8.4,
      h: 0.45,
      fontSize: 18,
      bold: true,
      color: C.textDark,
      fontFace: 'Arial'
    });

    // Subtitle
    if (subtitle) {
      slide.addText(subtitle, {
        x: 0.8,
        y: 1.1,
        w: 8.4,
        h: 0.3,
        fontSize: 11,
        color: C.textMuted,
        fontFace: 'Arial'
      });
    }

    // Top subtle bar
    slide.addShape(pres.ShapeType.rect, {
      x: 0.8,
      y: 1.45,
      w: 8.4,
      h: 0.02,
      fill: { color: C.border }
    });

    // Footer
    slide.addText('MuqovaAI • Anvarova Xurshidabonu Xamidillayevna', {
      x: 0.8,
      y: 5.25,
      w: 6.0,
      h: 0.25,
      fontSize: 8,
      color: '94A3B8',
      fontFace: 'Arial'
    });

    slide.addText('muqova-ai.vercel.app', {
      x: 7.0,
      y: 5.25,
      w: 2.2,
      h: 0.25,
      align: 'right',
      fontSize: 8,
      color: C.primary,
      fontFace: 'Arial'
    });
  }

  // ==========================================
  // SLAYD 1: TITUL (KIRISH)
  // ==========================================
  {
    const slide = pres.addSlide();
    slide.background = { color: C.navyBg };

    // Decorative gradient shapes / cards
    slide.addShape(pres.ShapeType.rect, {
      x: 0.8,
      y: 0.8,
      w: 8.4,
      h: 4.0,
      fill: { color: C.navyCard },
      line: { color: '312E81', width: 1.5 },
      rectRadius: 0.15
    });

    // Top Badge
    slide.addText("SUN'IY INTELLEKT VA NASHRIYOT INNOVATSIYASI", {
      x: 1.2,
      y: 1.15,
      w: 7.6,
      h: 0.3,
      fontSize: 10,
      bold: true,
      color: '818CF8',
      charSpacing: 3,
      fontFace: 'Arial'
    });

    // Main Title
    slide.addText('MuqovaAI', {
      x: 1.2,
      y: 1.5,
      w: 7.6,
      h: 0.9,
      fontSize: 44,
      bold: true,
      color: C.white,
      fontFace: 'Arial'
    });

    // Subtitle
    slide.addText("Sun'iy intellekt asosida professional kitob muqovalarini avtomatlashtirilgan yaratish va tahrirlash platformasi", {
      x: 1.2,
      y: 2.45,
      w: 7.6,
      h: 0.6,
      fontSize: 15,
      color: 'CBD5E1',
      fontFace: 'Arial'
    });

    // Separator
    slide.addShape(pres.ShapeType.rect, {
      x: 1.2,
      y: 3.15,
      w: 7.6,
      h: 0.02,
      fill: { color: '334155' }
    });

    // Author & Info Box
    slide.addText([
      { text: "Muallif: ", options: { bold: true, color: '94A3B8' } },
      { text: "Anvarova Xurshidabonu Xamidillayevna\n", options: { bold: true, color: C.white } },
      { text: "Onlayn platforma: ", options: { bold: true, color: '94A3B8' } },
      { text: "https://muqova-ai.vercel.app  |  ", options: { color: '818CF8' } },
      { text: "Yil: ", options: { bold: true, color: '94A3B8' } },
      { text: "2026", options: { color: C.white } }
    ], {
      x: 1.2,
      y: 3.3,
      w: 4.8,
      h: 0.8,
      fontSize: 11,
      fontFace: 'Arial'
    });

    // 3 Quick Feature Badges (Right side)
    const features = [
      "⚡ 1 daqiqada 3 xil variant",
      "🖨️ 300 DPI Press-Ready PDF",
      "🎨 AI Remaster & Online Editor"
    ];
    features.forEach((feat, idx) => {
      slide.addShape(pres.ShapeType.rect, {
        x: 6.2,
        y: 3.25 + (idx * 0.4),
        w: 2.6,
        h: 0.32,
        fill: { color: '1E1B4B' },
        line: { color: '4338CA', width: 1 },
        rectRadius: 0.08
      });
      slide.addText(feat, {
        x: 6.25,
        y: 3.25 + (idx * 0.4),
        w: 2.5,
        h: 0.32,
        fontSize: 9,
        bold: true,
        color: 'E0E7FF',
        align: 'center',
        fontFace: 'Arial'
      });
    });
  }

  // ==========================================
  // SLAYD 2: MUAMMO VA DOLZARBLIK
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(
      slide,
      '02 | Bozor Tahlili va Dolzarblik',
      "An'anaviy nashriyot va kitob dizaynidagi 4 ta asosiy to'siq",
      "Bugungi kunda har bir nashriyot va mustaqil muallif duch kelayotgan tizimli muammolar"
    );

    const cards = [
      {
        icon: "⏳",
        title: "Uzoq muddat (Byurokratiya)",
        desc: "Bir dona muqova yaratish 7 kundan 20 kungacha cho'ziladi. Dizayner bilan uzoq davom etuvchi muzokaralar kitob chop etilishini oylab kechiktiradi."
      },
      {
        icon: "💰",
        title: "Yuqori moliyaviy xarajat",
        desc: "Professional rassom-dizayner xizmati bitta muqova uchun $50 dan $250 gacha baholanadi. Yosh mualliflar va kichik nashriyotlar uchun bu og'ir iqtisodiy yuk."
      },
      {
        icon: "⚠️",
        title: "Bosmaxona texnik xatolari",
        desc: "Muqova qalinligi (spine), 3mm qirqish chegarasi (bleed) va CMYK ranglar noto'g'ri o'lchansa, bosmaxonada butun tiraj yaroqsiz bo'lib chiqadi."
      },
      {
        icon: "🔄",
        title: "Cheklangan variantlar",
        desc: "Dizaynerlar odatda 1-2 ta eskiz bilan cheklanishadi. Muallif o'z tasavvuridagi badiiy falsafani qisqa fursatda to'liq solishtirib ko'ra olmaydi."
      }
    ];

    cards.forEach((card, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const x = 0.8 + (col * 4.3);
      const y = 1.65 + (row * 1.55);

      slide.addShape(pres.ShapeType.rect, {
        x: x,
        y: y,
        w: 4.1,
        h: 1.4,
        fill: { color: C.white },
        line: { color: C.border, width: 1 },
        rectRadius: 0.1
      });

      slide.addText(card.icon, {
        x: x + 0.15,
        y: y + 0.15,
        w: 0.5,
        h: 0.4,
        fontSize: 20
      });

      slide.addText(card.title, {
        x: x + 0.7,
        y: y + 0.18,
        w: 3.25,
        h: 0.3,
        fontSize: 12,
        bold: true,
        color: C.textDark,
        fontFace: 'Arial'
      });

      slide.addText(card.desc, {
        x: x + 0.7,
        y: y + 0.5,
        w: 3.25,
        h: 0.8,
        fontSize: 9.5,
        color: C.textMuted,
        fontFace: 'Arial'
      });
    });

    // Bottom stat callout
    slide.addShape(pres.ShapeType.rect, {
      x: 0.8,
      y: 4.65,
      w: 8.4,
      h: 0.45,
      fill: { color: 'FEE2E2' },
      line: { color: 'FCA5A5', width: 1 },
      rectRadius: 0.08
    });
    slide.addText("⚠️ Xulosa: O'rtacha kutish: 14 kun | Bitta muqova narxi: $150+ | Xatoliklar tufayli qayta bosish: ~18%", {
      x: 0.9,
      y: 4.65,
      w: 8.2,
      h: 0.45,
      fontSize: 10,
      bold: true,
      color: '991B1B',
      align: 'center',
      fontFace: 'Arial'
    });
  }

  // ==========================================
  // SLAYD 3: TAKLIF ETILAYOTGAN YECHIM
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(
      slide,
      '03 | Innovatsion Yechim',
      "MuqovaAI — Nashriyot sohasida generativ AI inqilobi",
      "Inson ijodi va sun'iy intellekt tezligini birlashtirgan avtomatlashtirilgan platforma"
    );

    // Comparison Table
    const tableData = [
      [
        { text: "Taqqoslash mezoni", options: { bold: true, color: C.white, fill: { color: C.primary } } },
        { text: "An'anaviy usul (Rassom)", options: { bold: true, color: C.white, fill: { color: '64748B' } } },
        { text: "MuqovaAI platformasi", options: { bold: true, color: C.white, fill: { color: C.accent } } }
      ],
      [
        { text: "⏱️ Yaratilish vaqti", options: { bold: true, color: C.textDark } },
        { text: "7 - 14 kun", options: { color: C.textMuted } },
        { text: "45 - 60 soniya (100x tezroq)", options: { bold: true, color: C.success } }
      ],
      [
        { text: "🎨 Variantlar xilma-xilligi", options: { bold: true, color: C.textDark } },
        { text: "1 - 2 ta qoralama", options: { color: C.textMuted } },
        { text: "3 ta parallel uslub (A, B, C)", options: { bold: true, color: C.primary } }
      ],
      [
        { text: "💵 O'rtacha tannarx", options: { bold: true, color: C.textDark } },
        { text: "$50 - $250 / dona", options: { color: 'DC2626' } },
        { text: "$0.05 - $0.20 (99% tejamkorlik)", options: { bold: true, color: C.success } }
      ],
      [
        { text: "📐 Bosmaxona andozasi", options: { bold: true, color: C.textDark } },
        { text: "Qo'lda hisoblash (xatolar ko'p)", options: { color: C.textMuted } },
        { text: "Avtomatik Spine & Bleed kalkulyatori", options: { bold: true, color: C.primary } }
      ],
      [
        { text: "✏️ Tahrirlash imkoniyati", options: { bold: true, color: C.textDark } },
        { text: "Qayta buyurtma berish shart", options: { color: C.textMuted } },
        { text: "Jonli Online Canvas Editor", options: { bold: true, color: C.success } }
      ]
    ];

    slide.addTable(tableData, {
      x: 0.8,
      y: 1.65,
      w: 8.4,
      colW: [2.6, 2.7, 3.1],
      border: { color: C.border, width: 1 },
      fill: { color: C.white },
      fontSize: 9.5,
      fontFace: 'Arial',
      autoPage: false
    });

    // Summary banner
    slide.addShape(pres.ShapeType.rect, {
      x: 0.8,
      y: 4.45,
      w: 8.4,
      h: 0.65,
      fill: { color: C.primaryLight },
      line: { color: 'C7D2FE', width: 1 },
      rectRadius: 0.1
    });
    slide.addText("💡 Asosiy yutuq: Muallif bir necha daqiqada o'z kitobi uchun professional, bosmaga to'liq tayyor muqovani tanlaydi, tahrirlaydi va eksport qiladi.", {
      x: 0.9,
      y: 4.45,
      w: 8.2,
      h: 0.65,
      fontSize: 10.5,
      bold: true,
      color: '312E81',
      align: 'center',
      fontFace: 'Arial'
    });
  }

  // ==========================================
  // SLAYD 4: 3 TA KONSEPTUAL YO'NALISH
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(
      slide,
      '04 | Dizayn Falsafasi',
      "Har bir kitob uchun 3 xil tahliliy yo'nalish",
      "Sun'iy intellekt kitob syujetini chuqur tahlil qilib, 3 xil maqsadli auditoriya uchun variant taklif qiladi"
    );

    const variants = [
      {
        badge: "VARIANT A",
        badgeColor: '4F46E5',
        title: "Minimalist & Simvolik",
        desc: "Markaziy bitta ramz, aniq lakonik chiziqlar, toza fazo va shveytsar tipografiyasi.",
        suit: "Mos keladi: Biznes, psixologiya, ilmiy ommabop va intellektual asarlar.",
        features: ["• Keraksiz shovqinsiz toza dizayn", "• Aniq metaforik ramz", "• Kitob do'konida darhol ko'zga tashlanuvchi"]
      },
      {
        badge: "VARIANT B",
        badgeColor: '7C3AED',
        title: "Badiiy & Atmosferali",
        desc: "Boy ranglar palitrasi, dramatizm, his-tuyg'ular uyg'otuvchi illustratsiya va yorug'lik o'yinlari.",
        suit: "Mos keladi: Badiiy nasr, romanlar, qissalar, drama va lirik poeziya.",
        features: ["• Chuqur emotsional bog'lanish", "• Jonli personaj yoki muhit", "• Kinematografik yoritish"]
      },
      {
        badge: "VARIANT C",
        badgeColor: '059669',
        title: "Konseptual & Metaforik",
        desc: "Syujetning yashirin qatlamlari, falsafiy assotsiatsiyalar va nostandart vizual sintez.",
        suit: "Mos keladi: Falsafa, fantastika, innovatsiya va zamonaviy tafakkur kitoblari.",
        features: ["• Intellektual qiziqish uyg'otish", "• Ko'p qatlamli vizual jumboq", "• Zamonaviy san'at elementlari"]
      }
    ];

    variants.forEach((v, idx) => {
      const x = 0.8 + (idx * 2.9);
      const y = 1.65;

      slide.addShape(pres.ShapeType.rect, {
        x: x,
        y: y,
        w: 2.65,
        h: 3.4,
        fill: { color: C.white },
        line: { color: C.border, width: 1.2 },
        rectRadius: 0.12
      });

      // Badge
      slide.addShape(pres.ShapeType.rect, {
        x: x + 0.15,
        y: y + 0.15,
        w: 1.2,
        h: 0.28,
        fill: { color: v.badgeColor },
        rectRadius: 0.06
      });
      slide.addText(v.badge, {
        x: x + 0.15,
        y: y + 0.15,
        w: 1.2,
        h: 0.28,
        fontSize: 8.5,
        bold: true,
        color: C.white,
        align: 'center',
        fontFace: 'Arial'
      });

      // Title
      slide.addText(v.title, {
        x: x + 0.15,
        y: y + 0.52,
        w: 2.35,
        h: 0.45,
        fontSize: 12,
        bold: true,
        color: C.textDark,
        fontFace: 'Arial'
      });

      // Desc
      slide.addText(v.desc, {
        x: x + 0.15,
        y: y + 1.0,
        w: 2.35,
        h: 0.7,
        fontSize: 9,
        color: C.textMuted,
        fontFace: 'Arial'
      });

      // Suitable box
      slide.addShape(pres.ShapeType.rect, {
        x: x + 0.15,
        y: y + 1.8,
        w: 2.35,
        h: 0.55,
        fill: { color: C.lightBg },
        rectRadius: 0.06
      });
      slide.addText(v.suit, {
        x: x + 0.2,
        y: y + 1.82,
        w: 2.25,
        h: 0.5,
        fontSize: 8,
        bold: true,
        color: '334155',
        fontFace: 'Arial'
      });

      // Features
      slide.addText(v.features.join('\n'), {
        x: x + 0.15,
        y: y + 2.45,
        w: 2.35,
        h: 0.8,
        fontSize: 8.5,
        color: C.textDark,
        fontFace: 'Arial'
      });
    });
  }

  // ==========================================
  // SLAYD 5: SUN'IY INTELLEKT ARXITEKTURASI
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(
      slide,
      '05 | Generativ AI Texnologiyalari',
      "Eng ilg'or neyrotarmoqlar va prompt muhandisligi",
      "Dunyoning eng kuchli rasm generatsiya qiluvchi sun'iy intellekt dvigatellari sintezi"
    );

    const engines = [
      {
        title: "OpenAI GPT-Image-2.5 (Flare & Sunburst)",
        badge: "PREMIUM DALL-E 2026",
        badgeBg: '10B981',
        desc: "2026-yilgi eng yangi OpenAI arxitekturasi. O'ta yuqori fotorealizm, yorug'lik va hajm aniqligi, mayda detallar va teksturalarni mukammal chizish qobiliyati.",
        points: ["• Sunburst: Maksimal badiiy tafsilotlar", "• Flare: Ultra-tez generatsiya", "• 1024x1792 yuqori vertikal format"]
      },
      {
        title: "FLUX.1 Schnell & Dev (Black Forest Labs)",
        badge: "OPEN WEIGHTS DIFFUSION",
        badgeBg: '6366F1',
        desc: "Zamonaviy diffuziya transformatorlari (DiT) asosidagi ilg'or model. Nostandart kompozitsiyalar va murakkab badiiy abstraksiyalar yaratishda dunyoda tengsiz.",
        points: ["• Yuqori tezlikdagi inferens", "• Ranglar gammasi tabiiyligi", "• Kengaytirilgan stilizatsiya"]
      },
      {
        title: "Intellektual Prompt Engineering",
        badge: "UZBEK TO AI TRANSLATION",
        badgeBg: '8B5CF6',
        desc: "O'zbek tilida kiritilgan kitob mazmuni va janrini avtomatik tahlil qilib, generativ neyrotarmoqlar uchun eng samarali professional inglizcha promptga aylantiradi.",
        points: ["• Janr va kayfiyatni avtomatik aniqlash", "• 300 DPI va Press-Ready direktivalari", "• Ortiqcha matn va artefaktlardan tozalash"]
      }
    ];

    engines.forEach((eng, idx) => {
      const y = 1.65 + (idx * 1.15);

      slide.addShape(pres.ShapeType.rect, {
        x: 0.8,
        y: y,
        w: 8.4,
        h: 1.05,
        fill: { color: C.white },
        line: { color: C.border, width: 1 },
        rectRadius: 0.1
      });

      slide.addShape(pres.ShapeType.rect, {
        x: 0.95,
        y: y + 0.12,
        w: 1.8,
        h: 0.22,
        fill: { color: eng.badgeBg },
        rectRadius: 0.05
      });
      slide.addText(eng.badge, {
        x: 0.95,
        y: y + 0.12,
        w: 1.8,
        h: 0.22,
        fontSize: 7.5,
        bold: true,
        color: C.white,
        align: 'center',
        fontFace: 'Arial'
      });

      slide.addText(eng.title, {
        x: 2.85,
        y: y + 0.1,
        w: 6.2,
        h: 0.25,
        fontSize: 12,
        bold: true,
        color: C.textDark,
        fontFace: 'Arial'
      });

      slide.addText(eng.desc, {
        x: 0.95,
        y: y + 0.4,
        w: 4.8,
        h: 0.55,
        fontSize: 8.5,
        color: C.textMuted,
        fontFace: 'Arial'
      });

      slide.addText(eng.points.join('\n'), {
        x: 5.9,
        y: y + 0.38,
        w: 3.1,
        h: 0.58,
        fontSize: 8,
        bold: true,
        color: C.textDark,
        fontFace: 'Arial'
      });
    });
  }

  // ==========================================
  // SLAYD 6: ESKI MUQOVALARNI YANGILASH (AI REMASTER)
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(
      slide,
      '06 | Innovatsion Funksional',
      "AI Remaster & Redesign: Eski kitoblarga yangi hayot",
      "Klassik va nodir kitoblarning ma'naviy mohiyatini saqlagan holda zamonaviy nashr talablariga moslash"
    );

    // Left card: Bosqichlar
    slide.addShape(pres.ShapeType.rect, {
      x: 0.8,
      y: 1.65,
      w: 4.1,
      h: 3.4,
      fill: { color: C.white },
      line: { color: C.border, width: 1.2 },
      rectRadius: 0.12
    });

    slide.addText("🔄 Yangilash jarayoni (Workflow)", {
      x: 1.0,
      y: 1.8,
      w: 3.7,
      h: 0.35,
      fontSize: 12,
      bold: true,
      color: C.primary,
      fontFace: 'Arial'
    });

    const steps = [
      "1. Skaner qilingan eski muqovani yuklash (JPG/PNG)",
      "2. AI Vision tasvirdagi ranglar, kompozitsiya va asosiy ramzlarni tahlil qiladi",
      "3. Asar kontekstini saqlagan holda zamonaviy badiiy stilizatsiya qo'shiladi",
      "4. Bir necha soniyada 3 ta yangi avlod muqova varianti yaratiladi"
    ];

    steps.forEach((st, i) => {
      slide.addShape(pres.ShapeType.rect, {
        x: 1.0,
        y: 2.25 + (i * 0.65),
        w: 3.7,
        h: 0.55,
        fill: { color: C.lightBg },
        rectRadius: 0.06
      });
      slide.addText(st, {
        x: 1.1,
        y: 2.28 + (i * 0.65),
        w: 3.5,
        h: 0.5,
        fontSize: 8.5,
        color: C.textDark,
        fontFace: 'Arial'
      });
    });

    // Right card: Afzalliklari
    slide.addShape(pres.ShapeType.rect, {
      x: 5.1,
      y: 1.65,
      w: 4.1,
      h: 3.4,
      fill: { color: C.white },
      line: { color: C.border, width: 1.2 },
      rectRadius: 0.12
    });

    slide.addText("✨ Amaliy qiymati va Natijasi", {
      x: 5.3,
      y: 1.8,
      w: 3.7,
      h: 0.35,
      fontSize: 12,
      bold: true,
      color: C.accent,
      fontFace: 'Arial'
    });

    const benefits = [
      { t: "Klassik asarlarni qayta tiriltirish", d: "Yosh avlod e'tiborini tortadigan zamonaviy vizual ko'rinish berish." },
      { t: "Arxiv va kutubxonalarni raqamlashtirish", d: "Tarixiy nashrlarni yuqori sifatli (HD) bosma formatga keltirish." },
      { t: "Bozor raqobatbardoshligi", d: "Jahondagi bestseller kitoblar bilan yonma-yon tura oladigan estetik daraja." }
    ];

    benefits.forEach((b, i) => {
      slide.addShape(pres.ShapeType.rect, {
        x: 5.3,
        y: 2.25 + (i * 0.85),
        w: 3.7,
        h: 0.75,
        fill: { color: C.accentLight },
        rectRadius: 0.08
      });
      slide.addText(b.t, {
        x: 5.45,
        y: 2.3 + (i * 0.85),
        w: 3.4,
        h: 0.25,
        fontSize: 9.5,
        bold: true,
        color: '4C1D95',
        fontFace: 'Arial'
      });
      slide.addText(b.d, {
        x: 5.45,
        y: 2.55 + (i * 0.85),
        w: 3.4,
        h: 0.4,
        fontSize: 8.5,
        color: C.textMuted,
        fontFace: 'Arial'
      });
    });
  }

  // ==========================================
  // SLAYD 7: BOSMAXONA MUHANDISLIGI & SPINE
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(
      slide,
      '07 | Poligrafiya Standartlari',
      "Matematik aniqlikdagi muqova muhandisligi",
      "Raqamli dizayndan to'g'ridan-to'g'ri bosmaxonaga (Press-Ready Standards)"
    );

    // Formula Box
    slide.addShape(pres.ShapeType.rect, {
      x: 0.8,
      y: 1.65,
      w: 8.4,
      h: 1.1,
      fill: { color: '1E1B4B' },
      rectRadius: 0.1
    });

    slide.addText("📐 UMURTQA QALINLIGI (SPINE THICKNESS) MATEMATIK FORMULASI", {
      x: 1.0,
      y: 1.75,
      w: 8.0,
      h: 0.25,
      fontSize: 9,
      bold: true,
      color: 'A5B4FC',
      charSpacing: 2,
      fontFace: 'Arial'
    });

    slide.addText("Spine = (Sahifalar soni ÷ 2) × Qog'oz qalinligi (mm) + Muqova karton omili", {
      x: 1.0,
      y: 2.05,
      w: 8.0,
      h: 0.35,
      fontSize: 14,
      bold: true,
      color: C.white,
      fontFace: 'Arial'
    });

    slide.addText("Masalan: 320 betlik kitob, 80 g/m² ofset qog'oz (0.10mm) = 16.0 mm qalinlik avtomatik hisoblanadi.", {
      x: 1.0,
      y: 2.4,
      w: 8.0,
      h: 0.25,
      fontSize: 9.5,
      color: 'CBD5E1',
      fontFace: 'Arial'
    });

    // 3 Standard Pillars
    const pillars = [
      {
        icon: "📏",
        title: "Avtomatik Spine Kalkulyatori",
        desc: "Sahifalar soni va qog'oz zichligiga (80, 100, 120 g/m²) qarab muqova orqa umurtqasini 0.1 mm aniqlikda shakllantiradi."
      },
      {
        icon: "✂️",
        title: "3 mm Qirqish chegarasi (Bleed)",
        desc: "Bosmaxona pichog'i xatosiz qirqishi uchun har tomondan xavfsiz 3 mm poligrafiya maydoni qoldiriladi."
      },
      {
        icon: "🎨",
        title: "CMYK va 300 DPI Aniqlik",
        desc: "Ekranda ko'ringan yorqin ranglar qog'ozda o'zgarmasligi uchun rang profili va bosma piksellar zichligi to'liq ta'minlanadi."
      }
    ];

    pillars.forEach((p, idx) => {
      const x = 0.8 + (idx * 2.9);
      const y = 2.9;

      slide.addShape(pres.ShapeType.rect, {
        x: x,
        y: y,
        w: 2.65,
        h: 2.15,
        fill: { color: C.white },
        line: { color: C.border, width: 1 },
        rectRadius: 0.1
      });

      slide.addText(p.icon, {
        x: x + 0.15,
        y: y + 0.15,
        w: 0.5,
        h: 0.35,
        fontSize: 18
      });

      slide.addText(p.title, {
        x: x + 0.15,
        y: y + 0.55,
        w: 2.35,
        h: 0.45,
        fontSize: 11,
        bold: true,
        color: C.textDark,
        fontFace: 'Arial'
      });

      slide.addText(p.desc, {
        x: x + 0.15,
        y: y + 1.05,
        w: 2.35,
        h: 0.95,
        fontSize: 8.5,
        color: C.textMuted,
        fontFace: 'Arial'
      });
    });
  }

  // ==========================================
  // SLAYD 8: JONLI ONLINE CANVAS EDITOR
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(
      slide,
      '08 | Moslashuvchanlik',
      "Interaktiv Canvas Editor: Har bir detal muallif nazoratida",
      "AI yaratgan rasm ustiga professional tipografiya va kompozitsiya elementlarini joylashtirish"
    );

    const tools = [
      {
        num: "01",
        title: "3 ta variant orasida erkin almashish",
        desc: "Foydalanuvchi Variant A, B yoki C ni bir klik bilan tahrirlash stoliga yuklab, natijasini solishtirishi mumkin."
      },
      {
        num: "02",
        title: "Dinamik tipografiya boshqaruvi",
        desc: "Kitob nomi, muallif ismi, janr va shior matnlarining shrifti, o'lchami, oraliq masofasi va ranglarini erkin sozlash."
      },
      {
        num: "03",
        title: "Qatlamlar, gradient va hoshiyalar",
        desc: "Yozuvlar o'qilishini yaxshilash uchun qora/oq gradient tushirish, tilla hoshiyalar va soya effektlari qo'shish."
      },
      {
        num: "04",
        title: "Real vaqtda 2D va 3D vizualizatsiya",
        desc: "Barcha kiritilgan o'zgarishlar darhol kitob maketida ko'rinadi — kutilmagan kutilmaganliklarga o'rin qolmaydi."
      }
    ];

    tools.forEach((tool, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const x = 0.8 + (col * 4.3);
      const y = 1.65 + (row * 1.6);

      slide.addShape(pres.ShapeType.rect, {
        x: x,
        y: y,
        w: 4.1,
        h: 1.45,
        fill: { color: C.white },
        line: { color: C.border, width: 1.2 },
        rectRadius: 0.1
      });

      slide.addShape(pres.ShapeType.rect, {
        x: x + 0.15,
        y: y + 0.15,
        w: 0.5,
        h: 0.35,
        fill: { color: C.primaryLight },
        rectRadius: 0.06
      });
      slide.addText(tool.num, {
        x: x + 0.15,
        y: y + 0.15,
        w: 0.5,
        h: 0.35,
        fontSize: 11,
        bold: true,
        color: C.primary,
        align: 'center',
        fontFace: 'Arial'
      });

      slide.addText(tool.title, {
        x: x + 0.75,
        y: y + 0.18,
        w: 3.2,
        h: 0.35,
        fontSize: 11.5,
        bold: true,
        color: C.textDark,
        fontFace: 'Arial'
      });

      slide.addText(tool.desc, {
        x: x + 0.75,
        y: y + 0.55,
        w: 3.2,
        h: 0.8,
        fontSize: 9,
        color: C.textMuted,
        fontFace: 'Arial'
      });
    });
  }

  // ==========================================
  // SLAYD 9: FULLSCREEN LIGHTBOX VA EKSPORT
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(
      slide,
      '09 | Foydalanuvchi Tajribasi',
      "To'liq ekranda ko'rish va bosmaga tayyor eksport",
      "Katta ekranda har bir pikselni tekshirish va ko'p formatli yuklab olish tizimi"
    );

    const expCards = [
      {
        badge: "FULLSCREEN LIGHTBOX",
        badgeBg: '4F46E5',
        title: "Katta ekranda tekshirish",
        desc: "Kartochka ustiga bosilganda yuqori aniqlikdagi modal oyna ochiladi. Klaviatura strelkalari (←, →) va Esc tugmasi orqali tezkor boshqaruv.",
        action: "Darhol 'Online Editorda ochish' tugmasi mavjud."
      },
      {
        badge: "HIGH-RES PNG",
        badgeBg: '059669',
        title: "Raqamli format (PNG)",
        desc: "Veb-saytlar, elektron kitoblar (e-book, Amazon KDP, LitRes), ijtimoiy tarmoqlar va reklama bannerlari uchun mukammal aniqlik.",
        action: "Hajmi: 1024x1792 px, tiniq va yorqin ranglar."
      },
      {
        badge: "PRESS-READY PDF",
        badgeBg: '7C3AED',
        title: "Poligrafiya PDF (300 DPI)",
        desc: "Bosmaxonaga to'g'ridan-to'g'ri yuboriladigan 300 DPI parametrli, hisoblangan umurtqa va 3mm qirqish chegarasiga ega fayl.",
        action: "Standart: ISO bosma me'yorlariga to'la mos."
      }
    ];

    expCards.forEach((c, idx) => {
      const x = 0.8 + (idx * 2.9);
      const y = 1.65;

      slide.addShape(pres.ShapeType.rect, {
        x: x,
        y: y,
        w: 2.65,
        h: 3.4,
        fill: { color: C.white },
        line: { color: C.border, width: 1.2 },
        rectRadius: 0.12
      });

      slide.addShape(pres.ShapeType.rect, {
        x: x + 0.15,
        y: y + 0.15,
        w: 1.8,
        h: 0.25,
        fill: { color: c.badgeBg },
        rectRadius: 0.05
      });
      slide.addText(c.badge, {
        x: x + 0.15,
        y: y + 0.15,
        w: 1.8,
        h: 0.25,
        fontSize: 7.5,
        bold: true,
        color: C.white,
        align: 'center',
        fontFace: 'Arial'
      });

      slide.addText(c.title, {
        x: x + 0.15,
        y: y + 0.5,
        w: 2.35,
        h: 0.4,
        fontSize: 12,
        bold: true,
        color: C.textDark,
        fontFace: 'Arial'
      });

      slide.addText(c.desc, {
        x: x + 0.15,
        y: y + 0.95,
        w: 2.35,
        h: 1.1,
        fontSize: 8.5,
        color: C.textMuted,
        fontFace: 'Arial'
      });

      slide.addShape(pres.ShapeType.rect, {
        x: x + 0.15,
        y: y + 2.2,
        w: 2.35,
        h: 0.9,
        fill: { color: C.lightBg },
        rectRadius: 0.06
      });
      slide.addText("💡 " + c.action, {
        x: x + 0.2,
        y: y + 2.25,
        w: 2.25,
        h: 0.8,
        fontSize: 8,
        bold: true,
        color: '334155',
        fontFace: 'Arial'
      });
    });
  }

  // ==========================================
  // SLAYD 10: DASTURIY TEXNOLOGIYALAR STEKI
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(
      slide,
      '10 | Arxitektura va Texnologiyalar',
      "Zamonaviy, xavfsiz va yuqori tezlikdagi dasturiy ta'minot",
      "Loyiha dunyo standartlariga javob beruvchi ilg'or web-texnologiyalar asosida qurilgan"
    );

    const stack = [
      { name: "React 19 & Vite", role: "Reaktiv Frontend", d: "Eng so'nggi React versiyasi. Yuqori unumdorlik, lahzalik Hot Module Reload va 100/100 Lighthouse tezligi." },
      { name: "Tailwind CSS v4", role: "Zamonaviy Dizayn Tizimi", d: "Yangi avlod CSS dvigateli, yorug' (Light) va qorong'i (Dark) rejimlar, Glassmorphism effektlari." },
      { name: "HTML5 Canvas API", role: "Grafik Renderlash", d: "Brauzerda 300 DPI formatida real vaqtda matnlar, gradientlar va ramkalarni render qilish." },
      { name: "OpenAI & FLUX REST API", role: "Sun'iy Intellekt Modeli", d: "Generativ modellarni xavfsiz chaqirish, prompt optimallashtirish va javoblarni oqimli qabul qilish." },
      { name: "Vercel Edge Platform", role: "Global Cloud Deploy", d: "Global CDN, SSL xavfsizlik sertifikatlari va doimiy 99.9% uptime bilan ishlovchi server." },
      { name: "Klient Maxfiyligi (Zero-Leak)", role: "Xavfsizlik Arxitekturasi", d: "API kalitlar faqat foydalanuvchi brauzerida saqlanadi, begona serverlarga uzatilmaydi." }
    ];

    stack.forEach((st, idx) => {
      const col = idx % 3;
      const row = Math.floor(idx / 3);
      const x = 0.8 + (col * 2.9);
      const y = 1.65 + (row * 1.6);

      slide.addShape(pres.ShapeType.rect, {
        x: x,
        y: y,
        w: 2.65,
        h: 1.45,
        fill: { color: C.white },
        line: { color: C.border, width: 1 },
        rectRadius: 0.1
      });

      slide.addText(st.name, {
        x: x + 0.15,
        y: y + 0.15,
        w: 2.35,
        h: 0.3,
        fontSize: 11,
        bold: true,
        color: C.primary,
        fontFace: 'Arial'
      });

      slide.addText(st.role, {
        x: x + 0.15,
        y: y + 0.45,
        w: 2.35,
        h: 0.25,
        fontSize: 8.5,
        bold: true,
        color: C.textDark,
        fontFace: 'Arial'
      });

      slide.addText(st.d, {
        x: x + 0.15,
        y: y + 0.72,
        w: 2.35,
        h: 0.65,
        fontSize: 8,
        color: C.textMuted,
        fontFace: 'Arial'
      });
    });
  }

  // ==========================================
  // SLAYD 11: AMALIY TAJRIBA ("ATOM ODATLARI")
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(
      slide,
      '11 | Amaliy Natija va Sinov',
      'Real keys: "Atom Odatlari" kitobi muqovasi sinovi',
      "Jeyms Klirning jahon bestselleri misolida platforma imkoniyatlarini to'liq sinovdan o'tkazish"
    );

    // Embed Screenshot if it exists
    const screenshotPath = 'C:\\Users\\aabdu\\.gemini\\antigravity\\brain\\8a1ef124-3f0f-446b-841e-787a42264bb9\\.user_uploaded\\media_1791997178728_324d009b.png';
    const hasImage = fs.existsSync(screenshotPath);

    if (hasImage) {
      slide.addImage({
        path: screenshotPath,
        x: 0.8,
        y: 1.65,
        w: 4.8,
        h: 3.3,
        rounding: true
      });
    }

    // Right side stats & analysis
    const rightX = hasImage ? 5.8 : 0.8;
    const rightW = hasImage ? 3.4 : 8.4;

    slide.addShape(pres.ShapeType.rect, {
      x: rightX,
      y: 1.65,
      w: rightW,
      h: 3.3,
      fill: { color: C.white },
      line: { color: C.border, width: 1.2 },
      rectRadius: 0.12
    });

    slide.addText("📊 Sinov Natijalari:", {
      x: rightX + 0.2,
      y: 1.8,
      w: rightW - 0.4,
      h: 0.3,
      fontSize: 12,
      bold: true,
      color: C.primary,
      fontFace: 'Arial'
    });

    const metrics = [
      { label: "Generatsiya vaqti:", val: "48 soniya" },
      { label: "Yaratilgan variantlar:", val: "3 ta (A, B, C)" },
      { label: "Ruxsat etilgan sifat:", val: "1024x1792 px HD" },
      { label: "Amaldagi dvigatel:", val: "OpenAI GPT-Image-2.5" },
      { label: "Baholash darajasi:", val: "9.8 / 10 (Yuqori)" }
    ];

    metrics.forEach((m, idx) => {
      slide.addText(m.label, {
        x: rightX + 0.2,
        y: 2.15 + (idx * 0.38),
        w: 1.6,
        h: 0.3,
        fontSize: 8.5,
        bold: true,
        color: C.textDark,
        fontFace: 'Arial'
      });
      slide.addText(m.val, {
        x: rightX + 1.8,
        y: 2.15 + (idx * 0.38),
        w: rightW - 2.0,
        h: 0.3,
        fontSize: 8.5,
        bold: true,
        color: C.accent,
        fontFace: 'Arial'
      });
    });

    slide.addShape(pres.ShapeType.rect, {
      x: rightX + 0.2,
      y: 4.1,
      w: rightW - 0.4,
      h: 0.7,
      fill: { color: C.primaryLight },
      rectRadius: 0.08
    });
    slide.addText("💡 Xulosa: Eski bir xil sariq muqovadan ko'ra atomik zarralar va odatlarning o'sishini aks ettirgan yangi konseptlar kitobxon diqqatini ancha kuchli tortadi.", {
      x: rightX + 0.25,
      y: 4.15,
      w: rightW - 0.5,
      h: 0.6,
      fontSize: 7.5,
      color: '312E81',
      fontFace: 'Arial'
    });
  }

  // ==========================================
  // SLAYD 12: XULOSA VA KELAJAKDAGI REJALAR
  // ==========================================
  {
    const slide = pres.addSlide();
    addSlideHeader(
      slide,
      '12 | Xulosa va Kelajak',
      "Loyiha xulosasi va istiqbolli rivojlanish bosqichlari",
      "MuqovaAI O'zbekistonda nashriyot madaniyatini yangi texnologik bosqichga olib chiqadi"
    );

    const roadmaps = [
      {
        stage: "BOSQICH 1 (AMALDA)",
        stageColor: C.success,
        title: "Asosiy Platforma & Vercel",
        items: [
          "✓ 3 xil konseptual generatsiya",
          "✓ AI Remaster va Vision tahlil",
          "✓ Jonli Online Canvas Editor",
          "✓ Fullscreen ko'rish va 300 DPI eksport"
        ]
      },
      {
        stage: "BOSQICH 2 (REJADA)",
        stageColor: C.primary,
        title: "O'zbek Milliy Segmenti",
        items: [
          "• Milliy naqsh va ornamentlar bazasi",
          "• O'zbek adabiyoti uchun Fine-Tuned AI",
          "• QR-kodli audio-kitob muqovalari",
          "• Mobil ilova (iOS / Android)"
        ]
      },
      {
        stage: "BOSQICH 3 (REJADA)",
        stageColor: C.accent,
        title: "Nashriyotlar Ekotizimi",
        items: [
          "• Bosmaxonalar bilan API integratsiya",
          "• Bir klikda chop etishga buyurtma",
          "• Mualliflik huquqini himoyalash",
          "• B2B nashriyot korporativ obunasi"
        ]
      }
    ];

    roadmaps.forEach((r, idx) => {
      const x = 0.8 + (idx * 2.9);
      const y = 1.65;

      slide.addShape(pres.ShapeType.rect, {
        x: x,
        y: y,
        w: 2.65,
        h: 2.3,
        fill: { color: C.white },
        line: { color: C.border, width: 1.2 },
        rectRadius: 0.12
      });

      slide.addShape(pres.ShapeType.rect, {
        x: x + 0.15,
        y: y + 0.15,
        w: 1.8,
        h: 0.25,
        fill: { color: r.stageColor },
        rectRadius: 0.05
      });
      slide.addText(r.stage, {
        x: x + 0.15,
        y: y + 0.15,
        w: 1.8,
        h: 0.25,
        fontSize: 7.5,
        bold: true,
        color: C.white,
        align: 'center',
        fontFace: 'Arial'
      });

      slide.addText(r.title, {
        x: x + 0.15,
        y: y + 0.5,
        w: 2.35,
        h: 0.35,
        fontSize: 11,
        bold: true,
        color: C.textDark,
        fontFace: 'Arial'
      });

      slide.addText(r.items.join('\n'), {
        x: x + 0.15,
        y: y + 0.9,
        w: 2.35,
        h: 1.3,
        fontSize: 8.5,
        color: C.textDark,
        fontFace: 'Arial'
      });
    });

    // Bottom author highlight card
    slide.addShape(pres.ShapeType.rect, {
      x: 0.8,
      y: 4.15,
      w: 8.4,
      h: 0.95,
      fill: { color: '0F172A' },
      rectRadius: 0.1
    });

    slide.addText("E'tiboringiz uchun rahmat!", {
      x: 1.1,
      y: 4.25,
      w: 4.0,
      h: 0.35,
      fontSize: 16,
      bold: true,
      color: C.white,
      fontFace: 'Arial'
    });

    slide.addText("Loyiha muallifi: Anvarova Xurshidabonu Xamidillayevna\nPlatforma: https://muqova-ai.vercel.app  •  2026-yil", {
      x: 1.1,
      y: 4.6,
      w: 5.5,
      h: 0.45,
      fontSize: 9.5,
      color: '94A3B8',
      fontFace: 'Arial'
    });

    slide.addShape(pres.ShapeType.rect, {
      x: 6.8,
      y: 4.35,
      w: 2.2,
      h: 0.5,
      fill: { color: C.primary },
      rectRadius: 0.08
    });
    slide.addText("muqova-ai.vercel.app", {
      x: 6.8,
      y: 4.35,
      w: 2.2,
      h: 0.5,
      fontSize: 9.5,
      bold: true,
      color: C.white,
      align: 'center',
      fontFace: 'Arial'
    });
  }

  // Save presentation to multiple destinations
  const projectPptxPath = path.join(__dirname, '..', 'MuqovaAI_Taqdimot.pptx');
  const publicPptxPath = path.join(__dirname, '..', 'public', 'MuqovaAI_Taqdimot.pptx');
  const artifactPptxPath = 'C:\\Users\\aabdu\\.gemini\\antigravity\\brain\\8a1ef124-3f0f-446b-841e-787a42264bb9\\MuqovaAI_Taqdimot.pptx';

  await pres.writeFile({ fileName: projectPptxPath });
  console.log('Project PPTX saved:', projectPptxPath);

  // Copy to public folder so it can be downloaded directly from the web app
  fs.copyFileSync(projectPptxPath, publicPptxPath);
  console.log('Public PPTX saved:', publicPptxPath);

  // Copy to artifacts folder
  fs.copyFileSync(projectPptxPath, artifactPptxPath);
  console.log('Artifact PPTX saved:', artifactPptxPath);
}

createPresentation().catch(err => {
  console.error('Error creating presentation:', err);
  process.exit(1);
});
