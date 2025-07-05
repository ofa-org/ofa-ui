<template>
  <div :class="[ns.b()]">Container</div>
</template>
<script setup lang="ts">
defineOptions({
  name: 'OfaContainer',
})
import { useNamespace } from '@ofa-ui/hooks'
const ns = useNamespace('container')
</script>
<style scoped lang="scss"></style>
