import { useApolloClient, useQuery } from '@apollo/client/react'
import { useState } from 'react'
import type {
  ListTransactionsData,
  ListTransactionsVariables,
  TransactionListItem,
} from '@/modules/transactions/graphql/queries'
import { LIST_TRANSACTIONS } from '@/modules/transactions/graphql/queries'

const FALLBACK_ERROR_MESSAGE = 'Não foi possível carregar as transações.'
const PAGE_SIZE = 10

export interface UseListTransactionsResult {
  transactions: TransactionListItem[]
  isLoading: boolean
  error: string | null
  page: number
  totalPages: number
  totalRecord: number
  pageSize: number
  goToPage: (page: number) => void
}

export function useListTransactions(): UseListTransactionsResult {
  const client = useApolloClient()
  const [page, setPage] = useState(1)
  const [cursors, setCursors] = useState<Record<number, string | undefined>>({ 1: undefined })
  const [seenData, setSeenData] = useState<ListTransactionsData | undefined>(undefined)
  const [isResolvingPage, setIsResolvingPage] = useState(false)
  const [resolveError, setResolveError] = useState<string | null>(null)

  const { data, loading, error } = useQuery<ListTransactionsData, ListTransactionsVariables>(
    LIST_TRANSACTIONS,
    { variables: { first: PAGE_SIZE, after: cursors[page] }, fetchPolicy: 'cache-and-network' },
  )

  // Adjust cursors during render (React's recommended alternative to a
  // setState-in-effect) when the query returns fresh data for this page —
  // the guard on `seenData` keeps this idempotent per response, since the
  // page-cursor map must persist across page navigations rather than reset.
  if (data && data !== seenData) {
    setSeenData(data)

    const { hasNextPage, endCursor } = data.listTransactions.pageInfo

    if (hasNextPage && endCursor && cursors[page + 1] === undefined) {
      setCursors((prev) => ({ ...prev, [page + 1]: endCursor }))
    }
  }

  // While a page-change fetch is in flight, Apollo has no cache entry for
  // the new cursor yet (`data` is undefined) — fall back to the last
  // successful response so the table keeps showing its previous rows/totals
  // and only needs to swap the body for skeleton rows while `isLoading`.
  const resolvedData = data ?? seenData
  const totalRecord = resolvedData?.listTransactions.totalRecord ?? 0

  const goToPage = async (target: number) => {
    if (target === page || target < 1 || isResolvingPage) return

    if (target === 1 || cursors[target] !== undefined) {
      setPage(target)
      return
    }

    // The API only supports opaque forward cursors (no offset-based random
    // access), so a page's cursor can only be resolved from the page right
    // before it. Jumping straight to a page number the user hasn't visited
    // yet (anything past the immediate next page) requires walking the
    // intermediate pages first — via the Apollo cache, so already-fetched
    // pages resolve instantly and only genuinely new ones hit the network —
    // instead of silently doing nothing.
    let knownPage = 1
    while (cursors[knownPage + 1] !== undefined) knownPage++

    setIsResolvingPage(true)
    setResolveError(null)

    try {
      let cursor = cursors[knownPage]
      const resolvedCursors: Record<number, string | undefined> = {}

      for (let p = knownPage; p < target; p++) {
        const { data: pageData } = await client.query<ListTransactionsData, ListTransactionsVariables>({
          query: LIST_TRANSACTIONS,
          variables: { first: PAGE_SIZE, after: cursor },
        })
        const { hasNextPage, endCursor } = pageData?.listTransactions.pageInfo ?? {}

        if (!hasNextPage || !endCursor) return

        cursor = endCursor
        resolvedCursors[p + 1] = endCursor
      }

      setCursors((prev) => ({ ...prev, ...resolvedCursors }))
      setPage(target)
    } catch {
      setResolveError(FALLBACK_ERROR_MESSAGE)
    } finally {
      setIsResolvingPage(false)
    }
  }

  return {
    transactions: resolvedData?.listTransactions.edges.map((edge) => edge.node) ?? [],
    isLoading: loading || isResolvingPage,
    error: error || resolveError ? FALLBACK_ERROR_MESSAGE : null,
    page,
    totalPages: Math.ceil(totalRecord / PAGE_SIZE),
    totalRecord,
    pageSize: PAGE_SIZE,
    goToPage,
  }
}
