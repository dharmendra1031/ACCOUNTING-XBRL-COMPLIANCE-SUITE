// UX route suggestions only; actual authentication and scoped RBAC are absent.
export const rolePreviewRoutes = {
  companyAdmin: ["/organization", "/onboarding", "/access", "/periods", "/regulatory-profile"],
  accountant: ["/accounts", "/journals", "/journal-history", "/customer-receipts", "/supplier-payments", "/cash-bank", "/reports"],
  financeManager: ["/journals", "/journal-history", "/statements", "/closing", "/approvals", "/bank-reconciliation", "/reports"],
  cfo: ["/statements", "/filing-approvals", "/xbrl-preview", "/approvals", "/reports"],
  xbrlPreparer: ["/taxonomy", "/xbrl-mapping", "/disclosures", "/xbrl-validation", "/xbrl-preview", "/xbrl-package", "/filing-workspace"],
  auditor: ["/audit-trail", "/auditor-workspace", "/xbrl-preview"],
} as const;

export type PreviewRole = keyof typeof rolePreviewRoutes;
export type PreviewRoute = (typeof rolePreviewRoutes)[PreviewRole][number];

export function isPreviewRole(value: string): value is PreviewRole {
  return Object.prototype.hasOwnProperty.call(rolePreviewRoutes, value);
}
