# PM-005 Test Cases


## Phase 1: Alinhar componentes existentes e preparar a prévia

- [x] T-001: `Input` renderiza corretamente com `aria-invalid` (estado de erro) — cobertura já implícita nos testes existentes/manuais; nenhum teste novo obrigatório nesta fase além da confirmação visual.
- [x] T-002: `Button` renderiza corretamente nos tamanhos `default`/`sm` com `disabled` — mesma observação acima.
- [x] T-003: `ComponentsPreview` renderiza sem erros com todas as seções (mesmo vazias) presentes.

## Phase 2: Select, IconButton, Link

- [ ] T-004: `Select` renderiza o placeholder quando nenhum valor está selecionado
- [ ] T-005: `Select` abre a lista de opções ao clicar no trigger
- [ ] T-006: `Select` reflete a opção escolhida no trigger após seleção
- [ ] T-007: `Select` não abre a lista quando `disabled`
- [ ] T-008: `IconButton` renderiza o ícone recebido via prop `icon`
- [ ] T-009: `IconButton` aplica o `aria-label` recebido no elemento renderizado
- [ ] T-010: `IconButton` fica desabilitado quando `disabled` é passado
- [ ] T-011: `Link` renderiza um elemento `<a>` com o `href` recebido
- [ ] T-012: `Link` aplica as classes de `buttonVariants({ variant: "link" })`
- [ ] T-013: `Link` repassa `target`/`rel` quando fornecidos

## Phase 3: Pagination, Tag, TransactionTypeIndicator

- [ ] T-014: `Pagination` renderiza um botão para cada página de 1 a `totalPages`
- [ ] T-015: `Pagination` chama `onPageChange` com o número correto ao clicar em uma página
- [ ] T-016: `Pagination` desabilita o botão "anterior" quando `page === 1`
- [ ] T-017: `Pagination` desabilita o botão "próximo" quando `page === totalPages`
- [ ] T-018: `Pagination` desabilita todos os controles quando `disabled` é `true`
- [ ] T-019: `Pagination` marca a página atual com `variant="default"` e as demais com `variant="ghost"`
- [ ] T-020: `Tag` renderiza o texto filho passado
- [ ] T-021: `Tag` aplica as classes de background/texto corretas para cada uma das 7 cores
- [ ] T-022: `Tag` aplica o tamanho correto (`sm`/`md`) e usa `color="blue"`/`size="md"` como default
- [ ] T-023: `TransactionTypeIndicator` renderiza "Entrada" com ícone `CircleArrowUp` e classe `text-success` para `type="income"`
- [ ] T-024: `TransactionTypeIndicator` renderiza "Saída" com ícone `CircleArrowDown` e classe `text-destructive` para `type="expense"`

## Phase 4: Integração da prévia e verificação final

- [ ] T-025: `pnpm build`, `pnpm lint` e `pnpm test` passam sem erros após a integração em `App.tsx`
- [ ] T-026: Revisão visual manual confirma que todos os 8 componentes/estados batem com o Figma (Style Guide → Componentes)
