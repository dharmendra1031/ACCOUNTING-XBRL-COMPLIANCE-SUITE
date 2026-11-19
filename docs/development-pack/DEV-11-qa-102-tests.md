# DEV-11 — QA/UAT strategy and all 102 identified test cases

Keifac Accounting & XBRL Compliance Suite | Engineering documentation, 19 November 2026
Status: SPECIFIED / OPEN for owner sign-off unless explicitly noted. None of these specifications is proof of implementation or tests.
Source: https://docs.google.com/document/d/1dSqHsbTAVxkspvMRuhlycEJUCVZgCxvEG1hWBSmvuZA/edit
Git branch: development. Original boss-owned SRS is unchanged.

## Test inventory basis
Below are all 102 canonical test IDs specified across the SRS, including inline Appendix C tests. They are documentation, not automated scripts or proof of a pass. Each must acquire module, screen, API, precondition, synthetic fixture, expected ledger/report result, test implementation path, owner, executed commit, environment and evidence screenshot/log/SQL assertion. No test is marked passed until executed against real code and dataset.

## Test case catalogue
- **TC-001** — Post a balanced journal — Expected: Voucher posts and ledger updates.
- **TC-002** — Post an unbalanced journal — Expected: System blocks posting and shows debit/credit difference.
- **TC-003** — Post into a locked period — Expected: System blocks posting unless authorized reopening is completed.
- **TC-004** — Generate trial balance — Expected: Debits equal credits for the selected ledger scope.
- **TC-005** — Generate financial statements — Expected: Statement totals reconcile to approved trial balance mappings.
- **TC-006** — Map one account to a taxonomy concept — Expected: Mapping saves with effective date and approval status.
- **TC-007** — Attempt duplicate active mapping — Expected: System warns or blocks according to mapping cardinality rules.
- **TC-008** — Generate fact with wrong unit — Expected: Validation returns a unit compatibility error.
- **TC-009** — Generate instant concept with duration context — Expected: Validation returns a context period-type error.
- **TC-010** — Leave mandatory concept unmapped — Expected: Diagnostic draft may be generated for correction; final approval, filing-ready export and submission are blocked.
- **TC-011** — Use unsupported taxonomy version — Expected: Diagnostic draft identifies unsupported taxonomy; final approval, filing-ready export and submission require an accepted taxonomy version.
- **TC-012** — Submit with validation errors — Expected: Approval/finalization is blocked.
- **TC-013** — Approve final filing package — Expected: Immutable approved version and approval audit are stored.
- **TC-014** — Record regulator rejection — Expected: Status becomes Rejected and reason is stored.
- **TC-015** — Resubmit corrected package — Expected: New version is created and linked to prior rejected version.
- **TC-016** — User opens another tenant's company — Expected: Access is denied and security event is logged.
- **TC-017** — Render Arabic report — Expected: RTL alignment, Arabic labels and numeric formats display correctly.
- **TC-018** — Re-run historical filing — Expected: Original taxonomy and data snapshot reproduce the same package hash where deterministic generation is configured.
- **TC-019** — Given the same POS source event and payload delivered twice; when imported concurrently, exactly one business posting and one linked balanced journal exist; retry returns the original reference.
- **TC-020** — Given a valid user restricted to Company A; when calling Company B's API or downloading its files, the request is denied without leaking data and a security event is recorded.
- **TC-021** — Given an approved posted journal; when a user edits or deletes it, the change is refused; a separately authorized linked reversal preserves the original and balances.
- **TC-022** — Given a locked period; when posting an adjustment or dated reversal into it, the request is denied until an independently approved period reopening workflow completes.
- **TC-023** — Given an invoice and receipt with partial payment, advance, overpayment and credit note; allocations reconcile to the customer ledger and AR control account; refunds/write-offs require approved reason.
- **TC-024** — Given an existing supplier bill with matching supplier and reference; when duplicate is entered, posting is blocked unless configured duplicate-policy override is independently approved and audited.
- **TC-025** — Given an already posted POS stock sale; when return and refund are approved, revenue/receivable or cash, stock and COGS reverse exactly once using the configured original-cost policy.
- **TC-026** — Given a stock issue that would make valued quantity negative or is backdated into a locked valuation period; the system follows the approved block/recalculation rule with clear explanation.
- **TC-027** — Given period-end data with AR/AP, inventory or bank-to-GL discrepancies; close is blocked with attributable variances; after reconciliation balances and journals tie.
- **TC-028** — Given a mixed-currency journal with approved rates and defined rounding; functional-currency debits equal credits and original amounts, rate source/date and FX gain/loss remain traceable.
- **TC-029** — Given a maker-checker-controlled operation; the creator's approval attempt is rejected, while a properly scoped independent approver may approve with a recorded decision.
- **TC-030** — Given incomplete company legal/profile, COA or unmatched opening balances; activation is refused, draft onboarding persists and the user sees specific remaining tasks.
- **TC-031** — Given a frozen financial statement linked to an approved filing; when a material source or statement version changes, its filing validation and approval are invalidated and new review is required.
- **TC-032** — Given a validated filing; when mapping, regulator rules or taxonomy package changes, prior validation hash cannot be reused for approval; a new version is validated.
- **TC-033** — Given a disclosure requiring a Book Ten prescribed form PDF; when attachment is absent/invalid, that filing cannot be approved or exported as filing-ready.
- **TC-034** — Given a portal submission receipt without acceptance evidence; status becomes Acknowledged only; Accepted requires an authoritative acceptance confirmation.
- **TC-035** — Given submission timeout with unknown portal outcome; the app records UnknownOutcome, checks official portal state, and blocks blind retry or duplicate submission.
- **TC-036** — Given a regulator rejection; correcting a report creates a new filing version linked to the rejected version with audit history, validation and new approval.
- **TC-037** — Given Arabic/English mixed content and KWD values; keyboard navigation, RTL forms, printed tables and PDF maintain correct directions, decimals and readable identifiers.
- **TC-038** — Given an auditor limited to a specific engagement; audit-log events, financial evidence and file URLs outside scope are denied and access is logged.
- **TC-039** — Given a historical filing package and frozen mapping, taxonomy and rules; regeneration uses the identical approved snapshot and reproduces semantic facts; byte-identical hash is asserted only when deterministic serialization is configured.
- **TC-040** — Given restoration from approved backup; recovery tests verify integrity, tenant isolation, target RPO/RTO and documented proof against agreed acceptance limits.
- **TC-041** — cross-company warehouse transfer cannot bypass legal entity posting.
- **TC-042** — approval of stale modified document/version is denied.
- **TC-043** — manual portal receipt cannot set Accepted without authoritative status.
- **TC-044** — same integration event replayed after partial failure results in exactly one posting.
- **TC-045** — close-period report rerun reproduces approved cutoff and mappings.
- **TC-046** — currency conversion/rounding yields balanced functional ledger and traceable difference.
- **TC-047** — expired external auditor access cannot retrieve cached or signed attachments.
- **TC-048** — filing status transitions reject illegal jumps (e.g., Draft directly to Accepted).
- **TC-049** — filing obligation not applicable does not create mandatory CMA alert.
- **TC-050** — Arabic RTL and bilingual PDF show KWD three decimals and preserve LTR identifiers.
- **TC-051** — A draft diagnostic XBRL package cannot be exported or labelled as filing-ready.
- **TC-052** — An unapproved financial statement can be previewed but cannot source a final regulatory filing package.
- **TC-053** — Company switching with unsaved edits prompts discard/save and prevents cross-company data reuse.
- **TC-054** — User with auditor review permission cannot approve a filing without separate authorized-signatory grant.
- **TC-055** — An invoice approval and subsequent posting event produce exactly the entries specified by the approved posting matrix, without double recognition.
- **TC-056** — Filing due-date urgency changes without corrupting transmission or acceptance state.
- **TC-057** — A group dashboard cannot be labelled consolidated without approved consolidation functionality.
- **TC-058** — A permission-denied screen and file export do not disclose cross-company data through cached requests.
- **TC-059** — Authenticated eligible user completes password and required MFA; session only exposes allowed tenant/company/branch, while wrong MFA or unauthorized context prevents access with no sensitive data response.
- **TC-060** — Repeated failed login/recovery is rate-limited without account enumeration; expired/revoked sessions and MFA recovery tokens cannot be reused; security events are auditable.
- **TC-061** — XBRL candidate hash reviewed in SCR-017 is byte-identical to finalized/filing-ready artifact; any changed byte, statement snapshot or rule-pack version invalidates approval and requires a fresh validation/version/reapproval.
- **TC-062** — One externally sourced sale event is posted once despite updated document versions, concurrent delivery and retry; same immutable event key with changed payload is rejected and requires separately linked correction.
- **TC-063** — Standalone XBRL customer imports an externally approved statement/trial balance with attributable source evidence, matching entity/currency/period and reconciled totals; invalid or unapproved inputs block filing-ready generation.
- **TC-064** — Concurrent company+fiscal-series voucher issuance creates unique, traceable numbers; cancelled/voided numbers remain auditable and never reissued.
- **TC-065** — Reclassification/COA merge leaves original posted account IDs and past-date ledger/statement values unchanged.
- **TC-066** — Partial receipt/payment allocations, advance/application and refund under concurrency cannot exceed authorized open balances or double post cash/AP/AR.
- **TC-067** — Phase-1 close checks and locked-period restrictions run even when full phase-2 closing UI is not enabled.
- **TC-068** — Asset capitalization/depreciation/disposal retries and reversals follow independently signed posting matrix exactly once.
- **TC-069** — Budget edit or approval does not silently create a GL posting; budget and actual remain separately auditable.
- **TC-070** — XBRL fact with percent displays/scales correctly as taxonomy-compliant xbrli:pure fraction (where mandated); false pseudo-unit is rejected.
- **TC-071** — Diagnostic XBRL preview accepts only clearly marked provisional source; no preliminary snapshot becomes filing-ready without independent approved frozen source.
- **TC-072** — Tenant admin cannot grant own sensitive approval privilege; expired/revoked invitation, reviewer and download token deny access.
- **TC-073** — Report close cutoff, signed approval, latest-versus-approved state and export reconcile to original ledger with no stale-cached leakage.
- **TC-074** — POS/ERP import with duplicate, changed payload, failed job and replay produces one approved recognition event and correct control totals.
- **TC-075** — Screen entitlement matrix hides unauthorized module routes and denies direct URL/API even if cached UI still shows old company.
- **TC-076** — Customer and supplier duplicate source references follow approved matching/tolerance; stale/changed versions do not silently override accepted payment.
- **TC-077** — File export/scheduled report delivery enforces per-company/role/engagement permissions and prevents delivery to revoked recipients.
- **TC-078** — Multi-company dashboard totals are not labelled consolidated; cross-company financial write requires an independently approved intercompany route.
- **TC-079** — Report generation with incomplete required source or mapping returns explicit reason and safe next action, not a fabricated zero balance.
- **TC-080** — Restored backup reproduces ledger/report snapshot and approved XBRL package lineage, hash and tenant permissions within signed RPO/RTO.
- **TC-081** — Level A/B deep journal pagination stays bounded, stable and permission-scoped without whole-table reads; no duplicates/missing records at equal timestamps.
- **TC-082** — Load test with 100M posting rows and skewed tenant shows recorded p95/p99, DB wait/lock/memory metrics and no financial invariants violated (threshold Level B requires approval).
- **TC-083** — Concurrent posting of the same source event causes exactly one journal; other concurrent unrelated accounts proceed without global lock serialization.
- **TC-084** — Dashboard snapshot/cache invalidates on posting, period reopen, role revoke and company switch; no stale approved-as-live figure or cross-tenant leak.
- **TC-085** — Import/export of million-row synthetic dataset streams/chunks with bounded memory and resilient async state, enforced caps and scoped access.
- **TC-086** — Large month-close/report workloads preserve cutoff, GL tie-out, job retry and cancellation; no partial approved output after failure.
- **TC-087** — User-perceived p95 screen readiness includes API/render and Arabic RTL at approved representative dataset and device/network profiles.
- **TC-088** — SQL Query Store/plans for top queries identify regression after index or schema migration; performance failure blocks release.
- **TC-089** — Cold-cache, high-cardinality company and oldest-period query coverage demonstrates stable bounded queries, no N+1, and correct page ordering.
- **TC-090** — Database restore and application restart with queued work preserve source event uniqueness, report lineage, audit and tenant isolation within approved capacity/RPO/RTO.
- **TC-091** — At 1366×768 100%, short 8-field master form shows title, fields and Save/Cancel without unnecessary page scroll, clipping or repeated blank cards.
- **TC-092** — Long journal/invoice editor can scroll to every field; sticky totals and Save/Post remain reachable, no nested inaccessible vertical scroll.
- **TC-093** — 10,000 matching journal rows are paginated/virtualized with only bounded visible DOM rows and no large-data browser memory growth.
- **TC-094** — At 125% and 200% zoom, error summaries, currency inputs, focus and action controls remain readable/reachable without overlap.
- **TC-095** — Arabic RTL mixes LTR voucher IDs, KWD decimals, dates and status labels without reversing numbers or hiding actions.
- **TC-096** — Switching tenant/company/period during edit cancels stale fetch, prompts for unsaved data and cannot render prior-company cached balances.
- **TC-097** — A user opening SCR-017/033 approval workflows sees only authorized action and the same underlying approval source; no duplicated approvals.
- **TC-098** — Table internal scroll keeps column headers, filtered scope and totals legible; horizontal columns remain keyboard/scroll accessible.
- **TC-099** — Mobile 320/375px layout shows fields/actions without accidental horizontal page overflow; long data grids use an explicit accessible overflow region.
- **TC-100** — Posting or validation error shows an actionable inline field/summary message and does not scroll to an unrelated section or lose entered draft.
- **TC-101** — Common compact screens meet approved browser-level p95 readiness and do not fire duplicate redundant API queries.
- **TC-102** — Empty/loading/error/read-only/posting states reuse components correctly, without fabricated data, illegal transitions or duplicated UI.

