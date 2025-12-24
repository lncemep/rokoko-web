import Link from 'next/link';
import { client } from "@/sanity/lib/client";
import GalleryGrid from "@/components/GalleryGrid";

async function getGalleryData() {
  const data = await client.fetch(`*[_type == "galleryPage"][0]`, {}, { next: { revalidate: 0 } });
  return data;
}

export default async function GalleryPage() {
  const data = await getGalleryData();

  const title = data?.title || 'GALERIA';
  const sections = data?.gallerySections || [];

  return (
    <div className="animated-bg">
        
        <header className="main-header">
            <div className="container nav-wrapper">
                <Link href="/">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/img/logo.png" className="logo-img" alt="Logo" />
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
                        <p>Galeria jest w trakcie przygotowania. Zajrzyj wkrótce!</p>
                    </div>
                )}

                <GalleryGrid sections={sections} />
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
