import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { RecentTransactionsCard } from '@/modules/dashboard/components/recent-transactions-card'

describe('RecentTransactionsCard', () => {
  it('renders the block title and a placeholder message', () => {
    render(<RecentTransactionsCard />)

    expect(screen.getByText('Transações Recentes')).toBeInTheDocument()
    expect(screen.getByText('Em construção.')).toBeInTheDocument()
  })
})
