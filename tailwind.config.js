/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './context/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        verde:      '#4A5C35',
        'verde-mid':'#5B7041',
        'verde-lt': '#697f4d',
        'verde-dk': '#2e3a20',
        creme:      '#F2EBD9',
        'creme-2':  '#F8F3E8',
        'creme-3':  '#faf7f2',
        ink:        '#131810',
        'ink-2':    '#1a2016',
        'ink-3':    '#222b1c',
        gold:       '#C4975A',
        'gold-2':   '#d4a96a',
        muted:      '#6b7a5a',
        text:       '#2C3024',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        orbFloat:   { from:{ transform:'translate(0,0) scale(1)' }, to:{ transform:'translate(30px,-40px) scale(1.15)' } },
        pulseDot:   { '0%,100%':{ transform:'scale(1)', opacity:'1' }, '50%':{ transform:'scale(1.5)', opacity:'0.6' } },
        badgePulse: { '0%,100%':{ opacity:'0.5', transform:'scale(1)' }, '50%':{ opacity:'1', transform:'scale(1.03)' } },
        floatCard:  { '0%,100%':{ transform:'translateY(0)' }, '50%':{ transform:'translateY(-8px)' } },
        scrollLine: { '0%,100%':{ opacity:'0.3', transform:'scaleY(0.7)' }, '50%':{ opacity:'1', transform:'scaleY(1)' } },
        waRing:     { '0%':{ transform:'scale(1)', opacity:'0.6' }, '80%,100%':{ transform:'scale(1.3)', opacity:'0' } },
        loaderFill: { to:{ width:'100%' } },
        loaderIn:   { to:{ opacity:'1', transform:'translateY(0)' } },
      },
      animation: {
        'orb-1':      'orbFloat 12s ease-in-out infinite alternate',
        'orb-2':      'orbFloat 15s 3s ease-in-out infinite alternate-reverse',
        'pulse-dot':  'pulseDot 2s ease infinite',
        'badge-ring': 'badgePulse 3s ease infinite',
        'float-card': 'floatCard 4s ease-in-out infinite',
        'scroll-ln':  'scrollLine 2s ease-in-out infinite',
        'wa-ring':    'waRing 2.5s ease infinite',
        'loader-bar': 'loaderFill 1.6s 0.5s cubic-bezier(0.65,0,0.35,1) forwards',
        'loader-in':  'loaderIn 0.7s 0.2s cubic-bezier(0.16,1,0.3,1) forwards',
        'loader-lbl': 'loaderIn 0.5s 0.4s ease forwards',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
