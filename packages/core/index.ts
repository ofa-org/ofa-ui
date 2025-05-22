import { makeInstaller } from '@ofa-ui/utils'
import components from './components'
import '@ofa-ui/theme/index.css'
const installer = makeInstaller(components)

export * from '@ofa-ui/components'
export default installer
