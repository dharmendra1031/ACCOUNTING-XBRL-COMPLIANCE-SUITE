# Round 2 / R2-05 — Tenant-scoped RBAC and Approval Decision Matrix

**Status:** Action-level engineering proposal; no role/action/amount threshold approved or implemented. SRS §3, B.2, AUTH-01–03, DEC-009 and DEV-06 control interpretation. No developer can grant access based only on a role label.

## 1. Scope and canonical grant evaluation

Effective grant is `Principal × Tenant × LegalCompany × Branch? × FiscalPeriod? × Module × Action × TransactionType? × AmountLimit? × EffectivePolicyVersion × Validity`. All relevant dimensions must pass current server-side authorization, not just menu visibility. Amount is evaluated in approved policy currency (choice OPEN) and action scope is rechecked at transaction commit.

**Permission semantics:** `CreateDraft` is not `Post`, `Approve` is not `Reverse`, `ApprovePackage` is not `SubmitRegulator`, `ExportReport` is not `ViewReport`. Super Administrator tenant provisioning is distinct from financial posting/signature authority.

## 2. Candidate role-to-action matrix

Legend: **P** candidate permitted, **R** permission only upon independent constrained grant, **—** not granted by template. This is a discussion baseline, NOT a security policy. Per-company overrides and amount thresholds must be signed by owner.

| Action | Super Admin | Company Admin | Accountant | Finance Manager | CFO/Signatory | XBRL Preparer | Filing Officer | Auditor | Operations User | Management Read-only |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Provision tenant / manage subscription | P | — | — | — | — | — | — | — | — | — |
| Manage company/branch master | — | P | R | — | — | — | — | — | — | — |
| Invite/deactivate company membership | — | P | — | — | — | — | — | — | — | — |
| Configure role/amount policy | — | R | — | R | R | — | — | — | — | — |
| Create/edit journal draft | — | — | P | P | — | — | — | — | — | — |
| Submit journal | — | — | P | P | — | — | — | — | — | — |
| Approve journal/financial event | — | — | — | R | R | — | — | — | — | — |
| Post approved journal | — | — | R | R | — | — | — | — | — | — |
| Reverse posted journal | — | — | — | R | R | — | — | — | — | — |
| Close/reopen accounting period | — | — | — | R | R | — | — | — | — | — |
| Create sales/purchase/stock draft | — | — | P | P | — | — | — | — | R | — |
| Reconcile bank/cash | — | — | R | R | — | — | — | — | — | — |
| View financial report | — | P | P | P | P | R | R | R | R | P |
| Approve final statement | — | — | — | R | R | — | — | — | — | — |
| Configure XBRL mapping/disclosures | — | — | — | — | — | P | — | — | — | — |
| Approve XBRL package exact hash | — | — | — | — | R | — | — | — | — | — |
| Submit authorized regulatory package | — | — | — | — | — | — | R | — | — | — |
| Review audit engagement evidence | — | — | — | — | — | — | — | R | — | — |
| View scoped audit records | R | R | — | R | R | R | R | R | — | — |
| Retry failed integration batch | — | R | — | R | — | — | — | — | R | — |

## 3. Approval policy contract — data fields

Every sensitive action decision needs:
- `PolicyId`, immutable `PolicyVersion` and effective-from/to; clear global/company/branch hierarchy.
- `ActionKey`, `TransactionType`, currency/amount threshold and allowed legal company/branch/fiscal period.
- `MakerId`, `ApproverId`, `ApprovalObjectId`, `ApprovalObjectVersion`, `RequestHash`, justification and attachment reference.
- `DelegationId` only when approved with start/end, allowed scope, no-self-approval semantics and audit.
- `ApprovalDecision` (Approve/Reject/ChangesRequested), time, actor role/authority, audit correlation and decision evidence.
- Financial approval is **not** a journal post. Exact filing approval additionally binds package byte hash, validation input hash, taxonomy and frozen source.

## 4. Negative and race-condition scenarios

| Risk | Required denial/recovery | Evidence |
| --- | --- | --- |
| User A creates journal and attempts to approve it | Reject unless independently signed lawful break-glass policy; logged; not Posted | TC-029, TC-054 |
| Company B record ID guessed from Company A | Scoped denial/opaque not-found, zero leaked fields or totals | TC-016, TC-020 |
| Accountant role has `CreateDraft` but not `Post` | Submit only, no POST authorized to post endpoint | API 403, test fixture |
| Role revoked during delayed report export | Recheck before generation and download; deny delivery | TC-047/077 |
| Approver's delegated authority expires before decision | Reject based on effective grants at decision time | TC-072 |
| Period closes between pre-check and posting | Atomic validation/locking prevents commit to closed period | TC-022 |
| Approval source version/hash changes after review | Stale approval invalid, explicit new approval/version | TC-031/061 |
| Tenant super-admin tries to approve company journal | Deny without separate legitimate company approval grant | Policy negative test |
| Client passes fake `TenantId` or `CompanyId` | Ignore for auth, resolve verified principal and scoped resource | TC-020/075 |
| High-value journal crosses max threshold | Deny/different approver route; cannot split merely to bypass policy | Finance policy OPEN |

## 5. Identity architecture must be decided before login coding

Option A: approved OIDC/IdP (preferred if already used by customer): external password, MFA, recovery, session claims; application validates tokens, membership and current grants.  
Option B: explicitly approved local identity: adaptive salted one-way password hashing, protected MFA material, throttled recovery, session revocation and security audit.  
**Do not silently create both stacks.** Exact IdP availability/hosting requirements and session expiry remain OPEN (GAP-07).

## 6. Review/signature gate

**Owner:** Company/Product for roles and edition; Finance for accounting thresholds; Security for identity, policy version, break glass; Compliance for regulatory signatory. **Status:** Proposed / DEC-009 OPEN. Before any enforcement code, attach signed per-action amounts/currencies, branch/period scopes, delegation, approval state examples, UI denial behavior, evidence and negative tests. The table above is not authorization.

Links: [DEV-06](../DEV-06-security-rbac-audit.md), [Gap Register](../PRE-CODE-GAP-REGISTER.md), GitHub Issue #9.
