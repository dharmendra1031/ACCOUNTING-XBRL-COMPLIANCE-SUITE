# DEV-13 — Implementation roadmap, decision register and traceability gates

Keifac Accounting & XBRL Compliance Suite | Engineering documentation, 19 November 2026
Status: SPECIFIED / OPEN for owner sign-off unless explicitly noted. None of these specifications is proof of implementation or tests.
Source: https://docs.google.com/document/d/1dSqHsbTAVxkspvMRuhlycEJUCVZgCxvEG1hWBSmvuZA/edit
Git branch: development. Original boss-owned SRS is unchanged.

## Roadmap phases from SRS
20. Implementation Phases and Deliverables
Phase
Development scope
Exit deliverable
Phase 1 – Accounting Foundation
Company, COA, GL, AR, AP, sales, purchase, cash/bank, expenses, inventory basics.
Working accounting system and core ledgers.
Phase 2 – Financial Reporting
Trial balance, P&L, balance sheet, cash flow, changes in equity, notes and closing.
Approved financial statement workflow and report catalogue.
Phase 3 – XBRL Core
Taxonomy import, mapping, contexts, units, facts, XBRL generation and validation.
Generic XBRL engine with test taxonomy package.
Phase 4 – Kuwait CMA Adapter
iFSAH-specific forms, filing calendar, rule pack, exports and portal-assisted workflow.
Kuwait CMA compliance pack validated against current official specifications.
Phase 5 – Auditor Workspace & Automation
Expand auditor workspace, evidence packs, advanced approvals, filing archive and alerts. Baseline authorization, audit events, posting controls and maker-checker are Phase 1 prerequisites.
Auditor collaboration, advanced automation and filing evidence workflow; foundational controls must already pass Phase 1 acceptance.
Phase 6 – GCC Expansion
Separate jurisdiction packs and adapters for selected GCC markets.
Country-specific release after regulatory verification.

## Owners and pending decisions
D.4 Decisions that must be signed off before relevant feature release
DEC-001 First release business segment and editions — Owner: Product Owner — Status OPEN — blocks edition pricing/feature entitlements.
DEC-002 Kuwait CMA eligible legal entity types and official filing forms — Owner: Compliance Lead — Status OPEN — blocks regulatory production claims.
DEC-003 Official taxonomy, portal formats, submission permissions and validation fixtures — Owner: Compliance Lead — Status OPEN — blocks CMA adapter release.
DEC-004 Recognition events and posting matrix for all enabled document types — Owner: Finance/Accounting Lead — Status OPEN — blocks those posting workflows.
DEC-005 Inventory cost policy, returns, backdating and negative-stock exception — Owner: Finance/Inventory Lead — Status OPEN — blocks valued stock go-live.
DEC-006 FX source, precision, gain/loss and override limits — Owner: Finance Lead — Status OPEN — blocks multi-currency posting.
DEC-007 Native POS versus integration-only and consolidation scope — Owner: Product Owner — Status OPEN — blocks only those optional features.
DEC-008 Hosting region, privacy, retention, RPO/RTO and restore evidence — Owner: Security/Operations — Status OPEN — blocks production readiness.
DEC-009 Authorized approver matrix, delegation and break-glass limits — Owner: Product/Compliance — Status OPEN — blocks sensitive approvals.
DEC-010 Report contracts and source-to-statement mappings — Owner: Finance Lead — Status OPEN — blocks financial statement approval and filing-ready reports.
For every DEC item, track decision, rationale, approver, date, affected requirement IDs, test updates and release gate. An OPEN decision must never be represented as implemented or regulator-approved.

