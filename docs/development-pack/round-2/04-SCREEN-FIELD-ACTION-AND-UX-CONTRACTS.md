# Round 2 / R2-04 — 38 Screen-Level UI Contracts & Compact UX Preflight (DRAFT)

**Status:** 38 mapped screen outlines, **NOT** 38 approved designs, not implemented UI or pixel-perfect prototypes. SRS Appendix E/I, DEV-02, DEV-05 and PRE-CODE-GAP-REGISTER are canonical references.  
**Owner approval:** Product, UX, Security and Finance for affected actions. **Branch:** `development` only.  
**Frontend framework choice is OPEN (D-01).** No native POS checkout UI or copied reference CSS until the authorized original is reviewed and DEC-007 is signed.

## 1. Full 38-screen compact matrix

| Screen ID | View | Audience | Main fields/data (source SRS) | Actions (source SRS) | Suggested pattern/scroll owner | Logical permission | Readiness |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SCR-001 | Login / MFA | All. | email/username, password, language, MFA code, recovery. | Sign in; reset; verify MFA. | Auth form; normal viewport | Authenticate | DRAFT |
| SCR-002 | Company Dashboard | All assigned. | company, branch, fiscal period, currency, KPI filters. | drill to report; switch context. | Dashboard; page if content grows | ViewDashboard | DRAFT |
| SCR-003 | Company & Branch Master | Company Admin. | legal name EN/AR, CR, jurisdiction, address, base currency, branch code. | save draft; activate; deactivate branch. | Master form; page | ManageCompany | DRAFT |
| SCR-004 | Chart of Accounts | Accountant/Admin. | code, names EN/AR, parent, type, normal balance, currency, active. | create; edit; deactivate; view ledger. | Tree+details; tree pane | ManageCOA | DRAFT |
| SCR-005 | Journal Voucher | Accountant/Finance. | type, date, period, debit/credit lines, currency/rate, dimensions, evidence. | save; submit; approve; post; reverse. | Journal workbench; journal line grid | CreateDraft,Post,Reverse | DRAFT |
| SCR-006 | Sales Invoice | Sales/Accountant. | customer, document date, lines, qty, unit price, discount, applicable tax, terms. | draft; issue; post; credit; print. | Sales workbench; invoice lines grid | IssueSalesInvoice | DRAFT |
| SCR-007 | Purchase Invoice | Purchase/Accountant. | supplier, supplier reference, PO/GRN, lines, charges, due date. | draft; match; approve; post; credit. | Purchase workbench; bill lines grid | ApproveSupplierBill | DRAFT |
| SCR-008 | Bank Reconciliation | Accountant/Finance. | bank account, statement file/date, matching rule, variance. | import; match; unmatch; finalize. | Reconciliation workbench; line grid | ReconcileBank | DRAFT |
| SCR-009 | Financial Statement Builder | Finance/CFO. | company, period, basis, statement template, line mappings, notes, comparison. | generate draft; drill; review; approve; freeze. | Statement builder; preview/results | ApproveStatement | DRAFT |
| SCR-010 | Regulatory Profile | Admin/Compliance. | entity ID, regulator, category, obligations, legal source, effective date. | save; assess applicability; approve. | Regulatory master form; page | ManageRegulatoryProfile | DRAFT |
| SCR-011 | Taxonomy Manager | XBRL/Compliance. | jurisdiction, package, namespace, version, effective date, dependency. | import; validate; approve; retire. | Taxonomy library; table | ApproveTaxonomy | DRAFT |
| SCR-012 | XBRL Mapping Workbench | XBRL Preparer. | source line/account, concept, dimensions, unit, sign, effective date. | map; preview; resolve conflict; submit approval. | Mapping workbench; mapping table | ApproveMapping | DRAFT |
| SCR-013 | Disclosure Data Entry | XBRL Preparer. | form, required fields, narrative EN/AR, attachments, period. | save; validate completeness; submit. | Conditional disclosure form; page | EditDisclosure | DRAFT |
| SCR-014 | XBRL Validation Centre | XBRL Preparer. | run ID, hash, rule, severity, fact, source, owner. | run; filter; open correction; acknowledge allowed warning. | Validation results; table | RunValidation | DRAFT |
| SCR-015 | XBRL Preview | Preparer/Auditor/CFO. | filing version, context, facts, notes, rendering, comparison. | inspect; comment; request correction. | Immutable filing preview; document | ViewFiling | DRAFT |
| SCR-016 | Generate XBRL Package | Preparer/Filing Officer. | obligation, approved statement, taxonomy, rules, version, hash. | generate diagnostic draft; prepare an immutable candidate package for SCR-017 review; finalize only the already-approved byte-identical candidate; download/export after finalization. | Package workflow; page | GeneratePackage,ExportPackage | DRAFT |
| SCR-017 | Regulatory Filing Approval Inbox | CFO/Signatory. | obligation, package hash, validation, reviewer comments, evidence. | approve exact immutable candidate version/hash; reject; request changes. | Filing approval queue; grid | ApprovePackage | DRAFT |
| SCR-018 | Submission Register | Filing Officer. | package, portal channel, operator, reference, receipt, decision. | export; record upload; reconcile; resubmit. | Submission register; grid | RecordSubmission | DRAFT |
| SCR-019 | Audit Trail Viewer | Auditor/Admin. | entity, actor, time range, event, before/after, evidence. | filter; inspect; export authorized. | Audit history; table | ViewAudit | DRAFT |
| SCR-020 | Report Centre | Accountant/Management. | report ID, company, branch, period, currency, filters. | run; drill; export; schedule if entitled. | Report centre; results grid | RunReport,ExportReport | DRAFT |
| SCR-021 | Company Onboarding Wizard | Company Admin. | legal profile, entity type, currency, fiscal year, COA, opening balances. | save step; resume; activate. | Onboarding wizard; page | ActivateCompany | DRAFT |
| SCR-022 | Users, Roles & Approval Matrix | Admin. | user, company/branch scope, role, actions, thresholds, MFA. | invite; assign; revoke; approve policy. | Roles/approval matrix; grid | ManageRoles | DRAFT |
| SCR-023 | Fiscal Years, Currency & Periods | Admin/Finance. | fiscal year, period, base currency, rate source, lock status. | create; configure; lock; request reopen. | Fiscal/period config; list | ManagePeriods | DRAFT |
| SCR-024 | Journal List/Posting History | Accountant/Finance. | voucher no, status, date, source, amount, user. | search; open; reverse via authorized flow. | Journal history; grid | ViewJournal | DRAFT |
| SCR-025 | Customer Receipts & Allocation | Accountant. | customer, receipt, bank/cash, invoices, applied/unapplied amounts. | record; allocate; refund; reverse. | Receipt allocation; invoice allocation grid | AllocateReceipt | DRAFT |
| SCR-026 | Customer Ledger/Credit Notes | Accountant/Sales. | customer, period, invoices, receipts, credits, ageing. | view; issue credit; allocate; export. | Customer ledger; table | IssueCreditNote | DRAFT |
| SCR-027 | Supplier Payment & Allocation | Accountant. | supplier, bank, bills, advance, applied/unapplied. | record; allocate; reverse. | Supplier payment allocation; bill grid | AllocatePayment | DRAFT |
| SCR-028 | Supplier Ledger/Credit Notes | Accountant/Purchase. | supplier, bills, payments, credits, ageing. | view; credit; reconcile. | Supplier ledger; table | IssueSupplierCredit | DRAFT |
| SCR-029 | Items, Warehouses & Stock Ledger | Inventory. | SKU, UOM, barcode, warehouse, cost policy, batches. | create; deactivate; view movements. | Inventory master/stock ledger; table | ManageInventory | DRAFT |
| SCR-030 | Goods Receipt/Transfer/Stock Count | Inventory. | item, from/to, qty, UOM, cost, reason, count variance. | receive; transfer; count; submit; post. | Receipt/count/transfer; line grid | PostStockMovement | DRAFT |
| SCR-031 | Cash & Bank Registers | Accountant. | account, transaction type, date, amount, reference. | receipt; payment; transfer; import statement. | Cash/bank register; table | ManageCashBank | DRAFT |
| SCR-032 | Period Closing Checklist | Finance Manager. | period, checklist, reconciliations, blockers, exceptions. | run; assign; close; request reopen. | Closing checklist; page | ClosePeriod | DRAFT |
| SCR-033 | Unified Approval Inbox | Approvers. | document type, maker, version, amount, scope, evidence. | approve; reject; request changes; delegate if permitted. | Unified approval inbox; grid | ApproveScopedAction | DRAFT |
| SCR-034 | Auditor Workspace & Evidence | Auditor. | engagement, scope, evidence, comment, request, sign-off. | review; comment; request evidence; export. | Auditor evidence; table | ReviewEvidence | DRAFT |
| SCR-035 | Integration Job History & Failures | Admin/Operations. | source, event ID, batch, status, error, reconciliation. | inspect; retry safe; resolve; download log. | Integration jobs; table | RetryIntegration | DRAFT |
| SCR-036 | Filing Workspace Wizard | XBRL/Filing Officer. | obligation, source snapshot, taxonomy, mappings, validation, package. | step through; save; resume; hand off. | Filing wizard; page | PrepareFiling | DRAFT |
| SCR-037 | Filing Receipt & Status Reconciliation | Filing Officer. | portal ref, operator, receipt, status evidence, version. | record; verify; reject; resubmit. | Filing receipt review; detail/document | ReconcileSubmission | DRAFT |
| SCR-038 | Report Definition/Filter Panel | Report users/Admin. | report ID, scope, cutoff, comparison, columns, export. | apply; save authorized preset; run. | Report filter panel; panel | ConfigureReport | DRAFT |

