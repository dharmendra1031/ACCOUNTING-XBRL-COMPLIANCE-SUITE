# KEIFAC web UI — development preview

Read-only React + TypeScript + Vite + Tailwind frontend foundation.
This is not an authenticated or connected accounting application; no live
financial records, database access or Save/Post actions. Do not deploy to customers.

## Local development

Node.js 22.12+ and npm are required.

1. Run `npm install` in `src/Keifac.Web`.
2. Run `npm run dev` to preview the UI.
3. Run `npm test`, `npm run check` and `npm run build` for validation.

Direct dependencies are pinned. Commit a verified `package-lock.json` and
switch CI to `npm ci` before a customer-facing release.

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
