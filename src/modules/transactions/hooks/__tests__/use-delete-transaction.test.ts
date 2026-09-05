import { MockedProvider } from '@apollo/client/testing/react'
import { act, renderHook, waitFor } from '@testing-library/react'
import { createElement } from 'react'
import { describe, expect, it } from 'vitest'
import { DELETE_TRANSACTION } from '@/modules/transactions/graphql/mutations'
import { LIST_TRANSACTIONS } from '@/modules/transactions/graphql/queries'
import { useDeleteTransaction } from '@/modules/transactions/hooks/use-delete-transaction'

const ID = 't1'

function renderUseDeleteTransaction(mocks: React.ComponentProps<typeof MockedProvider>['mocks']) {
  return renderHook(() => useDeleteTransaction(), {
    wrapper: ({ children }) => createElement(MockedProvider, { mocks }, children),
  })
}

describe('useDeleteTransaction', () => {
  it('resolves true and toggles isLoading on success', async () => {
    const mocks = [
      {
        request: { query: DELETE_TRANSACTION, variables: { id: ID } },
        result: { data: { deleteTransaction: true } },
      },
      {
        request: { query: LIST_TRANSACTIONS },
        result: { data: { listTransactions: { edges: [], pageInfo: { hasNextPage: false, endCursor: null }, totalRecord: 0 } } },
      },
    ]

    const { result } = renderUseDeleteTransaction(mocks)
    expect(result.current.isLoading).toBe(false)

    let response
    await act(async () => {
      response = await result.current.deleteTransaction(ID)
    })

    expect(response).toBe(true)
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.error).toBeNull()
  })

  it('sets the fallback error message on a network/unexpected error', async () => {
    const mocks = [
      {
        request: { query: DELETE_TRANSACTION, variables: { id: ID } },
        error: new Error('Failed to fetch'),
      },
    ]

    const { result } = renderUseDeleteTransaction(mocks)

    let response
    await act(async () => {
      response = await result.current.deleteTransaction(ID)
    })

    expect(response).toBe(false)
    await waitFor(() =>
      expect(result.current.error).toBe('Não foi possível excluir a transação. Tente novamente.'),
    )
  })
})
