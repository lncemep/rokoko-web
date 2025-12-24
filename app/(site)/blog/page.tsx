import Link from 'next/link';
import Image from 'next/image';
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Footer from "@/components/Footer";

// Zapytanie do bazy - dodajemy 'excerpt'
async function getPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    title,
    slug,
    publishedAt,
    mainImage,
    excerpt // <-- Pobieramy zajawkę
  }`;
  const posts = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return posts;
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    // ZMIANA: Używamy klasy .animated-bg z globals.css dla animowanego tła
    <div className="animated-bg">
        
        {/* HEADER */}
        <header className="main-header">
            <div className="container nav-wrapper">
                <Link href="/">
                    <Image src="/assets/img/logo.png" className="logo-img" alt="Logo" width={150} height={50} style={{ width: 'auto', height: '50px' }} />
                </Link>
                <Link href="/" className="btn" style={{color: 'black', background: 'white'}}>&larr; Wróć</Link>
            </div>
        </header>

        <main style={{ paddingTop: '140px', paddingBottom: '80px', flex: 1 }}>
            
            <div className="container reveal-up" style={{ marginBottom: '60px' }}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1, textTransform: 'uppercase', color: 'white' }}>
                    Nasz<br/>Blog
                </h1>
            </div>

            {/* LISTA POSTÓW */}
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '40px' }}>
                    
                    {posts.length > 0 ? (
                        posts.map((post: any) => (
                            <Link href={`/blog/${post.slug.current}`} key={post.slug.current} style={{ textDecoration: 'none', color: 'inherit' }}>
                                {/* KARTA POSTA */}
                                <div className="info-card" style={{ height: '100%', transition: 'transform 0.2s', cursor: 'pointer', background: 'white', color: 'black', display: 'flex', flexDirection: 'column' }}>
                                    
                                    {/* ZDJĘCIE */}
                                    {post.mainImage && (
                                        <div style={{ width: '100%', height: '200px', backgroundColor: '#ddd', marginBottom: '20px', overflow: 'hidden', border: '2px solid black', position: 'relative' }}>
                                            <Image 
                                                src={urlFor(post.mainImage).width(400).height(250).url()} 
                                                alt={post.title} 
                                                fill
                                                style={{ objectFit: 'cover' }}
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>
                                    )}

                                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '10px', lineHeight: '1.2' }}>
                                        {post.title}
                                    </h2>
                                    
                                    {/* ZAJAWKA (BEJTOWANIE) */}
                                    {post.excerpt && (
                                        <p style={{ fontSize: '1rem', marginBottom: '15px', lineHeight: '1.5', flex: 1 }}>
                                            {post.excerpt}
                                        </p>
                                    )}

                                    <p style={{ fontSize: '0.85rem', opacity: 0.6, marginTop: 'auto' }}>
                                        {new Date(post.publishedAt).toLocaleDateString('pl-PL')}
                                    </p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '40px', border: '2px dashed white'}}>
                            <p style={{fontSize: '1.2rem', marginBottom: '10px'}}>Jeszcze nie ma wpisów.</p>
                            <p style={{opacity: 0.8}}>Dodaj pierwszy post w panelu admina!</p>
                        </div>
                    )}

                </div>
            </div>

        </main>
        
        <Footer />
    </div>
  );
}