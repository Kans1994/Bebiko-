/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Georgia', 'Cambria', 'serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: '#F5F0EB',
        foreground: '#2C2825',
      },
      boxShadow: {
        soft: '0 18px 50px rgba(44, 40, 37, 0.08)',
      },
    },
  },
  plugins: [],
};