## Additional engineering gate and open policy record
B.14 Phase gates and unresolved business decisions
GATE-01: Before screen coding, approve ERD, event-to-journal posting matrix, role/action/amount matrix, signed-off UX flows, company hierarchy and currency policies. Before accounting production, pass double-entry, idempotency, immutability, tenant isolation, maker-checker, backup and reconciliation tests. These controls belong to Phase 1 and cannot be deferred to Phase 5.
GATE-02: Before financial reporting release, approve report contracts, cash-flow/equity mappings, close checklist and statement snapshot policy. Before XBRL release, pass taxonomy fixture validation, fact lineage, frozen package approvals, historical replay and security tests. Before Kuwait iFSAH launch, secure current authorized regulator documents, applicable taxonomy/form instructions and portal submission test evidence; no unsupported certification claims.
OPEN DECISION REGISTER — Status OPEN until written approval; each decision must have owner, policy/reference version, approval date, affected modules and related UAT evidence.
D-01 | Product/Engineering Owner | Confirm UI framework and reuse of existing repository components | Gate: before new screen development.
D-02 | Compliance/Product Owner | Select initial Kuwait customer legal/entity segments and CMA filing form/domain applicability | Gate: before regulatory adapter implementation.
D-03 | Finance Owner | Approve mixed-currency journals, FX rate source/cutoff, revaluation, rounding and gain/loss accounts | Gate: before GL multi-currency release.
D-04 | Finance/Inventory Owner | Choose valuation method, negative stock, backdated cost and stock-return valuation policy | Gate: before inventory accounting release.
D-05 | Finance/Tax Owner | Approve invoice recognition, discount allocation, tax defaults and jurisdiction rule applicability | Gate: before Sales/AP posting release.
D-06 | CFO/Company Admin | Define maker-checker action matrix, approval ceilings, delegation and emergency exceptions | Gate: before privileged posting/approvals release.
D-07 | Compliance/Legal Owner | Obtain authoritative CMA accepted taxonomy, filing forms, rules, authorized channel/API and testing evidence | Gate: before Kuwait filing release.
D-08 | Finance/Reporting Owner | Approve chart-to-statement mappings, cash-flow/equity logic, report formats and comparative policies | Gate: before financial statement release.
D-09 | Product/Security/Ops Owner | Approve p95 data/load fixture, RPO/RTO, recovery drills, hosting region and legal retention | Gate: before production sign-off.
D-10 | Finance/Admin Owner | Confirm company-wide versus branch-specific COA, accounting periods, consolidation and inter-branch transfers | Gate: before company/branch activation.
No OPEN item may be treated as regulator certification, financial-policy approval or completed development.

## Phase-gated screen/test traceability
F.5 Release gates and test traceability
Phase 1: SCR-001–008, 021–031, 033, foundational SCR-019/035 controls, plus a MINIMUM SCR-032 pre-close checklist and period-lock workflow needed for safe GL release. Implement minimum trial-balance and AR/AP/stock reconciliation read models needed to validate accounting, not full statutory reporting. Demonstrate TC-001–005, 016, 019–030, 041, 044, 046, 053, 055 and tenant/permission tests. Phase 2: complete SCR-009, 020, 032, 038 and financial statement/report catalogue functions with TC-005, 027, 031, 045, 052, 057. Mark phased feature depth explicitly in the screen×edition×release matrix. Phase 3: SCR-011–016, 036 with generic XBRL fixtures, TC-006–013, 032, 039, 051. Phase 4: SCR-010, 017, 018, 037 and regulator adapter, TC-014, 015, 033–036, 043, 048, 049, 056. Phase 5: SCR-034 and expanded audit collaboration; foundational audit/security remains Phase 1. Phase 6: separate approved GCC adapters, no copied Kuwait rule assumptions. This is dependency mapping, not proof of implementation. Screen assignments spanning phases indicate baseline vs advanced features and require explicit release tickets.

## Current code implementation status
Initial API bootstrap + /health, CI and repository docs only. There is NO customer-facing accounting UI, database migration, accounting posting engine or XBRL filing process. All requirements from 38-screen catalogue, 58 reports and 102 tests are Specified/OPEN pending approval and implementation. Issue work on development only.

