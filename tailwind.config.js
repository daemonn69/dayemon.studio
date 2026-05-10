/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#FAF6FF',
        card: '#FFFFFF',
        ink: '#1B1230',
        muted: '#6B5B85',
        primary: '#B57BFF',
        primaryDark: '#8E54E0',
        pink: '#FFB4D9',
        cream: '#FFE9A8',
        mint: '#B6F0D6',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 8px 24px -12px rgba(70, 40, 110, 0.18)',
        pop: '0 24px 60px -28px rgba(70, 40, 110, 0.32)',
        glass: 'inset 0 1px 0 0 rgba(255,255,255,0.6), 0 1px 2px 0 rgba(70,40,110,0.06)',
        glow: '0 0 60px -10px rgba(181, 123, 255, 0.55)',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backgroundImage: {
        'dot-grid':
          'radial-gradient(rgba(27,18,48,0.12) 1px, transparent 1px)',
        'conic-hero':
          'conic-gradient(from 180deg at 50% 50%, #B57BFF, #FFB4D9, #FFE9A8, #B6F0D6, #B57BFF)',
      },
      backgroundSize: {
        'dot-grid': '20px 20px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-14px,0)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(30px,-20px) scale(1.05)' },
          '66%': { transform: 'translate(-20px,20px) scale(0.95)' },
        },
        'blob-2': {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(-40px,30px) scale(1.1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        shine: {
          '0%': { transform: 'translateX(-120%) skewX(-20deg)' },
          '100%': { transform: 'translateX(220%) skewX(-20deg)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 9s ease-in-out infinite',
        blob: 'blob 18s ease-in-out infinite',
        'blob-2': 'blob-2 22s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 50s linear infinite',
        shine: 'shine 1.2s ease-out',
        'spin-slow': 'spin-slow 28s linear infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
