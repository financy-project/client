import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthUser {
  id: string
  email: string
  name: string
}

interface AuthState {
  user: AuthUser | null
  setUser: (user: AuthUser) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    { name: 'financy:auth-user' },
  ),
)
