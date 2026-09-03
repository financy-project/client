import type { JSX } from 'react'

import { cn } from '@/lib/utils'

const COLOR_OPTIONS = [
  { name: 'green', value: '#16A34A', className: 'bg-green-base' },
  { name: 'blue', value: '#2563EB', className: 'bg-blue-base' },
  { name: 'purple', value: '#9333EA', className: 'bg-purple-base' },
  { name: 'pink', value: '#DB2777', className: 'bg-pink-base' },
  { name: 'red', value: '#DC2626', className: 'bg-red-base' },
  { name: 'orange', value: '#EA580C', className: 'bg-orange-base' },
  { name: 'yellow', value: '#CA8A04', className: 'bg-yellow-base' },
] as const

interface ColorPickerProps {
  value: string
  onChange: (value: string) => void
}

export function ColorPicker({ value, onChange }: ColorPickerProps): JSX.Element {
  return (
    <div className="flex gap-2">
      {COLOR_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-label={option.name}
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            'flex flex-1 items-center justify-center rounded-[8px] border p-[5px]',
            value === option.value ? 'border-primary bg-gray-100' : 'border-gray-300',
          )}
        >
          <span className={cn('h-5 w-full rounded-[4px]', option.className)} />
        </button>
      ))}
    </div>
  )
}

export { COLOR_OPTIONS }
