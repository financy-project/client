import type { JSX } from 'react'

import {
  BaggageClaim,
  BookOpen,
  BriefcaseBusiness,
  CarFront,
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
import type { TransactionListItem } from '@/modules/transactions/graphql/queries'

// Duplicated (not imported) from src/modules/categories/components/icon-picker.tsx
// and color-picker.tsx — module-isolation convention already used for
// LIST_CATEGORIES_FOR_SELECT: the transactions module never imports from
// @/modules/categories.
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

// Written out in full (not `bg-${color}-light`) so Tailwind's class
// scanner can statically find every class — same reasoning as CategoryCard.
const iconSquareClasses: Record<TagColor, string> = {
  blue: 'bg-blue-light text-blue-base',
  purple: 'bg-purple-light text-purple-base',
  pink: 'bg-pink-light text-pink-base',
  red: 'bg-red-light text-red-base',
  orange: 'bg-orange-light text-orange-base',
  yellow: 'bg-yellow-light text-yellow-base',
  green: 'bg-green-light text-green-base',
}

interface TransactionCategoryCellProps {
  category: TransactionListItem['category']
}

export function TransactionCategoryCell({ category }: TransactionCategoryCellProps): JSX.Element {
  const Icon = ICON_OPTIONS.find((option) => option.name === category?.icon)?.icon ?? TagIcon
  const colorName =
    COLOR_OPTIONS.find((option) => option.value.toLowerCase() === category?.color.toLowerCase())
      ?.name ?? 'blue'

  return (
    <div className="flex items-center gap-3">
      <div
        data-testid="transaction-category-icon"
        className={cn(
          'flex size-10 shrink-0 items-center justify-center rounded-[8px]',
          iconSquareClasses[colorName],
        )}
      >
        <Icon className="size-4" />
      </div>
      {category ? (
        <Tag color={colorName}>{category.title}</Tag>
      ) : (
        <span className="text-sm text-gray-600">Sem categoria</span>
      )}
    </div>
  )
}
