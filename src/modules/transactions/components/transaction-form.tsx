import type { JSX } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { CircleArrowDown, CircleArrowUp } from 'lucide-react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TextInput } from '@/components/ui/text-input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import type { RegisterFieldError } from '@/modules/auth/hooks/use-register-user'
import { CurrencyInput } from '@/modules/transactions/components/currency-input'
import { DatePickerField } from '@/modules/transactions/components/date-picker-field'
import { useCategoriesForSelect } from '@/modules/transactions/hooks/use-categories-for-select'

const transactionFormSchema = z.object({
  type: z.enum(['EXPENSE', 'INCOME']),
  description: z.string().min(1, 'A descrição é obrigatória'),
  date: z.date({ error: 'Selecione uma data' }),
  value: z.number().positive('O valor deve ser maior que zero'),
  categoryId: z.string().min(1, 'Selecione uma categoria'),
})

export type TransactionFormValues = z.infer<typeof transactionFormSchema>

// Radix Select disallows an empty-string item value, so a sentinel stands
// in for "clear the selection back to its initial (unselected) value".
const RESET_VALUE = '__reset__'

const TYPE_OPTIONS = [
  { value: 'EXPENSE' as const, label: 'Despesa', icon: CircleArrowDown, selectedClass: 'border-destructive text-destructive' },
  { value: 'INCOME' as const, label: 'Receita', icon: CircleArrowUp, selectedClass: 'border-success text-success' },
]

interface TransactionFormProps {
  isLoading: boolean
  fieldErrors: RegisterFieldError[]
  formError: string | null
  onSubmit: (values: TransactionFormValues) => void | Promise<void>
}

export function TransactionForm({
  isLoading,
  fieldErrors,
  formError,
  onSubmit,
}: TransactionFormProps): JSX.Element {
  const { categories, isLoading: categoriesLoading } = useCategoriesForSelect()

  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      type: 'EXPENSE',
      description: '',
      date: undefined,
      value: 0,
      categoryId: '',
    },
  })

  useEffect(() => {
    for (const fieldError of fieldErrors) {
      setError(fieldError.path as keyof TransactionFormValues, { message: fieldError.message })
    }
  }, [fieldErrors, setError])

  return (
    <form className="grid gap-4" onSubmit={handleSubmit((values) => onSubmit(values))} noValidate>
      <Controller
        control={control}
        name="type"
        render={({ field }) => (
          <div className="grid grid-cols-2 gap-3">
            {TYPE_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={field.value === option.value}
                onClick={() => field.onChange(option.value)}
                className={cn(
                  'flex items-center justify-center gap-2 rounded-lg border p-3 text-sm font-medium',
                  field.value === option.value ? option.selectedClass : 'border-gray-300 text-gray-600',
                )}
              >
                <option.icon className="size-4" />
                {option.label}
              </button>
            ))}
          </div>
        )}
      />

      <TextInput
        id="description"
        label="Descrição"
        placeholder="Ex. Almoço no restaurante"
        errorMessage={errors.description?.message}
        {...register('description')}
      />

      <div className="grid grid-cols-2 gap-4">
        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <DatePickerField
              id="date"
              label="Data"
              value={field.value}
              onChange={field.onChange}
              errorMessage={errors.date?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="value"
          render={({ field }) => (
            <CurrencyInput
              id="value"
              label="Valor"
              value={field.value}
              onChange={field.onChange}
              errorMessage={errors.value?.message}
            />
          )}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="categoryId" className="text-gray-700">
          Categoria
        </Label>
        <Controller
          control={control}
          name="categoryId"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(next) => field.onChange(next === RESET_VALUE ? '' : next)}
              disabled={categoriesLoading}
            >
              <SelectTrigger
                id="categoryId"
                className="h-12 w-full px-4 text-base"
                aria-invalid={!!errors.categoryId}
              >
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {field.value && (
                  <SelectItem value={RESET_VALUE} className="text-gray-500">
                    Voltar ao valor inicial
                  </SelectItem>
                )}
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.categoryId && (
          <p className="text-destructive text-sm">{errors.categoryId.message}</p>
        )}
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