## GitHub issue set
Issues #1–#6: SRS/code audit, branch/CI protection, finance/regulatory decisions, UX contracts, reports/XBRL, permissions/API/posting. Issues #7–#10: frontend reuse, tenant/company/period ERD, action/amount approvals, posting matrix. Issues #11–#17: login, onboarding, GL, AR, AP, bank and inventory implementation packages. See https://github.com/dharmendra1031/ACCOUNTING-XBRL-COMPLIANCE-SUITE/issues. Item numbers are task records, NOT completed functionalities.

## Every ticket's definition of ready / done
Ready requires linked SRS requirement, edition/phase, approved business decision, user journey and screen contract, API/schema proposal, permission and FX/rounding policy, expected fixture and acceptance checks. Done requires implementation at verified commit, code review, unit/API/browser/security tests as relevant, migration/rollback evidence, finance reconciliation, performance proof and release gate. If OPEN blockers exist, keep ticket Specified/Blocked rather than calling it Completed.

## Cross-document review corrections — 2026-11-19

**Prerequisite map, not a promise that all 38 screens ship in Phase 1:**

| Implementation area | May proceed with technical scaffolding | Must be signed before live functionality |
| --- | --- | --- |
| API/bootstrap/CI/docs | Basic compilation, safe logging and health | No customer data or claim of working accounting |
| Screen AppShell and accessible shared fields | Wireframes and reusable components if frontend is approved | D-01 and screen×edition×role×phase, per-screen validation/state |
| Tenant/company/branch/period & DB migration | Candidate ERD, constraints, transaction tests | D-10, action/grant matrix, migrations and tenant isolation |
| Journals/AR/AP and source event posting | Pure engine tests and expected interface | DEC-004, DEC-006 if multicurrency, DEC-009, signed GL fixtures |
| Inventory valuation | Master screens and test scaffolding | DEC-005 cost layers/returns/negative/backdate policy |
| Financial statements, 58 reports | Generic filters/read-model scaffold | DEC-010 per-report formula/expected numeric fixtures |
| XBRL draft, taxonomy parse | Generic standards fixtures, diagnostic watermark | Official forms/taxonomy, legal applicability and exact package approval before CMA filing-ready |
| Native POS and consolidation | Read existing reference UI and define optional scope | DEC-007; do not silently add modules |
| Production deployment and large-data guarantees | Staging harness planning | DEC-008, performance hardware/workload budget, restore proof and security review |

**Decision log row must include:** `DEC/D ID | scope | current OPEN status | accountable role/person | alternatives | approved choice and rationale | version/effective date | affected SRS/screens/APIs/DB | expected tests | evidence link | approval timestamp | release gate`. Blank owner/evidence means the decision remains OPEN. Open blockers prevent only **dependent live functionality**; they do not block harmless docs, test harnesses and safe technical bootstrapping.

**Master change rule:** A signed business change updates the user-owned working SRS, every affected DEV contract, the exact GitHub issue and fixture expected results before merging implementation. All documentation is derivation, not a second competing authority. New technical or regulator facts require primary evidence; avoid declaring DEC-001–010 resolved from a developer assumption. See SRS Appendix J.

## D-11 — Project-wide numeric ID and numbering policy (OPEN)

- UX rule **specified**: first read-only ID field on entity Create/Edit/Details; unsaved Create shows a clearly marked non-reserved next-ID estimate, after Save shows the actual SQL-generated value.
- Engineering recommendation: internal keys `BIGINT IDENTITY(1,1)`; their values can have gaps. Do not use `MAX+1` as a primary-key allocator. External standard identifiers remain source-format.
- Accounting serial **proposed**: gapless committed `BusinessSerialNo` per approved company/document/fiscal series with short transactional counter, audited voids and unique index. Cancelled issues remain in numbering ledger and never reused.
- To close D-11: Product signs how users see provisional vs confirmed ID and whether a draft is created on open; DBA approves schema/preview SQL and concurrent 10M+ load impact; Finance/Compliance signs business serial timing, scope and legal continuity. Literal universal gapless technical PK needs separate explicit cost/concurrency signoff.
- Related SRS K-01–K-11, DEV-02/04/05, R2-01/03/04/09 and documented regression scenarios. This decision is not yet Code-Ready.
