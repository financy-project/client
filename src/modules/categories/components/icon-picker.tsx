import type { JSX } from 'react'

import {
  BaggageClaim,
  BookOpen,
  BriefcaseBusiness,
  CarFront,
  Dumbbell,
  Gift,
  HeartPulse,
  House,
  Mailbox,
  PawPrint,
  PiggyBank,
  ReceiptText,
  ShoppingCart,
  Ticket,
  ToolCase,
  Utensils,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const ICON_OPTIONS = [
  { name: 'BriefcaseBusiness', icon: BriefcaseBusiness },
  { name: 'CarFront', icon: CarFront },
  { name: 'HeartPulse', icon: HeartPulse },
  { name: 'PiggyBank', icon: PiggyBank },
  { name: 'ShoppingCart', icon: ShoppingCart },
  { name: 'Ticket', icon: Ticket },
  { name: 'ToolCase', icon: ToolCase },
  { name: 'Utensils', icon: Utensils },
  { name: 'PawPrint', icon: PawPrint },
  { name: 'House', icon: House },
  { name: 'Gift', icon: Gift },
  { name: 'Dumbbell', icon: Dumbbell },
  { name: 'BookOpen', icon: BookOpen },
  { name: 'BaggageClaim', icon: BaggageClaim },
  { name: 'Mailbox', icon: Mailbox },
  { name: 'ReceiptText', icon: ReceiptText },
] as const

interface IconPickerProps {
  value: string
  onChange: (value: string) => void
}

export function IconPicker({ value, onChange }: IconPickerProps): JSX.Element {
  return (
    <div className="flex flex-wrap gap-2">
      {ICON_OPTIONS.map(({ name, icon: Icon }) => (
        <button
          key={name}
          type="button"
          aria-label={name}
          aria-pressed={value === name}
          onClick={() => onChange(name)}
          className={cn(
            'flex size-[42px] cursor-pointer items-center justify-center rounded-[8px] border',
            value === name
              ? 'border-primary bg-gray-100 text-primary'
              : 'border-gray-300 text-gray-800',
          )}
        >
          <Icon className="size-5" />
        </button>
      ))}
    </div>
  )
}

export { ICON_OPTIONS }
