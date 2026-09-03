# lista de categorias - PM-011 - Test Cases

### Phase 1: Foundation

- [ ] T-001: `useListCategories` resolves with the mocked category list
- [ ] T-002: `useListCategories`'s `categories` is `[]` before the query resolves
- [ ] T-003: `useListCategories` sets the fallback error message on a network error
- [ ] T-004: `useUpdateCategory` resolves with the updated category and `isLoading` toggles `true` → `false` around the mutation call
- [ ] T-005: `useUpdateCategory` maps `extensions.validationErrors` straight to `fieldErrors` when present
- [ ] T-006: `useUpdateCategory` sets `formError` to the fallback message on a network/unexpected error
- [ ] T-007: `useDeleteCategory` resolves `true` and `isLoading` toggles `true` → `false` around the mutation call
- [ ] T-008: `useDeleteCategory` sets the fallback error message on a network/unexpected error
