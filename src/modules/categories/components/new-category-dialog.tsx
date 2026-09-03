import type { JSX } from 'react'

import { X } from 'lucide-react'
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog'
import { IconButton } from '@/components/ui/icon-button'
import { CategoryForm } from '@/modules/categories/components/category-form'

interface NewCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewCategoryDialog({ open, onOpenChange }: NewCategoryDialogProps): JSX.Element {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="gap-6 rounded-xl p-6 sm:max-w-md">
        <div className="flex items-start gap-4">
          <div className="grid flex-1 gap-0.5">
            <h2 className="text-base font-semibold text-gray-800">Nova categoria</h2>
            <p className="text-sm text-gray-600">Organize suas transações com categorias</p>
          </div>
          <DialogClose asChild>
            <IconButton
              variant="outline"
              size="icon"
              className="border-gray-300"
              icon={<X />}
              aria-label="Fechar"
            />
          </DialogClose>
        </div>
        <CategoryForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}
