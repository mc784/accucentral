import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors - "Abyssal Navy & Medical Slate"
        'navy': {
          DEFAULT: '#0B1929',
          50: '#E8EDF3',
          100: '#D1DBE7',
          200: '#A3B7CF',
          300: '#7593B7',
          400: '#476F9F',
          500: '#0B1929', // Main - Deep ocean, parasympathetic nervous system
          600: '#091420',
          700: '#070F18',
          800: '#050A10',
          900: '#020508',
        },
        'slate-medical': {
          DEFAULT: '#F0F4F8',
          50: '#FFFFFF',
          100: '#F0F4F8', // Main - High-end clinic feel
          200: '#E1E9F1',
          300: '#D2DEEA',
          400: '#C3D3E3',
          500: '#B4C8DC',
        },
        // Accent Colors - "Guru Gold & Cortisol Coral"
        'gold': {
          DEFAULT: '#C5A065',
          50: '#F5F0E5',
          100: '#EBE1CB',
          200: '#D7C397',
          300: '#C5A065', // Main - Wisdom, premium, Jupiter energy
          400: '#B38F52',
          500: '#8F7342',
          600: '#6D5732',
        },
        'coral': {
          DEFAULT: '#D9725F',
          50: '#FBEDE9',
          100: '#F7DBD3',
          200: '#EFB7A7',
          300: '#E7937B',
          400: '#D9725F', // Main - Vitality, grounded action
          500: '#C85E4C',
          600: '#A84D3E',
        },
      },
      fontFamily: {
        // Headings (Serif) - "The Scholar"
        heading: ['var(--font-fraunces)', 'Playfair Display', 'Georgia', 'serif'],
        // Body (Sans-serif) - "The Modernist"
        body: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
