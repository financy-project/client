import type { JSX } from 'react'

import { toast } from 'sonner'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { CategoryDialogHeader } from '@/modules/categories/components/category-dialog-header'
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
        <CategoryDialogHeader title="Editar categoria" subtitle="Atualize os dados da categoria" />
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
