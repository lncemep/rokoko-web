import SecretButton from './SecretButton';

export default function Footer({ quote, copyright }: { quote?: string, copyright?: string }) {
  return (
    <footer style={{ background: 'black', color: 'white', padding: '40px 0', textAlign: 'center', marginTop: 'auto' }}>
      <div className="container reveal-up">
         {quote && (
             <p style={{ fontFamily: 'var(--font-hand)', color: 'var(--color-primary)', fontSize: '1.2rem' }}>
                  {quote}
             </p>
         )}
         <p style={{ marginTop: '20px', fontSize: '0.8rem', opacity: 0.6 }}>
              <SecretButton /> {new Date().getFullYear()} {copyright || 'SKN ROKOKO'}
         </p>
      </div>
    </footer>
  );
}
