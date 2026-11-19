# DEV-04 — SQL Server ERD, ownership and migration contracts

Status: ENGINEERING DRAFT (Specified, not approved or implemented). Updated 19 Nov 2026.
Source: https://docs.google.com/document/d/1dSqHsbTAVxkspvMRuhlycEJUCVZgCxvEG1hWBSmvuZA/edit
Branch: development only. Boss-owned original SRS is untouched.
Evidence: repository currently has only minimal .NET 10 health endpoint, not working financial or UI modules.

## Logical vs implemented
The following models are candidate ERD entities, NOT existing database tables. Physical schema, keys, migrations, period-lock concurrency, isolation and query plans are OPEN until architecture approval. Keep SQL Server as one authoritative company-scoped OLTP system; do not build database-per-tenant, sharding or warehousing without verified need.

## SRS entity inventory
12. Data Model – Core Tables / Entities
Entity / Table
Purpose / important fields
Tenant
TenantId, Name, Subscription, Status
Company
CompanyId, TenantId, LegalName, CRNo, BaseCurrency, FiscalYear
Branch
BranchId, CompanyId, Code, Name, Address
User / Role / Permission
UserId, RoleId, Scope, PermissionKey, MFAStatus
AccountGroup / Account
AccountId, Code, NameEn, NameAr, ParentId, Type, NormalBalance
FiscalYear / Period
YearId, PeriodId, StartDate, EndDate, Status, LockDate
JournalHeader / JournalLine
VoucherNo, Date, Status, AccountId, Debit, Credit, Currency, Rate
Customer / Supplier
PartyId, Name, Contact, Terms, Currency, TaxProfile
Sales / Purchase Documents
Header, Lines, Tax, Discounts, PostingStatus, SourceReference
Item / Warehouse / StockLedger
SKU, UOM, Barcode, Warehouse, Quantity, Cost, MovementType
BankAccount / BankStatement / Reconciliation
Account, StatementLine, MatchStatus, ReconciliationDate
FixedAsset / Depreciation
AssetCode, Cost, Life, Method, Depreciation, NBV
FinancialStatement / StatementLine
StatementType, Period, LineCode, Value, ApprovalStatus
Regulator / EntityProfile / FilingObligation
Jurisdiction, Regulator, EntityType, FilingType, DueRule
Taxonomy / TaxonomyConcept / TaxonomyRelationship
Namespace, Version, ConceptQName, Type, PeriodType, Relationships
XBRLMapping / MappingDimension
SourceCode, ConceptQName, MemberQName, Unit, EffectiveFrom/To
XBRLContext / XBRLUnit / XBRLFact
EntityIdentifier, Period, Dimensions, Unit, Value, NilFlag
Disclosure / DisclosureAttachment
FormType, FieldCode, Value, DocumentPath, ApprovalStatus
ValidationRun / ValidationIssue
RunId, RuleId, Severity, FactId, Message, ResolutionStatus
XBRLPackage / FilingVersion
PackageId, Hash, TaxonomyVersion, FilePath, GeneratedAt, Version
Approval / Submission / Receipt
Approver, Decision, ReferenceNo, SubmittedAt, Response, ReceiptPath
AuditLog
User, Action, Entity, RecordId, BeforeJson, AfterJson, Timestamp

## Tenant and posting integrity
F.4 Minimum relational integrity and ownership
Every company-owned table includes TenantId and CompanyId (or provably safe immutable parent linkage); branch-scoped rows also include BranchId. All foreign keys enforce same tenant/company domain where applicable. JournalHeader has a unique tenant+company+source-system+event-type+stable-source-event-ID posting key, independent of mutable document version; a canonical event-payload hash detects same-key/different-payload conflicts; JournalLine has immutable posted values and currency/rate lineage. Approval references exact entity ID+version+hash where relevant; Decision includes actor/scope/timestamp. FilingVersion references frozen StatementVersion, TaxonomyVersion, MappingVersion, RulePackVersion, ValidationInputHash and PackageHash. Submission and Receipt link to exact FilingVersion and never overwrite history. StockLedger/CostLayer and AR/AP allocations reconcile to GL controls by identical cutoff. Integrations store original external ID, payload hash, state and replay history. AuditLog is append-only and scoped. Use numeric decimal types with defined scale; no float for monetary balances.

## SQL implementation rules
Company and branch scope verified server-side; composite ownership-aware foreign keys, rowversion/optimistic locking, versioned approvals, canonical unique event identity, decimal amounts, effective-dated currency/rules and original source linkage. Candidate index keys (TenantId,CompanyId,PostingDate,JournalId), (CompanyId,AccountId,PostingDate,LineId), (CompanyId,Status,DueDate,Id), and stable SourceEvent identity must be validated against real plans rather than blindly duplicated. All write migrations require safe rollout/backfill, idempotent execution, rollback/forward plan and GL/subledger reconciliation. Index count and partitioning must be justified by reads versus posting-write cost.

## Required design deliverables
ERD with PK/FK and cascades/NO ACTION; exact DECIMAL(p,s) per field; uniqueness and financial event replay; isolation tests; period locking/write concurrency; migration plan and 100M-row benchmark trace. D-10 and DEC-004/005/006 remain OPEN.

## Cross-document review corrections — 2026-11-19

**Logical candidate keys — require ERD sign-off before migrations:**

- Company `(TenantId,CompanyId)`; Branch `(TenantId,CompanyId,BranchId)`; FiscalPeriod `(TenantId,CompanyId,PeriodId)`; Account `(TenantId,CompanyId,AccountId)`. Child FKs must enforce matching composite ownership keys or an equally proven DB guarantee. No foreign record may become reachable via a guessed ID.
- JournalHeader→JournalLine, financial source events, approvals and audit use immutable linkage. Avoid `ON DELETE CASCADE` for posted journals, cost layers, filings, receipts or audit trail. Soft inactivation and linked corrections preserve old history.
- Posting unique key: `(TenantId,CompanyId,SourceSystem,EventType,StableSourceEventId)`, with a canonical payload hash. The document version is **not** part of that uniqueness key. A transport request idempotency key is separately stored/checked, and hash mismatch is 409. A reversal has its own stable source event ID plus `ReversesJournalId`.
- `RowVersion` or equivalent optimistic concurrency on mutable drafts; `If-Match` expected version checked before command. Posting/period closing must serialize affected business invariants with appropriate SQL transaction isolation and bounded locks, not just a read-then-write in separate transactions.
- Amounts, quantities, FX rates and taxes use explicitly sized SQL `DECIMAL(p,s)` columns per Finance policy. Document display rounding is not sufficient for ledger precision; exchange-rate gain/loss and KWD 3dp must be backed by fixtures.
- Reporting at scale: ordered, company-scoped `(PostingDate,JournalId,LineId)` keyset and account/period paths; filter indexes by measured queries with real skew, not blanket indexes. Signed migration proof includes lock-time budget, backfill, row counts, reconciliation and forward recovery/restore test.

**Physical ERD, database migrations and SQL query plan evidence are NOT PRESENT** in this repository today. This list does not silently approve D-10, DEC-004/005/006 or TenantId duplication on every child table where an immutable validated parent chain suffices.
