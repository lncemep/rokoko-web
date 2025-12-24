import { defineField, defineType } from 'sanity'

export const themeFonts = defineType({
  name: 'themeFonts',
  title: '🔤 Typografia (Globalna)',
  type: 'document',
  fields: [
    // A) NAGŁÓWKI (DISPLAY)
    defineField({
        name: 'fontDisplayUrl',
        title: 'Link do czcionki Nagłówków (Display)',
        description: 'Wklej link z Google Fonts dla nagłówków (np. Oswald).',
        type: 'url',
        initialValue: 'https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap'
    }),
    defineField({
        name: 'fontDisplayName',
        title: 'Nazwa czcionki Nagłówków',
        description: 'Opcjonalne. Jeśli puste, spróbujemy odczytać nazwę z linku.',
        type: 'string',
        initialValue: 'Oswald'
    }),

    // B) TEKST (BODY)
    defineField({
        name: 'fontBodyUrl',
        title: 'Link do czcionki Tekstu (Body)',
        description: 'Wklej link z Google Fonts dla zwykłego tekstu (np. Roboto Mono).',
        type: 'url',
        initialValue: 'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap'
    }),
    defineField({
        name: 'fontBodyName',
        title: 'Nazwa czcionki Tekstu',
        description: 'Opcjonalne. Jeśli puste, spróbujemy odczytać nazwę z linku.',
        type: 'string',
        initialValue: 'Roboto Mono'
    }),

    // C) AKCENTY (HAND)
    defineField({
        name: 'fontHandUrl',
        title: 'Link do czcionki Akcentów (Hand)',
        description: 'Wklej link z Google Fonts dla ozdobników (np. Caveat).',
        type: 'url',
        initialValue: 'https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap'
    }),
    defineField({
        name: 'fontHandName',
        title: 'Nazwa czcionki Akcentów',
        description: 'Opcjonalne. Jeśli puste, spróbujemy odczytać nazwę z linku.',
        type: 'string',
        initialValue: 'Caveat'
    }),
  ],
})
