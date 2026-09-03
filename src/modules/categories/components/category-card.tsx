import type { JSX } from 'react'

import { Pencil, Tag, Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { IconButton } from '@/components/ui/icon-button'
import { ICON_OPTIONS } from '@/modules/categories/components/icon-picker'
import type { Category } from '@/modules/categories/graphql/queries'

interface CategoryCardProps {
  category: Category
  onEdit: (category: Category) => void
  onDelete: (category: Category) => void
}

export function CategoryCard({ category, onEdit, onDelete }: CategoryCardProps): JSX.Element {
  const Icon = ICON_OPTIONS.find((option) => option.name === category.icon)?.icon ?? Tag
  const itemsLabel =
    category.transactionQuantity === 1
      ? '1 item'
      : `${category.transactionQuantity} itens`

  return (
    <Card className="gap-4 border-gray-200 p-4 ring-0">
      <div className="flex items-start justify-between">
        <div
          data-testid="category-card-icon"
          className="flex size-10 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${category.color}1a`, color: category.color }}
        >
          <Icon className="size-5" />
        </div>
        <div className="flex gap-1">
          <IconButton
            variant="ghost"
            size="icon-sm"
            icon={<Pencil />}
            aria-label="Editar"
            onClick={() => onEdit(category)}
          />
          <IconButton
            variant="ghost"
            size="icon-sm"
            icon={<Trash2 />}
            aria-label="Excluir"
            onClick={() => onDelete(category)}
          />
        </div>
      </div>
      <div className="grid gap-1">
        <h3 className="font-semibold text-gray-800">{category.title}</h3>
        {category.description && <p className="text-sm text-gray-600">{category.description}</p>}
      </div>
      <div className="flex items-center justify-between">
        <span
          className="rounded-full px-2 py-1 text-xs font-medium"
          style={{ backgroundColor: `${category.color}1a`, color: category.color }}
        >
          {category.title}
        </span>
        <span className="text-sm text-gray-500">{itemsLabel}</span>
      </div>
    </Card>
  )
}
