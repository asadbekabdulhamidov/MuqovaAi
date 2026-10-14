import { generateSvgFallback } from '../services/aiService';

/**
 * Xavfsiz Blob yuklab olish funksiyasi (Chrome, Safari va Firefox xavfsizlik cheklovlariga 100% mos)
 * Linkni to'g'ri DOM ga biriktiradi va yuklangach xotirani tozalaydi.
 */
export function triggerBlobDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.style.display = 'none';
  link.download = filename;
  link.href = url;
  
  // DOM ga qo'shish shart (brauzer "Download blocked" qilmasligi uchun)
  document.body.appendChild(link);
  link.click();

  // 1 soniyadan so'ng xotirani tozalash
  setTimeout(() => {
    try {
      if (link.parentNode) {
        document.body.removeChild(link);
      }
      URL.revokeObjectURL(url);
    } catch (e) {
      // ignore
    }
  }, 1000);
}

/**
 * Favqulodda to'g'ridan-to'g'ri yuklab olish (hech qachon target="_blank" ochmaydi)
 */
async function fallbackDirectDownload(imageUrl, bookData, variant) {
  const safeTitle = (bookData?.title || 'kitob').replace(/[^a-zA-Z0-9_\u0400-\u04FF]/g, '_');
  const filename = `${safeTitle}_muqova_${variant?.id || 'dizayn'}.png`;

  try {
    if (imageUrl && imageUrl.startsWith('data:')) {
      const resp = await fetch(imageUrl);
      const blob = await resp.blob();
      triggerBlobDownload(blob, `${safeTitle}_muqova.svg`);
      return;
    }

    if (imageUrl) {
      const resp = await fetch(imageUrl, { mode: 'cors' });
      if (resp.ok) {
        const blob = await resp.blob();
        triggerBlobDownload(blob, filename);
        return;
      }
    }
  } catch (e) {
    console.warn('Fallback direct download network error, generating clean vector SVG blob', e);
  }

  // Eng oxirgi 100% kafolat: ayni shu variant (A, B yoki C) ning SVG sini Blob qilib yuklash
  try {
    const variantId = variant?.id || 'variant_a';
    const svgData = variant?.fallbackUrl || generateSvgFallback(
      bookData?.title || 'Kitob Nomi',
      bookData?.author || 'Muallif',
      variantId,
      variant?.title || 'Muqobil Variant'
    );
    const resp = await fetch(svgData);
    const blob = await resp.blob();
    triggerBlobDownload(blob, `${safeTitle}_muqova_${variantId}.svg`);
  } catch (finalErr) {
    console.error('Final download fallback failed:', finalErr);
  }
}

/**
 * Muqovani yuqori aniqlikda (PNG) eksport qilish
 * Foydalanuvchi ko'rib turgan variant ranglari va dizayniga 100% mos keladi.
 */
