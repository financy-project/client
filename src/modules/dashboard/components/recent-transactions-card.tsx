import type { JSX } from 'react'

import { Card } from '@/components/ui/card'

// Placeholder for PM-022 — real content (recent transactions list, "Ver
// todas" link) lands in a future feature.
export function RecentTransactionsCard(): JSX.Element {
  return (
    <Card className="border border-gray-200 p-6 ring-0">
      <span className="text-xs font-medium tracking-wider text-gray-500 uppercase">
        Transações Recentes
      </span>
      <p className="mt-4 text-sm text-gray-400">Em construção.</p>
    </Card>
  )
}
