# tela-de-cadastro - PM-006 - Test Cases

### Phase 1: Foundation

- [x] T-001: `App` redirects `/` to `/cadastro`

### Phase 2: API Layer

- [ ] T-002: `useRegisterUser` resolves with `{ id, email, name }` on success and toggles `isLoading`
- [ ] T-003: `useRegisterUser` maps `extensions.validationErrors` straight to `fieldErrors` when present
- [ ] T-004: `useRegisterUser` sets `formError` to the server's message verbatim when there's no `extensions.validationErrors` (e.g. duplicate email)
- [ ] T-005: `useRegisterUser` sets `formError` to a fallback message on a network/unexpected error

### Phase 3: Register Screen

- [ ] T-006: `RegisterForm` shows the name-required message on empty submit
- [ ] T-007: `RegisterForm` shows the invalid-email message
- [ ] T-008: `RegisterForm` shows the password min-length message
- [ ] T-009: `RegisterForm` shows the password uppercase/number messages
- [ ] T-010: `RegisterForm` toggles password visibility via the show/hide `IconButton`
- [ ] T-011: `RegisterForm` disables submit and shows "Criando conta…" while loading
- [ ] T-012: `RegisterForm` renders a hook `fieldErrors` entry under the matching field
- [ ] T-013: `RegisterForm` renders the hook `formError` in the `role="alert"` banner
- [ ] T-014: `RegisterForm` navigates to `/login` on success

### Phase 4: Integration & Verification

- [ ] T-015: `App` renders `RegisterPage` at `/cadastro`, `LoginPage` at `/login`, and `PreviewPage` at `/preview`
