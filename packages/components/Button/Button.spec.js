import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button.vue', () => {
    // 测试组件名为OfaButton
    it('should have the correct name', () => {
        expect(Button.name).toBe('OfaButton')
    })
})  