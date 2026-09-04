import { useQuery } from '@apollo/client/react'
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
  const [page, setPage] = useState(1)
  const [cursors, setCursors] = useState<Record<number, string | undefined>>({ 1: undefined })
  const [seenData, setSeenData] = useState<ListTransactionsData | undefined>(undefined)

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

  const totalRecord = data?.listTransactions.totalRecord ?? 0

  const goToPage = (target: number) => {
    if (target === page) return
    if (target !== 1 && cursors[target] === undefined) return

    setPage(target)
  }

  return {
    transactions: data?.listTransactions.edges.map((edge) => edge.node) ?? [],
    isLoading: loading,
    error: error ? FALLBACK_ERROR_MESSAGE : null,
    page,
    totalPages: Math.ceil(totalRecord / PAGE_SIZE),
    totalRecord,
    pageSize: PAGE_SIZE,
    goToPage,
  }
}
