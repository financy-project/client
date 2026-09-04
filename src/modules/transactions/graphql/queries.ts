import { gql } from '@apollo/client'

// Deliberately leaner than src/modules/categories/graphql/queries.ts's
// LIST_CATEGORIES (which also fetches description/icon/color/
// transactionsQuantity) — the transaction form's category dropdown only
// needs id+title. Both resolve to the same normalized Category:<id> cache
// entries, so no typePolicies are needed.
export const LIST_CATEGORIES_FOR_SELECT = gql`
  query ListCategoriesForSelect {
    listCategories {
      id
      title
    }
  }
`

export interface CategoryForSelect {
  id: string
  title: string
}

export interface ListCategoriesForSelectData {
  listCategories: CategoryForSelect[]
}

export const LIST_TRANSACTIONS = gql`
  query ListTransactions($first: Int, $after: String) {
    listTransactions(first: $first, after: $after) {
      edges {
        node {
          id
          type
          description
          date
          value
          category {
            id
            title
            color
            icon
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalRecord
    }
  }
`

export interface TransactionListItem {
  id: string
  type: 'EXPENSE' | 'INCOME'
  description: string
  date: string
  value: number
  category: { id: string; title: string; color: string; icon: string } | null
}

export interface ListTransactionsData {
  listTransactions: {
    edges: { node: TransactionListItem }[]
    pageInfo: { hasNextPage: boolean; endCursor: string | null }
    totalRecord: number
  }
}

export interface ListTransactionsVariables {
  first?: number
  after?: string
}
