/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./demo.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Nature-derived Sanctuary color palette
        primary: '#4a654f', // Sage Green
        'primary-container': '#8daa91',
        'on-primary': '#ffffff',
        'on-primary-container': '#253f2b',
        'primary-fixed': '#cceacf',
        'primary-fixed-dim': '#b0ceb4',
        'on-primary-fixed': '#062010',
        'on-primary-fixed-variant': '#334d38',

        secondary: '#436463', // Muted Teal
        'secondary-container': '#c5eae8',
        'on-secondary': '#ffffff',
        'on-secondary-container': '#496a69',
        'secondary-fixed': '#c5eae8',
        'secondary-fixed-dim': '#aacdcc',
        'on-secondary-fixed': '#002020',
        'on-secondary-fixed-variant': '#2b4c4c',

        tertiary: '#615e57', // Light Beige
        'tertiary-container': '#a6a29a',
        'on-tertiary': '#ffffff',
        'on-tertiary-container': '#3b3933',
        'tertiary-fixed': '#e7e2d9',
        'tertiary-fixed-dim': '#cac6be',
        'on-tertiary-fixed': '#1d1c16',
        'on-tertiary-fixed-variant': '#494740',

        error: '#ba1a1a',
        'on-error': '#ffffff',
        'error-container': '#ffdad6',
        'on-error-container': '#93000a',

        background: '#fcf9f8', // Off-White
        'on-background': '#1b1c1c', // Dark Charcoal

        surface: '#fcf9f8',
        'on-surface': '#1b1c1c',
        'on-surface-variant': '#424842',
        'surface-dim': '#dcd9d9',
        'surface-bright': '#fcf9f8',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f6f3f2',
        'surface-container': '#f0eded',
        'surface-container-high': '#eae7e7',
        'surface-container-highest': '#e4e2e1',
        'inverse-surface': '#303030',
        'inverse-on-surface': '#f3f0f0',
        'inverse-primary': '#b0ceb4',

        outline: '#737972',
        'outline-variant': '#c2c8c0',
        'surface-tint': '#4a654f',
      },
      borderRadius: {
        'sm': '0.25rem',
        'DEFAULT': '0.5rem',
        'md': '0.75rem',
        'lg': '1rem',
        'xl': '1.5rem',
        'full': '9999px',
      },
      spacing: {
        'unit': '8px',
        'container-max-width': '1200px',
        'gutter': '24px',
        'margin-mobile': '20px',
        'margin-desktop': '40px',
        'section-gap': '80px',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
