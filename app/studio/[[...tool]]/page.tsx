// PLIK: src/app/studio/[[...tool]]/page.tsx
import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config' // Szukamy pliku konfiguracyjnego w głównym katalogu

export const dynamic = 'force-static'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <NextStudio config={config} />
}