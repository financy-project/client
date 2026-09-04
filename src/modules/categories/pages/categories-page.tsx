import type { JSX } from 'react'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { CategoriesSummary } from '@/modules/categories/components/categories-summary'
import { CategoryCard } from '@/modules/categories/components/category-card'
import { DeleteCategoryAlert } from '@/modules/categories/components/delete-category-alert'
import { EditCategoryDialog } from '@/modules/categories/components/edit-category-dialog'
import { NewCategoryDialog } from '@/modules/categories/components/new-category-dialog'
import type { Category } from '@/modules/categories/graphql/queries'
import { useListCategories } from '@/modules/categories/hooks/use-list-categories'

export function CategoriesPage(): JSX.Element {
  const [newDialogOpen, setNewDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null)
  const { categories, isLoading, error } = useListCategories()

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1280px] p-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Categorias</h1>
            <p className="text-base text-gray-600">Organize suas transações por categorias</p>
          </div>
          <Button size="xl" className="gap-2 px-3" onClick={() => setNewDialogOpen(true)}>
            <Plus className="size-4" />
            Nova categoria
          </Button>
        </div>
        {isLoading && <p className="mt-6 text-gray-600">Carregando categorias…</p>}
        {error && (
          <p role="alert" className="text-destructive mt-6 text-sm">
            {error}
          </p>
        )}
        {!isLoading && !error && (
          <div className="mt-6">
            <CategoriesSummary categories={categories} />
          </div>
        )}
        {!isLoading && !error && categories.length === 0 && (
          <p className="mt-6 text-gray-600">Nenhuma categoria cadastrada ainda.</p>
        )}
        {!isLoading && !error && categories.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onEdit={setEditingCategory}
                onDelete={setDeletingCategory}
              />
            ))}
          </div>
        )}
      </main>
      <NewCategoryDialog open={newDialogOpen} onOpenChange={setNewDialogOpen} />
      {editingCategory && (
        <EditCategoryDialog
          category={editingCategory}
          open={!!editingCategory}
          onOpenChange={(open) => !open && setEditingCategory(null)}
        />
      )}
      {deletingCategory && (
        <DeleteCategoryAlert
          category={deletingCategory}
          open={!!deletingCategory}
          onOpenChange={(open) => !open && setDeletingCategory(null)}
        />
      )}
    </>
  )
}
