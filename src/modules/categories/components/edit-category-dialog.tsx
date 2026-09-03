import type { JSX } from 'react'

import { X } from 'lucide-react'
import { toast } from 'sonner'
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog'
import { IconButton } from '@/components/ui/icon-button'
import type { CategoryFormValues } from '@/modules/categories/components/category-form'
import { CategoryForm } from '@/modules/categories/components/category-form'
import type { Category } from '@/modules/categories/graphql/queries'
import { useUpdateCategory } from '@/modules/categories/hooks/use-update-category'

interface EditCategoryDialogProps {
  category: Category
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditCategoryDialog({
  category,
  open,
  onOpenChange,
}: EditCategoryDialogProps): JSX.Element {
  const { updateCategory, isLoading, fieldErrors, formError } = useUpdateCategory()

  const handleSubmit = async (values: CategoryFormValues) => {
    const result = await updateCategory(category.id, values)
    if (result) {
      toast.success('Categoria atualizada com sucesso!')
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="gap-6 rounded-xl p-6 sm:max-w-md">
        <div className="flex items-start gap-4">
          <div className="grid flex-1 gap-0.5">
            <h2 className="text-base font-semibold text-gray-800">Editar categoria</h2>
            <p className="text-sm text-gray-600">Atualize os dados da categoria</p>
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
        <CategoryForm
          defaultValues={{
            title: category.title,
            description: category.description ?? '',
            icon: category.icon,
            color: category.color,
          }}
          isLoading={isLoading}
          fieldErrors={fieldErrors}
          formError={formError}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  )
}