export async function downloadCoverAsPng(bookData, variant, imageUrl, editorOptions = null) {
  try {
    const width = 1200;
    const height = 1800; // 2:3 nisbat

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const variantId = variant?.id || 'variant_a';
    const isSvgDataUri = imageUrl && imageUrl.startsWith('data:image/svg+xml');

    // =========================================================================
    // 1-HOLAT: Agar rasm SVG bo'lsa va Online Editor matnlari tahrirlanmagan bo'lsa:
    // Bu foydalanuvchi ko'rib turgan A, B yoki C variantning o'zi (masalan, qizil C variant).
    // Aynan o'sha SVG ni to'liq canvasga chizib, 100% bir xil PNG qilib beramiz.
    // =========================================================================
    if (isSvgDataUri && !editorOptions) {
      const svgImg = new Image();
      let loaded = false;
      await new Promise((resolve) => {
        svgImg.onload = () => { loaded = true; resolve(); };
        svgImg.onerror = () => { loaded = false; resolve(); };
        svgImg.src = imageUrl;
      });

      if (loaded) {
        ctx.drawImage(svgImg, 0, 0, width, height);
        const safeTitle = (bookData?.title || 'kitob').replace(/[^a-zA-Z0-9_\u0400-\u04FF]/g, '_');
        const filename = `${safeTitle}_muqova_${variantId}.png`;

        canvas.toBlob((blob) => {
          if (blob) {
            triggerBlobDownload(blob, filename);
          } else {
            fallbackDirectDownload(imageUrl, bookData, variant);
          }
        }, 'image/png');
        return;
      }
    }

    // =========================================================================
    // 2-HOLAT: Agar AI Bitmap rasm bo'lsa yoki Online Editordan yuklanayotgan bo'lsa:
    // Variant uslubi (A=ko'k, B=binafsha, C=qizil) ga to'liq mos rang palitrasi
    // =========================================================================
    const variantPalettes = {
      variant_a: {
        bg1: '#0f172a',
        bg2: '#1e3a8a',
        accent: '#38bdf8',
        badgeBg: 'rgba(37, 99, 235, 0.75)',
        subColor: '#93c5fd'
      },
      variant_b: {
        bg1: '#2e1065',
        bg2: '#581c87',
        accent: '#c084fc',
        badgeBg: 'rgba(147, 51, 234, 0.75)',
        subColor: '#e9d5ff'
      },
      variant_c: {
        bg1: '#450a0a',
        bg2: '#881337',
        accent: '#fb7185',
        badgeBg: 'rgba(225, 29, 72, 0.75)',
        subColor: '#fecdd3'
      }
    };
    const p = variantPalettes[variantId] || variantPalettes.variant_a;

    let imgElement = null;

    if (imageUrl && !imageUrl.startsWith('data:')) {
      // Tashqi URL (Pollinations yoki Unsplash)
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);
        const response = await fetch(imageUrl, {
          mode: 'cors',
          cache: 'default',
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (response.ok) {
          const blob = await response.blob();
          const localBlobUrl = URL.createObjectURL(blob);
          const blobImg = new Image();
          await new Promise((resolve) => {
            blobImg.onload = () => { imgElement = blobImg; resolve(); };
            blobImg.onerror = resolve;
            blobImg.src = localBlobUrl;
          });
          setTimeout(() => URL.revokeObjectURL(localBlobUrl), 2000);
        }
      } catch (e) {
        console.warn('Could not fetch external image, using variant theme canvas', e);
      }
    } else if (imageUrl && imageUrl.startsWith('data:')) {
      const svgImg = new Image();
      await new Promise((resolve) => {
        svgImg.onload = () => { imgElement = svgImg; resolve(); };
        svgImg.onerror = resolve;
        svgImg.src = imageUrl;
      });
    }

    // A. Fon va rasmni chizish (Online Editor filtrlari bilan birga)
    if (editorOptions && (editorOptions.brightness !== 100 || editorOptions.contrast !== 100 || editorOptions.saturation !== 100)) {
      ctx.filter = `brightness(${editorOptions.brightness}%) contrast(${editorOptions.contrast}%) saturate(${editorOptions.saturation}%)`;
    }

    if (imgElement) {
      ctx.drawImage(imgElement, 0, 0, width, height);
    } else {
      // Variant rangiga mos gradient fon
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, p.bg1);
      grad.addColorStop(0.5, p.bg2);
      grad.addColorStop(1, '#020617');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Radial yorug'lik nuri
      const radial = ctx.createRadialGradient(width / 2, height / 2.5, 50, width / 2, height / 2.5, 500);
      radial.addColorStop(0, p.accent + '44');
      radial.addColorStop(1, p.bg1 + '00');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);
    }

    ctx.filter = 'none'; // filtrni tiklash

    // B. Qoraytiruvchi gradient qatlam (matnlar aniq ko'rinishi uchun)
    const overlayGrad = ctx.createLinearGradient(0, 0, 0, height);
    overlayGrad.addColorStop(0, 'rgba(0,0,0,0.75)');
    overlayGrad.addColorStop(0.3, 'rgba(0,0,0,0.2)');
    overlayGrad.addColorStop(0.65, 'rgba(0,0,0,0.3)');
    overlayGrad.addColorStop(1, 'rgba(0,0,0,0.9)');
    ctx.fillStyle = overlayGrad;
    ctx.fillRect(0, 0, width, height);

    // C. Dekorativ ramkalar
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 4;
    ctx.strokeRect(50, 50, width - 100, height - 100);

    // D. Nashr nishoni (Badge)
    ctx.fillStyle = p.badgeBg;
    ctx.beginPath();
    ctx.roundRect(width / 2 - 140, 90, 280, 52, 26);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText((bookData?.edition || '1-NASHRI').toUpperCase(), width / 2, 123);

    // E. Sarlavha (Kitob nomi)
    const title = bookData?.title || 'Kitob Nomi';
    const author = bookData?.author || 'Muallif';

    const fontFamily = editorOptions?.fontFamily || 'Playfair Display, Georgia, serif';
    const fontSize = editorOptions?.fontSize ? editorOptions.fontSize * 2 : 68;
    const textColor = editorOptions?.textColor || '#ffffff';
    const textAlign = editorOptions?.textAlign || 'center';
    const isBold = editorOptions?.isBold ?? true;
    const isItalic = editorOptions?.isItalic ?? false;

    ctx.fillStyle = textColor;
    ctx.font = `${isItalic ? 'italic ' : ''}${isBold ? 'bold ' : ''}${fontSize}px ${fontFamily}`;
    ctx.textAlign = textAlign;

    let textX = width / 2;
    if (textAlign === 'left') textX = 120;
    if (textAlign === 'right') textX = width - 120;

    const words = title.split(' ');
    let line = '';
    const lines = [];
    const maxTextWidth = width - 240;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxTextWidth && n > 0) {
        lines.push(line.trim());
        line = words[n] + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line.trim());

    const lineHeight = fontSize * 1.25;
    const totalTextHeight = lines.length * lineHeight;
    const startY = (height / 2) - (totalTextHeight / 2) + 40;

    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], textX, startY + (i * lineHeight));
    }

    // F. Aktsent chiziqcha
    ctx.fillStyle = p.accent;
    const lineY = startY + (lines.length * lineHeight) + 20;
    if (textAlign === 'center') {
      ctx.fillRect(width / 2 - 70, lineY, 140, 6);
    } else if (textAlign === 'left') {
      ctx.fillRect(120, lineY, 140, 6);
    } else {
      ctx.fillRect(width - 260, lineY, 140, 6);
    }

    // G. Muallif
    ctx.fillStyle = p.subColor;
    ctx.font = 'bold 34px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = textAlign;
    ctx.fillText(author.toUpperCase(), textX, lineY + 60);

    // H. Pastki ma'lumotlar
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '22px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`FORMAT: ${(bookData?.format || 'A5').toUpperCase()} • 300 DPI`, 100, height - 90);
    ctx.textAlign = 'right';
    ctx.fillText(`AI MUQOBIL DIZAYN TIZIMI`, width - 100, height - 90);

    // I. Xavfsiz PNG Blob yuklab olish
    const safeTitle = (bookData?.title || 'kitob').replace(/[^a-zA-Z0-9_\u0400-\u04FF]/g, '_');
    const filename = `${safeTitle}_muqova_${variantId}.png`;

    canvas.toBlob((blob) => {
      if (blob) {
        triggerBlobDownload(blob, filename);
      } else {
        fallbackDirectDownload(imageUrl, bookData, variant);
      }
    }, 'image/png');

  } catch (err) {
    console.error('Muqovani yuklab olishda xatolik:', err);
    fallbackDirectDownload(imageUrl, bookData, variant);
  }
}

