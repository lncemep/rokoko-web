'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function HeaderScrollLogic() {
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    // Resetujemy pozycję przy zmianie strony
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      // Pobieramy nagłówek dynamicznie przy każdym scrollu
      // To gwarantuje, że zawsze mamy aktualny element DOM, nawet po nawigacji
      const header = document.querySelector('.main-header');
      if (!header) return;

      const currentScrollY = window.scrollY;
      
      // Zawsze pokazuj na samej górze
      if (currentScrollY < 10) {
        header.classList.remove('hide');
        lastScrollY.current = currentScrollY;
        return;
      }

      // Chowaj przy scrollowaniu w dół (jeśli nie jesteśmy na samej górze)
      if (currentScrollY > lastScrollY.current && currentScrollY > 60) {
        header.classList.add('hide');
      } 
      // Pokazuj przy scrollowaniu w górę
      else if (currentScrollY < lastScrollY.current) {
        header.classList.remove('hide');
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]); // Uruchom ponownie przy zmianie URL

  return null;
}
