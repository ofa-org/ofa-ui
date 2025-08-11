// ofa-resolver.ts
import type { ComponentResolver } from 'unplugin-vue-components'

export interface OfaResolverOptions {
  /**
   * 自动导入 CSS 样式
   * @default true
   */
  importStyle?: boolean
}

export function OfaResolver(
  options: OfaResolverOptions = {}
): ComponentResolver {
  const { importStyle = true } = options

  return {
    type: 'component',
    resolve: (name: string) => {
      // 匹配 Ofa 开头的组件
      if (name.startsWith('Ofa')) {
        const partialName = name.slice(3)
        // 转换为短横线命名
        const kebabName = partialName.replace(/\B([A-Z])/g, '-$1').toLowerCase()

        const componentInfo = {
          name: name,
          from: 'ofa-ui', // 或具体的包路径
        }

        // 如果需要导入样式
        if (importStyle) {
          return {
            ...componentInfo,
            sideEffects: `ofa-ui/theme/${kebabName}.css`,
          }
        }

        return componentInfo
      }
    },
  }
}
