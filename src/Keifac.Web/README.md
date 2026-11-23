# KEIFAC Accounting & XBRL Web — UI design previews

**Current scope (development branch):** All 38 SRS screen IDs have navigable
bilingual, responsive React + TypeScript layouts. These are **design previews**,
not 38 approved or production-ready accounting features. Do **not** deploy
this frontend to customers.

## What works in the preview

- React 19 + TypeScript 5.9 + Vite 8, pinned npm dependencies with a committed lockfile.
- English/Arabic UI toggle; RTL layout; keyboard skip links; responsive sidebar
  module groups and a compact dashboard screen directory.
- Eight earlier dedicated screen previews: SCR-001 Login/MFA, SCR-002 Company Dashboard,
  SCR-003 Company/Branch Master, SCR-004 Chart of Accounts, SCR-005 Journal Voucher,
  SCR-021 Company Onboarding, SCR-022 Users/Roles, SCR-023 Fiscal Years/Periods.
- Thirty additional SRS screen previews through a typed bilingual catalog, each
  with its own audience, important fields, record/list columns, workflow actions
  and action-specific design gates.
- Draft-only local input/reset and relevant step-navigation interactions. Every
  real Save, Post, Approve, Issue, Close, Import, Export and Filing action is disabled.
- Read-only technical ID is displayed first on entity creation/detail previews.
  No made-up numeric ID or voucher/filing number is allocated.
- Data grids show accurate unconnected empty states instead of fabricated
  financial amounts, balances, companies, approval records or regulator outcomes.

## What is **not** implemented

Authentication/session management, actual MFA, company/branch permissions, server-side
RBAC, SQL schema, document posting, reconciliation, inventory, tax compliance,
XBRL generation, regulator submission, saving, audit writes, real reporting and
financial calculations. No frontend-only role picker authorizes routes or transactions.

The canonical SRS contracts and approval gates are in
`docs/development-pack/DEV-02-ui-ux-screen-contracts.md`,
`docs/development-pack/round-2/04-SCREEN-FIELD-ACTION-AND-UX-CONTRACTS.md`
and `docs/implementation/PHASE-1-IMPLEMENTATION-AUDIT.md`.
Owner UX/Finance/Security approval is still **OPEN**.

## Source structure

```text
src/
  app/                         App state, shared shell, React Router
  components/ui/               Shared preview elements and read-only ID
  features/
    auth/                      SCR-001
    overview/                  SCR-002
    organization/              SCR-003 / SCR-023
    accounting/                SCR-004 / SCR-005
    onboarding/                SCR-021
    access/                    SCR-022 and role-based UX link previews
    catalog/
      screenCatalog.ts         30 screen-specific EN/AR field/action contracts
      screenGroups.ts          Localized navigation groups
      CatalogScreenPage.tsx    Compact layout rendering for the 30 previews
  shared/i18n/translations.ts  Bilingual core workspace labels
  styles/globals.css           Shared responsive and RTL-compatible CSS
  main.tsx
tests/
  *.test.mjs                   Catalog, role, i18n and local UI logic tests
  browser/verify_preview.py    Real Chromium smoke and screenshot capture
```

## Local checks

Use Node 22.12+ and Python 3.12 when running browser automation.

```bash
cd src/Keifac.Web
npm ci
npm test
npm run check
npm run build
python -m pip install playwright==1.56.0
python -m playwright install chromium
python tests/browser/verify_preview.py
```

The GitHub Actions web job runs on `ubuntu-24.04` for supported Playwright
Chromium installation. Automated QA targets **38 routes × 4 configurations**:
1366×768 desktop, 320×720 mobile, 375×812 Arabic RTL mobile and 683×384
200%-zoom-*equivalent CSS viewport*. The last is not actual browser UI zoom.

The job captures screenshots and `report.json` under the GitHub Actions artifact
`keifac-frontend-browser-qa`; human visual/keyboard/screen-reader review,
true 200% zoom and business-owner acceptance remain separate requirements.
