import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { IconButton } from "@/components/ui/icon-button"

type PaginationProps = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  disabled?: boolean
}

function Pagination({ page, totalPages, onPageChange, disabled = false }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav data-slot="pagination" className="flex items-center gap-1" aria-label="Paginação">
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
