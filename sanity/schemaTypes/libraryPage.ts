import { defineField, defineType } from 'sanity'

export const libraryPage = defineType({
  name: 'libraryPage',
  title: '📚 Strona Biblioteka',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nagłówek strony',
      type: 'string',
      initialValue: 'BIBLIOTEKA',
    }),
    defineField({
      name: 'librarySections',
      title: 'Sekcje Biblioteki (np. Zbiory, Publikacje)',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Sekcja Biblioteki',
          fields: [
            defineField({
              name: 'sectionTitle',
              title: 'Tytuł Sekcji',
              type: 'string',
            }),
            defineField({
              name: 'items',
              title: 'Lista Pozycji',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'title', title: 'Tytuł/Nazwa', type: 'string' }),
                    defineField({ name: 'author', title: 'Autor/Opis', type: 'string' }),
                    defineField({ name: 'link', title: 'Link (zewnętrzny)', type: 'url' }),
                    defineField({ name: 'file', title: 'Plik PDF (opcjonalnie)', type: 'file', options: { accept: '.pdf' } }),
                    defineField({ name: 'image', title: 'Okładka/Zdjęcie', type: 'image' }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
  ],
})
