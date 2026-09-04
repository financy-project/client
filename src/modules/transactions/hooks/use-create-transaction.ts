import { CombinedGraphQLErrors } from '@apollo/client/errors'
import { useMutation } from '@apollo/client/react'
import { useState } from 'react'
import type { RegisterFieldError } from '@/modules/auth/hooks/use-register-user'
import type { CreateTransactionData, CreateTransactionInput } from '@/modules/transactions/graphql/mutations'
import { CREATE_TRANSACTION } from '@/modules/transactions/graphql/mutations'
import { LIST_TRANSACTIONS } from '@/modules/transactions/graphql/queries'

const FALLBACK_ERROR_MESSAGE = 'Não foi possível criar a transação. Tente novamente.'

export interface UseCreateTransactionResult {
  createTransaction: (
    input: CreateTransactionInput,
  ) => Promise<CreateTransactionData['createTransaction'] | null>
  isLoading: boolean
  fieldErrors: RegisterFieldError[]
  formError: string | null
}

export function useCreateTransaction(): UseCreateTransactionResult {
  const [mutate, { loading }] = useMutation<CreateTransactionData, { input: CreateTransactionInput }>(
    CREATE_TRANSACTION,
    { refetchQueries: [{ query: LIST_TRANSACTIONS }] },
  )
  const [fieldErrors, setFieldErrors] = useState<RegisterFieldError[]>([])
  const [formError, setFormError] = useState<string | null>(null)

  const createTransaction = async (input: CreateTransactionInput) => {
    setFieldErrors([])
    setFormError(null)

    try {
      const { data } = await mutate({ variables: { input } })
      return data?.createTransaction ?? null
    } catch (error) {
      if (CombinedGraphQLErrors.is(error)) {
        const validationErrors = error.extensions?.validationErrors as
          | RegisterFieldError[]
          | undefined

        if (validationErrors) {
          setFieldErrors(validationErrors)
        } else {
          setFormError(error.message)
        }
      } else {
        setFormError(FALLBACK_ERROR_MESSAGE)
      }

      return null
    }
  }

  return { createTransaction, isLoading: loading, fieldErrors, formError }
}
