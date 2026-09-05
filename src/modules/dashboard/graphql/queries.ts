import { gql } from '@apollo/client'

export const GET_DASHBOARD = gql`
  query GetDashboard {
    dashboard {
      movement {
        income
        expense
        totalBalance
      }
      recentTransactions {
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
  }
`

export interface DashboardMovement {
  income: number
  expense: number
  totalBalance: number
}

export interface DashboardRecentTransaction {
  id: string
  type: 'EXPENSE' | 'INCOME'
  description: string
  date: string
  value: number
  category: { id: string; title: string; color: string; icon: string } | null
}

export interface GetDashboardData {
  dashboard: {
    movement: DashboardMovement
    recentTransactions: DashboardRecentTransaction[]
  }
}
