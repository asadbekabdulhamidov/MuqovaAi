/**
 * Muqovani yuqori aniqlikda (PNG) eksport qilish
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

    // 2. Rasm yuklash
    const img = new Image();
    img.crossOrigin = 'anonymous';

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = () => {
        // Fallback: agar rasm CORS xatolik bersa, gradient chiziladi
        resolve();
      };
      img.src = imageUrl;
    });

    if (img.complete && img.naturalWidth > 0) {
      // Rasm chizish
      ctx.drawImage(img, 0, 0, width, height);
    } else {
      // Gradient fon
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#1e1b4b');
      grad.addColorStop(0.5, '#312e81');
      grad.addColorStop(1, '#0f172a');
      ctx.fillStyle = grad;
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
    ctx.roundRect(100, 100, 220, 50, 10);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText((bookData.edition || '1-nashr').toUpperCase(), 120, 133);

    // 6. Muallif
    ctx.fillStyle = '#fde68a';
    ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
    ctx.fillText((bookData.author || 'Muallif').toUpperCase(), 100, 220);

    // 7. Sarlavha (Title)
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 72px "Playfair Display", serif';
    
    // Sarlavhani ko'p qatorli qilib chizish
    const words = (bookData.title || 'Kitob Nomi').split(' ');
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
    const synWords = (bookData.synopsis || '').slice(0, 140);
    ctx.fillText(synWords + '...', 100, y + 75);

    // 9. Pastki ma'lumotlar
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '20px monospace';
    ctx.fillText(`FORMAT: ${(bookData.format || 'A5').toUpperCase()} | BOSMAXONA: 300 DPI`, 100, height - 100);
    ctx.fillText(`AI MUQOBIL DIZAYN TIZIMI`, width - 420, height - 100);

    // PNG Yuklab olish
    const link = document.createElement('a');
    link.download = `${(bookData.title || 'kitob').replace(/\s+/g, '_')}_muqova_${variant?.id || 'dizayn'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (err) {
    console.error('Muqovani yuklab olishda xatolik:', err);
    // Zaxira yuklash
    const link = document.createElement('a');
    link.download = `${(bookData.title || 'kitob')}_muqova.jpg`;
    link.href = imageUrl;
    link.target = '_blank';
    link.click();
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
Kitob nomi:           ${bookData.title}
Muallif:              ${bookData.author}
Nashr:                ${bookData.edition || '1-nashr'}
Janr:                 ${bookData.genre}
Tanlangan variant:    ${variant?.title} (${variant?.styleName})
ISBN raqami:          ${bookData.isbn || '978-9943-01-845-2'}
Tizim tavsiyasi:      ${variant?.rationale}

2. GEOMETRIK VA POLIGRAFIK O'LCHAMLAR:
--------------------------------------------------------------------------------
Format:               ${(bookData.format || 'a5').toUpperCase()}
Sof o'lcham (Trim):   ${specs.widthMm} mm × ${specs.heightMm} mm
Umurtqa qalinligi:    ${specs.spineMm} mm (Sahifalar soni: ${bookData.pages} bet)
Kesim chegarasi:      ${specs.bleedMm} mm (Har 4 tomondan qo'shimcha fon)
Yoyilma to'liq eni:   ${specs.totalSpreadWidthMm} mm
Yoyilma to'liq bo'yi: ${specs.totalSpreadHeightMm} mm
Rezolyutsiya:         ${specs.dpi || 300} DPI (Minimal tavsiya)

3. BOSMA VA MATERIALLAR TAVSIYASI:
--------------------------------------------------------------------------------
Rang modeli:          ${specs.colorSpace || 'CMYK (ISO Coated v2)'}
Muqova qog'ozi:       Karton / Bo'rli qog'oz (250-300 g/m²)
Blok qog'ozi:         ${bookData.paperWeight || 80} g/m² Ofset qog'oz
Pardozlash turi:      ${variant?.recommendedFinish || 'Matviy laminatsiya + Spot UV'}
Xavfsiz matn zonasi:  Kesim chizig'idan kamida 5 mm ichkarida

4. AI PROMPT MUHANDISLIGI TAFSILOTLARI:
--------------------------------------------------------------------------------
Prompt: ${variant?.prompt}
Rang psixologiyasi: ${variant?.colorLogic}

================================================================================
Generatsiya sanasi:   ${new Date().toLocaleString('uz-UZ')}
Tizim versiyasi:      AI BookCover Pro MVP v1.0
================================================================================`;

  const blob = new Blob([passportContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = `${(bookData.title || 'kitob').replace(/\s+/g, '_')}_Bosmaxona_Pasporti.txt`;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}
