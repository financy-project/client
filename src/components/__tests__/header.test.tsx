import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
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
})
