import { describe, it, expect, } from 'vitest'
import { mount } from '@vue/test-utils'
import Container from './Container.vue'
describe('Container Component', () => {
    let wrapper
    it('1 should have the correct name', () => {
        expect(Container.name).toBe('OfaContainer')
    })
})