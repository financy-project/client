import type { JSX } from 'react'

import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export interface SelectFieldOption {
  value: string
  label: string
}

interface SelectFieldProps {
  id: string
  label: string
  value: string
  onValueChange: (value: string) => void
  options: SelectFieldOption[]
  placeholder?: string
  errorMessage?: string
  disabled?: boolean
  // Shows an extra option (labeled with `placeholder`) that resets the
  // field back to '' — for fields where the user should be able to undo
  // a selection, not just replace it with another option.
  resettable?: boolean
}

// Radix disallows an empty-string SelectItem value, so a sentinel stands in
// for "reset back to the placeholder/unselected state".
const RESET_VALUE = '__reset__'

export function SelectField({
  id,
  label,
  value,
  onValueChange,
  options,
  placeholder = 'Selecione',
  errorMessage,
  disabled,
  resettable = false,
}: SelectFieldProps): JSX.Element {
  return (
    <div className="grid gap-2" data-slot="select-field">
      <Label htmlFor={id} className="text-gray-700">
        {label}
      </Label>
      <Select
        value={value}
        onValueChange={(next) => onValueChange(next === RESET_VALUE ? '' : next)}
        disabled={disabled}
      >
        <SelectTrigger
          id={id}
          // The Select primitive's own default is
          // data-[size=default]:h-8 (32px) — a plain h-12 doesn't outrank
          // it in the compiled stylesheet, so it must be overridden with
          // the same data-[size=default]: variant to actually win.
          className="data-[size=default]:h-12 w-full px-3 py-3.5 text-base"
          aria-invalid={!!errorMessage}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {resettable && value && (
            <SelectItem value={RESET_VALUE} className="text-gray-500">
              {placeholder}
            </SelectItem>
          )}
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errorMessage && <p className="text-destructive text-sm">{errorMessage}</p>}
    </div>
  )
}
