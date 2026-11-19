# Phase 1 readiness — Keifac Accounting & XBRL Compliance Suite

Status: **Working development checklist. Not a statement of completed functionality.**

Source of truth: [user-owned reviewed SRS](https://docs.google.com/document/d/1dSqHsbTAVxkspvMRuhlycEJUCVZgCxvEG1hWBSmvuZA/edit), especially §14, §20 and working Appendices B–J. The original boss-owned SRS is not edited by this repository.

## Scope and constraints

- Kuwait-first, GCC-ready; regulatory obligations and submission methods are effective only after authorized verification.
- Backend baseline: a **single modular ASP.NET Core Web API** with SQL Server (TECH-01), not speculative microservices.
- Frontend framework is **OPEN** (D-01 / DEC-001); do not build screens until approved reusable UI and routes are selected.
- One authoritative posting engine and one designated system of record for each financial event (GL-02, GLM-00, GLM-15).
- Enforce tenant/company/branch/period/action scopes on every relevant API and query (ORG-01, AUTH-01).
- Posted journals are immutable; reversal is linked and separately authorized (GL-01).
- Money uses decimal (KWD three decimal monetary rounding); FX/internal precision needs approved policy (CONS-09, C-08).
- Native POS checkout, consolidation, and regulator direct API integration are **not presumed in scope** (CONS-03/04, DEC-007).
- No financial posting or regulatory filing code may be enabled before its business rule/sign-off.

## Build progress (not feature progress)

- Initial API bootstrap consists only of `src/Keifac.Api` with a basic `/health` probe.
- It has **no authentication, tenant data access, database, ledger, UI, XBRL or regulator connection**.
- Basic CI build is an infrastructure check only, not a passing business acceptance test.
- Implementation statuses are `Specified → Approved → Implemented → Tested → Released` per Appendix C; no feature is marked Implemented until its executable logic exists and is reviewed.

## Phase 1 work order

| Gate | SRS coverage | Required evidence |
| --- | --- | --- |
| 1. Approve policy and UX foundations | D-01, D-10, DEC-001, DEC-004/005/006/009, GATE-01 | Signed frontend reuse/route decision, company hierarchy, ERD, event-to-journal rules, permission and amount matrix |
| 2. Security and organizational backbone | SCR-001, 003, 021, 022, 023; ORG-01, AUTH-01/02 | Tenant isolation, role+scope authorization, maker-checker, activation conditions, TC-020/029/030 |
| 3. Ledger foundation | SCR-004, 005, 024; GL-01/02/03/04 | COA and journals with atomic balanced posting, idempotency, locking/reversal, TC-001/002/003/021/022/028 |
| 4. Operational finance | SCR-006/007/008, 025–028, 031 | Invoice, receipts, supplier bills/payments, bank reconciliation, tie-outs, TC-023/024/027 |
| 5. Inventory basics | SCR-029/030, inventory policy | Approved costing/negative-stock/returns and stock→GL tie-out, TC-025/026 |
| 6. Operational control and release gate | SCR-002, 019, 032, 033, 035; GATE-01 | Approvals, audit events, close reconciliation, backup/restore evidence and security regression tests |

These are **work packages**, not assertions that these screens are approved, implemented or tested. Section 20 defines future phases: financial reporting, generic XBRL, Kuwait CMA adapter, expanded auditor workflow, then GCC expansion.

## Hard blockers before implementing sensitive workflows

1. **Frontend/UI:** D-01/DEC-001 — choose framework and verify any reusable screens/components, routes and interaction patterns.
2. **Financial recognition:** DEC-004/D-05, D-03, D-04 — owner-approved journal mapping, valuation, currency and rounding; never default to invented policy.
3. **Approvals:** DEC-009/D-06 — actual actions, roles, amounts, separation-of-duties, delegation.
4. **Company hierarchy:** D-10 — company/branch COA, periods and cross-company treatment.
5. **XBRL/regulator:** DEC-002/003/D-07 — actual applicable authority, official taxonomy and permitted submission process.
6. **Production:** DEC-008/D-09 — retention, hosting, backups, measured RPO/RTO and recovery.

## Developer acceptance checklist

For each implementation issue, attach SRS requirement + SCR ID + actual API/database migration (if any) + action permission + tests. Require only applicable loading/empty/error/permission-denied/RTL states per approved screen (login has no SaveDraft), optimistic version handling for mutation, idempotency on financial events, and server-side data scope. Do not add duplicate modules, speculative menus, dead code or unapproved external integrations. Feature PRs target `development`; `main` is a reviewed release target only.

## Verification environment

.NET SDK 10 is used for the initial API *bootstrap* because it is an actively supported LTS baseline as of November 2026. Exact production SDK/SQL Server versions and hosting image require Engineering/Ops approval before release. SQL Server connection is deliberately absent until tenancy/ERD decisions are approved.

## Canonical cross-document clarification

This short checklist is a **companion** to [DEV-00 master blueprint](development-pack/DEV-00-master-blueprint.md) and [DEV-13 phase/decision gates](development-pack/DEV-13-roadmap-gates.md), not a competing source. The full 38-screen applicability matrix is in DEV-02; source-event uniqueness in DEV-03/04; actual explicit candidate API route resolution in DEV-05. A minimum close/period-lock workflow is Phase 1, even though an advanced close wizard is Phase 2. Decisions remain OPEN until independently approved and tests executed.
