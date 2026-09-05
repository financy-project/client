import { MockedProvider } from '@apollo/client/testing/react'
import { renderHook, waitFor } from '@testing-library/react'
import { createElement } from 'react'
import { describe, expect, it } from 'vitest'
import { GET_DASHBOARD } from '@/modules/dashboard/graphql/queries'
import { useGetDashboard } from '@/modules/dashboard/hooks/use-get-dashboard'

const MOVEMENT = {
  income: 425000,
  expense: 218045,
  totalBalance: 1284732,
}

function renderUseGetDashboard(mocks: React.ComponentProps<typeof MockedProvider>['mocks']) {
  return renderHook(() => useGetDashboard(), {
    wrapper: ({ children }) => createElement(MockedProvider, { mocks }, children),
  })
}

describe('useGetDashboard', () => {
  it('resolves with the mocked movement', async () => {
    const mocks = [
      {
        request: { query: GET_DASHBOARD },
        result: { data: { dashboard: { movement: MOVEMENT } } },
      },
    ]

    const { result } = renderUseGetDashboard(mocks)

    await waitFor(() => expect(result.current.movement).toEqual(MOVEMENT))
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('movement is null and isLoading is true before the query resolves', () => {
    const mocks = [
      {
        request: { query: GET_DASHBOARD },
        result: { data: { dashboard: { movement: MOVEMENT } } },
      },
    ]

    const { result } = renderUseGetDashboard(mocks)

    expect(result.current.movement).toBeNull()
    expect(result.current.isLoading).toBe(true)
  })

  it('sets the fallback error message on a network error', async () => {
    const mocks = [
      {
        request: { query: GET_DASHBOARD },
        error: new Error('Failed to fetch'),
      },
    ]

    const { result } = renderUseGetDashboard(mocks)

    await waitFor(() =>
      expect(result.current.error).toBe('Não foi possível carregar o resumo do dashboard.'),
    )
    expect(result.current.movement).toBeNull()
  })
})
