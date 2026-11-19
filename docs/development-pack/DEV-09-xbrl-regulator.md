# DEV-09 — XBRL taxonomy, CMA iFSAH and filing lifecycle

Keifac Accounting & XBRL Compliance Suite | Engineering documentation, 19 November 2026
Status: SPECIFIED / OPEN for owner sign-off unless explicitly noted. None of these specifications is proof of implementation or tests.
Source: https://docs.google.com/document/d/1dSqHsbTAVxkspvMRuhlycEJUCVZgCxvEG1hWBSmvuZA/edit
Git branch: development. Original boss-owned SRS is unchanged.

## Safety and applicability
CMA iFSAH obligation is NOT universal to Kuwait SMEs. Regulator domain, eligible legal segment, filing form, taxonomy, effective date, portal process and authorized submission route require current official evidence and compliance approval. Generic XML/XBRL is NOT automatically CMA-approved. Manual portal mode captures human evidence; acknowledgement is not Accepted. Official adapter cannot be invented.

## Taxonomy, mapping, context, units, facts and validation
5. XBRL Compliance and Reporting Modules
5.1 Regulatory Profile and Filing Calendar
Maintain regulator, jurisdiction, entity category, filing obligation, report type, period, due date and responsible officer.
Support filing calendar by annual, half-yearly, quarterly, event-based and ad-hoc obligations as defined by the selected rule pack.
Show due/overdue urgency separately from filing state: in-preparation, validation-failed, in-review, approved, exported, submission-in-progress, acknowledged, accepted, rejected, unknown-outcome and resubmission.
5.2 Taxonomy Library and Version Control
Import regulator-approved taxonomy packages and supporting schemas/linkbases when supplied.
Store taxonomy name, namespace, version, publication date, effective date, jurisdiction, regulator and supported report types.
Parse concepts, labels, data types, period type, balance attribute, abstract/hypercube/dimension metadata and relationships.
Never hard-code a taxonomy version into business logic; allow multiple versions and historical filing reproducibility.
Support IFRS-based taxonomy only where the applicable regulator's taxonomy and reporting instructions require it.
5.3 Accounting-to-XBRL Mapping
Map chart-of-account codes and financial statement lines to taxonomy concepts.
Support one-to-one, many-to-one and rule-based mappings with sign conversion and aggregation rules.
Mapping fields: source module, source account/report line, target concept, dimension/member, unit, sign, effective dates, rule owner and approval status.
Show unmapped, ambiguous, inactive, duplicate and invalid mappings; block final approval, filing-ready export and submission where mandatory facts remain unresolved; diagnostic draft generation remains permitted.
Allow controlled company-specific extensions only where the regulator taxonomy and filing rules permit them.
5.4 Reporting Context and Units
Create entity identifier, scheme, reporting start/end date, instant date, comparative period and consolidation status.
Represent XBRL units according to taxonomy/standards: ISO 4217 currency units (KWD, USD), shares, xbrli:pure and compatible compound units. Percentages are generally numeric fractions with xbrli:pure rather than a fabricated percentage unit; verify each concept and regulator-specific fact representation, data type, scale and decimals.
Support dimensions such as business segment, geography, fund, class or other taxonomy-defined dimensions.
Validate that instant/duration contexts, units and dimensions match each target concept.
5.5 XBRL Fact Preparation
Diagnostic NON-FILING facts may use a traceable preliminary statement and disclosure snapshot with explicit warning and known validation gaps. Final filing-ready candidate facts must use an approved frozen financial statement version (or independently approved, reconciled external source for the standalone edition), approved disclosures, mapping and taxonomy. Never label provisional data as approved.
Capture numeric, text, date, boolean and enumerated facts according to taxonomy data types.
Support nil facts only where allowed; distinguish zero, blank, not applicable and not disclosed.
Attach source references, notes, evidence and preparer comments to facts.
5.6 Notes and Disclosure Management
Prepare accounting policies, related-party disclosures, commitments, contingencies, segment notes and other required disclosures based on the selected reporting template.
Use structured forms for tabular disclosures and narrative text for free-text disclosures.
Track required/optional disclosure fields by entity type and taxonomy version.
Maintain bilingual Arabic/English labels and narrative fields where the filing requirements support them.
5.7 Validation Engine
Schema validation: XML well-formedness, namespaces, taxonomy package references and required elements.
Concept validation: concept existence, data type, period type, abstract/concrete status and allowed values.
Context validation: entity identifier, period, dimensions and context consistency.
Unit validation: currency/measurement unit compatibility.
Calculation validation: summation relationships and arithmetic consistency where defined by the taxonomy.
Business-rule validation: regulator-specific mandatory fields, conditional rules, cross-report consistency and reporting-period checks.
Severity levels: Error (blocks final approval, filing-ready export and submission), Warning (requires authorized acknowledgement where the regulator permits), Information (does not block).
Provide rule ID, affected fact, explanation, suggested correction and validation engine version.
5.8 XBRL Generation and Export
Generate diagnostic draft XBRL instance/package previews before final approval; produce filing-ready regulator-required format only after applicable taxonomy, data and filing-rule validations pass.
Support required package structures, naming conventions, attachments and metadata only as specified by the regulator.
Create downloadable package, validation report and human-readable rendering.
Store generated file hash, version, generated-by, date/time, taxonomy version and source financial statement snapshot.
Never label an XML file as regulator-ready solely because it is well-formed; all applicable taxonomy and regulator validations must pass.
5.9 Filing Workflow and Submission Adapter
Workflow: Determine applicable obligation → freeze preliminary diagnostic or approved final source snapshot → map/prepare → validate → generate diagnostic draft OR immutable review-candidate → independent review and approve exact candidate bytes/package hash plus validation-input hash → finalize identical candidate without regenerating bytes → export or submit through approved channel → record portal acknowledgement → separately reconcile authoritative acceptance/rejection. Diagnostic drafts are NOT FILING-READY; acknowledgements and timeouts are not acceptance.
Provide manual portal-assisted filing mode if no approved API exists: generate package, checklist, filing instructions and receipt upload.
Provide API adapter only when official regulator documentation and authorization are available.
Capture submission reference, portal timestamp, receipt, accepted/rejected status, rejection reason and resubmission link.
Prevent duplicate submissions with a persisted idempotency key (entity, obligation, period, filing version and package hash); on timeout or unknown outcome, reconcile portal status before retrying.
5.10 Audit Trail and Filing Archive
Retain all drafts, submitted versions, approvals, validation logs, taxonomy versions, source data snapshots and regulator receipts.
Allow auditor read-only access to selected filing packs and supporting schedules.
Support legal hold, retention policy, export and secure archival.

