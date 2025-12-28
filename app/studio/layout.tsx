// PLIK: src/app/studio/layout.tsx
import StudioErrorSuppressor from './StudioErrorSuppressor'

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: 'white' }} suppressHydrationWarning={true}>
        <StudioErrorSuppressor />
        {/* Tutaj NIE ładujemy globals.css ani MotionEngine, żeby nie psuć panelu */}
        {children}
      </body>
    </html>
  )
}