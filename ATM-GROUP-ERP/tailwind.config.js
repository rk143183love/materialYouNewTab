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
        'bg-primary': '#0F1115',
        'bg-secondary': '#1a1f2e',
        'accent-primary': '#1e40af',
        'accent-secondary': '#3b82f6',
        'action': '#ff8c00',
        'action-hover': '#ff9f1a',
        'text-primary': '#ffffff',
        'text-secondary': '#b0b0b0',
        'card-bg': 'rgba(26, 31, 46, 0.4)',
      },
      borderRadius: {
        'premium': '20px',
      },
      boxShadow: {
        'premium': '0 8px 32px rgba(31, 38, 135, 0.37)',
        'glow': '0 0 20px rgba(62, 129, 245, 0.5)',
      },
    },
  },
  plugins: [],
};