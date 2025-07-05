import { describe, it, expect, } from 'vitest'
import { mount } from '@vue/test-utils'
import Message from './Message.vue'

describe('Message Component', () => {
    let wrapper
    it('1 should have the correct name', () => {
        expect(Message.name).toBe('OfaMessage')
    })

})