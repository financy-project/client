import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { IconButton } from "@/components/ui/icon-button"
import { cn } from "@/lib/utils"

type PaginationProps = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  disabled?: boolean
  className?: string
}

function Pagination({ page, totalPages, onPageChange, disabled = false, className }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav
      data-slot="pagination"
      className={cn("flex items-center gap-1", className)}
      aria-label="Paginação"
    >
      <IconButton
        icon={<ChevronLeft />}
        aria-label="Página anterior"
        disabled={disabled || page === 1}
        onClick={() => onPageChange(page - 1)}
      />
      {pages.map((p) => (
        <Button
          key={p}
          variant={p === page ? "default" : "ghost"}
          size="icon"
          disabled={disabled}
          onClick={() => onPageChange(p)}
        >
          {p}
        </Button>
      ))}
      <IconButton
        icon={<ChevronRight />}
        aria-label="Próxima página"
        disabled={disabled || page === totalPages}
        onClick={() => onPageChange(page + 1)}
      />
    </nav>
  )
}

export { Pagination }
export type { PaginationProps }
