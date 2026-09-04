# Phase 2: Features - Test Cases

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
