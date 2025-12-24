import Link from 'next/link';
import { client } from "@/sanity/lib/client";

// 1. Funkcja pobierająca dane z Sanity
// Ustawiamy revalidate: 0, aby widzieć zmiany natychmiast po edycji w panelu
async function getSocialData() {
  const data = await client.fetch(`*[_type == "socialPage"][0]`, {}, { next: { revalidate: 60 } });
  return data;
}

// 2. Funkcja pomocnicza do ikon
const getIcon = (type: string) => {
    switch (type) {
        case 'insta': 
            return <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;
        case 'tiktok': 
            return <svg viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 2.52-1.12 4.88-2.91 6.31-1.48 1.18-3.3 1.83-5.2 1.86-4.13.06-7.53-3.08-7.95-7.1-.06-.55-.06-1.11 0-1.66.57-4.23 4.23-7.29 8.48-6.93 1.09.09 2.16.36 3.16.82v4.18c-.84-.57-1.85-.86-2.87-.82-1.92.1-3.56 1.48-3.9 3.39-.34 1.86.81 3.73 2.63 4.29 1.63.49 3.39-.24 4.38-1.65.55-.78.84-1.72.78-2.67-.01-4.6-.01-9.2-.01-13.81h-3.93z"/></svg>;
        case 'fb': 
            return <svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
        default: 
            return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>;
    }
}

export default async function SocialPage() {
  const data = await getSocialData();

  // Wartości domyślne (jeśli nic nie wpiszesz w panelu)
  const preTitle = data?.preTitle || 'Złap nas w sieci!';
  const title = data?.title || 'Social<br>Hub';
  // Jeśli brak linków, pusta tablica
  const links = data?.links || [];

  return (
    <div className="social-page-wrapper">
      
      {/* HEADER */}
      <header className="container" style={{ padding: '20px', display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <Link href="/" className="close-btn" aria-label="Zamknij">
          &times;
        </Link>
      </header>

      {/* GŁÓWNA TREŚĆ */}
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '80px' }}>
        
        <div className="container reveal-up" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            
            <div className="social-card">
                
                <p style={{ textAlign: 'center', fontFamily: 'var(--font-hand)', color: 'var(--color-primary)', fontSize: '1.8rem', marginBottom: '10px', transform: 'rotate(1deg)' }}>
                    {preTitle}
                </p>
                
                <h1 
                    style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 5rem)', textAlign: 'center', lineHeight: 0.9, marginBottom: '40px', textTransform: 'uppercase' }}
                    dangerouslySetInnerHTML={{ __html: title }}
                />

                <div className="link-hub">
                    {/* Renderowanie listy z bazy danych */}
                    {links.length > 0 ? (
                        links.map((link: any, index: number) => (
                            <a 
                                key={index} 
                                href={link.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className={`social-btn ${link.platform}`} // Klasa np. 'insta', nadaje kolory z globals.css
                            >
                                {getIcon(link.platform)}
                                <span>{link.label}</span>
                            </a>
                        ))
                    ) : (
                        // Komunikat, gdy lista jest pusta
                        <div style={{textAlign: 'center', padding: '20px', border: '2px dashed #ccc'}}>
                            <p style={{marginBottom: '10px'}}>Brak linków!</p>
                            <p style={{fontSize: '0.9rem'}}>Wejdź na <a href="/studio" style={{textDecoration: 'underline', color: 'blue'}}>localhost:3000/studio</a><br/>zakładka "📱 Social Hub" i dodaj przyciski.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}