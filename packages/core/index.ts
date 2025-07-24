import '@ofa-ui/theme/index.css'

import components from '@ofa-ui/components'
import type { ConfigProviderContext } from '@ofa-ui/components/config-provider/constants'
import type { App, Plugin } from 'vue'
import { provideGlobalConfig } from '@ofa-ui/components/config-provider/hooks/use-global-config'

export default {
  install(app: App, options?: ConfigProviderContext) {
    components.forEach((component) => {
      app.component(component.name!, component)
    })
    if (options) provideGlobalConfig(options, app, true)
  },
} as Plugin

export * from '@ofa-ui/locale'
