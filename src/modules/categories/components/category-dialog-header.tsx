import type { JSX } from 'react'

import { X } from 'lucide-react'
import { DialogClose } from '@/components/ui/dialog'
import { IconButton } from '@/components/ui/icon-button'

interface CategoryDialogHeaderProps {
  title: string
  subtitle: string
}

export function CategoryDialogHeader({ title, subtitle }: CategoryDialogHeaderProps): JSX.Element {
  return (
    <div className="flex items-start gap-4">
      <div className="grid flex-1 gap-0.5">
        <h2 className="text-base font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
      <DialogClose asChild>
        <IconButton
          variant="outline"
          size="icon"
          className="border-gray-300"
          icon={<X />}
          aria-label="Fechar"
        />
      </DialogClose>
    </div>
  )
}
