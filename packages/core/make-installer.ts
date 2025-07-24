import { provideGlobalConfig } from '@ofa-ui/components/config-provider/hooks/use-global-config'

import type { App, Plugin } from '@vue/runtime-core'
import type { ConfigProviderContext } from '@ofa-ui/components/config-provider'
import { INSTALLED_KEY } from '@ofa-ui/constants'

export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App, options?: ConfigProviderContext) => {
    if (app[INSTALLED_KEY]) return
    console.log(`output->app[INSTALLED_KEY`, app[INSTALLED_KEY])
    console.log(`output->components`, components)
    app[INSTALLED_KEY] = true
    components.forEach((c) => app.use(c))

    if (options) provideGlobalConfig(options, app, true)
  }

  return {
    install,
  }
}
