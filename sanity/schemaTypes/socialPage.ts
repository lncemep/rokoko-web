// PLIK: src/sanity/schemaTypes/socialPage.ts
import { defineField, defineType } from 'sanity'

export const socialPage = defineType({
  name: 'socialPage',
  title: '📱 Social Hub (Linki)',
  type: 'document',
  fields: [
    defineField({
      name: 'preTitle',
      title: 'Mały napis (np. Złap nas w sieci!)',
      type: 'string',
      initialValue: 'Złap nas w sieci!',
    }),
    defineField({
      name: 'title',
      title: 'Główny Tytuł (np. Social Hub)',
      type: 'string',
      initialValue: 'Social<br>Hub',
    }),
    defineField({
      name: 'links',
      title: 'Lista Przycisków',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { 
            name: 'platform', 
            title: 'Platforma (Ikona i Styl)', 
            type: 'string',
            options: {
              list: [
                { title: 'Instagram (Gradient)', value: 'insta' },
                { title: 'TikTok (Czarny)', value: 'tiktok' },
                { title: 'Facebook (Niebieski)', value: 'fb' },
                { title: 'Email/Inne (Niebieski)', value: 'mail' }
              ]
            }
          },
          { name: 'label', title: 'Napis na przycisku', type: 'string' },
          { name: 'url', title: 'Link URL', type: 'url' }
        ],
        preview: {
            select: {
                title: 'label',
                subtitle: 'platform'
            }
        }
      }]
    })
  ]
})