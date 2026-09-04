import { MockedProvider } from '@apollo/client/testing/react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { TransactionForm } from '@/modules/transactions/components/transaction-form'
import { LIST_CATEGORIES_FOR_SELECT } from '@/modules/transactions/graphql/queries'

const CATEGORIES_MOCK = {
  request: { query: LIST_CATEGORIES_FOR_SELECT },
  result: { data: { listCategories: [{ id: 'cat-1', title: 'Alimentação' }] } },
  // Unbounded reuse: this same mock backs the query across every test in
  // this file, and how many times React actually fires it per render isn't
  // a detail worth pinning down here.
  maxUsageCount: Number.POSITIVE_INFINITY,
}

function renderTransactionForm(props: Partial<React.ComponentProps<typeof TransactionForm>> = {}) {
  return render(
    <MockedProvider mocks={[CATEGORIES_MOCK]}>
      <TransactionForm isLoading={false} fieldErrors={[]} formError={null} onSubmit={vi.fn()} {...props} />
    </MockedProvider>,
  )
}

// The category Select's options only exist once useCategoriesForSelect()
// resolves (its trigger stays `disabled` — see categoriesLoading — until
// then). Opening it before that race loses: Radix Select renders
// SelectContent's items from whatever `categories` was at open time.
async function openCategorySelect(user: ReturnType<typeof userEvent.setup>) {
  const combobox = await screen.findByRole('combobox')
  await waitFor(() => expect(combobox).not.toBeDisabled())
  await user.click(combobox)
  return combobox
}

describe('TransactionForm', () => {
  it('shows "A descrição é obrigatória" when description is submitted empty', async () => {
    const user = userEvent.setup()
    renderTransactionForm()

    await user.click(screen.getByRole('button', { name: /^salvar$/i }))

    expect(await screen.findByText('A descrição é obrigatória')).toBeInTheDocument()
  })

  it('shows "Selecione uma data" when date is submitted unset', async () => {
    const user = userEvent.setup()
    renderTransactionForm()

    await user.click(screen.getByRole('button', { name: /^salvar$/i }))

    expect(await screen.findByText('Selecione uma data')).toBeInTheDocument()
  })

  it('shows "O valor deve ser maior que zero" when value is 0', async () => {
    const user = userEvent.setup()
    renderTransactionForm()

    await user.click(screen.getByRole('button', { name: /^salvar$/i }))

    expect(await screen.findByText('O valor deve ser maior que zero')).toBeInTheDocument()
  })

  it('shows "Selecione uma categoria" when categoryId is submitted empty', async () => {
    const user = userEvent.setup()
    renderTransactionForm()

    await user.click(screen.getByRole('button', { name: /^salvar$/i }))

    expect(await screen.findByText('Selecione uma categoria')).toBeInTheDocument()
  })

  it('defaults the type toggle to "Despesa" (EXPENSE) selected', () => {
    renderTransactionForm()

    expect(screen.getByRole('button', { name: /despesa/i })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: /receita/i })).toHaveAttribute('aria-pressed', 'false')
  })

  it('switches the type toggle to "Receita" (INCOME) when clicked', async () => {
    const user = userEvent.setup()
    renderTransactionForm()

    await user.click(screen.getByRole('button', { name: /receita/i }))

    expect(screen.getByRole('button', { name: /receita/i })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: /despesa/i })).toHaveAttribute('aria-pressed', 'false')
  })

  it('gives the category select trigger the exact Figma-spec padding (12px horizontal, 14px vertical)', async () => {
    renderTransactionForm()

    expect(await screen.findByRole('combobox')).toHaveClass('px-3', 'py-3.5')
  })

  it('offers an option to revert the selected category back to its initial (unselected) value', async () => {
    const user = userEvent.setup()
    renderTransactionForm()

    await openCategorySelect(user)
    await user.click(await screen.findByRole('option', { name: 'Alimentação' }))
    await waitFor(() => expect(screen.getByRole('combobox')).toHaveTextContent('Alimentação'))
    await waitFor(() => expect(screen.queryByRole('option')).not.toBeInTheDocument())

    await user.click(screen.getByRole('combobox'))
    await user.click(await screen.findByRole('option', { name: 'Voltar ao valor inicial' }))

    await waitFor(() => expect(screen.getByRole('combobox')).toHaveTextContent('Selecione'))
  })

  it('calls onSubmit with parsed values when all fields are valid', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    renderTransactionForm({ onSubmit })

    await user.type(screen.getByLabelText('Descrição'), 'Almoço no restaurante')

    await user.click(screen.getByLabelText('Data'))
    const dayButtons = document.querySelectorAll<HTMLButtonElement>('button[data-day]')
    await user.click(dayButtons[10])

    await user.type(screen.getByLabelText('Valor'), '150')

    await openCategorySelect(user)
    await user.click(await screen.findByRole('option', { name: 'Alimentação' }))

    await user.click(screen.getByRole('button', { name: /^salvar$/i }))

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))
    const values = onSubmit.mock.calls[0][0]
    expect(values.type).toBe('EXPENSE')
    expect(values.description).toBe('Almoço no restaurante')
    expect(values.date).toBeInstanceOf(Date)
    expect(values.value).toBe(1.5)
    expect(values.categoryId).toBe('cat-1')
  })
})
