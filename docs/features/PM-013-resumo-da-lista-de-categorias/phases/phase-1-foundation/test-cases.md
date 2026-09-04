# resumo da lista de categorias - PM-013 - Phase 1: Foundation - Test Cases

- [ ] T-001: `CategoriesSummary` renders `categories.length` as card 1's value, labeled "Total de categorias"
- [ ] T-002: `CategoriesSummary` renders the sum of every category's `transactionsQuantity` as card 2's value, labeled "Total de transações"
- [ ] T-003: `CategoriesSummary` renders card 3 with the title and icon of the category with the highest `transactionsQuantity`, labeled "Categoria mais utilizada"
- [ ] T-004: `CategoriesSummary` omits card 3 entirely when `categories` is `[]`
- [ ] T-005: `CategoriesSummary` omits card 3 entirely when every category has `transactionsQuantity === 0`
- [ ] T-006: `CategoriesSummary` renders card 1's icon as `Tag` with `text-gray-700`, and card 2's icon as `ArrowUpDown` with `text-purple-base`
- [ ] T-007: `CategoriesSummary` tints card 3's icon with the most-used category's own color (e.g. a `color: "#2563EB"` category renders `text-blue-base`), falling back to `TagIcon`/`text-blue-base` when `icon`/`color` don't match any `ICON_OPTIONS`/`COLOR_OPTIONS` entry
