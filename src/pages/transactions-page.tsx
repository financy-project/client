import type { JSX } from 'react'

import { Header } from '@/components/header'

export function TransactionsPage(): JSX.Element {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1280px] p-12">
        <p className="text-gray-600">Transações em breve</p>
      </main>
    </>
  )
}
