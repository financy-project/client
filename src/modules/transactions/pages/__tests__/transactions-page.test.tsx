import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useCategoriesForSelect } from '@/modules/transactions/hooks/use-categories-for-select'
import { useCreateTransaction } from '@/modules/transactions/hooks/use-create-transaction'
import { TransactionsPage } from '@/modules/transactions/pages/transactions-page'

vi.mock('@/modules/transactions/hooks/use-create-transaction')
vi.mock('@/modules/transactions/hooks/use-categories-for-select')

const useCreateTransactionMock = vi.mocked(useCreateTransaction)
const useCategoriesForSelectMock = vi.mocked(useCategoriesForSelect)

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
})
