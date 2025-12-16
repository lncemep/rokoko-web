import Link from 'next/link';
import { client } from "@/sanity/lib/client";
import { PortableText } from '@portabletext/react';

async function getAboutData() {
  const data = await client.fetch(`*[_type == "aboutPage"][0]`);
  return data;
}

export default async function AboutPage() {
  const data = await getAboutData();

  // Domyślne wartości (żeby nie było pusto zanim wypełnisz CMS)
  const topTitle = data?.topTitle || 'Program &<br>Działania';
  
  return (
    <div style={{ backgroundColor: 'var(--color-grey-light)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        
        <header className="main-header">
            <div className="container nav-wrapper">
                <Link href="/">
                    <img src="/assets/img/logo.png" alt="ROKOKO Logo" className="logo-img" />
                </Link>
                <Link href="/" className="btn" style={{ padding: '0.5rem 1rem' }}>&larr; Wróć</Link>
            </div>
        </header>

        <main style={{ paddingTop: '140px', paddingBottom: '80px', flex: 1 }}>
            
            <div className="container reveal-up" style={{ marginBottom: '60px' }}>
                <p style={{ fontFamily: 'var(--font-hand)', color: 'var(--color-primary)', fontSize: '1.5rem' }}>
                    Co robimy?
                </p>
                <h1 
                    style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1, textTransform: 'uppercase' }}
                    dangerouslySetInnerHTML={{ __html: topTitle }}
                />
            </div>

            <div className="section-paper" style={{ padding: 0, background: 'transparent', border: 'none' }}>
                <div className="container grid-2">
                    
                    {/* LEWA KOLUMNA */}
                    <div className="text-content reveal-up">
                        
                        {/* SEKCJA 1 */}
                        {data?.section1Title && (
                            <div className="info-card">
                                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '15px', color: 'var(--color-primary)' }}>
                                    {data.section1Title}
                                </h3>
                                <div style={{paddingLeft: '20px'}}>
                                    <PortableText value={data.section1Content} />
                                </div>
                            </div>
                        )}

                        {/* SEKCJA 2 (Czarna) */}
                        {data?.section2Title && (
                            <div className="info-card" style={{ transform: 'rotate(1deg)', background: '#111', color: 'white', borderColor: 'var(--color-primary)' }}>
                                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '15px' }}>
                                    {data.section2Title}
                                </h3>
                                <div style={{paddingLeft: '20px'}}>
                                    <PortableText value={data.section2Content} />
                                </div>
                            </div>
                        )}

                        {/* SEKCJA 3 */}
                        {data?.section3Title && (
                            <div className="info-card" style={{ transform: 'rotate(-1deg)' }}>
                                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '15px', color: 'var(--color-primary)' }}>
                                    {data.section3Title}
                                </h3>
                                <div style={{paddingLeft: '20px'}}>
                                    <PortableText value={data.section3Content} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* PRAWA KOLUMNA */}
                    <div className="text-content reveal-up" style={{ marginTop: '40px' }}>
                        
                        {/* SEKCJA 4 */}
                        {data?.section4Title && (
                            <div className="info-card" style={{ transform: 'rotate(2deg)' }}>
                                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '15px', color: 'var(--color-primary)' }}>
                                    {data.section4Title}
                                </h3>
                                <div style={{paddingLeft: '20px'}}>
                                    <PortableText value={data.section4Content} />
                                </div>
                            </div>
                        )}

                        <div style={{ marginTop: '40px' }}>
                            <Link href="/social" className="btn btn-full" style={{ background: 'var(--color-primary)', color: 'white', borderColor: 'black' }}>
                                Dołącz do nas!
                            </Link>
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