import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useCategoriesForSelect } from '@/modules/transactions/hooks/use-categories-for-select'
import { useCreateTransaction } from '@/modules/transactions/hooks/use-create-transaction'
import { useListTransactions } from '@/modules/transactions/hooks/use-list-transactions'
import { TransactionsPage } from '@/modules/transactions/pages/transactions-page'

vi.mock('@/modules/transactions/hooks/use-create-transaction')
vi.mock('@/modules/transactions/hooks/use-categories-for-select')
vi.mock('@/modules/transactions/hooks/use-list-transactions')

const useCreateTransactionMock = vi.mocked(useCreateTransaction)
const useCategoriesForSelectMock = vi.mocked(useCategoriesForSelect)
const useListTransactionsMock = vi.mocked(useListTransactions)

const TRANSACTION = {
  id: 't1',
  type: 'EXPENSE' as const,
  description: 'Almoço no restaurante',
  date: '2025-11-30T00:00:00.000Z',
  value: 8850,
  category: { id: 'cat-1', title: 'Alimentação', color: '#2563EB', icon: 'Utensils' },
}

function renderTransactionsPage() {
  return render(
    <MemoryRouter initialEntries={['/transacoes']}>
      <TransactionsPage />
    </MemoryRouter>,
  )
}

describe('TransactionsPage', () => {
  beforeEach(() => {
    useCreateTransactionMock.mockReturnValue({
      createTransaction: vi.fn().mockResolvedValue(null),
      isLoading: false,
      fieldErrors: [],
      formError: null,
    })
    useCategoriesForSelectMock.mockReturnValue({ categories: [], isLoading: false, error: null })
    useListTransactionsMock.mockReturnValue({
      transactions: [TRANSACTION],
      isLoading: false,
      error: null,
      page: 1,
      totalPages: 1,
      totalRecord: 1,
      pageSize: 10,
      goToPage: vi.fn(),
    })
  })

  it('renders PageHeader with title "Transações" and its subtitle', () => {
    renderTransactionsPage()

    expect(screen.getByRole('heading', { name: 'Transações' })).toBeInTheDocument()
    expect(screen.getByText('Gerencie todas as suas transações financeiras')).toBeInTheDocument()
  })

  it('opens NewTransactionDialog when "Nova transação" is clicked', async () => {
    const user = userEvent.setup()
    renderTransactionsPage()

    await user.click(screen.getByRole('button', { name: /nova transação/i }))

    expect(screen.getByRole('heading', { name: 'Nova transação' })).toBeInTheDocument()
  })

  it('renders TransactionsTable below PageHeader with values from useListTransactions', () => {
    renderTransactionsPage()

    expect(screen.getByText('Almoço no restaurante')).toBeInTheDocument()
    expect(screen.getByText('- R$ 88,50')).toBeInTheDocument()
  })
})
