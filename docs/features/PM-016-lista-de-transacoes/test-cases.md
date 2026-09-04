# Lista de Transações - PM-016 - Test Cases

### Phase 1: Foundation

- [ ] T-001: `useListTransactions` passes `{ first: 10, after: undefined }` on initial mount
- [ ] T-002: `useListTransactions` returns `isLoading: true` before the query resolves, `transactions: []` (mirrors `useListCategories`'s "before resolve" test)
- [ ] T-003: `useListTransactions` sets the fallback error message on a network error, `transactions` stays `[]`
- [ ] T-004: `useListTransactions.goToPage(2)` after page 1 resolves with `hasNextPage: true` re-queries with `after: <page 1's endCursor>`
- [ ] T-005: `useListTransactions.goToPage(n)` is a no-op when page `n`'s cursor isn't yet known (`n > maxVisitedPage + 1`)
- [ ] T-006: `useListTransactions.totalPages` computes `Math.ceil(totalRecord / 10)` from the mocked response
- [ ] T-007: `Pagination` renders with a custom `className` merged alongside its default classes, unchanged when `className` is omitted

### Phase 2: Features

- [ ] T-008: `TransactionCategoryCell` renders the mapped icon + tinted background for a known category color/icon
- [ ] T-009: `TransactionCategoryCell` falls back to a generic icon when `category` is `null`
- [ ] T-010: `formatTransactionValue` formats `8850`/`EXPENSE` as `"- R$ 88,50"` and `34025`/`INCOME` as `"+ R$ 340,25"`
- [ ] T-011: `formatTransactionDate` formats an ISO date as `"30/11/25"` (2-digit year)
- [ ] T-012: `TransactionsTable` shows the loading message while `isLoading`
- [ ] T-013: `TransactionsTable` shows the error message when `error` is set
- [ ] T-014: `TransactionsTable` shows the empty-state message when `transactions` is `[]` and not loading/error
- [ ] T-015: `TransactionsTable` renders one row per transaction with description/date/category/type/value, and two inert action buttons (clicking them calls no mutation — assert no `updateTransaction`/`deleteTransaction` mock is triggered)
- [ ] T-016: `TransactionsTable` calls `onPageChange` when a page button is clicked
- [ ] T-017: `TransactionsPage` renders `TransactionsTable` below `PageHeader` and passes through `useListTransactions`'s values