## 2. Approval-required screen entry/action contracts

The per-screen sections below repeat only **screen-specific** SRS information to prevent losing important actions. Do NOT treat generic Appendix-E text `draft/save/empty` as applicable to login or immutable history, or interpret a screen as a new backend service.

### SCR-001 — Login / MFA

**Audience (SRS):** All.. **Primary data/fields:** email/username, password, language, MFA code, recovery.. **User actions:** Sign in; reset; verify MFA..  
**Blockers:** no tenant data before authentication; lockout/rate-limit; recovery audit.. **Next routes:** 002 or 021..  
**Screen pattern / scroll owner (proposal):** Auth form; normal viewport. **Presentation:** Sign-in/MFA/recovery; no SaveDraft, no historical mode.  
**Logical API:** POST /auth/login; POST /auth/mfa/verify; POST /auth/recovery. **Data entities:** User,Session,MfaChallenge. **Required action grant:** Authenticate. **Trace TC:** TC-016,020,059,060.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-002 — Company Dashboard

**Audience (SRS):** All assigned.. **Primary data/fields:** company, branch, fiscal period, currency, KPI filters.. **User actions:** drill to report; switch context..  
**Blockers:** server scoped aggregates; freshness indicator; no unauthorized totals.. **Next routes:** 004/020/036..  
**Screen pattern / scroll owner (proposal):** Dashboard; page if content grows. **Presentation:** Scoped cards, freshness and authorized drilldowns.  
**Logical API:** GET /dashboard/summary. **Data entities:** Company,Period,JournalLine,ReportSnapshot. **Required action grant:** ViewDashboard. **Trace TC:** TC-004,020.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-003 — Company & Branch Master

