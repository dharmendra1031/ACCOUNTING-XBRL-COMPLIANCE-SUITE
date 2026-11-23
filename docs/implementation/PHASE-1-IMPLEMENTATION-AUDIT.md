# KEIFAC — Phase-1 implementation audit and execution contract

Date: 19 November 2026. Branch: development. Status: ENGINEERING AUDIT; not Finance, Product, Security, DBA or Compliance sign-off.
Authority: user-owned working v1.2 SRS (Appendices A–K), derived DEV-00–13 and Round-2 contracts. The boss-owned original SRS and main branch are unchanged.

## 1. Verified baseline (not feature completion)

- Working SRS catalogs 38 screens (SCR-001–038), 28 accounting and 30 XBRL reports, and TC-001–102. Catalogue presence does not mean usable or tested.
- Repository previously had only an ASP.NET Core 10 /health endpoint, one isolated HTML preview for COA/journal/invoice, draft API/ERD/UI contracts and pre-code consistency checks.
- No implemented sign-in, tenant authorization, SQL migrations, company activation, chart of accounts, journal posting, invoices, reporting, XBRL, or live regulator access.
- Existing CI validates backend compilation and documentation structure only; it is not a working accounting acceptance suite.
- Existing PRE-CODE-GAP-REGISTER tracks GAP-01–24. OPEN means decision/evidence outstanding; not automatically resolved by this audit or code.

## 2. High-priority findings, by dependency

| Priority | Finding | Required closure before customer-facing capability |
| --- | --- | --- |
| P0 | D-01/GAP-04 UX route/stack and approved interactive states incomplete | Product + UX/Engineering approve reference screens, routes, accessibility and component ownership |
| P0 | GAP-07 and DEC-009 identity, scoped authorization, maker-checker incomplete | Choose OIDC/local IdP; sign action/company/branch/threshold rules; negative access tests |
| P0 | D-10/GAP-02/13 tenant/company/branch/period SQL ownership open | Finance/DBA sign ERD, composite scope constraints, migration, close/post race tests |
| P0 | DEC-004/005/006 ledger, stock, tax, FX and reversal examples open | Finance signs event trigger, Dr/Cr, exact currency/rounding, retry and cancellation fixtures |
| P0 | D-11 numeric PK versus gapless business serial decision open | Approve technical BIGINT ID gap semantics and separate transactional business serial scope |
| P0 | GAP-14 APIs are proposed, not implemented | Versioned routes, request/response/error schemas and concurrency contract accepted |
| P0 | GAP-21 tests are descriptions, not executable acceptance evidence | Implement exact tenant/finance/API/UI fixtures and run them against code |
| P1 | GAP-01 master/workflow ownership incomplete | Assign customer/supplier, quote/order/delivery, PO/GRN, expense/asset/budget to approved workspaces |
| P1 | 58 report titles lack signed numeric formulas and snapshots | Finance report-by-report formula, cutoff, drilldown and reconciliation approval |
| P1 | CMA/iFSAH taxonomy, form applicability and channel authority unverified | Compliance signs official versioned rule packs and controlled filing workflow |
| P1 | Performance, deployment, backup, retention, recovery and RTL measurements absent | Real benchmark, restore and browser accessibility evidence |

## 3. Architectural decisions for the development preview

- No new microservices, general event bus, redundant state stores, duplicate posting engines or speculative POS checkout.
- Single ASP.NET Core modular API; SQL Server remains proposed data store, with no financial migrations before D-10 and D-11.
- Selected free client direction from user: React + TypeScript + Vite + Tailwind; add shadcn/ui source components, TanStack Table and form libraries only as approved screens need them. Do not bulk-install UI libraries.
- Initial code is a read-only preview shell, NOT a completed SCR-002/004/005 screen. It has no authentication, no company scope, no API calls and no financial writes.
- K-07 record ID must be the first readonly field on actual entity create/edit/view forms. Before persistence prefer 'Auto-generated on save' over misleading MAX(Id)+1. Actual numeric IDs and serial numbers are separate.
- Do not serialize a SQL BIGINT to an unsafe JavaScript Number without an agreed tested JSON encoding/maximum-safe-value policy.
- A user-facing Arabic toggle must translate content and change direction; browser screen/zoom testing remains pending.

