import type { JSX } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { IconButton } from '@/components/ui/icon-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRegisterUser } from '@/modules/auth/hooks/use-register-user'

const registerFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'O nome é obrigatório')
    .max(255, 'O nome deve ter no máximo 255 caracteres'),
  email: z.email('Informe um e-mail válido'),
  password: z
    .string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .regex(/[A-Z]/, 'A senha deve conter ao menos uma letra maiúscula')
    .regex(/[0-9]/, 'A senha deve conter ao menos um número'),
})

type RegisterFormValues = z.infer<typeof registerFormSchema>

export function RegisterForm(): JSX.Element {
  const navigate = useNavigate()
  const { registerUser, isLoading, fieldErrors, formError } = useRegisterUser()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
  })

  useEffect(() => {
    for (const fieldError of fieldErrors) {
      setError(fieldError.path as keyof RegisterFormValues, { message: fieldError.message })
    }
  }, [fieldErrors, setError])

  useEffect(() => {
    if (formError) {
      toast.error(formError)
    }
  }, [formError])

  const onSubmit = async (values: RegisterFormValues) => {
    const result = await registerUser(values)
    if (result) {
      toast.success('Conta criada com sucesso! Faça login para continuar.')
      navigate('/login')
    }
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid gap-1.5">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" {...register('name')} />
        {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" type="email" {...register('email')} />
        {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="password">Senha</Label>
        <div className="relative">
          <Input
            id="password"
            type={isPasswordVisible ? 'text' : 'password'}
            {...register('password')}
          />
          <IconButton
            type="button"
            variant="ghost"
            size="icon-sm"
            className="absolute inset-y-0 right-1 my-auto"
            icon={isPasswordVisible ? <EyeOff /> : <Eye />}
            aria-label={isPasswordVisible ? 'Ocultar senha' : 'Mostrar senha'}
            onClick={() => setIsPasswordVisible((visible) => !visible)}
          />
        </div>
        {errors.password && (
          <p className="text-destructive text-sm">{errors.password.message}</p>
        )}
      </div>
      {formError && (
        <p role="alert" className="text-destructive text-sm">
          {formError}
        </p>
      )}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Criando conta…' : 'Cadastrar'}
      </Button>
    </form>
  )
}
