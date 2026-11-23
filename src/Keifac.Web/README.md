# KEIFAC web UI — development preview

Design-preview React + TypeScript + Vite + Tailwind frontend foundation.
This is not an authenticated or connected accounting application; no live
financial records, database access or Save/Post actions. Do not deploy to customers.

## Local development

Node.js 22.12+ and npm are required.

1. Run `npm ci` in `src/Keifac.Web`.
2. Run `npm run dev` to preview the UI.
3. Run `npm test`, `npm run check` and `npm run build` for validation.

Direct dependency versions are pinned and the verified `package-lock.json`
is committed. CI uses `npm ci` so every build gets the same dependency resolution.

## Source layout

```text
src/
├── app/
│   ├── App.tsx                 # Language state
│   ├── AppShell.tsx            # Sidebar, toolbar, preview warning
│   └── routes.tsx              # Route → screen mapping
├── components/ui/
│   ├── PreviewElements.tsx     # Shared presentational building blocks
│   └── RecordIdField.tsx       # Read-only numeric ID placeholder
├── features/
│   ├── overview/OverviewPage.tsx
│   └── accounting/
│       ├── accounts/AccountsPage.tsx
│       ├── accounts/AccountFormPreview.tsx
│       ├── accounts/accountPreviewValidation.ts
│       └── journals/JournalsPage.tsx
├── shared/i18n/translations.ts # EN/AR labels
├── styles/globals.css          # Shared design/layout styles
└── main.tsx
```

Only create new feature folders/components when an approved screen actually
needs them. The legacy static HTML proof remains under `docs` and is not a
production frontend. Backend remains in `../Keifac.Api`.

Read `docs/implementation/PHASE-1-IMPLEMENTATION-AUDIT.md` for
remaining finance/security/UX decisions.

## Design-preview interactions

- Use the keyboard skip link to move to the main workspace.
- The account form checks all four required fields, focuses the first incomplete
  field and can reset locally. These actions do
  **not** create, save, post or transmit financial records.
- No live identity, tenant authorization, API or database exists yet.
- Browser visual/RTL/200%-zoom review remains pending.
- Lockfile generation, clean `npm ci`, preview tests and frontend build passed
  in the one-time dependency bootstrap job on 23 November 2026.
  Customer-facing authentication and accounting APIs remain blocked.

## Frontend-first screen batch

- `/organization` — SCR-003 Company/Branch **design preview** for intended Company Admin audience.
- `/periods` — SCR-023 Fiscal Years/Periods **design preview** for intended Admin/Finance audience.
- Both use shared existing form styles and read-only generated-on-save ID field first, with local Reset only. No Save/Activate/Lock, backend data or role access control is implemented.
- Five routes now have partial preview UI; none is approved for customer use.

## Frontend-first design batch 2 — security and onboarding (SCR-021 / SCR-022)

- `/onboarding`: 5 locally navigable setup steps, legal/fiscal fields, disconnected COA
  and opening-balance states, activation gate; **no** save, resume, fiscal lock, import,
  account data or activation APIs. Inputs exist only in the mounted page.
- `/access`: Company-user empty state, proposed invite field layout, company/branch
  scope and MFA not connected, empty approval matrix. Selecting a role does **not**
  grant permissions or send invitations.
- These are **design previews** for intended Company Admin / Admin audiences, not
  authenticated or access-controlled screens; backend RBAC, role scope and maker-checker
  signoff are pending. The combined frontend now has 7 preview routes from 38 screen
  specifications, with 0 screens independently accepted via browser UX sign-off.

## Frontend design batch 3 — SCR-001 sign-in and role previews

- `/sign-in`: standalone sign-in, MFA and recovery design states; no company shell
  or tenant data shown. Inputs and actions are deliberately **disabled** until
  the external IdP vs local-auth, MFA/recovery and security decisions are approved.
  No password form, credential transmission, session or bypass route is present.
- `/access`: proposed role picker also shows illustrative links to already
  existing preview workspaces. It never hides routes, assigns permissions or
  applies server-side access control. XBRL/Auditor roles have no fake routes.
- Route hierarchy uses a single shared AppShell for non-auth preview pages;
  authentication is outside that layout.
- Current UI coverage: 8 of 38 spec screen IDs have at least a partial preview;
  **0/38 are product-approved and browser-accepted**.

## Chromium browser QA

The existing locked frontend dependencies remain unchanged. GitHub Actions runs
a pinned Python Playwright runner against the built Vite preview and uploads
`keifac-frontend-browser-qa` screenshots + JSON report. It inspects all eight
preview routes at 1366×768, 320×720 and 375×812 Arabic RTL viewports, plus
683×384 as a 200%-zoom **layout-equivalent viewport** (not an actual browser
Ctrl+Plus zoom test). It asserts no document-level horizontal overflow, visible
headings, skip-link presence and auth-shell separation, plus local onboarding,
role-preview and COA validation interactions. No real tenant or financial data
is exercised.

Local reproduction after `npm ci && npm run build`:
```bash
python -m pip install playwright==1.56.0
python -m playwright install chromium
python tests/browser/verify_preview.py
```
Automated screenshots and passing CI are **not** the same as independent human
visual review, screen-reader review or owner UX acceptance.

## Complete SRS navigation coverage — 38 preview routes

All 38 canonical SRS screen IDs have navigable bilingual **frontend design
previews**. Eight prior screens retain dedicated components; the other 30 use
one typed screen-specific contract catalog and a small set of compact layout
patterns. Every catalog entry has its own field labels, table columns, intended
role, disabled source-workflow actions and validation/authorization gate.

- Screen route metadata: `src/features/catalog/screenCatalog.ts`
- Shared catalog renderer: `src/features/catalog/CatalogScreenPage.tsx`
- Nine localized domain navigation groups: `src/features/catalog/screenGroups.ts`
- Mobile uses an expandable module menu, avoiding 38 simultaneous header links.
- Zero fake financial records, balances, approved filings, report results,
  permission grants, company context or working Save/Post/Approve/Export buttons.
- Entire catalog remains **preview-only**; no production-quality functionality
  or final 38-screen UX acceptance is claimed.
- Automated Chromium matrix covers all 38 routes on desktop, narrow mobile,
  Arabic RTL and 200%-zoom-equivalent CSS width; final screenshots still
  require human visual acceptance.
