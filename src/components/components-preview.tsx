import { useState } from "react"
import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { IconButton } from "@/components/ui/icon-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "@/components/ui/link"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function PreviewSection({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <section className="grid gap-3">
      <h3 className="text-sm font-semibold text-muted-foreground">{title}</h3>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </section>
  )
}

function InputSection() {
  return (
    <PreviewSection title="Input">
      <div className="grid gap-1.5">
        <Label>Vazio</Label>
        <Input placeholder="Placeholder" />
      </div>
      <div className="grid gap-1.5">
        <Label>Preenchido</Label>
        <Input defaultValue="Texto preenchido" readOnly />
      </div>
      <div className="grid gap-1.5">
        <Label>Erro</Label>
        <Input aria-invalid defaultValue="Valor inválido" readOnly />
      </div>
      <div className="grid gap-1.5">
        <Label>Desabilitado</Label>
        <Input disabled placeholder="Desabilitado" />
      </div>
    </PreviewSection>
  )
}

function ButtonSection() {
  return (
    <PreviewSection title="Button">
      <Button size="default">Md / Default</Button>
      <Button size="default" disabled>
        Md / Disabled
      </Button>
      <Button size="sm">Sm / Default</Button>
      <Button size="sm" disabled>
        Sm / Disabled
      </Button>
    </PreviewSection>
  )
}

function SelectSection() {
  const [value, setValue] = useState<string>()

  return (
    <PreviewSection title="Select">
      <div className="grid gap-1.5">
        <Label>Vazio / Aberto ao clicar</Label>
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma opção" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Option 1</SelectItem>
            <SelectItem value="2">Option 2</SelectItem>
            <SelectItem value="3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label>Desabilitado</Label>
        <Select disabled>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma opção" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </PreviewSection>
  )
}

function IconButtonSection() {
  return (
    <PreviewSection title="IconButton">
      <IconButton icon={<Trash2 />} aria-label="Excluir" />
      <IconButton icon={<Trash2 />} aria-label="Excluir" disabled />
    </PreviewSection>
  )
}

function LinkSection() {
  return (
    <PreviewSection title="Link">
      <Link href="#">Default</Link>
      <Link href="https://example.com" target="_blank" rel="noopener noreferrer">
        Abre em nova aba
      </Link>
    </PreviewSection>
  )
}

export function ComponentsPreview() {
  return (
    <div className="grid gap-8 rounded-lg border border-dashed border-border p-6">
      <div>
        <h2 className="text-lg font-semibold">Prévia de Componentes (temporário)</h2>
        <p className="text-sm text-muted-foreground">
          Catálogo visual dos componentes base do Financy, para conferência contra o Figma (Style
          Guide → Componentes). Não faz parte de nenhuma tela real.
        </p>
      </div>

      <InputSection />
      <ButtonSection />
      <SelectSection />
      <IconButtonSection />
      <LinkSection />
      <PreviewSection title="Pagination" />
      <PreviewSection title="Tag" />
      <PreviewSection title="TransactionTypeIndicator" />
    </div>
  )
}