**Audience (SRS):** Company Admin.. **Primary data/fields:** legal name EN/AR, CR, jurisdiction, address, base currency, branch code.. **User actions:** save draft; activate; deactivate branch..  
**Blockers:** unique company/branch codes; immutable legal identity changes audited.. **Next routes:** 021/023..  
**Screen pattern / scroll owner (proposal):** Master form; page. **Presentation:** Compact company/branch editor, guarded activation.  
**Logical API:** GET/POST/PATCH /companies; /branches. **Data entities:** Tenant,Company,Branch. **Required action grant:** ManageCompany. **Trace TC:** TC-020,030.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-004 — Chart of Accounts

**Audience (SRS):** Accountant/Admin.. **Primary data/fields:** code, names EN/AR, parent, type, normal balance, currency, active.. **User actions:** create; edit; deactivate; view ledger..  
**Blockers:** no deletion with postings; no parent cycles; mapping impact.. **Next routes:** 005/024..  
**Screen pattern / scroll owner (proposal):** Tree+details; tree pane. **Presentation:** COA hierarchy, readable selected account form.  
**Logical API:** GET/POST/PATCH /accounts. **Data entities:** Account,AccountGroup. **Required action grant:** ManageCOA. **Trace TC:** TC-001,005.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-005 — Journal Voucher

**Audience (SRS):** Accountant/Finance.. **Primary data/fields:** type, date, period, debit/credit lines, currency/rate, dimensions, evidence.. **User actions:** save; submit; approve; post; reverse..  
**Blockers:** balanced functional currency; locked period; SoD; immutable posted.. **Next routes:** 024/033..  
**Screen pattern / scroll owner (proposal):** Journal workbench; journal line grid. **Presentation:** Persistent debit/credit difference and allowed actions.  
**Logical API:** POST /journals; POST /journals/{id}/submit; /post; /reverse. **Data entities:** JournalHeader,JournalLine,Approval. **Required action grant:** CreateDraft,Post,Reverse. **Trace TC:** TC-001,002,003,021,028,062.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-006 — Sales Invoice

**Audience (SRS):** Sales/Accountant.. **Primary data/fields:** customer, document date, lines, qty, unit price, discount, applicable tax, terms.. **User actions:** draft; issue; post; credit; print..  
**Blockers:** customer status, posting event, precision, duplicate source.. **Next routes:** 025/026..  
**Screen pattern / scroll owner (proposal):** Sales workbench; invoice lines grid. **Presentation:** Compact customer, lines and totals; status-dependent actions.  
**Logical API:** GET/POST /sales-invoices; POST /sales-invoices/{id}/issue. **Data entities:** SalesDocument,SalesLine,JournalHeader. **Required action grant:** IssueSalesInvoice. **Trace TC:** TC-023,055.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-007 — Purchase Invoice

**Audience (SRS):** Purchase/Accountant.. **Primary data/fields:** supplier, supplier reference, PO/GRN, lines, charges, due date.. **User actions:** draft; match; approve; post; credit..  
**Blockers:** supplier duplicate; GRNI; match tolerance; approval.. **Next routes:** 027/028..  
**Screen pattern / scroll owner (proposal):** Purchase workbench; bill lines grid. **Presentation:** Supplier, receipt match and approval exceptions.  
**Logical API:** GET/POST /supplier-bills; POST /supplier-bills/{id}/approve. **Data entities:** PurchaseDocument,PurchaseLine,GoodsReceipt. **Required action grant:** ApproveSupplierBill. **Trace TC:** TC-024,055.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-008 — Bank Reconciliation

**Audience (SRS):** Accountant/Finance.. **Primary data/fields:** bank account, statement file/date, matching rule, variance.. **User actions:** import; match; unmatch; finalize..  
**Blockers:** duplicate statement lines; cutoff; locked period; zero unexplained difference.. **Next routes:** 031/032..  
**Screen pattern / scroll owner (proposal):** Reconciliation workbench; line grid. **Presentation:** Match/unmatch and variance always visible.  
**Logical API:** POST /bank-statements/import; POST /reconciliations/{id}/finalize. **Data entities:** BankStatement,BankStatementLine,Reconciliation. **Required action grant:** ReconcileBank. **Trace TC:** TC-027.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-009 — Financial Statement Builder

**Audience (SRS):** Finance/CFO.. **Primary data/fields:** company, period, basis, statement template, line mappings, notes, comparison.. **User actions:** generate draft; drill; review; approve; freeze..  
**Blockers:** ties to TB; mapping version; immutable approved snapshot.. **Next routes:** 017/036..  
**Screen pattern / scroll owner (proposal):** Statement builder; preview/results. **Presentation:** Draft vs frozen version, formula source drilldown.  
**Logical API:** POST /statements/generate; POST /statements/{id}/approve. **Data entities:** FinancialStatement,StatementLine,StatementVersion. **Required action grant:** ApproveStatement. **Trace TC:** TC-005,031,052.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-010 — Regulatory Profile

**Audience (SRS):** Admin/Compliance.. **Primary data/fields:** entity ID, regulator, category, obligations, legal source, effective date.. **User actions:** save; assess applicability; approve..  
**Blockers:** no inferred CMA eligibility; evidence/version required.. **Next routes:** 011/036..  
**Screen pattern / scroll owner (proposal):** Regulatory master form; page. **Presentation:** Evidence-based company applicability only.  
**Logical API:** GET/PUT /regulatory-profiles/{companyId}. **Data entities:** Regulator,EntityProfile,FilingObligation. **Required action grant:** ManageRegulatoryProfile. **Trace TC:** TC-049.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-011 — Taxonomy Manager

