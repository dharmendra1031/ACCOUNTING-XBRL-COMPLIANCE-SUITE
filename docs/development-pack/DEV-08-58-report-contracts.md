# DEV-08 — 58 report definitions, lineage and reconciliation

Keifac Accounting & XBRL Compliance Suite | Engineering documentation, 19 November 2026
Status: SPECIFIED / OPEN for owner sign-off unless explicitly noted. None of these specifications is proof of implementation or tests.
Source: https://docs.google.com/document/d/1dSqHsbTAVxkspvMRuhlycEJUCVZgCxvEG1hWBSmvuZA/edit
Git branch: development. Original boss-owned SRS is unchanged.

## Report catalogue and status
Each entry below is a required report type from SRS. Name/contents are **Specified only**. None has a verified implementation formula, query, executable fixture or reconciled output yet. Do not generate invented values.

| Report ID | Name | SRS contents | Contract status |
|---|---|---|---|
| ACC-001 | Chart of Accounts Listing | Account code, Arabic/English name, parent, type, status | Formula/fixture OPEN |
| ACC-002 | General Ledger | Opening, debit, credit, closing balance, voucher drill-down | Formula/fixture OPEN |
| ACC-003 | Trial Balance | Opening debit/credit, period movement, closing debit/credit | Formula/fixture OPEN |
| ACC-004 | Balance Sheet / Statement of Financial Position | Assets, liabilities, equity; current/prior period | Formula/fixture OPEN |
| ACC-005 | Profit & Loss / Statement of Profit or Loss | Revenue, cost, gross profit, expenses, net profit | Formula/fixture OPEN |
| ACC-006 | Cash Flow Statement | Operating, investing, financing cash flows | Formula/fixture OPEN |
| ACC-007 | Statement of Changes in Equity | Opening equity, movements, closing equity | Formula/fixture OPEN |
| ACC-008 | Notes to Financial Statements | Notes, policies, supporting schedules | Formula/fixture OPEN |
| ACC-009 | Accounts Receivable Ageing | Customer balances by ageing bucket | Formula/fixture OPEN |
| ACC-010 | Accounts Payable Ageing | Supplier balances by ageing bucket | Formula/fixture OPEN |
| ACC-011 | Customer Statement | Invoices, receipts, credits and outstanding | Formula/fixture OPEN |
| ACC-012 | Supplier Statement | Bills, payments, credits and outstanding | Formula/fixture OPEN |
| ACC-013 | Sales Register | Invoice, customer, item, tax, net and gross amount | Formula/fixture OPEN |
| ACC-014 | Purchase Register | Supplier, invoice, item, tax, net and gross amount | Formula/fixture OPEN |
| ACC-015 | Cash Book | Cash receipts, payments and running balance | Formula/fixture OPEN |
| ACC-016 | Bank Book | Bank transactions and running balance | Formula/fixture OPEN |
| ACC-017 | Bank Reconciliation Statement | Statement lines, matched and unmatched entries | Formula/fixture OPEN |
| ACC-018 | Expense Analysis | Expense category, department, branch and period | Formula/fixture OPEN |
| ACC-019 | Inventory Valuation | Quantity, cost, valuation method and value | Formula/fixture OPEN |
| ACC-020 | Stock Movement | Opening, receipt, issue, transfer and closing | Formula/fixture OPEN |
| ACC-021 | Fixed Asset Register | Asset cost, accumulated depreciation and net book value | Formula/fixture OPEN |
| ACC-022 | Depreciation Schedule | Period depreciation and closing carrying amount | Formula/fixture OPEN |
| ACC-023 | Budget vs Actual | Budget, actual, variance and variance percentage | Formula/fixture OPEN |
| ACC-024 | Foreign Currency Gain/Loss | Currency, rate, revaluation and realized/unrealized gain/loss | Formula/fixture OPEN |
| ACC-025 | Journal Voucher Register | Voucher, date, narration, debit, credit and approval | Formula/fixture OPEN |
| ACC-026 | Financial Ratios Dashboard | Liquidity, leverage, profitability and efficiency ratios | Formula/fixture OPEN |
| ACC-027 | Profitability by Branch / Cost Centre | Revenue, cost, expenses and contribution | Formula/fixture OPEN |
| ACC-028 | Year-End Closing Checklist | Pending journals, reconciliations, approvals and locks | Formula/fixture OPEN |
| XBRL-001 | XBRL Filing Calendar | Entity, regulator, filing type, period, due date, owner, status | Formula/fixture OPEN |
| XBRL-002 | Regulatory Entity Profile | Legal identifiers, entity category, contacts, regulator registration | Formula/fixture OPEN |
| XBRL-003 | Taxonomy Version Register | Taxonomy, namespace, version, effective dates and status | Formula/fixture OPEN |
| XBRL-004 | Chart of Accounts to XBRL Mapping | Source account, target concept, dimension, unit and approval | Formula/fixture OPEN |
| XBRL-005 | Financial Statement Mapping Report | Statement line, mapped concept, source and mapping status | Formula/fixture OPEN |
| XBRL-006 | Unmapped Concepts / Accounts Report | Unmapped, ambiguous, inactive and missing mapping items | Formula/fixture OPEN |
| XBRL-007 | XBRL Fact Register | Concept, context, unit, value, dimensions and source | Formula/fixture OPEN |
| XBRL-008 | Context and Unit Validation Report | Entity, period, instant/duration, unit and dimension checks | Formula/fixture OPEN |
| XBRL-009 | XBRL Validation Error Report | Rule ID, severity, fact, error message and correction | Formula/fixture OPEN |
| XBRL-010 | XBRL Warning & Exception Report | Warnings, acknowledgement, owner and resolution | Formula/fixture OPEN |
| XBRL-011 | XBRL Calculation Consistency Report | Calculation relationship, expected value, actual value and difference | Formula/fixture OPEN |
| XBRL-012 | XBRL Generation Register | File name, taxonomy version, hash, generated by and timestamp | Formula/fixture OPEN |
| XBRL-013 | XBRL Filing Summary Report | Filing status, item count, mapped/unmapped, validation and package details | Formula/fixture OPEN |
| XBRL-014 | Regulatory Disclosure Checklist | Required disclosures, status, evidence and responsible user | Formula/fixture OPEN |
| XBRL-015 | Financial Position XBRL Report | Tagged assets, liabilities and equity with comparative periods | Formula/fixture OPEN |
| XBRL-016 | Profit or Loss XBRL Report | Tagged income, expenses and profit/loss facts | Formula/fixture OPEN |
| XBRL-017 | Cash Flow XBRL Report | Tagged operating, investing and financing facts | Formula/fixture OPEN |
| XBRL-018 | Changes in Equity XBRL Report | Equity movements by component and period | Formula/fixture OPEN |
| XBRL-019 | Notes & Accounting Policies Report | Narrative and tabular disclosure completeness | Formula/fixture OPEN |
| XBRL-020 | Related Party Disclosure Report | Related party, relationship, transaction and balances | Formula/fixture OPEN |
| XBRL-021 | Capital Adequacy Report Pack | Applicable regulatory capital schedules and validations | Formula/fixture OPEN |
| XBRL-022 | Exchange Disclosure Register | Disclosure event, form, approval, due date and status | Formula/fixture OPEN |
| XBRL-023 | General Assembly Filing Pack | Meeting details, agenda, documents, resolutions and status | Formula/fixture OPEN |
| XBRL-024 | Auditor Review & Sign-off Report | Review status, comments, unresolved items and sign-off | Formula/fixture OPEN |
| XBRL-025 | Regulatory Submission Receipt Report | Submission reference, date/time, portal response and receipt | Formula/fixture OPEN |
| XBRL-026 | Rejected Filing & Resubmission Report | Rejection code, reason, corrective action and resubmission version | Formula/fixture OPEN |
| XBRL-027 | Filing Audit Trail Report | All data changes, approvals, exports and submission events | Formula/fixture OPEN |
| XBRL-028 | Comparative Period Consistency Report | Current/prior period mapping and value movement | Formula/fixture OPEN |
| XBRL-029 | XBRL Readable Rendering Report | Human-readable rendering of generated facts and disclosures | Formula/fixture OPEN |
| XBRL-030 | Regulatory Compliance Dashboard | Upcoming, overdue, pending, accepted and rejected filings | Formula/fixture OPEN |

