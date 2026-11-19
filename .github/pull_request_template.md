## What changed
<!-- Briefly describe the actual code/document changes. -->

## Requirement reference
<!-- Working SRS screen ID (SCR-xxx), requirement ID, or GitHub issue. -->
Closes #

## Verification
- [ ] Only necessary changes; no duplicate or dead code
- [ ] UI behavior matches the specified screen contract (if applicable)
- [ ] Tests run and results recorded (or explain why not applicable)
- [ ] Tenant isolation and accounting posting invariants checked (if applicable)
- [ ] No secrets, credentials or production data committed

## Branch policy
- Feature/fix PRs target `development`.
- `main` receives reviewed release PRs from `development` only.
- Never merge a failing or unreviewed PR into `main`.