**Audience (SRS):** XBRL/Compliance.. **Primary data/fields:** jurisdiction, package, namespace, version, effective date, dependency.. **User actions:** import; validate; approve; retire..  
**Blockers:** schema integrity; version immutability; official-source gate.. **Next routes:** 012..  
**Screen pattern / scroll owner (proposal):** Taxonomy library; table. **Presentation:** Import/validate/approve immutable versions.  
**Logical API:** POST /taxonomies/import; POST /taxonomies/{id}/approve. **Data entities:** Taxonomy,TaxonomyConcept,TaxonomyRelationship. **Required action grant:** ApproveTaxonomy. **Trace TC:** TC-011,032.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-012 — XBRL Mapping Workbench

**Audience (SRS):** XBRL Preparer.. **Primary data/fields:** source line/account, concept, dimensions, unit, sign, effective date.. **User actions:** map; preview; resolve conflict; submit approval..  
**Blockers:** duplicate active rules; invalid concepts; version control.. **Next routes:** 013/014..  
**Screen pattern / scroll owner (proposal):** Mapping workbench; mapping table. **Presentation:** Search, conflicts and approved version.  
**Logical API:** GET/PUT /mappings; POST /mappings/{id}/approve. **Data entities:** XBRLMapping,MappingDimension. **Required action grant:** ApproveMapping. **Trace TC:** TC-006,007,032.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-013 — Disclosure Data Entry

**Audience (SRS):** XBRL Preparer.. **Primary data/fields:** form, required fields, narrative EN/AR, attachments, period.. **User actions:** save; validate completeness; submit..  
**Blockers:** conditional mandatory fields; file controls; approved template.. **Next routes:** 014..  
**Screen pattern / scroll owner (proposal):** Conditional disclosure form; page. **Presentation:** Mandated legal fields and attachments accessible.  
**Logical API:** GET/PUT /disclosures; POST /disclosures/{id}/submit. **Data entities:** Disclosure,DisclosureAttachment. **Required action grant:** EditDisclosure. **Trace TC:** TC-033.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-014 — XBRL Validation Centre

**Audience (SRS):** XBRL Preparer.. **Primary data/fields:** run ID, hash, rule, severity, fact, source, owner.. **User actions:** run; filter; open correction; acknowledge allowed warning..  
**Blockers:** block errors; no stale run reuse; regulator overrides controlled.. **Next routes:** 012/013/015..  
**Screen pattern / scroll owner (proposal):** Validation results; table. **Presentation:** Error rule, fact drilldown and correction route.  
**Logical API:** POST /filings/{id}/validations; GET /validations/{runId}. **Data entities:** ValidationRun,ValidationIssue. **Required action grant:** RunValidation. **Trace TC:** TC-008,009,010,012.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-015 — XBRL Preview

**Audience (SRS):** Preparer/Auditor/CFO.. **Primary data/fields:** filing version, context, facts, notes, rendering, comparison.. **User actions:** inspect; comment; request correction..  
**Blockers:** read-only frozen hash; draft watermark; scope checks.. **Next routes:** 016/017..  
**Screen pattern / scroll owner (proposal):** Immutable filing preview; document. **Presentation:** Read-only exact version, permitted comments.  
**Logical API:** GET /filings/{id}/versions/{version}/preview. **Data entities:** XBRLFact,XBRLContext,FilingVersion. **Required action grant:** ViewFiling. **Trace TC:** TC-039,051.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-016 — Generate XBRL Package

**Audience (SRS):** Preparer/Filing Officer.. **Primary data/fields:** obligation, approved statement, taxonomy, rules, version, hash.. **User actions:** generate diagnostic draft; prepare an immutable candidate package for SCR-017 review; finalize only the already-approved byte-identical candidate; download/export after finalization..  
**Blockers:** candidate file hash and validation input hash must exactly match approved hashes; finalization must never rewrite the approved bytes; any modification creates a new version and triggers revalidation/reapproval.. **Next routes:** SCR-017 approval first, then SCR-018 submission..  
**Screen pattern / scroll owner (proposal):** Package workflow; page. **Presentation:** Draft/candidate then finalize only after exact approval.  
**Logical API:** POST /filings/{id}/packages/draft; POST /filings/{id}/packages/candidate; POST /filings/{id}/packages/finalize (only after hash-bound approval). **Data entities:** XBRLPackage,FilingVersion,Approval. **Required action grant:** GeneratePackage,ExportPackage. **Trace TC:** TC-010,013,031,051,061.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-017 — Regulatory Filing Approval Inbox

**Audience (SRS):** CFO/Signatory.. **Primary data/fields:** obligation, package hash, validation, reviewer comments, evidence.. **User actions:** approve exact immutable candidate version/hash; reject; request changes..  
**Blockers:** SoD; stale validation/input/file hash rejected; signing authority.. **Next routes:** SCR-016 finalize approved candidate without byte changes, then SCR-018 submission..  
**Screen pattern / scroll owner (proposal):** Filing approval queue; grid. **Presentation:** Candidate hash/version signoff; reuse core approvals.  
**Logical API:** GET /filing-approvals; POST /filing-approvals/{id}/decision. **Data entities:** Approval,XBRLPackage,FilingVersion. **Required action grant:** ApprovePackage. **Trace TC:** TC-029,042,054,061.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-018 — Submission Register

