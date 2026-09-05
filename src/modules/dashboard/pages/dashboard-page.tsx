import type { JSX } from 'react'

import { Header } from '@/components/header'
import { DashboardHighlights } from '@/modules/dashboard/components/dashboard-highlights'
import { DashboardSummary } from '@/modules/dashboard/components/dashboard-summary'
import { useGetDashboard } from '@/modules/dashboard/hooks/use-get-dashboard'

export function DashboardPage(): JSX.Element {
  const { movement, isLoading, error } = useGetDashboard()

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1280px] p-12">
        {isLoading && <p className="text-gray-600">Carregando resumo…</p>}
        {error && (
          <p role="alert" className="text-destructive text-sm">
            {error}
          </p>
        )}

        {!isLoading && !error && movement && <DashboardSummary movement={movement} />}
        <DashboardHighlights />
      </main>
    </>
  )
}
