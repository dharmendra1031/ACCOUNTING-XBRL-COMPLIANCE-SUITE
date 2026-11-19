# DEV-06 — Identity, RBAC, multi-tenancy, audit and data protection

Status: ENGINEERING DRAFT (Specified, not approved or implemented). Updated 19 Nov 2026.
Source: https://docs.google.com/document/d/1dSqHsbTAVxkspvMRuhlycEJUCVZgCxvEG1hWBSmvuZA/edit
Branch: development only. Boss-owned original SRS is untouched.
Evidence: repository currently has only minimal .NET 10 health endpoint, not working financial or UI modules.

## Access contract
Application security is never hidden-navigation-only. Every read/write, downloaded attachment, dashboard total, report export, approved role grant and external auditor engagement must be server-scoped. Store passwords as uniquely salted adaptive one-way hashes, NOT reversible encrypted strings; store API/MFA secrets in managed restricted secret storage. Support expiring scoped MFA, revoked sessions, rate limiting, audit, legal hold and retention. No unverified regulator or backdoor support account.

## Roles and access templates
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

## Maker checker and authorization
B.2 Authorization and separation of duties
AUTH-01: Server and database queries enforce tenant, company, branch, module, transaction type, amount threshold and action scope on every read/write. Hidden UI navigation alone is never authorization. Support authenticated, expiring audit-scoped external reviewer access.
AUTH-02: Distinct action permissions include CreateDraft, EditDraft, SubmitForApproval, Approve, Post, Reverse, ReopenPeriod, ApproveStatement, ApproveMapping, ApprovePackage, ExportPackage, RecordSubmission, and ViewAudit. Policies specify maximum amount and allowed company/branch/report type.
AUTH-03: Maker-checker prevents the creator from approving their own sensitive action, including high-value journals, period reopening, mapping overrides and filing packages, unless a separately approved and audited break-glass policy permits an exception. Capture actor, role, action, reason, timestamp, decision, original version and evidence. Rejection returns work to Draft/ChangesRequested.

## Original security requirements
16. Security, Compliance and Audit
Use role-based and scope-based authorization; prevent cross-tenant data access.
Require MFA for administrators, CFOs, XBRL approvers and filing users.
Store passwords via unique salt and adaptive one-way password hashing, never reversible encryption. Hold API credentials, MFA recovery secrets and service secrets under managed secrets/encryption with rotation and least-privilege access. Encrypt sensitive identifiers, stored documents and backups as applicable; prevent logging of credentials, tokens or raw confidential files.
Maintain audit logs for voucher posting, period reopening, mapping changes, taxonomy updates, validation overrides, approvals and submissions.
Provide configurable retention and deletion policies subject to applicable legal and contractual requirements.
Use secure software development practices, dependency scanning, vulnerability testing and periodic penetration testing.
Provide exportable audit evidence and access logs for authorized auditors.

## Expanded control requirements
C-13 Security and data lifecycle. Define session timeout, MFA recovery, device/session revocation, secure attachment downloads, malware scanning, file size/type limits, signed URL expiry, audit-event integrity, data export, tenant offboarding, retention/legal hold and restore drills. Every download/export enforces tenant/company/engagement scope server-side. Avoid storing secrets or sensitive file URLs in audit logs.
RISK-G15 [CLARIFIED]: Passwords are uniquely salted and adaptively one-way hashed, not reversibly encrypted. Managed API secrets/MFA material need rotation, short-lived scoped tokens, revocation, rate limits, account recovery and audit. Tenant/company isolation, per-file authorization, no cross-tenant cache reuse and append-only audit are release gates.
RISK-G16 [OPEN SECURITY/OPS]: Owner must approve data residency, retention/legal hold, backups with proven restore, deletion/offboarding, breach response, authentication recovery and confidentiality/export control. Define which logs/files contain personal data, avoid logging sensitive raw payloads, and protect stale pre-signed attachment URLs.

## Security acceptance
Independent maker-checker and action/amount matrix, no self-privilege escalation, tenant/branch denial, period scope, immutable audited event reference, session revoke/recovery and cached-export denial. Test TC-016,020,029,038,047,054,058,059,060,072,075,077. DEC-008 and DEC-009 still OPEN.
