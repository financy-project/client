import { gql } from '@apollo/client'

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
      title
      description
      icon
      color
    }
  }
`

export interface CreateCategoryInput {
  title: string
  description?: string | null
  icon: string
  color: string
}

export interface CreateCategoryData {
  createCategory: {
    id: string
    title: string
    description: string | null
    icon: string
    color: string
  }
}
