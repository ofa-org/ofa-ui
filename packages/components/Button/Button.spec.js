import { describe, it, expect, } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button Component', () => {
    let wrapper
    it('1 should have the correct name', () => {
        expect(Button.name).toBe('OfaButton')
    })

    // 基础渲染测试
    it('2 renders with default props', () => {
        wrapper = mount(Button)
        expect(wrapper.find('button').exists()).toBe(true)
        expect(wrapper.find('button').text()).toBe('')
        expect(wrapper.find('button').classes()).toContain('el-button')
        expect(wrapper.find('button').classes()).toContain('el-button--default')
        expect(wrapper.find('button').classes()).toContain('el-button--medium')
    })

    // 文本内容测试
    it('3 renders with custom text', () => {
        wrapper = mount(Button, {
            slots: {
                default: 'Click Me'
            }
        })
        expect(wrapper.find('button').text()).toBe('Click Me')
    })

    // 类型属性测试
    it('4 applies correct type class', () => {
        const types = ['primary', 'success', 'warning', 'danger', 'info']
        types.forEach(type => {
            wrapper = mount(Button, {
                props: { type }
            })
            expect(wrapper.find('button').classes()).toContain(`el-button--${type}`)
        })
    })

    // 尺寸属性测试
    it('5 applies correct size class', () => {
        const sizes = ['large', 'medium', 'small', 'mini']
        sizes.forEach(size => {
            wrapper = mount(Button, {
                props: { size }
            })
            expect(wrapper.find('button').classes()).toContain(`el-button--${size}`)
        })
    })

    // 禁用状态测试
    it('6 renders disabled state', () => {
        wrapper = mount(Button, {
            props: { disabled: true }
        })
        expect(wrapper.find('button').element.hasAttribute('disabled')).toBe(true)
        expect(wrapper.find('button').classes()).toContain('is-disabled')
    })

    // 加载状态测试
    it('7 renders loading state', () => {
        wrapper = mount(Button, {
            props: { loading: true }
        })
        expect(wrapper.find('button').classes()).toContain('is-loading')
        expect(wrapper.find('.el-icon-loading').exists()).toBe(true)
    })

    // 图标测试
    it('8 renders icon', () => {
        wrapper = mount(Button, {
            props: { icon: 'el-icon-search' }
        })
        expect(wrapper.find('.el-icon-search').exists()).toBe(true)
    })

    // 点击事件测试
    it('9 emits click event', async () => {
        wrapper = mount(Button)
        await wrapper.trigger('click')
        expect(wrapper.emitted()).toHaveProperty('click')
    })

    // 禁用状态下不触发点击事件
    it('10 does not emit click event when disabled', async () => {
        wrapper = mount(Button, {
            props: { disabled: true }
        })
        await wrapper.trigger('click')
        expect(wrapper.emitted('click')).toBeUndefined()
    })

    // 加载状态下不触发点击事件
    it('11 does not emit click event when loading', async () => {
        wrapper = mount(Button, {
            props: { loading: true }
        })

        await wrapper.trigger('click')
        expect(wrapper.emitted('click')).toBeUndefined()
    })

    // 朴素按钮样式测试
    it('12 applies plain style', () => {
        wrapper = mount(Button, {
            props: { plain: true }
        })
        expect(wrapper.find('button').classes()).toContain('is-plain')
    })

    // 圆角按钮样式测试
    it('13 applies round style', () => {
        wrapper = mount(Button, {
            props: { round: true }
        })
        expect(wrapper.find('button').classes()).toContain('is-round')
    })

    // 圆形按钮样式测试
    it('14 applies circle style', () => {
        wrapper = mount(Button, {
            props: { circle: true }
        })
        expect(wrapper.find('button').classes()).toContain('is-circle')
    })

    // 自动聚焦测试
    it('15 applies autofocus', () => {
        wrapper = mount(Button, {
            props: { autofocus: true }
        })
        expect(wrapper.find('button').element.hasAttribute('autofocus')).toBe(true)
    })
})