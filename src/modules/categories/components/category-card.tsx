import type { JSX } from 'react'

import { Pencil, Tag as TagIcon, Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { IconButton } from '@/components/ui/icon-button'
import { Tag, type TagColor } from '@/components/ui/tag'
import { cn } from '@/lib/utils'
import { COLOR_OPTIONS } from '@/modules/categories/components/color-picker'
import { ICON_OPTIONS } from '@/modules/categories/components/icon-picker'
import type { Category } from '@/modules/categories/graphql/queries'

interface CategoryCardProps {
  category: Category
  onEdit: (category: Category) => void
  onDelete: (category: Category) => void
}

// Written out in full (not `bg-${color}-light`) so Tailwind's class scanner
// can statically find every class — same reasoning as Tag's colorClasses.
const iconSquareClasses: Record<TagColor, string> = {
  blue: 'bg-blue-light text-blue-base',
  purple: 'bg-purple-light text-purple-base',
  pink: 'bg-pink-light text-pink-base',
  red: 'bg-red-light text-red-base',
  orange: 'bg-orange-light text-orange-base',
  yellow: 'bg-yellow-light text-yellow-base',
  green: 'bg-green-light text-green-base',
}

export function CategoryCard({ category, onEdit, onDelete }: CategoryCardProps): JSX.Element {
  const Icon = ICON_OPTIONS.find((option) => option.name === category.icon)?.icon ?? TagIcon
  const colorName =
    COLOR_OPTIONS.find((option) => option.value.toLowerCase() === category.color.toLowerCase())
      ?.name ?? 'blue'
  const itemsLabel =
    category.transactionsQuantity === 1 ? '1 item' : `${category.transactionsQuantity} itens`

  return (
    <Card className="gap-5 border-gray-200 p-6 ring-0">
      <div className="flex items-start justify-between">
        <div
          data-testid="category-card-icon"
          className={cn(
            'flex size-10 items-center justify-center rounded-[8px]',
            iconSquareClasses[colorName],
          )}
        >
          <Icon className="size-4" />
        </div>
        <div className="flex gap-2">
          <IconButton
            variant="outline"
            size="icon"
            className="border-gray-300"
            icon={<Pencil className="text-gray-700" />}
            aria-label="Editar"
            onClick={() => onEdit(category)}
          />
          <IconButton
            variant="outline"
            size="icon"
            className="border-gray-300"
            icon={<Trash2 className="text-destructive" />}
            aria-label="Excluir"
            onClick={() => onDelete(category)}
          />
        </div>
      </div>
      <div className="grid gap-1">
        <h3 className="text-base leading-6 font-semibold text-gray-800">{category.title}</h3>
        {category.description && (
          <p className="text-sm leading-5 text-gray-600">{category.description}</p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <Tag color={colorName}>{category.title}</Tag>
        <span className="text-sm leading-5 text-gray-600">{itemsLabel}</span>
      </div>
    </Card>
  )
}