## Required signed per-report contract
For every ID define owner/release phase/edition, legal company and branch scope, fiscal period and posting cutoff, management vs approved snapshot, time zone/currency, authoritative entities and SQL query shape, formulas and sign conventions, grouping/filter/sort, comparative period, rounding/FX, drilldowns, redaction/permission, export and accessibility, reconciliation checks, reference sample with expected exact values, idempotent rerun, p95 test dataset and error/empty states. Profit and loss and cash flow reporting are not interchangeable; cash flow requires movements classification, changes in equity rollforward, ratios require agreed denominators, valuation requires cost layers.

## Snapshot and safety gates
Ledger source data and approved report must use same cutoff and mapping version; subledgers/stock/banks tie to GL; permissions checked at scheduled delivery/export; immutable approved statement linked to XBRL package. Unmapped lines do not silently become zero. ACC-001–028 and XBRL-001–030 are 58 unique titles, not 58 completed implementations.

## Related SRS report framework
B.11 Report specification contracts
REP-01: Each Section 7–8 report ID requires a functional contract: purpose, permitted audience, legal entity/branch, period, currency, report source and cutoff, calculations/sign conventions, filters, comparisons, export outputs, drill-down, generated-at/version, test fixture and reconciliation assertion. Avoid treating a report title as a complete specification.
REP-02: Trial Balance reconciles GL postings; AR/AP ageing ties to controls; Inventory Valuation ties to Stock Ledger and GL; Cash Flow requires approved movement classification; Balance Sheet and Equity statements require balance/rollforward assertions. Regulatory summary report XBRL-013 uses Appendix A and must distinguish Exported, Submitted, Acknowledged, Accepted and Rejected counts.
C-12 Reporting contracts. For each ACC-001–028 and XBRL-001–030 report, specify source-of-truth tables, filters, period cutoff, company/branch scope, currency, formula, sign convention, comparative logic, access role, export format and reconciliation assertion. Financial statement approval must bind an immutable source snapshot; changes invalidate dependent draft filings. Report scheduling must not send sensitive exports to unauthorized recipients.
RISK-G13 [OPEN REPORTING]: All 58 report IDs need individually approved source, scope, cutoff, formula, sign convention, comparative/rounding treatment, role, reconciliation and example expected outputs. Accounting policy for cash flow, equity, FX, ratios and statement-line mapping cannot be guessed from titles. A snapshot/report may be preliminary or approved; show state and freshness in UI.

