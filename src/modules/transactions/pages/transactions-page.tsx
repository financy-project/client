import type { JSX } from 'react'

import { useState } from 'react'
import { Header } from '@/components/header'
import { PageHeader } from '@/components/page-header'
import { NewTransactionDialog } from '@/modules/transactions/components/new-transaction-dialog'
import { TransactionsTable } from '@/modules/transactions/components/transactions-table'
import { useListTransactions } from '@/modules/transactions/hooks/use-list-transactions'

export function TransactionsPage(): JSX.Element {
  const [newDialogOpen, setNewDialogOpen] = useState(false)
  const { transactions, isLoading, error, page, totalPages, totalRecord, pageSize, goToPage } =
    useListTransactions()

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1280px] p-12">
        <PageHeader
          title="Transações"
          subtitle="Gerencie todas as suas transações financeiras"
          actionLabel="Nova transação"
          onAction={() => setNewDialogOpen(true)}
        />
        <TransactionsTable
          transactions={transactions}
          isLoading={isLoading}
          error={error}
          page={page}
          totalPages={totalPages}
          onPageChange={goToPage}
          totalRecord={totalRecord}
          pageSize={pageSize}
          className="mt-6"
        />
      </main>
      <NewTransactionDialog open={newDialogOpen} onOpenChange={setNewDialogOpen} />
    </>
  )
}