## Kuwait CMA workstreams and published source references
6. Kuwait CMA iFSAH Scope – Priority 1
Create a dedicated Kuwait CMA adapter with separately configurable reporting workstreams: Financial Statements, Capital Adequacy, Disclosures (including applicable exchange disclosure forms) and General Assembly. CMA materials group or label domains differently across portal pages and circulars; use the current official form/domain definitions for each filing. Obtain eligible entity categories, form templates, taxonomy versions and validation requirements from applicable authoritative documentation.
Kuwait workstream
Keifac module requirement
Configuration / evidence required
Financial statements
Financial statement data capture, notes, taxonomy mapping, XBRL generation and validation.
Current iFSAH taxonomy, report templates, taxonomy version and validation rules.
Capital adequacy
Separate capital adequacy schedule, data capture and report pack for applicable licensed persons.
CMA instructions, applicable entity categories, formulae, templates and reporting frequency.
Exchange disclosures
Event-driven disclosure forms, approval, supporting documents and filing calendar.
Current disclosure form catalogue, event triggers, submission windows and portal workflow.
General assembly
Meeting request/notice/document workflow, agenda, resolutions and supporting attachments.
Current CMA general assembly request forms, required documents and procedural rules.
Auditor collaboration
Auditor assignment, review comments, approval checkpoints and evidence exchange.
Auditor role requirements, registration rules and current iFSAH user manual.
Submission archive
Submission reference, package copy, receipts, status and rejection handling.
Official submission/receipt fields and retention expectations.
IMPORTANT: Do not assume every Kuwaiti business must file through CMA iFSAH. Applicability is based on CMA-regulated entity status and the specific filing obligation. General SMEs may use the accounting product without CMA XBRL filing.
CMA Circular No. (11) of 2026 sets iFSAH disclosure submission as the approved mechanism from 1 July 2026 for specified parties, with limited fallback to CIP where iFSAH technical problems prevent use, subject to the circular's instructions. Applicable disclosures require an attached PDF copy of the prescribed disclosure form under the CMA Executive Bylaws' Book Ten. Verify current official form-level instructions and exceptions before each release.

