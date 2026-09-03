### Phase 2: API Layer

- [ ] T-002: `useRegisterUser` resolves with `{ id, email, name }` on success and toggles `isLoading`
- [ ] T-003: `useRegisterUser` maps `extensions.validationErrors` straight to `fieldErrors` when present
- [ ] T-004: `useRegisterUser` sets `formError` to the server's message verbatim when there's no `extensions.validationErrors` (e.g. duplicate email)
- [ ] T-005: `useRegisterUser` sets `formError` to a fallback message on a network/unexpected error
