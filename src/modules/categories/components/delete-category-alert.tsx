import type { JSX, MouseEvent } from 'react'

import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import type { Category } from '@/modules/categories/graphql/queries'
import { useDeleteCategory } from '@/modules/categories/hooks/use-delete-category'

interface DeleteCategoryAlertProps {
  category: Category
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeleteCategoryAlert({
  category,
  open,
  onOpenChange,
}: DeleteCategoryAlertProps): JSX.Element {
  const { deleteCategory, isLoading, error } = useDeleteCategory()

  const handleDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const result = await deleteCategory(category.id)
    if (result) {
      toast.success('Categoria excluída com sucesso!')
      onOpenChange(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir categoria?</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir a categoria "{category.title}"? Esta ação não pode ser
            desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {error && (
          <p role="alert" className="text-destructive text-sm">
            {error}
          </p>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction variant="destructive" disabled={isLoading} onClick={handleDelete}>
            {isLoading ? 'Excluindo…' : 'Excluir'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
