import type { JSX } from 'react'

import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export interface DashboardCardHeaderAction {
  label: string
  to: string
}

export interface DashboardCardHeaderProps {
  title: string
  action: DashboardCardHeaderAction
}

// Shared between the dashboard highlight cards (RecentTransactionsCard,
// DashboardCategoriesCard) — same title + optional "Ver todas"/"Gerenciar"
// link pattern, matching the Figma "Link" component reused for both in the
// design (see PM-023's spec.md).
export function DashboardCardHeader({ title, action }: DashboardCardHeaderProps): JSX.Element {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs font-medium tracking-wider text-gray-500 uppercase">{title}</span>
      <Button variant="link" asChild className="h-auto gap-1 p-0">
        <Link to={action.to}>
          {action.label}
          <ChevronRight className="size-4" />
        </Link>
      </Button>
    </div>
  )
}
