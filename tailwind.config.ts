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
        // Primary Brand Colors - "Calm Blue & Sage Green"
        'calm-blue': {
          DEFAULT: '#7FB3D5',
          50: '#EDF6FB',
          100: '#DBEdf7',
          200: '#B7DBEF',
          300: '#93C9E7',
          400: '#7FB3D5', // Main - Tranquil, healing, professional
          500: '#5A9BC7',
          600: '#4781AB',
          700: '#36648A',
          800: '#264B68',
          900: '#153246',
        },
        'sage-green': {
          DEFAULT: '#A9CBB7',
          50: '#F2F7F4',
          100: '#E5EFE9',
          200: '#CBDFD3',
          300: '#B1CFBD',
          400: '#A9CBB7', // Main - Natural healing, balance
          500: '#8BB59D',
          600: '#6D9F83',
          700: '#547F68',
          800: '#3E5F4E',
          900: '#283F34',
        },
        'deep-teal': {
          DEFAULT: '#4A7C7E',
          50: '#E9F1F1',
          100: '#D3E3E3',
          200: '#A7C7C7',
          300: '#7BABAB',
          400: '#4A7C7E', // Main - Professional, grounded
          500: '#3C6567',
          600: '#2E4E4F',
          700: '#213738',
          800: '#162223',
          900: '#0B1112',
        },
        'slate-medical': {
          DEFAULT: '#F0F4F8',
          50: '#FFFFFF',
          100: '#F0F4F8', // Main - Clean, clinical background
          200: '#E1E9F1',
          300: '#D2DEEA',
          400: '#C3D3E3',
          500: '#B4C8DC',
        },
        // Accent Color - "Warm Coral" (for important CTAs)
        'warm-coral': {
          DEFAULT: '#F4A261',
          50: '#FEF6EF',
          100: '#FCEDDF',
          200: '#F9DBBF',
          300: '#F7C99F',
          400: '#F4A261', // Main - Energy, call-to-action
          500: '#F18A3E',
          600: '#E96F1C',
          700: '#C35714',
          800: '#91410F',
          900: '#5F2B0A',
        },
        // Neutral Text Colors
        'charcoal': {
          DEFAULT: '#334155',
          500: '#334155', // Headings
        },
        'slate-gray': {
          DEFAULT: '#64748B',
          500: '#64748B', // Body text
        },
      },
      fontFamily: {
        // Headings - "Bold & Professional"
        heading: ['Montserrat', 'system-ui', '-apple-system', 'sans-serif'],
        // Body - "Clean & Readable"
        body: ['Open Sans', 'system-ui', '-apple-system', 'sans-serif'],
        // Monospace for point codes (e.g., LI4, PC6)
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
