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
        // Doctolib x India Brand Colors
        'brand-indigo': {
          DEFAULT: '#3730A3',
          50: '#EFEEF9',
          100: '#DEDCF3',
          200: '#BEB9E7',
          300: '#9D96DB',
          400: '#7D73CF',
          500: '#3730A3', // Main - Deep Indigo (The "Ink" of tribal art)
          600: '#2C2682',
          700: '#211D62',
          800: '#161341',
          900: '#0B0A21',
        },
        'brand-ochre': {
          DEFAULT: '#D97706',
          50: '#FEF6E7',
          100: '#FDEDCF',
          200: '#FBDB9F',
          300: '#F9C96F',
          400: '#F7B73F',
          500: '#D97706', // Main - Ochre/Turmeric (The "Earth" of tribal art)
          600: '#AE5F05',
          700: '#824704',
          800: '#573003',
          900: '#2B1801',
        },
        'bg-app': {
          DEFAULT: '#FAFBFC',
          50: '#FFFFFF',
          100: '#FAFBFC', // Main - Light Grey background
          200: '#F4F6F8',
          300: '#E9EDF1',
          400: '#DFE4EA',
          500: '#D4DBE3',
        },
        'brand-charcoal': {
          DEFAULT: '#1F2937',
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937', // Main - Soft Charcoal text
          900: '#111827',
        },
        // Legacy colors (keeping for backward compatibility)
        'calm-blue': {
          DEFAULT: '#3730A3', // Mapped to brand-indigo
        },
        'sage-green': {
          DEFAULT: '#A9CBB7', // Keep for wellness content
        },
        'warm-coral': {
          DEFAULT: '#D97706', // Mapped to brand-ochre
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
