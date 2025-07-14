import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { compression } from 'vite-plugin-compression2'
import hooks from './hooksPlugin'
import { readFile } from 'fs'
import { defer, delay } from 'lodash'
import shell from 'shelljs'

const TRY_MOVE_STYLES_DELAY = 750 as const
function moveStyles() {
  readFile('./dist/umd/index.css.gz', (err) => {
    if (err) return delay(moveStyles, TRY_MOVE_STYLES_DELAY)
    defer(() => shell.cp('./dist/umd/index.css', './dist/index.css'))
  })
}

export default defineConfig({
  plugins: [
    vue(),
    compression({
      include: /.(js|css)$/i,
      algorithms: ['gzip'], // ['gzip', 'brotliCompress']
    }),
    hooks({
      rmFiles: ['./dist'],
      afterBuild: moveStyles,
    }),
  ],
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
