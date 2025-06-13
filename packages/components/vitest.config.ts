import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()], // 添加 vue 插件
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
