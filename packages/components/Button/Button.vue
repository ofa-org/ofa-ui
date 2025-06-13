<template>
  <div>
    <button
      :type="type"
      :disabled="disabled"
      :class="['btn', { 'btn-primary': primary, 'btn-disabled': disabled }]"
      @click="handleClick"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script setup>
defineOptions({
  name: 'OfaButton',
})
defineProps({
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value),
  },
  label: {
    type: String,
    required: true,
  },
  primary: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['click'])

const handleClick = ($event) => {
  if (!disabled) {
    $emit('click', $event)
  }
}
</script>

<style scoped>
.btn {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: white;
}

.btn-primary {
  background-color: #2563eb;
  color: white;
  border-color: #2563eb;
}

.btn-disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
