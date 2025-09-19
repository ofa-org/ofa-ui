import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

import { readdirSync, readdir } from 'fs'
import { filter, map, includes, defer, delay } from 'lodash'
import hooks from './hooksPlugin'
import shell from 'shelljs'

const TRY_MOVE_STYLES_DELAY = 750 as const

function moveStyles() {
  readdir('./dist/es/theme', (err) => {
    if (err) return delay(moveStyles, TRY_MOVE_STYLES_DELAY)
    defer(() => shell.mv('./dist/es/theme/index.css', './dist'))
    defer(() => shell.mv('./dist/es/theme', './dist'))
  })
}

function moveFiles() {
  readdir('./dist/es/resolvers', (err) => {
    if (err) return delay(moveFiles, TRY_MOVE_STYLES_DELAY)
    defer(() => {
      // 添加移动 resolvers 的逻辑
      shell.mv('./dist/es/resolvers', './dist/')
    })
  })
}

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: '../../tsconfig.build.json',
      outDir: 'dist/types', // ✅ 修改 outputDir -> outDir
    }),
    hooks({
      rmFiles: ['./dist/es', './dist/theme', './dist/types'],
      afterBuild: moveStyles,
    }),
    hooks({
      rmFiles: [],
      afterBuild: moveFiles,
    }),
  ],
  build: {
    // minify: false, // 禁用压缩
    outDir: 'dist/es', // 输出目录
    lib: {
      entry: ['./index.ts', './resolvers/ofa-resolver.ts'], // 入口文件，包含resolver
      name: 'OfaUi', // UMD 模块名称
      fileName: (format, entryName) => {
        if (entryName === 'ofa-resolver') {
          return 'resolvers/ofa-resolver.mjs'
        }
        return 'index.mjs'
      }, // 输出文件名
      formats: ['es'], // 输出格式
    },
    cssCodeSplit: true,
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'unplugin-vue-components'],
      output: {
        assetFileNames: (assetInfo) => {
          // 自定义资源文件名
          if (assetInfo.name === 'style.css') {
            return 'index.css' // CSS 文件放在 style 目录下
          }
          if (assetInfo.type === 'asset') {
            return 'theme/[name][extname]'
          }
          // 处理主题相关的 CSS 文件
          if (assetInfo.name && assetInfo.name.includes('theme')) {
            return 'theme/[name][extname]'
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
