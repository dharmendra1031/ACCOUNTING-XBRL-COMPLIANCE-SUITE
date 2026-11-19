# Scalable and maintainable architecture contract

**Status:** Proposed architecture, not a performance guarantee.  
**Source:** [User-owned Keifac SRS — Appendix H](https://docs.google.com/document/d/1dSqHsbTAVxkspvMRuhlycEJUCVZgCxvEG1hWBSmvuZA/edit).  
**Target:** `development` branch. Main remains reviewed-release only.

## Deployable design

Start with **one modular ASP.NET Core Web API**, SQL Server, an approved responsive frontend (framework is still OPEN) and bounded background jobs for heavy tasks. Do **not** introduce microservices, per-company databases, duplicated business logic, generic-repository layers, sharding, event bus or a distributed cache without measured need.

One authoritative accounting posting path; explicit company/tenant/branch permission checks on every read, export and mutation. SQL Server remains source of truth for immutable journals, financial events and approved snapshots. Use atomic transactions, canonical stable source-event uniqueness independent of mutable document version, currency-specific decimal precision and linkage for reversals.

## Fast query paths

- SQL projections instead of `SELECT *`, server-side filtering/sorting and bounded (default 50; cap 200 unless approved) keyset pagination of deep journal/customer/stock history. Avoid N+1 queries and loading entire ledgers into memory.
- Candidate scoped indexes on tenant/company/date/journal ID, company/account/date/line ID, company/status/due date, and stable source-event identity. Select actual index order and INCLUDE columns after measuring plans; extra indexes can slow financial writes.
- Use SQL Query Store and actual query plans. No default row partitioning, columnstore or separate analytics store; evaluate only on measured bottlenecks.
- Cache immutable snapshots and static lookups with tenant/company/version/permission-aware keys; invalidate/revalidate balances, locks, permissions and approved status correctly. Never leak data across tenants.
- Long-running reports, imports, exports, XBRL validation: durable scoped jobs, bounded concurrency, retry budget, cancellation/progress and immutable output references. Keep external I/O outside GL posting transactions.
- Frontend lazy loads approved routes; virtualizes large tables only when useful, debounces search and cancels obsolete company/period requests. No duplicate fetches.

## Synthetic benchmark envelope (proposal, not measured)

| Level | Journal rows | Invoices | Stock movements | Concurrent sessions |
| --- | ---: | ---: | ---: | ---: |
| A | 10M | 1M | 2M | 100 |
| B | 100M | 10M | 20M | 500 |
| C — capacity investigation | ≥500M | To define | To define | 1,000 |

At a production-like **Level A** environment, proposed p95 budgets: browser data-ready ≤3s; common indexed GET ≤400ms (p99 ≤1.2s); financial posting ≤1.5s (p99 ≤3s); bounded history search ≤800ms; dashboard ≤1.5s; async job acceptance ≤500ms. Heavy report completion has a separate dataset-specific budget. These require Product/Ops approval of cost, infrastructure, data skew, load mix, storage, network and error thresholds. Nothing here proves actual load capacity.

Load tests must record throughput, p95/p99, query plans, CPU/memory/IO, DB contention/locks, tenant and company skew, cache cold/hot behavior, oldest periods, long exports, posting correctness, cross-tenant isolation, background retry and restore. Put performance tests in a staging/capacity pipeline, not the small API compile CI. Include Arabic UI at 200% zoom separately from load tests.

## Release readiness

Not performance-ready until target load tests, backups/restore, finance reconciliation, authorization and idempotency are all verified. Track SRS tests **TC-081–090** for scale and **TC-091–102** for compact UI. Performance optimization must never undermine posting accuracy, audit lineage, recoverability or accessibility.

## Decisions blocking sign-off

Frontend framework/reusable UI, ERD/company boundaries, posting/FX/inventory policy, role/threshold matrix, regulatory filing applicability/approval, hosting/service levels/retention, and approved report formulas remain OPEN. Current repository has a minimal health-check API only; **no business modules or performance harness implemented yet**.
