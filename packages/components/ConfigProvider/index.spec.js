import { describe, it, expect } from 'vitest'
import ConfigProvider from './index.vue'

describe('ConfigProvider Component', () => {
  it('1 should have the correct name', () => {
    expect(ConfigProvider.name).toBe('OfaConfigProvider')
  })
})
