import { defineField, defineType } from 'sanity'

export const galleryPage = defineType({
  name: 'galleryPage',
  title: '🖼️ Strona Galeria',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nagłówek strony',
      type: 'string',
      initialValue: 'GALERIA',
    }),
    defineField({
      name: 'gallerySections',
      title: 'Sekcje Galerii (np. Wydarzenia, Prace)',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Sekcja Galerii',
          fields: [
            defineField({
              name: 'sectionTitle',
              title: 'Tytuł Sekcji',
              type: 'string',
            }),
            defineField({
              name: 'images',
              title: 'Zdjęcia',
              type: 'array',
              of: [{ type: 'image', options: { hotspot: true } }],
            }),
          ],
        },
      ],
    }),
  ],
})
