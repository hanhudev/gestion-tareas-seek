import '@testing-library/jest-dom'

declare global {
  var TextEncoder: typeof globalThis.TextEncoder
  var TextDecoder: typeof globalThis.TextDecoder
}

// Polyfill para Next.js si es necesario
if (typeof global.TextEncoder === 'undefined' && typeof TextEncoder !== 'undefined') {
  global.TextEncoder = TextEncoder
}

if (typeof global.TextDecoder === 'undefined' && typeof TextDecoder !== 'undefined') {
  global.TextDecoder = TextDecoder
}
