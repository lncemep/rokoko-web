import { defineField, defineType } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: '📄 Strona O Nas (Program)',
  type: 'document',
  fields: [
    defineField({
      name: 'topTitle',
      title: 'Nagłówek strony (np. Historia & Wyzwania)',
      type: 'string',
      initialValue: 'Program &<br>Działania'
    }),
    // SEKCJA 1: WARSZTATY
    defineField({
      name: 'section1Title',
      title: 'Sekcja 1: Tytuł (np. WARSZTATY)',
      type: 'string',
      initialValue: 'WARSZTATY'
    }),
    defineField({
      name: 'section1Content',
      title: 'Sekcja 1: Treść (Punkty)',
      type: 'array', 
      of: [{type: 'block'}] // To pozwala robić listy punktowane w panelu
    }),
    // SEKCJA 2: TEREN
    defineField({
        name: 'section2Title',
        title: 'Sekcja 2: Tytuł (np. TEREN)',
        type: 'string',
        initialValue: 'TEREN'
    }),
    defineField({
        name: 'section2Content',
        title: 'Sekcja 2: Treść',
        type: 'array', 
        of: [{type: 'block'}]
    }),
    // SEKCJA 3: BADANIA
    defineField({
        name: 'section3Title',
        title: 'Sekcja 3: Tytuł (np. BADANIA)',
        type: 'string',
        initialValue: 'BADANIA'
    }),
    defineField({
        name: 'section3Content',
        title: 'Sekcja 3: Treść',
        type: 'array', 
        of: [{type: 'block'}]
    }),
    // SEKCJA 4: EDUKACJA
    defineField({
        name: 'section4Title',
        title: 'Sekcja 4: Tytuł (np. EDUKACJA)',
        type: 'string',
        initialValue: 'EDUKACJA'
    }),
    defineField({
        name: 'section4Content',
        title: 'Sekcja 4: Treść',
        type: 'array', 
        of: [{type: 'block'}]
    }),
  ],
})