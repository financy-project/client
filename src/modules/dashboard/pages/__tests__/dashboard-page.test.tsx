import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { useGetDashboard } from '@/modules/dashboard/hooks/use-get-dashboard'
import { DashboardPage } from '@/modules/dashboard/pages/dashboard-page'

vi.mock('@/modules/dashboard/hooks/use-get-dashboard')

const useGetDashboardMock = vi.mocked(useGetDashboard)

const MOVEMENT = {
  income: 425000,
  expense: 218045,
  totalBalance: 1284732,
}

function renderDashboardPage() {
  return render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <DashboardPage />
    </MemoryRouter>,
  )
}

describe('DashboardPage', () => {
  it('shows the loading text while useGetDashboard().isLoading is true', () => {
    useGetDashboardMock.mockReturnValue({ movement: null, isLoading: true, error: null })
    renderDashboardPage()

    expect(screen.getByText('Carregando resumo…')).toBeInTheDocument()
  })

  it('shows the role="alert" error message when useGetDashboard().error is set', () => {
    useGetDashboardMock.mockReturnValue({
      movement: null,
      isLoading: false,
      error: 'Não foi possível carregar o resumo do dashboard.',
    })
    renderDashboardPage()

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Não foi possível carregar o resumo do dashboard.',
    )
  })

  it('renders DashboardSummary with the resolved movement once loaded without error', () => {
    useGetDashboardMock.mockReturnValue({ movement: MOVEMENT, isLoading: false, error: null })
    renderDashboardPage()

    expect(screen.getByText('Saldo Total')).toBeInTheDocument()
    expect(screen.getByText('R$ 12.847,32')).toBeInTheDocument()
  })

  it('renders DashboardHighlights regardless of the summary loading state', () => {
    useGetDashboardMock.mockReturnValue({ movement: null, isLoading: true, error: null })
    renderDashboardPage()

    // "Categorias" also appears as a nav link in Header, hence scoping to <main>.
    expect(within(screen.getByRole('main')).getByText('Transações Recentes')).toBeInTheDocument()
    expect(within(screen.getByRole('main')).getByText('Categorias')).toBeInTheDocument()
  })
})
