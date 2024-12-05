import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths'; // 추가된 부분

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()], // tsconfigPaths 플러그인 추가
  // server: {
  //   hmr: false, // HMR 완전히 비활성화
  // },
});
