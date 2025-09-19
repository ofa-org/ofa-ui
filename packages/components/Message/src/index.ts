import type { ExtractPropTypes } from 'vue'
import type Message from './index.vue'

// 定义 props
export const messageProps = {
  content: {
    type: String,
    default: '',
  },
} as const
// Props 类型
export type MessageProps = ExtractPropTypes<typeof messageProps>
// Message 组件实例类型
export type MessageInstance = InstanceType<typeof Message>
