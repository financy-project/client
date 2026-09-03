import { MockedProvider } from '@apollo/client/testing/react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from '@/App'

describe('App', () => {
  it('redirects / to /cadastro', () => {
    render(
      <MockedProvider>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </MockedProvider>,
    )

    expect(screen.getByText('Criar conta')).toBeInTheDocument()
  })

  it('renders RegisterPage at /cadastro', () => {
    render(
      <MockedProvider>
        <MemoryRouter initialEntries={['/cadastro']}>
          <App />
        </MemoryRouter>
      </MockedProvider>,
    )

    expect(screen.getByText('Criar conta')).toBeInTheDocument()
  })

  it('renders LoginPage at /login', () => {
    render(
      <MockedProvider>
        <MemoryRouter initialEntries={['/login']}>
          <App />
        </MemoryRouter>
      </MockedProvider>,
    )

    expect(screen.getByText('Fazer login')).toBeInTheDocument()
  })

  it('renders PreviewPage at /preview', () => {
    render(
      <MockedProvider>
        <MemoryRouter initialEntries={['/preview']}>
          <App />
        </MemoryRouter>
      </MockedProvider>,
    )

    expect(screen.getByRole('heading', { name: 'Financy' })).toBeInTheDocument()
  })
})
