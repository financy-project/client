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

// Stub — exists solely so useCreateTransaction's refetchQueries has a real
// target. No component mounts a useQuery(LIST_TRANSACTIONS) in this
// feature (the transaction list screen is out of scope); this minimal
// id-only selection is expected to be superseded by that feature's own
// richer query once it's built.
export const LIST_TRANSACTIONS = gql`
  query ListTransactions {
    listTransactions {
      edges {
        node {
          id
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`
