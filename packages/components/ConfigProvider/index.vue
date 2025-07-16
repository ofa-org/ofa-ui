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
const ns = useNamespace('configprovider')

</script>

<style scoped lang="scss"></style>
