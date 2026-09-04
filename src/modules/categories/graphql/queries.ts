import { gql } from '@apollo/client'

export const LIST_CATEGORIES = gql`
  query ListCategories {
    listCategories {
      id
      title
      description
      icon
      color
      transactionQuantity
    }
  }
`

export interface Category {
  id: string
  title: string
  description: string | null
  icon: string
  color: string
  transactionQuantity: number
}

export interface ListCategoriesData {
  listCategories: Category[]
}
