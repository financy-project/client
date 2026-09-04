import type { JSX } from 'react'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { CategoryDialogHeader } from '@/modules/categories/components/category-dialog-header'
import { CategoryForm } from '@/modules/categories/components/category-form'

interface NewCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewCategoryDialog({ open, onOpenChange }: NewCategoryDialogProps): JSX.Element {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="gap-6 rounded-xl p-6 sm:max-w-md">
        <CategoryDialogHeader
          title="Nova categoria"
          subtitle="Organize suas transações com categorias"
        />
        <CategoryForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}
