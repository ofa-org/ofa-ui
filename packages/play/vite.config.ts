// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { OfaResolver } from 'ofa-ui/resolver'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [OfaResolver()],
    }),
  ],
})
