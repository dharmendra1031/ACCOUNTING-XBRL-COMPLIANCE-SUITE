# DEV-05 — ASP.NET Core API endpoints, DTO and error contracts

Status: ENGINEERING DRAFT (Specified, not approved or implemented). Updated 19 Nov 2026.
Source: https://docs.google.com/document/d/1dSqHsbTAVxkspvMRuhlycEJUCVZgCxvEG1hWBSmvuZA/edit
Branch: development only. Boss-owned original SRS is untouched.
Evidence: repository currently has only minimal .NET 10 health endpoint, not working financial or UI modules.

## API discipline
The below URLs are candidates under /api/v1, NOT existing endpoints. Existing code only maps /health. Implement a cohesive modular ASP.NET Core API, common permission and posting policies, bounded list queries, concurrency versions, deterministic financial idempotency, auditable status transitions, consistent errors, no duplicated handler for multiple UI routes. Files, exports and reports require identical server scope checks.

## 38 screen-to-API-to-database-to-test mappings
F.1 Screen → logical API → entity → permission → test matrix
SCR-001 | Module Identity | Candidate API POST /auth/login; POST /auth/mfa/verify; POST /auth/recovery | Entities User,Session,MfaChallenge | Permission Authenticate | Tests TC-016,020,059,060
SCR-002 | Module Dashboard | Candidate API GET /dashboard/summary | Entities Company,Period,JournalLine,ReportSnapshot | Permission ViewDashboard | Tests TC-004,020
SCR-003 | Module Organization | Candidate API GET/POST/PATCH /companies; /branches | Entities Tenant,Company,Branch | Permission ManageCompany | Tests TC-020,030
SCR-004 | Module Ledger | Candidate API GET/POST/PATCH /accounts | Entities Account,AccountGroup | Permission ManageCOA | Tests TC-001,005
SCR-005 | Module Ledger | Candidate API POST /journals; POST /journals/{id}/submit; /post; /reverse | Entities JournalHeader,JournalLine,Approval | Permission CreateDraft,Post,Reverse | Tests TC-001,002,003,021,028,062
SCR-006 | Module Receivables | Candidate API GET/POST /sales-invoices; POST /sales-invoices/{id}/issue | Entities SalesDocument,SalesLine,JournalHeader | Permission IssueSalesInvoice | Tests TC-023,055
SCR-007 | Module Payables | Candidate API GET/POST /supplier-bills; POST /supplier-bills/{id}/approve | Entities PurchaseDocument,PurchaseLine,GoodsReceipt | Permission ApproveSupplierBill | Tests TC-024,055
SCR-008 | Module Banking | Candidate API POST /bank-statements/import; POST /reconciliations/{id}/finalize | Entities BankStatement,BankStatementLine,Reconciliation | Permission ReconcileBank | Tests TC-027
SCR-009 | Module Reporting | Candidate API POST /statements/generate; POST /statements/{id}/approve | Entities FinancialStatement,StatementLine,StatementVersion | Permission ApproveStatement | Tests TC-005,031,052
SCR-010 | Module Regulatory | Candidate API GET/PUT /regulatory-profiles/{companyId} | Entities Regulator,EntityProfile,FilingObligation | Permission ManageRegulatoryProfile | Tests TC-049
SCR-011 | Module Taxonomy | Candidate API POST /taxonomies/import; POST /taxonomies/{id}/approve | Entities Taxonomy,TaxonomyConcept,TaxonomyRelationship | Permission ApproveTaxonomy | Tests TC-011,032
SCR-012 | Module XBRL | Candidate API GET/PUT /mappings; POST /mappings/{id}/approve | Entities XBRLMapping,MappingDimension | Permission ApproveMapping | Tests TC-006,007,032
SCR-013 | Module XBRL | Candidate API GET/PUT /disclosures; POST /disclosures/{id}/submit | Entities Disclosure,DisclosureAttachment | Permission EditDisclosure | Tests TC-033
SCR-014 | Module XBRL | Candidate API POST /filings/{id}/validations; GET /validations/{runId} | Entities ValidationRun,ValidationIssue | Permission RunValidation | Tests TC-008,009,010,012
SCR-015 | Module XBRL | Candidate API GET /filings/{id}/versions/{version}/preview | Entities XBRLFact,XBRLContext,FilingVersion | Permission ViewFiling | Tests TC-039,051
SCR-016 | Module XBRL | Candidate API POST /filings/{id}/packages/draft; POST /filings/{id}/packages/candidate; POST /filings/{id}/packages/finalize (only after hash-bound approval) | Entities XBRLPackage,FilingVersion,Approval | Permission GeneratePackage,ExportPackage | Tests TC-010,013,031,051,061
SCR-017 | Module Approvals | Candidate API GET /filing-approvals; POST /filing-approvals/{id}/decision | Entities Approval,XBRLPackage,FilingVersion | Permission ApprovePackage | Tests TC-029,042,054,061
SCR-018 | Module Filing | Candidate API GET /submissions; POST /submissions | Entities Submission,Receipt,FilingVersion | Permission RecordSubmission | Tests TC-014,015,034
SCR-019 | Module Audit | Candidate API GET /audit-events | Entities AuditLog | Permission ViewAudit | Tests TC-016,038
SCR-020 | Module Reporting | Candidate API GET /reports; POST /reports/{id}/run; POST /reports/{id}/export | Entities ReportDefinition,ReportRun | Permission RunReport,ExportReport | Tests TC-004,005,045
SCR-021 | Module Organization | Candidate API POST /onboarding/drafts; POST /onboarding/{id}/activate | Entities Tenant,Company,FiscalYear,Account | Permission ActivateCompany | Tests TC-030
SCR-022 | Module Identity | Candidate API GET/PUT /memberships; GET/PUT /role-grants | Entities User,Membership,Role,Permission,ApprovalPolicy | Permission ManageRoles | Tests TC-020,029
SCR-023 | Module Periods | Candidate API GET/POST /fiscal-years; POST /periods/{id}/lock | Entities FiscalYear,Period,ExchangeRatePolicy | Permission ManagePeriods | Tests TC-003,022
SCR-024 | Module Ledger | Candidate API GET /journals; GET /journals/{id} | Entities JournalHeader,JournalLine | Permission ViewJournal | Tests TC-021
SCR-025 | Module Receivables | Candidate API POST /receipts; POST /receipts/{id}/allocate | Entities Receipt,ReceiptAllocation,JournalHeader | Permission AllocateReceipt | Tests TC-023
SCR-026 | Module Receivables | Candidate API GET /customers/{id}/ledger; POST /sales-credit-notes | Entities Customer,SalesDocument,ReceiptAllocation | Permission IssueCreditNote | Tests TC-023,025
SCR-027 | Module Payables | Candidate API POST /supplier-payments; POST /supplier-payments/{id}/allocate | Entities SupplierPayment,PaymentAllocation | Permission AllocatePayment | Tests TC-024
SCR-028 | Module Payables | Candidate API GET /suppliers/{id}/ledger; POST /purchase-credit-notes | Entities Supplier,PurchaseDocument,PaymentAllocation | Permission IssueSupplierCredit | Tests TC-024
SCR-029 | Module Inventory | Candidate API GET/POST /items; /warehouses; GET /stock-ledger | Entities Item,Warehouse,StockLedger,CostLayer | Permission ManageInventory | Tests TC-025,026
SCR-030 | Module Inventory | Candidate API POST /goods-receipts; /stock-transfers; /stock-counts | Entities GoodsReceipt,StockMovement,StockCount | Permission PostStockMovement | Tests TC-025,026,041
SCR-031 | Module Banking | Candidate API GET /cash-bank-registers; POST /bank-transfers | Entities BankAccount,CashBankTransaction,JournalHeader | Permission ManageCashBank | Tests TC-027
SCR-032 | Module Periods | Candidate API GET /periods/{id}/close-checklist; POST /periods/{id}/close | Entities Period,CloseChecklist,Reconciliation | Permission ClosePeriod | Tests TC-022,027,045
SCR-033 | Module Approvals | Candidate API GET /approvals; POST /approvals/{id}/decision | Entities Approval,ApprovalPolicy | Permission ApproveScopedAction | Tests TC-029,042
SCR-034 | Module Audit | Candidate API GET /engagements; POST /evidence-requests | Entities AuditEngagement,EvidenceRequest,DisclosureAttachment | Permission ReviewEvidence | Tests TC-038,047
SCR-035 | Module Integrations | Candidate API GET /integration-jobs; POST /integration-jobs/{id}/retry | Entities IntegrationJob,InboundEvent,DeadLetter | Permission RetryIntegration | Tests TC-019,044
SCR-036 | Module Filing | Candidate API GET/POST /filing-workspaces; POST /filings/{id}/prepare | Entities FilingObligation,FilingVersion,StatementVersion | Permission PrepareFiling | Tests TC-031,032,049,063
SCR-037 | Module Filing | Candidate API POST /submissions/{id}/receipts; POST /submissions/{id}/reconcile | Entities Submission,Receipt,RegulatorDecision | Permission ReconcileSubmission | Tests TC-034,035,043,048
SCR-038 | Module Reporting | Candidate API GET/PUT /report-definitions/{id}; POST /reports/{id}/run | Entities ReportDefinition,ReportRun | Permission ConfigureReport | Tests TC-005,045

## Standard financial command and errors
F.2 Canonical API envelope and errors
Write command input: tenant/company context from verified authorization (never trusted solely from client), source document ID/version, action, operation idempotency key, effective date, currency/precision, attachment references, reason and optional approval reference. Response: immutable resource ID, new version, lifecycle status, committed journal IDs where applicable, audit correlation ID and actionable next permitted actions. Conflict = 409 for stale version/idempotency payload mismatch; invalid business rule = 422 with field/rule ID; unauthorized scope = 403 or non-disclosing 404 per security policy; locked period = 409 with safe explanation; pending async job = 202 with status URL. Do not expose SQL, secret or restricted tenant details in errors.

## Endpoint acceptance checklist
Input/output JSON schema, validation rules, allowed roles/actions and thresholds, tenant/company/branch/period scope, version/If-Match, Idempotency-Key with canonical hash for money events, conflict response, pagination/cursor shape, DB query plan, correlation/audit IDs, error and retry semantics, same-company foreign key enforcement, security negative tests. Long jobs may return 202 with authorized progress. Do not pretend HTTP 200 proves financial posting without committed journal IDs.
