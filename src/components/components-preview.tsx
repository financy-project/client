function PreviewSection({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <section className="grid gap-3">
      <h3 className="text-sm font-semibold text-muted-foreground">{title}</h3>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </section>
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

      <PreviewSection title="Input" />
      <PreviewSection title="Button" />
      <PreviewSection title="Select" />
      <PreviewSection title="IconButton" />
      <PreviewSection title="Link" />
      <PreviewSection title="Pagination" />
      <PreviewSection title="Tag" />
      <PreviewSection title="TransactionTypeIndicator" />
    </div>
  )
}
