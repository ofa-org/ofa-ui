<template>
  <button
    :class="[
      'el-button',
      type ? `el-button--${type}` : 'el-button--default',
      size ? `el-button--${size}` : 'el-button--medium',
      { 'is-disabled': disabled },
      { 'is-loading': loading },
      { 'is-plain': plain },
      { 'is-round': round },
      { 'is-circle': circle },
    ]"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    @click="handleClick"
  >
    <span v-if="loading" class="el-icon-loading">
      <i class="el-icon-loading"></i>
    </span>
    <span v-else-if="icon" class="el-icon">
      <i :class="icon"></i>
    </span>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineOptions({
  name: 'OfaButton',
})

import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'default',
    validator: (value: string) =>
      ['primary', 'success', 'warning', 'danger', 'info', 'default'].includes(
        value
      ),
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value: string) =>
      ['large', 'medium', 'small', 'mini'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  plain: {
    type: Boolean,
    default: false,
  },
  round: {
    type: Boolean,
    default: false,
  },
  circle: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: '',
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['click'])

const handleClick = (event: Event) => {
  if (!props.disabled && !props.loading) {
    emits('click', event)
  }
}
</script>

<style scoped>
@import './Button.css';
</style>
