import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { RecentTransactionsCard } from '@/modules/dashboard/components/recent-transactions-card'
import { useGetDashboard } from '@/modules/dashboard/hooks/use-get-dashboard'
import { useCreateTransaction } from '@/modules/transactions/hooks/use-create-transaction'
import { useCategoriesStore } from '@/modules/transactions/stores/use-categories-store'

vi.mock('@/modules/dashboard/hooks/use-get-dashboard')
vi.mock('@/modules/transactions/hooks/use-create-transaction')

const useGetDashboardMock = vi.mocked(useGetDashboard)
const useCreateTransactionMock = vi.mocked(useCreateTransaction)

const TRANSACTIONS = [
  {
    id: 't1',
    type: 'INCOME' as const,
    description: 'Pagamento de Salário',
    date: '2025-12-01T00:00:00.000Z',
    value: 425000,
    category: { id: 'c1', title: 'Receita', color: '#16A34A', icon: 'BriefcaseBusiness' },
  },
  {
    id: 't2',
    type: 'EXPENSE' as const,
    description: 'Jantar no Restaurante',
    date: '2025-11-30T00:00:00.000Z',
    value: 8950,
    category: { id: 'c2', title: 'Alimentação', color: '#2563EB', icon: 'Utensils' },
  },
]

function renderCard() {
  return render(
    <MemoryRouter>
      <RecentTransactionsCard />
    </MemoryRouter>,
  )
}

describe('RecentTransactionsCard', () => {
  beforeEach(() => {
    useCreateTransactionMock.mockReturnValue({
      createTransaction: vi.fn().mockResolvedValue(null),
      isLoading: false,
      fieldErrors: [],
      formError: null,
    })
    useCategoriesStore.setState({ categories: [], isLoading: false, error: null })
  })

  it('renders one DashboardTransactionRow per item in recentTransactions', () => {
    useGetDashboardMock.mockReturnValue({
      movement: null,
      recentTransactions: TRANSACTIONS,
      isLoading: false,
      error: null,
    })

    renderCard()

    expect(screen.getByText('Pagamento de Salário')).toBeInTheDocument()
    expect(screen.getByText('Jantar no Restaurante')).toBeInTheDocument()
  })
})
