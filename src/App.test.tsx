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
})
