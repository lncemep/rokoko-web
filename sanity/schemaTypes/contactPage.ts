// src/sanity/schemaTypes/contactPage.ts
import { defineField, defineType } from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: '📬 Strona Kontakt/Współpraca',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nagłówek (np. Zgłoś projekt)',
      type: 'string',
      initialValue: 'Współpraca &<br>Zgłoszenia',
    }),
    defineField({
      name: 'description',
      title: 'Opis po lewej stronie',
      type: 'text',
      rows: 4,
      initialValue: 'Masz pomysł na warsztaty? Chcesz dołączyć do koła?',
    }),
    defineField({
      name: 'email',
      title: 'Adres e-mail (widoczny w wizytówce)',
      type: 'string',
      initialValue: 'rokoko@polsl.pl',
    }),
    defineField({
      name: 'address',
      title: 'Adres / Lokalizacja',
      type: 'string',
      initialValue: 'Wydział Architektury PŚ, Gliwice',
    }),
  ],
})