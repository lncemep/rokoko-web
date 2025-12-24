'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { urlFor } from "@/sanity/lib/image";

export default function GalleryGrid({ sections }: { sections: any[] }) {
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [activeSectionIndex, setActiveSectionIndex] = useState<number | null>(null);

  // Obsługa klawisza ESC do zamykania lightboxa i widoku albumu
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedImage) {
            setSelectedImage(null);
        } else if (activeSectionIndex !== null) {
            setActiveSectionIndex(null);
        }
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedImage, activeSectionIndex]);

  const openLightbox = (image: any) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  // --- WIDOK LISTY ALBUMÓW ---
  if (activeSectionIndex === null) {
    return (
      <div 
        style={{ 
            animation: 'fadeIn 0.5s ease-out forwards',
            opacity: 0 
        }}
      >
        <style jsx>{`
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `}</style>
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '40px' 
        }}>
          {sections.map((section: any, index: number) => {
            // Pobieramy pierwsze zdjęcie jako okładkę
            const coverImage = section.images?.[0];
            const count = section.images?.length || 0;

            return (
              <div 
                key={index}
                onClick={() => setActiveSectionIndex(index)}
                className="album-card"
                style={{ cursor: 'pointer' }}
              >
                {/* OKŁADKA */}
                <div style={{ 
                    position: 'relative', 
                    aspectRatio: '4/3', 
                    border: '2px solid white', 
                    overflow: 'hidden',
                    marginBottom: '20px',
                    backgroundColor: '#111'
                }}>
                    {coverImage ? (
                        <Image 
                            src={urlFor(coverImage).width(600).height(450).url()} 
                            alt={section.sectionTitle || 'Album'}
                            fill
                            style={{ objectFit: 'cover', transition: 'transform 0.5s' }}
                            className="album-cover-img"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                            Brak zdjęć
                        </div>
                    )}
                    
                    {/* OVERLAY Z LICZNIKIEM */}
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        background: 'var(--color-primary)',
                        color: 'white',
                        padding: '8px 15px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        borderTopLeftRadius: '0px'
                    }}>
                        {count} ZDJĘĆ
                    </div>
                </div>

                {/* TYTUŁ */}
                <h3 style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontSize: '2rem', 
                    color: 'white',
                    lineHeight: 1.1,
                    textTransform: 'uppercase'
                }}>
                    {section.sectionTitle || 'Bez tytułu'}
                </h3>
                <p style={{ color: 'var(--color-primary)', fontSize: '1rem', marginTop: '10px', textTransform: 'uppercase', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    Otwórz folder <span style={{ fontSize: '1.2rem' }}>&rarr;</span>
                </p>
              </div>
            );
          })}
        </div>
        
        <style jsx global>{`
            .album-card:hover .album-cover-img {
                transform: scale(1.05);
            }
            .album-card:hover h3 {
                text-decoration: underline;
                text-decoration-color: var(--color-primary);
                text-underline-offset: 5px;
            }
        `}</style>
      </div>
    );
  }

  // --- WIDOK POJEDYNCZEGO ALBUMU ---
  const activeSection = sections[activeSectionIndex];

  if (!activeSection) {
      return (
          <div className="text-center py-10" style={{ color: 'white' }}>
              <p>Nie znaleziono albumu.</p>
              <button onClick={() => setActiveSectionIndex(null)} style={{ marginTop: '1rem', textDecoration: 'underline', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>Wróć</button>
          </div>
      );
  }

  return (
    <div 
        style={{ 
            animation: 'fadeIn 0.5s ease-out forwards',
            opacity: 0 // Start invisible for animation
        }}
    >
        <style jsx>{`
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `}</style>

        {/* NAWIGACJA */}
        <button 
            onClick={() => setActiveSectionIndex(null)}
            className="btn"
            style={{ 
                marginBottom: '40px', 
                background: 'white', 
                color: 'black', 
                border: 'none',
                padding: '10px 25px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer'
            }}
        >
            <span>&larr;</span> WRÓĆ DO ALBUMÓW
        </button>

        <div style={{ marginBottom: '50px', borderBottom: '2px solid var(--color-primary)', paddingBottom: '20px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '10px', color: 'white', textTransform: 'uppercase', lineHeight: 1 }}>
                {activeSection.sectionTitle}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem' }}>
                {activeSection.images?.length || 0} zdjęć w tym albumie
            </p>
        </div>
        
        {(!activeSection.images || activeSection.images.length === 0) ? (
            <div style={{ textAlign: 'center', padding: '50px', color: '#888' }}>
                <p>Ten album jest pusty.</p>
            </div>
        ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {activeSection.images.map((image: any, imgIndex: number) => (
                    <div 
                        key={image._key || imgIndex} 
                        style={{ border: '2px solid white', overflow: 'hidden', aspectRatio: '4/3', cursor: 'pointer', position: 'relative', backgroundColor: '#222' }}
                        onClick={() => openLightbox(image)}
                        className="gallery-item"
                    >
                        <Image 
                            src={urlFor(image).width(800).height(600).url()} 
                            alt={`Zdjęcie ${imgIndex + 1} z albumu ${activeSection.sectionTitle}`}
                            fill
                            style={{ objectFit: 'cover', transition: 'transform 0.3s' }}
                            className="hover-zoom"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={imgIndex < 6}
                        />
                    </div>
                ))}
            </div>
        )}

      {/* LIGHTBOX */}
      {selectedImage && (
        <div 
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.95)',
                zIndex: 9999,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'zoom-out',
                animation: 'fadeIn 0.3s ease'
            }}
            onClick={closeLightbox}
        >
            {/* CLOSE BUTTON - Fixed position on screen */}
            <button 
                onClick={closeLightbox}
                style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    background: 'white',
                    border: '2px solid black',
                    color: 'black',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    fontSize: '2rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: 1,
                    zIndex: 10001,
                    boxShadow: '0 0 10px rgba(255,255,255,0.5)'
                }}
                aria-label="Zamknij"
            >
                &times;
            </button>

            <div 
                style={{ 
                    position: 'relative', 
                    width: '95vw', 
                    height: '90vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }} 
                onClick={(e) => e.stopPropagation()}
            >
                <Image 
                    src={urlFor(selectedImage).width(1920).url()} 
                    alt="Zdjęcie w pełnym rozmiarze"
                    fill
                    style={{ objectFit: 'contain' }}
                    sizes="95vw"
                    priority
                />
                
                {/* Fallback text (visible if image fails or loads slowly) */}
                <div style={{ position: 'absolute', zIndex: -1, color: 'white', textAlign: 'center' }}>
                    <p>Ładowanie zdjęcia...</p>
                    <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Jeśli zdjęcie się nie pojawi, sprawdź połączenie.</p>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
