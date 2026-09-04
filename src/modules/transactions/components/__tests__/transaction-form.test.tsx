import { MockedProvider } from '@apollo/client/testing/react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { TransactionForm } from '@/modules/transactions/components/transaction-form'
import { LIST_CATEGORIES_FOR_SELECT } from '@/modules/transactions/graphql/queries'

const CATEGORIES_MOCK = {
  request: { query: LIST_CATEGORIES_FOR_SELECT },
  result: { data: { listCategories: [{ id: 'cat-1', title: 'Alimentação' }] } },
}

function renderTransactionForm(props: Partial<React.ComponentProps<typeof TransactionForm>> = {}) {
  return render(
    <MockedProvider mocks={[CATEGORIES_MOCK, CATEGORIES_MOCK]}>
      <TransactionForm isLoading={false} fieldErrors={[]} formError={null} onSubmit={vi.fn()} {...props} />
    </MockedProvider>,
  )
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

  it('calls onSubmit with parsed values when all fields are valid', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    renderTransactionForm({ onSubmit })

    await user.type(screen.getByLabelText('Descrição'), 'Almoço no restaurante')

    await user.click(screen.getByLabelText('Data'))
    const dayButtons = document.querySelectorAll<HTMLButtonElement>('button[data-day]')
    await user.click(dayButtons[10])

    await user.type(screen.getByLabelText('Valor'), '150')

    await user.click(await screen.findByRole('combobox'))
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
