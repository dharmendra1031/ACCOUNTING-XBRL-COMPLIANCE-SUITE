# Compact enterprise UI/UX contract

**Status:** Design specification only; UI not implemented or signed off.  
**Source:** [User-owned Keifac working SRS — Appendix I](https://docs.google.com/document/d/1dSqHsbTAVxkspvMRuhlycEJUCVZgCxvEG1hWBSmvuZA/edit). No changes to the boss-owned original.  
**Targets:** SCR-001–038 where applicable. App/role/edition/phase visibility remains subject to approval. Frontend reuse/framework remains OPEN (D-01); **do not create a new UI stack to meet this file**.

## Goal

Fit useful information on screen without wasted vertical space, while preserving readable forms, keyboard navigation, accessibility and correct financial actions. **No unnecessary scrolling; never fake a zero-scroll experience by clipping real content.**

## Desktop layout guidelines (proposed tokens)

| Element | Starting range | Reason |
| --- | --- | --- |
| Main header | 56–60px | Company, branch, fiscal period, language and user in one consistent place |
| Expanded sidebar | 216–240px | Same permission-scoped navigation everywhere |
| Page title + action toolbar | 44–56px | Single title/action row, no oversized hero area |
| Main content padding | 12–20px | Use available viewport rather than repeated cards |
| Field height | 36–40px | Compact but readable; enlarge targets in touch mode |
| Field gap / section gap | 8–12px / 12–16px | Consistent spacing via tokens, not per-page CSS |
| Dense data row | 36–44px | Readable text and numbers; optional density setting after testing |

Treat these as **centralized design tokens**, not exact pixel claims. Verify at 1366×768, 1440×900 and 1920×1080 with 100% zoom, plus 125%/200%, 320px/375px and Arabic RTL. Mobile interactive targets should be generous (roughly 44px where possible).

## Forms

- For a typical short **up-to-eight-primary-field** master form, aim to show heading, fields, primary action and Cancel at 1366×768 without document scrollbar caused by blank space.
- Use two-column aligned fields on desktop when they are simple and related; one column on mobile and for long narrative/complex ledger rows. Do not force three+ columns.
- Group mandatory fields first. Conditional, advanced or infrequent settings may be disclosed progressively; never hide required legal or financial data.
- **One Save/Cancel area** per form. Use shared create/edit components and single authoritative posting actions. Posted records remain immutable/read-only.
- Keep errors inline with accessible summary; focus/scroll to affected field without losing entered data or making the viewport jump arbitrarily.
- For long invoice, voucher and inventory forms, allow deliberate full-page scroll or one content pane, keeping status/balanced-total footer and actions reachable.

## Scrolling

- Prefer **one primary vertical scroll owner**; avoid page + grid + modal nested vertical scrollbars.
- Small pages must not scroll solely because huge cards/headers consume vertical space.
- A legitimately long data table may use **one** bounded grid-body scroll area with sticky column headers, visible context and correct focus.
- Wide financial tables may have **explicit horizontal grid-only scroll** with identifier/amount headers visible, not accidental horizontal scrolling of the whole page.
- A modal that truly needs to scroll must have one content scroller, visible heading and actions. Prefer full-page workspaces for journals and lengthy reconciliations.
- Support 200% zoom, screen reader focus/scroll-to-error and mobile content; scrolling is acceptable and safer than clipping.

## Large-data UX and speed

- All large queries are server-filtered, sorted and paginated; default page options can be 25/50, subject to approval. Keyset paging for deep transaction histories.
- No thousands of DOM rows at once. Apply virtualization when profiling shows it helps. Bounded client memory and predictable list performance.
- Debounced search; cancel stale fetches after company/branch/period changes. No unbounded full-table client-side sort/filter or duplicate API requests.
- Compact toolbar combines search, filters, report dates, count, export; not separate tall cards for every control.
- Amounts align right, currencies preserve correct minor units, voucher IDs remain LTR in Arabic RTL; don't render fake zeros when report data is incomplete.

## Shared, non-duplicated components

Build only what approved screens actually use: AppShell, ContextSwitcher, PageToolbar, FormField, MoneyInput, DatePeriodPicker, ValidationSummary, ScopedDataGrid, StatusLabel, ApprovalActionBar, ConfirmDialog, ReportFilterPanel and common Loading/Empty/Error.

Reuse approval workflow data across SCR-017 and SCR-033, report filters across SCR-020 and SCR-038, filing receipts across SCR-018 and SCR-037. Single source of business truth; do not clone back-end services or copy styles across 38 pages. Adopt a small centralized token sheet; no `!important` chains, magic page heights, dead code or speculative abstractions.

## Screen-specific finance considerations

**SCR-005 journal:** compact voucher identity/date/status; clear debit/credit rows; visible difference footer; Save Draft, Submit, Post only by permissions and posting policy.  
**SCR-006/007 invoice/bill:** supplier/customer and line items first; tax/discount conditionally; compact totals and linked posting state.  
**SCR-008 reconciliation:** clear matched/unmatched/difference display; filters and a single dedicated scrolling transaction list.  
**SCR-020/038 reports:** shared filters, distinct approved vs preliminary snapshot, bounded export.  
**SCR-016–018 XBRL:** validation error location, hash-bound approval and immutable finalization without duplicate finalize buttons.

## UI acceptance evidence

Required screenshot and keyboard walkthrough at 1366×768 / 125% / 200% and mobile 320/375; English/Arabic; real validation errors; loading/empty/read-only/posted. Every screen's ticket identifies applicable states, navigation, authorized actions, scroll owner, reusable components, breakpoint behavior and tests.

SRS cases: **TC-091–102** specified only. Do not mark these Implemented or Tested without a working UI and evidence. A static screenshot cannot prove accessible scrolling or large-data responsiveness.

## Canonical screen-state clarification

This is a **compact design-token companion** only. [DEV-02](development-pack/DEV-02-ui-ux-screen-contracts.md) now contains the canonical 38-screen candidate type/scroll-owner map. Generic loading/draft/readonly states in the original SRS do not apply to every screen: login has no SaveDraft, approved/posted history is read-only except permitted reversal, and long accessible forms can scroll when necessary. Exact field schemas, route and wireframes still require approval before UI coding. Do not create a second AppShell, form component set or duplicate approval backend.
