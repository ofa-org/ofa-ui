<template>
  <div v-html="html" :class="[ns.b()]"></div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'OfaMessage',
})
import MarkdownIt from 'markdown-it'
import Typewriter from '@ofa-ui/utils/typewriter'
import { computed, ref } from 'vue'

import { useNamespace } from '@ofa-ui/hooks'
const ns = useNamespace('message')
// import { useLocale } from '@ofa-ui/hooks'
import { messageProps } from './index'

// const { t } = useLocale()

const md: MarkdownIt = MarkdownIt()
const props = defineProps(messageProps)

const steamText = ref('')
let html = computed(() => {
  return md.render(steamText.value)
})
const typewriter = new Typewriter((str) => {
  steamText.value += str
})
typewriter.add(props.content)
typewriter.start()
</script>

<style scoped lang="scss"></style>
