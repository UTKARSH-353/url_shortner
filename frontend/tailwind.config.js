/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: { 50:'#eff6ff',100:'#dbeafe',500:'#3b82f6',600:'#2563eb',700:'#1d4ed8' },
        ink: { 900:'#0f172a', 700:'#334155', 500:'#64748b' },
      },
      fontFamily: { sans: ['Inter','ui-sans-serif','system-ui','sans-serif'] },
      boxShadow: { soft: '0 10px 30px -12px rgba(2,6,23,0.12)' },
    },
  },
  plugins: [],
};
