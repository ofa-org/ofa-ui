import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

import { readdirSync } from 'fs'
import { filter, map, includes } from 'lodash'
export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: '../../tsconfig.build.json',
      outDir: 'dist/types', // ✅ 修改 outputDir -> outDir
    }),
  ],
  build: {
    outDir: 'dist/es', // 输出目录
    lib: {
      entry: './index.ts', // 入口文件
      name: 'OfaUi', // UMD 模块名称
      fileName: 'index', // 输出文件名
      formats: ['es'], // 输出格式
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        assetFileNames: (assetInfo) => {
          // 自定义资源文件名
          if (assetInfo.name === 'style.css') {
            return 'index.css' // CSS 文件放在 style 目录下
          }
          return assetInfo.name as string // 其他资源文件名格式
        },
        manualChunks(id) {
          if (includes(id, 'node_modules')) return 'vendor'

          if (includes(id, '/packages/hooks')) return 'hooks'

          if (
            includes(id, '/packages/utils') ||
            includes(id, 'plugin-vue:export-helper')
          )
            return 'utils'

          for (const item of getDirectoriesSync('../components')) {
            if (includes(id, `/packages/components/${item}`)) return item
          }
        },
      },
    },
  },
})
function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true })

  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  )
}