## 4. Phase-1 executable dependency order

| Step | Scope | Done only when |
| --- | --- | --- |
| 0 | Frontend preview foundation and code hygiene | Code in development; frontend build, typecheck, responsive/RTL review evidence |
| 1 | Identity/tenant/company/period approval + foundations | Approved IdP, scoped RBAC and signed SQL model; unauthorized cross-tenant access denied by tests |
| 2 | Company onboarding and Chart of Accounts | Approved typed APIs/migrations, numeric ID, validation, role, CRUD and denial tests |
| 3 | Journal drafts, submit/review, posting and reversal | Approved Finance fixtures; atomic balanced posting, lock/idempotency/concurrency and ledger tests |
| 4 | Customer/supplier masters, sales and purchase document lifecycles | Source-specific recognition, taxes, allocation, invoice serial and matching tests |
| 5 | Cash/bank, AR/AP settlement and bank reconciliation | Subledger tie-outs, unique transaction handling, cutoff and reversal tests |
| 6 | Inventory valuation and financial close controls | Approved costing/backdate/returns/GRNI; stock-GL and close checks |
| 7 | Phase-1 release verification | Zero blocking security/finance defects, approved migration, evidence and restore plan |

Later phases: financial statements and 58 exact reports, generic XBRL, Kuwait CMA adapter, auditor automation, then GCC country extensions. Native POS is not baseline scope without DEC-007.

## 5. Coding guardrails

Use one owning module per behavior, maintain strict separation of UI/API/persistence, keep files focused, use readable naming, no dead code, no fake working buttons or synthetic financial numbers presented as real. Validate input on server, scope all queries by authorized tenant/company/branch, use decimal (not JS floating point) for accounting. No client-side permission check can replace API authorization. No 'working', 'tested' or 'compliant' label without real evidence.

## 6. Immediate proof and blockers

- Frontend preview build check must be wired into CI. A local screenshot is not functional proof.
- Exact npm dependency versions are selected for the bootstrap. A resolved lockfile is still needed for reproducible npm ci before customer-facing frontend changes.
- D-01 requires owner/design approval beyond choosing a technology. Treat new code as a reversible design preview while that ticket is open.
- Identity provider, Finance recognition fixtures, SQL hierarchy and numeric serial design remain unresolved; do not implement financially sensitive persistence as a guess.
- Verify 1366x768, 1440x900, 320/375, 125/200% zoom, English/Arabic RTL, keyboard and focus; record evidence before DESIGN REVIEWED.
- Existing pre-code static tests remain separate from frontend code checks and actual acceptance tests.

References: working SRS 1dSqHsbTAVxkspvMRuhlycEJUCVZgCxvEG1hWBSmvuZA, DEV-02, DEV-04, DEV-06, DEV-11, PRE-CODE-GAP-REGISTER, R2-07 and GitHub issues #4, #7, #8, #9, #10.

## 7. Round-2 code audit and permitted implementation (19 November 2026)

Scope: latest development source reviewed against the user-owned working SRS (especially SCR-004/005, K-07–11, Appendix I/J), DEV-02 and R2-07. This is a code/design review, **not** owner approval or full 38-screen acceptance.

