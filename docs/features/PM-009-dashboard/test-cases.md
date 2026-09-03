# dashboard - PM-009 - Test Cases

### Phase 1: Foundation

- [ ] T-001: `getInitials` returns the uppercased first+last initials for a two-word name
- [ ] T-002: `getInitials` returns one uppercased initial for a single-word name
- [ ] T-003: `getInitials` returns `""` for an empty/whitespace-only name
- [ ] T-004: `Header` renders the Financy logo
- [ ] T-005: `Header` renders all three nav labels: "Dashboard", "Transações", "Categorias"
- [ ] T-006: `Header` renders an empty avatar when `useAuthStore`'s `user` is `null`

### Phase 2: Integration

- [ ] T-007: `Header` highlights "Dashboard" as active and the other two items as inactive when mounted at `/dashboard`
- [ ] T-008: `Header` highlights "Transações" as active when mounted at `/transacoes`
- [ ] T-009: `Header` highlights "Categorias" as active when mounted at `/categorias`
- [ ] T-010: Clicking a `Header` nav item navigates to its corresponding route
- [ ] T-011: `Header` renders `getInitials(user.name)` in the avatar when `useAuthStore` has a seeded user
- [ ] T-012: `LoginForm` calls `navigate('/dashboard')` (not `/`) on a successful submit
- [ ] T-013: `LoginForm` populates `useAuthStore`'s `user` with the mutation's result on a successful submit
- [ ] T-014: `/dashboard`, `/transacoes`, `/categorias` each render `Header` (smoke test in `App.test.tsx`)
