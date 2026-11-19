# KEIFAC web UI — development preview

A small, read-only React + TypeScript + Vite + Tailwind foundation.

This is NOT an authenticated application and has NO live financial functionality.
It intentionally shows no demo balances, no Save or Post commands, and no fabricated records.
The API and SQL schema are not connected. Do not deploy it as a customer application.

## Run locally

Node.js 22.12+ and npm are required.

1. Run `npm install` in this directory.
2. Run `npm run dev` and open the local Vite URL.
3. Run `npm run check` and `npm run build` before review.

Dependencies use exact top-level versions. Commit the resolved npm lockfile after a verified
install, then switch CI to `npm ci` before merging customer-facing features.

## Scope

- Three functioning client-side routes: overview, account preview, journal preview.
- English/Arabic text and RTL direction toggle for these preview screens.
- Responsive compact shell and empty states; no API calls.
- Backend remains in `../Keifac.Api`.

Use the approved SRS and Phase-1 audit to determine what can be implemented next.
shadcn/ui components should be added only as each approved interactive screen needs them.
Do not install a full UI kit or duplicate primitives speculatively.
