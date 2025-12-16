'use client'; 

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function MotionEngine() {
  const pathname = usePathname();

  useEffect(() => {
    // Funkcja uruchamiająca animacje
    const initAnimations = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Opcjonalnie: przestań obserwować po pokazaniu (dla wydajności)
            // observer.unobserve(entry.target); 
          }
        });
      }, { threshold: 0.1 });

      const elements = document.querySelectorAll('.reveal-up, .reveal-left');
      
      // Jeśli nie ma elementów, nie rób nic
      if (elements.length === 0) return;

      elements.forEach((el) => {
        // Ważne: Nie usuwamy klasy active na siłę, jeśli już jest, 
        // ale dla nowych stron Next.js elementy renderują się od nowa bez niej.
        observer.observe(el);
      });

      return observer;
    };

    // PARALLAX
    const handleScroll = () => {
      const scrolled = window.scrollY;
      document.querySelectorAll('.parallax-scroll').forEach((item) => {
        const speed = parseFloat(item.getAttribute('data-speed') || '0');
        if (item instanceof HTMLElement) {
          item.style.transform = `translateY(${scrolled * speed}px)`;
        }
      });
    };

    // URUCHOMIENIE (Z opóźnieniem dla pewności)
    // Next.js potrzebuje chwili na "narysowanie" nowej strony po kliknięciu linku.
    // Ustawiamy timeout na 300ms, żeby mieć pewność, że HTML już istnieje.
    const timer = setTimeout(() => {
      initAnimations();
    }, 300);

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]); // Uruchom ponownie przy każdej zmianie adresu URL

  return null;
}