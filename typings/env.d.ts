import { INSTALLED_KEY } from '@ofa-ui/constants'

declare module '@vue/runtime-core' {
  interface App {
    [INSTALLED_KEY]?: boolean
  }
}
