# Round 2 / R2-06 — Large-data performance contract and benchmark protocol

**Status:** Proposed **test design only**. No 10M/100M fixture loaded; no p95, p99, lock or rendering benchmark executed. SRS Appendix H and DEV-10 apply. Cloud hardware, cost budget and edition concurrency must be approved by Product/Ops before SLOs are contracted.

## 1. Workload assumptions to freeze (DO NOT GUESS)

| Parameter | Level A proposal | Level B proposed scale gate | Requires approval |
| --- | --- | --- | --- |
| Journal lines | 10,000,000 | 100,000,000 | Synthetic row shape, company skew and historic period |
| Invoices | 1,000,000 | 10,000,000 | Lines/invoice, paid/unpaid distribution |
| Stock movements | 2,000,000 | 20,000,000 | Items/warehouses/cost layers |
| Concurrent active sessions | 100 | 500 | Real request throughput/user, think time, network |
| Largest company data share | Define realistic skew | Proposed 40% | Tenant/company distribution |
| SQL Server | Version and cores/RAM/storage OPEN | Production-like scaled profile OPEN | Region, instance price, IO, backup budget |
| API/UI | ASP.NET modular API; UI TBD | Scale API instances only if measured | Runtime, device, browser, connection pooling |
| Jobs | Heavy report/export/XBRL queued | Bounded worker pool | Max concurrent jobs and report completion budget |

**Mix:** define read/write proportions; company switch rate; journal list search by oldest/newest period; posting double-click; AR/AP ageing; bank matching; dashboard; report and XBRL jobs; file exports; RTL sessions; role revokes. Three test phases: warmup, steady-state and constrained resource/restart. Cold and warm cache are separate results.

## 2. Proposed SLA/SLO measurements, NOT results

| Measurement | Proposed Level-A p95 starting target | p99 / evidence |
| --- | --- | --- |
| Common authorized indexed GET/list | ≤ 400 ms API-server end-to-end | p99 ≤ 1.2 s; percentiles from enough samples |
| Journal post command under realistic contention | ≤ 1.5 s | p99 ≤ 3 s; 0 balance/idempotency/tenant failures |
| Deep keyset-paginated history search | ≤ 800 ms | Stable ID tie-break, bounded DB reads |
| Dashboard data-ready server response | ≤ 1.5 s | Report freshness disclosed and correct |
| Browser page data-ready | ≤ 3.0 s | Actual API+render under approved client/network/device |
| Durable job request acknowledgement | ≤ 500 ms | 202 + JobId; separate completion objective |
| Large report/export job completion | NOT SET | Define per dataset, output size, queue concurrency |
| UI 1366×768 compact short form | No gratuitous vertical scroll | Verify with real browser at 100%, 125%, 200% |
| Availability | Proposed 99.5% monthly only | Monitoring/exclusions/SLA owner approval required |

No target is achieved until recorded under signed production-like environment. Level B/C targets must be a separately approved acceptance milestone, NOT an implied 400ms guarantee at 100M rows.

## 3. Database query-path contracts

| Query path | Required SQL access pattern | Anti-pattern to reject |
| --- | --- | --- |
| Company scoped journal list | `TenantId,CompanyId` equality, bounded postingDate range, stable order `PostingDate,JournalId`, cursor | `OFFSET 1000000`, `SELECT *`, unfiltered history |
| Account ledger | Company+AccountId, date cutoff, bounded projection, deterministic line key | N+1 per journal, rescanning all tenants |
| AR/AP ageing | Date+company scoped eligible unpaid allocations with consistent as-of policy | Summing live balances into approved prior snapshot |
| Stock movement | Company+Warehouse+Item+movement ordering and approved cost-layer snapshot | Recomputing all historical layers on each UI click |
| Dashboard | One small set of authorized aggregates or versioned read model | Full GL scan per widget and per user refresh |
| Report export | Durable job, bounded/chunked streaming, exact snapshot/cutoff/role | Loading millions of rows into memory before writing |
| Financial posting | Index/unique event key, short locked transaction, company/period/account same scope | Holding locks during external HTTP/file I/O |
| XBRL validator | Frozen approved source+taxonomy/rules, bounded worker and deterministic hash | Revalidating all tenants per interactive request |

Use SQL Server Query Store and capture actual execution plan, CPU time, logical/physical reads, spills, lock waits, deadlocks, connection pool, memory pressure, GC and write amplification. An index is a **candidate** until workload evidence supports it. Do not auto-add one redundant index per visible column.

## 4. Repeatable test recipe

1. Agree SQL Server build/edition, storage, API/runtime, frontend environment, client/network and cost.
2. Create **synthetic** valid data (no live customer records): multi-company tenant boundaries, posted balanced journals, stable event IDs, invoices/open items, stock layers, historical cutoffs and permissions.
3. Seed Level A with controllable row skew; verify debit/credit total and account/company/branch consistency against independently calculated control totals before measurement.
4. Warm caches for steady state but separately measure cold cache and oldest period, max tenant share and contention.
5. Run a representative workload with reproducible script/tool version, traffic rate (RPS), session count and think-time; record p50/p95/p99 latency, error/timeout rates and actual throughput.
6. Inject duplicate postings, role revocations, period close races and SQL transient failures while load runs. **Any incorrect journal, tenant leak or audit loss blocks release regardless of speed.**
7. Try long report jobs, million-row chunked imports/exports and worker crashes; verify 202 acknowledgment, job completion budget, cancellation, retry and bounded RAM.
8. Run browser responsive/RTL/zoom traces and ensure data-ready time includes real fetch/render; identify DOM row growth and layout shifts.
9. Compare SQL plans and regression budgets against previous baseline; attach environment manifest and test evidence to issue/PR.
10. Run Level B only after Level A is correct and there is a justified cost/capacity decision.

## 5. Performance test evidence format

```text
Case ID: PERF-JOURNAL-LIST-01
Code commit / schema version: OPEN
Client device / browser / connection: OPEN
SQL Server version/region/CPU/RAM/storage/price: OPEN
Rows / companies / skew / time span: OPEN
Permissions / company/branch/period: OPEN
Warm vs cold cache: OPEN
Requests per second / active users / mix: OPEN
Observed p50/p95/p99 / error rate: NOT RUN
SQL Query Store plan IDs / IO / wait / lock metrics: NOT RUN
Ledger reconciliation / tenant-isolation check: NOT RUN
Result: NOT TESTED — no speed claim allowed
```

## 6. Anti-overengineering

Start with an indexed, normalized SQL Server OLTP relational model and simple modular API. Optimize the **actual** slow query and transaction boundary first; then targeted immutable snapshot caching or durable jobs if necessary; then stateless API scale, and only finally warehouse/columnstore/partitioning/sharding if a measured business need and operational plan justify it. No distributed cache, message broker or microservice is mandatory by design document alone.

**Traceability:** Appendix H, TC-081–090/101, [DEV-10](../DEV-10-scalability-large-data.md), [Gap Register](../PRE-CODE-GAP-REGISTER.md), Issues #8/#1. All SLOs APPROVAL REQUIRED.