## Approval needed
DEC-010 and D-08 Finance/Reporting sign-off; CMA report taxonomy/form requirements separately require DEC-002/003. Tests TC-004/005/027/045/052/057/073/079/086.

## Cross-document review corrections — 2026-11-19

**Catalogued is not implemented.** Exactly 28 ACC and 30 XBRL report IDs are listed. No report's actual SQL, statutory formula, sample expected values or official CMA fixture is approved by a title alone. The SRS report descriptions are user-facing *intent*, not ready-to-code calculations. Treat all 58 as **Specified / Formula OPEN**, not 58 mandatory Phase-1 features.

**One-page contract required for each applicable report ID before release:** owner + edition + release phase; permitted role/company/branch scope; statement basis and company financial year; period start/end + posting cutoff and timezone; source GL/subledger/stock/approved imported external statements; debit/credit normal sign and currency/FX/rounding; formula, mapping and exceptional null/nil; comparative and drilldown; reconciliation assertion with independently verified numeric fixture; export fields and redaction; running/approved snapshot version+hash; accessibility/Arabic layout; p95 dataset/profile and cancellation/job thresholds.

**Consistency invariants:** GL trial balance and report source must refer to the same immutable approved cutoff; AP/AR ageing must reconcile by identical effective date, currency, company and policy; Inventory valuation references signed cost layers; Cash flow/equity statements need separately approved classification and movement mappings; “group totals” are **not consolidated statements** absent approved elimination/FX/ownership policy. Do not display missing source/mapping as invented zero. A report generated from provisional data must be visibly marked provisional and cannot feed a final filing.

**Concurrency and export:** A long report gets an authorized job record and 202 response, then immutable output tied to requested filters/cutoff and source version; a role revocation blocks delayed delivery. Caching or aggregate tables must never skip tenant/permission/version invalidation. Finance sign-off (DEC-010/D-08) and report fixture remain OPEN, while generic reporting skeleton work can proceed without invented formulas. See SRS J-05/J-10.