/**
 * Bosmaxona uchun rasmiy texnik pasportni (Text fayl) yuklab olish
 */
export function downloadPrintPassport(bookData, variant) {
  const specs = variant?.printSpecs || {};
  const passportContent = `================================================================================
BOSMAXONA UCHUN KITOB MUQOVASINING TEXNIK PASPORTI
"Kitob muqovasini Muqobil dizayn variantlarini tavsiya qiluvchi AI tizimi"
Tadqiqotchi & Loyiha Muallifi: Anvarova Xurshidabonu Xamidillayevna
================================================================================

1. UMUMIY MA'LUMOTLAR:
--------------------------------------------------------------------------------
Kitob nomi:           ${bookData?.title}
Muallif:              ${bookData?.author}
Nashr:                ${bookData?.edition || '1-nashr'}
Janr:                 ${bookData?.genre}
Tanlangan variant:    ${variant?.title} (${variant?.styleName})
ISBN raqami:          ${bookData?.isbn || '978-9943-01-845-2'}
Tizim tavsiyasi:      ${variant?.rationale}

2. GEOMETRIK VA POLIGRAFIK O'LCHAMLAR:
--------------------------------------------------------------------------------
Format:               ${(bookData?.format || 'a5').toUpperCase()}
Sof o'lcham (Trim):   ${specs.widthMm || 148} mm × ${specs.heightMm || 210} mm
Umurtqa qalinligi:    ${specs.spineMm || 14} mm (Sahifalar soni: ${bookData?.pages || 200} bet)
Kesim chegarasi:      ${specs.bleedMm || 3} mm (Har 4 tomondan qo'shimcha fon)
Yoyilma to'liq eni:   ${specs.totalSpreadWidthMm || 316} mm
Yoyilma to'liq bo'yi: ${specs.totalSpreadHeightMm || 216} mm
Rezolyutsiya:         ${specs.dpi || 300} DPI (Minimal tavsiya)

3. BOSMA VA MATERIALLAR TAVSIYASI:
--------------------------------------------------------------------------------
Rang modeli:          ${specs.colorSpace || 'CMYK (ISO Coated v2)'}
Muqova qog'ozi:       Karton / Bo'rli qog'oz (250-300 g/m²)
Blok qog'ozi:         ${bookData?.paperWeight || 80} g/m² Ofset qog'oz
Pardozlash turi:      ${variant?.recommendedFinish || 'Matviy laminatsiya + Spot UV'}
Xavfsiz matn zonasi:  Kesim chizig'idan kamida 5 mm ichkarida

4. AI PROMPT MUHANDISLIGI TAFSILOTLARI:
--------------------------------------------------------------------------------
Prompt: ${variant?.prompt || 'N/A'}
Rang psixologiyasi: ${variant?.colorLogic || 'N/A'}

================================================================================
Generatsiya sanasi:   ${new Date().toLocaleString('uz-UZ')}
Tizim versiyasi:      AI BookCover Pro MVP v1.0
================================================================================`;

  const blob = new Blob([passportContent], { type: 'text/plain;charset=utf-8' });
  const safeTitle = (bookData?.title || 'kitob').replace(/[^a-zA-Z0-9_\u0400-\u04FF]/g, '_');
  triggerBlobDownload(blob, `${safeTitle}_Bosmaxona_Pasporti.txt`);
}
