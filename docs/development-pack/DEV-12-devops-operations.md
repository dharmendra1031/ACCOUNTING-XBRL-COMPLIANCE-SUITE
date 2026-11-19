# DEV-12 — CI/CD, environments, deployment, backup and operational security

Keifac Accounting & XBRL Compliance Suite | Engineering documentation, 19 November 2026
Status: SPECIFIED / OPEN for owner sign-off unless explicitly noted. None of these specifications is proof of implementation or tests.
Source: https://docs.google.com/document/d/1dSqHsbTAVxkspvMRuhlycEJUCVZgCxvEG1hWBSmvuZA/edit
Git branch: development. Original boss-owned SRS is unchanged.

## Verified repository reality
Branch main exists and is UNPROTECTED, branch development has minimal .NET 10 ASP.NET Core API with /health, CI workflow and pull request template. First observed development API GitHub Actions build completed SUCCESS; this is compilation only. Existing GitHub connector cannot enforce branch rules; private repo rulesets require suitable GitHub plan. GitHub Project Board exists separately. Never report production deploy or passed business tests.

## Branch and promotion model
Feature commits target development; main is release only after signed review, tests, approvals and snapshots. PR template requires SRS ID→screen→API/DB→test/evidence. Preserve security alerts and review trace. CI stage order: .NET build/static checks, unit tests, API/security integration tests, migration rehearsal, UI accessibility/component tests (when UI exists), then staged smoke/UAT; run representative large-data performance separately on staging, not each small CI run. Block release on missing sign-off and failed finance security assertions.

## Environment and operations contracts
LOCAL/TEST/STAGING/PRODUCTION config and secrets isolated; no real customer data in tests. SQL Server migration plan includes backup, lock/downtime budget, reversible strategy, row counts and reconciliation. Sensitive file storage encrypted/scoped with documented retention. Logs use correlation IDs, redaction and alerts; trace source event, GL result, job and XBRL candidate lineage without passwords or attachment contents. Job restart/retry preserves idempotency and state. Define hosting region, infrastructure sizing, service owner, backup scheduling, PITR, tested restoration, RPO/RTO, support and incident response BEFORE go-live.

## SRS nonfunctional/security baseline
15. Non-Functional Requirements
Area
Minimum requirement
Performance
Common screens should load within 3 seconds under agreed normal load; large reports run asynchronously.
Scalability
Support multiple companies and branches; horizontal scaling for API and background workers.
Availability
Target 99.5% monthly application availability initially, excluding agreed maintenance and third-party outages.
Security
TLS 1.2+; strong password policy; MFA for privileged/filing users; least-privilege access.
Data protection
Tenant isolation, encrypted backups, retention controls and secure document access.
Auditability
Append-only audit events for posting, approvals, mappings, taxonomy changes and filing events.
Localization
Arabic/English UI, RTL support, KWD formats and configurable date/number formats.
Backup & recovery
Daily full backup plus transaction log backups; define RPO/RTO with customer contract.
Interoperability
REST APIs, CSV/Excel imports and documented integration contracts.
Maintainability
Automated tests, structured logging, API versioning, deployment scripts and environment configuration.
16. Security, Compliance and Audit
Use role-based and scope-based authorization; prevent cross-tenant data access.
Require MFA for administrators, CFOs, XBRL approvers and filing users.
Store passwords via unique salt and adaptive one-way password hashing, never reversible encryption. Hold API credentials, MFA recovery secrets and service secrets under managed secrets/encryption with rotation and least-privilege access. Encrypt sensitive identifiers, stored documents and backups as applicable; prevent logging of credentials, tokens or raw confidential files.
Maintain audit logs for voucher posting, period reopening, mapping changes, taxonomy updates, validation overrides, approvals and submissions.
Provide configurable retention and deletion policies subject to applicable legal and contractual requirements.
Use secure software development practices, dependency scanning, vulnerability testing and periodic penetration testing.
Provide exportable audit evidence and access logs for authorized auditors.

## Observability and large-data operations
Use database Query Store, plan regression, waits/locks/deadlocks, CPU/IO/memory/GC, pool utilization, p95/p99 latency, background queue lag, data growth and restore audit. Verify cold cache, busiest/skewed company, SQL migration at 10M/100M data and tenant isolation. SLO values in Appendix H are provisional until approved test hardware, traffic mix and budget recorded.

## Release checklist
Signed product/finance/security/compliance decisions, passing reproducible tests, stable GL/TB, approved migrations, backups restored under RPO/RTO, XBRL official evidence if release includes regulator filing, no outstanding critical security issues, deployment/rollback/runbook rehearsal and documented monitoring. Not implemented until evidence exists.

## Cross-document review corrections — 2026-11-19

**CI scope truth:** Current `development` GitHub workflow compiles the minimal .NET API. It does **not** yet run finance integration tests, UI/accessibility tests, SQL migrations, penetration tests, 10M/100M-row tests or deploy production. A green status is only evidence of successful configured checks. The private repository's `main` protection remains unenforced; use manual review/PR discipline until plan/owner permissions permit actual GitHub protections, and never make the repo public automatically.

**Persistence and recovery:** A financial post plus any required downstream durable job record must survive process restart and an exactly-once replay test. Backup/restore must verify monetary source-event identity, GL immutability, attachments, report approval lineage, company isolation and future job recovery. Database change runbooks require dry run at realistic row volume, expected locks, rollback-or-forward repair, checksum/control totals and postdeployment reconciliation. `RPO/RTO`, encryption, residency, retention and incident handling remain owner sign-offs (DEC-008).

**GitHub delivery gate:** PR targeting `development` cites SRS clause, affected DEV files, approved business rule/decision, migration and test evidence. Promotion to `main` requires separately reviewed release PR and completed relevant security/functional/backups gates; a PR is not a stand-in for branch protection. Scope-appropriate automated tests must be introduced once code exists. Never copy production credentials into code, GitHub actions, logs or documentation. See SRS J-02/J-06/J-13.