**Audience (SRS):** Filing Officer.. **Primary data/fields:** package, portal channel, operator, reference, receipt, decision.. **User actions:** export; record upload; reconcile; resubmit..  
**Blockers:** acknowledgment not acceptance; unknown outcome blocks retry.. **Next routes:** 037..  
**Screen pattern / scroll owner (proposal):** Submission register; grid. **Presentation:** Acknowledgement distinct from acceptance.  
**Logical API:** GET /submissions; POST /submissions. **Data entities:** Submission,Receipt,FilingVersion. **Required action grant:** RecordSubmission. **Trace TC:** TC-014,015,034.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-019 — Audit Trail Viewer

**Audience (SRS):** Auditor/Admin.. **Primary data/fields:** entity, actor, time range, event, before/after, evidence.. **User actions:** filter; inspect; export authorized..  
**Blockers:** append-only; sensitive redaction; scope enforcement.. **Next routes:** 034..  
**Screen pattern / scroll owner (proposal):** Audit history; table. **Presentation:** Scoped immutable record and controlled export.  
**Logical API:** GET /audit-events. **Data entities:** AuditLog. **Required action grant:** ViewAudit. **Trace TC:** TC-016,038.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-020 — Report Centre

**Audience (SRS):** Accountant/Management.. **Primary data/fields:** report ID, company, branch, period, currency, filters.. **User actions:** run; drill; export; schedule if entitled..  
**Blockers:** report contract, cutoff, role, no cross-tenant exports.. **Next routes:** 002/009..  
**Screen pattern / scroll owner (proposal):** Report centre; results grid. **Presentation:** Compact shared filters with SCR-038.  
**Logical API:** GET /reports; POST /reports/{id}/run; POST /reports/{id}/export. **Data entities:** ReportDefinition,ReportRun. **Required action grant:** RunReport,ExportReport. **Trace TC:** TC-004,005,045.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-021 — Company Onboarding Wizard

**Audience (SRS):** Company Admin.. **Primary data/fields:** legal profile, entity type, currency, fiscal year, COA, opening balances.. **User actions:** save step; resume; activate..  
**Blockers:** mandatory steps; opening balance tie; no guessed regulator status.. **Next routes:** 003/023/022..  
**Screen pattern / scroll owner (proposal):** Onboarding wizard; page. **Presentation:** Resume draft, progress and activation blockers.  
**Logical API:** POST /onboarding/drafts; POST /onboarding/{id}/activate. **Data entities:** Tenant,Company,FiscalYear,Account. **Required action grant:** ActivateCompany. **Trace TC:** TC-030.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-022 — Users, Roles & Approval Matrix

**Audience (SRS):** Admin.. **Primary data/fields:** user, company/branch scope, role, actions, thresholds, MFA.. **User actions:** invite; assign; revoke; approve policy..  
**Blockers:** least privilege; SoD; no orphan approval.. **Next routes:** 033..  
**Screen pattern / scroll owner (proposal):** Roles/approval matrix; grid. **Presentation:** Scoped grants, MFA and no self-escalation.  
**Logical API:** GET/PUT /memberships; GET/PUT /role-grants. **Data entities:** User,Membership,Role,Permission,ApprovalPolicy. **Required action grant:** ManageRoles. **Trace TC:** TC-020,029.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-023 — Fiscal Years, Currency & Periods

**Audience (SRS):** Admin/Finance.. **Primary data/fields:** fiscal year, period, base currency, rate source, lock status.. **User actions:** create; configure; lock; request reopen..  
**Blockers:** no overlap; closed periods protected; rate policy approval.. **Next routes:** 032..  
**Screen pattern / scroll owner (proposal):** Fiscal/period config; list. **Presentation:** Lock and reopen permission-sensitive flows.  
**Logical API:** GET/POST /fiscal-years; POST /periods/{id}/lock. **Data entities:** FiscalYear,Period,ExchangeRatePolicy. **Required action grant:** ManagePeriods. **Trace TC:** TC-003,022.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-024 — Journal List/Posting History

**Audience (SRS):** Accountant/Finance.. **Primary data/fields:** voucher no, status, date, source, amount, user.. **User actions:** search; open; reverse via authorized flow..  
**Blockers:** no edit of posted; scope and pagination.. **Next routes:** 005..  
**Screen pattern / scroll owner (proposal):** Journal history; grid. **Presentation:** Search/read-only posted, authorized reverse link.  
**Logical API:** GET /journals; GET /journals/{id}. **Data entities:** JournalHeader,JournalLine. **Required action grant:** ViewJournal. **Trace TC:** TC-021.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-025 — Customer Receipts & Allocation

**Audience (SRS):** Accountant.. **Primary data/fields:** customer, receipt, bank/cash, invoices, applied/unapplied amounts.. **User actions:** record; allocate; refund; reverse..  
**Blockers:** no over-allocation; AR control reconciliation.. **Next routes:** 026/031..  
**Screen pattern / scroll owner (proposal):** Receipt allocation; invoice allocation grid. **Presentation:** Available and remaining amounts without duplicate collection.  
**Logical API:** POST /receipts; POST /receipts/{id}/allocate. **Data entities:** Receipt,ReceiptAllocation,JournalHeader. **Required action grant:** AllocateReceipt. **Trace TC:** TC-023.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-026 — Customer Ledger/Credit Notes

