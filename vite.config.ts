import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages는 https://yeonsu826.github.io/yeonsus_portfolio1/ 하위에서 서빙된다.
export default defineConfig({
  base: '/yeonsus_portfolio1/',
  plugins: [react()],
})
