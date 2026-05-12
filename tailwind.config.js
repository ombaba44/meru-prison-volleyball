/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0f172a', // deep gray / charcoal
          green: '#1a472a', // dark prison green
          lightGreen: '#2d6a4f',
          orange: '#f97316',
          gold: '#fbbf24', // gold accents
          blue: '#3b82f6',
          accent: '#1e293b'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [],
}
