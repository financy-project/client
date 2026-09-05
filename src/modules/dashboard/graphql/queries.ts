import { gql } from '@apollo/client'

export const GET_DASHBOARD = gql`
  query GetDashboard {
    dashboard {
      movement {
        income
        expense
        totalBalance
      }
    }
  }
`

export interface DashboardMovement {
  income: number
  expense: number
  totalBalance: number
}

export interface GetDashboardData {
  dashboard: {
    movement: DashboardMovement
  }
}
