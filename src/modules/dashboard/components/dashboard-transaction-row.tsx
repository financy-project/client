import type { JSX } from 'react'

import {
  BaggageClaim,
  BookOpen,
  BriefcaseBusiness,
  CarFront,
  CircleArrowDown,
  CircleArrowUp,
  Dumbbell,
  Gift,
  HeartPulse,
  House,
  Mailbox,
  PawPrint,
  PiggyBank,
  ReceiptText,
  ShoppingCart,
  Tag as TagIcon,
  Ticket,
  ToolCase,
  Utensils,
} from 'lucide-react'
import { Tag, type TagColor } from '@/components/ui/tag'
import { cn } from '@/lib/utils'
import type { DashboardRecentTransaction } from '@/modules/dashboard/graphql/queries'
import {
  formatDashboardTransactionDate,
  formatDashboardTransactionValue,
} from '@/modules/dashboard/utils/format-dashboard-transaction'

// Duplicated (not imported) from
// src/modules/transactions/components/transaction-category-cell.tsx — this
// module never imports from @/modules/transactions, same isolation
// precedent that file itself follows for @/modules/categories.
const ICON_OPTIONS = [
  { name: 'BriefcaseBusiness', icon: BriefcaseBusiness },
  { name: 'CarFront', icon: CarFront },
  { name: 'HeartPulse', icon: HeartPulse },
  { name: 'PiggyBank', icon: PiggyBank },
  { name: 'ShoppingCart', icon: ShoppingCart },
  { name: 'Ticket', icon: Ticket },
  { name: 'ToolCase', icon: ToolCase },
  { name: 'Utensils', icon: Utensils },
  { name: 'PawPrint', icon: PawPrint },
  { name: 'House', icon: House },
  { name: 'Gift', icon: Gift },
  { name: 'Dumbbell', icon: Dumbbell },
  { name: 'BookOpen', icon: BookOpen },
  { name: 'BaggageClaim', icon: BaggageClaim },
  { name: 'Mailbox', icon: Mailbox },
  { name: 'ReceiptText', icon: ReceiptText },
] as const

const COLOR_OPTIONS = [
  { name: 'green', value: '#16A34A' },
  { name: 'blue', value: '#2563EB' },
  { name: 'purple', value: '#9333EA' },
  { name: 'pink', value: '#DB2777' },
  { name: 'red', value: '#DC2626' },
  { name: 'orange', value: '#EA580C' },
  { name: 'yellow', value: '#CA8A04' },
] as const

const iconSquareClasses: Record<TagColor, string> = {
  blue: 'bg-blue-light text-blue-base',
  purple: 'bg-purple-light text-purple-base',
  pink: 'bg-pink-light text-pink-base',
  red: 'bg-red-light text-red-base',
  orange: 'bg-orange-light text-orange-base',
  yellow: 'bg-yellow-light text-yellow-base',
  green: 'bg-green-light text-green-base',
}

export interface DashboardTransactionRowProps {
  transaction: DashboardRecentTransaction
}

export function DashboardTransactionRow({ transaction }: DashboardTransactionRowProps): JSX.Element {
  const { category } = transaction
  const Icon = ICON_OPTIONS.find((option) => option.name === category?.icon)?.icon ?? TagIcon
  const colorName =
    COLOR_OPTIONS.find((option) => option.value.toLowerCase() === category?.color.toLowerCase())
      ?.name ?? 'blue'

  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-[8px]',
            iconSquareClasses[colorName],
          )}
        >
          <Icon className="size-4" />
        </div>
        <div>
          <p className="text-sm text-gray-800">{transaction.description}</p>
          <p className="text-sm text-gray-600">{formatDashboardTransactionDate(transaction.date)}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 pl-6">
        {category ? (
          <Tag color={colorName}>{category.title}</Tag>
        ) : (
          <span className="text-sm text-gray-600">Sem categoria</span>
        )}
        <span className="text-sm text-gray-800">
          {formatDashboardTransactionValue(transaction.value, transaction.type)}
        </span>
        <span data-testid="dashboard-transaction-type-icon">
          {transaction.type === 'INCOME' ? (
            <CircleArrowUp className="size-4 text-green-dark" />
          ) : (
            <CircleArrowDown className="size-4 text-red-dark" />
          )}
        </span>
      </div>
    </div>
  )
}
