<template>
  <div :class="[ns.b()]">
    ConfigProvider
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'OfaConfigProvider',
})
import { useNamespace } from '@ofa-ui/hooks'
const ns = useNamespace('config-provider')

</script>

<style scoped lang="scss"></style>
