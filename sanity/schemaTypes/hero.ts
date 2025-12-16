import { defineField, defineType } from 'sanity'

export const heroType = defineType({
  name: 'hero',
  title: 'Sekcja Hero (Nagłówek)',
  type: 'document', // Na razie zrobimy to jako osobny dokument dla testu
  fields: [
    defineField({
      name: 'preTitle',
      title: 'Mały napis nad tytułem',
      type: 'string',
      initialValue: 'Architektura to proces →',
    }),
    defineField({
      name: 'title',
      title: 'Główny Tytuł',
      type: 'string',
      initialValue: 'Dziedzictwo to Przyszłość',
    }),
    defineField({
      name: 'buttonText',
      title: 'Tekst na przycisku',
      type: 'string',
      initialValue: 'Poznaj nasze projekty',
    }),
    defineField({
      name: 'image',
      title: 'Obrazek tła (opcjonalnie)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})