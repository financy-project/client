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

### Phase 2: Features

- [ ] T-009: `CategoryForm` calls `onSubmit` with the form values on a valid submit (no longer asserts a specific mutation)
- [ ] T-010: `CategoryForm` pre-fills title/description and pre-selects icon/color from a passed `defaultValues` prop
- [ ] T-011: `NewCategoryDialog` closes and toasts on a successful `createCategory` call
- [ ] T-012: `EditCategoryDialog` renders "Editar categoria" and pre-fills the form from its `category` prop
- [ ] T-013: `EditCategoryDialog` calls `updateCategory(category.id, values)` on submit and closes + toasts on success
- [ ] T-014: `DeleteCategoryAlert` renders the category's title in its confirmation copy
- [ ] T-015: `DeleteCategoryAlert` calls `deleteCategory(category.id)` only when "Excluir" is confirmed, not on "Cancelar"
- [ ] T-016: `DeleteCategoryAlert` closes and toasts on a successful delete
- [ ] T-017: `CategoryCard` renders title, description, name badge, and "N itens"/"N item" text
- [ ] T-018: `CategoryCard` renders the icon matching `category.icon`, falling back to a generic icon for an unrecognized value
- [ ] T-019: `CategoryCard`'s edit/delete buttons call `onEdit`/`onDelete` with the category
- [ ] T-020: `CategoriesPage` renders a loading message while `useListCategories` is loading
- [ ] T-021: `CategoriesPage` renders an error banner when `useListCategories` errors
- [ ] T-022: `CategoriesPage` renders an empty-state message when there are no categories
- [ ] T-023: `CategoriesPage` renders one `CategoryCard` per category when populated
- [ ] T-024: `CategoriesPage` opens `EditCategoryDialog`/`DeleteCategoryAlert` for the correct category when a card's edit/delete is clicked
