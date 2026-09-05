import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DashboardCategoriesCard } from '@/modules/dashboard/components/dashboard-categories-card'

describe('DashboardCategoriesCard', () => {
  it('renders the block title and a placeholder message', () => {
    render(<DashboardCategoriesCard />)

    expect(screen.getByText('Categorias')).toBeInTheDocument()
    expect(screen.getByText('Em construção.')).toBeInTheDocument()
  })
})
