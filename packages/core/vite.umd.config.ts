import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist/umd', // 输出目录
    lib: {
      entry: './index.ts', // 入口文件
      name: 'OfaUi', // UMD 模块名称
      fileName: 'index', // 输出文件名
      formats: ['umd'], // 输出格式
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue', // UMD 构建中 Vue 的全局变量名
        },
        assetFileNames: (assetInfo) => {
          // 自定义资源文件名
          if (assetInfo.name === 'style.css') {
            return 'index.css' // CSS 文件放在 style 目录下
          }
          return assetInfo.name as string // 其他资源文件名格式
        },
      },
    },
  },
})
