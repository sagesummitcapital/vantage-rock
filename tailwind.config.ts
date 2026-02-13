import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          950: '#09090b',
          900: '#0c0c0e',
          850: '#111113',
          800: '#18181b',
          700: '#27272a',
          600: '#3f3f46',
          500: '#52525b',
        },
        content: {
          100: '#fafafa',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
        },
        accent: {
          300: '#d4a574',
          400: '#c9956a',
          500: '#b8845a',
          600: '#a0724d',
        },
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '720px',
        wide: '1120px',
      },
    },
  },
  plugins: [],
}

export default config
