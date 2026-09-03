import { describe, expect, it } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn', () => {
  it('joins truthy class values and drops falsy ones', () => {
    const showB = false
    expect(cn('a', showB && 'b', 'c')).toBe('a c')
  })

  it('resolves conflicting Tailwind utilities by keeping the last one', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4')
  })
})
