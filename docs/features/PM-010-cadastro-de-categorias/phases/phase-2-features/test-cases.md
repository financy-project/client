# cadastro-de-categorias - PM-010 - Test Cases

### Phase 2: Features

- [ ] T-010: `CategoryForm` shows "O título é obrigatório" for an empty title on submit
- [ ] T-011: `CategoryForm` disables submit and shows "Salvando…" while `isLoading`
- [ ] T-012: `CategoryForm` renders a mocked `fieldErrors` entry under "Título"
- [ ] T-013: `CategoryForm` renders the mocked `formError` in the `role="alert"` banner verbatim
- [ ] T-014: `CategoryForm` calls `createCategory` with the pre-selected icon (`BriefcaseBusiness`) and color (`#16A34A`) when submitted without changing them
- [ ] T-015: `CategoryForm` calls `createCategory` with a newly selected icon/color after the user picks different ones
- [ ] T-016: `CategoryForm` calls `onSuccess` after a successful submit
- [ ] T-017: `CategoriesPage` renders the page header (title, subtitle, "Nova categoria" button) and the app `Header`'s nav
- [ ] T-018: `CategoriesPage` opens the dialog (modal title "Nova categoria" visible) when "Nova categoria" is clicked
- [ ] T-019: `CategoriesPage` closes the dialog after a successful category creation
