# DEV-01 — Functional modules and workflows

Status: ENGINEERING DRAFT (Specified, not approved or implemented). Updated 19 Nov 2026.
Source: https://docs.google.com/document/d/1dSqHsbTAVxkspvMRuhlycEJUCVZgCxvEG1hWBSmvuZA/edit
Branch: development only. Boss-owned original SRS is untouched.
Evidence: repository currently has only minimal .NET 10 health endpoint, not working financial or UI modules.

## Ownership and acceptance
Each user flow needs a single source-of-record, edition/role/action scope, legal company/branch, entry and completion states, save/approval/posting semantics, linked documents, exception recovery and test fixture. Approving an invoice is not by itself financial recognition. Duplicate business logic or duplicate screens are not permitted. Missing dedicated screen coverage for quotations, purchase orders, expenses, assets, budget and party masters must be reconciled before implementation.

## Accounting modules
4. Functional Modules – Accounting Core
4.1 Company and Organization Setup
Create tenant, legal entity, trade name, legal form, commercial registration number, tax identifiers if applicable, address, contacts, logo and reporting language.
Maintain multiple companies, branches, departments, cost centres and locations.
Configure base currency (KWD initially), additional currencies, exchange-rate source/manual rates and rounding precision.
Set fiscal year, accounting period, period lock dates, financial statement basis and chart-of-accounts template.
Maintain Arabic and English names for masters and print templates.
4.2 Chart of Accounts (COA)
Support hierarchical account groups and ledger accounts with unique account codes.
Account attributes: account name Arabic/English, account type, normal balance, parent, control account, cash/bank flag, tax treatment, currency and active status.
Allow opening balances, account mapping to financial statement lines and XBRL taxonomy concepts.
Prevent deletion or historical ID reassignment of accounts with posted transactions; allow inactivation and approved effective-dated account presentation/ledger reclassification. Any merge must keep original posted journal AccountIds, legal audit lineage and historically reproducible reports; reclassification is a separate documented posting or mapping event, never an in-place rewrite.
4.3 General Ledger
Double-entry journal vouchers with debit/credit validation and balanced totals.
Voucher types: Journal, Opening, Adjustment, Accrual, Prepayment, Depreciation, Reversal and Closing.
Auto-numbering by company, branch, financial year and voucher type.
Draft edit/cancel permissions, immutable posted entries, linked reversal/adjustment journals, attachments, narration, dimensions and maker-checker approval.
Full audit trail: creator, editor, approver, timestamp, source module and before/after values.
4.4 Accounts Receivable (AR)
Customer master, credit limit, payment terms, currency, contacts and opening balances.
Sales invoices, credit notes, debit notes, receipts, allocation, advance receipts and customer statements.
Ageing buckets, overdue alerts, customer ledger and collection follow-up.
4.5 Accounts Payable (AP)
Supplier master, payment terms, bank details, currency and opening balances.
Purchase invoices, debit/credit notes, supplier payments, advances and allocation.
Supplier ageing, due-date calendar, payment advice and supplier statement reconciliation.
4.6 Sales and Billing
Quotation, sales order, delivery note, invoice, credit note and receipt workflow.
Item/service lines, quantity, unit, price, discount, charges, tax configuration, cost centre and project.
Support counter sales and integration with Keifac POS/e-commerce where enabled.
Invoice print/email/PDF; Arabic-English layouts; configurable numbering and terms.
4.7 Purchase and Procurement
Purchase request, purchase order, goods receipt, supplier invoice, purchase return and payment.
Three-way matching (PO, goods receipt and supplier invoice) where configured.
Purchase price variance and supplier performance reports.
4.8 Inventory and Costing
Item/category/brand/UOM/barcode masters, warehouses, branches and stock locations.
Goods receipt, issue, transfer, adjustment, stock count, expiry/batch/serial tracking where required.
Costing method configurable (weighted average/FIFO subject to accounting policy); valuation ledger.
Inventory valuation, slow-moving, reorder, stock movement and gross-margin reporting.
4.9 Cash and Bank Management
Cash accounts, bank accounts, petty cash, deposits, withdrawals, transfers and cheque register.
Bank statement import (CSV/Excel/approved bank feed), matching rules, reconciliation and unmatched items.
Cash flow classification and cash/bank position dashboards.
4.10 Expenses and Fixed Assets
Expense claims, expense vouchers, recurring expenses, approvals and supporting documents.
Asset register, asset category, acquisition, capitalization, depreciation method/life, disposal and impairment.
Depreciation journal generation and fixed asset movement reports.
4.11 Budget and Cost Centre
Annual and monthly budgets by account, department, branch, project and cost centre.
Budget revisions, approval, actual-versus-budget analysis and variance alerts.
4.12 Period-End and Year-End Closing
Trial balance review, accruals, prepayments, depreciation, inventory valuation and foreign currency revaluation.
Suspense account review, retained earnings transfer, closing journals and opening balance carry-forward.
Pre-close checklist, maker-checker approval, period lock and controlled reopening.

