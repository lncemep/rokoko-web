import { defineField, defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: '🏠 Strona Główna i Ustawienia',
  type: 'document',
  fields: [
    // --- 0. USTAWIENIA GŁÓWNE (LOGO I IKONA) ---
    defineField({
      name: 'siteLogo',
      title: 'Logo Strony (Górny lewy róg)',
      type: 'image',
      options: { hotspot: true },
      description: 'To logo pojawi się w nagłówku na każdej stronie.'
    }),
    defineField({
      name: 'siteFavicon',
      title: 'Ikona Przeglądarki (Favicon)',
      type: 'image',
      description: 'Mała ikonka widoczna na karcie przeglądarki obok tytułu strony.'
    }),

    // --- 1. HERO ---
    defineField({
      name: 'heroPreTitle',
      title: 'Mały napis (nad tytułem)',
      type: 'string',
      initialValue: 'PRZESZŁOŚĆ JEST FUNDAMENTEM DLA PRZYSZŁOŚCI',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Główny Tytuł (HTML dozwolony)',
      type: 'string',
      initialValue: 'SKN ROKOKO',
    }),
    defineField({
      name: 'heroButtonText',
      title: 'Tekst przycisku Hero',
      type: 'string',
      initialValue: 'Poznaj nasze projekty',
    }),

    // --- 2. MARQUEE ---
    defineField({
      name: 'marqueeText',
      title: 'Pasek Przewijany (Marquee)',
      type: 'text',
      initialValue: 'WARSZTATY • BADANIA TERENOWE • INWENTARYZACJE • WYKŁADY • WYCIECZKI •',
    }),

    // --- 3. SEKCJA O NAS ---
    defineField({
        name: 'aboutTitle',
        title: 'Tytuł sekcji O Nas',
        type: 'string',
        initialValue: 'O NAS',
    }),
    defineField({
        name: 'aboutDescription',
        title: 'Opis krótki O Nas',
        type: 'text',
        initialValue: 'Jesteśmy studenckim kołem naukowym działającym od 2016 przy wydziale architektury politechniki śląskiej. Zajmujemy się badaniem, zgłębianiem i zwiedzaniem szeroko pojętej historii architektury. Poprzez badania terenowe, warsztaty, wyjazdy edukacyjne, wykłady oraz analizowanie historycznych dokumentów i rysunków.'
    }),
    defineField({
        name: 'aboutButtonText',
        title: 'Tekst przycisku w sekcji O Nas',
        type: 'string',
        initialValue: 'Zobacz pełny program →',
    }),

    // --- 4. SEKCJA FILARY ---
    defineField({
        name: 'pillarsTitle',
        title: 'Tytuł czarnej karty (np. NASZE FILARY)',
        type: 'string',
        initialValue: 'DZIAŁALNOŚĆ:',
    }),
    defineField({
        name: 'pillarsList',
        title: 'Lista Filarów',
        type: 'array',
        of: [{ type: 'string' }],
        initialValue: [
            '> Wyjazdy edukacyjno-badawcze',
            '> Wykłady naukowe',
            '> Warsztaty',
            '> Inwentaryzacje'
        ]
    }),

    // --- 5. NAGŁÓWEK (HEADER) ---
    defineField({
        name: 'headerBlogBtn',
        title: 'Przycisk 1: BLOG',
        type: 'string',
        initialValue: 'Blog'
    }),
    defineField({
        name: 'headerGalleryBtn',
        title: 'Przycisk: GALERIA',
        type: 'string',
        initialValue: 'Galeria'
    }),
    defineField({
        name: 'headerLibraryBtn',
        title: 'Przycisk: BIBLIOTEKA',
        type: 'string',
        initialValue: 'Biblioteka'
    }),
    defineField({
        name: 'headerContactBtn',
        title: 'Przycisk 2: KONTAKT/WSPÓŁPRACA',
        type: 'string',
        initialValue: 'Współpraca'
    }),
    defineField({
        name: 'headerSocialBtn',
        title: 'Przycisk 3: SOCIAL (Wyróżniony)',
        type: 'string',
        initialValue: 'Social'
    }),

    // --- 6. STOPKA ---
    defineField({
        name: 'footerQuote',
        title: 'Cytat w stopce',
        type: 'string',
        initialValue: '„Kultura to umiejętność dziedziczenia”'
    }),
    defineField({
        name: 'footerCopyright',
        title: 'Tekst Copyright (np. SKN ROKOKO)',
        type: 'string',
        initialValue: 'SKN ROKOKO'
    }),
  ],
})