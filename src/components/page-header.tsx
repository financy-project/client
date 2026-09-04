import type { JSX } from 'react'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PageHeaderProps {
  title: string
  subtitle: string
  actionLabel: string
  onAction: () => void
}

export function PageHeader({ title, subtitle, actionLabel, onAction }: PageHeaderProps): JSX.Element {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <p className="text-base text-gray-600">{subtitle}</p>
      </div>
      <Button size="xl" className="gap-2 px-3" onClick={onAction}>
        <Plus className="size-4" />
        {actionLabel}
      </Button>
    </div>
  )
}
