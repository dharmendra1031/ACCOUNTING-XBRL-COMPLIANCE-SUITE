# Round 2 / R2-07 — Feature-specific Readiness, Decision and Sign-off Register

**Status:** Round 2 technical specification drafts prepared. Round 2 is **NOT APPROVED** because business and detailed design decisions remain unresolved. Absolutely no automatic sign-off is inferred by saving a document.

**Single canonical source:** working SRS v1.2 Appendix J; 14 DEV-00–13 contracts; PRE-CODE-GAP-REGISTER. This file is a **decision and evidence tracker**, not a duplicate SRS.

## 1. Decision owners and effect of an OPEN status

| ID / gap | Signatory function | Decision required | May begin without it | Cannot enable before signoff |
| --- | --- | --- | --- | --- |
| D-01 / GAP-04/05 | Product + UX + Engineering | Frontend framework, approved components/screens, RTL/mobile route UX | Wireframes / design exploration | Customer-facing finalized screen code |
| D-10 / GAP-02/13 | Finance + Engineering/DBA | Company/branch COA, periods, keys/ownership | Candidate ERD, SQL review | Company activation / financial migrations |
| DEC-001 / GAP-03 | Product | Edition/customer target, releases/entitlements | Non-edition-specific contracts | Final menus/pricing/first-edition promises |
| DEC-004 / GAP-09/10 | Finance/Accounting | Recognition event, tax/discount, Dr/Cr/rounding, reversal | Source event identity and pure invariant design | GL posting, sales/AP/asset financial recognition |
| DEC-005 / GAP-11 | Finance/Inventory | Inventory costing, backdates, returns, negative stock | Inventory prototype | Valued stock/COGS postings |
| DEC-006 / GAP-12 | Finance | FX source, rates, base currency and precision | Currency-aware schema discussions | Multi-currency posting and FX revaluation |
| DEC-009 / GAP-08 | Company Admin + Finance/Compliance | Action×role×branch×amount thresholds, SoD, delegation | RBAC candidate review | Protected approval/post/reverse/period reopen |
| DEC-008 / GAP-22/24 | Security + Operations | Identity/hosting/retention/RPO/RTO, recovery and revocation | Security threat model, staging plan | Production/customer data/backup certification |
| DEC-010 / GAP-16/17 | Finance/Reporting | 58 report formulas, mapping, cutoff, sample results | Catalog and generic report UI patterns | Approved statements and filing-ready XBRL source |
| DEC-002/003 / GAP-18/19 | Kuwait Compliance | Eligible entity/official forms, taxonomy, channel and fixtures | Generic XBRL diagnosis, import contract design | CMA filing-ready claims and live API connector |
| DEC-007 | Product | Native POS vs integration and consolidation | POS integration event contracts | Checkout UI / consolidated statutory accounting |
| GAP-15 | Architecture + Ops | Hardware/scale load mixture, latency and budget | Benchmark script/spec design | Performance or capacity SLO guarantees |

## 2. Round-2 deliverables and their evidence state

| Document | Purpose | Initial result | Status |
| --- | --- | --- | --- |
| R2-01 Physical ERD | Candidate tables, scoped keys, FKs, SQL invariants and migration decisions | Engineering design drafted | PROPOSED; physical DDL/migrations absent |
| R2-02 Posting & state | Event identity, atomic commit, reversal, policy table, examples | Engineering design drafted | PROPOSED; Finance approval absent |
| R2-03 OpenAPI YAML | Explicit versioned candidate operations and schemas | Contract file drafted | PROPOSED; IdP, policies and implementation absent |
| R2-04 UI screens | 38 screen coverage matrix plus key form schemas and no-scroll tests | Contract file drafted | PROPOSED; wireframes/clickthrough absent |
| R2-05 RBAC approvals | Candidate role-action and maker-checker policies | Contract file drafted | PROPOSED; policy and amounts not approved |
| R2-06 Performance | Benchmark fixture, SQL paths and p95 protocol | Contract file drafted | PROPOSED; no benchmark executed |
| R2-07 Signoff | Decision register and feature DoR/DoD | This file | OPEN owner approvals |

## 3. Exact Ready gate per feature (before production feature coding)

An in-scope feature MUST have these 10 check items, marked Accepted, Not Applicable with reason, or Blocked:

1. Feature ID and edition/phase confirmed with Product and source SRS requirement.
2. Per-role user journey and exact screen route/actions/status/error/RTL/navigation, approved by UX owner.
3. Typed field/conditional validation and accessible compact wireframe with scroll owner and 1366×768, mobile/zoom evidence.
4. One owning backend use case; exact API method/version/route/DTO/errors/permissions/idempotency; formal OpenAPI.
5. Reviewed SQL model/constraints/company scoped FKs/migrations/query design; cost of indexes estimated.
6. Signed finance recognition/source event/FX/costing/SoD policy, **or N/A with valid reason**.
7. Negative/security/concurrency and source-of-truth test fixtures with exact expected DB/GL result.
8. Large-data benchmark envelope, API p95/p99 and UI thresholds that are measurable, not promises.
9. Linked GitHub issue, named decision owner, decision date/effective version, traceable evidence and dependent SRS/DEV updates.
10. Recorded review by cross-functional Product+Engineering+Finance+Security/Compliance as applicable; blockers tracked with explicit impact.

**Do not set Ready** merely because the 38 screens/58 reports/102 test descriptions have IDs. Missing critical sign-offs prevent only the relevant feature scope, not all safe prototyping.

## 4. Current truthful completion status (19 Nov 2026)

- Round 1: **inventory and 24-gap classification documented**, gaps not all closed.
- Round 2: technical drafts **written**, awaiting cross-functional review and actual designs for all enabled features. No physical database DDL approved, no production code generated from the OpenAPI.
- Round 3: no actual SQL load/retry/concurrency/RTL/browser/restore benchmarks run.
- Round 4: no feature has achieved frozen cross-functional development approval. 
- Code: ASP.NET Core minimal /health compile only; no implemented identity/ledger/UI/business modules.
- Branches: all review files and future feature work on `development`, never `main` without approved release process.

## 5. Evidence and signature record template

```text
Decision ID / scope:
SRS version and specific feature/edition:
Question & alternatives:
Chosen and rejected approaches:
Rationale, compliance basis, audit/privacy impacts:
Finance sample / API / UI / SQL test fixture links:
Approved policy effective date:
Approving person's name + actual authority:
Approval date and evidence link:
Impacted DEV docs, screen, DB migrations, API, TC IDs:
Rollback/migration/retraining implications:
Current status: OPEN / BUSINESS APPROVED / DESIGN REVIEWED
```

**Never auto-fill an approval, policy choice or regulator certification from an AI recommendation.**

**Related:** [Master Gap Register](../PRE-CODE-GAP-REGISTER.md), [DEV-13](../DEV-13-roadmap-gates.md), GitHub Issues #1, #3, #4, #7, #8, #9, #10.
