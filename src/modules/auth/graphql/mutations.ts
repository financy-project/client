import { gql } from '@apollo/client'

export const REGISTER_USER = gql`
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      id
      email
      name
    }
  }
`

export interface RegisterUserInput {
  name: string
  email: string
  password: string
}

export interface RegisterUserData {
  registerUser: {
    id: string
    email: string
    name: string
  }
}
