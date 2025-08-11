<script setup lang="ts">
const mdText = `# Hello World
This is a **Markdown** message.
`
</script>

<template>
  <div>
    <OfaMessage :content="mdText"></OfaMessage>
  </div>
</template>

<style scoped></style>
