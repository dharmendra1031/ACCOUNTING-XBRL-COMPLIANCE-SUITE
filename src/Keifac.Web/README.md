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
