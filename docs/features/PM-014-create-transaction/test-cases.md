# create-transaction - PM-014 - Test Cases

Generated mechanically from `plan.md`'s `## Test Cases` — same `### Phase N:` grouping as `tasks.md`.

## Phase 1: Foundation

- [ ] T-001: `PageHeader` renders `title` as an `h1`, `subtitle` as body text, and `actionLabel` on the action button
- [ ] T-002: `PageHeader` calls `onAction` when the action button is clicked
- [ ] T-003: `DialogHeaderWithClose` renders `title`/`subtitle` and its close button triggers `DialogClose`
- [ ] T-004: `CurrencyInput` formats "1","5","0" keystrokes into displayed "R$ 1,50" and calls `onChange(1.5)`
- [ ] T-005: `CurrencyInput` removes the last digit on Backspace and re-formats
- [ ] T-006: `CurrencyInput` ignores non-digit, non-Backspace keys
- [ ] T-007: `DatePickerField` shows the "Selecione" placeholder when `value` is `undefined`
- [ ] T-008: `DatePickerField` calls `onChange` with the selected date and closes the popover
- [ ] T-009: `useCreateTransaction` resolves with the created transaction and toggles `isLoading` on success
- [ ] T-010: `useCreateTransaction` maps `extensions.validationErrors` straight to `fieldErrors` when present
- [ ] T-011: `useCreateTransaction` sets `formError` to the fallback message on a network/unexpected error
- [ ] T-012: `useCategoriesForSelect` resolves with `{ id, title }[]` from `listCategories`
- [ ] T-013: `useCategoriesForSelect` sets the fallback error message on a network error

## Phase 2: Features

- [ ] T-014: `TransactionForm` shows "A descrição é obrigatória" when `description` is submitted empty
- [ ] T-015: `TransactionForm` shows "Selecione uma data" when `date` is submitted unset
- [ ] T-016: `TransactionForm` shows "O valor deve ser maior que zero" when `value` is `0`
- [ ] T-017: `TransactionForm` shows "Selecione uma categoria" when `categoryId` is submitted empty
- [ ] T-018: `TransactionForm`'s type toggle defaults to "Despesa" (`EXPENSE`) selected
- [ ] T-019: `TransactionForm`'s type toggle switches `type` to `'INCOME'` when "Receita" is clicked
- [ ] T-020: `TransactionForm` calls `onSubmit` with parsed `TransactionFormValues` when all fields are valid
- [ ] T-021: `NewTransactionDialog` converts `value` (reais) to cents and `date` to an ISO string before calling `createTransaction`
- [ ] T-022: `NewTransactionDialog` shows a success toast and closes on a successful submit
- [ ] T-023: `NewTransactionDialog` keeps the dialog open and shows the field error when the server returns a validation error
- [ ] T-024: `TransactionsPage` renders `PageHeader` with title "Transações" and subtitle "Gerencie todas as suas transações financeiras"
- [ ] T-025: `TransactionsPage` opens `NewTransactionDialog` when "Nova transação" is clicked
- [ ] T-026: `TransactionTypeIndicator` renders "Receita" for `type="income"` and "Despesa" for `type="expense"`
