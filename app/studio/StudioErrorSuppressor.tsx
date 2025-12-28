'use client'

if (typeof window !== 'undefined') {
  const originalError = console.error
  console.error = (...args) => {
    if (args.some(arg => typeof arg === 'string' && arg.toLowerCase().includes('disabletransition'))) {
      return
    }
    originalError(...args)
  }
}

export default function StudioErrorSuppressor() {
  return null
}
