import { computed, getCurrentInstance, inject, provide, ref, unref } from 'vue'
import { localeContextKey } from '@ofa-ui/hooks'
import { configProviderContextKey } from '../constants'

import type { App, Ref, MaybeRef, InjectionKey } from 'vue'
import type { ConfigProviderContext } from '../constants'
import { debugWarn } from '@ofa-ui/utils'
import { merge } from 'lodash'

const globalConfig = ref<ConfigProviderContext>()

export function useGlobalConfig<
  K extends keyof ConfigProviderContext,
  D extends ConfigProviderContext[K]
>(
  key: K,
  defaultValue?: D
): Ref<Exclude<ConfigProviderContext[K], undefined> | D>
export function useGlobalConfig(): Ref<ConfigProviderContext>
export function useGlobalConfig(
  key?: keyof ConfigProviderContext,
  defaultValue = undefined
) {
  const config = getCurrentInstance()
    ? inject(configProviderContextKey, globalConfig)
    : globalConfig
  if (key) {
    return computed(() => config.value?.[key] ?? defaultValue)
  } else {
    return config
  }
}

export const provideGlobalConfig = (
  config: MaybeRef<ConfigProviderContext>,
  app?: App,
  global = false
) => {
  const inSetup = !!getCurrentInstance()
  const oldConfig = inSetup ? useGlobalConfig() : undefined

  const provideFn = app?.provide ?? (inSetup ? provide : undefined)
  if (!provideFn) {
    debugWarn(
      'provideGlobalConfig',
      'provideGlobalConfig() can only be used inside setup().'
    )
    return
  }

  const context = computed(() => {
    const cfg = unref(config)
    if (!oldConfig?.value) return cfg
    return merge(oldConfig.value, cfg)
  })
  ;(provideFn as <T>(key: InjectionKey<T> | string | number, value: T) => void)(
    configProviderContextKey,
    context
  )
  ;(provideFn as <T>(key: InjectionKey<T> | string | number, value: T) => void)(
    localeContextKey,
    computed(() => context.value.locale)
  )

  if (global || !globalConfig.value) {
    globalConfig.value = context.value
  }
  return context
}
