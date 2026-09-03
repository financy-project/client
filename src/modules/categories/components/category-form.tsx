import type { JSX } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { TextInput } from '@/components/ui/text-input'
import { COLOR_OPTIONS, ColorPicker } from '@/modules/categories/components/color-picker'
import { ICON_OPTIONS, IconPicker } from '@/modules/categories/components/icon-picker'
import { useCreateCategory } from '@/modules/categories/hooks/use-create-category'

const categoryFormSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório'),
  description: z.string().optional(),
  icon: z.string().min(1, 'Selecione um ícone'),
  color: z.string().min(1, 'Selecione uma cor'),
})

type CategoryFormValues = z.infer<typeof categoryFormSchema>

interface CategoryFormProps {
  onSuccess: () => void
}

export function CategoryForm({ onSuccess }: CategoryFormProps): JSX.Element {
  const { createCategory, isLoading, fieldErrors, formError } = useCreateCategory()

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      title: '',
      description: '',
      icon: ICON_OPTIONS[0].name,
      color: COLOR_OPTIONS[0].value,
    },
  })

  useEffect(() => {
    for (const fieldError of fieldErrors) {
      setError(fieldError.path as keyof CategoryFormValues, { message: fieldError.message })
    }
  }, [fieldErrors, setError])

  const onSubmit = async (values: CategoryFormValues) => {
    const result = await createCategory({
      title: values.title,
      description: values.description,
      icon: values.icon,
      color: values.color,
    })
    if (result) {
      toast.success('Categoria criada com sucesso!')
      onSuccess()
    }
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextInput
        id="title"
        label="Título"
        placeholder="Ex. Alimentação"
        errorMessage={errors.title?.message}
        {...register('title')}
      />
      <div className="grid gap-2">
        <TextInput
          id="description"
          label="Descrição"
          placeholder="Descrição da categoria"
          errorMessage={errors.description?.message}
          {...register('description')}
        />
        <p className="text-xs text-gray-500">Opcional</p>
      </div>
      <div className="grid gap-2">
        <span className="text-sm font-medium text-gray-700">Ícone</span>
        <Controller
          control={control}
          name="icon"
          render={({ field }) => <IconPicker value={field.value} onChange={field.onChange} />}
        />
      </div>
      <div className="grid gap-2">
        <span className="text-sm font-medium text-gray-700">Cor</span>
        <Controller
          control={control}
          name="color"
          render={({ field }) => <ColorPicker value={field.value} onChange={field.onChange} />}
        />
      </div>
      {formError && (
        <p role="alert" className="text-destructive text-sm">
          {formError}
        </p>
      )}
      <Button type="submit" size="xl" className="w-full" disabled={isLoading}>
        {isLoading ? 'Salvando…' : 'Salvar'}
      </Button>
    </form>
  )
}
