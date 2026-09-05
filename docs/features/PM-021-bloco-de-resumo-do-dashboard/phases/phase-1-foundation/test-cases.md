# Phase 1: Foundation - Test Cases

- [ ] T-001: `useGetDashboard` passes no variables (query takes none) and returns `movement` from `data.dashboard.movement`
- [ ] T-002: `useGetDashboard` returns `movement: null` and `isLoading: true` before the query resolves
- [ ] T-003: `useGetDashboard` returns the fallback error message and `movement: null` on a network error
- [ ] T-004: `formatCurrencyValue(0)` → `"R$ 0,00"`
- [ ] T-005: `formatCurrencyValue(1284732)` → `"R$ 12.847,32"`
- [ ] T-006: `formatCurrencyValue` output has no `U+00A0` characters (regular space only, same guard as `formatTransactionValue`)
