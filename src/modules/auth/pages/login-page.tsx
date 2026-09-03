import type { JSX } from 'react'

import { Link as RouterLink } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function LoginPage(): JSX.Element {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Login em breve</CardTitle>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline">
            <RouterLink to="/cadastro">Voltar ao cadastro</RouterLink>
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
