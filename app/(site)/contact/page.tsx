import Link from 'next/link';
import Image from 'next/image';
import { client } from "@/sanity/lib/client";
import ContactForm from "@/components/ContactForm";
import { PortableText } from '@portabletext/react';

async function getContactData() {
  const data = await client.fetch(`*[_type == "contactPage"][0]`, {}, { next: { revalidate: 60 } });
  return data;
}

export default async function ContactPage() {
  const data = await getContactData();

  const title = data?.title || 'KONTAKT';
  const email = data?.email || 'rokoko@polsl.pl';
  const instagram = data?.instagram;
  const facebook = data?.facebook;

  return (
    <div className="animated-bg" style={{ overflowX: 'hidden' }}>
        
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
            
            <div className="container">
                
                <div className="grid-responsive">
                    
                    {/* LEWA KOLUMNA - INFO */}
                    <div className="reveal-up">
                        <h1 
                            className="contact-title"
                        >
                            {title}
                        </h1>

                        <div className="contact-info-card" style={{ marginBottom: '40px' }}>
                            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '15px' }}>
                                Dane kontaktowe
                            </h3>
                            <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
                                <strong>Email:</strong> <a href={`mailto:${email}`} style={{ textDecoration: 'underline' }}>{email}</a>
                            </p>
                            <div style={{ display: 'flex', gap: '15px', marginTop: '20px', flexWrap: 'wrap' }}>
                                {instagram && (
                                    <a href={instagram} target="_blank" rel="noopener noreferrer" className="btn" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                                        Instagram
                                    </a>
                                )}
                                {facebook && (
                                    <a href={facebook} target="_blank" rel="noopener noreferrer" className="btn" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                                        Facebook
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* WSPÓŁPRACA */}
                        {data?.collaborationTitle && (
                            <div style={{ color: 'white' }}>
                                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '20px', color: 'var(--color-primary)' }}>
                                    {data.collaborationTitle}
                                </h2>
                                <div style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
                                    <PortableText value={data.collaborationContent} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* PRAWA KOLUMNA - FORMULARZ */}
                    <div className="reveal-up" style={{ animationDelay: '0.2s' }}>
                        <div className="contact-form-card">
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '20px' }}>
                                Formularz kontaktowy
                            </h2>
                            <p style={{ marginBottom: '30px' }}>
                                Masz pytanie? Chcesz dołączyć? Napisz do nas!
                            </p>
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
