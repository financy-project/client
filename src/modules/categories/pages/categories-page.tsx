import type { JSX } from 'react'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { NewCategoryDialog } from '@/modules/categories/components/new-category-dialog'

export function CategoriesPage(): JSX.Element {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1280px] p-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Categorias</h1>
            <p className="text-base text-gray-600">Organize suas transações por categorias</p>
          </div>
          <Button size="xl" className="gap-2 px-3" onClick={() => setOpen(true)}>
            <Plus className="size-4" />
            Nova categoria
          </Button>
        </div>
        <p className="mt-6 text-gray-600">Lista de categorias em breve</p>
      </main>
      <NewCategoryDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
