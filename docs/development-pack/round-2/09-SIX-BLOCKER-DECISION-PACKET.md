# Round 2 — Six-blocker decision and proof packet

**Status:** ENGINEERING PROPOSAL ONLY — no Product, Finance, DBA, Security or Ops approval has been asserted.  
**Project:** Keifac Accounting & XBRL Compliance Suite (Kuwait first, GCC extensible)  
**Source:** [working user-owned SRS](https://docs.google.com/document/d/1dSqHsbTAVxkspvMRuhlycEJUCVZgCxvEG1hWBSmvuZA/edit); [Round-2 owner/signoff register](07-READINESS-GATES-AND-OWNER-SIGNOFF.md) and [pre-code gap register](../PRE-CODE-GAP-REGISTER.md).  
**Branch:** `development` only. Boss-owned original SRS and `main` remain untouched.  
**Guiding principle:** Resolve the decision with an explicit choice and traceable evidence. Do not claim an approved policy or benchmark without an authorized signatory and a real test.

## A. Six blockers and readiness evidence

| Blocker | Exact decision that is still missing | Engineering recommendation / prepared artifact | What closes it | Status |
| --- | --- | --- | --- | --- |
| D-01: Frontend | Existing reference reuse, SPA-vs-SSR, framework/maintainer, browser support | Propose React + TypeScript + Vite as a private authenticated business SPA; static clickable compact-workspace prototype for UX exploration | Product+frontend owner signs option after checking Ibdaa Tailor POS reference and 1366x768/RTL/200%-zoom prototype | PROPOSED |
| D-10: SQL Server ERD | Company-vs-branch COA/period, legal scopes, precise DECIMAL scales, migration constraints | [R2-01 physical design](01-PHYSICAL-ERD-DESIGN-PROPOSAL.md); candidate composite ownership FKs, rowversion, stable event uniqueness, no destructive journal cascade | Finance/DBA signs ERD + DDL, scoped FK/lock tests and migration rehearsal | PROPOSED |
| DEC-004/005/006: Posting, stock, FX | Exact trigger/event Dr/Cr, journal source, KWD rounding, original FX rate, inventory costing/return policy | [R2-02 event/state design](02-POSTING-STATE-AND-EVENT-CONTRACT.md); one posting engine, no retry duplicate, source hash, immutable reversal | Finance authorizes every enabled event via numerical fixtures and effective policy version | OPEN FINANCE |
| DEC-009: Permissions | User/role/action/company/branch/amount, maker-checker, delegation and identity provider | [R2-05 permissions candidates](05-RBAC-AND-APPROVAL-MATRIX.md); all sensitive actions default DENY without matching explicit grant | Security + Product/Finance authorize the exact matrix, scopes and thresholds; negative tests | OPEN POLICY |
| D-01 UX: Clickable prototypes | Real compact form/wireframe review, no nested scroll, Arabic RTL, keyboard, mobile, after-validation state | [Self-contained UI prototype](prototypes/compact-accounting-workspace.html), **DEMO ONLY**, no production API, data or posting | UX owner reviews clicks/screenshots at 1366×768, 320/375px, 125/200% zoom, English/Arabic, error+empty/denied | PROPOSED; NOT USABILITY-TESTED |
| D-09: Performance | Real environment price/SQL version/CPU/RAM/storage, traffic shape, cold/hot caches and benchmark p95/p99 | [R2-06 benchmark plan](06-PERFORMANCE-AND-CAPACITY-TEST-DESIGN.md); normalized SQL, bounded keyset paging, targeted indexes, durable jobs | Ops/DBA accepts infrastructure/load budget and records actual Level-A load test + financial correctness | UNMEASURED |

## B. Frontend decision record — D-01 (proposed)

### Alternatives and conclusion
**Option A — Recommended for this authenticated accounting workspace:** React + TypeScript + Vite, modular client-side routes; ASP.NET Core 10 API performs server-side authorization, aggregation and durable financial commands. Use one design-token CSS layer and limited shared primitives. A business SPA does not require search-engine indexing for its journal forms; Vite offers simple build/dev boundaries. Select the router and data fetching libraries only once real UI routes are approved; no Redux/event framework by default.

**Option B — Server-rendered .NET pages (Razor/Blazor):** potentially simpler if the development team has only C# expertise and the UI reuse reference is compatible; would change hiring, accessibility, rendering and component migration decisions. Compare staffing/support and actual interactive grid UX before ruling out.

**Option C — Next.js/SSR React framework:** valuable for separately indexable public marketing, broad SSR and mixed rendering, but adds extra runtime/deployment modes that the internal signed-in accounting workspace might not need. Do not choose it for SEO for private vouchers. Evaluate only if SRS or current repository requires SSR.

### Required product/engineering approval record
`Decision D-01 / Option selected / Existing reference repository inspected? / Approved UI assets components / Exact browser/mobile/RTL support / CSR+API hosting model / Team skill/maintenance owner / Date / Screenshot and recorded design review / Impacted issues`.

**Until signed:** the HTML prototype is a design exploration, not a commitment to React, and no production frontend has been created. Consult official React and Vite guides to verify current supported setups during implementation, not freeze a specific unreviewed patch version.

### Proposed reusable boundaries (no code yet)
- `AppShell`: one 56–60px header, permission-scoped sidebar, company/period context, one content owner.
- `PageHeader`, `FormField`, `MoneyInput`, `ScopedDataGrid`, `ApprovalActionBar`, `StatusLabel`, `ValidationSummary`: create only when required on approved screens; no universal 60-prop mega-components.
- State: server is authoritative for posted status, approval, amounts and balances; UI holds only uncommitted draft and bounded page caches keyed by current tenant/company/branch/period/permission.
- Each module is route-lazy-loaded; table search/filter/pagination is server-owned. No 10M row browser fetch.

## C. Physical ERD review — D-10, DBA acceptance checklist

**Proposed legal company boundary:** Company is accounting system-of-record; Branch belongs to Company. Company-scoped COA and fiscal periods are the **default recommendation**, not a Finance approval; branch dimension appears where enabled. Inter-company transfers are not just branch transfers. Approval of alternatives must update the key structure before real migration.

DBA must verify:
1. Scoped `TenantId+CompanyId` foreign keys for Company/Branch/Account/Period/JournalLine so a company-A line cannot reference company-B AccountId, including reference inserts via import.
2. Closed-period and journal-post race in the same SQL transaction/lock order, not independent read/write; a trial balance must never include a post committed after close.
3. Unique canonical economic event identity **independent of both document version and delivery SourceSystem**. An approved one-event-one-posting publisher and verified cross-source aliases (POS vs ERP) are necessary; ambiguous relays are quarantined. Separately unique transport delivery IDs and request idempotency keys detect retries; a source-system-scoped financial unique key alone is insufficient.
4. `Decimal(p,s)` for money/rates/unit costs and KWD three-decimal rounding **at approved booking boundary**; no float; precision/maximum budget signed by Finance.
5. COA parent cycle check; journal reversal linkage, voucher numbering concurrency and no `ON DELETE CASCADE` on posted financial evidence.
6. SQL Server Query Store and representative scoped access paths for account/date and journal/date keyset pages before adding redundant indexes.
7. Zero cross-tenant leakage from background jobs, caches, data exports and reporting materializations.
8. Dry-run migration/backup/rollback-or-forward-repair with large-table lock/downtime budget and reconciliation. **No DBA review has occurred yet.**

## D. Finance sign-off packet — policy options not presumed

### DEC-004 recognition
For each **manual journal, credit sale, cash sale, customer advance/receipt, supplier bill, purchase receipt/GRNI, supplier payment, return, inventory count, asset depreciation, bank transfer, FX revaluation**, Finance must choose:
`Business event / Source-system owner / recognition date or trigger / allowed lifecycle and period / Dr account & amount / Cr account & amount / tax/discount applicability / functional+original currency / approval threshold & authority / reversal & reissue / duplicate key & version behavior / exact expected ledger and subledger control totals / evidence / effective date`.

**Synthetic invariant only:** company-KWD journal Dr 100.000 = Cr 100.000; replay same stable event 100× still one committed JournalId; changed same-key payload yields conflict. This is not an endorsement of when revenue or tax should be booked.

### DEC-005 inventory
Explicit choice: perpetual weighted average OR FIFO OR not-in-release. Define landed cost, UOM conversion, negative stock, backdating, transfer and original-cost returns, with 3-layer numeric fixtures. **Do not enable valuation without signed calculation and expected GL.**

### DEC-006 FX
Define functional currency per legal company, per-currency minor units, original currency amount, agreed FX rate source/cutoff/timezone, allowed manual override, rate precision and realized/unrealized gain/loss accounts and reversal. Accounting recognition at foreign-rate boundary needs sample debit/credit lines and reconciliation; do not apply KWD 3dp to every foreign currency.

### Binding example required per event
```text
EventType:                OPEN
SourceSystem/StableEventId: OPEN
Recognition point:        OPEN
PolicyVersion/effective:  OPEN
Company/Period/Currency:  OPEN
Dr Account / amount:      OPEN
Cr Account / amount:      OPEN
Tax / FX / cost:          OPEN
Source document + version OPEN
Correction/reversal:      OPEN
Business expected result: OPEN
Finance approver + date:  OPEN
```

## E. Permissions and amount decision packet — DEC-009

- **Default behavior until signed:** DENY financial Post/Reverse, ApprovePackage, ReopenPeriod, ManageRoleGrant, external Submit and privileged export. A role display string must never enable an API command.
- Sign exact action×role×company×branch×period×transaction-type×amount limit, currency conversion/approval basis, delegation dates, self-approval restrictions, separation for signatory vs filing officer, legal/auditor access and break-glass review.
- Approvals must bind immutable object version/hash, actor, decision/reason, effective policy and authority at decision time; revoked or expired authorization is a denial.
- A company administrator and a tenant super-admin are **not implicitly** Finance approvers.
- Security must select external OIDC identity vs local password/MFA before implementing login; do not implement both speculative credential stores.

| Action family | Approval evidence still required |
| --- | --- |
| Draft/create/edit | Company/branch and period grant |
| Submit journal | Threshold/attachment/risk conditions |
| Approve | Independent eligible actor and scope |
| Post | Separate authority and current period/approved policy |
| Reverse/reopen | Policy/amount/legal audit and current-period reconciliation |
| Report export | Data scope, filed report state, recipient and revocation |
| Filing finalization | Exact bytes/input hash, approved Finance statement + signatory grant |
| Regulator submission | Official channel, separate filer rights, outcome reconciliation |

## F. Prototype, UI proof and performance benchmarking

A [standalone prototype](prototypes/compact-accounting-workspace.html) demonstrates one reusable shell and three sample workspaces (COA, journal, invoice), field-level inline validation, company context change warning and RTL toggle using **synthetic data only**. Clickable interaction is NOT permission enforcement, financial posting, real database access or a production React component. Run it locally in a browser after downloading the file; avoid claiming that viewing source in GitHub equals an interactive design test.

**UX verification evidence to collect:** browser/device and viewport at 1366×768, 1440×900 and 320/375px; 100/125/200% zoom, English/Arabic, keyboard navigation and focus errors; short form scroll height versus viewport, long journal grid accessibility; visual screenshot and Product owner review.

**Performance:** synthetic Level A with 10M journal lines/1M invoices/2M stock moves and 100 active sessions, Level B 100M/10M/20M with 500; p95 indexed GET 400ms, posting 1500ms and UI data-ready 3s are *proposal targets only*. Requires approved hardware/storage/tenant skew/RPS, realistic SQL schema, load tests, Query Store and browser traces. **No benchmark has been run.**

## G. Objective closure/feature coding gate

D-01 may become **DESIGN REVIEWED** after Product and Engineering actually approve a frontend and inspect real reference assets. D-10 remains **OPEN** until an authorized DBA and Finance owner sign specific ERD/DDL. DEC-004/005/006 and DEC-009 require real owner approvals. Prototype may become **UX REVIEWED** only after user review of measured viewport/RTL/zoom behavior. Capacity remains **UNMEASURED** until load tests on agreed hardware.

Do not mark Round 2 complete or start financial business code because this file exists. Technical reconnaissance and test harness preparation may continue. Update GAP register and GitHub issues with links to signed evidence when available. No redundant new master document set is authorized by this packet.

## H. New universal ID field requirement — D-11 OPEN

Boss requires **numeric automatically assigned IDs** and an **ID as the first read-only field on every entity-backed entry form**, including a visible `MAX(Id)+1`-style next-ID estimate on unsaved Create forms. This has been added to working SRS Appendix K and the UI/ERD/OpenAPI contracts. Three demo workspaces now display estimated read-only numeric IDs in their first field.

**Important distinction:** `MAX(Id)+1` is a non-reserved preview, not a reliable way to insert a row. SQL Server `BIGINT IDENTITY(1,1)` auto-generates actual positive numeric IDs on insert but does not guarantee contiguous values after rollback/failure/restart. Two open forms may both show ID estimate 1002 and ultimately Save as different real IDs. A scoped `MAX(Id)` is also different from a globally allocated identity value in multi-tenant workloads. Never do `INSERT ... VALUES(MAX(Id)+1,...)` for production entries or lock the table for the user's editing session.

For legally/business-visible **Invoice/Voucher/Receipt serials**, preserve gapless *committed allocation ledger* through a separate scope-specific transactional `DocumentNumberSeries` counter and permanent issued/void records. An internal entity ID and business serial are separate numeric fields with different issuance timings.

**Pending D-11 sign-off:** Product decides estimated preview vs persisted draft-on-open, DBA approves ID query/constraint/index/performance, and Finance/Compliance approves which document numbers require strict continuity, void treatment, numbering scope. If truly every technical primary key must be gapless, Product/DBA must explicitly accept serialized per-table transactions and their measured cost; `IDENTITY` alone cannot fulfill it. No DB migration or code has been enabled by these documentation changes.
