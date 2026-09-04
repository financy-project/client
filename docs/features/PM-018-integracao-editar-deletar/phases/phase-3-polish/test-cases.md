### Phase 3: Polish

- [ ] T-008: `TransactionForm` pre-fills all fields from `defaultValues` when provided
- [ ] T-009: `EditTransactionDialog` renders nothing when `transaction` is `null`
- [ ] T-010: `EditTransactionDialog` pre-fills the form from the given `transaction`
- [ ] T-011: `EditTransactionDialog` calls `updateTransaction(transaction.id, input)` with the mapped fields on submit
- [ ] T-012: `EditTransactionDialog` toasts success and calls `onOpenChange(false)` after a successful update
- [ ] T-013: `EditTransactionDialog` shows `fieldErrors`/`formError` and stays open on a failed update
- [ ] T-014: `DeleteTransactionAlert` shows the transaction's description in the confirmation copy
- [ ] T-015: `DeleteTransactionAlert` does not call `deleteTransaction` when "Não" is clicked
- [ ] T-016: `DeleteTransactionAlert` calls `deleteTransaction(transaction.id)`, toasts and closes on "Sim" success
- [ ] T-017: `DeleteTransactionAlert` stays open and renders the error when the delete fails
- [x] T-018: `TransactionsPage` opens `EditTransactionDialog` for the clicked row's transaction
- [x] T-019: `TransactionsPage` opens `DeleteTransactionAlert` for the clicked row's transaction
