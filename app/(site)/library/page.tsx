import Link from 'next/link';
import Image from 'next/image';
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

async function getLibraryData() {
  const data = await client.fetch(`*[_type == "libraryPage"][0]{
    ...,
    librarySections[]{
      ...,
      items[]{
        ...,
        file {
          asset->{
            url
          }
        }
      }
    }
  }`, {}, { next: { revalidate: 60 } });
  return data;
}

export default async function LibraryPage() {
  const data = await getLibraryData();

  const title = data?.title || 'BIBLIOTEKA';
  const sections = data?.librarySections || [];

  return (
    <div className="animated-bg">
        
        <header className="main-header">
            <div className="container nav-wrapper">
                <Link href="/">
                    <Image src="/assets/img/logo.png" className="logo-img" alt="Logo" width={150} height={50} style={{ width: 'auto', height: '50px' }} />
                </Link>
                <Link href="/" className="btn" style={{color: 'black', background: 'white'}}>&larr; Wróć</Link>
                {/* SECRET ADMIN BUTTON */}
                <Link href="/studio" style={{ position: 'absolute', top: 0, right: 0, width: '20px', height: '20px', opacity: 0 }} aria-hidden="true">
                    &nbsp;
                </Link>
            </div>
        </header>

        <main style={{ paddingTop: '140px', paddingBottom: '80px', flex: 1 }}>
            
            <div className="container reveal-up" style={{ marginBottom: '60px' }}>
                <h1 
                    style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1, textTransform: 'uppercase', color: 'white' }}
                >
                    {title}
                </h1>
            </div>

            <div className="container">
                {sections.length === 0 && (
                    <div className="info-card" style={{ background: 'white', color: 'black', textAlign: 'center' }}>
                        <p>Biblioteka jest w trakcie katalogowania. Zajrzyj wkrótce!</p>
                    </div>
                )}

                {sections.map((section: any, index: number) => (
                    <div key={index} className="reveal-up" style={{ marginBottom: '60px' }}>
                        {section.sectionTitle && (
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '20px', color: 'white', borderBottom: '1px solid white', paddingBottom: '10px' }}>
                                {section.sectionTitle}
                            </h2>
                        )}
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px' }}>
                            {section.items?.map((item: any, itemIndex: number) => (
                                <div key={itemIndex} className="info-card" style={{ background: 'white', color: 'black', padding: '20px', display: 'flex', flexDirection: 'column' }}>
                                    {item.image && (
                                        <div style={{ marginBottom: '15px', border: '1px solid #ddd', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: '#f5f5f5', position: 'relative' }}>
                                            <Image 
                                                src={urlFor(item.image).width(400).url()} 
                                                alt={item.title}
                                                fill
                                                style={{ objectFit: 'contain' }}
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                        </div>
                                    )}
                                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '5px', lineHeight: 1.2 }}>
                                        {item.title}
                                    </h3>
                                    {item.author && (
                                        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '15px', fontStyle: 'italic' }}>
                                            {item.author}
                                        </p>
                                    )}
                                    
                                    <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {item.file?.asset?.url && (
                                            <a href={item.file.asset.url} target="_blank" rel="noopener noreferrer" className="btn" style={{ textAlign: 'center', fontSize: '0.8rem', padding: '0.5rem', background: 'var(--color-primary)', color: 'white' }}>
                                                Pobierz PDF
                                            </a>
                                        )}
                                        {item.link && (
                                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn" style={{ textAlign: 'center', fontSize: '0.8rem', padding: '0.5rem' }}>
                                                Zobacz Link
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
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