## Execution strategy
1. Unit tests of pure currency, approval, context, valuation and posting policy.
2. Transactional SQL/EF integration tests verifying tenant foreign keys, idempotent source events, rollback, immutable journal and concurrent duplicate keys.
3. API contract/security negative tests: role, company, stale draft, locked period, missing MFA, file export, maker-checker, cross-tenant caches.
4. User journey/browser E2E: 38 screens where implemented, compact scroll owner, keyboard, Arabic RTL, 125/200% zoom, mobile 320/375px.
5. Report fixtures: every of 58 report IDs needs formula/lineage and reconciliation expected results.
6. XBRL standards fixture and official permitted regulator form/accepted package evidence; no false acceptance claims.
7. Performance/load tests with 10M/100M-row fixture, contention, restore and p95/p99 evidence in staging; never run 100M-row test as each PR smoke check.
8. UAT and release gates record Specified→Approved→Implemented→Tested→Released per function.

## Real implementation status
The repository has no automated accounting or UX test suite; existing GitHub Actions only builds initial minimal API. Entire TC-001–102 suite is NOT RUN. Production sign-off OPEN.

## Cross-document review corrections — 2026-11-19

**Coverage recheck:** The catalogue includes 102 distinct SRS TC identifiers in sequence. Each entry above is a **test requirement**, not executable test logic. Some IDs describe an expected result only in prose; none should be marked `Passed` until a real versioned fixture, execution transcript, result and reviewer exist. No further new TC IDs are necessary solely to document these clarifications.

**Mandatory test evidence record:** TC ID; SRS clause + screen/workflow; edition and phase; policy version; prerequisite company/branch/period/role; test data and given-state; exact API/UI steps or automated test path; expected GL debit/credit lines or UI/HTTP/regulator artifact as appropriate; negative/retry/concurrency variant; actual DB/assertion/browser evidence; environment and code commit; run date, outcome, defect and owner. Never fabricate expected accounting values before signed policy.

**Reconciliation of test catalogues:** TC-001–018 appear in base §19; TC-019–040 in Appendix B; TC-041–050 are inline inside C-17; TC-051–058 in Appendix D; TC-059–063 in Appendix F.8; TC-064–080 in Appendix G; TC-081–090 in Appendix H; TC-091–102 in Appendix I. Their **tests are specified but not run**, and there is not a 102-test executable suite in the repository.

**Release-level subsets:** Phase-1 security/ledger/GL/subledger cases must pass before posting; reporting formula fixtures per enabled ACC/XBRL report before showing finalized results; XBRL official CMA validation only after verified fixtures; large load tests on dedicated representative staging with approved cost and thresholds. A minimal API compile check is not evidence for any accounting or browser TC. Test owner records waived/not-applicable conditions with release owner approval. See SRS J-02/J-13.
