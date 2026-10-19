/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // 莫兰迪色板
        morandi: {
          blue: '#8FA9BF',
          'blue-light': '#B8C9D9',
          'blue-bg': '#EEF3F8',
          green: '#9DB4A0',
          'green-light': '#BFD0C1',
          'green-bg': '#EFF3EF',
          yellow: '#D9C79A',
          'yellow-light': '#EBDDBB',
          'yellow-bg': '#FAF6EC',
          pink: '#D4A5A5',
          'pink-light': '#E6C4C4',
          'pink-bg': '#FAF0F0',
          purple: '#A89FC0',
          'purple-light': '#C4BED8',
          'purple-bg': '#F3F1F8',
          gray: '#8B8680',
          'gray-light': '#B8B3AC',
          'gray-bg': '#F5F4F2',
          ink: '#4A4458',
        },
      },
      fontFamily: {
        sans: ['"PingFang SC"', '"Microsoft YaHei"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        soft: '0 8px 30px rgba(74, 68, 88, 0.08)',
        'soft-lg': '0 12px 40px rgba(74, 68, 88, 0.12)',
      },
      keyframes: {
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        'bounce-slow': 'bounce-slow 2s ease-in-out infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
