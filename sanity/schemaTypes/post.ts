import { defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: '📝 Posty na Blogu',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł Posta',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Adres URL (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    // NOWE POLE: ZAJAWKA (EXCERPT)
    defineField({
        name: 'excerpt',
        title: 'Krótki opis (Zajawka / SEO)',
        description: 'Ten tekst pojawi się na liście bloga oraz w podglądzie linku na Facebooku/Discordzie.',
        type: 'text',
        rows: 3,
        validation: (Rule) => Rule.max(200).warning('Zajawka nie powinna być dłuższa niż 200 znaków.'),
    }),
    defineField({
      name: 'mainImage',
      title: 'Zdjęcie główne',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Tekst alternatywny',
        }
      ]
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data publikacji',
      type: 'datetime',
      initialValue: (new Date()).toISOString(),
    }),
    defineField({
      name: 'body',
      title: 'Treść posta',
      type: 'array', 
      of: [
        { type: 'block' }, 
        { 
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Podpis pod zdjęciem',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Tekst alternatywny',
            }
          ]
        }
      ], 
    }),
  ],
})