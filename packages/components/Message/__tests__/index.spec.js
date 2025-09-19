import { describe, it, expect } from 'vitest'
import Message from './index.vue'

describe('Message Component', () => {
  it('1 should have the correct name', () => {
    expect(Message.name).toBe('OfaMessage')
  })
})
