import type { JSX, ReactNode } from 'react'

import { Link as RouterLink } from 'react-router-dom'
import { Button } from '@/components/ui/button'

interface AuthSwitchLinkProps {
  message: string
  to: string
  label: string
  icon: ReactNode
}

export function AuthSwitchLink({ message, to, label, icon }: AuthSwitchLinkProps): JSX.Element {
  return (
    <div className="grid gap-4">
      <p className="text-center text-sm text-gray-600">{message}</p>
      <Button asChild variant="outline" size="xl" className="border-gray-300 text-gray-700">
        <RouterLink to={to}>
          {icon}
          {label}
        </RouterLink>
      </Button>
    </div>
  )
}
