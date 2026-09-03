import { beforeEach, describe, expect, it } from 'vitest'
import { useAuthStore } from '@/modules/auth/stores/use-auth-store'

const STORAGE_KEY = 'financy:auth-user'

describe('useAuthStore', () => {
  beforeEach(() => {
    localStorage.clear()
    useAuthStore.setState({ user: null })
  })

  it('persists the user to localStorage on setUser, so a refresh (F5) can restore it', () => {
    const user = { id: '1', email: 'ana@example.com', name: 'Ana Silva' }

    useAuthStore.getState().setUser(user)

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
    expect(stored.state.user).toEqual(user)
  })

  it('has no user before any login', () => {
    expect(useAuthStore.getState().user).toBeNull()
  })
})
