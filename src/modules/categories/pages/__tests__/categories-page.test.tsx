import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useCreateCategory } from '@/modules/categories/hooks/use-create-category'
import { CategoriesPage } from '@/modules/categories/pages/categories-page'

vi.mock('@/modules/categories/hooks/use-create-category')

const useCreateCategoryMock = vi.mocked(useCreateCategory)

function renderCategoriesPage() {
  return render(
    <MemoryRouter initialEntries={['/categorias']}>
      <CategoriesPage />
    </MemoryRouter>,
  )
}

describe('CategoriesPage', () => {
  beforeEach(() => {
    useCreateCategoryMock.mockReturnValue({
      createCategory: vi.fn().mockResolvedValue(null),
      isLoading: false,
      fieldErrors: [],
      formError: null,
    })
  })

  it('renders the page header and the app Header nav', () => {
    renderCategoriesPage()

    expect(screen.getByRole('heading', { name: 'Categorias' })).toBeInTheDocument()
    expect(screen.getByText('Organize suas transações por categorias')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /nova categoria/i })).toBeInTheDocument()
    expect(screen.getByText('Transações')).toBeInTheDocument()
  })

  it('opens the dialog when "Nova categoria" is clicked', async () => {
    const user = userEvent.setup()
    renderCategoriesPage()

    await user.click(screen.getByRole('button', { name: /nova categoria/i }))

    expect(screen.getByRole('heading', { name: 'Nova categoria' })).toBeInTheDocument()
  })

  it('closes the dialog after a successful category creation', async () => {
    useCreateCategoryMock.mockReturnValue({
      createCategory: vi.fn().mockResolvedValue({
        id: '1',
        title: 'Alimentação',
        description: null,
        icon: 'BriefcaseBusiness',
        color: '#16A34A',
      }),
      isLoading: false,
      fieldErrors: [],
      formError: null,
    })
    const user = userEvent.setup()
    renderCategoriesPage()

    await user.click(screen.getByRole('button', { name: /nova categoria/i }))
    await user.type(screen.getByLabelText(/título/i), 'Alimentação')
    await user.click(screen.getByRole('button', { name: /^salvar$/i }))

    await waitFor(() =>
      expect(screen.queryByRole('heading', { name: 'Nova categoria' })).not.toBeInTheDocument(),
    )
  })
})
