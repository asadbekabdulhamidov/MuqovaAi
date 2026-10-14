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

  // Eng oxirgi 100% kafolat: mahalliy SVG ni Blob qilib yuklash
  try {
    const svgData = generateSvgFallback(
      bookData?.title || 'Kitob Nomi',
      bookData?.author || 'Muallif',
      variant?.id || 'variant_a',
      variant?.title || 'Muqobil Variant'
    );
    const resp = await fetch(svgData);
    const blob = await resp.blob();
    triggerBlobDownload(blob, `${safeTitle}_muqova.svg`);
  } catch (finalErr) {
    console.error('Final download fallback failed:', finalErr);
  }
}

/**
 * Muqovani yuqori aniqlikda (PNG Blob) eksport qilish
 * Canvas tainting xatosini oldini olish uchun tasvirni Blob orqali xavfsiz chizadi.
 */
export async function downloadCoverAsPng(bookData, variant, imageUrl) {
  try {
    const width = 1200;
    const height = 1700;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // 1. Asosiy fon
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);

    let imgElement = null;
    const isDataUri = imageUrl && imageUrl.startsWith('data:');

    if (isDataUri) {
      try {
        const svgImg = new Image();
        await new Promise((resolve) => {
          svgImg.onload = resolve;
          svgImg.onerror = resolve;
          svgImg.src = imageUrl;
        });
        if (svgImg.complete && svgImg.naturalWidth > 0) {
          imgElement = svgImg;
        }
      } catch (e) {
        console.warn('SVG data-uri render warning', e);
      }
    } else if (imageUrl) {
      // Tashqi URL (Pollinations yoki Unsplash):
      // Brauzer keshidagi tainting xatoliklarini oldini olish uchun
      // tasvirni avval xavfsiz Blob ko'rinishida olamiz
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

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
            blobImg.onload = () => {
              imgElement = blobImg;
              resolve();
            };
            blobImg.onerror = resolve;
            blobImg.src = localBlobUrl;
          });
          setTimeout(() => URL.revokeObjectURL(localBlobUrl), 2000);
        }
      } catch (fetchErr) {
        console.warn('Could not fetch external image with CORS, fallback to vector canvas', fetchErr);
      }
    }

    // 2. Fon tasvirini chizish
    if (imgElement) {
      ctx.drawImage(imgElement, 0, 0, width, height);
    } else {
      // Chiroyli gradient va naqshli fon
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(0.5, '#1e1b4b');
      grad.addColorStop(1, '#312e81');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Radial yorug'lik nuri
      const radial = ctx.createRadialGradient(width / 2, height / 2.5, 50, width / 2, height / 2.5, 500);
      radial.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
      radial.addColorStop(1, 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);
    }

    // 3. Qoraytiruvchi gradient qatlam (matnlar o'qilishi uchun)
    const overlayGrad = ctx.createLinearGradient(0, 0, 0, height);
    overlayGrad.addColorStop(0, 'rgba(0,0,0,0.7)');
    overlayGrad.addColorStop(0.3, 'rgba(0,0,0,0.2)');
    overlayGrad.addColorStop(0.7, 'rgba(0,0,0,0.3)');
    overlayGrad.addColorStop(1, 'rgba(0,0,0,0.85)');
    ctx.fillStyle = overlayGrad;
    ctx.fillRect(0, 0, width, height);

    // 4. Dekorativ ramkalar
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 4;
    ctx.strokeRect(60, 60, width - 120, height - 120);

    // 5. Nashr belgisi (Badge)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.roundRect(100, 100, 260, 50, 10);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText((bookData?.edition || '1-nashr').toUpperCase(), 120, 133);

    // 6. Muallif
    ctx.fillStyle = '#fde68a';
    ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
    ctx.fillText((bookData?.author || 'Muallif').toUpperCase(), 100, 220);

    // 7. Sarlavha (Title)
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 72px "Playfair Display", Georgia, serif';
    
    const words = (bookData?.title || 'Kitob Nomi').split(' ');
    let line = '';
    let y = height - 420;
    const maxWidth = width - 240;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line, 100, y);
        line = words[n] + ' ';
        y += 85;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 100, y);

    // Oltin chiziq
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(100, y + 25, 140, 6);

    // 8. Qisqacha annotatsiya
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = '24px "Plus Jakarta Sans", sans-serif';
    const synWords = (bookData?.synopsis || '').slice(0, 140);
    if (synWords) {
      ctx.fillText(synWords + '...', 100, y + 75);
    }

    // 9. Pastki ma'lumotlar
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '20px monospace';
    ctx.fillText(`FORMAT: ${(bookData?.format || 'A5').toUpperCase()} | BOSMAXONA: 300 DPI`, 100, height - 100);
    ctx.fillText(`AI MUQOBIL DIZAYN TIZIMI`, width - 420, height - 100);

    // 10. Xavfsiz PNG Blob orqali yuklab olish
    const safeTitle = (bookData?.title || 'kitob').replace(/[^a-zA-Z0-9_\u0400-\u04FF]/g, '_');
    const filename = `${safeTitle}_muqova_${variant?.id || 'dizayn'}.png`;

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
