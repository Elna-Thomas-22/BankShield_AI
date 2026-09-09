/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0A192F',
          800: '#0B132B',
          700: '#1C2541',
          600: '#3A506B'
        },
        brand: {
          blue: '#1E40AF',
          blueHover: '#1D4ED8',
          accent: '#2563EB',
          teal: '#0D9488',
          tealHover: '#0F766E',
          emerald: '#10B981'
        }
      }
    },
  },
  plugins: [],
}
