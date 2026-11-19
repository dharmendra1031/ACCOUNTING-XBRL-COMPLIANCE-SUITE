# DEV-07 — External integrations, replay and job recovery

Status: ENGINEERING DRAFT (Specified, not approved or implemented). Updated 19 Nov 2026.
Source: https://docs.google.com/document/d/1dSqHsbTAVxkspvMRuhlycEJUCVZgCxvEG1hWBSmvuZA/edit
Branch: development only. Boss-owned original SRS is untouched.
Evidence: repository currently has only minimal .NET 10 health endpoint, not working financial or UI modules.

## Adapter and ownership principles
Integrations never bypass authorization, posting, inventory costing or idempotency. Each source has one named ledger publisher per business event, versioned inbound schema, stable external ID, canonical payload hash, company/branch scope, auditable processing status and control-total reconciliation. Bank/regulator API endpoints are only built when authorized specifications exist.

## Integration boundaries
13. Integration Requirements
Integration
Requirement
Keifac POS
Import posted sales summaries, taxes, discounts, tender breakdown and branch/cost-centre data; prevent duplicate imports.
Keifac ERP / Inventory
Import stock valuation, goods movements, cost of sales and inventory adjustments.
Keifac HRMS / Payroll
Import approved payroll journals, employee cost allocations and liabilities.
Banking
CSV/Excel statement import first; bank API/open banking only with bank approval and available API.
Auditor systems
Secure export of trial balance, schedules, supporting documents and XBRL review package.
CMA iFSAH
Build an adapter boundary. Use official API only if CMA provides/permits it; otherwise provide regulator-compatible package export and guided portal filing.
Other GCC regulators
Separate adapter per regulator/market; never reuse Kuwait filing rules without confirmation.
IMPORTANT: No direct ministry/regulator API, credentials, web service, endpoint or automated portal login should be invented. Integration must be based on published/authorized specifications and formal permission.

## Financial duplicate prevention
INV-03: POS import includes event ID, receipt/refund ID, branch, date, line taxes/discounts, tender and stock cost data. Post once from a clearly designated system-of-record. Duplicate source events are rejected or safely recognized as retries. A stock movement and its COGS must not be posted twice via POS and Inventory integrations.
C-14 Integrations and failure recovery. Every inbound feed has source ownership, schema/version, stable external ID, replay/idempotency policy, reconciliation totals, error queue, retry/backoff and dead-letter handling. Imported events must show Pending/Posted/Failed/NeedsReview and actionable reason. A failed import must never leave half-posted journals or stock movements.
RISK-G17 [CLARIFIED]: Each integration records source-of-truth, immutable event ID, schema version, payload hash, company/branch scope, imported count and control totals, failures/unknown outcome and retry state. Implement bounded, idempotent retry and operator reconciliation; never mark Failed→Posted without committed ledger/stock evidence.

## Processing/recovery contract
Pending→Validated/NeedsReview→Posted/Failed states; staged schema and control-total verification before atomic GL/stock publication. Retry the same stable event safely, return original committed reference, reject changed same-key payload, use bounded backoff and crash recovery; failed import cannot half-post. Long imports/reports/exports are bounded and cancellable async jobs with data scope checked again on download. Unknown regulator outcome blocks blind duplicate submission; acknowledgement is not acceptance.

## Tests and blockers
TC-019,025,035,044,062,074,077,085; source ownership and external API/form authorization OPEN until verified evidence attached.
