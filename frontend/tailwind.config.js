// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{html,js,jsx,ts,tsx}', // Tailwind가 처리할 파일 경로를 지정
  ],
  theme: {
    extend: {
      colors: {
        grayscale: {
          white: '#FFFFFF',
          50: 'rgba(60, 60, 67, 0.36)',
          100: '#B7B7B7',
          200: '#6D6D6D',
          400: '#555555',
          800: '#3E3E3E',
          900: '1C1C1C',
        },
        blueGray: {
          200: '#495664',
          600: '#245C87',
          800: '#333C4A',
        },
        marker: {
          user1: '#B4D033',
          user2: '#22A751',
          user3: '#2722A7',
          user4: '#8F22A7',
          user5: '#A73D22',
        },
      },
      fontSize: {
        '3xs': '0.5rem',
        '2xs': '0.625rem',
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
      },
      boxShadow: {
        floatButton: '0 5px 10px rgba(0,0,0,0.3)',
        floatMenuButton: '0 4px 4px rgba(0,0,0,0.25)',
        float: '0 4px 20px rgba(0, 0, 0, 0.13)',
        basic: 'inset 0 0 3px rgba(0, 0, 0, 0.11)',
      },
    }, // 필요한 커스터마이징을 여기서 설정 가능
  },
  plugins: [],
};
