---
name: feature-plan
id: feature-plan
version: 1.0.0
type: planning
---

# Skill: Plan Feature

Write the implementation plan for a feature by clarifying requirements with grill-me.

## Usage

```bash
/feature-plan
```

## What it does

1. Auto-detects current feature from git branch (e.g. `PM-001/transaction-filters`)
2. Reads `spec.md` for feature context
3. **Invokes `/grill-me`** (covers all 13 general planning areas plus the GraphQL-client-specific additions folded into Implementation Details and User Experience) to surface edge cases and clarify requirements
4. Writes `plan.md` based on spec + grill-me answers
   - **Must follow the DoR:** `docs/architecture/dor.md` requires explicit blueprints for:
     - **Component Blueprint** — component name, file path, props type, responsibilities, child components used (or "Omitted" + justification)
     - **GraphQL/API Blueprint** — query/mutation name, the `gql` document (or REST call via React Query), the wrapping hook, cache update/invalidation strategy, loading & error handling (or "Omitted" + justification)
     - **Form & Validation Blueprint** — Zod schema (exact field list + rules) and React Hook Form wiring (or "Omitted" + justification if the feature has no form)
     - **State Blueprint** — any state beyond component-local (context, extra React Query keys) (or "Omitted" + justification if none)
   - **Implementation Phases section** breaks the Blueprints down into `F-NNN`-ready bullets — each one carrying an exact file path, exact symbol/signature or field list, and exact test cases, per `docs/architecture/dor.md`'s granularity rule. `/feature-task` copies these bullets verbatim into `tasks.md` with zero elaboration, so anything left vague here stays vague for whoever implements it.
   - **Test Cases section** — sibling to Implementation Phases, same `### Phase N:` grouping (identical phase names), one checkbox per test case traceable to a Component/Form/API blueprint already written above.
5. If this repository has a matching GitHub issue for the feature (see `/feature-new`), comments the full content of `plan.md` on it
6. Prompts user to run `/feature-task` to break down into tasks

## Requirements

- Must be on a feature branch: `PM-NNN/slug`
- `spec.md` must exist with feature description
- `gh` CLI installed and authenticated (optional — plan.md is still written locally if GitHub is unavailable; only the issue comment step is skipped)

## Output

- `plan.md` — architecture and design decisions
- A comment on the matching GitHub issue with the implementation plan, if one exists and `gh` is available
- User prompted to run `/feature-task` next

## Execution Instructions for AI Assistant

1. Detect the feature ID (e.g., `PM-001`) from the current git branch name.
2. Follow the `/grill-me` workflow and write `plan.md`.
   - **Before writing:** Read `docs/architecture/dor.md` to understand the DoR requirements
   - **While writing:** Ensure the plan includes all four Blueprint sections (Component, GraphQL/API, Form & Validation, State), each either fully specified or marked `**Omitted:**` with justification. Props types and Zod schema field lists must be actual TypeScript/Zod code blocks, not prose.
   - **While writing the Implementation Phases section:** every bullet must be traceable to a Blueprint above and carry its exact file path, exact symbol/signature or field list, and exact test cases inline.
   - **While writing the Test Cases section:** use the exact same `### Phase N: <name>` headings as Implementation Phases.
   - **After writing:** Verify every blueprint has the required sub-fields per the DoR, verify every Implementation Phases bullet meets the granularity bar, and verify the Test Cases section's phase headings match Implementation Phases exactly.
3. If `gh` is authenticated, locate the corresponding issue in the dedicated tracking repo (`financy-project/features`) by searching for the feature ID:
   ```bash
   ISSUE_NUMBER=$(gh issue list -R financy-project/features --search "$FEATURE_ID" --state all --json number --jq '.[0].number')
   ```
4. If found, post the content of `plan.md` as a comment on that issue:
   ```bash
   gh issue comment "$ISSUE_NUMBER" -R financy-project/features --body-file "docs/features/$FEATURE_DIR/plan.md"
   ```
5. Confirm to the user that the plan has been saved, and whether the GitHub comment step ran or was skipped.

## Example

```bash
git checkout PM-001/transaction-filters
/feature-plan

# Reads: docs/features/PM-001-transaction-filters/spec.md
# Invokes: /grill-me (user answers questions)
# Writes: docs/features/PM-001-transaction-filters/plan.md
# Comments on the matching GitHub issue, if one exists
# Says: "Run /feature-task to generate task files"
```

## See Also

- `/feature-new` — create a new feature
- `/feature-task` — generate task files from plan
