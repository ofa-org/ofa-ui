import '@ofa-ui/theme/index.css'
export * from '@ofa-ui/components'

import components from '@ofa-ui/components'
import type { App, Plugin } from 'vue'

export default {
  install(app: App) {
    components.forEach((component) => {
      app.component(component.name!, component)
    })
  },
} as Plugin
