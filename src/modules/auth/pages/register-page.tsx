import type { JSX } from 'react'

import { LogIn } from 'lucide-react'
import { Link as RouterLink } from 'react-router-dom'
import logo from '@/assets/logo.svg'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RegisterForm } from '@/modules/auth/components/register-form'

export function RegisterPage(): JSX.Element {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 p-6">
      <img src={logo} alt="Financy" className="h-8 w-auto self-center" />
      <Card className="border border-gray-200 ring-0 [--card-spacing:--spacing(8)]">
        <CardHeader className="text-center">
          <CardTitle className="text-xl leading-7 font-bold">Criar conta</CardTitle>
          <p className="text-base font-normal text-gray-600">
            Comece a controlar suas finanças ainda hoje
          </p>
        </CardHeader>
        <CardContent className="grid gap-6">
          <RegisterForm />
          <div className="flex items-center gap-3">
            <hr className="flex-1 border-gray-300" />
            <span className="text-muted-foreground text-sm">ou</span>
            <hr className="flex-1 border-gray-300" />
          </div>
          <div className="grid gap-4">
            <p className="text-center text-sm text-gray-600">Já tem uma conta?</p>
            <Button asChild variant="outline" size="xl" className="border-gray-300 text-gray-700">
              <RouterLink to="/login">
                <LogIn />
                Fazer login
              </RouterLink>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
