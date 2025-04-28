module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx,scss}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7338f0',
        secondary: '#cbff2e',
        tertiary: '#f4ae6a',
      },
      fontFamily: {
        sans: ['Cairo ', 'sans-serif'],
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/aspect-ratio'),
  ],
}