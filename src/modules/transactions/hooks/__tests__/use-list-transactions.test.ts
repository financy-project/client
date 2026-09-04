import { MockedProvider } from '@apollo/client/testing/react'
import { act, renderHook, waitFor } from '@testing-library/react'
import { createElement } from 'react'
import { describe, expect, it } from 'vitest'
import { LIST_TRANSACTIONS } from '@/modules/transactions/graphql/queries'
import { useListTransactions } from '@/modules/transactions/hooks/use-list-transactions'

const TRANSACTION = {
  id: 't1',
  type: 'EXPENSE' as const,
  description: 'Almoço no restaurante',
  date: '2026-09-04T00:00:00.000Z',
  value: 8850,
  category: { id: 'cat-1', title: 'Alimentação', color: '#2563EB', icon: 'Utensils' },
}

function renderUseListTransactions(mocks: React.ComponentProps<typeof MockedProvider>['mocks']) {
  return renderHook(() => useListTransactions(), {
    wrapper: ({ children }) => createElement(MockedProvider, { mocks }, children),
  })
}

describe('useListTransactions', () => {
  it('passes { first: 10, after: undefined } on initial mount', async () => {
    const mocks = [
      {
        request: { query: LIST_TRANSACTIONS, variables: { first: 10, after: undefined } },
        result: {
          data: {
            listTransactions: {
              edges: [{ node: TRANSACTION }],
              pageInfo: { hasNextPage: false, endCursor: null },
              totalRecord: 1,
            },
          },
        },
      },
    ]

    const { result } = renderUseListTransactions(mocks)

    await waitFor(() => expect(result.current.transactions).toEqual([TRANSACTION]))
  })

  it('returns isLoading: true before the query resolves, transactions: []', () => {
    const mocks = [
      {
        request: { query: LIST_TRANSACTIONS, variables: { first: 10, after: undefined } },
        result: {
          data: {
            listTransactions: {
              edges: [{ node: TRANSACTION }],
              pageInfo: { hasNextPage: false, endCursor: null },
              totalRecord: 1,
            },
          },
        },
      },
    ]

    const { result } = renderUseListTransactions(mocks)

    expect(result.current.isLoading).toBe(true)
    expect(result.current.transactions).toEqual([])
  })

  it('sets the fallback error message on a network error, transactions stays []', async () => {
    const mocks = [
      {
        request: { query: LIST_TRANSACTIONS, variables: { first: 10, after: undefined } },
        error: new Error('Failed to fetch'),
      },
    ]

    const { result } = renderUseListTransactions(mocks)

    await waitFor(() =>
      expect(result.current.error).toBe('Não foi possível carregar as transações.'),
    )
    expect(result.current.transactions).toEqual([])
  })

  it('goToPage(2) after page 1 resolves with hasNextPage: true re-queries with after: <page 1 endCursor>', async () => {
    const mocks = [
      {
        request: { query: LIST_TRANSACTIONS, variables: { first: 10, after: undefined } },
        result: {
          data: {
            listTransactions: {
              edges: [{ node: TRANSACTION }],
              pageInfo: { hasNextPage: true, endCursor: 'cursor-1' },
              totalRecord: 15,
            },
          },
        },
      },
      {
        request: { query: LIST_TRANSACTIONS, variables: { first: 10, after: 'cursor-1' } },
        result: {
          data: {
            listTransactions: {
              edges: [{ node: { ...TRANSACTION, id: 't2' } }],
              pageInfo: { hasNextPage: false, endCursor: null },
              totalRecord: 15,
            },
          },
        },
      },
    ]

    const { result } = renderUseListTransactions(mocks)

    await waitFor(() => expect(result.current.transactions).toEqual([TRANSACTION]))

    act(() => {
      result.current.goToPage(2)
    })

    await waitFor(() =>
      expect(result.current.transactions).toEqual([{ ...TRANSACTION, id: 't2' }]),
    )
    expect(result.current.page).toBe(2)
  })

  it("goToPage(n) is a no-op when page n's cursor isn't yet known", async () => {
    const mocks = [
      {
        request: { query: LIST_TRANSACTIONS, variables: { first: 10, after: undefined } },
        result: {
          data: {
            listTransactions: {
              edges: [{ node: TRANSACTION }],
              pageInfo: { hasNextPage: true, endCursor: 'cursor-1' },
              totalRecord: 25,
            },
          },
        },
      },
    ]

    const { result } = renderUseListTransactions(mocks)

    await waitFor(() => expect(result.current.transactions).toEqual([TRANSACTION]))

    act(() => {
      result.current.goToPage(3)
    })

    expect(result.current.page).toBe(1)
  })

  it('totalPages computes Math.ceil(totalRecord / 10) from the mocked response', async () => {
    const mocks = [
      {
        request: { query: LIST_TRANSACTIONS, variables: { first: 10, after: undefined } },
        result: {
          data: {
            listTransactions: {
              edges: [{ node: TRANSACTION }],
              pageInfo: { hasNextPage: true, endCursor: 'cursor-1' },
              totalRecord: 27,
            },
          },
        },
      },
    ]

    const { result } = renderUseListTransactions(mocks)

    await waitFor(() => expect(result.current.totalPages).toBe(3))
  })
})
