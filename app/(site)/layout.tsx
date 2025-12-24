import '../globals.css';
import MotionEngine from '@/components/MotionEngine';
import HeaderScrollLogic from '@/components/HeaderScrollLogic';
import type { Metadata, Viewport } from 'next';
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

// Funkcja pobierająca dane do Metadata (Favicon, Tytuł)
export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(`*[_type == "homePage"][0]`, {}, { next: { revalidate: 60 } });

  // Jeśli mamy favicon w CMS, używamy go. Jeśli nie, nic nie ustawiamy (domyślny next.svg)
  // WAŻNE: urlFor może zwrócić null, jeśli obrazek nie jest wgrany.
  let faviconUrl = '/favicon.ico';
  if (data?.siteFavicon) {
      try {
          faviconUrl = urlFor(data.siteFavicon).width(64).height(64).url();
      } catch (e) {
          console.error('Błąd generowania URL favikony:', e);
      }
  }

  return {
    title: 'SKN ROKOKO',
    description: 'Studenckie Koło Naukowe Architektury',
    icons: {
      icon: faviconUrl,
      shortcut: faviconUrl,
      apple: faviconUrl,
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
};

// Funkcja naprawiająca błędne linki (np. skopiowane z paska adresu zamiast Embed)
function normalizeFontUrl(url?: string): string {
  if (!url) return '';
  // Jeśli to poprawny link CSS API, zwracamy bez zmian
  if (url.includes('fonts.googleapis.com/css2')) return url;
  
  // Jeśli to link z przeglądarki (fonts.google.com/specimen...)
  if (url.includes('selection.family=')) {
    try {
      // Wyciągamy parametry po znaku zapytania
      const queryString = url.split('?')[1];
      if (!queryString) return url;

      const params = new URLSearchParams(queryString);
      const familyParam = params.get('selection.family');
      
      if (familyParam) {
        // Zamieniamy separator "|" na "&family="
        // Przykład: "Font1|Font2" -> "family=Font1&family=Font2"
        const families = familyParam.split('|');
        const newQuery = families.map(f => `family=${f}`).join('&');
        return `https://fonts.googleapis.com/css2?${newQuery}&display=swap`;
      }
    } catch (e) {
      console.error('Błąd normalizacji URL czcionki:', e);
    }
  }
  return url;
}

// Funkcja pomocnicza do wyciągania nazwy czcionki z URL
function getFontFamily(url?: string, manualName?: string, defaultName?: string): string {
  if (manualName) return manualName;
  if (!url) return defaultName || 'sans-serif';
  
  try {
    // 1. Jeśli link ma format "selection.family=Font1|Font2..." (z paska adresu)
    if (url.includes('selection.family=')) {
       const match = url.match(/selection\.family=([^&]+)/);
       if (match && match[1]) {
           // Bierzemy pierwszą czcionkę z listy (przed znakiem | lub :)
           const firstFont = match[1].split('|')[0].split(':')[0];
           return firstFont.replace(/\+/g, ' ');
       }
    }

    // 2. Jeśli link ma format standardowy "family=Font1&family=Font2"
    const matches = [...url.matchAll(/family=([^:&]+)/g)];
    if (matches.length > 0) {
      // Bierzemy pierwszą znalezioną czcionkę
      return matches[0][1].replace(/\+/g, ' ');
    }
  } catch (e) {
    console.error('Błąd parsowania URL czcionki:', e);
  }
  return defaultName || 'sans-serif';
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Pobieramy ustawienia z Sanity (teraz z 3 różnych dokumentów)
  const homeData = await client.fetch(`*[_type == "homePage"][0]`, {}, { next: { revalidate: 0 } });
  const fontsData = await client.fetch(`*[_type == "themeFonts"][0]`, {}, { next: { revalidate: 0 } });
  const colorsData = await client.fetch(`*[_type == "themeColors"][0]`, {}, { next: { revalidate: 0 } });

  // 1. Pobieramy URL-e i naprawiamy je (jeśli są z paska adresu)
  const urlDisplay = normalizeFontUrl(fontsData?.fontDisplayUrl) || 'https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap';
  const urlBody = normalizeFontUrl(fontsData?.fontBodyUrl) || 'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap';
  const urlHand = normalizeFontUrl(fontsData?.fontHandUrl) || 'https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap';

  // 2. Wyciągamy nazwy (automatycznie z URL lub ręcznie wpisane)
  const fontDisplay = getFontFamily(fontsData?.fontDisplayUrl || urlDisplay, fontsData?.fontDisplayName, 'Oswald');
  const fontBody = getFontFamily(fontsData?.fontBodyUrl || urlBody, fontsData?.fontBodyName, 'Roboto Mono');
  const fontHand = getFontFamily(fontsData?.fontHandUrl || urlHand, fontsData?.fontHandName, 'Caveat');

  // 3. Pobieramy kolory (lub domyślne)
  const colorPrimary = colorsData?.colorPrimary || '#0022FF';
  const colorWhite = colorsData?.colorWhite || '#FFFFFF';
  const colorBlack = colorsData?.colorBlack || '#111111';
  const colorGreyLight = colorsData?.colorGreyLight || '#F4F4F4';
  const colorHoverBg = colorsData?.colorHoverBg || '#111111';
  const colorHoverText = colorsData?.colorHoverText || '#FFFFFF';

  return (
    <html lang="pl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        
        {/* Ładujemy każdą czcionkę osobno */}
        <link href={urlDisplay} rel="stylesheet" />
        <link href={urlBody} rel="stylesheet" />
        <link href={urlHand} rel="stylesheet" />

        {/* Nadpisujemy zmienne CSS dynamicznie */}
        <style dangerouslySetInnerHTML={{__html: `
          :root {
            --font-display: '${fontDisplay}', sans-serif;
            --font-body: '${fontBody}', monospace;
            --font-hand: '${fontHand}', cursive;

            --color-primary: ${colorPrimary};
            --color-white: ${colorWhite};
            --color-black: ${colorBlack};
            --color-grey-light: ${colorGreyLight};
            --color-hover-bg: ${colorHoverBg};
            --color-hover-text: ${colorHoverText};
          }
        `}} />
      </head>
      <body suppressHydrationWarning={true}>
        <MotionEngine />
        <HeaderScrollLogic />
        {children}
      </body>
    </html>
  );
}