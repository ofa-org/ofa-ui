import { provideGlobalConfig } from '@ofa-ui/components/config-provider/hooks/use-global-config'

import type { ConfigProviderContext } from '@ofa-ui/components/config-provider'
import { INSTALLED_KEY } from '@ofa-ui/constants'
import type { Plugin } from 'vue'
import type { App } from '@vue/runtime-core'
export const makeInstaller = (components: Plugin<[]>[] = []) => {
  const install = (app: App, options?: ConfigProviderContext) => {
    if (app[INSTALLED_KEY]) return
    app[INSTALLED_KEY] = true
    components.forEach((c: any) => app.use(c))

    if (options) provideGlobalConfig(options, app, true)
  }

  return {
    install,
  }
}
