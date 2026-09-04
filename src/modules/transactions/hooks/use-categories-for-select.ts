import { useQuery } from '@apollo/client/react'
import type { CategoryForSelect, ListCategoriesForSelectData } from '@/modules/transactions/graphql/queries'
import { LIST_CATEGORIES_FOR_SELECT } from '@/modules/transactions/graphql/queries'

const FALLBACK_ERROR_MESSAGE = 'Não foi possível carregar as categorias.'

export interface UseCategoriesForSelectResult {
  categories: CategoryForSelect[]
  isLoading: boolean
  error: string | null
}

export function useCategoriesForSelect(): UseCategoriesForSelectResult {
  const { data, loading, error } = useQuery<ListCategoriesForSelectData>(LIST_CATEGORIES_FOR_SELECT)

  return {
    categories: data?.listCategories ?? [],
    isLoading: loading,
    error: error ? FALLBACK_ERROR_MESSAGE : null,
  }
}
