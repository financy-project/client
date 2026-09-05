import { MockedProvider } from '@apollo/client/testing/react'
import { act, renderHook, waitFor } from '@testing-library/react'
import { createElement } from 'react'
import { describe, expect, it } from 'vitest'
import { CREATE_TRANSACTION } from '@/modules/transactions/graphql/mutations'
import { LIST_TRANSACTIONS } from '@/modules/transactions/graphql/queries'
import { useCreateTransaction } from '@/modules/transactions/hooks/use-create-transaction'
import type { TransactionFilterValues } from '@/modules/transactions/hooks/use-list-transactions'
import { useListTransactions } from '@/modules/transactions/hooks/use-list-transactions'

const LIST_FILTERS: TransactionFilterValues = {
  description: '',
  type: '',
  categoryId: '',
  period: { month: 9, year: 2026 },
}

const INPUT = {
  type: 'EXPENSE' as const,
  description: 'Almoço no restaurante',
  date: '2026-09-04T00:00:00.000Z',
  value: 150,
  categoryId: 'cat-1',
}

function renderUseCreateTransaction(mocks: React.ComponentProps<typeof MockedProvider>['mocks']) {
  return renderHook(() => useCreateTransaction(), {
    wrapper: ({ children }) => createElement(MockedProvider, { mocks }, children),
  })
}

describe('useCreateTransaction', () => {
  it('resolves with the created transaction and toggles isLoading on success', async () => {
    const mocks = [
      {
        request: { query: CREATE_TRANSACTION, variables: { input: INPUT } },
        result: {
          data: {
            createTransaction: {
              id: 't1',
              ...INPUT,
              category: { id: INPUT.categoryId, title: 'Alimentação', color: '#2563EB' },
            },
          },
        },
      },
    ]

    const { result } = renderUseCreateTransaction(mocks)
    expect(result.current.isLoading).toBe(false)

    let response
    await act(async () => {
      response = await result.current.createTransaction(INPUT)
    })

    expect(response).toEqual({
      id: 't1',
      ...INPUT,
      category: { id: INPUT.categoryId, title: 'Alimentação', color: '#2563EB' },
    })
    await waitFor(() => expect(result.current.isLoading).toBe(false))
  })

  it("refetches the active useListTransactions() watcher (with its own variables) after a successful create, not an isolated no-variables query", async () => {
    const listVariables = {
      first: 10,
      after: undefined,
      description: undefined,
      type: undefined,
      categoryIds: undefined,
      month: 9,
      year: 2026,
    }
    const createdTransaction = {
      id: 't1',
      ...INPUT,
      category: { id: INPUT.categoryId, title: 'Alimentação', color: '#2563EB' },
    }

    const mocks = [
      {
        request: { query: LIST_TRANSACTIONS, variables: listVariables },
        result: {
          data: {
            listTransactions: {
              edges: [],
              pageInfo: { hasNextPage: false, endCursor: null },
              totalRecord: 0,
            },
          },
        },
      },
      {
        request: { query: CREATE_TRANSACTION, variables: { input: INPUT } },
        result: { data: { createTransaction: createdTransaction } },
      },
      {
        request: { query: LIST_TRANSACTIONS, variables: listVariables },
        result: {
          data: {
            listTransactions: {
              edges: [{ node: { ...createdTransaction, date: INPUT.date } }],
              pageInfo: { hasNextPage: false, endCursor: null },
              totalRecord: 1,
            },
          },
        },
      },
    ]

    const { result } = renderHook(
      () => ({ list: useListTransactions(LIST_FILTERS), create: useCreateTransaction() }),
      { wrapper: ({ children }) => createElement(MockedProvider, { mocks }, children) },
    )

    await waitFor(() => expect(result.current.list.totalRecord).toBe(0))

    await act(async () => {
      await result.current.create.createTransaction(INPUT)
    })

    await waitFor(() => expect(result.current.list.transactions).toHaveLength(1))
    expect(result.current.list.totalRecord).toBe(1)
  })

  it('maps extensions.validationErrors straight to fieldErrors when present', async () => {
    const mocks = [
      {
        request: { query: CREATE_TRANSACTION, variables: { input: INPUT } },
        result: {
          errors: [{ message: 'Erro de validação' }],
          extensions: {
            validationErrors: [{ path: 'value', message: 'O valor deve ser positivo' }],
          },
        },
      },
    ]

    const { result } = renderUseCreateTransaction(mocks)

    await act(async () => {
      await result.current.createTransaction(INPUT)
    })

    await waitFor(() =>
      expect(result.current.fieldErrors).toEqual([
        { path: 'value', message: 'O valor deve ser positivo' },
      ]),
    )
    expect(result.current.formError).toBeNull()
  })

  it('sets formError to a fallback message on a network/unexpected error', async () => {
    const mocks = [
      {
        request: { query: CREATE_TRANSACTION, variables: { input: INPUT } },
        error: new Error('Failed to fetch'),
      },
    ]

    const { result } = renderUseCreateTransaction(mocks)

    await act(async () => {
      await result.current.createTransaction(INPUT)
    })

    await waitFor(() =>
      expect(result.current.formError).toBe(
        'Não foi possível criar a transação. Tente novamente.',
      ),
    )
    expect(result.current.fieldErrors).toEqual([])
  })
})
