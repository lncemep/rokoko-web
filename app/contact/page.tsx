import Link from 'next/link';
import { client } from "@/sanity/lib/client";
import ContactForm from "@/components/ContactForm"; // Importujemy działający formularz

// Pobieranie danych z Sanity
async function getContactData() {
  const data = await client.fetch(`*[_type == "contactPage"][0]`, {}, { next: { revalidate: 0 } });
  return data;
}

export default async function ContactPage() {
  const data = await getContactData();

  // Wartości z Sanity (lub domyślne)
  const title = data?.title || 'Współpraca &<br>Zgłoszenia';
  const description = data?.description || 'Napisz do nas w sprawie projektów, warsztatów lub dołączenia do koła.';
  const email = data?.email || 'rokoko@polsl.pl';
  const address = data?.address || 'Wydział Architektury PŚ';

  return (
    // Używamy animated-bg dla spójności (fale w tle)
    <div className="animated-bg">
        
        {/* HEADER */}
        <header className="main-header">
            <div className="container nav-wrapper">
                <Link href="/">
                    <img src="/assets/img/logo.png" className="logo-img" alt="Logo" />
                </Link>
                <Link href="/" className="btn" style={{color: 'black', background: 'white'}}>&larr; Wróć</Link>
            </div>
        </header>

        <main style={{ paddingTop: '140px', paddingBottom: '80px', flex: 1 }}>
            
            <div className="container">
                
                {/* SIATKA: LEWO (TEKST) / PRAWO (FORMULARZ) */}
                <div className="grid-responsive" style={{ alignItems: 'start' }}>
                    
                    {/* LEWA KOLUMNA - INFO (Z Sanity) */}
                    <div className="reveal-up">
                        <h1 
                            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1, textTransform: 'uppercase', color: 'white', marginBottom: '30px' }}
                            dangerouslySetInnerHTML={{ __html: title }}
                        />
                        
                        <div className="info-card" style={{ background: 'white', color: 'black', transform: 'rotate(-1deg)' }}>
                            <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
                                {description}
                            </p>
                            
                            <div style={{ borderTop: '2px dashed black', paddingTop: '20px' }}>
                                <p style={{ fontWeight: 'bold', fontFamily: 'monospace', fontSize: '0.9rem', color: '#666' }}>KONTAKT BEZPOŚREDNI:</p>
                                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '5px' }}>{email}</p>
                                <p style={{ marginTop: '5px' }}>📍 {address}</p>
                            </div>
                        </div>
                    </div>

                    {/* PRAWA KOLUMNA - FORMULARZ FORMSPREE */}
                    <div className="reveal-up delay-100">
                        <div style={{ 
                            background: '#f0f0f0', 
                            padding: '40px', 
                            border: '3px solid black', 
                            boxShadow: '10px 10px 0px rgba(0,0,0,0.5)',
                            color: 'black'
                        }}>
                            <p style={{ fontFamily: 'var(--font-hand)', color: 'var(--color-primary)', fontSize: '1.5rem', marginBottom: '20px', transform: 'rotate(2deg)', textAlign: 'right' }}>
                                Formularz zgłoszeniowy
                            </p>

                            {/* Tutaj wstawiamy komponent ContactForm, który ma w sobie kod Formspree */}
                            <ContactForm />
                            
                        </div>
                    </div>

                </div>
            </div>

        </main>
        
        <footer style={{ background: 'black', color: 'white', padding: '40px 0', textAlign: 'center' }}>
            <div className="container">
                <p>&copy; 2025 SKN ROKOKO</p>
            </div>
        </footer>
    </div>
  );
}