**Audience (SRS):** Accountant/Sales.. **Primary data/fields:** customer, period, invoices, receipts, credits, ageing.. **User actions:** view; issue credit; allocate; export..  
**Blockers:** original invoice linkage; cutoff reconciliation.. **Next routes:** 006/025..  
**Screen pattern / scroll owner (proposal):** Customer ledger; table. **Presentation:** As-of totals and linked credits.  
**Logical API:** GET /customers/{id}/ledger; POST /sales-credit-notes. **Data entities:** Customer,SalesDocument,ReceiptAllocation. **Required action grant:** IssueCreditNote. **Trace TC:** TC-023,025.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-027 — Supplier Payment & Allocation

**Audience (SRS):** Accountant.. **Primary data/fields:** supplier, bank, bills, advance, applied/unapplied.. **User actions:** record; allocate; reverse..  
**Blockers:** AP control tie; no duplicate payment.. **Next routes:** 028/031..  
**Screen pattern / scroll owner (proposal):** Supplier payment allocation; bill grid. **Presentation:** Control outstanding and bank access.  
**Logical API:** POST /supplier-payments; POST /supplier-payments/{id}/allocate. **Data entities:** SupplierPayment,PaymentAllocation. **Required action grant:** AllocatePayment. **Trace TC:** TC-024.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-028 — Supplier Ledger/Credit Notes

**Audience (SRS):** Accountant/Purchase.. **Primary data/fields:** supplier, bills, payments, credits, ageing.. **User actions:** view; credit; reconcile..  
**Blockers:** original bill linkage; period controls.. **Next routes:** 007/027..  
**Screen pattern / scroll owner (proposal):** Supplier ledger; table. **Presentation:** Credits/ageing and AR/AP tie-out.  
**Logical API:** GET /suppliers/{id}/ledger; POST /purchase-credit-notes. **Data entities:** Supplier,PurchaseDocument,PaymentAllocation. **Required action grant:** IssueSupplierCredit. **Trace TC:** TC-024.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-029 — Items, Warehouses & Stock Ledger

**Audience (SRS):** Inventory.. **Primary data/fields:** SKU, UOM, barcode, warehouse, cost policy, batches.. **User actions:** create; deactivate; view movements..  
**Blockers:** unique SKU; valuation trace; no posted deletion.. **Next routes:** 030..  
**Screen pattern / scroll owner (proposal):** Inventory master/stock ledger; table. **Presentation:** Quantity vs value and warehouse scope.  
**Logical API:** GET/POST /items; /warehouses; GET /stock-ledger. **Data entities:** Item,Warehouse,StockLedger,CostLayer. **Required action grant:** ManageInventory. **Trace TC:** TC-025,026.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-030 — Goods Receipt/Transfer/Stock Count

**Audience (SRS):** Inventory.. **Primary data/fields:** item, from/to, qty, UOM, cost, reason, count variance.. **User actions:** receive; transfer; count; submit; post..  
**Blockers:** no illegal negative stock; no cross-company shortcut; idempotent.. **Next routes:** 029/033..  
**Screen pattern / scroll owner (proposal):** Receipt/count/transfer; line grid. **Presentation:** UOM, variance and branch checks.  
**Logical API:** POST /goods-receipts; /stock-transfers; /stock-counts. **Data entities:** GoodsReceipt,StockMovement,StockCount. **Required action grant:** PostStockMovement. **Trace TC:** TC-025,026,041.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-031 — Cash & Bank Registers

**Audience (SRS):** Accountant.. **Primary data/fields:** account, transaction type, date, amount, reference.. **User actions:** receipt; payment; transfer; import statement..  
**Blockers:** balanced posting; duplicate prevention; permissions.. **Next routes:** 008..  
**Screen pattern / scroll owner (proposal):** Cash/bank register; table. **Presentation:** Authorized register and transfers.  
**Logical API:** GET /cash-bank-registers; POST /bank-transfers. **Data entities:** BankAccount,CashBankTransaction,JournalHeader. **Required action grant:** ManageCashBank. **Trace TC:** TC-027.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-032 — Period Closing Checklist

**Audience (SRS):** Finance Manager.. **Primary data/fields:** period, checklist, reconciliations, blockers, exceptions.. **User actions:** run; assign; close; request reopen..  
**Blockers:** all blocking checks; independent approval; invalidate downstream.. **Next routes:** 009/033..  
**Screen pattern / scroll owner (proposal):** Closing checklist; page. **Presentation:** Phase-1 minimum checks/locks, Phase-2 rich exceptions.  
**Logical API:** GET /periods/{id}/close-checklist; POST /periods/{id}/close. **Data entities:** Period,CloseChecklist,Reconciliation. **Required action grant:** ClosePeriod. **Trace TC:** TC-022,027,045.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-033 — Unified Approval Inbox

**Audience (SRS):** Approvers.. **Primary data/fields:** document type, maker, version, amount, scope, evidence.. **User actions:** approve; reject; request changes; delegate if permitted..  
**Blockers:** no self-approval; stale version; threshold.. **Next routes:** source screen..  
**Screen pattern / scroll owner (proposal):** Unified approval inbox; grid. **Presentation:** Shared approval source with SCR-017.  
**Logical API:** GET /approvals; POST /approvals/{id}/decision. **Data entities:** Approval,ApprovalPolicy. **Required action grant:** ApproveScopedAction. **Trace TC:** TC-029,042.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-034 — Auditor Workspace & Evidence

**Audience (SRS):** Auditor.. **Primary data/fields:** engagement, scope, evidence, comment, request, sign-off.. **User actions:** review; comment; request evidence; export..  
**Blockers:** engagement expiry; no implicit filing approval.. **Next routes:** 019/015..  
**Screen pattern / scroll owner (proposal):** Auditor evidence; table. **Presentation:** Scoped, expiring read/review engagement.  
**Logical API:** GET /engagements; POST /evidence-requests. **Data entities:** AuditEngagement,EvidenceRequest,DisclosureAttachment. **Required action grant:** ReviewEvidence. **Trace TC:** TC-038,047.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-035 — Integration Job History & Failures

