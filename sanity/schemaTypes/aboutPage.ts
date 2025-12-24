import { defineField, defineType } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: '📄 Strona O Nas (Program)',
  type: 'document',
  fields: [
    // --- 1. WSTĘP (INTRO) ---
    defineField({
      name: 'slogan',
      title: 'Hasło (nad tytułem)',
      type: 'string',
      initialValue: 'PRZESZŁOŚĆ JEST FUNDAMENTEM DLA PRZYSZŁOŚCI',
    }),
    defineField({
      name: 'topTitle',
      title: 'Główny Tytuł',
      type: 'string',
      initialValue: 'O NAS',
    }),
    defineField({
      name: 'introContent',
      title: 'Treść Wstępna (3 akapity)',
      type: 'array',
      of: [{ type: 'block' }],
      initialValue: [
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'Jesteśmy studenckim kołem naukowym działającym od 2016 przy wydziale architektury politechniki śląskiej.' }]
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'Zajmujemy się badaniem, zgłębianiem i zwiedzaniem szeroko pojętej historii architektury. Poprzez badania terenowe, warsztaty, wyjazdy edukacyjne, wykłady oraz analizowanie historycznych dokumentów i rysunków.' }]
        },
        {
          _type: 'block',
          children: [{ _type: 'span', text: 'Historia architektury to nie tylko książki ale prawdziwe i namacalne materiały. Tą historie możemy zobaczyć, dotknąć i poczuć, nie jest tylko opowieścią o starych czasach ale wszem i wobec nasz otocza i nam towarzyszy a my chcemy ja jak najlepiej poznać.' }]
        }
      ]
    }),

    // --- 2. DZIAŁALNOŚĆ (4 FILARY) ---
    defineField({
      name: 'activitiesTitle',
      title: 'Tytuł sekcji Działalność',
      type: 'string',
      initialValue: 'DZIAŁALNOŚĆ',
    }),
    defineField({
      name: 'mainActivities',
      title: 'Główne Filary Działalności (z opisami i zdjęciami)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Tytuł (np. Wyjazdy)', type: 'string' }),
          defineField({ name: 'description', title: 'Opis', type: 'text' }),
          defineField({ name: 'image', title: 'Zdjęcie', type: 'image', options: { hotspot: true } })
        ],
        preview: {
          select: { title: 'title', subtitle: 'description', media: 'image' }
        }
      }],
      initialValue: [
        {
          _type: 'object',
          title: 'Wyjazdy edukacyjno-badawcze',
          description: 'Historii architektury najlepiej się uczy na widząc ją żywo. Organizowane przez nas wyjazdy dają nam tą możliwość, zbadania i poznania historii architektury przez ich świadków.'
        },
        {
          _type: 'object',
          title: 'Wykłady naukowe',
          description: 'Organizujemy serie wszelakich wykładów dotyczących historii architektury. Wykłady prowadzone są przez naszych członków. Każdy z wykładów gwarantuje rzetelne i merytoryczne opracowanie sporządzone przez zajawkowiczów i fascynatów historii.'
        },
        {
          _type: 'object',
          title: 'Warsztaty',
          description: 'Myśl architektoniczną z przed wieków poznajemy również w praktyce tworząc różnego rodzaju warsztaty i projekty rekonstrukcyjne, rysunkowe, modelarskie itp zgodnie z technikami którymi operowano w danych epokach.'
        },
        {
          _type: 'object',
          title: 'Inwentaryzacje',
          description: 'Badanie historycznych obiektów nie może się obejść bez dokładnej i szczegółowej inwentaryzacji. Dlatego nasi członkowie przechodzą cykliczne szkolenia i ćwiczenia z inwentaryzacji w praktyce oraz inwentaryzacji z wykorzystaniem kamery 3D.'
        }
      ]
    }),

    // --- 3. PROGRAM (SZCZEGÓŁOWY) ---
    defineField({
      name: 'programTitle',
      title: 'Tytuł sekcji Program',
      type: 'string',
      initialValue: 'PROGRAM',
    }),
    defineField({
      name: 'programCategories',
      title: 'Kategorie Programu (np. Warsztaty, Badania)',
      type: 'array',
      of: [{
        type: 'object',
        title: 'Kategoria',
        fields: [
          defineField({ name: 'categoryTitle', title: 'Nazwa Kategorii', type: 'string' }),
          defineField({
            name: 'items',
            title: 'Punkty w tej kategorii',
            type: 'array',
            of: [{
              type: 'object',
              fields: [
                defineField({ name: 'title', title: 'Tytuł punktu', type: 'string' }),
                defineField({ name: 'description', title: 'Opis (opcjonalnie)', type: 'text' })
              ],
              preview: { select: { title: 'title', subtitle: 'description' } }
            }]
          })
        ],
        preview: { select: { title: 'categoryTitle' } }
      }]
    }),

    // --- 4. WYCIECZKI (NA DOLE) ---
    defineField({
      name: 'tripsTitle',
      title: 'Tytuł sekcji Wycieczki',
      type: 'string',
      initialValue: 'WYCIECZKI badawczo-edukacyjne',
    }),
    defineField({
      name: 'tripsDescription',
      title: 'Opis Wycieczek',
      type: 'text',
      initialValue: 'Raz na semestr organizowana wycieczka naukowa przez członków koła dla studentów architektury. Członkowie koła przygotowują i opracowują plan zwiedzania i materiały o zwiedzanych zabytkach. Oprowadzają uczestników wycieczki po wybranych obiektach i na podstawie samodzielnie opracowanych wcześniej materiałów o danych zabytkach prezentują uczestnikom ich historie i budowę.'
    }),
  ],
})