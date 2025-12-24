'use client';

import { useState, useEffect } from 'react';
import { urlFor } from "@/sanity/lib/image";

export default function GalleryGrid({ sections }: { sections: any[] }) {
  const [selectedImage, setSelectedImage] = useState<any | null>(null);

  // Obsługa klawisza ESC do zamykania
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const openLightbox = (image: any) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden'; // Zablokuj scrollowanie tła
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset'; // Odblokuj scrollowanie
  };

  return (
    <>
      {sections.map((section: any, index: number) => (
        <div key={index} className="reveal-up" style={{ marginBottom: '80px' }}>
            {section.sectionTitle && (
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '30px', color: 'white' }}>
                    {section.sectionTitle}
                </h2>
            )}
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {section.images?.map((image: any, imgIndex: number) => (
                    <div 
                        key={imgIndex} 
                        style={{ border: '2px solid white', overflow: 'hidden', aspectRatio: '4/3', cursor: 'pointer' }}
                        onClick={() => openLightbox(image)}
                        className="gallery-item"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                            src={urlFor(image).width(800).height(600).url()} 
                            alt={`Gallery image ${imgIndex + 1}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                            className="hover-zoom"
                        />
                    </div>
                ))}
            </div>
        </div>
      ))}

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
            <div style={{ position: 'relative', maxWidth: '95vw', maxHeight: '95vh' }} onClick={(e) => e.stopPropagation()}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                    src={urlFor(selectedImage).width(1920).url()} 
                    alt="Full screen"
                    style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain', border: '2px solid white', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }}
                />
                <button 
                    onClick={closeLightbox}
                    style={{
                        position: 'absolute',
                        top: '-40px',
                        right: '-10px',
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        fontSize: '3rem',
                        cursor: 'pointer',
                        lineHeight: 1,
                        fontFamily: 'sans-serif'
                    }}
                    aria-label="Zamknij"
                >
                    &times;
                </button>
            </div>
        </div>
      )}
      
      <style jsx global>{`
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .gallery-item:hover .hover-zoom {
            transform: scale(1.05);
        }
      `}</style>
    </>
  );
}
