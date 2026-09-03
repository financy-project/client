import type { JSX } from 'react'

import { NavLink } from 'react-router-dom'
import logo from '@/assets/logo.svg'
import { cn, getInitials } from '@/lib/utils'
import { useAuthStore } from '@/modules/auth/stores/use-auth-store'

const NAV_ITEMS = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Transações', to: '/transacoes' },
  { label: 'Categorias', to: '/categorias' },
]

export function Header(): JSX.Element {
  const user = useAuthStore((state) => state.user)

  return (
    <header className="bg-white border-b border-gray-200 px-12 py-4">
      <div className="max-w-[1280px] w-full mx-auto flex items-center justify-between relative">
        <img src={logo} alt="Financy" className="h-6 w-auto" />
        <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-5 text-sm">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn('leading-5', isActive ? 'font-semibold text-primary' : 'font-normal text-gray-600')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div
          data-testid="header-avatar"
          className="size-9 rounded-full bg-gray-300 flex items-center justify-center"
        >
          <span className="text-sm font-medium leading-5 text-gray-800">
            {user ? getInitials(user.name) : ''}
          </span>
        </div>
      </div>
    </header>
  )
}