## Filing workflow and audit controls
B.7 XBRL obligations, mapping, facts and validation
XBRL-01: Applicability engine matches legal entity/regulator/registration, filing domain/form, filing type, period, effective date and amendment status. Obligation includes legal source URL, rule version, deadline rule, required attachments, authorized filer and portal route. SMEs without applicable CMA obligations never see a mandatory CMA filing claim.
XBRL-02: A filing freezes approved financial statement version, disclosures, mapping rules, taxonomy package, applicable rule pack and effective dates. Precedence: official taxonomy/filing rules first; approved jurisdiction mapping second; approved company-specific mapping only where permitted. Detect duplicate active mappings and unsupported concept/member/context combinations before finalization.
XBRL-03: Each fact retains concept QName, source reference, reporting entity, period type, comparative period, context, permitted dimensions/members, unit, scale/precision, sign, data type, value or nil reason and evidence. Zero, blank, not-applicable, not-disclosed and nil have distinct meanings and must not be interchangeable. Manual overrides require a reason, owner and approver; affected fact lineage remains visible.
XBRL-04: Use a standards-conformant XBRL validation engine in addition to regulator-specific rules. Validate schema/taxonomy imports, element types, prohibited abstract facts, contexts, units, dimensions, calculations and mandatory/conditional business rules. Record rule ID/source/version, severity, affected facts, explanation, correction owner, acknowledgement and resolved status. Only officially permitted warning overrides may be accepted.
XBRL-05: Draft generation is available for diagnosis after preparing facts; final approval/export is blocked on current blocking errors or missing mandatory facts. Validation result belongs to a specific immutable input hash. Any change to data, disclosure, taxonomy, mapping, rule pack or generated package hash invalidates validation and approval and triggers new version/revalidation.
B.8 Filing approval, submission and recovery state machine
FILE-01: Main states: NotApplicable / NotStarted → InPreparation → ValidationFailed or ReadyForReview → InReview → ChangesRequested or Approved → Finalized → Exported / SubmissionInProgress → SubmissionAcknowledged → Accepted or Rejected. Technical failure or UnknownOutcome is separate from regulator rejection. Rejected corrections produce a new linked filing version.
FILE-02: Generate draft package and human-readable preview from a frozen source before approval. Reviewer signs off the exact package file hash/version; lock it for export or authorized submission. Any modification creates a new version and requires validation and approval. Approval evidence includes signer identity, timestamp, review outcome and package hash.
FILE-03: Manual portal mode exports the approved package and checklist, records the responsible human operator, captures regulator portal receipt/reference and supports later status reconciliation. Never claim an automated submission without an approved supported interface and credentials.
FILE-04: Submission acknowledgements and regulatory acceptance are separate: a receipt is not proof of accepted filing. On network timeout or unknown portal result, keep UnknownOutcome and reconcile official portal status before retrying; use idempotency key and audit log to prevent double submission.
B.9 Kuwait CMA rule register and filing proof
CMA-01: Before Kuwait regulatory launch, Compliance Owner approves a versioned form register listing portal reporting domain and internal reporting workstream, legal source, entity coverage, deadline, form ID, taxonomy/package version, required attachments, language, portal procedure, signatories and testing evidence. CMA iFSAH groups financial statements and capital adequacy under its Financial Statements Reporting Domain (FS and CAR); disclosures and general assembly have separate portal domains. Internal features may split FS and capital adequacy as workstreams, but must not misstate official domain names. Confirm current portal definitions: https://www.cma.gov.kw/en/web/ifsah .
CMA-02: For disclosures covered by CMA Circular No. 11 of 2026, require applicable prescribed disclosure-form PDF attachment (refer to Book Ten and official instructions). CIP fallback is only for conditions authorized by CMA; it is not an ordinary alternative integration. Relevant official sources: https://www.cma.gov.kw/en/web/cma/cma-board-releases/-/cmaboardreleases/detail/1957630 ; https://www.cma.gov.kw/en/web/ifsah ; https://www.cma.gov.kw/en/web/ifsah/project-scope .

## Exact package approval sequence
Prepare traceable preliminary draft for diagnostics only, or approved source→validated immutable candidate. SCR-016 creates exact candidate package and hashes; SCR-017 independent approver signs exact bytes/input hash and approved statement/taxonomy/rule pack; SCR-016 finalizes same bytes; SCR-018 exports or submits with permission; SCR-037 records portal reference and reconciles authoritative Accepted/Rejected separately. Any input or bytes change creates a new version/revalidation/reapproval. Never silently regenerate approved bytes.

## Standalone XBRL edition dependency
External approved trial balance/statements import requires source provenance, accounting basis, legal entity, cutoff, currency/FX and reconciliation, owner attestation and immutable snapshot. Without this contract, standalone edition is OPEN.

## Official reference inventory
23. Official Reference Sources
Kuwait CMA – iFSAH portal and XBRL reporting domains – https://www.cma.gov.kw/en/web/ifsah
CMA Circular No. 01 of 2025 – mandatory iFSAH phase and reporting domains – https://www.cma.gov.kw/en/web/cma/cma-board-releases/resolutions-and-regulations/-/cmaboardreleases/detail/1611938
CMA Circular No. 11 of 2026 – iFSAH as approved disclosure mechanism from 1 July 2026 for covered parties – https://cma.gov.kw/en/web/cma/cma-board-releases/resolutions-and-regulations/-/cmaboardreleases/detail/1957630
CMA iFSAH auditor super-user instruction manual – https://www.cma.gov.kw/documents/578560/1579031/Instruction+Manuals+for+auditor+super+user+to+register+on+Ifsah+portal.pdf/c41f4218-284b-0d51-617e-2b4543512c63?t=1731332485343
Reference note: Regulatory materials can change. The project owner and compliance specialist must verify the latest official circulars, taxonomy packages, reporting manuals and filing instructions immediately before implementation and each production release.

## Acceptance
Validation should include standards-conformant dependencies, QName, dimensions, types, contexts, fractional percentages using xbrli:pure where applicable, decimals, nil vs zero, comparisons, rule-pack version, duplicate facts and hash mismatch tests. Relevant cases TC-006–015, 031–036, 039, 043, 048–052, 056, 061, 063, 070/071. Regulatory sign-off OPEN.
