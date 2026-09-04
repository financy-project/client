import { MockedProvider } from '@apollo/client/testing/react'
import { renderHook, waitFor } from '@testing-library/react'
import { createElement } from 'react'
import { describe, expect, it } from 'vitest'
import { LIST_CATEGORIES_FOR_SELECT } from '@/modules/transactions/graphql/queries'
import { useCategoriesForSelect } from '@/modules/transactions/hooks/use-categories-for-select'

const CATEGORIES = [
  { id: '1', title: 'Alimentação' },
  { id: '2', title: 'Mercado' },
]

function renderUseCategoriesForSelect(mocks: React.ComponentProps<typeof MockedProvider>['mocks']) {
  return renderHook(() => useCategoriesForSelect(), {
    wrapper: ({ children }) => createElement(MockedProvider, { mocks }, children),
  })
}

describe('useCategoriesForSelect', () => {
  it('resolves with { id, title }[] from listCategories', async () => {
    const mocks = [
      {
        request: { query: LIST_CATEGORIES_FOR_SELECT },
        result: { data: { listCategories: CATEGORIES } },
      },
    ]

    const { result } = renderUseCategoriesForSelect(mocks)

    await waitFor(() => expect(result.current.categories).toEqual(CATEGORIES))
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('categories is [] before the query resolves', () => {
    const mocks = [
      {
        request: { query: LIST_CATEGORIES_FOR_SELECT },
        result: { data: { listCategories: CATEGORIES } },
      },
    ]

    const { result } = renderUseCategoriesForSelect(mocks)

    expect(result.current.categories).toEqual([])
    expect(result.current.isLoading).toBe(true)
  })

  it('sets the fallback error message on a network error', async () => {
    const mocks = [
      {
        request: { query: LIST_CATEGORIES_FOR_SELECT },
        error: new Error('Failed to fetch'),
      },
    ]

    const { result } = renderUseCategoriesForSelect(mocks)

    await waitFor(() =>
      expect(result.current.error).toBe('Não foi possível carregar as categorias.'),
    )
    expect(result.current.categories).toEqual([])
  })
})
