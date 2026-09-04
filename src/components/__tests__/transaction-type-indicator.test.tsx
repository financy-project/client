import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TransactionTypeIndicator } from '@/components/transaction-type-indicator'

describe('TransactionTypeIndicator', () => {
  it('renders "Receita" with the correct icon and color for type="income"', () => {
    render(<TransactionTypeIndicator type="income" />)
    const label = screen.getByText('Receita')
    expect(label).toBeInTheDocument()
    expect(label.closest('[data-slot="transaction-type-indicator"]')).toHaveClass('text-success')
    expect(
      label.closest('[data-slot="transaction-type-indicator"]')?.querySelector('svg')
    ).toHaveClass('lucide-circle-arrow-up')
  })

  it('renders "Despesa" with the correct icon and color for type="expense"', () => {
    render(<TransactionTypeIndicator type="expense" />)
    const label = screen.getByText('Despesa')
    expect(label).toBeInTheDocument()
    expect(label.closest('[data-slot="transaction-type-indicator"]')).toHaveClass(
      'text-destructive'
    )
    expect(
      label.closest('[data-slot="transaction-type-indicator"]')?.querySelector('svg')
    ).toHaveClass('lucide-circle-arrow-down')
  })
})
