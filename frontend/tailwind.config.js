// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{html,js,jsx,ts,tsx}', // Tailwind가 처리할 파일 경로를 지정
  ],
  theme: {
    extend: {}, // 필요한 커스터마이징을 여기서 설정 가능
  },
  plugins: [],
};