## Users and grants
3. User Types and Permissions
Role
Main permissions
Super Administrator
Tenant provisioning, subscription, global settings, feature flags, jurisdiction packs and support access under audit.
Company Administrator
Company profile, branches, users, roles, fiscal years, approval matrix and integrations.
Accountant
Masters, vouchers, journals, invoices, receipts, payments, bank reconciliation and draft reports.
Chief Accountant / Finance Manager
Review postings, close periods, approve journals, lock periods and approve financial statements.
CFO / Authorized Signatory
Final review and approval of financial statements, disclosures and filing packages.
XBRL Preparer
Taxonomy mapping, contexts, facts, notes, validation and XBRL package generation.
Auditor / External Reviewer
Read-only access to assigned financial records and evidence; controlled permission to add review comments, request corrections and record authorized review sign-off.
Regulatory Filing Officer
Prepare submission, upload/export package, record regulator reference and receipt; submit only if authorized and technically supported.
Inventory / Sales / Purchase User
Operational transactions within assigned branches and permission limits.
Read-only Management
Dashboards and reports without editing or posting rights.
Permissions must support company, branch, financial year, module, transaction type, amount threshold and data visibility. Sensitive actions require maker-checker approval.

## User journeys
10. Key End-to-End Workflows
10.1 Daily Accounting Workflow
Create sales, purchase, receipt, payment and expense transactions.
System creates balanced accounting entries based on approved posting rules.
Accountant reviews ledger, tax treatment, dimensions and supporting documents.
Authorized reviewer approves exceptions and high-value transactions.
Posted transactions update trial balance and management reports.
10.2 Period-End Financial Reporting Workflow
Select company, financial year and reporting period.
Run pre-close checklist: bank reconciliation, AR/AP, inventory, fixed assets and suspense accounts.
Post accruals, prepayments, depreciation and approved adjustments.
Generate trial balance and draft financial statements.
Finance manager reviews statements, notes and comparative figures.
CFO/authorized signatory approves and locks the reporting snapshot.
10.3 XBRL Filing Workflow
Select regulator, entity profile, filing type and reporting period.
Load the taxonomy version and filing template effective for that filing.
Pull approved financial statements and disclosure data from the accounting database.
Apply approved account-to-concept mappings and build contexts, units and dimensions.
Resolve unmapped concepts and missing mandatory facts.
Run schema, taxonomy, calculation, context and regulator business-rule validation.
Prepare validation report and human-readable XBRL preview.
Generate a draft XBRL package and human-readable rendering from the frozen validated source; send that exact version/hash for auditor/finance review and authorized sign-off.
After approval, lock the approved package and its hash; any source, mapping, taxonomy, disclosure or generated-file change creates a new version requiring validation and reapproval.
Submit through approved regulator channel or use controlled manual portal-assisted filing.
Record regulator receipt, status and rejection reasons; create a new version for corrections.

## Blockers
DEC-001 business edition, DEC-004 recognition, DEC-005 stock costing, DEC-006 FX, DEC-007 POS and consolidation scope, DEC-009 approval, D-10 company structure. All OPEN until business owner signs. Do not label workflows implemented based on specification.
