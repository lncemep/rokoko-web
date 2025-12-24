import { defineField, defineType } from 'sanity'

export const themeColors = defineType({
  name: 'themeColors',
  title: '🎨 Kolorystyka (Globalna)',
  type: 'document',
  fields: [
    defineField({
        name: 'colorPrimary',
        title: 'Kolor Główny (Primary)',
        description: 'Np. #0022FF (Niebieski)',
        type: 'string',
        initialValue: '#0022FF'
    }),
    defineField({
        name: 'colorWhite',
        title: 'Kolor Biały (Tło kart, tekst na ciemnym)',
        description: 'Np. #FFFFFF',
        type: 'string',
        initialValue: '#FFFFFF'
    }),
    defineField({
        name: 'colorBlack',
        title: 'Kolor Czarny (Tekst, tło stopki)',
        description: 'Np. #111111',
        type: 'string',
        initialValue: '#111111'
    }),
    defineField({
        name: 'colorGreyLight',
        title: 'Kolor Szary Jasny (Tło strony)',
        description: 'Np. #F4F4F4',
        type: 'string',
        initialValue: '#F4F4F4'
    }),
    defineField({
        name: 'colorHoverBg',
        title: 'Kolor tła po najechaniu (Hover BG)',
        description: 'Np. #111111',
        type: 'string',
        initialValue: '#111111'
    }),
    defineField({
        name: 'colorHoverText',
        title: 'Kolor tekstu po najechaniu (Hover Text)',
        description: 'Np. #FFFFFF',
        type: 'string',
        initialValue: '#FFFFFF'
    }),
  ],
})
