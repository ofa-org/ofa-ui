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
import '@ofa-ui/theme/src/Message.scss'

import { useNamespace } from '@ofa-ui/hooks'
const ns = useNamespace('message')

const md: MarkdownIt = MarkdownIt()
const props = defineProps({
  content: {
    type: String,
    default: '',
  },
})
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
