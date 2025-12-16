import './globals.css';
import MotionEngine from '@/components/MotionEngine';
import type { Metadata } from 'next';
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

// Funkcja pobierająca dane do Metadata (Favicon, Tytuł)
export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(`*[_type == "homePage"][0]`, {}, { next: { revalidate: 0 } });

  // Jeśli mamy favicon w CMS, używamy go. Jeśli nie, nic nie ustawiamy (domyślny next.svg)
  const faviconUrl = data?.siteFavicon ? urlFor(data.siteFavicon).url() : '/favicon.ico';

  return {
    title: 'SKN ROKOKO',
    description: 'Studenckie Koło Naukowe Architektury',
    icons: {
      icon: faviconUrl, // <-- TUTAJ DZIEJE SIĘ MAGIA (IKONA PRZEGLĄDARKI)
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Patrick+Hand&family=Permanent+Marker&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning={true}>
        <MotionEngine />
        {children}
      </body>
    </html>
  );
}