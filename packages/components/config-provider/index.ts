import ConfigProvider from './index.vue'
import { withInstall } from '@ofa-ui/utils'

export const OfaConfigProvider = withInstall(ConfigProvider)

export * from './types'
export * from './constants'
