import type { JSX } from 'react'

import { Card } from '@/components/ui/card'
import { DashboardCardHeader } from '@/modules/dashboard/components/dashboard-card-header'

// Placeholder for PM-022 — real content (categories summary, "Gerenciar"
// link) lands in a future feature.
export function DashboardCategoriesCard(): JSX.Element {
  return (
    <Card className="border border-gray-200 p-6 ring-0">
      {/* "to" is a placeholder — no destination decided yet for this still-unbuilt block */}
      <DashboardCardHeader title="Categorias" action={{ label: 'Gerenciar', to: '/' }} />
      <p className="mt-4 text-sm text-gray-400">Em construção.</p>
    </Card>
  )
}