| Finding | Evidence | Disposition |
| --- | --- | --- |
| No resolved npm lockfile | `src/Keifac.Web/package-lock.json` absent; CI uses `npm install` | OPEN P0 for reproducible deployment: generate reviewed lockfile from authorized registry, commit it, then replace install with `npm ci`. Do not fabricate lockfile bytes. |
| No runnable frontend UI regression tests | Frontend job initially only TypeScript check/build | Partially improved: Node built-in bilingual label tests; browser visual/interaction evidence still OPEN. |
| Record-ID presentation duplicated | COA and Journal each separately rendered ID placeholder | Reuse one `RecordIdField` in preview; actual persisted SQL numeric IDs remain unimplemented. |
| COA preview did not expose field layout | Accounts page had only empty-state and ID | Add standalone **unconnected** review form with real reset, explicit unsaved notice, no Save/Post; exact API and field approval remain OPEN. |
| UI shell and RTL | Three routed previews, EN/AR toggle, responsive CSS | Keep existing application shell; 1366x768/320px/200% zoom, keyboard and screen reader evidence NOT EXECUTED. |
| Identity/DB/Finance policy | No IdP, authorization, SQL schema, journal posting or economic-event fixture | Leave real mutations blocked pending D-10, DEC-004/005/006/009, D-11 and named reviewers. |
| 58 reports, XBRL and operations | Specification only | No financial/reporting or regulatory completion claims until report-level formulas and official evidence are approved. |

Build checks, bilingual tests and existing pre-code static contract checks are necessary but not sufficient for signed UX, accounting, security, or database acceptance. No new architectural layer or dependency added by this iteration.

## 8. Subsequent engineering work and CI infrastructure blocker (23 November 2026)

- Audited current source and confirmed all feature modules are still preview-only.
- Added a bilingual keyboard skip link and a local required-fields check for
  the COA preview. Both keep financial commands disabled and require no new packages.
- A one-time lockfile bootstrap attempt was made using the GitHub-hosted runner
  because the working environment could not reach the npm registry.
- On the bootstrap commit, GitHub Actions marked both the lockfile job and all
  backend/frontend/contract jobs failed with **zero executed steps**. Logs were
  unavailable at the time of inspection. Treat this as an external CI-runner
  blocker of **unknown root cause**, not as failed source tests or passing tests.
- No lockfile was generated or committed, and `npm ci` remains unverified.
  The temporary bootstrap workflow is removed; regular CI permissions remain read-only.
- The last previously verified successful CI run was on
  `f15034653d44dea155643bdff2c7562465767bae`.
- Next infrastructure gate: diagnose GitHub Actions runner/account availability;
  then generate and review a real npm lockfile, change regular CI to `npm ci`,
  and execute browser/RTL/mobile acceptance checks.

## 9. Preview validation bug fix and local proof (23 November 2026)

- Previous UI validation checked only account code and English name even though type
  and normal balance were marked required; browser native validation also prevented
  the custom submit handler from showing its intended message on missing fields.
- Added a focused `firstMissingAccountField` helper for the four existing required
  form controls, with `noValidate` to make the review flow deterministic.
- On an incomplete preview, focus moves to the first missing field and the result
  is announced in the form's status region. No data is persisted.
- Four Node built-in tests (missing, whitespace, complete and non-text inputs)
  and isolated TypeScript compilation were executed locally and passed.
  This does **not** constitute a full React build, browser acceptance or security test.
- GitHub Actions remains failed before steps are executed; check runner provisioning,
  account billing/Actions quotas and run-level annotations independently. Do not
  fabricate a passing CI status or npm lockfile.

## 10. Dependency reproducibility proof (23 November 2026)

- GitHub-hosted runners recovered: run `45120802615` (commit `d1bce96`)
  executed all three jobs successfully (API build, frontend tests/build, static
  contract checks). Earlier no-step failures were transient but their exact
  upstream cause was not proven.
- One-time lockfile job `45120879750` resolved pinned dependencies from npm,
  successfully completed clean `npm ci`, frontend tests and production build,
  then committed a real lockfile under `src/Keifac.Web/package-lock.json`.
- Removed the temporary lockfile workflow after generation. Regular frontend CI
  now uses `npm ci` rather than a mutable `npm install`.
- These checks prove dependency reproducibility and compilation on the runner,
  **not** UI browser acceptance or accounting correctness.
