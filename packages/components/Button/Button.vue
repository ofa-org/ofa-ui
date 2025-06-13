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

<script setup>
defineOptions({
  name: 'OfaButton',
})

import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'default',
    validator: (value) =>
      ['primary', 'success', 'warning', 'danger', 'info', 'default'].includes(
        value
      ),
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['large', 'medium', 'small', 'mini'].includes(value),
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

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emits('click', event)
  }
}
</script>

<style scoped>
.el-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  height: 32px;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  padding: 8px 15px;
  font-size: 14px;
  border-radius: 4px;
}

.el-button:hover,
.el-button:focus {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}

.el-button:active {
  color: #3a8ee6;
  border-color: #3a8ee6;
  outline: none;
}

.el-button.is-disabled,
.el-button.is-disabled:hover,
.el-button.is-disabled:focus {
  color: #c0c4cc;
  cursor: not-allowed;
  background-image: none;
  background-color: #fff;
  border-color: #ebeef5;
}

.el-button--primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}

.el-button--primary:hover,
.el-button--primary:focus {
  background: #66b1ff;
  border-color: #66b1ff;
  color: #fff;
}

.el-button--primary:active {
  background: #3a8ee6;
  border-color: #3a8ee6;
  color: #fff;
}

.el-button--success {
  color: #fff;
  background-color: #67c23a;
  border-color: #67c23a;
}

.el-button--warning {
  color: #fff;
  background-color: #e6a23c;
  border-color: #e6a23c;
}

.el-button--danger {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
}

.el-button--info {
  color: #fff;
  background-color: #909399;
  border-color: #909399;
}

.el-button--large {
  height: 40px;
  padding: 12px 19px;
  font-size: 16px;
  border-radius: 4px;
}

.el-button--small {
  height: 28px;
  padding: 6px 11px;
  font-size: 12px;
  border-radius: 3px;
}

.el-button--mini {
  height: 24px;
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 3px;
}

.el-button.is-round {
  border-radius: 20px;
  padding: 8px 20px;
}

.el-button.is-circle {
  border-radius: 50%;
  padding: 8px;
  width: 32px;
}

.el-button.is-loading {
  position: relative;
  pointer-events: none;
}

.el-icon-loading {
  display: inline-block;
  animation: rotating 2s linear infinite;
}

@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.el-icon {
  margin-right: 5px;
}

.el-button.is-plain {
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
}

.el-button.is-plain:hover,
.el-button.is-plain:focus {
  background: #fff;
  border-color: #409eff;
  color: #409eff;
}
</style>
