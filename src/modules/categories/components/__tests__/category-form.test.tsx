import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { CategoryForm } from '@/modules/categories/components/category-form'
import { useCreateCategory } from '@/modules/categories/hooks/use-create-category'

vi.mock('@/modules/categories/hooks/use-create-category')

const useCreateCategoryMock = vi.mocked(useCreateCategory)

function renderCategoryForm(onSuccess = vi.fn()) {
  return render(<CategoryForm onSuccess={onSuccess} />)
}

describe('CategoryForm', () => {
  beforeEach(() => {
    useCreateCategoryMock.mockReturnValue({
      createCategory: vi.fn().mockResolvedValue(null),
      isLoading: false,
      fieldErrors: [],
      formError: null,
    })
  })

  it('shows "O título é obrigatório" for an empty title on submit', async () => {
    const user = userEvent.setup()
    renderCategoryForm()

    await user.click(screen.getByRole('button', { name: /^salvar$/i }))

    expect(await screen.findByText('O título é obrigatório')).toBeInTheDocument()
  })

  it('disables submit and shows "Salvando…" while loading', () => {
    useCreateCategoryMock.mockReturnValue({
      createCategory: vi.fn().mockResolvedValue(null),
      isLoading: true,
      fieldErrors: [],
      formError: null,
    })
    renderCategoryForm()

    const button = screen.getByRole('button', { name: /salvando/i })
    expect(button).toBeDisabled()
  })

  it('renders a mocked fieldErrors entry under Título', async () => {
    useCreateCategoryMock.mockReturnValue({
      createCategory: vi.fn().mockResolvedValue(null),
      isLoading: false,
      fieldErrors: [{ path: 'title', message: 'Título inválido' }],
      formError: null,
    })
    renderCategoryForm()

    expect(await screen.findByText('Título inválido')).toBeInTheDocument()
  })

  it('renders the mocked formError in the role="alert" banner verbatim', async () => {
    useCreateCategoryMock.mockReturnValue({
      createCategory: vi.fn().mockResolvedValue(null),
      isLoading: false,
      fieldErrors: [],
      formError: 'Não foi possível criar a categoria.',
    })
    renderCategoryForm()

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Não foi possível criar a categoria.',
    )
  })

  it('calls createCategory with the pre-selected icon/color when submitted without changing them', async () => {
    const createCategory = vi.fn().mockResolvedValue({
      id: '1',
      title: 'Alimentação',
      description: null,
      icon: 'BriefcaseBusiness',
      color: '#16A34A',
    })
    useCreateCategoryMock.mockReturnValue({
      createCategory,
      isLoading: false,
      fieldErrors: [],
      formError: null,
    })
    const user = userEvent.setup()
    renderCategoryForm()

    await user.type(screen.getByLabelText(/título/i), 'Alimentação')
    await user.click(screen.getByRole('button', { name: /^salvar$/i }))

    await waitFor(() =>
      expect(createCategory).toHaveBeenCalledWith({
        title: 'Alimentação',
        description: '',
        icon: 'BriefcaseBusiness',
        color: '#16A34A',
      }),
    )
  })

  it('calls createCategory with a newly selected icon/color after the user picks different ones', async () => {
    const createCategory = vi.fn().mockResolvedValue({
      id: '1',
      title: 'Transporte',
      description: null,
      icon: 'CarFront',
      color: '#2563EB',
    })
    useCreateCategoryMock.mockReturnValue({
      createCategory,
      isLoading: false,
      fieldErrors: [],
      formError: null,
    })
    const user = userEvent.setup()
    renderCategoryForm()

    await user.type(screen.getByLabelText(/título/i), 'Transporte')
    await user.click(screen.getByRole('button', { name: 'CarFront' }))
    await user.click(screen.getByRole('button', { name: 'blue' }))
    await user.click(screen.getByRole('button', { name: /^salvar$/i }))

    await waitFor(() =>
      expect(createCategory).toHaveBeenCalledWith({
        title: 'Transporte',
        description: '',
        icon: 'CarFront',
        color: '#2563EB',
      }),
    )
  })

  it('calls onSuccess after a successful submit', async () => {
    const onSuccess = vi.fn()
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
    renderCategoryForm(onSuccess)

    await user.type(screen.getByLabelText(/título/i), 'Alimentação')
    await user.click(screen.getByRole('button', { name: /^salvar$/i }))

    await waitFor(() => expect(onSuccess).toHaveBeenCalled())
  })
})
