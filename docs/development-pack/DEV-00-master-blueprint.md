# KEIFAC DEV-00 — Master Development Blueprint & Documentation Index

## Purpose and version

The authoritative developer handover pack for Keifac Accounting & XBRL Compliance Suite, Kuwait-first and GCC-ready; updated 19 November 2026.

**Owner:** user account (dharmendra1031) GitHub repository; all changes to documents and application code happen on `development`. `main` is the stable release branch. **Boss-owned original SRS must never be edited.**

**Source baseline:** [User-owned reviewed working SRS](https://docs.google.com/document/d/1dSqHsbTAVxkspvMRuhlycEJUCVZgCxvEG1hWBSmvuZA/edit), all Sections 1–24 and Appendices A–I. A document listing an API or screen does NOT mean it is implemented. No regulatory approval/certification is inferred.

**Document count:** 14 canonical DEV-00–DEV-13 specification documents plus 1 consolidated [Pre-Code Gap Register / Readiness Matrix](PRE-CODE-GAP-REGISTER.md). The register is a cross-reference and issue tracker, not a fifteenth competing design specification. No duplicated source-of-truth contracts. These documents reference the same working SRS but do not replace it.

## Development documentation index

| ID | Development document | Responsible function | Status |
|---|---|---|---|
| DEV-00 | [Master Development Blueprint, scope and index](https://github.com/dharmendra1031/ACCOUNTING-XBRL-COMPLIANCE-SUITE/blob/development/docs/development-pack/DEV-00-master-blueprint.md) | All teams / source of truth | Specified / Approval Required |
| DEV-01 | [Functional Modules and End-to-End Business Workflows](https://github.com/dharmendra1031/ACCOUNTING-XBRL-COMPLIANCE-SUITE/blob/development/docs/development-pack/DEV-01-functional-modules-workflows.md) | Product + Finance | Specified / Approval Required |
| DEV-02 | [Compact UI/UX Design System and All 38 Screen Contracts](https://github.com/dharmendra1031/ACCOUNTING-XBRL-COMPLIANCE-SUITE/blob/development/docs/development-pack/DEV-02-ui-ux-screen-contracts.md) | UX + Frontend | Specified / Approval Required |
| DEV-03 | [Accounting Posting Matrix and Financial Controls](https://github.com/dharmendra1031/ACCOUNTING-XBRL-COMPLIANCE-SUITE/blob/development/docs/development-pack/DEV-03-accounting-posting-controls.md) | Finance + Backend | Specified / Approval Required |
| DEV-04 | [SQL Server Data Model, ERD and Migration Design](https://github.com/dharmendra1031/ACCOUNTING-XBRL-COMPLIANCE-SUITE/blob/development/docs/development-pack/DEV-04-database-erd-sql.md) | Database + Backend | Specified / Approval Required |
| DEV-05 | [ASP.NET Core API, Endpoints and Error Contracts](https://github.com/dharmendra1031/ACCOUNTING-XBRL-COMPLIANCE-SUITE/blob/development/docs/development-pack/DEV-05-api-contracts.md) | Backend | Specified / Approval Required |
| DEV-06 | [Security, RBAC, Tenant Isolation and Audit](https://github.com/dharmendra1031/ACCOUNTING-XBRL-COMPLIANCE-SUITE/blob/development/docs/development-pack/DEV-06-security-rbac-audit.md) | Security + Backend | Specified / Approval Required |
| DEV-07 | [POS/ERP/Payroll/Bank Imports, APIs and Recovery](https://github.com/dharmendra1031/ACCOUNTING-XBRL-COMPLIANCE-SUITE/blob/development/docs/development-pack/DEV-07-integrations-recovery.md) | Integrations | Specified / Approval Required |
| DEV-08 | [All 58 Accounting & XBRL Reports](https://github.com/dharmendra1031/ACCOUNTING-XBRL-COMPLIANCE-SUITE/blob/development/docs/development-pack/DEV-08-58-report-contracts.md) | Reporting + Finance | Specified / Approval Required |
| DEV-09 | [XBRL, Kuwait CMA iFSAH and Filing Workflow](https://github.com/dharmendra1031/ACCOUNTING-XBRL-COMPLIANCE-SUITE/blob/development/docs/development-pack/DEV-09-xbrl-regulator.md) | Compliance + XBRL | Specified / Approval Required |
| DEV-10 | [Scalable, Maintainable, Fast Large-Data Architecture](https://github.com/dharmendra1031/ACCOUNTING-XBRL-COMPLIANCE-SUITE/blob/development/docs/development-pack/DEV-10-scalability-large-data.md) | Architecture + DBA + SRE | Specified / Approval Required |
| DEV-11 | [102 Test Cases, QA and UAT Test Strategy](https://github.com/dharmendra1031/ACCOUNTING-XBRL-COMPLIANCE-SUITE/blob/development/docs/development-pack/DEV-11-qa-102-tests.md) | QA + Functional Owners | Specified / Approval Required |
| DEV-12 | [CI/CD, Deployments, Backups and Operations](https://github.com/dharmendra1031/ACCOUNTING-XBRL-COMPLIANCE-SUITE/blob/development/docs/development-pack/DEV-12-devops-operations.md) | DevOps + Security | Specified / Approval Required |
| DEV-13 | [Phases, Requirements Traceability, Decisions and Release Gates](https://github.com/dharmendra1031/ACCOUNTING-XBRL-COMPLIANCE-SUITE/blob/development/docs/development-pack/DEV-13-roadmap-gates.md) | PM + Tech Lead | Specified / Approval Required |

## Pre-code design freeze control

Use [PRE-CODE-GAP-REGISTER.md](PRE-CODE-GAP-REGISTER.md) for the 8-layer pre-code audit, 38 screen→API/data/role/test traceability rows, 58 report rows and 24 OPEN gaps. A `PROPOSED` mapping is not an approved OpenAPI/ERD/UX/Finance rule. This document is the single gap register: do not create separate duplicate tracking spreadsheets or ticket descriptions for the same gap without cross-links. Round 1 source inventory is reviewed; Round 2 physical designs and sign-offs, Round 3 adversarial/performance proof, and Round 4 feature-specific design freeze remain pending.

## Verified existing code status

- GitHub repository: https://github.com/dharmendra1031/ACCOUNTING-XBRL-COMPLIANCE-SUITE
- On `development`, currently only minimal ASP.NET Core .NET 10 API with a `/health` route, GitHub Actions build workflow, PR template, `.gitignore` and documentation exist; no accounting database, GL, UI, reports, authentication, integrations or regulator submission system has been implemented.
- Basic API build completed successfully in observed GitHub Actions run; this is NOT a test of business functions, resilience or large-data scalability.
- `main` branch protection is not currently enforced; branch administration needs repository-owner/plan action. Publishing a private source repo publicly is never a workaround unless the owner expressly authorizes it.

## Canonical scope counts and dependencies

- 38 baseline product screen/workspace IDs (SCR-001–038); edition and phase exposure is conditional. Detailed exact field/action contracts and UI design sign-off remain OPEN.
- 28 accounting reports ACC-001–028 + 30 XBRL/regulatory reports XBRL-001–030 = 58 report IDs. Individual formulas, permissions, reconciliations and expected output fixtures remain OPEN.
- 102 specified acceptance cases TC-001–102. All are described in DEV-11; no executable test evidence is asserted.
- 10 formal decision records DEC-001–010 and finance/engineering D-01–10. Pending decisions block dependent capabilities, not unrelated bootstrap.
- Phase 1: identity/organization, immutable ledger, AR/AP, operations, inventory basics and minimal close/approval/audit security; Phase 2: statement reporting; Phase 3: generic XBRL; Phase 4: Kuwait CMA adapter on official evidence; Phase 5: advanced auditor automation; Phase 6: independently approved GCC adapters.

## Engineering quality policy

1. One authoritatively approved source for posting policy, business status and permission. Do not copy the same rules between React, controller, SQL trigger and jobs.
2. Modular ASP.NET Core API and SQL Server OLTP first, with minimal abstractions; no speculative microservices, cross-company duplicate datasets, sharding or caching until measured benefit. SQL transactions preserve balanced double-entry, original immutable journal lines, company isolation, stable source-event idempotency and approvals.
3. Compact enterprise forms, two columns where sensible, no gratuitous scrolling, one scroll owner, desktop 1366×768 and zoom/RTL/mobile acceptance, reusable tables/forms/actions and no dead/duplicate code.
4. Large data: benchmark 10M/100M journal row fixtures with real read/write contention, p95/p99, Query Store, bounded cursor pagination, async report/export and safe cache invalidation; performance numbers are goals only until measured.
5. Security: role/action/amount scope for every API/export, secret-safe logging, secure MFA, scoped audit, immutable financial/file package history and restore drills. Never infer filing acceptance from a receipt or XML well-formedness.
6. No direct regulator API/portal claims until authorized current form/taxonomy/interface specifications and official compliance sign-off.

## Required deliverable format for every feature issue

SRS ID → edition / phase → Product/Finance decision and effective version → screen/flow → UI states and validation → API contract → DB migration/query and authorization → posting event (or Not Applicable) → test fixture and expected ledger/report output → performance, UX and security checks → GitHub PR/build evidence → acceptance owner/signoff/release status.

Use statuses: **Specified → Business Approved → Implemented → Tested → Released**. Where blocked, use **OPEN / Approval Required** instead of falsely labeling completed. No arbitrary framework, financial, currency or regulator decision may be silently selected by a developer.

## Core GitHub work and references

- [Existing phase-one readiness guide](https://github.com/dharmendra1031/ACCOUNTING-XBRL-COMPLIANCE-SUITE/blob/development/docs/phase-1-readiness.md)
- [Compact UI design baseline](https://github.com/dharmendra1031/ACCOUNTING-XBRL-COMPLIANCE-SUITE/blob/development/docs/ui-ux-compact-layout.md)
- [Large-data performance baseline](https://github.com/dharmendra1031/ACCOUNTING-XBRL-COMPLIANCE-SUITE/blob/development/docs/architecture-performance.md)
- [GitHub Project Board](https://github.com/users/dharmendra1031/projects/1)
- [Implementation and decision issues](https://github.com/dharmendra1031/ACCOUNTING-XBRL-COMPLIANCE-SUITE/issues)

## Open sign-off register

D-01 frontend and reuse; D-10 organizational/COA/period ownership; DEC-001 edition/customer segment; DEC-002–003 official CMA applicability and form taxonomy; DEC-004 finance recognition; DEC-005 stock costing; DEC-006 FX/precision; DEC-007 native POS/consolidation; DEC-008 hosting/privacy/retention/RPO/RTO; DEC-009 maker-checker thresholds; DEC-010 58 reports/statement mappings; test load/architecture budget and schema migration plan. These require named approving parties and evidence before the corresponding production release.

## Cross-document review corrections — 2026-11-19

This cross-document pass read DEV-00–DEV-13 against the complete user-owned working SRS (Appendix J added). **Source-of-truth order:** signed scope-specific Product/Finance/Compliance/Security decisions and regulator-approved rule packs; current working SRS; this derived technical pack; executable code/tests only for implementation evidence. Where drafts conflict, record a signed change with affected SRS clauses, docs, fixtures, owner and GitHub issue. Newer draft text alone does not override approved finance/regulator policy.

| Release risk | Canonical document | Must be signed/evidenced | Current status |
| --- | --- | --- | --- |
| Missing screen ownership (customer/supplier master, orders, expenses, assets, budgets, tenant admin) | DEV-01 + DEV-02 | User journey→workspace/action/permission/test for each | OPEN, do not claim all features have finished UI |
| Route shorthand / duplicate write endpoints | DEV-05 | Explicit method+full route+DTO+status+authorization per use case | OPEN, design examples only |
| Event identity, finance posting, currency/valuation | DEV-03 + DEV-04 | Approved Finance fixture + unique event constraint, reconciliation | OPEN DEC-004/005/006 |
| Cross-tenant records, role/action/amount scope and export | DEV-04 + DEV-06 | Same-tenant FK tests, permission negative tests, revocation | OPEN DEC-009 |
| External source event/async job recovery | DEV-07 + DEV-12 | Crash/retry proof, durable task record, no double posting | OPEN for implementation |
| 58 report formulas and as-of reconciliation | DEV-08 | One approved formula/fixture/expected output per report | OPEN DEC-010 |
| Regulatory applicability, taxonomy and exact package approval | DEV-09 | Official effective rule pack + authorized portal evidence | OPEN DEC-002/003 |
| 10M/100M performance, p95 and UI scrolling | DEV-02 + DEV-10 | Production-like fixture, approved budget, measured browser/API/SQL | OPEN, unmeasured |
| 102 test cases | DEV-11 | Executable tests with expected assertions, commit and pass evidence | SPECIFIED, none proven run |
| CI, production deployment and backup restore | DEV-12 | Release pipeline and signed security/ops gates | PARTIAL CI; production OPEN |
| Phases / decision gating | DEV-13 | Business owner approval record and prerequisite dependencies | OPEN DEC-001–010 |

**Verification note:** 14 Markdown files are present on `development` with no accounting UI/database/ledger implementation. The 38 screens, 58 reports, 102 tests and development specification are **documented scope counts, not completion percentages**. Keep one master source; avoid cloning these contracts into duplicate competing docs.
