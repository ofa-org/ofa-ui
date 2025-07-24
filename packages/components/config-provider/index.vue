<template>
  <slot name="default" :config="config"></slot>
</template>

<script setup lang="ts">
defineOptions({
  name: 'OfaConfigProvider',
})
import { provideGlobalConfig } from './hooks/use-global-config'
import type { ConfigProviderProps } from './types'
const props = defineProps<ConfigProviderProps>()
const config = provideGlobalConfig(props)
</script>

<style scoped lang="scss"></style>
