import Link from 'next/link';
import Image from 'next/image';
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image"; // Potrzebne do generowania linku Logo
import Footer from "@/components/Footer";

async function getHomeData() {
  const data = await client.fetch(`*[_type == "homePage"][0]`, {}, { next: { revalidate: 60 } });
  return data;
}

export default async function Home() {
  const data = await getHomeData();

  if (!data) {
    return (
      <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0022FF', color: 'white', fontFamily: 'monospace' }}>
        <div style={{ textAlign: 'center' }}>
            <h1>Brak treści!</h1>
            <p>Zaloguj się do panelu /studio i uzupełnij "Strona Główna".</p>
        </div>
      </div>
    );
  }

  const { 
    siteLogo, // <-- Pobieramy LOGO
    heroPreTitle, 
    heroTitle, 
    heroButtonText, 
    marqueeText, 
    aboutTitle, 
    aboutDescription, 
    aboutButtonText, 
    pillarsTitle, 
    pillarsList,
    headerBlogBtn,
    headerGalleryBtn,
    headerLibraryBtn,
    headerContactBtn,
    headerSocialBtn,
    footerQuote,
    footerCopyright
  } = data;

  return (
    <>
      <header className="main-header">
        <div className="container nav-wrapper">
          <Link href="/">
             {/* LOGO DYNAMICZNE Z SANITY */}
             {siteLogo ? (
                 <Image 
                    src={urlFor(siteLogo).url()} 
                    alt="ROKOKO Logo" 
                    className="logo-img"
                    width={150}
                    height={50}
                    priority
                    style={{ width: 'auto', height: '50px' }}
                 />
             ) : (
                 // Fallback, jeśli nie wgrałeś logo w panelu
                 <span style={{fontWeight:'bold', fontSize:'1.5rem'}}>SKN ROKOKO</span>
             )}
          </Link>
          
          <nav style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
            <Link href="/o-nas" style={{ fontWeight: 'bold', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
                O Nas
            </Link>
            <Link href="/blog" style={{ fontWeight: 'bold', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
                {headerBlogBtn || 'Blog'}
            </Link>
            <Link href="/gallery" style={{ fontWeight: 'bold', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
                {headerGalleryBtn || 'Galeria'}
            </Link>
            <Link href="/library" style={{ fontWeight: 'bold', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
                {headerLibraryBtn || 'Biblioteka'}
            </Link>
            <Link href="/contact" style={{ fontWeight: 'bold', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
                {headerContactBtn || 'Współpraca'}
            </Link>
            <Link href="/social" className="btn" style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem', marginLeft: '10px' }}>
              {headerSocialBtn || 'Social'}
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="container">
            <div className="reveal-up">
              <p className="hero-pre-title">{heroPreTitle}</p>
            </div>
            
            <h1 
              className="hero-title reveal-up delay-100 parallax-scroll" 
              data-speed="0.3"
              dangerouslySetInnerHTML={{ __html: heroTitle || '' }}
            />
            
            <div className="reveal-up delay-200">
              <Link href="/o-nas" className="btn">{heroButtonText}</Link>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="marquee-container reveal-up delay-300">
          <div className="marquee-content">
            {marqueeText} &bull; {marqueeText}
          </div>
        </div>

        {/* SEKCJA O NAS + FILARY */}
        <section className="section-paper">
           <div className="container grid-2">
               
               {/* LEWA STRONA (BIAŁA KARTA) */}
               <div className="reveal-up">
                   <h2 style={{fontFamily: 'var(--font-display)', fontSize: '3rem', marginBottom: '20px'}}>
                       {aboutTitle}
                   </h2>
                   <div className="info-card" style={{transform: 'rotate(-1deg)'}}>
                       <p style={{fontSize: '1.1rem'}}>
                           {aboutDescription}
                       </p>
                       <Link href="/o-nas" style={{textDecoration: 'underline', fontWeight: 'bold', display: 'inline-block', marginTop: '10px'}}>
                           {aboutButtonText}
                       </Link>
                   </div>
               </div>
               
               {/* PRAWA STRONA (CZARNA KARTA) */}
               <div className="reveal-up delay-200" style={{marginTop: '40px'}}>
                   <div className="info-card" style={{background: 'var(--color-black)', color: 'white', transform: 'rotate(2deg)', borderColor: 'var(--color-primary)'}}>
                       <h3 style={{color: 'var(--color-primary)', fontFamily: 'var(--font-display)', fontSize: '1.5rem'}}>
                           {pillarsTitle}
                       </h3>
                       
                       <ul style={{listStyle: 'none', marginTop: '10px'}}>
                           {pillarsList && pillarsList.length > 0 ? (
                               pillarsList.map((item: string, index: number) => (
                                   <li key={index} style={{marginBottom:'5px'}}>
                                       {item}
                                   </li>
                               ))
                           ) : (
                               <li>Brak elementów w liście.</li>
                           )}
                       </ul>

                   </div>
               </div>
           </div>
        </section>
      </main>

      <Footer quote={footerQuote} copyright={footerCopyright} />
    </>
  );
}