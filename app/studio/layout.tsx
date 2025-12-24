// PLIK: src/app/studio/layout.tsx
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  // HACK: Wyciszamy błąd "disableTransition" z biblioteki Sanity/styled-components
  if (typeof window !== 'undefined') {
    const originalError = console.error;
    console.error = (...args) => {
      if (args[0] && typeof args[0] === 'string' && args[0].includes('disableTransition')) {
        return;
      }
      originalError(...args);
    };
  }

  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: 'white' }} suppressHydrationWarning={true}>
        {/* Tutaj NIE ładujemy globals.css ani MotionEngine, żeby nie psuć panelu */}
        {children}
      </body>
    </html>
  )
}