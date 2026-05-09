import '@testing-library/jest-dom';

// JSDOM does not ship matchMedia. Components using it for responsive checks
// (e.g. ChildApp1's isDesktopViewport, ThemeContext's prefers-color-scheme
// initialization) need it shimmed in tests so they don't throw.
if (typeof window !== 'undefined' && typeof window.matchMedia !== 'function') {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}
