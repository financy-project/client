# cadastro-de-categorias - PM-010 - Test Cases

### Phase 1: Foundation

- [ ] T-001: `useCreateCategory` resolves with `{ id, title, description, icon, color }` and `isLoading` toggles `true` → `false` around the mutation call
- [ ] T-002: `useCreateCategory` maps `extensions.validationErrors` straight to `fieldErrors` when present
- [ ] T-003: `useCreateCategory` sets `formError` to the fallback message on a network/unexpected error
- [ ] T-004: `IconPicker` renders all 16 icon options
- [ ] T-005: `IconPicker` calls `onChange` with an option's name when clicked
- [ ] T-006: `IconPicker` marks the option matching `value` with `aria-pressed="true"` and the rest `"false"`
- [ ] T-007: `ColorPicker` renders all 7 color options
- [ ] T-008: `ColorPicker` calls `onChange` with an option's hex value when clicked
- [ ] T-009: `ColorPicker` marks the option matching `value` with `aria-pressed="true"` and the rest `"false"`
