import { useMutation } from '@apollo/client/react'
import { useState } from 'react'
import type { DeleteTransactionData } from '@/modules/transactions/graphql/mutations'
import { DELETE_TRANSACTION } from '@/modules/transactions/graphql/mutations'
import { LIST_TRANSACTIONS } from '@/modules/transactions/graphql/queries'

const FALLBACK_ERROR_MESSAGE = 'Não foi possível excluir a transação. Tente novamente.'

export interface UseDeleteTransactionResult {
  deleteTransaction: (id: string) => Promise<boolean>
  isLoading: boolean
  error: string | null
}

export function useDeleteTransaction(): UseDeleteTransactionResult {
  const [mutate, { loading }] = useMutation<DeleteTransactionData, { id: string }>(
    DELETE_TRANSACTION,
    { refetchQueries: [{ query: LIST_TRANSACTIONS }] },
  )
  const [error, setError] = useState<string | null>(null)

  const deleteTransaction = async (id: string) => {
    setError(null)

    try {
      const { data } = await mutate({ variables: { id } })
      return data?.deleteTransaction ?? false
    } catch {
      setError(FALLBACK_ERROR_MESSAGE)
      return false
    }
  }

  return { deleteTransaction, isLoading: loading, error }
}
