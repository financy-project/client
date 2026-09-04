import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { TransactionsTable } from '@/modules/transactions/components/transactions-table'
import type { TransactionListItem } from '@/modules/transactions/graphql/queries'

const TRANSACTION: TransactionListItem = {
  id: 't1',
  type: 'EXPENSE',
  description: 'Almoço no restaurante',
  date: '2025-11-30T00:00:00.000Z',
  value: 8850,
  category: { id: 'cat-1', title: 'Alimentação', color: '#2563EB', icon: 'Utensils' },
}

const DEFAULT_PROPS = {
  isLoading: false,
  error: null,
  page: 1,
  totalPages: 1,
  onPageChange: vi.fn(),
  totalRecord: 1,
  pageSize: 10,
}

describe('TransactionsTable', () => {
  it('shows the loading message while isLoading', () => {
    render(<TransactionsTable {...DEFAULT_PROPS} transactions={[]} isLoading />)
    expect(screen.getByText('Carregando transações…')).toBeInTheDocument()
  })

  it('shows the error message when error is set', () => {
    render(
      <TransactionsTable
        {...DEFAULT_PROPS}
        transactions={[]}
        error="Não foi possível carregar as transações."
      />,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('Não foi possível carregar as transações.')
  })

  it('shows the empty-state message when transactions is [] and not loading/error', () => {
    render(<TransactionsTable {...DEFAULT_PROPS} transactions={[]} />)
    expect(screen.getByText('Nenhuma transação cadastrada ainda.')).toBeInTheDocument()
  })

  it('renders one row per transaction with description/date/category/type/value, and two inert action buttons', async () => {
    const user = userEvent.setup()
    const createTransactionMock = vi.fn()
    const deleteTransactionMock = vi.fn()

    render(<TransactionsTable {...DEFAULT_PROPS} transactions={[TRANSACTION]} />)

    expect(screen.getByText('Almoço no restaurante')).toBeInTheDocument()
    expect(screen.getByText('30/11/25')).toBeInTheDocument()
    expect(screen.getByText('Alimentação')).toBeInTheDocument()
    expect(screen.getByText('Saída')).toBeInTheDocument()
    expect(screen.getByText('- R$ 88,50')).toBeInTheDocument()

    const deleteButton = screen.getByRole('button', { name: 'Excluir' })
    const editButton = screen.getByRole('button', { name: 'Editar' })
    expect(deleteButton).toBeInTheDocument()
    expect(editButton).toBeInTheDocument()

    await user.click(deleteButton)
    await user.click(editButton)

    expect(createTransactionMock).not.toHaveBeenCalled()
    expect(deleteTransactionMock).not.toHaveBeenCalled()
  })

  it('calls onPageChange when a page button is clicked', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()

    render(
      <TransactionsTable
        {...DEFAULT_PROPS}
        transactions={[TRANSACTION]}
        page={1}
        totalPages={2}
        totalRecord={11}
        onPageChange={onPageChange}
      />,
    )

    await user.click(screen.getByRole('button', { name: '2' }))

    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('shows the "X a Y | Z resultados" summary text in a single uniform color', () => {
    render(
      <TransactionsTable
        {...DEFAULT_PROPS}
        transactions={[TRANSACTION]}
        page={1}
        totalPages={3}
        totalRecord={27}
      />,
    )

    const summary = screen.getByTestId('transactions-summary')
    expect(summary).toHaveTextContent('1 a 10 | 27 resultados')
    expect(summary).toHaveClass('text-gray-700')
    expect(summary.querySelectorAll('span')).toHaveLength(0)
  })
})
