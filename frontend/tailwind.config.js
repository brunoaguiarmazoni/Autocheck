/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        surface: '#fbf9f9',
        'surface-dim': '#dbdada',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f5f3f3',
        'surface-container': '#efeded',
        'surface-container-high': '#e9e8e8',
        'surface-container-highest': '#e4e2e2',
        'on-surface': '#1b1c1c',
        primary: '#112a3f',
        'primary-container': '#294056',
        'on-primary': '#ffffff',
        secondary: '#5d5f5f',
        'secondary-container': '#dcdddd',
        tertiary: '#272829',
        'text-primary': '#2C2C2C',
        'text-secondary': '#6B6B6B',
        success: '#10B981',
        alert: '#EF4444',
        info: '#64748B',
        outline: '#73777d',
        'outline-variant': '#c3c7cd',
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
