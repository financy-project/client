import type { JSX } from 'react'

import { ChevronRight, Plus } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { DashboardTransactionRow } from '@/modules/dashboard/components/dashboard-transaction-row'
import { GET_DASHBOARD } from '@/modules/dashboard/graphql/queries'
import { useGetDashboard } from '@/modules/dashboard/hooks/use-get-dashboard'
// Deliberate exception to this app's no-cross-domain-module-import
// convention — see PM-023's plan.md "Module Composition" decision:
// duplicating an entire form+validation+mutation flow would be worse than
// this one import.
import { NewTransactionDialog } from '@/modules/transactions/components/new-transaction-dialog'

function RowSkeleton(): JSX.Element {
  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 shrink-0 rounded-[8px]" />
        <div className="grid gap-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <Skeleton className="h-6 w-20 rounded-full" />
    </div>
  )
}

export function RecentTransactionsCard(): JSX.Element {
  const { recentTransactions, isLoading, error } = useGetDashboard()
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false)

  return (
    <Card className="border border-gray-200 p-6 ring-0">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium tracking-wider text-gray-500 uppercase">
          Transações Recentes
        </span>
        <Button variant="link" asChild className="h-auto gap-1 p-0">
          <Link to="/transactions">
            Ver todas
            <ChevronRight className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="mt-4">
        {error && (
          <p role="alert" className="text-destructive text-sm">
            {error}
          </p>
        )}

        {!error && isLoading && (
          <div className="grid gap-1">
            <RowSkeleton />
            <RowSkeleton />
            <RowSkeleton />
          </div>
        )}

        {!error && !isLoading && recentTransactions.length === 0 && (
          <p className="text-sm text-gray-600">Nenhuma transação cadastrada ainda.</p>
        )}

        {!error && !isLoading && recentTransactions.length > 0 && (
          <div className="grid gap-1">
            {recentTransactions.map((transaction) => (
              <DashboardTransactionRow key={transaction.id} transaction={transaction} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-center">
        <Button
          variant="link"
          className="h-auto gap-1 p-0"
          onClick={() => setIsNewTransactionOpen(true)}
        >
          <Plus className="size-4" />
          Nova transação
        </Button>
      </div>

      <NewTransactionDialog
        open={isNewTransactionOpen}
        onOpenChange={setIsNewTransactionOpen}
        additionalRefetchQueries={[GET_DASHBOARD]}
      />
    </Card>
  )
}
