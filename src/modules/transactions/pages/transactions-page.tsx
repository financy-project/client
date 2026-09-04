import type { JSX } from 'react'

import { useState } from 'react'
import { Header } from '@/components/header'
import { PageHeader } from '@/components/page-header'
import { NewTransactionDialog } from '@/modules/transactions/components/new-transaction-dialog'

export function TransactionsPage(): JSX.Element {
  const [newDialogOpen, setNewDialogOpen] = useState(false)

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
      </main>
      <NewTransactionDialog open={newDialogOpen} onOpenChange={setNewDialogOpen} />
    </>
  )
}
