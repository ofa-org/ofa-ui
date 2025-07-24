import { INSTALLED_KEY } from '@ofa-ui/constants'

declare module '@vue/runtime-core' {
  interface App {
    [INSTALLED_KEY]?: boolean
  }
}

declare global {
  const process: {
    env: {
      NODE_ENV: string
    }
  }

  namespace JSX {
    interface IntrinsicAttributes {
      class?: unknown
      style?: unknown
    }
  }
}
