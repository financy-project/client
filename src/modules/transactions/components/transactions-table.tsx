import type { JSX } from 'react'

import { SquarePen, Trash } from 'lucide-react'
import { TransactionTypeIndicator } from '@/components/transaction-type-indicator'
import { IconButton } from '@/components/ui/icon-button'
import { Pagination } from '@/components/ui/pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { TransactionCategoryCell } from '@/modules/transactions/components/transaction-category-cell'
import type { TransactionListItem } from '@/modules/transactions/graphql/queries'
import {
  formatTransactionDate,
  formatTransactionValue,
} from '@/modules/transactions/utils/format-transaction'

interface TransactionsTableProps {
  transactions: TransactionListItem[]
  isLoading: boolean
  error: string | null
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  totalRecord: number
  pageSize: number
  className?: string
}

const HEADER_CELL_CLASS = 'px-6 py-5 text-xs font-medium tracking-wide text-gray-500'
const BODY_CELL_CLASS = 'px-6 py-5 text-sm text-gray-800'

export function TransactionsTable({
  transactions,
  isLoading,
  error,
  page,
  totalPages,
  onPageChange,
  totalRecord,
  pageSize,
  className,
}: TransactionsTableProps): JSX.Element {
  if (isLoading) {
    return <p className={cn('text-gray-600', className)}>Carregando transações…</p>
  }

  if (error) {
    return (
      <p role="alert" className={cn('text-destructive text-sm', className)}>
        {error}
      </p>
    )
  }

  if (transactions.length === 0) {
    return <p className={cn('text-gray-600', className)}>Nenhuma transação cadastrada ainda.</p>
  }

  const firstItem = (page - 1) * pageSize + 1
  const lastItem = Math.min(page * pageSize, totalRecord)

  return (
    <div className={cn('overflow-hidden rounded-xl border border-gray-200 bg-white', className)}>
      <Table>
        <TableHeader>
          <TableRow className="border-gray-200">
            <TableHead className={HEADER_CELL_CLASS}>Descrição</TableHead>
            <TableHead className={HEADER_CELL_CLASS}>Data</TableHead>
            <TableHead className={HEADER_CELL_CLASS}>Categoria</TableHead>
            <TableHead className={HEADER_CELL_CLASS}>Tipo</TableHead>
            <TableHead className={HEADER_CELL_CLASS}>Valor</TableHead>
            <TableHead className={HEADER_CELL_CLASS}>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id} className="border-gray-200">
              <TableCell className={BODY_CELL_CLASS}>{transaction.description}</TableCell>
              <TableCell className={BODY_CELL_CLASS}>
                {formatTransactionDate(transaction.date)}
              </TableCell>
              <TableCell className={BODY_CELL_CLASS}>
                <TransactionCategoryCell category={transaction.category} />
              </TableCell>
              <TableCell className={BODY_CELL_CLASS}>
                <TransactionTypeIndicator
                  type={transaction.type === 'INCOME' ? 'income' : 'expense'}
                />
              </TableCell>
              <TableCell
                className={cn(
                  BODY_CELL_CLASS,
                  transaction.type === 'EXPENSE' ? 'text-destructive' : 'text-success',
                )}
              >
                {formatTransactionValue(transaction.value, transaction.type)}
              </TableCell>
              <TableCell className={BODY_CELL_CLASS}>
                <div className="flex gap-2">
                  <IconButton
                    variant="outline"
                    size="icon"
                    className="border-gray-300"
                    icon={<Trash className="text-destructive" />}
                    aria-label="Excluir"
                  />
                  <IconButton
                    variant="outline"
                    size="icon"
                    className="border-gray-300"
                    icon={<SquarePen className="text-gray-700" />}
                    aria-label="Editar"
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between px-6 py-5">
        <p data-testid="transactions-summary" className="text-sm text-gray-600">
          <span className="font-semibold text-gray-800">{firstItem}</span> a{' '}
          <span className="font-semibold text-gray-800">{lastItem}</span> |{' '}
          <span className="font-semibold text-gray-800">{totalRecord}</span> resultados
        </p>
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
          className="gap-2"
        />
      </div>
    </div>
  )
}
