import Link from 'next/link';
import Image from 'next/image';
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText, PortableTextComponents } from '@portabletext/react';
import type { Metadata, ResolvingMetadata } from 'next';

// Funkcja pobierająca post
async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == "${slug}"][0]`;
  return client.fetch(query);
}

// --- DYNAMICZNE METADANE (SEO / OPEN GRAPH) ---
type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    return { title: 'Nie znaleziono posta' };
  }

  // Obrazek do social media (Facebook/Twitter)
  const ogImage = post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : null;

  return {
    title: `${post.title} | SKN ROKOKO`,
    description: post.excerpt || 'Przeczytaj nowy wpis na blogu SKN ROKOKO.',
    openGraph: {
      title: post.title,
      description: post.excerpt || 'Kliknij, aby przeczytać więcej.',
      images: ogImage ? [ogImage] : [],
    },
  };
}

// --- KONFIGURACJA ZDJĘĆ W TREŚCI (TWOJA ULUBIONA WERSJA) ---
const components: PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <figure style={{ margin: '40px 0', textAlign: 'center' }}>
          <div style={{ position: 'relative', display: 'inline-block', maxWidth: '100%' }}>
            <Image
              src={urlFor(value).width(1200).auto('format').url()}
              alt={value.alt || 'Zdjęcie w treści'}
              width={1200}
              height={800} // Przybliżona wysokość, style to nadpiszą
              style={{ 
                  maxWidth: '100%', 
                  height: 'auto', 
                  maxHeight: '80vh',
                  borderRadius: '4px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  display: 'block',
                  margin: '0 auto'
              }}
            />
          </div>
          {value.caption && (
              <figcaption style={{ fontSize: '0.85rem', color: '#666', marginTop: '10px', fontStyle: 'italic', fontFamily: 'sans-serif' }}>
                  {value.caption}
              </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
      normal: ({children}) => <p style={{marginBottom: '1.5em', fontSize: '1.15rem', lineHeight: '1.7', color: '#333'}}>{children}</p>,
      h2: ({children}) => <h2 style={{fontSize: '2rem', marginTop: '50px', marginBottom: '20px', fontFamily: 'var(--font-display)', lineHeight: '1.2'}}>{children}</h2>,
      h3: ({children}) => <h3 style={{fontSize: '1.5rem', marginTop: '35px', marginBottom: '15px', fontWeight: 'bold', color: '#111'}}>{children}</h3>,
      blockquote: ({children}) => <blockquote style={{borderLeft: '4px solid var(--color-primary)', paddingLeft: '25px', fontSize: '1.3rem', fontStyle: 'italic', margin: '40px 0', color: '#444', background: '#f9f9f9', padding: '20px 25px'}}>{children}</blockquote>,
      ul: ({children}) => <ul style={{marginBottom: '1.5em', paddingLeft: '2em', listStyleType: 'square'}}>{children}</ul>,
      ol: ({children}) => <ol style={{marginBottom: '1.5em', paddingLeft: '2em'}}>{children}</ol>,
      li: ({children}) => <li style={{marginBottom: '0.5em', fontSize: '1.1rem'}}>{children}</li>,
  }
};

export default async function BlogPostPage(props: Props) {
  const params = await props.params; 
  const post = await getPost(params.slug);

  if (!post) {
    return (
      <div style={{ padding: '100px', textAlign: 'center' }}>
        <h1>Nie znaleziono posta :(</h1>
        <p>Sprawdź czy opublikowałeś go w panelu admina.</p>
        <Link href="/blog" style={{ textDecoration: 'underline' }}>Wróć do listy</Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
        <header className="main-header">
            <div className="container nav-wrapper">
                <Link href="/">
                    <Image src="/assets/img/logo.png" className="logo-img" alt="Logo" width={150} height={50} style={{ width: 'auto', height: '50px' }} />
                </Link>
                <Link href="/blog" className="btn">&larr; Wróć do bloga</Link>
            </div>
        </header>

        <article className="container" style={{ paddingTop: '140px', paddingBottom: '80px', maxWidth: '800px' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '20px' }}>
                {post.title}
            </h1>
            
            <p style={{ marginBottom: '40px', opacity: 0.6 }}>
                Opublikowano: {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('pl-PL') : 'Data nieznana'}
            </p>

            {post.mainImage && (
                <div style={{ marginBottom: '40px', border: '3px solid black' }}>
                    <Image 
                        src={urlFor(post.mainImage).width(800).url()} 
                        alt={post.title} 
                        width={800}
                        height={500}
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                        priority
                    />
                </div>
            )}

            <div style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
                {post.body ? (
                    <PortableText value={post.body} components={components} />
                ) : (
                    <p>Brak treści...</p>
                )}
            </div>
        </article>
    </div>
  );
}