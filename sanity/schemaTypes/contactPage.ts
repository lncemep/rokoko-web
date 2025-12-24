// src/sanity/schemaTypes/contactPage.ts
import { defineField, defineType } from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: '📬 Strona Kontakt/Współpraca',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nagłówek strony',
      type: 'string',
      initialValue: 'KONTAKT',
    }),
    
    // --- DANE KONTAKTOWE ---
    defineField({
      name: 'email',
      title: 'Adres e-mail',
      type: 'string',
      initialValue: 'rokoko.kolonaukowe@gmail.com',
    }),
    defineField({
      name: 'instagram',
      title: 'Link do Instagrama',
      type: 'url',
      initialValue: 'https://www.instagram.com/skn_rokoko/',
    }),
    defineField({
      name: 'facebook',
      title: 'Link do Facebooka',
      type: 'url',
      initialValue: 'https://www.facebook.com/SKNRokoko',
    }),

    // --- WSPÓŁPRACA ---
    defineField({
      name: 'collaborationTitle',
      title: 'Tytuł sekcji Współpraca',
      type: 'string',
      initialValue: 'WSPÓŁPRACA',
    }),
    defineField({
      name: 'collaborationContent',
      title: 'Treść sekcji Współpraca',
      type: 'array',
      of: [{ type: 'block' }],
      initialValue: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Chcesz dołączyć do koła? A może podjąć współprace nad warsztatami bądź wykładami? Albo po prostu jesteś ciekaw naszej działalności? Napisz do nas a my z przyjemnością się odezwiemy.',
            },
          ],
        },
      ],
    }),
  ],
})