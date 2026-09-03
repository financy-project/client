import type { JSX } from 'react'

import { Link as RouterLink } from 'react-router-dom'
import logo from '@/assets/logo.svg'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RegisterForm } from '@/modules/auth/components/register-form'

export function RegisterPage(): JSX.Element {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 p-6">
      <img src={logo} alt="Financy" className="h-8 w-auto self-center" />
      <Card>
        <CardHeader>
          <CardTitle>Criar conta</CardTitle>
          <p className="text-muted-foreground text-sm">
            Preencha os dados abaixo para criar sua conta.
          </p>
        </CardHeader>
        <CardContent className="grid gap-4">
          <RegisterForm />
          <hr className="border-border" />
          <Button asChild variant="outline">
            <RouterLink to="/login">Fazer login</RouterLink>
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
