# Phase 1: Foundation

- [x] T-001: `useGetDashboard` returns `recentTransactions` from `data.dashboard.recentTransactions`
- [x] T-002: `useGetDashboard` returns `recentTransactions: []` before the query resolves
- [ ] T-003: `formatDashboardTransactionDate('2025-11-30T00:00:00.000Z')` → `"30/11/25"` (UTC, not shifted by local timezone)
- [ ] T-004: `formatDashboardTransactionValue(425000, 'INCOME')` → `"+ R$ 4.250,00"`
- [ ] T-005: `formatDashboardTransactionValue(8950, 'EXPENSE')` → `"- R$ 89,50"`
- [ ] T-006: `formatDashboardTransactionValue` output has no `U+00A0` characters
