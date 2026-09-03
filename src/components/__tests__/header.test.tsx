import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { Header } from '@/components/header'
import { useAuthStore } from '@/modules/auth/stores/use-auth-store'

function renderHeader(initialEntry = '/dashboard') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Header />
    </MemoryRouter>,
  )
}

describe('Header', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null })
  })

  it('renders the Financy logo', () => {
    renderHeader()
    expect(screen.getByAltText('Financy')).toBeInTheDocument()
  })

  it('renders all three nav labels', () => {
    renderHeader()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Transações')).toBeInTheDocument()
    expect(screen.getByText('Categorias')).toBeInTheDocument()
  })

  it('renders an empty avatar when there is no logged-in user', () => {
    renderHeader()
    const avatar = screen.getByTestId('header-avatar')
    expect(avatar).toHaveTextContent('')
  })

  it('highlights "Dashboard" as active and the others as inactive at /dashboard', () => {
    renderHeader('/dashboard')

    expect(screen.getByText('Dashboard')).toHaveClass('text-primary', 'font-semibold')
    expect(screen.getByText('Transações')).toHaveClass('text-gray-600', 'font-normal')
    expect(screen.getByText('Categorias')).toHaveClass('text-gray-600', 'font-normal')
  })

  it('highlights "Transações" as active at /transacoes', () => {
    renderHeader('/transacoes')

    expect(screen.getByText('Transações')).toHaveClass('text-primary', 'font-semibold')
    expect(screen.getByText('Dashboard')).toHaveClass('text-gray-600', 'font-normal')
  })

  it('highlights "Categorias" as active at /categorias', () => {
    renderHeader('/categorias')

    expect(screen.getByText('Categorias')).toHaveClass('text-primary', 'font-semibold')
    expect(screen.getByText('Dashboard')).toHaveClass('text-gray-600', 'font-normal')
  })

  it('navigates to the corresponding route when a nav item is clicked', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Header />
        <Routes>
          <Route path="/transacoes" element={<p>Tela de transações</p>} />
        </Routes>
      </MemoryRouter>,
    )

    await user.click(screen.getByText('Transações'))

    expect(screen.getByText('Tela de transações')).toBeInTheDocument()
  })

  it('renders the logged-in user\'s initials in the avatar', () => {
    useAuthStore.setState({ user: { id: '1', email: 'ana@example.com', name: 'Ana Silva' } })
    renderHeader()

    expect(screen.getByTestId('header-avatar')).toHaveTextContent('AS')
  })
})
