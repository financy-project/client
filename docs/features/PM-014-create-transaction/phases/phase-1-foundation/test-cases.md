# Phase 1: Foundation - Test Cases

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
