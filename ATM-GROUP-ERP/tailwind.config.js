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
        // Primary Background
        'bg-primary': '#0F1115',
        // Secondary Background
        'bg-secondary': '#1a1f2e',
        // Accent
        'accent-primary': '#1e40af',
        'accent-secondary': '#3b82f6',
        // Action Color
        'action': '#ff8c00',
        'action-hover': '#ff9f1a',
        // Typography
        'text-primary': '#ffffff',
        'text-secondary': '#b0b0b0',
        // Cards
        'card-bg': 'rgba(26, 31, 46, 0.4)',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '12px',
        lg: '16px',
        xl: '20px',
      },
      borderRadius: {
        'premium': '20px',
      },
      boxShadow: {
        'premium': '0 8px 32px rgba(31, 38, 135, 0.37)',
        'glow': '0 0 20px rgba(62, 129, 245, 0.5)',
        'glow-lg': '0 0 40px rgba(62, 129, 245, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: {
        'gradient-glow': 'radial-gradient(circle, rgba(62, 129, 245, 0.15) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
};
