# Phase 2: Features - Test Cases

- [ ] T-003: `DashboardCategoriesCard` renders a `Tag` with the category title, the `"{n} itens"` text, and the absolute-value formatted amount for each entry in `categories`
- [ ] T-004: `DashboardCategoriesCard` renders `"Carregando categorias…"` when `isLoading` is `true`
- [ ] T-005: `DashboardCategoriesCard` renders `role="alert"` with the `error` text when `error` is set
- [ ] T-006: `DashboardCategoriesCard` renders `"Nenhuma categoria com movimentação neste mês."` when `categories` is `[]`, `isLoading` is `false`, and `error` is `null`
- [ ] T-007: `DashboardCategoriesCard` renders a "Gerenciar" link pointing to `/categorias`
- [ ] T-008: `DashboardHighlights` forwards `categories`/`isLoading`/`error` to `DashboardCategoriesCard` without affecting `RecentTransactionsCard`
