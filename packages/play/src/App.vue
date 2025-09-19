<script setup lang="ts">
const mdText = `# Hello World
This is a **Markdown** message.
`

const dddd = () => {
  console.log('dddd')
}
</script>

<template>
  <div>
    <OfaMessage :content="mdText"></OfaMessage>
    <OfaButton @click="dddd" type="danger">Click Me</OfaButton>
  </div>
</template>

<style scoped></style>