**Audience (SRS):** Admin/Operations.. **Primary data/fields:** source, event ID, batch, status, error, reconciliation.. **User actions:** inspect; retry safe; resolve; download log..  
**Blockers:** idempotent; atomic posting; no secret leakage.. **Next routes:** source document..  
**Screen pattern / scroll owner (proposal):** Integration jobs; table. **Presentation:** Safe retry of stable event IDs.  
**Logical API:** GET /integration-jobs; POST /integration-jobs/{id}/retry. **Data entities:** IntegrationJob,InboundEvent,DeadLetter. **Required action grant:** RetryIntegration. **Trace TC:** TC-019,044.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-036 — Filing Workspace Wizard

**Audience (SRS):** XBRL/Filing Officer.. **Primary data/fields:** obligation, source snapshot, taxonomy, mappings, validation, package.. **User actions:** step through; save; resume; hand off..  
**Blockers:** preconditions enforced; stale version invalidated.. **Next routes:** 010–018..  
**Screen pattern / scroll owner (proposal):** Filing wizard; page. **Presentation:** Step-dependent validity and saved version.  
**Logical API:** GET/POST /filing-workspaces; POST /filings/{id}/prepare. **Data entities:** FilingObligation,FilingVersion,StatementVersion. **Required action grant:** PrepareFiling. **Trace TC:** TC-031,032,049,063.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-037 — Filing Receipt & Status Reconciliation

**Audience (SRS):** Filing Officer.. **Primary data/fields:** portal ref, operator, receipt, status evidence, version.. **User actions:** record; verify; reject; resubmit..  
**Blockers:** ack vs accepted; unknown outcome; immutable history.. **Next routes:** 018..  
**Screen pattern / scroll owner (proposal):** Filing receipt review; detail/document. **Presentation:** Immutable receipt and verified decision.  
**Logical API:** POST /submissions/{id}/receipts; POST /submissions/{id}/reconcile. **Data entities:** Submission,Receipt,RegulatorDecision. **Required action grant:** ReconcileSubmission. **Trace TC:** TC-034,035,043,048.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.

### SCR-038 — Report Definition/Filter Panel

**Audience (SRS):** Report users/Admin.. **Primary data/fields:** report ID, scope, cutoff, comparison, columns, export.. **User actions:** apply; save authorized preset; run..  
**Blockers:** role filtering; formula and source version.. **Next routes:** 020..  
**Screen pattern / scroll owner (proposal):** Report filter panel; panel. **Presentation:** Shared filters with SCR-020, not second reporting backend.  
**Logical API:** GET/PUT /report-definitions/{id}; POST /reports/{id}/run. **Data entities:** ReportDefinition,ReportRun. **Required action grant:** ConfigureReport. **Trace TC:** TC-005,045.  
**Still to approve:** exact field JSON/type/min/max/required/conditional/default, locale/RTL labels, status transition matrix, payload permissions, focus/error handling, desktop and mobile wireframe, all test data and measured scroll/latency behavior.


## 3. Phase-1 priority exact field/schema prototypes (awaiting approval)

These are candidate typed forms to expose questions BEFORE code. Fields marked `Decision OPEN` must not silently default. Each form reuses one shared form grid, data grid, numeric/currency/period picker, validation summary and authorized action bar.

### SCR-001 Login / MFA

| Field | Candidate type | Required/conditional | Validation and behavior |
| --- | --- | --- | --- |
| Username/email | string | Required only if local/approved IdP form | Trim, normalize consistently; error does not enumerate accounts |
| Password | secret text | Local auth only; OIDC redirects instead | Never log or store plaintext; provider contract OPEN |
| Language | EN / AR selector | Optional user preference | RTL sign-in and accessibility |
| MFA challenge | one-time code / provider redirect | Conditional per security role/policy | Expiry, replay denial, attempt budget, no MFA bypass |
| Recovery | secure challenge flow | Conditional | Non-enumerating feedback; recovery tokens single-use |
| Actions | Sign in / Recover / Verify | Permissionless login vs post-auth context | No SaveDraft; session never leaks other tenant |

**Must decide:** external OIDC vs local identity; lockout/recovery strategy and UI are not implementable as arbitrary password screen until Security signs.

### SCR-003 Company & Branch Master and SCR-021 Onboarding

| Field | Candidate type | Required / scoped | Validation |
| --- | --- | --- | --- |
| Legal company name EN/AR | text, character limits to agree | Required fields per legal customer segment | No silent identity overwrite after activation; audit |
| CR/registration no | text, legal-format policy | Jurisdiction-dependent | uniqueness scope and authority verification decision |
| Legal jurisdiction / company type | controlled list | Required | Controls eligibility/filing only after compliance signoff |
| Functional currency | ISO currency code | Required for activation | Once posted, correction policy; KWD first not hardcoded to all companies |
| Branch code/name | short text | Branch-enabled companies | Unique within company, never reassign posted identity |
| Fiscal year / periods | date ranges | Required before posting | No overlapping periods, approval for reopening |
| Opening balances | decimal rows | Required if applicable to migration/onboarding | Balanced and sourced with audit evidence |
| Actions | Save draft → Review → Activate | Company Admin, maker-checker per policy | Activation blockers shown; no half-enabled financial posting |

**Layout:** 2-column concise master; onboarding can be multi-step with meaningful full-page scroll and explicit resume. One global company selector (not repeated in every card).

