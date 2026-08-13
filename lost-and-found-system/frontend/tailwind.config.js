/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ink-navy': '#1B2A4A',
        'ink-charcoal': '#2C3E50',
        'ink-slate': '#64748B',
        'sage': '#5B8C5A',
        'sage-light': '#E8F0E8',
        'sage-deep': '#3D6B3D',
        'washi': '#FAF8F5',
        'kozo': '#F3EDE4',
        'gold-leaf': '#C4A35A',
        'gold-faint': '#F5EFE0',
        'sumi-gray': '#E8E4DE',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
