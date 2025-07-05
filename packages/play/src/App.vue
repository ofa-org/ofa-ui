<script setup lang="ts">
const mdText = `# Hello World
This is a **Markdown** message.
`
</script>

<template>
  <div>
    <ofa-message :content="mdText"></ofa-message>
  </div>
</template>

<style scoped></style>
