// PLIK: src/components/ContactForm.tsx
'use client'; // To musi być na samej górze!

import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

export default function ContactForm() {
  // TU JEST WPISANY TWÓJ KOD ZE ZDJĘCIA (xyzrqono)
  const [state, handleSubmit] = useForm("xyzrqono");

  // Co ma się pokazać PO wysłaniu wiadomości? (Zielony komunikat sukcesu)
  if (state.succeeded) {
      return (
          <div style={{ 
              background: '#d4edda', 
              color: '#155724', 
              padding: '40px', 
              border: '3px solid #155724', 
              textAlign: 'center' 
          }}>
              <h3 style={{fontSize: '1.5rem', marginBottom: '10px'}}>🚀 Wiadomość wysłana!</h3>
              <p>Dzięki za kontakt. Odpiszemy najszybciej jak się da.</p>
              <button 
                onClick={() => window.location.reload()} 
                style={{marginTop: '20px', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', color: 'inherit'}}
              >
                  Wyślij kolejną wiadomość
              </button>
          </div>
      );
  }

  // Sam formularz
  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* IMIĘ I NAZWISKO */}
        <div>
            <label htmlFor="name" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                Imię i Nazwisko / Organizacja
            </label>
            <input 
                id="name"
                type="text" 
                name="name" // To pole zobaczy Formspree
                placeholder="Wpisz dane..." 
                required
                style={{ width: '100%', padding: '15px', border: '2px solid black', background: 'white', fontFamily: 'inherit', fontSize: '1rem' }} 
            />
            <ValidationError prefix="Name" field="name" errors={state.errors} />
        </div>

        {/* EMAIL */}
        <div>
            <label htmlFor="email" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                Twój E-mail
            </label>
            <input 
                id="email"
                type="email" 
                name="email" 
                placeholder="adres@email.com" 
                required
                style={{ width: '100%', padding: '15px', border: '2px solid black', background: 'white', fontFamily: 'inherit', fontSize: '1rem' }} 
            />
            <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>

        {/* TEMAT */}
        <div>
            <label htmlFor="subject" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                Temat
            </label>
            <select 
                id="subject"
                name="subject" 
                style={{ width: '100%', padding: '15px', border: '2px solid black', background: 'white', fontFamily: 'inherit', fontSize: '1rem', appearance: 'none' }}
            >
                <option value="Dolaczenie">Chcę dołączyć do koła</option>
                <option value="Wspolpraca">Propozycja współpracy</option>
                <option value="Warsztaty">Zgłoszenie na warsztaty</option>
                <option value="Inne">Inny temat</option>
            </select>
        </div>

        {/* WIADOMOŚĆ */}
        <div>
            <label htmlFor="message" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                Wiadomość
            </label>
            <textarea 
                id="message"
                name="message" 
                rows={5} 
                placeholder="Opisz swoją sprawę..." 
                required
                style={{ width: '100%', padding: '15px', border: '2px solid black', background: 'white', fontFamily: 'inherit', fontSize: '1rem', resize: 'vertical' }}
            ></textarea>
            <ValidationError prefix="Message" field="message" errors={state.errors} />
        </div>

        {/* PRZYCISK WYŚLIJ */}
        <button 
            type="submit" 
            disabled={state.submitting}
            className="btn" 
            style={{ 
                background: 'var(--color-primary)', 
                color: 'white', 
                width: '100%', 
                justifyContent: 'center', 
                marginTop: '10px',
                cursor: 'pointer',
                opacity: state.submitting ? 0.7 : 1
            }}
        >
            {state.submitting ? 'WYSYŁANIE...' : 'WYŚLIJ ZGŁOSZENIE →'}
        </button>

        <p style={{ fontSize: '0.75rem', textAlign: 'center', opacity: 0.6, marginTop: '10px' }}>
            *Administratorem danych jest SKN Rokoko.
        </p>

    </form>
  );
}