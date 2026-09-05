import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DashboardHighlights } from '@/modules/dashboard/components/dashboard-highlights'

describe('DashboardHighlights', () => {
  it('renders both the recent-transactions and categories placeholder blocks', () => {
    render(<DashboardHighlights />)

    expect(screen.getByText('Transações Recentes')).toBeInTheDocument()
    expect(screen.getByText('Categorias')).toBeInTheDocument()
  })

  it('lays out the two blocks in a 2/3 + 1/3 grid, matching DashboardSummary\'s 3-column grid', () => {
    render(<DashboardHighlights />)

    expect(screen.getByText('Transações Recentes').closest('section')).toHaveClass(
      'grid',
      'grid-cols-3',
      'gap-6',
    )
    expect(screen.getByText('Transações Recentes').closest('.col-span-2')).not.toBeNull()
    expect(screen.getByText('Categorias').closest('.col-span-1')).not.toBeNull()
  })
})
