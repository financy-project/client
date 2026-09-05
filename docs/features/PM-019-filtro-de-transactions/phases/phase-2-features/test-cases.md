# Phase 2: Features - Test Cases

- [ ] T-006: `useDebouncedValue` returns the initial value immediately, holds it until `delayMs` elapses, then commits the latest value; resets on rapid changes
- [ ] T-007: `useSyncCategoriesForSelect` syncs `listCategories` success/loading/error into `useCategoriesStore`
- [ ] T-008: `useListTransactions` maps `type`/`categoryId`/`period` into `type`/`categoryIds`/`month`/`year` variables (omitting unset ones), debounces `description`, and resets pagination to page 1 when any filter changes
- [ ] T-009: `useListTransactions` aborts the previous request's `AbortController` when the filters change before it resolves, and does not surface the resulting `AbortError` as `error`
- [ ] T-010: `TransactionFilters` renders all 4 labeled fields and calls `onChange` with a correctly-updated `TransactionFilterValues` per field
- [ ] T-011: `TransactionsPage` renders the filter bar above the table and re-queries `listTransactions` with the right variables when a filter changes
- [ ] T-012: `TransactionForm` still validates and submits `categoryId` correctly using the shared `CategorySelect` (store-seeded categories, not a mocked query)
