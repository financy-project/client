# Phase 3: Polish

- [ ] T-014: `RecentTransactionsCard` shows skeleton rows while `useGetDashboard().isLoading` is `true`
- [ ] T-015: `RecentTransactionsCard` shows the `role="alert"` error text when `useGetDashboard().error` is set
- [ ] T-016: `RecentTransactionsCard` shows `"Nenhuma transação cadastrada ainda."` when `recentTransactions` is `[]` and not loading
- [ ] T-017: `RecentTransactionsCard`'s "Ver todas" is a link to `/transactions`
- [ ] T-018: Clicking "+ Nova transação" opens `NewTransactionDialog`
- [ ] T-019: Submitting the dialog successfully calls `createTransaction` with the form values and closes the dialog
- [ ] T-020: `DashboardPage` still renders both `DashboardSummary` and `RecentTransactionsCard` correctly under the shared `useGetDashboard` mock
