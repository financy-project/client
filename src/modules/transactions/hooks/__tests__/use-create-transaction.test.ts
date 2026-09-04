import { MockedProvider } from '@apollo/client/testing/react'
import { act, renderHook, waitFor } from '@testing-library/react'
import { createElement } from 'react'
import { describe, expect, it } from 'vitest'
import { CREATE_TRANSACTION } from '@/modules/transactions/graphql/mutations'
import { LIST_TRANSACTIONS } from '@/modules/transactions/graphql/queries'
import { useCreateTransaction } from '@/modules/transactions/hooks/use-create-transaction'

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
      {
        request: { query: LIST_TRANSACTIONS },
        result: { data: { listTransactions: { edges: [], pageInfo: { hasNextPage: false, endCursor: null } } } },
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
