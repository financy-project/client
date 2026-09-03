import type { JSX } from 'react'

import { Header } from '@/components/header'

export function CategoriesPage(): JSX.Element {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1280px] p-12">
        <p className="text-gray-600">Categorias em breve</p>
      </main>
    </>
  )
}
