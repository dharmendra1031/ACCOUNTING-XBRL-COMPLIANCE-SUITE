# Pre-Code Gap Register & Readiness Matrix — Keifac Accounting SaaS

**Review date:** 19 November 2026  
**Stage:** ROUND 1 — source coverage and contradiction analysis (completed as document review only). Rounds 2–4 not approved or completed.  
**Scope:** Kuwait-first SRS, all 38 screen IDs, 58 reports (28 ACC + 30 XBRL), all 102 TC IDs and DEV-00–DEV-13 derived contracts.  
**Source of truth:** [User-owned working SRS v1.2, Appendices A–J](https://docs.google.com/document/d/1dSqHsbTAVxkspvMRuhlycEJUCVZgCxvEG1hWBSmvuZA/edit) — boss-owned original is NEVER edited.  
**Git branch:** `development` only; `main` remains unchanged.  
**Completion truth:** This matrix is a risk/traceability artifact; it does NOT implement, approve, test or certify application functions.

## 1. How to use this register

Never start a feature simply because a feature name, candidate endpoint or screen exists in SRS. Every in-scope deliverable must link `Feature/Requirement → Edition/Phase → Role/Action → Screen/UX → Exact API → SQL entity/constraints → Business Event/Policy (or N/A) → Test Fixture/Expected Result → Performance Budget → Owner Sign-off → GitHub Issue/PR`.

**Statuses:** `OPEN`, `PROPOSED`, `BUSINESS APPROVED`, `DESIGN REVIEWED`, `CODE IMPLEMENTED`, `TESTED`, `RELEASED`. Business approval must be a dated named sign-off with evidence, not a language-model assumption. Technical design can remain PROPOSED while a separate owner decision is OPEN.

**Definition of Ready for a feature:** all applicable matrix fields populated; critical dependent GAP items resolved with owner evidence; exact screen/API/DB contracts and expected test values accepted; proposed performance budget and test environment described. An N/A cell requires reason. Future-only regulator/edition decisions do not block unrelated safe engineering bootstraps.

## 2. Round-1 findings summary

| Verification surface | Inventory | Coverage checked | Still not code-ready |
| --- | ---: | --- | --- |
| Screens | 38/38 | Each has E-SCR narrative and F.1 logical API row | Exact route/DTO, conditional fields, user-approved interactive wireframe and action-state rules |
| Reports | 58/58 | ACC-001–028 and XBRL-001–030 catalogued | Signed formula, source, cutoff, expected output, role and benchmark per report |
| Tests | 102/102 | TC-001–102 unique IDs in DEV-11 | Test scripts and actual executions are not present |
| Physical SQL ERD | Logical entities only | F.4 integrity requirements exist | Actual DDL, typed keys, FK/index/migration review |
| Business event posting | GLM-00–15, PM-01–10 templates | Atomic/idempotent/reversal constraints specified | Finance-approved recognition policies and numeric examples |
| APIs | 38/38 logical screen mappings | Proposed paths, entities, permissions, linked tests | Versioned OpenAPI operation/DTO and payload/error scenarios |
| Performance | Level A/B/C proposed | Row counts and proposed p95 targets | Hardware, load mix, query plans and measured tests |
| Decisions | DEC-001–010 and D-01–10 referenced | Open owner/dependency list exists | Signed and effective policy versions |

### Gaps by priority

| Gap | Priority | Category | Owner role | Source links/clauses | Issue hints | Status |
| --- | --- | --- | --- | --- | --- | --- |
| GAP-01 | P0 | Workflow→screen coverage | Product + UX | D.2, G-01/02, §4; DEV-01/02 | #4, #7 | OPEN |
| GAP-02 | P0 | Legal entity and fiscal boundaries | Finance + DBA | D-10, ORG-01, F.4; DEV-04 | #8 | OPEN |
| GAP-03 | P0 | Editions and phase exposure | Product | DEC-001, CONS-01/04; DEV-01/02 | #3, #7 | OPEN |
| GAP-04 | P0 | Frontend design/reuse | Product + UX + Engineering | D-01, Appendix I; DEV-02 | #7 | OPEN |
| GAP-05 | P0 | Field/action/UI state precision | UX + Product | D.3, Appendix E/I; DEV-02 | #4 | OPEN |
| GAP-06 | P1 | Navigation and workflow recovery | UX + Security | D.2, E.39–40, I-05/08; DEV-02 | #4, #7 | OPEN |
| GAP-07 | P0 | Authentication architecture | Security + Engineering | SCR-001, J-09, AUTH-01; DEV-06 | #9, #11 | OPEN |
| GAP-08 | P0 | Action/amount/SoD grants | Product + Compliance + Finance | DEC-009, D-06, AUTH-02; DEV-06 | #9 | OPEN |
| GAP-09 | P0 | Posting recognition and event policies | Finance | DEC-004, GLM-00–15, PM-01–10; DEV-03 | #10, #13 | OPEN |
| GAP-10 | P0 | Concurrent settlement/numbering | Finance + DBA | GL-02, ARAP-01/02, TC-062/064/066; DEV-03/04 | #10, #13–17 | OPEN |
| GAP-11 | P0 | Inventory costing | Finance + Inventory | DEC-005, D-04, INV-01–03; DEV-03 | #17 | OPEN |
| GAP-12 | P0 | FX/tax/precision | Finance/Tax | DEC-006, D-03/05, GL-05, GAP-F09; DEV-03 | #10 | OPEN |
| GAP-13 | P0 | Physical SQL ERD | DBA + Engineering | §12, F.4, H.2; DEV-04 | #8 | OPEN |
| GAP-14 | P0 | OpenAPI request/response | Backend Lead | F.1/2, J-03; DEV-05 | #6 | OPEN |
| GAP-15 | P0 | Performance workload | Architecture + Ops | Appendix H; DEV-10 | #8 | OPEN |
| GAP-16 | P1 | 58 report formulas | Finance + Reporting | §7–8, D-08, DEC-010; DEV-08 | #5 | OPEN |
| GAP-17 | P0 | As-of financial correctness | Finance + Reporting | CLOSE-01–03, J-05, TC-073; DEV-03/08 | #5, #13 | OPEN |
| GAP-18 | P1 | CMA applicability and taxonomy | Compliance | DEC-002/003, D-07, §6; DEV-09 | #3, #5 | OPEN |
| GAP-19 | P1 | Standalone XBRL package contract | Compliance + Finance | GAP-F07/10, J-10/11; DEV-09 | #5 | OPEN |
| GAP-20 | P1 | Integration and job durability | Integration + Engineering | INV-03, J-06, RISK-G17; DEV-07 | #6, #17 | OPEN |
| GAP-21 | P0 | Executable acceptance fixtures | QA + Feature Owners | §19, App. B–I; DEV-11 | #1, #6 | OPEN |
| GAP-22 | P1 | Production and GitHub controls | Security + DevOps | DEC-008, D-09; DEV-12 | #2, #3 | OPEN |
| GAP-23 | P1 | Compact scroll & RTL proof | UX | Appendix I, TC-091–102; DEV-02 | #4, #7 | OPEN |
| GAP-24 | P1 | Data lifecycle and access revocation | Security + Ops | DEC-008/009, J-09/13; DEV-06/12 | #3, #9 | OPEN |

## 2A. Detailed closure criteria for each OPEN gap

This is a record of design work **still required**, not work claimed to be approved or implemented. Sign-off must identify owner, date, approved version and linked code/test evidence.

### GAP-01 — Cross-module workflow ownership

**Missing/ambiguous:** Map quotation/order/delivery, purchase request/PO/GRN, customer/supplier masters, expenses, assets, budget, and tenant subscription to actual reusable workspaces and single business event owners. No new screen assumed by default.

**Required to close:** Signed flow diagram with source → screen/action → canonical API → permission → test and no-duplicate disposition.

**Status:** OPEN. No owner approval or executable test evidence attached.

### GAP-02 — Entity/branch/period isolation

**Missing/ambiguous:** Approve legal company vs branch ownership of COA, period, shared masters and intercompany transfers. Multi-company switching is not consolidated reporting.

**Required to close:** Signed D-10 decision, composite FK diagram, cross-tenant/branch denial and period-lock fixture.

**Status:** OPEN. No owner approval or executable test evidence attached.

### GAP-03 — Product edition/phase entitlements

**Missing/ambiguous:** A screen in SCR-001–038 does not mean it appears in the first customer edition; standalone XBRL needs permitted external input.

**Required to close:** Approved screen×edition×role×release matrix and externally approved statement intake contract.

**Status:** OPEN. No owner approval or executable test evidence attached.

### GAP-04 — Frontend stack and reusable design

**Missing/ambiguous:** Choose the actually available frontend framework/library and component reuse; no invention of Ibdaa reference assets or unrelated POS checkout.

**Required to close:** Approved route tree, AppShell/component ownership, clickable prototype and explicit framework rationale.

**Status:** OPEN. No owner approval or executable test evidence attached.

### GAP-05 — Complete per-screen field/state contract

**Missing/ambiguous:** Generic screens lack exact conditional required fields, default values, validation/error focus, mutation permissions and legal transitions.

**Required to close:** One screen workbook per enabled SCR ID or N/A reason, approved form schema, transition graph and scroll ownership.

**Status:** OPEN. No owner approval or executable test evidence attached.

### GAP-06 — Navigation and mid-flow recovery

**Missing/ambiguous:** Stale company/period results, unsaved work, denied deep links and errors must be handled consistently.

**Required to close:** Recorded state diagram for company switch, route guard, save/discard, stale fetch cancellation and recovery.

**Status:** OPEN. No owner approval or executable test evidence attached.

### GAP-07 — Identity provider and sessions

**Missing/ambiguous:** OIDC delegated identity vs local password/MFA determines User data, recovery, session revocation and token threat model.

**Required to close:** Explicit security decision, provider settings/claims contract or local adaptive-hash/MFA design, unauthorized-access tests.

**Status:** OPEN. No owner approval or executable test evidence attached.

### GAP-08 — RBAC and maker-checker

**Missing/ambiguous:** Role names alone are not module/action/amount/branch grants; self-approval and revoked approver access must fail.

**Required to close:** Signed complete action/threshold matrix with delegation policy, negative fixture and audited policy version.

**Status:** OPEN. No owner approval or executable test evidence attached.

### GAP-09 — Accounting recognition/policy fixtures

**Missing/ambiguous:** Draft, issued, approved, recognized, paid, delivered, returned and reversed are distinct; illustrative GLM mappings are not Finance approval.

**Required to close:** Each enabled event has approved Dr/Cr rows, source trigger, tax/FX/costing, cancellation and retry examples.

**Status:** OPEN. No owner approval or executable test evidence attached.

### GAP-10 — Concurrency and allocation safety

**Missing/ambiguous:** Unique voucher numbers, open-item allocation caps, double submit, payment advance application and period close race need transactional rules.

**Required to close:** Specific SQL uniqueness/isolation decisions and multi-session tests with numeric journal and outstanding outputs.

**Status:** OPEN. No owner approval or executable test evidence attached.

### GAP-11 — Inventory valuation/backdating

**Missing/ambiguous:** FIFO/weighted average, negative stock, backdated receipts, returns and landed costs affect both stock and GL.

**Required to close:** Approved cost-layer calculation fixtures and branch transfer/return/backdate rollback scenarios.

**Status:** OPEN. No owner approval or executable test evidence attached.

### GAP-12 — Currency, FX and tax precision

**Missing/ambiguous:** KWD monetary precision does not imply all currencies share 3 decimals; source rate/date, rate scale and tax applicability need policy.

**Required to close:** Per-currency/FX/tax precision matrix with rounding allocation, gain/loss, examples and approver.

**Status:** OPEN. No owner approval or executable test evidence attached.

### GAP-13 — Physical SQL design

**Missing/ambiguous:** Logical entities are insufficient for migrations and scale, especially tenant composite keys, immutable journals and period-lock transactions.

**Required to close:** Approved ERD, DDL, constraints, cascade behavior, migration/restore strategy and scoped query plans.

**Status:** OPEN. No owner approval or executable test evidence attached.

### GAP-14 — Exact API schemas

**Missing/ambiguous:** SRS F.1 includes shorthand paths, missing DTO and response examples, and potentially duplicated approvals endpoints.

**Required to close:** OpenAPI per use case: exact verb/full route, DTO, error/409/422, If-Match, permission, pagination and idempotency.

**Status:** OPEN. No owner approval or executable test evidence attached.

### GAP-15 — Capacity and performance proof

**Missing/ambiguous:** Proposed 10M/100M rows and p95 numbers are unmeasured; requests-per-second, tenant skew and infra budget unspecified.

**Required to close:** Signed load mix/platform/cost and query budgets, cold/hot plans, p95/p99, CPU/locks/IO, large-tenant tests.

**Status:** OPEN. No owner approval or executable test evidence attached.

### GAP-16 — 58 exact report contracts

**Missing/ambiguous:** Title and description cannot produce compliant numeric output, especially cash flow/equity ratios and taxonomy mapping.

**Required to close:** For each enabled ID: mapping/formula/source/filter/FX/period, expected numeric fixture, reconciliation and approval.

**Status:** OPEN. No owner approval or executable test evidence attached.

### GAP-17 — As-of reporting and close snapshots

**Missing/ambiguous:** Approval state, future corrections and period reopen must not retroactively mutate filed or reviewed historical totals.

**Required to close:** Fixed cutoff, version/hash lineage, AR/AP/stock/bank tie-outs, invalidation/reapproval test and user-facing freshness.

**Status:** OPEN. No owner approval or executable test evidence attached.

### GAP-18 — Official Kuwait filing applicability

**Missing/ambiguous:** CMA jurisdiction, legal segments, current taxonomy, regulator portal artifacts and actual API permission cannot be inferred.

**Required to close:** Compliance-signed official sources, effective dates, forms, channel permissions and acceptance fixtures.

**Status:** OPEN. No owner approval or executable test evidence attached.

### GAP-19 — XBRL standalone & exact artifact approval

**Missing/ambiguous:** Standalone edition requires external approved TB source; package finalization must retain approved bytes, not regenerate after approval.

**Required to close:** Approved import/cutoff contract, candidate/input hash review, versioning, regulator UnknownOutcome/retry tests.

**Status:** OPEN. No owner approval or executable test evidence attached.

### GAP-20 — Integration ownership & durable job handoff

**Missing/ambiguous:** POS/ERP events may overlap; crash after money commit but before in-memory job enqueue can lose recovery tasks.

**Required to close:** Per-event publisher map, stable IDs/payload hashes, persisted job state, replay, partial batch and restart proof.

**Status:** OPEN. No owner approval or executable test evidence attached.

### GAP-21 — 102 runnable tests and sample data

**Missing/ambiguous:** 102 test descriptions exist, but not all exact fixtures, preconditions or automated runs are defined.

**Required to close:** For each enabled TC: expected HTTP/DB/UI/ledger values, synthetic dataset, executable path, commit and evidence.

**Status:** OPEN. No owner approval or executable test evidence attached.

### GAP-22 — Release engineering and recovery

**Missing/ambiguous:** Private main is unprotected; CI compiles health check only; data residency, backup, retention and restore are not approved.

**Required to close:** Signed operational region/RPO/RTO, secure CI/test/deploy gates, proven backup restore and reviewed release process.

**Status:** OPEN. No owner approval or executable test evidence attached.

### GAP-23 — Compact RTL and accessible scrolling

**Missing/ambiguous:** A short-form zero-scroll target must not clip errors, actions, 200% zoom labels or mobile financial columns.

**Required to close:** Approved representative screen captures and keyboard/RTL/mobile scroll behavior at 1366×768, 320px and 200%.

**Status:** OPEN. No owner approval or executable test evidence attached.

### GAP-24 — Data rights and revocation

**Missing/ambiguous:** Audit trails, scheduled exports, attachments, role changes and auditor engagement access need lifecycle policy.

**Required to close:** Retention/consent/offboarding/expiry plan and revoked-role/job/file URL negative-test evidence.

**Status:** OPEN. No owner approval or executable test evidence attached.

## 3. Screen → logical module/API/data/permission/test/performance matrix (38 IDs)

**Important:** Paths and entity names below are copied as **candidate mappings** from SRS F.1. A path fragment like `/post` is NOT a full implementable route. Fields, state transitions and scroll ownership come from [DEV-02](https://github.com/dharmendra1031/ACCOUNTING-XBRL-COMPLIANCE-SUITE/blob/development/docs/development-pack/DEV-02-ui-ux-screen-contracts.md) and remain subject to UX approval. Phase assignments use SRS F.5; `P1(min)/P2(full)` describes only differing depth, not a duplicate UI.

| Screen and intended workspace | Phase | Module | Candidate API(s) | Candidate SQL entities | Existing logical permission | Linked TC IDs | Perf class | Remaining gaps | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SCR-001 Login / MFA | P1 | Identity | POST /auth/login; POST /auth/mfa/verify; POST /auth/recovery | User,Session,MfaChallenge | Authenticate | TC-016,020,059,060 | GET/UI | GAP-07/08, GAP-04/05/14 | OPEN |
| SCR-002 Company Dashboard | P1 | Dashboard | GET /dashboard/summary | Company,Period,JournalLine,ReportSnapshot | ViewDashboard | TC-004,020 | GET/UI | GAP-02/13, GAP-04/05/14 | OPEN |
| SCR-003 Company & Branch Master | P1 | Organization | GET/POST/PATCH /companies; /branches | Tenant,Company,Branch | ManageCompany | TC-020,030 | GET/UI | GAP-02/13, GAP-04/05/14 | OPEN |
| SCR-004 Chart of Accounts | P1 | Ledger | GET/POST/PATCH /accounts | Account,AccountGroup | ManageCOA | TC-001,005 | GET/UI | GAP-02/13, GAP-04/05/14 | OPEN |
| SCR-005 Journal Voucher | P1 | Ledger | POST /journals; POST /journals/{id}/submit; /post; /reverse | JournalHeader,JournalLine,Approval | CreateDraft,Post,Reverse | TC-001,002,003,021,028,062 | POST/CONC | GAP-09/10, GAP-04/05/14 | OPEN |
| SCR-006 Sales Invoice | P1 | Receivables | GET/POST /sales-invoices; POST /sales-invoices/{id}/issue | SalesDocument,SalesLine,JournalHeader | IssueSalesInvoice | TC-023,055 | POST/CONC | GAP-09/10, GAP-04/05/14 | OPEN |
| SCR-007 Purchase Invoice | P1 | Payables | GET/POST /supplier-bills; POST /supplier-bills/{id}/approve | PurchaseDocument,PurchaseLine,GoodsReceipt | ApproveSupplierBill | TC-024,055 | POST/CONC | GAP-09/10, GAP-04/05/14 | OPEN |
| SCR-008 Bank Reconciliation | P1 | Banking | POST /bank-statements/import; POST /reconciliations/{id}/finalize | BankStatement,BankStatementLine,Reconciliation | ReconcileBank | TC-027 | JOB/READ | GAP-10/17, GAP-04/05/14 | OPEN |
| SCR-009 Financial Statement Builder | P2 | Reporting | POST /statements/generate; POST /statements/{id}/approve | FinancialStatement,StatementLine,StatementVersion | ApproveStatement | TC-005,031,052 | JOB/READ | GAP-18/19, GAP-04/05/14 | OPEN |
| SCR-010 Regulatory Profile | P4 | Regulatory | GET/PUT /regulatory-profiles/{companyId} | Regulator,EntityProfile,FilingObligation | ManageRegulatoryProfile | TC-049 | GET/UI | GAP-18/19, GAP-04/05/14 | OPEN |
| SCR-011 Taxonomy Manager | P3 | Taxonomy | POST /taxonomies/import; POST /taxonomies/{id}/approve | Taxonomy,TaxonomyConcept,TaxonomyRelationship | ApproveTaxonomy | TC-011,032 | JOB/READ | GAP-18/19, GAP-04/05/14 | OPEN |
| SCR-012 XBRL Mapping Workbench | P3 | XBRL | GET/PUT /mappings; POST /mappings/{id}/approve | XBRLMapping,MappingDimension | ApproveMapping | TC-006,007,032 | GET/UI | GAP-18/19, GAP-04/05/14 | OPEN |
| SCR-013 Disclosure Data Entry | P3 | XBRL | GET/PUT /disclosures; POST /disclosures/{id}/submit | Disclosure,DisclosureAttachment | EditDisclosure | TC-033 | GET/UI | GAP-18/19, GAP-04/05/14 | OPEN |
| SCR-014 XBRL Validation Centre | P3 | XBRL | POST /filings/{id}/validations; GET /validations/{runId} | ValidationRun,ValidationIssue | RunValidation | TC-008,009,010,012 | JOB/READ | GAP-18/19, GAP-04/05/14 | OPEN |
| SCR-015 XBRL Preview | P3 | XBRL | GET /filings/{id}/versions/{version}/preview | XBRLFact,XBRLContext,FilingVersion | ViewFiling | TC-039,051 | GET/UI | GAP-18/19, GAP-04/05/14 | OPEN |
| SCR-016 Generate XBRL Package | P3 | XBRL | POST /filings/{id}/packages/draft; POST /filings/{id}/packages/candidate; POST /filings/{id}/packages/finalize (only after hash-bound approval) | XBRLPackage,FilingVersion,Approval | GeneratePackage,ExportPackage | TC-010,013,031,051,061 | JOB/READ | GAP-18/19, GAP-04/05/14 | OPEN |
| SCR-017 Regulatory Filing Approval Inbox | P4 | Approvals | GET /filing-approvals; POST /filing-approvals/{id}/decision | Approval,XBRLPackage,FilingVersion | ApprovePackage | TC-029,042,054,061 | GET/UI | GAP-18/19, GAP-04/05/14 | OPEN |
| SCR-018 Submission Register | P4 | Filing | GET /submissions; POST /submissions | Submission,Receipt,FilingVersion | RecordSubmission | TC-014,015,034 | JOB/READ | GAP-18/19, GAP-04/05/14 | OPEN |
| SCR-019 Audit Trail Viewer | P1 | Audit | GET /audit-events | AuditLog | ViewAudit | TC-016,038 | GET/UI | GAP-20/24, GAP-04/05/14 | OPEN |
| SCR-020 Report Centre | P2 | Reporting | GET /reports; POST /reports/{id}/run; POST /reports/{id}/export | ReportDefinition,ReportRun | RunReport,ExportReport | TC-004,005,045 | JOB/READ | GAP-16/17, GAP-04/05/14 | OPEN |
| SCR-021 Company Onboarding Wizard | P1 | Organization | POST /onboarding/drafts; POST /onboarding/{id}/activate | Tenant,Company,FiscalYear,Account | ActivateCompany | TC-030 | GET/UI | GAP-07/08, GAP-04/05/14 | OPEN |
| SCR-022 Users, Roles & Approval Matrix | P1 | Identity | GET/PUT /memberships; GET/PUT /role-grants | User,Membership,Role,Permission,ApprovalPolicy | ManageRoles | TC-020,029 | GET/UI | GAP-07/08, GAP-04/05/14 | OPEN |
| SCR-023 Fiscal Years, Currency & Periods | P1 | Periods | GET/POST /fiscal-years; POST /periods/{id}/lock | FiscalYear,Period,ExchangeRatePolicy | ManagePeriods | TC-003,022 | GET/UI | GAP-02/13, GAP-04/05/14 | OPEN |
| SCR-024 Journal List/Posting History | P1 | Ledger | GET /journals; GET /journals/{id} | JournalHeader,JournalLine | ViewJournal | TC-021 | GET/UI | GAP-02/13, GAP-04/05/14 | OPEN |
| SCR-025 Customer Receipts & Allocation | P1 | Receivables | POST /receipts; POST /receipts/{id}/allocate | Receipt,ReceiptAllocation,JournalHeader | AllocateReceipt | TC-023 | POST/CONC | GAP-09/10, GAP-04/05/14 | OPEN |
| SCR-026 Customer Ledger/Credit Notes | P1 | Receivables | GET /customers/{id}/ledger; POST /sales-credit-notes | Customer,SalesDocument,ReceiptAllocation | IssueCreditNote | TC-023,025 | GET/UI | GAP-09/10, GAP-04/05/14 | OPEN |
| SCR-027 Supplier Payment & Allocation | P1 | Payables | POST /supplier-payments; POST /supplier-payments/{id}/allocate | SupplierPayment,PaymentAllocation | AllocatePayment | TC-024 | POST/CONC | GAP-09/10, GAP-04/05/14 | OPEN |
| SCR-028 Supplier Ledger/Credit Notes | P1 | Payables | GET /suppliers/{id}/ledger; POST /purchase-credit-notes | Supplier,PurchaseDocument,PaymentAllocation | IssueSupplierCredit | TC-024 | GET/UI | GAP-09/10, GAP-04/05/14 | OPEN |
| SCR-029 Items, Warehouses & Stock Ledger | P1 | Inventory | GET/POST /items; /warehouses; GET /stock-ledger | Item,Warehouse,StockLedger,CostLayer | ManageInventory | TC-025,026 | GET/UI | GAP-02/13, GAP-04/05/14 | OPEN |
| SCR-030 Goods Receipt/Transfer/Stock Count | P1 | Inventory | POST /goods-receipts; /stock-transfers; /stock-counts | GoodsReceipt,StockMovement,StockCount | PostStockMovement | TC-025,026,041 | POST/CONC | GAP-09/10, GAP-04/05/14 | OPEN |
| SCR-031 Cash & Bank Registers | P1 | Banking | GET /cash-bank-registers; POST /bank-transfers | BankAccount,CashBankTransaction,JournalHeader | ManageCashBank | TC-027 | POST/CONC | GAP-09/10, GAP-04/05/14 | OPEN |
| SCR-032 Period Closing Checklist | P1(min)/P2(full) | Periods | GET /periods/{id}/close-checklist; POST /periods/{id}/close | Period,CloseChecklist,Reconciliation | ClosePeriod | TC-022,027,045 | GET/UI | GAP-09/10, GAP-04/05/14 | OPEN |
| SCR-033 Unified Approval Inbox | P1 | Approvals | GET /approvals; POST /approvals/{id}/decision | Approval,ApprovalPolicy | ApproveScopedAction | TC-029,042 | GET/UI | GAP-07/08, GAP-04/05/14 | OPEN |
| SCR-034 Auditor Workspace & Evidence | P5 | Audit | GET /engagements; POST /evidence-requests | AuditEngagement,EvidenceRequest,DisclosureAttachment | ReviewEvidence | TC-038,047 | GET/UI | GAP-07/08, GAP-04/05/14 | OPEN |
| SCR-035 Integration Job History & Failures | P1 | Integrations | GET /integration-jobs; POST /integration-jobs/{id}/retry | IntegrationJob,InboundEvent,DeadLetter | RetryIntegration | TC-019,044 | JOB/READ | GAP-20/24, GAP-04/05/14 | OPEN |
| SCR-036 Filing Workspace Wizard | P3 | Filing | GET/POST /filing-workspaces; POST /filings/{id}/prepare | FilingObligation,FilingVersion,StatementVersion | PrepareFiling | TC-031,032,049,063 | JOB/READ | GAP-18/19, GAP-04/05/14 | OPEN |
| SCR-037 Filing Receipt & Status Reconciliation | P4 | Filing | POST /submissions/{id}/receipts; POST /submissions/{id}/reconcile | Submission,Receipt,RegulatorDecision | ReconcileSubmission | TC-034,035,043,048 | JOB/READ | GAP-18/19, GAP-04/05/14 | OPEN |
| SCR-038 Report Definition/Filter Panel | P2 | Reporting | GET/PUT /report-definitions/{id}; POST /reports/{id}/run | ReportDefinition,ReportRun | ConfigureReport | TC-005,045 | JOB/READ | GAP-16/17, GAP-04/05/14 | OPEN |

**Performance classes (provisional):**

| Class | Test-design starting budget |
| --- | --- |
| GET/UI | Level-A proposal: indexed list GET p95 ≤400ms; data-ready UI p95 ≤3s; exact per-action test must be agreed. |
| POST/CONC | Financial posting p95 ≤1.5s where applicable; pending policy and concurrency; draft writes are not postings. |
| JOB/READ | Large report/import/XBRL operations require bounded async jobs; 202 acceptance p95 ≤500ms proposed; completion budget is separate. |

**Required next step per row:** full approved action name and request/response DTO; exact persisted scope, tenant/branch/period guards; field validation and UI state model; expected happy/deny/stale/retry result; SSR/mobile/RTL/zoom/scroll proof; indexed SQL plan and data-scale evidence. Each row is mapped, NOT Ready.

## 4. All 58 report IDs — source-to-output formula gap map

**No report is considered formula-approved by its title.** For each ID, obtain the exact calculation/rounding/FX/cutoff/role/lineage, an input fixture and expected numeric output, export schema and latency budget. [DEV-08](https://github.com/dharmendra1031/ACCOUNTING-XBRL-COMPLIANCE-SUITE/blob/development/docs/development-pack/DEV-08-58-report-contracts.md) remains the canonical report description source. Phase 1 should only enable required minimal reconciliations; complete reporting is a later gate.

| Report ID | Title | Catalogue scope | Missing closure requirement |
| --- | --- | --- | --- |
| ACC-001 | Chart of Accounts Listing | Account code, Arabic/English name, parent, type, status | Formula and expected output OPEN |
| ACC-002 | General Ledger | Opening, debit, credit, closing balance, voucher drill-down | Formula and expected output OPEN |
| ACC-003 | Trial Balance | Opening debit/credit, period movement, closing debit/credit | Formula and expected output OPEN |
| ACC-004 | Balance Sheet / Statement of Financial Position | Assets, liabilities, equity; current/prior period | Formula and expected output OPEN |
| ACC-005 | Profit & Loss / Statement of Profit or Loss | Revenue, cost, gross profit, expenses, net profit | Formula and expected output OPEN |
| ACC-006 | Cash Flow Statement | Operating, investing, financing cash flows | Formula and expected output OPEN |
| ACC-007 | Statement of Changes in Equity | Opening equity, movements, closing equity | Formula and expected output OPEN |
| ACC-008 | Notes to Financial Statements | Notes, policies, supporting schedules | Formula and expected output OPEN |
| ACC-009 | Accounts Receivable Ageing | Customer balances by ageing bucket | Formula and expected output OPEN |
| ACC-010 | Accounts Payable Ageing | Supplier balances by ageing bucket | Formula and expected output OPEN |
| ACC-011 | Customer Statement | Invoices, receipts, credits and outstanding | Formula and expected output OPEN |
| ACC-012 | Supplier Statement | Bills, payments, credits and outstanding | Formula and expected output OPEN |
| ACC-013 | Sales Register | Invoice, customer, item, tax, net and gross amount | Formula and expected output OPEN |
| ACC-014 | Purchase Register | Supplier, invoice, item, tax, net and gross amount | Formula and expected output OPEN |
| ACC-015 | Cash Book | Cash receipts, payments and running balance | Formula and expected output OPEN |
| ACC-016 | Bank Book | Bank transactions and running balance | Formula and expected output OPEN |
| ACC-017 | Bank Reconciliation Statement | Statement lines, matched and unmatched entries | Formula and expected output OPEN |
| ACC-018 | Expense Analysis | Expense category, department, branch and period | Formula and expected output OPEN |
| ACC-019 | Inventory Valuation | Quantity, cost, valuation method and value | Formula and expected output OPEN |
| ACC-020 | Stock Movement | Opening, receipt, issue, transfer and closing | Formula and expected output OPEN |
| ACC-021 | Fixed Asset Register | Asset cost, accumulated depreciation and net book value | Formula and expected output OPEN |
| ACC-022 | Depreciation Schedule | Period depreciation and closing carrying amount | Formula and expected output OPEN |
| ACC-023 | Budget vs Actual | Budget, actual, variance and variance percentage | Formula and expected output OPEN |
| ACC-024 | Foreign Currency Gain/Loss | Currency, rate, revaluation and realized/unrealized gain/loss | Formula and expected output OPEN |
| ACC-025 | Journal Voucher Register | Voucher, date, narration, debit, credit and approval | Formula and expected output OPEN |
| ACC-026 | Financial Ratios Dashboard | Liquidity, leverage, profitability and efficiency ratios | Formula and expected output OPEN |
| ACC-027 | Profitability by Branch / Cost Centre | Revenue, cost, expenses and contribution | Formula and expected output OPEN |
| ACC-028 | Year-End Closing Checklist | Pending journals, reconciliations, approvals and locks | Formula and expected output OPEN |
| XBRL-001 | XBRL Filing Calendar | Entity, regulator, filing type, period, due date, owner, status | Formula and expected output OPEN |
| XBRL-002 | Regulatory Entity Profile | Legal identifiers, entity category, contacts, regulator registration | Formula and expected output OPEN |
| XBRL-003 | Taxonomy Version Register | Taxonomy, namespace, version, effective dates and status | Formula and expected output OPEN |
| XBRL-004 | Chart of Accounts to XBRL Mapping | Source account, target concept, dimension, unit and approval | Formula and expected output OPEN |
| XBRL-005 | Financial Statement Mapping Report | Statement line, mapped concept, source and mapping status | Formula and expected output OPEN |
| XBRL-006 | Unmapped Concepts / Accounts Report | Unmapped, ambiguous, inactive and missing mapping items | Formula and expected output OPEN |
| XBRL-007 | XBRL Fact Register | Concept, context, unit, value, dimensions and source | Formula and expected output OPEN |
| XBRL-008 | Context and Unit Validation Report | Entity, period, instant/duration, unit and dimension checks | Formula and expected output OPEN |
| XBRL-009 | XBRL Validation Error Report | Rule ID, severity, fact, error message and correction | Formula and expected output OPEN |
| XBRL-010 | XBRL Warning & Exception Report | Warnings, acknowledgement, owner and resolution | Formula and expected output OPEN |
| XBRL-011 | XBRL Calculation Consistency Report | Calculation relationship, expected value, actual value and difference | Formula and expected output OPEN |
| XBRL-012 | XBRL Generation Register | File name, taxonomy version, hash, generated by and timestamp | Formula and expected output OPEN |
| XBRL-013 | XBRL Filing Summary Report | Filing status, item count, mapped/unmapped, validation and package details | Formula and expected output OPEN |
| XBRL-014 | Regulatory Disclosure Checklist | Required disclosures, status, evidence and responsible user | Formula and expected output OPEN |
| XBRL-015 | Financial Position XBRL Report | Tagged assets, liabilities and equity with comparative periods | Formula and expected output OPEN |
| XBRL-016 | Profit or Loss XBRL Report | Tagged income, expenses and profit/loss facts | Formula and expected output OPEN |
| XBRL-017 | Cash Flow XBRL Report | Tagged operating, investing and financing facts | Formula and expected output OPEN |
| XBRL-018 | Changes in Equity XBRL Report | Equity movements by component and period | Formula and expected output OPEN |
| XBRL-019 | Notes & Accounting Policies Report | Narrative and tabular disclosure completeness | Formula and expected output OPEN |
| XBRL-020 | Related Party Disclosure Report | Related party, relationship, transaction and balances | Formula and expected output OPEN |
| XBRL-021 | Capital Adequacy Report Pack | Applicable regulatory capital schedules and validations | Formula and expected output OPEN |
| XBRL-022 | Exchange Disclosure Register | Disclosure event, form, approval, due date and status | Formula and expected output OPEN |
| XBRL-023 | General Assembly Filing Pack | Meeting details, agenda, documents, resolutions and status | Formula and expected output OPEN |
| XBRL-024 | Auditor Review & Sign-off Report | Review status, comments, unresolved items and sign-off | Formula and expected output OPEN |
| XBRL-025 | Regulatory Submission Receipt Report | Submission reference, date/time, portal response and receipt | Formula and expected output OPEN |
| XBRL-026 | Rejected Filing & Resubmission Report | Rejection code, reason, corrective action and resubmission version | Formula and expected output OPEN |
| XBRL-027 | Filing Audit Trail Report | All data changes, approvals, exports and submission events | Formula and expected output OPEN |
| XBRL-028 | Comparative Period Consistency Report | Current/prior period mapping and value movement | Formula and expected output OPEN |
| XBRL-029 | XBRL Readable Rendering Report | Human-readable rendering of generated facts and disclosures | Formula and expected output OPEN |
| XBRL-030 | Regulatory Compliance Dashboard | Upcoming, overdue, pending, accepted and rejected filings | Formula and expected output OPEN |

## 5. Formal test and decision traceability

**TC coverage check:** `TC-001–102` all uniquely enumerated in [DEV-11](https://github.com/dharmendra1031/ACCOUNTING-XBRL-COMPLIANCE-SUITE/blob/development/docs/development-pack/DEV-11-qa-102-tests.md). Tests are in prose, not executable. Each critical implementation ticket must link a TC ID to precondition → action → exact expected DB/ledger/API/UI result → negative/retry/concurrency case → evidence/commit. Do not duplicate 102 narrative paragraphs into another conflicting test catalogue.

**Decision register:** `DEC-001–010` and `D-01–10` remain OPEN in [DEV-13](https://github.com/dharmendra1031/ACCOUNTING-XBRL-COMPLIANCE-SUITE/blob/development/docs/development-pack/DEV-13-roadmap-gates.md). In particular, DEC-004 posting, DEC-005 costing, DEC-006 FX, DEC-009 approvals, D-10 company hierarchy, DEC-001 editions, DEC-008 security/hosting and DEC-010 reports. Any regulatory production claim additionally requires DEC-002/003 primary evidence.

## 6. 8-layer contradiction and simulation review

| Review layer | Mandatory adversarial scenario | Pre-code proof required |
| --- | --- | --- |
| Requirement | Quotation, delivery, inventory issue and invoice created from two different workspaces | One owning business state machine; no duplicate menu/service |
| Finance | Same POS economic event is imported twice while user submits journal manually | Exactly one approved posting source and stable unique event identity |
| Database | Period is closing while receipt allocation or backdated stock return is committed | Transaction/period lock order and consistent as-of balances |
| API | User double-clicks Post, request times out, then retries with changed payload/version | Original committed ref for same payload; conflict + correction path for changed payload |
| UI | User switches company with unsaved form and pending request | Abort stale fetch, preserve/discard prompt, no other-company cached result |
| Performance | 10M journal lines with largest company/oldest period, concurrent posting and history search | Query plan, bounded keyset page, p95/p99 and lock/CPU/IO evidence |
| Security | Grant revoked after an export job is scheduled but before download | Recheck permission at execution and delivery, no data leak |
| Compliance | XBRL candidate changes after signatory approval or portal response times out | Hash mismatch invalidates approval; UnknownOutcome forbids blind retry |

## Round 2 technical design progress — 19 November 2026

**Engineering proposal work has begun, but no GAP is closed by this alone.** The 24 OPEN items remain OPEN until their evidence-to-close and actual authorized sign-offs are attached.

| Design artifact | Covered GAP IDs | What is now written | Still blocking release/code |
| --- | --- | --- | --- |
| [R2-01 Physical ERD](round-2/01-PHYSICAL-ERD-DESIGN-PROPOSAL.md) | 02,09,10,12,13,17 | Candidate entity/keys/FKs/period and posting invariants, scoped query index paths | D-10 entity hierarchy, signed physical DDL/p-s, migrations and DBA review |
| [R2-02 Posting & state](round-2/02-POSTING-STATE-AND-EVENT-CONTRACT.md) | 09,10,11,12,17 | Source event identity, state machine, atomic algorithm, safety examples | DEC-004/005/006/009 and real Finance numeric fixtures |
| [R2-03 OpenAPI](round-2/03-accounting-core.openapi.yaml) | 07,08,10,14 | 16 full path/verb operations for scoped foundation, 37 referenced schema/parameter/response symbols checked | OIDC decision, signed DTO/error/role details and implementation |
| [R2-04 Screen fields/UX](round-2/04-SCREEN-FIELD-ACTION-AND-UX-CONTRACTS.md) | 01,03,04,05,06,23 | 38 rows, compact layout and typed high-priority screen proposals | D-01 stack choice, clickable approval wireframes and all exact field definitions |
| [R2-05 RBAC](round-2/05-RBAC-AND-APPROVAL-MATRIX.md) | 07,08,24 | Candidate action-role matrix and SoD negative cases | DEC-009 thresholds/delegation and security sign-off |
| [R2-06 Capacity](round-2/06-PERFORMANCE-AND-CAPACITY-TEST-DESIGN.md) | 15,17,20,23 | 10M/100M fixture spec, query paths and p95 protocol | Cloud and load mix signoff; actual SQL/browser benchmark |
| [R2-07 Readiness](round-2/07-READINESS-GATES-AND-OWNER-SIGNOFF.md) | 01–24 | Owner/dependency map, feature readiness and sign-off template | Named approvals, evidence and feature-specific design freeze |

**Verification scope:** Read back all 7 files from GitHub; the OpenAPI includes 16 unique operation IDs and no missing local `$ref` definitions by static reference inventory; 38 screen matrix rows read back. These are structural checks, not a full OpenAPI validation or runnable test suite.

**No automatic 'APPROVED':** Proposals do not resolve policy/regulator questions, and future Phase 3/4 items cannot block unrelated safe Phase 1 design research. Avoid creating alternate competing ERD/API/UX policies in issues; link to R2 artifacts and record signed changes in canonical SRS and DEV contracts.

## 7. Exit criteria for Round 1 → Round 2

**Round 1 Done =** source coverage inventory captured and a gap register exists. **Round 1 DOES NOT mean gaps closed.** Current register contains 24 prioritized unresolved issue classes and all target screens/reports/test identifiers.

**Round 2 — Design Verification:** Product/UX chooses frontend reuse and in-scope 38-screen route/edition map; Engineering+DBA produces actual physical ERD/column types/index and migration plan; Backend reviews complete OpenAPI; Finance signs event/FX/inventory fixtures; Security signs role/action/threshold and identity provider; Reporting signs numeric formulas, and Compliance verifies only applicable current CMA forms.

**Round 3 — Failure & Capacity Review:** executable/disposable spikes if needed for keyset paging, hot/cold SQL plans, concurrency/idempotency, 10M/100M fixtures, accessible 1366×768 forms and RTL flows, async job/restore. A benchmark number cannot be declared passed based on this document.

**Round 4 — Feature-specific Design Freeze:** 0 critical OPEN contradictions for features to be coded; named approvals; exact UI/API/DB/policy contracts and test fixtures linked to issue; freezes are per release and per capability, not a false claim that all future GCC/CMA features are already approved.

## 8. Risks that do NOT justify overengineering

- Do not create another suite of 38 new frontend pages when shared workspaces satisfy requirements.
- Do not build several posting engines for Sales/Purchase/POS/Inventory.
- Do not introduce sharding, Kafka, microservices, multiple databases or caching solely to hit untested marketing speed numbers.
- Do not create native POS checkout, consolidation accounting or CMA API integration without signed scope and official interface evidence.
- Do not auto-generate fake accounting/report expected values or unverified current regulatory requirements.
- Do not treat successful build of /health as business acceptance.

## 9. Audit provenance

This register was populated from the user-owned working SRS v1.2 (§3–24, E-SCR-001–038, F.1/F.5 and Appendices G–J), existing DEV-08 report listing and DEV-11 test list. All 38 SRS F.1 rows matched a corresponding E-SCR contract. All 58 report catalog entries and 102 unique tests were present. The original boss-owned SRS has not been modified.
