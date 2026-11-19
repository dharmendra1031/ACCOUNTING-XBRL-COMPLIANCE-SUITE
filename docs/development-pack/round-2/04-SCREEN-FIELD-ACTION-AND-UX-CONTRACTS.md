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

## 2. Screen detail source and duplication rule

The matrix above references each screen's **existing** canonical detailed paragraph in the [working SRS Appendix E](https://docs.google.com/document/d/1dSqHsbTAVxkspvMRuhlycEJUCVZgCxvEG1hWBSmvuZA/edit) and [DEV-02](../DEV-02-ui-ux-screen-contracts.md), and its logical API/permission/test in [DEV-05](../DEV-05-api-contracts.md). Do **not** duplicate the complete 38 screen narratives here: there must be **one versioned authoritative SRS narrative per screen**, while this file supplies cross-screen decisions and *additional typed acceptance rules* only.

For every screen's approval, attach explicit field definitions, conditionals, route/permission, status diagram, response examples and real clickable wireframe to its owning GitHub issue. Each screen row is still `DRAFT`. No generic "draft/save" UI is automatically applicable to login, immutable reports, history or posting.

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

## 6. Universal read-only first ID field — SRS K-07–K-11

**This modifies all 38 screen mappings conditionally:** every screen with a persisted, entity-specific Create/Edit/View/Detail form puts the record's numeric `ID` in the **first field** with one reusable `RecordIdField`. New: show an explicit non-reserved estimate, e.g. `1042 (estimated)`, never guaranteed; after Create/Save server confirmation: `1042 (confirmed)` or whatever ID SQL actually assigned. Subsequent Edit/View displays that exact numeric ID read-only. Do not add ID fields to Login, report-only filters, roleless search UI or subordinate lines without their own persisted identity. Do not allow ID to be typed, submitted as a PK, modified or reused.

The preview may be `MAX(Id)+1` only as a tentative advisory value and only with scoped authorization/indexed query proof. Multiple concurrent Create views can show the same preview, and a SQL Server `IDENTITY` can skip values. When no safe estimate is available show `Auto-generated on save`, not a fake certainty. If actual preassigned ID is required, first commit a Draft and show its persisted ID, subject to lifecycle approval.

**Business numbers stay distinct:** Journal/Invoice/Receipt serial allocation is separate and occurs under signed scoped gapless issuance policy; a draft's ID is not its voucher number. Compact layout should fit first ID field in existing form grid without extra cards and unnecessary scrolling; EN/AR, 200% zoom and screen readers must label estimated/confirmed states. Real UI/browser evidence is pending.