### SCR-004 Chart of Accounts

| Field | Candidate type | Required | Validation |
| --- | --- | --- | --- |
| Account code | short string | Required | Unique per approved company/branch COA scope |
| Names EN/AR | bounded text | EN required; AR per localization signoff | Preserve both in RTL rendering |
| Parent account | scoped ID selector | Optional | No cycles, cross-company parent or child posting under policy |
| Account type / normal balance | enum | Required | Changing type for posted account forbidden/reclassification controlled |
| Postable / Active | boolean | Required | Posted historical account ID never deleted |
| Optional currency/dimensions | approved selectors | Conditional | effective-date and allowed control account rules |

**Layout:** COA tree scroll within one clearly defined pane; selected account editor stays compact. No giant cards or separate duplicated create/edit screens.

### SCR-005 Journal Voucher

| Field | Candidate type | Required | Validation |
| --- | --- | --- | --- |
| Period & posting date | scoped ID + date | Required | Open period; race-checked inside commit transaction |
| Voucher number | server-generated text | At issuance/posting per signed numbering | Unique company/fiscal series, auditable void |
| Journal line account | company-scoped account ID | Every line | Active, postable and permission scoped |
| Debit / Credit | decimal string | Each line, policy controls zero rules | Must balance in functional currency; never JS float |
| Currency/rate | ISO currency + approved FX rate | Conditional | Currency-specific rounding, audited source/rate date |
| Dimensions/evidence/memo | scoped reference/text | Conditional | File permissions, size limits, audit |
| Actions | Save Draft, Submit, Approve (separate role), Post, Reverse | Only allowed lifecycle states | No duplicate post, no edit of posted lines |

**Layout:** compact header + line grid as the sole internal scroll owner, sticky net difference and authorized actions. If 200% zoom or long error content needs page scrolling, permit it rather than clipping.

### SCR-006 Sales Invoice / SCR-007 Supplier Bill

| Field | Type | Validation / requirement |
| --- | --- | --- |
| Party & company/branch | scoped reference | No cross-company customer/supplier selection |
| Document no/date/due date | server/typed | Unique/duplicate detection and correct fiscal cutoff |
| Line item, quantity/UOM, price, discount | decimal and selector | Unit precision, nonnegative/returns policy, arithmetic exact |
| Tax and jurisdiction | conditional | No presumed Kuwait VAT default |
| Receipt/GRN match | optional/required per source | No duplicate COGS/GRNI recognition |
| Approval/issue/posting state | server-authoritative enum | Signed Finance posting event and SoD grants |
| Source/credit/return links | immutable refs | Auditable correction and allocation |

**Layout:** one toolbar, compact party/dates, one line-items grid, totals sticky where practical. No duplicated invoice/bill business posting engine.

### SCR-008 Bank Reconciliation / SCR-031 Cash Bank

Statement cutoff, currency and authorized bank account must be scoped; import source hash, duplicate statement line identity, match/unmatch rules and unapplied balances need exact fixtures. One statement grid scroll, visible difference + finalize action only when permitted. Bank connections are not assumed; file import first by approved format.

### SCR-020 / SCR-038 Reports

Shared ReportFilterPanel, company/period cutoffs, approval state and export rights. Large output is asynchronous with job status, versioned result and role check on download. The 58 report formulas are **OPEN** and no generated report is automatically filing-ready.

### SCR-016 / SCR-017 / SCR-018 / SCR-037 XBRL workflow

One filing workbench shows provisional diagnostic vs approved frozen candidate; candidate bytes/hash signed by authorized approver; finalization keeps SAME immutable bytes. Transmission/acknowledgment/acceptance are separate statuses; stale hash or UnknownOutcome blocks a success label. CMA forms/portals depend on official DEC-002/003 evidence.

## 4. Universal compact design acceptance

- Desktop starting layout at 1366×768, 1440×900, 1920×1080, zoom 100/125/200%; inspect 320/375px mobile, EN/AR RTL; compact 36–40px desktop inputs, 8–12px field spacing and 2-column short forms as proposed tokens only.
- On a typical short up-to-8-field master, title, required fields and Save/Cancel should fit without gratuitous whole-page vertical scrolling at 1366×768 100%. Do not hide required fields, actions, validation, zoom content or long Arabic strings to force an arbitrary no-scroll claim.
- Scroll ownership is one workspace body OR one bounded grid body; no page+modal+table nested vertical scroll trap. Keyboard focus-to-error and visible sticky actions/totals must remain reachable.
- Server-side sorting/filtering/pagination and bounded DOM rendering for 10k+ matches; no front-end sorting of 10M journal records; stable ties; abort stale company switch requests.
- Use single reusable AppShell, ContextSwitcher, FormField, ScopedDataGrid, ApprovalActionBar, ErrorSummary, ReportFilterPanel and StatusLabel only when screen usage justifies them.
- Capture **actual user-approved prototype and screenshot evidence** before marking any screen `DESIGN REVIEWED`. Browser/RTL/200% zoom/scroll simulations remain NOT RUN.

## 5. UX signoff record (must be filled by owner)

| Field | Value |
| --- | --- |
| Design owner | OPEN |
| Approved frontend stack/components | OPEN D-01 |
| Approved brand reference, fonts, tokens | OPEN |
| Screen×edition×role×phase routing | OPEN DEC-001 |
| Screen-specific typed field and error schemas | OPEN |
| UX clickthrough and zoom/mobile/RTL evidence | NOT EXECUTED |
| Changed SRS/DEV links | SRS E/I, DEV-02, GAP-04/05/06/23 |
| Ticket scope | GitHub #4 and #7 |

