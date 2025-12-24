import Link from 'next/link';
import Image from 'next/image';
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from '@portabletext/react';

async function getAboutData() {
  const data = await client.fetch(`*[_type == "aboutPage"][0]`);
  return data;
}

export default async function AboutPage() {
  const data = await getAboutData();

  const topTitle = data?.topTitle || 'O NAS';
  
  return (
    <div style={{ backgroundColor: 'var(--color-grey-light)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        
        <header className="main-header">
            <div className="container nav-wrapper">
                <Link href="/">
                    <Image src="/assets/img/logo.png" alt="ROKOKO Logo" className="logo-img" width={150} height={50} style={{ width: 'auto', height: '50px' }} />
                </Link>
                <Link href="/" className="btn" style={{ padding: '0.5rem 1rem' }}>&larr; Wróć</Link>
                {/* SECRET ADMIN BUTTON */}
                <Link href="/studio" style={{ position: 'absolute', top: 0, right: 0, width: '20px', height: '20px', opacity: 0 }} aria-hidden="true">
                    &nbsp;
                </Link>
            </div>
        </header>

        <main style={{ paddingTop: '140px', paddingBottom: '80px', flex: 1 }}>
            
            <div className="container reveal-up" style={{ marginBottom: '60px' }}>
                <p style={{ fontFamily: 'var(--font-hand)', color: 'var(--color-primary)', fontSize: '1.5rem' }}>
                    {data?.slogan || 'PRZESZŁOŚĆ JEST FUNDAMENTEM DLA PRZYSZŁOŚCI'}
                </p>
                <h1 
                    style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1, textTransform: 'uppercase' }}
                >
                    {topTitle}
                </h1>
                
                {/* INTRO TEXT */}
                {data?.introContent && (
                    <div style={{ marginTop: '30px', fontSize: '1.2rem', lineHeight: 1.6, maxWidth: '800px' }}>
                        <PortableText value={data.introContent} />
                    </div>
                )}
            </div>

            <div className="container">
                
                {/* 2. DZIAŁALNOŚĆ (4 FILARY) */}
                {data?.activitiesTitle && (
                    <div className="reveal-up" style={{ marginBottom: '80px' }}>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', marginBottom: '40px', textAlign: 'center' }}>
                            {data.activitiesTitle}
                        </h2>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
                            {data.mainActivities?.map((item: any, index: number) => (
                                <div key={index} className="info-card" style={{ 
                                    background: 'white', 
                                    color: 'black',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    {item.image && (
                                        <div style={{ marginBottom: '20px', border: '1px solid #ddd', overflow: 'hidden', aspectRatio: '4/3', position: 'relative' }}>
                                            <Image 
                                                src={urlFor(item.image).width(600).url()} 
                                                alt={item.title}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                        </div>
                                    )}
                                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '15px', color: 'var(--color-primary)' }}>
                                        {item.title}
                                    </h3>
                                    <p style={{ fontSize: '1rem', lineHeight: 1.5 }}>
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                        
                        <div style={{ textAlign: 'center', marginTop: '40px', fontStyle: 'italic' }}>
                            <p>Jeśli chcesz zapoznać się dokładniej z naszą działalnością zerknij w nasz program poniżej &darr;</p>
                        </div>
                    </div>
                )}

                {/* 3. PROGRAM (SZCZEGÓŁOWY) */}
                {data?.programTitle && (
                    <div className="section-paper reveal-up" style={{ marginBottom: '60px', background: '#111', color: 'white', borderColor: 'var(--color-primary)' }}>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', textAlign: 'center', marginBottom: '50px', color: 'var(--color-primary)' }}>
                            {data.programTitle}
                        </h2>
                        
                        <div style={{ display: 'grid', gap: '80px' }}>
                            {data.programCategories?.map((category: any, index: number) => (
                                <div key={index}>
                                    <h3 style={{ 
                                        fontFamily: 'var(--font-display)', 
                                        fontSize: '2.5rem', 
                                        marginBottom: '40px', 
                                        borderBottom: '2px solid var(--color-primary)',
                                        paddingBottom: '15px',
                                        display: 'inline-block',
                                        color: 'var(--color-primary)'
                                    }}>
                                        {category.categoryTitle}
                                    </h3>
                                    
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        {category.items?.map((point: any, pIndex: number) => (
                                            <li key={pIndex} style={{ marginBottom: '40px', paddingLeft: '30px', borderLeft: '4px solid var(--color-primary)' }}>
                                                <strong style={{ display: 'block', fontSize: '1.5rem', marginBottom: '10px', fontFamily: 'var(--font-display)' }}>{point.title}</strong>
                                                {point.description && (
                                                    <span style={{ fontSize: '1.1rem', color: '#ccc', lineHeight: 1.6, display: 'block' }}>{point.description}</span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 4. WYCIECZKI */}
                {data?.tripsTitle && (
                    <div className="reveal-up" style={{ marginBottom: '60px' }}>
                        <div className="info-card" style={{ transform: 'rotate(1deg)', background: 'var(--color-primary)', color: 'white' }}>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '20px' }}>
                                {data.tripsTitle}
                            </h2>
                            <p style={{ fontSize: '1.2rem', lineHeight: 1.6 }}>
                                {data.tripsDescription}
                            </p>
                        </div>
                    </div>
                )}

                <div style={{ marginTop: '60px', textAlign: 'center' }}>
                    <Link href="/contact" className="btn btn-full" style={{ background: 'var(--color-primary)', color: 'white', borderColor: 'black', display: 'inline-block' }}>
                        Skontaktuj się z nami
                    </Link>
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
